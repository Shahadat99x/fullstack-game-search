'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { FilterSidebar } from '@/components/FilterSidebar';
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

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const fetchGames = useCallback(async (search: string, currentFilters: FilterState) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (search) params.set('search', search);
      if (currentFilters.priceMin !== null) params.set('priceMin', String(currentFilters.priceMin));
      if (currentFilters.priceMax !== null) params.set('priceMax', String(currentFilters.priceMax));
      if (currentFilters.region) params.set('region', currentFilters.region);
      if (currentFilters.platforms.length > 0)
        params.set('platforms', currentFilters.platforms.join(','));
      if (currentFilters.sort !== 'popularity') params.set('sort', currentFilters.sort);

      const url = `/api/list${params.toString() ? `?${params}` : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }

      const data: GamesResponse = await response.json();
      setGames(data.items);
      setCount(data.count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setGames([]);
      setCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load and refetch on filter changes
  useEffect(() => {
    fetchGames(searchTerm, filters);
  }, [fetchGames, searchTerm, filters]);

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
            <FilterSidebar filters={filters} onFiltersChange={handleFiltersChange} />
          </div>

          {/* Mobile Filter Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="absolute inset-y-0 left-0 w-80 max-w-full bg-[var(--bg-primary)] p-4 overflow-y-auto">
                <FilterSidebar
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
              <ResultsSummary count={count} />
              <SortDropdown value={filters.sort} onChange={handleSortChange} />
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} />
            ) : (
              <GameGrid games={games} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
