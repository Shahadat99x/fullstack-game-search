'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { SearchIcon } from './EnebaIcons';
import { SearchSuggestionRow } from './SearchSuggestionRow';
import { SearchOfferRow } from './SearchOfferRow';
import { Game } from '@/types/game';

interface SearchAutocompleteProps {
    placeholder?: string;
    onSearch?: (term: string) => void;
    debounceMs?: number;
}

// Query suggestion suffixes for enhanced search
const SUGGESTION_SUFFIXES = ['steam', 'xbox', 'playstation', 'pc', 'key', 'global', 'europe'];

// Generate query suggestions from current query
function generateQuerySuggestions(query: string): string[] {
    if (!query || query.length < 2) return [];
    const trimmed = query.trim().toLowerCase();

    return SUGGESTION_SUFFIXES
        .filter(suffix => !trimmed.includes(suffix))
        .slice(0, 4)
        .map(suffix => `${query} ${suffix}`);
}

export function SearchAutocomplete({
    placeholder = 'Search for games, products, and more...',
    onSearch,
    debounceMs = 300,
}: SearchAutocompleteProps) {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [offers, setOffers] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const fetchDebounceRef = useRef<NodeJS.Timeout | null>(null);

    // Memoized query suggestions
    const querySuggestions = useMemo(
        () => generateQuerySuggestions(inputValue),
        [inputValue]
    );

    // Total items count for navigation
    const totalItems = querySuggestions.length + offers.length;

    // Unique IDs for ARIA
    const listboxId = 'search-autocomplete-listbox';
    const getOptionId = (index: number) => `search-option-${index}`;

    // Fetch offer suggestions with debounce
    const fetchOffers = useCallback(async (query: string) => {
        if (!query || query.length < 1) {
            setOffers([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/list?search=${encodeURIComponent(query)}&limit=8`);
            if (response.ok) {
                const data = await response.json();
                setOffers(data.items || []);
            }
        } catch (error) {
            console.error('Failed to fetch suggestions:', error);
            setOffers([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Handle input change with debounced fetch
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setInputValue(value);
            setActiveIndex(-1);

            // Open dropdown if we have input
            if (value.length >= 1) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
                setOffers([]);
            }

            // Debounce the main search callback
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
            debounceRef.current = setTimeout(() => {
                onSearch?.(value);
            }, debounceMs);

            // Debounce fetch for suggestions (faster for typeahead feel)
            if (fetchDebounceRef.current) {
                clearTimeout(fetchDebounceRef.current);
            }
            fetchDebounceRef.current = setTimeout(() => {
                fetchOffers(value);
            }, 150);
        },
        [onSearch, debounceMs, fetchOffers]
    );

    // Handle clear
    const handleClear = useCallback(() => {
        setInputValue('');
        setIsOpen(false);
        setOffers([]);
        setActiveIndex(-1);
        onSearch?.('');
        inputRef.current?.focus();
    }, [onSearch]);

    // Handle focus
    const handleFocus = useCallback(() => {
        if (inputValue.length >= 1) {
            setIsOpen(true);
            fetchOffers(inputValue);
        }
    }, [inputValue, fetchOffers]);

    // Select an item (query suggestion or offer)
    const selectItem = useCallback(
        (index: number) => {
            if (index < 0) return;

            let selectedValue = '';

            if (index < querySuggestions.length) {
                // Query suggestion selected
                selectedValue = querySuggestions[index];
            } else {
                // Offer selected - use the title
                const offerIndex = index - querySuggestions.length;
                if (offers[offerIndex]) {
                    selectedValue = offers[offerIndex].title;
                }
            }

            if (selectedValue) {
                setInputValue(selectedValue);
                setIsOpen(false);
                setActiveIndex(-1);

                // Clear any pending debounce and trigger search immediately
                if (debounceRef.current) {
                    clearTimeout(debounceRef.current);
                }
                onSearch?.(selectedValue);
            }
        },
        [querySuggestions, offers, onSearch]
    );

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (!isOpen) {
                if (e.key === 'ArrowDown' && inputValue.length >= 1) {
                    setIsOpen(true);
                    fetchOffers(inputValue);
                }
                return;
            }

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setActiveIndex(prev => (prev < totalItems - 1 ? prev + 1 : 0));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setActiveIndex(prev => (prev > 0 ? prev - 1 : totalItems - 1));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (activeIndex >= 0) {
                        selectItem(activeIndex);
                    } else {
                        // Just close and search with current value
                        setIsOpen(false);
                        if (debounceRef.current) {
                            clearTimeout(debounceRef.current);
                        }
                        onSearch?.(inputValue);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    setIsOpen(false);
                    setActiveIndex(-1);
                    break;
            }
        },
        [isOpen, inputValue, totalItems, activeIndex, selectItem, onSearch, fetchOffers]
    );

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setActiveIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            if (fetchDebounceRef.current) clearTimeout(fetchDebounceRef.current);
        };
    }, []);

    const showDropdown = isOpen && (querySuggestions.length > 0 || offers.length > 0 || isLoading);

    return (
        <div ref={containerRef} className="relative w-full">
            <label htmlFor="game-search-autocomplete" className="sr-only">
                Search games
            </label>

            {/* Input wrapper */}
            <div className="relative">
                {/* Search Icon */}
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>

                {/* Input with ARIA combobox */}
                <input
                    ref={inputRef}
                    type="text"
                    id="game-search-autocomplete"
                    role="combobox"
                    aria-expanded={showDropdown}
                    aria-controls={listboxId}
                    aria-activedescendant={activeIndex >= 0 ? getOptionId(activeIndex) : undefined}
                    aria-autocomplete="list"
                    aria-haspopup="listbox"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDown}
                    className="block w-full rounded-full py-3 pl-12 pr-10
                     text-gray-900 placeholder-gray-500 
                     bg-white
                     border-0 shadow-lg
                     focus:ring-2 focus:ring-white/50
                     transition-all duration-200 text-sm font-medium"
                    placeholder={placeholder}
                    autoComplete="off"
                />

                {/* Clear Button */}
                {inputValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute inset-y-0 right-0 flex items-center pr-4
                       text-gray-400 hover:text-gray-600 transition-colors"
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

            {/* Dropdown */}
            {showDropdown && (
                <div
                    id={listboxId}
                    role="listbox"
                    aria-label="Search suggestions"
                    className="absolute top-full left-0 right-0 mt-2 rounded-lg overflow-hidden
                     bg-[var(--bg-dropdown)] shadow-2xl shadow-black/50 z-50"
                >
                    {/* Query Suggestions Section */}
                    {querySuggestions.length > 0 && (
                        <div className="border-b border-white/10">
                            {querySuggestions.map((suggestion, index) => (
                                <SearchSuggestionRow
                                    key={suggestion}
                                    id={getOptionId(index)}
                                    suggestion={suggestion}
                                    isActive={activeIndex === index}
                                    onClick={() => selectItem(index)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Loading indicator */}
                    {isLoading && offers.length === 0 && (
                        <div className="px-4 py-3 text-white/60 text-sm">
                            Loading suggestions...
                        </div>
                    )}

                    {/* Offer Suggestions Section */}
                    {offers.length > 0 && (
                        <div className="max-h-[400px] overflow-y-auto">
                            {offers.map((offer, index) => {
                                const itemIndex = querySuggestions.length + index;
                                return (
                                    <SearchOfferRow
                                        key={offer.id}
                                        id={getOptionId(itemIndex)}
                                        offer={offer}
                                        isActive={activeIndex === itemIndex}
                                        onClick={() => selectItem(itemIndex)}
                                    />
                                );
                            })}
                        </div>
                    )}

                    {/* No results */}
                    {!isLoading && querySuggestions.length === 0 && offers.length === 0 && inputValue.length >= 1 && (
                        <div className="px-4 py-3 text-white/60 text-sm">
                            No suggestions found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
