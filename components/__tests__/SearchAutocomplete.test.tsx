import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SearchAutocomplete } from '../SearchAutocomplete';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
        replace: vi.fn(),
        prefetch: vi.fn(),
    }),
    useSearchParams: () => ({
        get: vi.fn(() => null),
    }),
}));// Mock fetch for offer suggestions
const mockOffersResponse = {
    count: 2,
    items: [
        {
            id: '1',
            title: 'Split Fiction',
            platform: 'EA App',
            region: 'EUROPE',
            imageUrl: '/placeholder-game.png',
            priceEur: 34.99,
            oldPriceEur: 49.99,
            discountPercent: 30,
            cashbackEur: 0.87,
            likes: 892,
        },
        {
            id: '2',
            title: 'Split Fiction Xbox',
            platform: 'Xbox Live',
            region: 'GLOBAL',
            imageUrl: '/placeholder-game.png',
            priceEur: 39.99,
            oldPriceEur: null,
            discountPercent: null,
            cashbackEur: null,
            likes: 456,
        },
    ],
};

describe('SearchAutocomplete', () => {
    beforeEach(() => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockOffersResponse),
                })
            )
        );
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders search input with correct ARIA attributes', () => {
        render(<SearchAutocomplete />);
        const input = screen.getByRole('combobox');

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('aria-expanded', 'false');
        expect(input).toHaveAttribute('aria-autocomplete', 'list');
        expect(input).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('opens dropdown on input focus with query', async () => {
        render(<SearchAutocomplete />);
        const input = screen.getByRole('combobox');

        await act(async () => {
            fireEvent.change(input, { target: { value: 'split' } });
            vi.advanceTimersByTime(200);
        });

        await waitFor(() => {
            expect(input).toHaveAttribute('aria-expanded', 'true');
        });
    });

    it('shows query suggestions when typing', async () => {
        render(<SearchAutocomplete />);
        const input = screen.getByRole('combobox');

        await act(async () => {
            fireEvent.change(input, { target: { value: 'split' } });
            vi.advanceTimersByTime(200);
        });

        await waitFor(() => {
            expect(screen.getByText('split steam')).toBeInTheDocument();
            expect(screen.getByText('split xbox')).toBeInTheDocument();
        });
    });

    it('shows offer suggestions from API', async () => {
        render(<SearchAutocomplete />);
        const input = screen.getByRole('combobox');

        await act(async () => {
            fireEvent.change(input, { target: { value: 'split' } });
            vi.advanceTimersByTime(200);
        });

        await waitFor(() => {
            expect(screen.getByText('Split Fiction')).toBeInTheDocument();
        });
    });

    it('navigates with ArrowDown key', async () => {
        render(<SearchAutocomplete />);
        const input = screen.getByRole('combobox');

        await act(async () => {
            fireEvent.change(input, { target: { value: 'split' } });
            vi.advanceTimersByTime(200);
        });

        await waitFor(() => {
            expect(input).toHaveAttribute('aria-expanded', 'true');
        });

        await act(async () => {
            fireEvent.keyDown(input, { key: 'ArrowDown' });
        });

        // First option should be active
        const firstOption = screen.getByRole('option', { name: /split steam/i });
        expect(firstOption).toHaveAttribute('aria-selected', 'true');
    });

    it('closes dropdown on Escape', async () => {
        render(<SearchAutocomplete />);
        const input = screen.getByRole('combobox');

        await act(async () => {
            fireEvent.change(input, { target: { value: 'split' } });
            vi.advanceTimersByTime(200);
        });

        await waitFor(() => {
            expect(input).toHaveAttribute('aria-expanded', 'true');
        });

        await act(async () => {
            fireEvent.keyDown(input, { key: 'Escape' });
        });

        expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    it('clears input when clear button is clicked', async () => {
        const onSearch = vi.fn();
        render(<SearchAutocomplete onSearch={onSearch} />);
        const input = screen.getByRole('combobox');

        await act(async () => {
            fireEvent.change(input, { target: { value: 'split' } });
            vi.advanceTimersByTime(350);
        });

        const clearButton = screen.getByLabelText('Clear search');
        expect(clearButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(clearButton);
        });

        expect(input).toHaveValue('');
        expect(onSearch).toHaveBeenCalledWith('');
    });

    it('selects item on Enter and updates input', async () => {
        const onSearch = vi.fn();
        render(<SearchAutocomplete onSearch={onSearch} />);
        const input = screen.getByRole('combobox');

        await act(async () => {
            fireEvent.change(input, { target: { value: 'split' } });
            vi.advanceTimersByTime(200);
        });

        await waitFor(() => {
            expect(input).toHaveAttribute('aria-expanded', 'true');
            expect(screen.getByText('split steam')).toBeInTheDocument();
        });

        // Navigate to first suggestion
        await act(async () => {
            fireEvent.keyDown(input, { key: 'ArrowDown' });
        });

        // Verify first option is active
        const firstOption = screen.getByRole('option', { name: /split steam/i });
        expect(firstOption).toHaveAttribute('aria-selected', 'true');

        // Press Enter
        await act(async () => {
            fireEvent.keyDown(input, { key: 'Enter' });
        });

        expect(input).toHaveValue('split steam');
        expect(onSearch).toHaveBeenCalledWith('split steam');
        expect(input).toHaveAttribute('aria-expanded', 'false');
    });
});
