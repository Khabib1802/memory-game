import { createElement, createButton } from './dom.js';
import { openModal } from './modal.js';
import { getResults } from './storage.js';

function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${day}.${month}.${date.getFullYear()}`;
}

function createCell(tag, value) {
  return createElement(tag, { text: value });
}

function createTable(results) {
  const head = createElement('thead', {
    children: [
      createElement('tr', {
        children: ['Место', 'Ходы', 'Дата'].map((title) =>
          createCell('th', title),
        ),
      }),
    ],
  });

  const body = createElement('tbody', {
    children: results.map((result, index) =>
      createElement('tr', {
        children: [
          createCell('td', index + 1),
          createCell('td', result.moves),
          createCell('td', formatDate(result.date)),
        ],
      }),
    ),
  });

  return createElement('table', {
    className: 'leaderboard',
    children: [head, body],
  });
}

export function openLeaderboard() {
  const results = getResults();

  openModal((close) => [
    createElement('h2', { text: 'Таблица лидеров' }),
    results.length === 0
      ? createElement('p', { text: 'Пока нет результатов' })
      : createTable(results),
    createElement('div', {
      className: 'modal-actions',
      children: [createButton('Закрыть', close, 'btn btn--secondary')],
    }),
  ]);
}
