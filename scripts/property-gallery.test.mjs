import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initPropertyGallery } from '../src/components/property-gallery.js';

function fixture(count = 3) {
  const element = (extra = {}) => ({ handlers: {}, addEventListener(name, handler) { this.handlers[name] = handler; }, focus() { this.focused = true; }, ...extra });
  const slides = Array.from({ length: count }, (_, index) => element({ dataset: { galleryIndex: String(index) }, currentSrc: `/photo-${index}.jpg`, src: `/photo-${index}.jpg`, alt: `Foto ${index}` }));
  const triggers = slides.map(image => element({ querySelector: () => image }));
  const image = element();
  const caption = element();
  const next = element();
  const previous = element();
  const close = element();
  const dialog = element({ open: false, showModal() { this.open = true; }, close() { this.open = false; this.handlers.close(); } });
  const root = { querySelectorAll: () => triggers, querySelector: selector => ({ dialog, '[data-gallery-image]': image, '[data-gallery-caption]': caption, '[data-gallery-next]': next, '[data-gallery-previous]': previous, '[data-gallery-close]': close })[selector] };
  const page = { style: { overflow: 'auto' } };
  initPropertyGallery(root, page);
  return { triggers, image, caption, next, previous, close, dialog, page };
}

test('opens the clicked photo in place, cycles both ways, and restores focus and scrolling on close', () => {
  const f = fixture();
  f.triggers[1].handlers.click();
  assert.equal(f.dialog.open, true);
  assert.equal(f.image.src, '/photo-1.jpg');
  assert.equal(f.caption.textContent, '2 / 3 · Foto 1');
  assert.equal(f.page.style.overflow, 'hidden');
  f.next.handlers.click();
  f.next.handlers.click();
  assert.equal(f.image.src, '/photo-0.jpg');
  f.previous.handlers.click();
  assert.equal(f.image.src, '/photo-2.jpg');
  f.dialog.handlers.keydown({ key: 'ArrowLeft', preventDefault() {} });
  assert.equal(f.image.src, '/photo-1.jpg');
  f.dialog.handlers.keydown({ key: 'ArrowRight', preventDefault() {} });
  assert.equal(f.image.src, '/photo-2.jpg');
  f.close.handlers.click();
  assert.equal(f.dialog.open, false);
  assert.equal(f.page.style.overflow, 'auto');
  assert.equal(f.triggers[1].focused, true);
});

test('supports arrow keys and native Escape closing, and hides navigation for a single photo', () => {
  const f = fixture(1);
  f.triggers[0].handlers.click();
  assert.equal(f.next.hidden, true);
  assert.equal(f.previous.hidden, true);
  f.dialog.handlers.keydown({ key: 'ArrowRight', preventDefault() {} });
  assert.equal(f.image.src, '/photo-0.jpg');
  f.dialog.close();
  assert.equal(f.page.style.overflow, 'auto');
});
