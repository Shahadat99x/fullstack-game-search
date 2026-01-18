import { Header } from '@/components/Header';
import { ResultsSummary } from '@/components/ResultsSummary';
import { GameGrid } from '@/components/GameGrid';
import { mockGames } from '@/lib/mock/games';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ResultsSummary count={mockGames.length} />
        <GameGrid games={mockGames} />
      </main>
    </div>
  );
}
