import { useState } from 'react';
import SearchBar from './SearchBar';
import './Header.css';

interface HeaderProps {
  cartCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const NAV_LINKS = ['Home', 'New Arrivals', 'Bestsellers', 'Deals'];

export default function Header({ cartCount, searchQuery, onSearchChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__inner">
        <a href="#" className="header__logo" aria-label="Page & Quill home">
          <span className="header__logo-mark" aria-hidden="true">P</span>
          <span className="header__logo-text">Page &amp; Quill</span>
        </a>

        <button
          type="button"
          className="header__menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-nav"
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          aria-label="Main navigation"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a href="#" onClick={() => setMenuOpen(false)}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__search">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        <button
          type="button"
          className="header__cart"
          aria-label={`Shopping cart with ${cartCount} item${cartCount === 1 ? '' : 's'}`}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7.2 14h9.9c.8 0 1.4-.4 1.8-1.1L22 6H5.2l-.9-2H1v2h2l3.6 7.6L5.2 16c-.7 1.3.2 3 1.8 3H19v-2H7l1.1-2Z"
            />
          </svg>
          <span className="header__cart-count" data-testid="cart-count">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
}
