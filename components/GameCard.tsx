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
    <article className="group relative flex flex-col h-[480px] bg-[#1f0a4d] rounded-none overflow-hidden hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 transform-gpu translate-z-0">

      {/* 
        IMAGE SECTION - Fixed Height
        Must be BEHIND the sliding content on hover.
      */}
      <div className="relative h-[313px] w-full bg-[#150530] z-0 shrink-0">
        <Image
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover transition-none"
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

        {/* Cashback Badge - Persistent on Image, Top Left */}
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
      </div>

      {/* 
        CONTENT + BUTTONS WRAPPER 
        This entire block slides UP over the image on hover using negative margin or transform.
        Using absolute layout relative to card bottom.
      */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#1f0a4d] flex flex-col transform transition-transform duration-300 ease-out group-hover:-translate-y-[110px]">

        {/* Platform Bar - Top of the content block */}
        <div className="flex items-center w-full px-3 py-1.5 bg-[#140633]">
          <span className="w-4 h-4 flex items-center justify-center text-[10px] font-black bg-white text-black rounded-sm mr-2">
            {platformInfo.icon.charAt(0)}
          </span>
          <span className="text-[11px] font-bold text-white/90 uppercase tracking-wide truncate">
            {platformInfo.label}
          </span>
        </div>

        {/* Text Info Section - Fixed height area to form the bottom of card */}
        <div className="p-3 pb-4 flex flex-col gap-1 bg-[#1f0a4d] min-h-[167px]">
          {/* Title */}
          <h3 className="text-[16px] font-extrabold text-white leading-tight line-clamp-2 min-h-[40px] mb-1 group-hover:underline decoration-2 underline-offset-2">
            {game.title}
          </h3>

          {/* Region */}
          <div className={`text-[11px] font-bold uppercase tracking-wider mb-auto ${regionColor}`}>
            {game.region}
          </div>

          {/* Price Section - LEFT ALIGNED */}
          <div className="mt-3 flex flex-col items-start relative">
            {/* Old Price row */}
            {game.oldPriceEur && (
              <div className="text-[12px] text-gray-400 font-medium">
                From <span className="line-through">{formatPrice(game.oldPriceEur)}</span> <span className="text-[#00d68f]">-{game.discountPercent}%</span>
              </div>
            )}

            {/* Main Price */}
            <div className="text-[24px] font-extrabold text-white leading-none mt-1">
              {formatPrice(game.priceEur)} <span className="text-[11px] text-gray-400 font-normal align-top ml-0.5">ⓘ</span>
            </div>

            {/* Cashback Value */}
            {game.cashbackEur && game.cashbackEur > 0 && (
              <div className="text-[11px] text-[#00d68f] mt-1 font-medium">
                Cashback: <span className="font-bold">€{game.cashbackEur.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Likes Count */}
          <div className="flex items-center gap-1.5 text-gray-400 mt-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span className="text-xs font-medium">{game.likes}</span>
          </div>
        </div>

        {/* Buttons - Hidden below initially. 
            Attached to bottom of content block.
            Revealed when block slides up.
        */}
        <div className="px-3 pb-3 flex flex-col gap-2 bg-[#1f0a4d] absolute top-full left-0 right-0 h-[120px]">
          {/* Primary: Add to Cart (Yellow) */}
          <button className="w-full py-3 rounded-lg bg-[#ffc800] hover:bg-[#ffe066] text-black text-[15px] font-extrabold shadow-md transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to cart
          </button>

          {/* Secondary: Explore Options (Ghost/Bordered) */}
          <button className="w-full py-2.5 rounded-lg border border-white/40 hover:bg-white/10 text-white text-[14px] font-bold transition-colors">
            Explore options
          </button>
        </div>

      </div>
    </article>
  );
}
