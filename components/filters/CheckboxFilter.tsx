'use client';

import { useState } from 'react';

interface CheckboxFilterProps {
    options: readonly string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    showSearch?: boolean;
    maxHeight?: string;
}

export function CheckboxFilter({
    options,
    selected,
    onChange,
    showSearch = false,
    maxHeight = 'max-h-48',
}: CheckboxFilterProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = showSearch
        ? options.filter((opt) =>
            opt.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : options;

    const handleToggle = (option: string) => {
        const newSelected = selected.includes(option)
            ? selected.filter((s) => s !== option)
            : [...selected, option];
        onChange(newSelected);
    };

    return (
        <div className="space-y-3">
            {showSearch && (
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 pl-3 pr-10 bg-black/20 text-white/80 text-sm placeholder-white/40
                       border-0 outline-none focus:bg-black/30 transition-colors"
                    />
                    <svg
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
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
            )}

            <div className={`space-y-2 ${maxHeight} overflow-y-auto pr-1 custom-scrollbar`}>
                {filteredOptions.map((option) => (
                    <label
                        key={option}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div
                            className={`w-5 h-5 flex items-center justify-center transition-colors ${selected.includes(option)
                                    ? 'bg-yellow-400'
                                    : 'bg-black/20 group-hover:bg-black/30'
                                }`}
                        >
                            {selected.includes(option) && (
                                <svg
                                    className="w-3.5 h-3.5 text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            )}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selected.includes(option)}
                            onChange={() => handleToggle(option)}
                        />
                        <span
                            className={`text-sm ${selected.includes(option)
                                    ? 'text-white font-medium'
                                    : 'text-white/70 group-hover:text-white'
                                }`}
                        >
                            {option}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}
