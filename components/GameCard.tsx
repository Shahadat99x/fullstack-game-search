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

// Helper for region color
function getRegionColor(region: string): string {
  const r = region.toUpperCase();
  if (r.includes('EUROPE')) return 'text-[#d63384]';
  if (r.includes('GLOBAL')) return 'text-[#00ffff]';
  if (r.includes('UNITED STATES')) return 'text-[#ffc107]';
  return 'text-[#00d68f]';
}

export function GameCard({ game }: GameCardProps) {
  const formatPrice = (price: number) => `€${price.toFixed(2)}`;
  const platformInfo = getPlatformInfo(game.platform);
  const regionColor = getRegionColor(game.region);

  return (
    <article className="group relative flex flex-col h-full bg-[#392b6b] rounded-[14px] overflow-hidden hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 transform-gpu translate-z-0">
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full bg-[#201040]">
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

        {/* Cashback Badge - Persistent on Image */}
        {game.cashbackEur && game.cashbackEur > 0 && (
          <div className="absolute bottom-2 left-2 z-10 transition-opacity duration-300 group-hover:opacity-0">
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

      {/* Platform Bar - Distinct Strip - Appears above content */}
      <div className="relative z-20 flex items-center w-full px-3 py-1 bg-black/40 backdrop-blur-[2px]">
        <span className="w-4 h-4 flex items-center justify-center text-[10px] font-black bg-white text-black rounded-sm mr-2">
          {platformInfo.icon.charAt(0)}
        </span>
        <span className="text-[11px] font-bold text-white/90 uppercase tracking-wide truncate">
          {platformInfo.label}
        </span>
      </div>

      {/* Main Content & Buttons Wrapper */}
      {/* Defined height to ensure consistent card size, but overflow hidden for animation */}
      <div className="flex flex-col flex-1 relative bg-[#392b6b] overflow-hidden">

        {/* Sliding Content Container */}
        {/* On Hover: Moves UP to make room for buttons */}
        <div className="flex flex-col p-3 gap-0.5 transition-transform duration-300 ease-out group-hover:-translate-y-[110px]">

          {/* Title */}
          <h3 className="text-[15px] font-bold text-white leading-tight line-clamp-2 min-h-[38px] mb-1 group-hover:underline decoration-2 underline-offset-2">
            {game.title}
          </h3>

          {/* Region */}
          <div className={`text-[10px] font-bold uppercase tracking-wider mb-auto ${regionColor}`}>
            {game.region}
          </div>

          {/* Price Section */}
          <div className="mt-3 flex flex-col items-end relative">
            {/* Old Price row */}
            {game.oldPriceEur && (
              <div className="text-[11px] text-gray-400 font-medium">
                From <span className="line-through">{formatPrice(game.oldPriceEur)}</span> <span className="text-[#00d68f]">-{game.discountPercent}%</span>
              </div>
            )}

            {/* Main Price */}
            <div className="text-[22px] font-extrabold text-white leading-none mt-0.5">
              {formatPrice(game.priceEur)} <span className="text-[10px] text-gray-400 font-normal align-top ml-0.5">ⓘ</span>
            </div>

            {/* Cashback Value */}
            {game.cashbackEur && game.cashbackEur > 0 && (
              <div className="text-[10px] text-[#00d68f] text-right mt-0.5 font-medium">
                Cashback: <span className="font-bold">€{game.cashbackEur.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Lights Count */}
          <div className="flex items-center gap-1 text-gray-400 mt-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span className="text-xs font-medium">{game.likes}</span>
          </div>
        </div>

        {/* Buttons - Absolute Bottom - Slide Up */}
        {/* Initially translated down. On hover, slides up to 0 */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#392b6b] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-30 flex flex-col gap-2 shadow-[0_-4px_12px_rgba(0,0,0,0.2)] h-[110px] border-t border-white/5">
          {/* Primary: Add to Cart (Yellow) */}
          <button className="w-full py-2.5 rounded-lg bg-[#ffc800] hover:bg-[#ffe066] text-black text-sm font-extrabold shadow-md transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to cart
          </button>

          {/* Secondary: Explore Options (Ghost/Bordered) */}
          <button className="w-full py-2 rounded-lg border border-white/40 hover:bg-white/10 text-white text-sm font-bold transition-colors">
            Explore options
          </button>
        </div>
      </div>
    </article>
  );
}
