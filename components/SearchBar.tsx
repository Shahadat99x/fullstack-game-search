'use client';

import { useCallback, useState } from 'react';

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
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(() => {
        onSearch?.(value);
      }, debounceMs);

      setDebounceTimeout(timeout);
    },
    [onSearch, debounceMs, debounceTimeout]
  );

  const handleClear = useCallback(() => {
    setInputValue('');
    onSearch?.('');
  }, [onSearch]);

  return (
    <div className="relative w-full max-w-xl">
      <label htmlFor="game-search" className="sr-only">
        Search games
      </label>
      <div className="relative">
        {/* Search Icon */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          id="game-search"
          value={inputValue}
          onChange={handleChange}
          className="block w-full rounded-lg border-0 py-3 pl-12 pr-10
                     text-white placeholder-gray-500 
                     bg-[var(--input-bg)] 
                     ring-1 ring-inset ring-[var(--border-color)]
                     focus:ring-2 focus:ring-inset focus:ring-[var(--accent-purple)]
                     transition-all duration-200 text-sm"
          placeholder={placeholder}
        />

        {/* Clear Button */}
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3
                       text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
