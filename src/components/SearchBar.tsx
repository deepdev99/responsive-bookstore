import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar" role="search">
      <svg className="search-bar__icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 14 15.5l.3.3v.8l5 5 1.5-1.5-5-5Zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"
        />
      </svg>
      <input
        type="search"
        className="search-bar__input"
        placeholder="Search by title or author"
        aria-label="Search books"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          aria-label="Clear search"
          onClick={() => onChange('')}
        >
          ×
        </button>
      )}
    </div>
  );
}
