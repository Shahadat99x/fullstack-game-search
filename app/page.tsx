'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { ResultsSummary } from '@/components/ResultsSummary';
import { GameGrid } from '@/components/GameGrid';
import { LoadingSpinner, ErrorMessage } from '@/components/LoadingState';
import { Game } from '@/types/game';

interface GamesResponse {
  count: number;
  items: Game[];
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = useCallback(async (search: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = search ? `/api/list?search=${encodeURIComponent(search)}` : '/api/list';
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

  // Initial load
  useEffect(() => {
    fetchGames('');
  }, [fetchGames]);

  // Handle search changes
  const handleSearch = useCallback(
    (term: string) => {
      fetchGames(term);
    },
    [fetchGames]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      <Header onSearch={handleSearch} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ResultsSummary count={count} />

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <GameGrid games={games} />
        )}
      </main>
    </div>
  );
}
