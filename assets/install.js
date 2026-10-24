// Internal browser settings URLs must be pasted into the browser's address bar.
for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = 'Copied!';
      button.setAttribute('aria-label', 'Address copied');
      setTimeout(() => {
        button.textContent = 'Copy';
        button.setAttribute('aria-label', `Copy ${button.dataset.copy}`);
      }, 2200);
    } catch {
      // Clipboard access may be denied. Select the address for manual copying.
      const range = document.createRange();
      range.selectNodeContents(button.previousElementSibling);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = 'Select & copy';
      button.setAttribute('aria-label', 'Address selected. Copy it manually.');
    }
  });
}
