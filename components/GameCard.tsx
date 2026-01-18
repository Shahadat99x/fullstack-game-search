import Image from 'next/image';
import { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
}

// Platform color/icon mapping
function getPlatformInfo(platform: string): { label: string; icon: string } {
  const mapping: Record<string, { label: string; icon: string }> = {
    'EA App': { label: 'EA App', icon: 'EA' },
    Steam: { label: 'Steam', icon: 'STEAM' },
    'Xbox Live': { label: 'Xbox Live', icon: 'XBOX' },
    'PlayStation Network': { label: 'PSN', icon: 'PS' },
    'Nintendo eShop': { label: 'Nintendo', icon: 'NSW' },
    'Ubisoft Connect': { label: 'Ubisoft', icon: 'UBI' },
    'Battle.net': { label: 'Battle.net', icon: 'BNET' },
    GOG: { label: 'GOG', icon: 'GOG' },
  };
  return mapping[platform] || { label: platform, icon: 'GAME' };
}

export function GameCard({ game }: GameCardProps) {
  const formatPrice = (price: number) => `€${price.toFixed(2)}`;
  const platformInfo = getPlatformInfo(game.platform);

  return (
    <article className="group relative flex flex-col h-full bg-[#2a1a5e] rounded-xl overflow-hidden shadow-lg hover:shadow-black/50 transition-all duration-300">
      {/* Image Container - Fixed Aspect Ratio */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#201040]">
        <Image
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={false}
        />

        {/* Wishlist Heart - Top Right (Visible on Hover) */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          <button className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Cashback Badge - Bottom Left */}
        {game.cashbackEur && game.cashbackEur > 0 && (
          <div className="absolute bottom-2 left-2 z-10">
            <div className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-[#00d68f] text-white shadow-md">
              <div className="w-3.5 h-3.5 flex items-center justify-center rounded-full border-[1.5px] border-white">
                <span className="text-[9px] font-bold leading-none">+</span>
              </div>
              <span className="text-[10px] font-bold tracking-wide uppercase">CASHBACK</span>
            </div>
          </div>
        )}

        {/* Discount Badge - Top Right */}
        {game.discountPercent && game.discountPercent > 0 && (
          <div className="absolute top-2 right-2 z-10">
            <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-[#ff6b35] text-white shadow-sm">
              -{game.discountPercent}%
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-3 gap-1 relative z-20 bg-[#2a1a5e]">
        {/* Platform Row */}
        <div className="flex items-center gap-1.5 text-xs text-gray-300">
          <span className="font-bold opacity-70">{platformInfo.icon}</span>
          <span className="truncate">{platformInfo.label}</span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-white leading-tight line-clamp-2 min-h-[40px] mb-0.5 group-hover:underline decoration-2 underline-offset-2">
          {game.title}
        </h3>

        {/* Region */}
        <div className="text-[11px] font-bold text-[#00d68f] uppercase tracking-wide mb-auto">
          {game.region}
        </div>

        {/* Price Section */}
        <div className="mt-2 flex flex-col items-end">
          {/* Old Price row */}
          {game.oldPriceEur && (
            <div className="text-xs text-gray-400 line-through">
              From {formatPrice(game.oldPriceEur)} <span className="text-[#00d68f]">-{game.discountPercent}%</span>
            </div>
          )}

          {/* Main Price */}
          <div className="text-[22px] font-extrabold text-white leading-none mt-0.5">
            {formatPrice(game.priceEur)}
          </div>

          {/* Cashback Value */}
          {game.cashbackEur && game.cashbackEur > 0 && (
            <div className="text-[10px] text-[#00d68f] text-right mt-0.5">
              Cashback: <span className="font-bold">€{game.cashbackEur.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Lights Count */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-gray-400 group-hover:opacity-0 transition-opacity duration-200">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          <span className="text-xs font-medium">{game.likes}</span>
        </div>
      </div>

      {/* Hover Actions Overlay - Slide Up */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#2a1a5e] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-30 shadow-[0_-8px_16px_rgba(0,0,0,0.5)] border-t border-white/5">
        <div className="flex flex-col gap-2">
          {/* Primary: Add to Cart (Yellow) */}
          <button className="w-full py-2.5 rounded-lg bg-[#ebbf2d] hover:bg-[#d4ac28] text-black text-sm font-extrabold shadow-lg transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to cart
          </button>

          {/* Secondary: Explore Options (Ghost/Bordered) */}
          <button className="w-full py-2 rounded-lg border border-white/30 hover:bg-white/10 text-white text-sm font-bold transition-colors">
            Explore options
          </button>
        </div>
      </div>
    </article>
  );
}
