import Image from 'next/image';
import { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
}

// Platform color/icon mapping with brand colors (Eneba-style)
function getPlatformInfo(platform: string): { label: string; icon: string; bgColor: string; textColor: string } {
  const mapping: Record<string, { label: string; icon: string; bgColor: string; textColor: string }> = {
    'EA App': { label: 'EA App', icon: 'EA', bgColor: 'bg-[#ff4747]', textColor: 'text-white' },
    Steam: { label: 'STEAM', icon: 'S', bgColor: 'bg-[#1b2838]', textColor: 'text-white' },
    'Xbox Live': { label: 'Xbox Live', icon: 'X', bgColor: 'bg-[#107c10]', textColor: 'text-white' },
    'PlayStation Network': { label: 'PSN', icon: 'P', bgColor: 'bg-[#006fcd]', textColor: 'text-white' },
    'Nintendo eShop': { label: 'Nintendo', icon: 'N', bgColor: 'bg-[#e60012]', textColor: 'text-white' },
    'Ubisoft Connect': { label: 'Ubisoft', icon: 'U', bgColor: 'bg-[#0070ff]', textColor: 'text-white' },
    'Battle.net': { label: 'Battle.net', icon: 'B', bgColor: 'bg-[#00aeff]', textColor: 'text-white' },
    GOG: { label: 'GOG', icon: 'G', bgColor: 'bg-[#86328a]', textColor: 'text-white' },
    Rockstar: { label: 'Rockstar', icon: 'R', bgColor: 'bg-[#fcaf17]', textColor: 'text-black' },
  };
  return mapping[platform] || { label: platform, icon: '?', bgColor: 'bg-gray-600', textColor: 'text-white' };
}

// Helper for region color (cyan for GLOBAL like Eneba)
function getRegionColor(region: string): string {
  const r = region.toUpperCase();
  if (r.includes('EUROPE')) return 'text-[#d63384]';
  if (r.includes('GLOBAL')) return 'text-cyan-400';
  if (r.includes('UNITED STATES')) return 'text-[#ffc107]';
  return 'text-[#00d68f]';
}

export function GameCard({ game }: GameCardProps) {
  const formatPrice = (price: number) => `€${price.toFixed(2)}`;
  const platformInfo = getPlatformInfo(game.platform);
  const regionColor = getRegionColor(game.region);

  return (
    <article className="group relative flex flex-col bg-[#1f0a4d] rounded-md overflow-hidden border border-white/10 hover:border-white/30 shadow-md hover:shadow-xl hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1">

      {/* 
        IMAGE SECTION - Fixed aspect ratio for uniform cards
        Contains the image, cashback badge, and platform bar (floating on top of image)
      */}
      <div className="relative aspect-[3/4] w-full bg-[#150530] shrink-0">
        <Image
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={false}
        />

        {/* Wishlist Heart - Top Right (Visible on Hover) */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
          <button className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Cashback Badge - Glassy teal pill on Image (Eneba-style) */}
        {game.cashbackEur && game.cashbackEur > 0 && (
          <div className="absolute bottom-10 left-2 z-20 transition-opacity duration-300 group-hover:opacity-0">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/80 backdrop-blur-md border border-white/20 text-white shadow-lg">
              <span className="text-[10px] font-bold tracking-wide uppercase">CASHBACK</span>
            </div>
          </div>
        )}

        {/* Platform Bar - Glass bar floating ON the image bottom (Eneba-style) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center h-7 bg-black/50 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
          <span className={`w-4 h-4 flex items-center justify-center text-[9px] font-black rounded-sm mr-1.5 ${platformInfo.bgColor} ${platformInfo.textColor}`}>
            {platformInfo.icon}
          </span>
          <span className="text-[11px] font-medium text-white/90 tracking-wide">
            {platformInfo.label}
          </span>
        </div>
      </div>

      {/* 
        CONTENT + BUTTONS WRAPPER 
        This entire block slides UP over the image on hover.
      */}
      <div className="relative flex-1 flex flex-col bg-[#1f0a4d] transform transition-transform duration-300 ease-out group-hover:-translate-y-[100px]">

        {/* Text Info Section */}
        <div className="p-3 flex flex-col gap-0.5">
          {/* Title */}
          <h3 className="text-sm font-bold text-white leading-tight line-clamp-2 min-h-[36px] group-hover:underline decoration-1 underline-offset-2">
            {game.title}
          </h3>

          {/* Region */}
          <div className={`text-[10px] font-bold uppercase tracking-wider ${regionColor}`}>
            {game.region}
          </div>

          {/* Price Section */}
          <div className="mt-2 flex flex-col items-start">
            {/* Old Price row */}
            {game.oldPriceEur && (
              <div className="text-[10px] text-gray-400">
                From <span className="line-through">{formatPrice(game.oldPriceEur)}</span> <span className="text-cyan-400">-{game.discountPercent}%</span>
              </div>
            )}

            {/* Main Price */}
            <div className="text-lg font-bold text-white leading-none mt-0.5">
              {formatPrice(game.priceEur)}
            </div>

            {/* Cashback Value */}
            {game.cashbackEur && game.cashbackEur > 0 && (
              <div className="text-[10px] text-[#00d68f] mt-0.5 font-medium">
                Cashback: <span className="font-bold">€{game.cashbackEur.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Likes Count */}
          <div className="flex items-center gap-1 text-gray-400 mt-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span className="text-[11px] font-medium">{game.likes}</span>
          </div>
        </div>

        {/* Buttons - Hidden below initially, revealed on hover */}
        <div className="px-3 pb-3 flex flex-col gap-2 absolute top-full left-0 right-0 h-[100px] bg-[#1f0a4d]">
          {/* Primary: Add to Cart (Yellow) - NO cart icon like Eneba */}
          <button className="w-full py-2.5 rounded-md bg-[#ffc800] hover:bg-[#ffe066] text-black text-sm font-bold shadow-md transition-colors">
            Add to cart
          </button>

          {/* Secondary: Explore Options (Yellow with border like Eneba) */}
          <button className="w-full py-2 rounded-md bg-transparent border border-[#ffc800] hover:bg-[#ffc800]/10 text-[#ffc800] text-[13px] font-semibold transition-colors">
            Explore options
          </button>
        </div>

      </div>
    </article>
  );
}
