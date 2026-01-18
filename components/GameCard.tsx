import Image from 'next/image';
import { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const formatPrice = (price: number) => `€${price.toFixed(2)}`;

  return (
    <article className="eneba-card overflow-hidden flex flex-col cursor-pointer group">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--bg-secondary)]">
        <Image
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Cashback Badge - Top Left */}
        {game.cashbackEur && game.cashbackEur > 0 && (
          <div className="absolute top-2 left-2">
            <span className="badge-cashback">Cashback €{game.cashbackEur.toFixed(2)}</span>
          </div>
        )}

        {/* Discount Badge - Top Right */}
        {game.discountPercent && game.discountPercent > 0 && (
          <div className="absolute top-2 right-2">
            <span className="badge-discount">-{game.discountPercent}%</span>
          </div>
        )}

        {/* Likes - Bottom Right */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
          <svg className="h-3.5 w-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
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
      <div className="flex flex-col flex-1 p-3">
        {/* Platform & Region Row */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-[var(--text-secondary)] font-medium">{game.platform}</span>
          <span className="badge-region">{game.region}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white line-clamp-2 mb-auto group-hover:text-[var(--accent-orange)] transition-colors">
          {game.title}
        </h3>

        {/* Price Section */}
        <div className="mt-3 pt-3 border-t border-[var(--border-color)]">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="price-current">{formatPrice(game.priceEur)}</span>
            {game.oldPriceEur && <span className="price-old">{formatPrice(game.oldPriceEur)}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
