import './style.css';
import { createElement, createButton } from './dom.js';
import { TOTAL_PAIRS } from './cards.js';
import { createGame } from './game.js';
import { openVictory } from './victory.js';

const movesValue = createElement('span');
const pairsValue = createElement('span');
const board = createElement('div', { className: 'board' });

const game = createGame({ onChange: render, onWin: handleWin });

function handleWin(moves) {
  openVictory(moves, game.start);
}

function createCardElement(card) {
  const button = createElement('button', {
    className: 'card',
    text: card.isOpen ? card.symbol : '',
    attrs: {
      type: 'button',
      'aria-label': card.isOpen ? card.symbol : 'Закрытая карточка',
    },
    on: { click: () => game.flip(card.id) },
  });

  button.classList.toggle('card--open', card.isOpen);
  button.classList.toggle('card--matched', card.isMatched);

  return button;
}

function renderBoard() {
  const focusedIndex = [...board.children].indexOf(document.activeElement);

  board.replaceChildren(...game.state.cards.map(createCardElement));

  if (focusedIndex !== -1) board.children[focusedIndex].focus();
}

function render() {
  movesValue.textContent = game.state.moves;
  pairsValue.textContent = `${game.state.pairs} из ${TOTAL_PAIRS}`;
  renderBoard();
}

const header = createElement('header', {
  className: 'header',
  children: [createButton('Новая игра', game.start)],
});

const main = createElement('main', {
  className: 'game',
  children: [
    createElement('h1', { className: 'title', text: 'Memory Game' }),
    createElement('div', {
      className: 'stats',
      children: [
        createElement('p', { children: ['Ходы: ', movesValue] }),
        createElement('p', { children: ['Пары: ', pairsValue] }),
      ],
    }),
    board,
  ],
});

document.body.append(header, main);
game.start();
