# Page & Quill — Responsive Bookstore

A responsive eCommerce bookstore frontend built with **React 18**, **TypeScript** (strict mode), and plain **CSS** (no UI framework), bundled with **Vite**. All book data is stored locally — **no backend, API key, or environment variables are required**.

## Features

- **Homepage layout** — sticky header with logo, navigation, search bar and cart; hero banner; catalog section; footer.
- **Book cards** — cover image, title, author, category badge, price, and an *Add to Cart* button.
- **Live search** — filters by title or author as you type (case-insensitive, extra whitespace ignored), with a clear button.
- **Category filters** — toggle buttons (`All`, Fiction, Science, History, Technology, Fantasy, Biography) using `aria-pressed`.
- **Cart count** — header badge shows the total number of items; each card shows how many copies are already in the cart. Cart contents persist while filters change (in memory only — refreshing the page resets it).
- **Loading state** — skeleton cards plus a screen-reader announcement while the catalogue "loads" (a short simulated delay).
- **Empty state** — "No books found" message with a *Clear filters* action that resets search and category.
- **Responsive design** — CSS media queries:

  | Width          | Grid columns | Navigation                          |
  | -------------- | ------------ | ----------------------------------- |
  | > 1024px       | 4            | Inline in header                    |
  | 769 – 1024px   | 3            | Second row under logo/search        |
  | 641 – 768px    | 2            | Second row under logo/search        |
  | 361 – 640px    | 2            | Hamburger menu; scrollable chips    |
  | ≤ 360px        | 1            | Hamburger menu; scrollable chips    |

- **Offline covers** — cover images are generated locally as SVG data URIs, so nothing is fetched from the network.
- **Accessibility** — semantic landmarks and headings, labelled controls, 44×44px minimum touch targets, visible keyboard focus, WCAG AA colour contrast, accessible names that match visible button text, live result count, and `prefers-reduced-motion` support.

## Prerequisites

- **Node.js 18 or newer** (tested with Node 22) — check with `node --version`
- **npm** (bundled with Node.js)

## Installation

```bash
git clone <your-repo-url> responsive-bookstore   # or download and unzip the project
cd responsive-bookstore
npm install
```

> **Windows PowerShell:** if you see *"running scripts is disabled on this system"*, use `npm.cmd` instead of `npm` (for example `npm.cmd install`, `npm.cmd run dev`), or run the commands from Command Prompt.

## Running the app

### Development

```bash
npm run dev
```

Open the URL printed in the terminal (by default **http://localhost:5173**). The page reloads automatically when you edit files.

### Production build

```bash
npm run build     # type-checks, then outputs static files to dist/
npm run preview   # serves dist/ at http://localhost:4173
```

The contents of `dist/` are plain static files and can be deployed to any static host (Netlify, Vercel, GitHub Pages, S3, etc.).

## Quality checks

```bash
npm run lint        # ESLint (TypeScript + React Hooks rules)
npm run typecheck   # TypeScript compiler, no output
npm test            # Vitest + React Testing Library
```

## Scripts

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the Vite development server             |
| `npm run build`     | Type-check and build for production (`dist/`) |
| `npm run preview`   | Preview the production build locally          |
| `npm run lint`      | Run ESLint                                    |
| `npm run typecheck` | Run the TypeScript compiler                   |
| `npm test`          | Run unit/integration tests once               |

## Project structure

```
src/
├── components/
│   ├── Header.tsx / .css          # Logo, nav (hamburger on mobile), search, cart badge
│   ├── SearchBar.tsx / .css       # Controlled search input with clear button
│   ├── CategoryFilter.tsx / .css  # Category toggle buttons
│   ├── BookGrid.tsx / .css        # Responsive grid + loading/empty states
│   ├── BookCard.tsx / .css        # Single book card
│   ├── SkeletonCard.tsx / .css    # Loading placeholder
│   └── EmptyState.tsx / .css      # Generic "nothing here" message with optional action
├── data/books.ts                  # Local sample catalogue and category list
├── hooks/
│   ├── useBooks.ts                # Loads local data with a simulated delay
│   └── useCart.ts                 # Cart state (id -> quantity) and total count
├── utils/
│   ├── filterBooks.ts             # Pure search + category filter
│   ├── cover.ts                   # Generates SVG cover data URIs
│   └── format.ts                  # Currency formatting
├── types.ts                       # Shared TypeScript types (Book, Category, CartItems…)
├── App.tsx / App.css              # Page composition and state wiring
├── App.test.tsx                   # Core app tests (loading, search, filter, cart)
├── features.test.tsx              # Edge-case tests for search, filters and cart
├── setupTests.ts                  # Test setup (jest-dom matchers)
├── index.css                      # Global styles, CSS variables, focus styles
└── main.tsx                       # Entry point
```

Components receive data and callbacks via typed props and hold no global state, so they can be reused independently — for example, `EmptyState` accepts any title/message/action, and `CategoryFilter` works with any list of categories.

## Customising data

Edit [`src/data/books.ts`](src/data/books.ts) to add or change books. To add a new category, extend the `Category` union in [`src/types.ts`](src/types.ts) and add it to the `CATEGORIES` array — TypeScript will flag any book using an unknown category. If you change a cover colour, keep white text readable (contrast ratio of at least 4.5:1).

## Limitations

This is a frontend demo: there is no checkout, cart page, persistence, or real product API. Navigation links (`Home`, `New Arrivals`, …) are placeholders.
