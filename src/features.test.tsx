import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BOOKS } from './data/books';
import { filterBooks } from './utils/filterBooks';

async function setup() {
  const user = userEvent.setup();
  render(<App loadDelayMs={0} />);
  await screen.findAllByRole('article');
  return user;
}

const titles = () =>
  screen.queryAllByRole('article').map((a) => within(a).getByRole('heading').textContent);

describe('filterBooks', () => {
  it('is case-insensitive and ignores surrounding whitespace', () => {
    expect(filterBooks(BOOKS, '  COSMOS ', 'All').map((b) => b.id)).toEqual(['3']);
  });

  it('treats repeated spaces inside the query like a single space', () => {
    expect(filterBooks(BOOKS, 'ava   chen', 'All').map((b) => b.title)).toEqual(['Clean TypeScript']);
  });

  it('combines search and category', () => {
    expect(filterBooks(BOOKS, 'the', 'Fantasy').map((b) => b.title)).toEqual(['The Iron Crown']);
  });
});

describe('search', () => {
  it('matches partial author names', async () => {
    const user = await setup();
    await user.type(screen.getByLabelText('Search books'), 'marsh');
    expect(titles()).toEqual(['The Silent River']);
    expect(screen.getByText('1 book')).toBeInTheDocument();
  });

  it('clear button empties the query and restores all books', async () => {
    const user = await setup();
    await user.type(screen.getByLabelText('Search books'), 'dragons');
    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(screen.getByLabelText('Search books')).toHaveValue('');
    expect(titles()).toHaveLength(12);
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });
});

describe('category filters', () => {
  it('only one category is pressed at a time and the heading follows it', async () => {
    const user = await setup();
    await user.click(screen.getByRole('button', { name: 'History' }));
    expect(screen.getByRole('heading', { level: 2, name: 'History' })).toBeInTheDocument();
    const pressed = screen
      .getByRole('group', { name: 'Filter by category' })
      .querySelectorAll('[aria-pressed="true"]');
    expect(pressed).toHaveLength(1);
    expect(titles().sort()).toEqual(['Empires of Sand', 'The Long War']);

    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(titles()).toHaveLength(12);
  });

  it('every category shows only its own books', async () => {
    const user = await setup();
    for (const category of ['Fiction', 'Science', 'History', 'Technology', 'Fantasy', 'Biography']) {
      await user.click(screen.getByRole('button', { name: category }));
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(BOOKS.filter((b) => b.category === category).length);
      cards.forEach((card) => expect(within(card).getByText(category)).toBeInTheDocument());
    }
  });

  it('search + category with no match shows empty state; Clear filters resets both', async () => {
    const user = await setup();
    await user.click(screen.getByRole('button', { name: 'Science' }));
    await user.type(screen.getByLabelText('Search books'), 'dragons');
    expect(screen.getByText('No books found')).toBeInTheDocument();
    expect(screen.getByText('0 books')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByLabelText('Search books')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(titles()).toHaveLength(12);
  });
});

describe('cart', () => {
  it('Add to Cart buttons have accessible names that include their visible label', async () => {
    await setup();
    for (const card of screen.getAllByRole('article')) {
      const button = within(card).getByRole('button');
      const title = within(card).getByRole('heading').textContent;
      // WCAG 2.5.3 Label in Name: the accessible name starts with the visible text
      expect(button).toHaveAccessibleName(`Add to Cart for ${title}`);
      expect(button).not.toHaveAttribute('aria-label');
    }
  });

  it('button label shows quantity per book and header count shows the total', async () => {
    const user = await setup();
    const card = screen.getByRole('heading', { name: 'The Gene Code' }).closest('article')!;
    const button = within(card).getByRole('button');

    await user.click(button);
    await user.click(button);
    expect(button).toHaveTextContent('Add more (2)');
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByRole('button', { name: /shopping cart with 2 items/i })).toBeInTheDocument();
  });

  it('uses singular wording for one item', async () => {
    const user = await setup();
    await user.click(within(screen.getAllByRole('article')[0]).getByRole('button'));
    expect(screen.getByRole('button', { name: 'Shopping cart with 1 item' })).toBeInTheDocument();
  });

  it('keeps cart contents when filters change', async () => {
    const user = await setup();
    const first = screen.getByRole('heading', { name: 'The Silent River' }).closest('article')!;
    await user.click(within(first).getByRole('button'));

    await user.click(screen.getByRole('button', { name: 'Science' }));
    await user.type(screen.getByLabelText('Search books'), 'zzz');
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');

    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    const again = screen.getByRole('heading', { name: 'The Silent River' }).closest('article')!;
    expect(within(again).getByRole('button')).toHaveTextContent('Add more (1)');
  });

  it('works with the keyboard', async () => {
    const user = await setup();
    const button = within(screen.getAllByRole('article')[0]).getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
  });
});
