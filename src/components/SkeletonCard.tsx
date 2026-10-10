import './SkeletonCard.css';

export default function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true" data-testid="skeleton-card">
      <div className="skeleton-card__cover skeleton" />
      <div className="skeleton-card__body">
        <div className="skeleton skeleton-card__line" />
        <div className="skeleton skeleton-card__line skeleton-card__line--short" />
        <div className="skeleton skeleton-card__button" />
      </div>
    </div>
  );
}
