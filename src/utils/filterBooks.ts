import type { Book, CategoryFilterValue } from '../types';

export function filterBooks(
  books: Book[],
  query: string,
  category: CategoryFilterValue,
): Book[] {
  const q = query.trim().replace(/\s+/g, ' ').toLowerCase();
  return books.filter((book) => {
    const matchesCategory = category === 'All' || book.category === category;
    const matchesQuery =
      q === '' ||
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });
}
