'use client';

import Link from 'next/link';
import { SearchAutocomplete } from './SearchAutocomplete';
import { EnebaLogo, WishlistIcon, CartIcon, ProfileIcon } from './EnebaIcons';

interface HeaderProps {
  onSearch?: (term: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg-primary)]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo - Eneba SVG */}
          <Link href="/" className="flex items-center flex-shrink-0 mr-4" aria-label="Eneba">
            <div className="w-[120px] h-auto text-white">
              <EnebaLogo className="w-full h-full" />
            </div>
          </Link>

          {/* Search Bar - Center */}
          <div className="flex-1 flex justify-center max-w-2xl mx-6">
            <SearchAutocomplete onSearch={onSearch} placeholder="Search for games, products, and more..." />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            {/* Language/Region */}
            <div className="hidden md:flex items-center gap-2 text-[13px] font-semibold text-white/90 cursor-pointer hover:text-white transition-colors">
              <span className="w-4 h-4 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                {/* Simplified Lithuanian Flag as placeholder or EU flag */}
                🇪🇺
              </span>
              <span>English EU | EUR</span>
            </div>

            {/* Icons Group */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Wishlist */}
              <button type="button" className="p-2 text-white hover:text-white/80 transition-colors" aria-label="Wishlist">
                <WishlistIcon className="w-6 h-6" />
              </button>

              {/* Cart */}
              <button type="button" className="p-2 text-white hover:text-white/80 transition-colors" aria-label="Shopping cart">
                <CartIcon className="w-6 h-6" />
              </button>

              {/* Profile / Login */}
              <button type="button" className="flex items-center gap-2 p-2 text-white hover:text-white/80 transition-colors" aria-label="Profile">
                <ProfileIcon className="w-6 h-6" />
                <span className="hidden lg:block text-[13px] font-semibold">Log in | Register</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
