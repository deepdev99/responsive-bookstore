import { useMemo, useState } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import BookGrid from './components/BookGrid';
import { CATEGORIES } from './data/books';
import { useBooks } from './hooks/useBooks';
import { useCart } from './hooks/useCart';
import { filterBooks } from './utils/filterBooks';
import type { CategoryFilterValue } from './types';
import './App.css';

interface AppProps {
  /** Simulated load delay; overridable for tests. */
  loadDelayMs?: number;
}

export default function App({ loadDelayMs = 600 }: AppProps) {
  const { books, loading } = useBooks(loadDelayMs);
  const { items, count, addToCart } = useCart();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilterValue>('All');

  const visibleBooks = useMemo(
    () => filterBooks(books, query, category),
    [books, query, category],
  );

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
  };

  return (
    <div className="app">
      <Header cartCount={count} searchQuery={query} onSearchChange={setQuery} />

      <main className="app__main">
        <section className="hero">
          <h1 className="hero__title">Find your next great read</h1>
          <p className="hero__subtitle">
            Hand-picked fiction, science, history and more — delivered to your door.
          </p>
        </section>

        <section className="catalog" aria-labelledby="catalog-heading">
          <div className="catalog__toolbar">
            <h2 id="catalog-heading" className="catalog__heading">
              {category === 'All' ? 'All Books' : category}
            </h2>
            {!loading && (
              <span className="catalog__count" aria-live="polite">
                {visibleBooks.length} {visibleBooks.length === 1 ? 'book' : 'books'}
              </span>
            )}
          </div>

          <CategoryFilter categories={CATEGORIES} selected={category} onSelect={setCategory} />

          <div className="catalog__grid">
            <BookGrid
              books={visibleBooks}
              loading={loading}
              cartItems={items}
              onAddToCart={addToCart}
              onResetFilters={resetFilters}
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Page &amp; Quill Bookstore. Demo project.</p>
      </footer>
    </div>
  );
}
