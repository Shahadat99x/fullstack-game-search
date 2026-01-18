'use client';

import Link from 'next/link';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  onSearch?: (term: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg-primary)]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Logo - Eneba style with rainbow emoji */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
              <span className="text-lg font-bold text-white">E</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
              eneba
            </span>
          </Link>

          {/* Search Bar - Centered, wider */}
          <div className="flex-1 flex justify-center max-w-xl mx-auto">
            <SearchBar onSearch={onSearch} placeholder="Search for games, products, and more..." />
          </div>

          {/* Right Side - Language, Heart, Cart, Profile */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language selector placeholder */}
            <div className="hidden md:flex items-center gap-1 text-sm text-white/80 px-2">
              <span>🇪🇺</span>
              <span>English EU | EUR</span>
            </div>

            {/* Wishlist */}
            <button
              type="button"
              className="p-2.5 text-white/80 hover:text-white transition-colors"
              aria-label="Wishlist"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Cart */}
            <button
              type="button"
              className="p-2.5 text-white/80 hover:text-white transition-colors"
              aria-label="Cart"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>

            {/* User Profile */}
            <button
              type="button"
              className="p-2.5 text-white/80 hover:text-white transition-colors"
              aria-label="Profile"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
