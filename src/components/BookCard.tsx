import type { Book } from '../types';
import { getCoverDataUri } from '../utils/cover';
import { formatPrice } from '../utils/format';
import './BookCard.css';

interface BookCardProps {
  book: Book;
  quantityInCart: number;
  onAddToCart: (bookId: string) => void;
}

export default function BookCard({ book, quantityInCart, onAddToCart }: BookCardProps) {
  return (
    <article className="book-card">
      <div className="book-card__cover">
        <img
          src={getCoverDataUri(book)}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          width={200}
          height={300}
        />
        <span className="book-card__category">{book.category}</span>
      </div>
      <div className="book-card__body">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
        <div className="book-card__footer">
          <span className="book-card__price">{formatPrice(book.price)}</span>
          <button
            type="button"
            className="book-card__button"
            onClick={() => onAddToCart(book.id)}
          >
            {quantityInCart > 0 ? `Add more (${quantityInCart})` : 'Add to Cart'}
            <span className="visually-hidden"> for {book.title}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
