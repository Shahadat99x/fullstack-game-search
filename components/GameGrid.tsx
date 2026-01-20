import { Game } from '@/types/game';
import { GameCard } from './GameCard';

interface GameGridProps {
  games: Game[];
}

export function GameGrid({ games }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 mb-6 rounded-2xl bg-white/10 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No games found</h3>
        <p className="text-white/60 max-w-sm">
          Try adjusting your search terms or browse our full catalog
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 max-w-[1240px] mx-auto auto-rows-fr">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
