const SYMBOLS = ['🐶', '🐱', '🦊', '🐼', '🐸', '🦁', '🐙', '🦋'];

export const TOTAL_PAIRS = SYMBOLS.length;

function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function createDeck() {
  return shuffle([...SYMBOLS, ...SYMBOLS]).map((symbol, index) => ({
    id: index,
    symbol,
    isOpen: false,
    isMatched: false,
  }));
}
