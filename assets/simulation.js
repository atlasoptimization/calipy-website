// Illustrative forward simulation only. This does not run CaliPy or inference.
export const scenarios = {
  warmup: { title: 'Sensor warm-up', equation: 'm(t) = 0.90 − 0.65 exp(−t / 1.7)', description: 'A sensor settles toward a stable response after power-up.', signal: t => 0.9 - 0.65 * Math.exp(-t / 1.7) },
  drift: { title: 'Instrument drift', equation: 'm(t) = 0.25 + 0.075 t', description: 'A slowly changing offset shifts the expected measurement.', signal: t => 0.25 + 0.075 * t },
  cycle: { title: 'Cyclic response', equation: 'm(t) = 0.55 + 0.22 sin(2πt / 5)', description: 'A periodic influence changes the response over time.', signal: t => 0.55 + 0.22 * Math.sin(2 * Math.PI * t / 5) },
};

export function chartMarkup(key = 'warmup', noise = 0.055) {
  const signal = scenarios[key].signal;
  const x = t => 54 + t / 8 * 444;
  const y = v => 239 - v / 1.2 * 201;
  const curve = Array.from({length: 81}, (_, i) => ({ t: i / 10, m: signal(i / 10) }));
  const line = curve.map((p, i) => `${i ? 'L' : 'M'}${x(p.t).toFixed(2)},${y(p.m).toFixed(2)}`).join(' ');
  const band = curve.map((p, i) => `${i ? 'L' : 'M'}${x(p.t).toFixed(2)},${y(p.m + 2 * noise).toFixed(2)}`).join(' ') + ' ' + [...curve].reverse().map(p => `L${x(p.t).toFixed(2)},${y(p.m - 2 * noise).toFixed(2)}`).join(' ') + ' Z';
  let state = 2077;
  const random = () => { state = (1664525 * state + 1013904223) >>> 0; return (state + 1) / 4294967297; };
  const dots = Array.from({length: 33}, (_, i) => {
    const t = i / 4;
    const z = Math.sqrt(-2 * Math.log(random())) * Math.cos(2 * Math.PI * random());
    return `<circle cx="${x(t).toFixed(2)}" cy="${y(signal(t) + noise * z).toFixed(2)}" r="3.1"/>`;
  }).join('');
  return `<title id="chart-title">${scenarios[key].title}: expected response, simulated readings, and measurement variation</title>
    <desc id="chart-desc">Illustrative normalized response over eight seconds. The shaded band is the expected response plus or minus two measurement standard deviations. It is not a posterior interval or a fitted result.</desc>
    <g class="chart-grid">${[0.2,0.4,0.6,0.8,1].map(v => `<path d="M54 ${y(v)}H498"/><text x="40" y="${y(v) + 4}" text-anchor="end">${v.toFixed(1)}</text>`).join('')}${[0,2,4,6,8].map(t => `<text x="${x(t)}" y="263" text-anchor="middle">${t}</text>`).join('')}</g>
    <path d="${band}" class="chart-band"/><path d="${line}" class="chart-line"/><g class="chart-dots">${dots}</g>
    <text class="axis-label" x="54" y="17">NORMALIZED RESPONSE</text><text class="axis-label" x="498" y="287" text-anchor="end">TIME / s</text>`;
}
