// Add published HTTPS URLs here. Leave a value blank to keep that download disabled.
const MYLIMITS_CONFIG = Object.freeze({
  stores: {
    chrome: '',
    edge: '',
    firefox: '',
  },
  downloads: {
    beta: '',
  },
});

for (const link of document.querySelectorAll('[data-store], [data-download]')) {
  const isStore = Boolean(link.dataset.store);
  const url = isStore
    ? MYLIMITS_CONFIG.stores[link.dataset.store]
    : MYLIMITS_CONFIG.downloads[link.dataset.download];
  if (url && URL.canParse(url) && new URL(url).protocol === 'https:') {
    link.href = url;
    link.removeAttribute('aria-disabled');
    link.querySelector('small').textContent = isStore ? 'Install extension ↗' : 'Download ZIP';
  }
}
