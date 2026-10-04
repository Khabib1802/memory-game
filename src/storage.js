const STORAGE_KEY = 'memory-game-results';
const MAX_RESULTS = 10;

export function getResults() {
  try {
    const results = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(results) ? results : [];
  } catch {
    return [];
  }
}

export function saveResult(moves) {
  const results = [...getResults(), { moves, date: new Date().toISOString() }];

  results.sort((a, b) => a.moves - b.moves || a.date.localeCompare(b.date));

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(results.slice(0, MAX_RESULTS)),
  );
}
