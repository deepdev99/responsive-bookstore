import { useEffect, useState } from 'react';
import { BOOKS } from '../data/books';
import type { Book } from '../types';

/**
 * Loads the local sample catalogue. A short delay simulates a network
 * request so the loading state can be shown without a backend.
 */
export function useBooks(delayMs = 600): { books: Book[]; loading: boolean } {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks(BOOKS);
      setLoading(false);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return { books, loading };
}
