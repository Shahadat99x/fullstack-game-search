'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from '@/components/Header';
import { FiltersSidebar } from '@/components/filters/FiltersSidebar';
import { SortDropdown } from '@/components/SortDropdown';
import { ResultsSummary } from '@/components/ResultsSummary';
import { GameGrid } from '@/components/GameGrid';
import { LoadingSpinner, ErrorMessage } from '@/components/LoadingState';
import { Game } from '@/types/game';
import { FilterState, DEFAULT_FILTERS, SortOption } from '@/types/filters';

interface GamesResponse {
  count: number;
  items: Game[];
}

/**
 * Apply client-side filters to games array
 */
function applyClientFilters(games: Game[], filters: FilterState): Game[] {
  let result = [...games];

  // Price filter (already applied server-side, but keep for consistency)
  if (filters.priceMin !== null) {
    result = result.filter((g) => g.priceEur >= filters.priceMin!);
  }
  if (filters.priceMax !== null) {
    result = result.filter((g) => g.priceEur <= filters.priceMax!);
  }

  // Country filter
  if (filters.countries.length > 0) {
    result = result.filter((g) => filters.countries.includes(g.country));
  }

  // Product type filter
  if (filters.productTypes.length > 0) {
    result = result.filter((g) => filters.productTypes.includes(g.productType));
  }

  // Operating system filter
  if (filters.operatingSystems.length > 0) {
    result = result.filter((g) => filters.operatingSystems.includes(g.operatingSystem));
  }

  // Genre filter
  if (filters.genres.length > 0) {
    result = result.filter((g) => filters.genres.includes(g.genre));
  }

  // Region filter (already applied server-side)
  if (filters.region) {
    result = result.filter((g) => g.region === filters.region);
  }

  // Platform filter (already applied server-side)
  if (filters.platforms.length > 0) {
    result = result.filter((g) => filters.platforms.includes(g.platform));
  }

  // Client-side sorting
  switch (filters.sort) {
    case 'price_asc':
      result.sort((a, b) => a.priceEur - b.priceEur);
      break;
    case 'price_desc':
      result.sort((a, b) => b.priceEur - a.priceEur);
      break;
    case 'discount':
      result.sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0));
      break;
    case 'popularity':
    default:
      result.sort((a, b) => b.likes - a.likes);
      break;
  }

  return result;
}

export default function Home() {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch games from API (search only, no server-side filters)
  const fetchGames = useCallback(async (search: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);

      const url = `/api/list${params.toString() ? `?${params}` : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }

      const data: GamesResponse = await response.json();
      setAllGames(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setAllGames([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refetch when search changes
  useEffect(() => {
    fetchGames(searchTerm);
  }, [fetchGames, searchTerm]);

  // Apply client-side filtering
  const filteredGames = useMemo(
    () => applyClientFilters(allGames, filters),
    [allGames, filters]
  );

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((sort: SortOption) => {
    setFilters((prev) => ({ ...prev, sort }));
  }, []);

  return (
    <div className="min-h-screen">
      <Header onSearch={handleSearch} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden mb-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block">
            <FiltersSidebar filters={filters} onFiltersChange={handleFiltersChange} />
          </div>

          {/* Mobile Filter Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="absolute inset-y-0 left-0 w-80 max-w-full bg-[var(--bg-primary)] p-4 overflow-y-auto">
                <FiltersSidebar
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClose={() => setShowMobileFilters(false)}
                />
              </div>
            </div>
          )}

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <ResultsSummary count={filteredGames.length} />
              <SortDropdown value={filters.sort} onChange={handleSortChange} />
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : (
              <GameGrid games={filteredGames} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
