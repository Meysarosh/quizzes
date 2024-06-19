const PAGES = ['quiz', 'summary'];

export function isHighlightAvailable(path) {
  return PAGES.find((page) => path.includes(page));
}
