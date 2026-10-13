import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, pages } from '../content/pages.mjs';
import { chartMarkup, scenarios } from '../assets/simulation.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = file => readFile(resolve(root,file),'utf8');
let localLinks=0;
const external=new Set();
for (const page of pages) {
  const file=page.path === '/' ? 'index.html' : page.path.slice(1)+'index.html';
  const html=await read(file);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${file}: one main heading`);
  assert.ok(html.includes('<html lang="en">'),`${file}: language`);
  assert.ok(html.includes(`<link rel="canonical" href="${site.origin}${page.path}">`),`${file}: canonical`);
  assert.ok(html.includes('name="description"'),`${file}: description`);
  assert.ok(html.includes('name="robots" content="index, follow'),`${file}: indexable`);
  assert.ok(!html.includes('href="#"'),`${file}: no placeholder links`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${file}: duplicate IDs`);
  const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const webPage=schema['@graph'].find(item=>item['@type']==='WebPage');
  assert.equal(webPage.url,site.origin+page.path);
  assert.equal(schema['@graph'].find(item=>item['@type']==='SoftwareSourceCode').codeRepository,site.repository);
  for (const [,reference] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:)/.test(reference)) { external.add(reference); continue; }
    const url=new URL(reference,site.origin+page.path);
    let target=url.pathname.slice(1);
    if (!target || target.endsWith('/')) target+='index.html';
    await stat(resolve(root,target)).catch(()=>{throw new Error(`${file}: missing ${reference}`);});
    if (url.hash && target.endsWith('.html')) {
      const targetHtml=await read(target);
      assert.ok(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`${file}: missing anchor ${reference}`);
    }
    localLinks++;
  }
}
const metadata=JSON.parse(await read('project.json'));
assert.equal(metadata.package.distribution,'calipy-ppl');
assert.equal(metadata.availability.hosted_inference_api,false);
assert.equal(metadata.availability.hosted_mcp_endpoint,false);
assert.equal(metadata.url,site.origin+'/');
const map=await read('sitemap.xml');
const urls=[...map.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.deepEqual(urls,pages.map(page=>site.origin+page.path));
const robots=await read('robots.txt');
assert.ok(robots.includes('User-agent: *\nAllow: /\n'));
assert.ok(!/^Disallow:\s*\/\s*$/m.test(robots));
assert.ok(robots.includes(`Sitemap: ${site.origin}/sitemap.xml`));
assert.ok((await read('llms.txt')).startsWith('# CaliPy\n'));
for (const key of Object.keys(scenarios)) {
  for (const sigma of [0.01,0.055,0.12]) {
    const svg=chartMarkup(key,sigma);
    assert.ok(!/NaN|Infinity/.test(svg));
    assert.equal((svg.match(/<circle /g)||[]).length,33);
    assert.equal(svg,chartMarkup(key,sigma),'deterministic forward illustration');
  }
}
assert.notEqual(chartMarkup('warmup',0.01),chartMarkup('warmup',0.12));
const share=await stat(resolve(root,'assets/social-card.jpg'));
assert.ok(share.size>1000,'social image exists');
const evidence=JSON.parse(await read('downloads/warmup/warmup-results.json'));
const observations=(await read('downloads/warmup/warmup-data.csv')).trim().split(/\r?\n/).slice(1).map(line=>{
  const [time,reading,truth,split]=line.split(',');
  return {time:Number(time),reading:Number(reading),truth:Number(truth),split};
});
const training=observations.filter(row=>row.split==='train');
const heldOut=observations.filter(row=>row.split==='held_out');
assert.equal(evidence.data_kind,'simulated');
assert.equal(training.length,evidence.n_train);
assert.equal(heldOut.length,evidence.n_held_out);
assert.equal(observations.length,64);
observations.forEach((row,index)=>assert.equal(row.split,index%4===0?'held_out':'train'));
const baseline=training.reduce((sum,row)=>sum+row.reading,0)/training.length;
const rmse=predict=>Math.sqrt(heldOut.reduce((sum,row)=>sum+(predict(row)-row.reading)**2,0)/heldOut.length);
assert.ok(Math.abs(rmse(()=>baseline)-evidence.held_out_rmse.constant_training_mean)<0.00001,'baseline evidence matches downloaded CSV');
const fit=evidence.estimates;
assert.ok(Math.abs(rmse(row=>fit.steady-fit.drop*Math.exp(-row.time/fit.tau))-evidence.held_out_rmse.warmup_model)<0.00001,'fitted evidence matches downloaded CSV and parameters');
assert.equal(metadata.services.booking_available,false);
assert.ok((await read('get-started/index.html')).includes('.\\.venv\\Scripts\\python.exe'),'PowerShell path preserves backslashes');
console.log('PASS: downloadable synthetic dataset, split, baseline and fitted RMSE agree with the reported evidence.');
console.log(`PASS: ${pages.length} pages; ${localLinks} local links/assets/anchors; canonical/schema/sitemap consistency; crawler policy; availability metadata; three deterministic chart scenarios.`);
if (process.argv.includes('--external')) {
  const urls=[...external].filter(url=>url.startsWith('https:') && !url.startsWith(site.origin));
  for (const url of urls) {
    const response=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(20000)});
    assert.ok(response.ok,`${url}: HTTP ${response.status}`);
    console.log(`HTTP ${response.status} ${url}`);
    await response.body?.cancel();
  }
}
