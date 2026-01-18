import Image from 'next/image';
import { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
}

// Platform color mapping
function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    'EA App': 'bg-orange-500',
    Steam: 'bg-gray-600',
    'Xbox Live': 'bg-green-600',
    'PlayStation Network': 'bg-blue-600',
    'Nintendo eShop': 'bg-red-600',
    'Ubisoft Connect': 'bg-blue-500',
    'Battle.net': 'bg-blue-700',
    GOG: 'bg-purple-600',
  };
  return colors[platform] || 'bg-gray-600';
}

export function GameCard({ game }: GameCardProps) {
  const formatPrice = (price: number) => `€${price.toFixed(2)}`;

  return (
    <article className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-b from-gray-700 to-gray-800 mb-3 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:-translate-y-1">
        <Image
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Discount Badge - Top Right */}
        {game.discountPercent && game.discountPercent > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-1 rounded text-xs font-bold bg-orange-500 text-white shadow-lg">
              -{game.discountPercent}%
            </span>
          </div>
        )}

        {/* Cashback Badge - Bottom Left */}
        {game.cashbackEur && game.cashbackEur > 0 && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-lg">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              CASHBACK
            </span>
          </div>
        )}

        {/* Platform Badge - Bottom Right */}
        <div className="absolute bottom-3 right-3 z-10">
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white shadow-lg ${getPlatformColor(game.platform)}`}
          >
            {game.platform}
          </span>
        </div>

        {/* Hover Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="flex gap-2 pt-8">
            <button className="flex-1 py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold transition-colors shadow-lg">
              Add to cart
            </button>
            <button className="flex-1 py-2 px-3 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition-colors backdrop-blur-sm">
              Explore options
            </button>
          </div>
        </div>
      </div>

      {/* Content Below Card */}
      <div className="space-y-1.5 px-1">
        {/* Title */}
        <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight group-hover:text-emerald-400 transition-colors">
          {game.title}
        </h3>

        {/* Region */}
        <p className="text-xs font-medium text-emerald-400">{game.region}</p>

        {/* Price Section */}
        <div className="space-y-0.5">
          {/* Old Price + Discount */}
          {game.oldPriceEur && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-white/50">From</span>
              <span className="text-white/50 line-through">{formatPrice(game.oldPriceEur)}</span>
              {game.discountPercent && (
                <span className="text-emerald-400 font-medium">-{game.discountPercent}%</span>
              )}
            </div>
          )}

          {/* Current Price */}
          <p className="text-xl font-bold text-white">{formatPrice(game.priceEur)}</p>

          {/* Cashback Amount */}
          {game.cashbackEur && game.cashbackEur > 0 && (
            <p className="text-xs text-emerald-400">
              Cashback: <span className="font-semibold">€{game.cashbackEur.toFixed(2)}</span>
            </p>
          )}
        </div>

        {/* Likes */}
        <div className="flex items-center gap-1.5 text-white/50 pt-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span className="text-xs">{game.likes.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
}
