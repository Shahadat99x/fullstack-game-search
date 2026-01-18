import Image from 'next/image';
import { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl 
                        bg-gray-800/50 ring-1 ring-gray-700/50 
                        hover:ring-orange-500/50 hover:bg-gray-800 
                        transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Discount Badge */}
        {game.discountPercent && (
          <div
            className="absolute top-2 left-2 rounded-md bg-orange-500 px-2 py-1 
                          text-xs font-bold text-white shadow-lg"
          >
            -{game.discountPercent}%
          </div>
        )}

        {/* Likes Badge */}
        <div
          className="absolute top-2 right-2 flex items-center gap-1 rounded-full 
                        bg-gray-900/80 px-2 py-1 backdrop-blur-sm"
        >
          <svg
            className="h-3.5 w-3.5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs font-medium text-white">{game.likes.toLocaleString()}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Platform & Region */}
        <div className="mb-2 flex items-center gap-2">
          <span
            className="inline-flex items-center rounded-full bg-gray-700/50 
                           px-2 py-0.5 text-xs font-medium text-gray-300"
          >
            {game.platform}
          </span>
          <span className="text-xs text-gray-500">{game.region}</span>
        </div>

        {/* Title */}
        <h3
          className="mb-auto text-sm font-semibold text-white line-clamp-2 
                       group-hover:text-orange-400 transition-colors"
        >
          {game.title}
        </h3>

        {/* Price Section */}
        <div className="mt-3 space-y-1">
          {game.cashbackEur && (
            <p className="text-xs text-green-400">+€{game.cashbackEur.toFixed(2)} cashback</p>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">€{game.priceEur.toFixed(2)}</span>
            {game.oldPriceEur && (
              <span className="text-sm text-gray-500 line-through">
                €{game.oldPriceEur.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
