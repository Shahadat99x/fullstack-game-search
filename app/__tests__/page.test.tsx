import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '../page';

// Mock the fetch API
const mockGamesResponse = {
  count: 3,
  items: [
    {
      id: '1',
      title: 'FIFA 23',
      platform: 'EA App',
      region: 'GLOBAL',
      imageUrl: '/placeholder-game.png',
      priceEur: 19.99,
      oldPriceEur: 59.99,
      discountPercent: 67,
      cashbackEur: 0.5,
      likes: 1245,
    },
    {
      id: '2',
      title: 'Red Dead Redemption 2',
      platform: 'Steam',
      region: 'GLOBAL',
      imageUrl: '/placeholder-game.png',
      priceEur: 29.99,
      oldPriceEur: 59.99,
      discountPercent: 50,
      cashbackEur: 0.75,
      likes: 3420,
    },
    {
      id: '3',
      title: 'Split Fiction',
      platform: 'EA App',
      region: 'EUROPE',
      imageUrl: '/placeholder-game.png',
      priceEur: 34.99,
      oldPriceEur: null,
      discountPercent: null,
      cashbackEur: 0.87,
      likes: 892,
    },
  ],
};

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGamesResponse),
      })
    )
  );
});

describe('Home Page', () => {
  it('renders header with brand', async () => {
    render(<Home />);
    expect(screen.getByText('eneba')).toBeInTheDocument();
  });

  it('renders search input', async () => {
    render(<Home />);
    const searchInput = screen.getByRole('textbox', { name: /search games/i });
    expect(searchInput).toBeInTheDocument();
  });

  it('renders results summary after loading', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText(/Results found:/i)).toBeInTheDocument();
    });
  });

  it('renders game titles after loading', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('FIFA 23')).toBeInTheDocument();
    });
  });

  it('renders multiple game cards after loading', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Red Dead Redemption 2')).toBeInTheDocument();
      expect(screen.getByText('Split Fiction')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    render(<Home />);
    expect(screen.getByText('Loading games...')).toBeInTheDocument();
  });
});
