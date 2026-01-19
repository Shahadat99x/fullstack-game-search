'use client';

import { SearchIcon } from './EnebaIcons';

interface SearchSuggestionRowProps {
    suggestion: string;
    isActive: boolean;
    onClick: () => void;
    id: string;
}

export function SearchSuggestionRow({
    suggestion,
    isActive,
    onClick,
    id,
}: SearchSuggestionRowProps) {
    return (
        <div
            id={id}
            role="option"
            aria-selected={isActive}
            onClick={onClick}
            className={`
        flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150
        ${isActive ? 'bg-[var(--bg-hover)]' : 'hover:bg-[var(--bg-hover)]'}
      `}
        >
            <SearchIcon className="w-5 h-5 text-white/60 flex-shrink-0" />
            <span className="text-white text-sm font-medium truncate">{suggestion}</span>
        </div>
    );
}
