const interests = {
  community: 'Studio Community & Academic',
  business: 'Studio Business / commercial licensing',
  server: 'CaliPy Server / agent deployment',
  marketplace: 'Model & effect marketplace',
};
export function prepareAccessRequest(values, recipient) {
  const edition = Object.hasOwn(interests, values.edition) ? values.edition : 'community';
  const clean = key => String(values[key] || '').trim();
  const subject = `CaliPy inquiry: ${interests[edition]}`;
  const body = [
    `Interest: ${interests[edition]}`, `Name: ${clean('name')}`,
    `Email: ${clean('email')}`, `Affiliation: ${clean('affiliation')}`,
    `Website: ${clean('website') || 'Not provided'}`, '',
    'Intended use:', clean('purpose'), '',
    `Optional product-update emails: ${values.updates === true ? 'Yes, I would like occasional product and release updates. I can withdraw by email.' : 'No, please respond to this inquiry only.'}`,
    '', 'I understand that this is an inquiry, not an automatic download, purchase, or access approval.',
  ].join('\n');
  return { subject, body, text: `To: ${recipient}\nSubject: ${subject}\n\n${body}`, href: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}
export function setupAccessForm(form) {
  const edition = form.elements.namedItem('edition');
  const requested = new URLSearchParams(window.location.search).get('edition');
  if (Object.hasOwn(interests, requested)) edition.value = requested;
  const preview = document.querySelector('#request-preview');
  const status = document.querySelector('#copy-status');
  form.addEventListener('input', event => {
    if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    preview.hidden = true;
  });
  form.addEventListener('change', () => { preview.hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    for (const name of ['name', 'affiliation', 'purpose']) {
      const field = form.elements.namedItem(name);
      field.setCustomValidity(field.value.trim() ? '' : 'Please enter a value.');
    }
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form));
    values.updates = form.elements.namedItem('updates').checked;
    const result = prepareAccessRequest(values, form.dataset.recipient);
    document.querySelector('#request-text').textContent = result.text;
    document.querySelector('#request-email').href = result.href;
    preview.hidden = false;
    preview.focus();
    status.textContent = 'Email prepared for review. Nothing has been sent.';
  });
  document.querySelector('#prepare-request').disabled = false;
}
