'use client';

import { useEffect, useState, useCallback } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (term: string) => void;
  debounceMs?: number;
}

export function SearchBar({
  placeholder = 'Search...',
  onSearch,
  debounceMs = 300,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  // Debounced search callback
  useEffect(() => {
    if (!onSearch) return;

    const timeoutId = setTimeout(() => {
      onSearch(inputValue);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [inputValue, onSearch, debounceMs]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <div className="relative w-full max-w-2xl">
      <label htmlFor="game-search" className="sr-only">
        Search games
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="game-search"
          value={inputValue}
          onChange={handleChange}
          className="block w-full rounded-full border-0 bg-gray-800 py-3 pl-12 pr-4 
                     text-white placeholder-gray-400 ring-1 ring-inset ring-gray-700 
                     focus:ring-2 focus:ring-inset focus:ring-orange-500 
                     transition-all duration-200 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
