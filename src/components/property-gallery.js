/** @param {HTMLElement} root @param {HTMLElement} page */
export function initPropertyGallery(root, page = document.documentElement) {
  const triggers = [...root.querySelectorAll('button[data-gallery-trigger]')];
  const dialog = root.querySelector('dialog');
  const image = root.querySelector('[data-gallery-image]');
  const caption = root.querySelector('[data-gallery-caption]');
  const next = root.querySelector('[data-gallery-next]');
  const previous = root.querySelector('[data-gallery-previous]');
  const close = root.querySelector('[data-gallery-close]');
  if (!dialog || !image || !caption || !next || !previous || !close || !triggers.length) return;
  let index = 0;
  let opener;
  let overflow = '';
  const show = (position) => {
    index = (position + triggers.length) % triggers.length;
    const source = triggers[index].querySelector('img');
    image.src = source.src;
    image.alt = source.alt;
    caption.textContent = `${index + 1} / ${triggers.length} · ${source.alt}`;
  };
  next.hidden = previous.hidden = triggers.length < 2;
  triggers.forEach((trigger, position) => trigger.addEventListener('click', () => {
    opener = trigger;
    show(position);
    overflow = page.style.overflow;
    dialog.showModal();
    page.style.overflow = 'hidden';
  }));
  next.addEventListener('click', () => show(index + 1));
  previous.addEventListener('click', () => show(index - 1));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      show(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    page.style.overflow = overflow;
    opener?.focus();
  });
}
