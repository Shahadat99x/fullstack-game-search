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

  const hasActiveFilters =
    filters.priceMin !== null ||
    filters.priceMax !== null ||
    filters.region !== null ||
    filters.platforms.length > 0;

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="space-y-8 pr-4">
        {/* Header - Hidden on desktop, visible on mobile overlay */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <h2 className="text-xl font-bold text-white">Filters</h2>
          {onClose && (
            <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Clear All Link - Eneba style (top right of sidebar usually, or just a small link) */}
        {hasActiveFilters && (
          <div className="flex justify-end -mb-4">
            <button
              onClick={() => onFiltersChange(DEFAULT_FILTERS)}
              className="text-xs font-semibold text-white/60 hover:text-white transition-colors uppercase tracking-wide"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Price Range */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">Price Range</h3>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm group-focus-within:text-white">€</span>
              <input
                type="number"
                placeholder="Min"
                value={filters.priceMin ?? ''}
                onChange={(e) => handlePriceChange('priceMin', e.target.value)}
                className="w-full pl-7 pr-2 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium
                         placeholder-white/30 border border-transparent focus:bg-white/20 focus:border-white/30
                         focus:outline-none transition-all"
              />
            </div>
            <div className="w-2 h-[2px] bg-white/10"></div>
            <div className="relative flex-1 group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm group-focus-within:text-white">€</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceMax ?? ''}
                onChange={(e) => handlePriceChange('priceMax', e.target.value)}
                className="w-full pl-7 pr-2 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium
                         placeholder-white/30 border border-transparent focus:bg-white/20 focus:border-white/30
                         focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Region */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">Region</h3>
          <div className="space-y-1">
            <label className="flex items-center gap-3 px-1 py-1 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.region === null ? 'bg-emerald-500 border-emerald-500' : 'border-white/30 group-hover:border-white/60'}`}>
                {filters.region === null && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <input type="radio" className="hidden" checked={filters.region === null} onChange={() => handleRegionChange(null)} />
              <span className={`text-sm ${filters.region === null ? 'text-white font-medium' : 'text-white/70 group-hover:text-white'}`}>All Regions</span>
            </label>

            {REGIONS.map((region) => (
              <label key={region} className="flex items-center gap-3 px-1 py-1 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.region === region ? 'bg-emerald-500 border-emerald-500' : 'border-white/30 group-hover:border-white/60'}`}>
                  {filters.region === region && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <input type="radio" className="hidden" checked={filters.region === region} onChange={() => handleRegionChange(region)} />
                <span className={`text-sm ${filters.region === region ? 'text-white font-medium' : 'text-white/70 group-hover:text-white'}`}>{region}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">Platforms</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={platformSearch}
              onChange={(e) => setPlatformSearch(e.target.value)}
              className="w-full pl-3 pr-8 py-2 rounded-lg bg-white/5 text-white text-xs
                         placeholder-white/30 border border-transparent focus:bg-white/10
                         focus:outline-none transition-all mb-2"
            />
            <svg className="absolute right-3 top-2.5 w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="space-y-1 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {PLATFORMS.filter(p => p.toLowerCase().includes(platformSearch.toLowerCase())).map((platform) => (
              <label
                key={platform}
                className="flex items-center gap-3 px-1 py-1 cursor-pointer group"
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.platforms.includes(platform) ? 'bg-emerald-500 border-emerald-500' : 'border-white/30 group-hover:border-white/60'}`}>
                  {filters.platforms.includes(platform) && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={filters.platforms.includes(platform)}
                  onChange={() => handlePlatformToggle(platform)}
                />
                <span className={`text-sm ${filters.platforms.includes(platform) ? 'text-white font-medium' : 'text-white/70 group-hover:text-white'}`}>{platform}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
