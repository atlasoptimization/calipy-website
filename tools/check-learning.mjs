import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {galleryItems} from '../content/learning-pages.mjs';
const read=path=>readFile(new URL('../'+path,import.meta.url),'utf8');
const result=JSON.parse(await read('downloads/offset/result.json'));
const rows=(await read('downloads/offset/readings.csv')).trim().split('\n').slice(1).map(line=>line.split(',').map(Number));
assert.equal(rows.length,8);
rows.forEach(([repeat,reference,reading],i)=>{
 assert.equal(repeat,i+1);assert.equal(reference,result.reference_celsius);
 assert.ok(Math.abs(reading-result.readings_celsius[i])<0.00001);
});
const precision=1/result.prior.sd**2+rows.length/result.noise_sd_celsius**2;
const variance=1/precision;
const mean=variance*(result.prior.mean/result.prior.sd**2+rows.reduce((sum,[,r,y])=>sum+y-r,0)/result.noise_sd_celsius**2);
assert.ok(Math.abs(mean-result.analytic_mean_celsius)<0.00001,'analytic mean agrees with downloaded readings');
assert.ok(Math.abs(Math.sqrt(variance)-result.analytic_sd_celsius)<1e-10);
assert.ok(Math.abs(result.posterior_mean_celsius-mean)<0.02,'recorded mean passes the executed smoke tolerance');
assert.ok(Math.abs(result.posterior_sd_celsius-Math.sqrt(variance))<0.015);
assert.equal(result.inference.chains,1);
const lesson=await read('learn/sensor-offset/index.html');
const agent=await read('agents/index.html');
for (const [html,id,count] of [[lesson,'offset',5],[agent,'agent',4]]) {
 assert.equal((html.match(/data-guide-panel/g)||[]).length,count);
 assert.ok(!/<section[^>]*data-guide-panel[^>]*hidden/.test(html),'all panels available in static HTML');
 for(let i=1;i<=count;i++) assert.ok(html.includes(`id="${id}-step-${i}"`));
}
assert.ok(agent.includes('not a transcript of a provider-backed agent run'));
const gallery=await read('gallery/index.html');
assert.equal(new Set(galleryItems.map(item=>item.id)).size,galleryItems.length);
for(const item of galleryItems) assert.ok(gallery.includes(`id="${item.id}"`));
for(const category of ['interactive','guided','models','screenshots']) assert.ok(galleryItems.some(item=>item.kind.split(' ').includes(category)),`filter ${category} has resources`);
assert.ok(!/<article[^>]*data-gallery-kind[^>]*hidden/.test(gallery),'all resources available without JS');
console.log('PASS: offset CSV/analytic reference/recorded result agree; lesson fallback content and gallery categories verified.');
