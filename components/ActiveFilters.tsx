'use client';

interface ActiveFiltersProps {
    searchTerm: string;
    onClearSearch: () => void;
}

export function ActiveFilters({ searchTerm, onClearSearch }: ActiveFiltersProps) {
    if (!searchTerm) return null;

    return (
        <div className="flex items-center gap-3 mb-4">
            {/* Search term tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1f0a4d] border border-white/10 text-sm">
                <span className="text-white/70">Text:</span>
                <span className="text-white font-medium">{searchTerm}</span>
                <button
                    onClick={onClearSearch}
                    className="ml-1 text-white/60 hover:text-white transition-colors"
                    aria-label="Clear search"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Clear all link */}
            <button
                onClick={onClearSearch}
                className="text-[#00d68f] text-sm font-medium hover:underline transition-colors"
            >
                Clear all
            </button>
        </div>
    );
}
