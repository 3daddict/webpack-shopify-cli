import './theme.scss';

console.log('Hello Theme!');
// elements with [data-href] will be treated like links
document
  .querySelectorAll('[data-href]')
  .forEach(el =>
    el.addEventListener('click', e => (window.location.href = el.dataset.href)),
  );
