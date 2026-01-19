'use client';

import { useState } from 'react';
import { PLATFORMS } from '@/types/filters';

interface PlatformsFilterProps {
    selectedPlatforms: string[];
    onChange: (platforms: string[]) => void;
}

export function PlatformsFilter({
    selectedPlatforms,
    onChange,
}: PlatformsFilterProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPlatforms = PLATFORMS.filter((platform) =>
        platform.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggle = (platform: string) => {
        const newPlatforms = selectedPlatforms.includes(platform)
            ? selectedPlatforms.filter((p) => p !== platform)
            : [...selectedPlatforms, platform];
        onChange(newPlatforms);
    };

    return (
        <div className="space-y-3">
            {/* Search input */}
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

            {/* Checkbox list */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {filteredPlatforms.map((platform) => (
                    <label
                        key={platform}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div
                            className={`w-5 h-5 flex items-center justify-center transition-colors ${selectedPlatforms.includes(platform)
                                    ? 'bg-yellow-400'
                                    : 'bg-black/20 group-hover:bg-black/30'
                                }`}
                        >
                            {selectedPlatforms.includes(platform) && (
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
                            checked={selectedPlatforms.includes(platform)}
                            onChange={() => handleToggle(platform)}
                        />
                        <span
                            className={`text-sm ${selectedPlatforms.includes(platform)
                                    ? 'text-white font-medium'
                                    : 'text-white/70 group-hover:text-white'
                                }`}
                        >
                            {platform}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}
