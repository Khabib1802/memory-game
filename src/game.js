import { createDeck } from './cards.js';

const MISMATCH_DELAY = 1000;

export function createGame({ onChange }) {
  const state = { cards: [], moves: 0, pairs: 0 };
  let openedCards = [];
  let timerId = null;

  function start() {
    clearTimeout(timerId);
    timerId = null;
    openedCards = [];
    state.cards = createDeck();
    state.moves = 0;
    state.pairs = 0;
    onChange();
  }

  function closeOpenedCards() {
    openedCards.forEach((card) => {
      card.isOpen = false;
    });
    openedCards = [];
    timerId = null;
    onChange();
  }

  function checkPair() {
    const [first, second] = openedCards;
    state.moves += 1;

    if (first.symbol === second.symbol) {
      first.isMatched = true;
      second.isMatched = true;
      state.pairs += 1;
      openedCards = [];
    } else {
      timerId = setTimeout(closeOpenedCards, MISMATCH_DELAY);
    }
  }

  function flip(id) {
    const card = state.cards[id];

    if (timerId !== null || card.isOpen) return;

    card.isOpen = true;
    openedCards.push(card);

    if (openedCards.length === 2) checkPair();

    onChange();
  }

  return { state, start, flip };
}
