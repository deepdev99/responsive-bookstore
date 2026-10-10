import type { Category, CategoryFilterValue } from '../types';
import './CategoryFilter.css';

interface CategoryFilterProps {
  categories: Category[];
  selected: CategoryFilterValue;
  onSelect: (category: CategoryFilterValue) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const options: CategoryFilterValue[] = ['All', ...categories];

  return (
    <div className="category-filter" role="group" aria-label="Filter by category">
      {options.map((category) => {
        const active = category === selected;
        return (
          <button
            key={category}
            type="button"
            className={`category-filter__chip ${active ? 'category-filter__chip--active' : ''}`}
            aria-pressed={active}
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
