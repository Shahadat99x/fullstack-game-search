'use client';

import Image from 'next/image';
import { Game } from '@/types/game';

interface SearchOfferRowProps {
    offer: Game;
    isActive: boolean;
    onClick: () => void;
    id: string;
}

export function SearchOfferRow({ offer, isActive, onClick, id }: SearchOfferRowProps) {
    const formatPrice = (price: number) => `€${price.toFixed(2)}`;

    return (
        <div
            id={id}
            role="option"
            aria-selected={isActive}
            onClick={onClick}
            className={`
        flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-150
        ${isActive ? 'bg-[var(--bg-hover)]' : 'hover:bg-[var(--bg-hover)]'}
      `}
        >
            {/* Thumbnail */}
            <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden bg-[#150530]">
                <Image
                    src={offer.imageUrl}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                {/* Digital good badge */}
                <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--accent-teal)] bg-[var(--accent-teal)]/10 rounded mb-1">
                    Digital good
                </span>
                {/* Title */}
                <h4 className="text-white text-sm font-medium truncate leading-tight">
                    {offer.title}
                </h4>
            </div>

            {/* Price */}
            <div className="flex-shrink-0 text-right">
                {offer.oldPriceEur && (
                    <div className="text-[11px] text-gray-400">
                        From {formatPrice(offer.oldPriceEur)}
                    </div>
                )}
                <div className="text-white text-base font-bold">{formatPrice(offer.priceEur)}</div>
            </div>
        </div>
    );
}
