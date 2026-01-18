'use client';

import { SortOption, SORT_OPTIONS } from '@/types/filters';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-white/60 hidden sm:inline">Sort by:</span>
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-[#2a1a5e] hover:bg-[#352270] text-white text-sm font-medium px-4 py-2.5 pr-10 rounded-lg
                   shadow-sm border border-transparent focus:ring-2 focus:ring-white/10
                   focus:outline-none cursor-pointer transition-all min-w-[160px]"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#2a1a5e] text-white py-2">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform group-hover:translate-y-[-40%]">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
