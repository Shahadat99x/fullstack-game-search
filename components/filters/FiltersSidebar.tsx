'use client';

import { FilterState, DEFAULT_FILTERS } from '@/types/filters';
import { FilterSection } from './FilterSection';
import { PriceRangeFilter } from './PriceRangeFilter';
import { PlatformsFilter } from './PlatformsFilter';
import { RegionsFilter } from './RegionsFilter';

interface FiltersSidebarProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onClose?: () => void;
}

// UI-only placeholder data for visual parity with Eneba
const PRODUCT_TYPES = [
    { label: 'Games', count: 42994 },
    { label: 'DLCs', count: 8521 },
    { label: 'Software', count: 1245 },
];

const OPERATING_SYSTEMS = [
    { label: 'Windows', count: 38420 },
    { label: 'Mac', count: 4521 },
    { label: 'Linux', count: 2845 },
];

const GENRES = [
    { label: 'Action', count: 12450 },
    { label: 'Adventure', count: 9823 },
    { label: 'RPG', count: 7654 },
    { label: 'Sports', count: 5432 },
    { label: 'Simulation', count: 4321 },
    { label: 'Strategy', count: 3987 },
];

export function FiltersSidebar({
    filters,
    onFiltersChange,
    onClose,
}: FiltersSidebarProps) {
    const hasActiveFilters =
        filters.priceMin !== null ||
        filters.priceMax !== null ||
        filters.region !== null ||
        filters.platforms.length > 0;

    const handlePriceChange = (priceMin: number | null, priceMax: number | null) => {
        onFiltersChange({ ...filters, priceMin, priceMax });
    };

    const handlePlatformsChange = (platforms: string[]) => {
        onFiltersChange({ ...filters, platforms });
    };

    const handleRegionChange = (region: string | null) => {
        onFiltersChange({ ...filters, region });
    };

    return (
        <aside className="w-full lg:w-[280px] flex-shrink-0">
            {/* Mobile Header */}
            <div className="flex items-center justify-between lg:hidden mb-4 px-4">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                <div className="flex items-center gap-3">
                    {hasActiveFilters && (
                        <button
                            onClick={() => onFiltersChange(DEFAULT_FILTERS)}
                            className="text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition-colors uppercase tracking-wide"
                        >
                            Reset
                        </button>
                    )}
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-1 text-white/80 hover:text-white"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
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

            {/* Desktop Reset Button */}
            {hasActiveFilters && (
                <div className="hidden lg:flex justify-end mb-3">
                    <button
                        onClick={() => onFiltersChange(DEFAULT_FILTERS)}
                        className="text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition-colors uppercase tracking-wide"
                    >
                        Reset All
                    </button>
                </div>
            )}

            {/* Filter Sections */}
            <div className="space-y-3">
                {/* Price Range (Functional) */}
                <FilterSection title="Price range (EUR)">
                    <PriceRangeFilter
                        priceMin={filters.priceMin}
                        priceMax={filters.priceMax}
                        onChange={handlePriceChange}
                    />
                </FilterSection>

                {/* Country (UI-only placeholder) */}
                <FilterSection title="Country" defaultExpanded={false}>
                    <div className="relative">
                        <select
                            className="w-full h-10 px-3 pr-8 bg-black/20 text-white/80 text-sm
                         border-0 outline-none appearance-none cursor-pointer"
                            disabled
                        >
                            <option>All countries</option>
                        </select>
                        <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </FilterSection>

                {/* Product Type (UI-only placeholder) */}
                <FilterSection title="Product type" defaultExpanded={false}>
                    <div className="space-y-2">
                        {PRODUCT_TYPES.map((type) => (
                            <label
                                key={type.label}
                                className="flex items-center justify-between cursor-not-allowed opacity-60"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-black/20" />
                                    <span className="text-sm text-white/70">{type.label}</span>
                                </div>
                                <span className="text-xs text-white/40">{type.count.toLocaleString()}</span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Operating System (UI-only placeholder) */}
                <FilterSection title="Operating system" defaultExpanded={false}>
                    <div className="space-y-2">
                        {OPERATING_SYSTEMS.map((os) => (
                            <label
                                key={os.label}
                                className="flex items-center justify-between cursor-not-allowed opacity-60"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-black/20" />
                                    <span className="text-sm text-white/70">{os.label}</span>
                                </div>
                                <span className="text-xs text-white/40">{os.count.toLocaleString()}</span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Platforms (Functional) */}
                <FilterSection
                    title="Platforms"
                    badge={filters.platforms.length > 0 ? filters.platforms.length : undefined}
                >
                    <PlatformsFilter
                        selectedPlatforms={filters.platforms}
                        onChange={handlePlatformsChange}
                    />
                </FilterSection>

                {/* Genres (UI-only placeholder) */}
                <FilterSection title="Genres" defaultExpanded={false}>
                    <div className="space-y-2">
                        {GENRES.map((genre) => (
                            <label
                                key={genre.label}
                                className="flex items-center justify-between cursor-not-allowed opacity-60"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-black/20" />
                                    <span className="text-sm text-white/70">{genre.label}</span>
                                </div>
                                <span className="text-xs text-white/40">{genre.count.toLocaleString()}</span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Regions (Functional) */}
                <FilterSection
                    title="Regions"
                    badge={filters.region !== null ? 1 : undefined}
                >
                    <RegionsFilter
                        selectedRegion={filters.region}
                        onChange={handleRegionChange}
                    />
                </FilterSection>
            </div>
        </aside>
    );
}
