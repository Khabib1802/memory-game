import { createElement, createButton } from './dom.js';
import { openModal } from './modal.js';

export function openVictory(moves, onNewGame) {
  openModal((close) => [
    createElement('h2', { text: 'Победа!' }),
    createElement('p', { text: 'Вы нашли все пары.' }),
    createElement('p', { text: `Количество ходов: ${moves}` }),
    createElement('div', {
      className: 'modal-actions',
      children: [
        createButton('Новая игра', () => {
          close();
          onNewGame();
        }),
        createButton('Закрыть', close, 'btn btn--secondary'),
      ],
    }),
  ]);
}
