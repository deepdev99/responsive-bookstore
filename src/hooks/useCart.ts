import { useCallback, useMemo, useState } from 'react';
import type { CartItems } from '../types';

export function useCart() {
  const [items, setItems] = useState<CartItems>({});

  const addToCart = useCallback((bookId: string) => {
    setItems((prev) => ({ ...prev, [bookId]: (prev[bookId] ?? 0) + 1 }));
  }, []);

  const count = useMemo(
    () => Object.values(items).reduce((sum, qty) => sum + qty, 0),
    [items],
  );

  return { items, count, addToCart };
}
