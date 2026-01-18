'use client';

import Link from 'next/link';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  onSearch?: (term: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent-orange)] to-orange-600">
              <span className="text-sm font-bold text-white">E</span>
            </div>
            <span className="text-lg font-bold text-white tracking-tight hidden sm:block">
              eneba
            </span>
          </Link>

          {/* Search Bar - Centered */}
          <div className="flex-1 flex justify-center max-w-2xl mx-auto">
            <SearchBar onSearch={onSearch} placeholder="Search for games, products, and more..." />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-[var(--bg-card)]"
              aria-label="Cart"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-[var(--bg-card)]"
              aria-label="User account"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
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
