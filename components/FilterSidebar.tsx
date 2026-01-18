'use client';

import { useState } from 'react';
import { FilterState, PLATFORMS, REGIONS, DEFAULT_FILTERS } from '@/types/filters';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClose?: () => void;
}

export function FilterSidebar({ filters, onFiltersChange, onClose }: FilterSidebarProps) {
  const [platformSearch, setPlatformSearch] = useState('');

  const handlePriceChange = (field: 'priceMin' | 'priceMax', value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    onFiltersChange({ ...filters, [field]: numValue });
  };

  const handleRegionChange = (region: string | null) => {
    onFiltersChange({ ...filters, region });
  };

  const handlePlatformToggle = (platform: string) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter((p) => p !== platform)
      : [...filters.platforms, platform];
    onFiltersChange({ ...filters, platforms: newPlatforms });
  };

  const handleClearAll = () => {
    onFiltersChange(DEFAULT_FILTERS);
  };

  const filteredPlatforms = PLATFORMS.filter((p) =>
    p.toLowerCase().includes(platformSearch.toLowerCase())
  );

  const hasActiveFilters =
    filters.priceMin !== null ||
    filters.priceMax !== null ||
    filters.region !== null ||
    filters.platforms.length > 0;

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white/5 rounded-xl p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Filters</h2>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Clear all
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 text-white/60 hover:text-white"
                aria-label="Close filters"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Price Range */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white/80">Price Range</h3>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">
                €
              </span>
              <input
                type="number"
                placeholder="Min"
                value={filters.priceMin ?? ''}
                onChange={(e) => handlePriceChange('priceMin', e.target.value)}
                className="w-full pl-7 pr-2 py-2 rounded-lg bg-white/10 text-white text-sm
                         placeholder-white/40 border border-white/10 focus:border-emerald-400
                         focus:outline-none transition-colors"
              />
            </div>
            <span className="text-white/40">–</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">
                €
              </span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceMax ?? ''}
                onChange={(e) => handlePriceChange('priceMax', e.target.value)}
                className="w-full pl-7 pr-2 py-2 rounded-lg bg-white/10 text-white text-sm
                         placeholder-white/40 border border-white/10 focus:border-emerald-400
                         focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Region */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white/80">Region</h3>
          <div className="space-y-2">
            <button
              onClick={() => handleRegionChange(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                ${filters.region === null ? 'bg-emerald-500/20 text-emerald-400' : 'text-white/70 hover:bg-white/10'}`}
            >
              All Regions
            </button>
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => handleRegionChange(region)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                  ${filters.region === region ? 'bg-emerald-500/20 text-emerald-400' : 'text-white/70 hover:bg-white/10'}`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white/80">Platforms</h3>
          <input
            type="text"
            placeholder="Search platforms..."
            value={platformSearch}
            onChange={(e) => setPlatformSearch(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white text-sm
                     placeholder-white/40 border border-white/10 focus:border-emerald-400
                     focus:outline-none transition-colors"
          />
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {filteredPlatforms.map((platform) => (
              <label
                key={platform}
                className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-white/5"
              >
                <input
                  type="checkbox"
                  checked={filters.platforms.includes(platform)}
                  onChange={() => handlePlatformToggle(platform)}
                  className="w-4 h-4 rounded border-white/30 bg-white/10 text-emerald-500
                           focus:ring-emerald-400 focus:ring-offset-0"
                />
                <span className="text-sm text-white/70">{platform}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
