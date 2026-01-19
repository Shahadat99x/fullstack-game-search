'use client';

import {
    FilterState,
    DEFAULT_FILTERS,
    PLATFORMS,
    REGIONS,
    COUNTRIES,
    PRODUCT_TYPES,
    OPERATING_SYSTEMS,
    GENRES,
} from '@/types/filters';
import { FilterSection } from './FilterSection';
import { PriceRangeFilter } from './PriceRangeFilter';
import { CheckboxFilter } from './CheckboxFilter';
import { RegionsFilter } from './RegionsFilter';

interface FiltersSidebarProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onClose?: () => void;
}

export function FiltersSidebar({
    filters,
    onFiltersChange,
    onClose,
}: FiltersSidebarProps) {
    const hasActiveFilters =
        filters.priceMin !== null ||
        filters.priceMax !== null ||
        filters.region !== null ||
        filters.platforms.length > 0 ||
        filters.countries.length > 0 ||
        filters.productTypes.length > 0 ||
        filters.operatingSystems.length > 0 ||
        filters.genres.length > 0;

    const handlePriceChange = (priceMin: number | null, priceMax: number | null) => {
        onFiltersChange({ ...filters, priceMin, priceMax });
    };

    const handlePlatformsChange = (platforms: string[]) => {
        onFiltersChange({ ...filters, platforms });
    };

    const handleRegionChange = (region: string | null) => {
        onFiltersChange({ ...filters, region });
    };

    const handleCountriesChange = (countries: string[]) => {
        onFiltersChange({ ...filters, countries });
    };

    const handleProductTypesChange = (productTypes: string[]) => {
        onFiltersChange({ ...filters, productTypes });
    };

    const handleOperatingSystemsChange = (operatingSystems: string[]) => {
        onFiltersChange({ ...filters, operatingSystems });
    };

    const handleGenresChange = (genres: string[]) => {
        onFiltersChange({ ...filters, genres });
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
                {/* Price Range */}
                <FilterSection title="Price range (EUR)">
                    <PriceRangeFilter
                        priceMin={filters.priceMin}
                        priceMax={filters.priceMax}
                        onChange={handlePriceChange}
                    />
                </FilterSection>

                {/* Country */}
                <FilterSection
                    title="Country"
                    defaultExpanded={false}
                    badge={filters.countries.length > 0 ? filters.countries.length : undefined}
                >
                    <CheckboxFilter
                        options={COUNTRIES}
                        selected={filters.countries}
                        onChange={handleCountriesChange}
                        showSearch
                        maxHeight="max-h-40"
                    />
                </FilterSection>

                {/* Product Type */}
                <FilterSection
                    title="Product type"
                    defaultExpanded={false}
                    badge={filters.productTypes.length > 0 ? filters.productTypes.length : undefined}
                >
                    <CheckboxFilter
                        options={PRODUCT_TYPES}
                        selected={filters.productTypes}
                        onChange={handleProductTypesChange}
                    />
                </FilterSection>

                {/* Operating System */}
                <FilterSection
                    title="Operating system"
                    defaultExpanded={false}
                    badge={filters.operatingSystems.length > 0 ? filters.operatingSystems.length : undefined}
                >
                    <CheckboxFilter
                        options={OPERATING_SYSTEMS}
                        selected={filters.operatingSystems}
                        onChange={handleOperatingSystemsChange}
                    />
                </FilterSection>

                {/* Platforms */}
                <FilterSection
                    title="Platforms"
                    badge={filters.platforms.length > 0 ? filters.platforms.length : undefined}
                >
                    <CheckboxFilter
                        options={PLATFORMS}
                        selected={filters.platforms}
                        onChange={handlePlatformsChange}
                        showSearch
                    />
                </FilterSection>

                {/* Genres */}
                <FilterSection
                    title="Genres"
                    defaultExpanded={false}
                    badge={filters.genres.length > 0 ? filters.genres.length : undefined}
                >
                    <CheckboxFilter
                        options={GENRES}
                        selected={filters.genres}
                        onChange={handleGenresChange}
                    />
                </FilterSection>

                {/* Regions */}
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
