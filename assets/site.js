import { chartMarkup, scenarios } from './simulation.js';

const chart = document.querySelector('[data-chart]');
if (chart) {
  let scenario = 'warmup';
  const noise = document.querySelector('#noise');
  const buttons = [...document.querySelectorAll('[data-scenario]')];
  const render = () => {
    const value = Number(noise.value);
    chart.innerHTML = chartMarkup(scenario, value);
    document.querySelector('#noise-value').value = value.toFixed(3);
    document.querySelector('#scenario-equation').textContent = scenarios[scenario].equation;
    document.querySelector('#scenario-description').textContent = scenarios[scenario].description;
    document.querySelector('#scenario-title').textContent = scenarios[scenario].title;
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    scenario = button.dataset.scenario;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    render();
  }));
  noise.addEventListener('input', render);
  document.querySelector('[data-reset]').addEventListener('click', () => {
    scenario = 'warmup'; noise.value = '0.055';
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.scenario === scenario)));
    render();
  });
  document.querySelectorAll('[data-simulation-control]').forEach(control => { control.disabled = false; });
}

document.querySelectorAll('[data-copy]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const text = document.getElementById(button.dataset.copy).textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied ✓';
      document.querySelector('#copy-status').textContent = 'Copied to clipboard.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(document.getElementById(button.dataset.copy));
      selection.removeAllRanges(); selection.addRange(range);
      button.textContent = 'Text selected';
      document.querySelector('#copy-status').textContent = 'Copy is unavailable here. The text is selected; use your browser’s Copy command.';
    }
    setTimeout(() => { button.textContent = 'Copy'; }, 2200);
  });
});

document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('.mobile-menu').open = false;
}));

const accessForm = document.querySelector('#access-form');
if (accessForm) {
  const { setupAccessForm } = await import('./access-request.js');
  setupAccessForm(accessForm);
}

if (document.querySelector('[data-guide], [data-gallery-filters]')) {
  const { setupLearning } = await import('./learning.js');
  setupLearning();
}
