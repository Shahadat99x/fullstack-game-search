import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '../page';

describe('Home Page', () => {
  it('renders header with brand', () => {
    render(<Home />);
    expect(screen.getByText('eneba')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<Home />);
    const searchInput = screen.getByRole('textbox', { name: /search games/i });
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Search...');
  });

  it('renders results summary', () => {
    render(<Home />);
    expect(screen.getByText(/Results found:/i)).toBeInTheDocument();
  });

  it('renders at least one game title', () => {
    render(<Home />);
    expect(screen.getByText('FIFA 23')).toBeInTheDocument();
  });

  it('renders multiple game cards', () => {
    render(<Home />);
    expect(screen.getByText('Red Dead Redemption 2')).toBeInTheDocument();
    expect(screen.getByText('Split Fiction')).toBeInTheDocument();
  });
});
