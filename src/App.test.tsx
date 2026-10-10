import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

async function renderLoaded() {
  render(<App loadDelayMs={0} />);
  await screen.findAllByRole('article');
}

describe('App', () => {
  it('shows a loading state before books appear', async () => {
    render(<App loadDelayMs={50} />);
    expect(screen.getAllByTestId('skeleton-card').length).toBeGreaterThan(0);
    expect(screen.getByRole('status')).toHaveTextContent('Loading books…');
    expect(await screen.findAllByRole('article')).toHaveLength(12);
  });

  it('filters books by search query (title or author)', async () => {
    const user = userEvent.setup();
    await renderLoaded();

    await user.type(screen.getByLabelText('Search books'), 'dragons');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByText('Dragons of Eldoria')).toBeInTheDocument();

    await user.clear(screen.getByLabelText('Search books'));
    await user.type(screen.getByLabelText('Search books'), 'ava chen');
    expect(screen.getByText('Clean TypeScript')).toBeInTheDocument();
  });

  it('filters books by category', async () => {
    const user = userEvent.setup();
    await renderLoaded();

    await user.click(screen.getByRole('button', { name: 'Science' }));
    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Science' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows an empty state and can reset filters', async () => {
    const user = userEvent.setup();
    await renderLoaded();

    await user.type(screen.getByLabelText('Search books'), 'zzzz-no-match');
    expect(screen.getByText('No books found')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getAllByRole('article')).toHaveLength(12);
  });

  it('updates the cart count when adding books', async () => {
    const user = userEvent.setup();
    await renderLoaded();

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    await user.click(screen.getByRole('button', { name: 'Add to Cart for The Silent River' }));
    await user.click(screen.getByRole('button', { name: 'Add more (1) for The Silent River' }));
    await user.click(screen.getByRole('button', { name: 'Add to Cart for Cosmos Explained' }));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
  });
});
