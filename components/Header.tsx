'use client';

import Link from 'next/link';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  onSearch?: (term: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                <span className="text-base font-bold text-white">E</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">eneba</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 justify-center px-4">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Right side placeholder */}
          <div className="flex-shrink-0">
            <button
              type="button"
              className="rounded-full bg-gray-800 p-2 text-gray-400 
                         hover:text-white hover:bg-gray-700 transition-colors"
              aria-label="User account"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
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
