import { createElement } from './dom.js';

export function openModal(createContent) {
  const dialog = createElement('dialog', { className: 'modal' });
  const close = () => dialog.close();

  dialog.append(
    createElement('div', {
      className: 'modal-content',
      children: createContent(close),
    }),
  );

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });

  dialog.addEventListener('close', () => {
    dialog.remove();
    document.body.classList.remove('no-scroll');
  });

  document.body.append(dialog);
  document.body.classList.add('no-scroll');
  dialog.showModal();
}
