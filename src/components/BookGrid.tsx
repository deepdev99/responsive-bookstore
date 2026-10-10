import type { Book, CartItems } from '../types';
import BookCard from './BookCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import './BookGrid.css';

interface BookGridProps {
  books: Book[];
  loading: boolean;
  cartItems: CartItems;
  onAddToCart: (bookId: string) => void;
  onResetFilters: () => void;
}

const SKELETON_COUNT = 8;

export default function BookGrid({
  books,
  loading,
  cartItems,
  onAddToCart,
  onResetFilters,
}: BookGridProps) {
  if (loading) {
    return (
      <div role="status" aria-busy="true">
        <span className="visually-hidden">Loading books…</span>
        <div className="book-grid">
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <EmptyState
        title="No books found"
        message="Try a different search term or category."
        actionLabel="Clear filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          quantityInCart={cartItems[book.id] ?? 0}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
