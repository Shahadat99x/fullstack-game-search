'use client';

import { REGIONS } from '@/types/filters';

interface RegionsFilterProps {
    selectedRegion: string | null;
    onChange: (region: string | null) => void;
}

export function RegionsFilter({ selectedRegion, onChange }: RegionsFilterProps) {
    return (
        <div className="space-y-2">
            {/* All Regions option */}
            <label className="flex items-center gap-3 cursor-pointer group">
                <div
                    className={`w-5 h-5 flex items-center justify-center transition-colors ${selectedRegion === null
                            ? 'bg-yellow-400'
                            : 'bg-black/20 group-hover:bg-black/30'
                        }`}
                >
                    {selectedRegion === null && (
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
                    type="radio"
                    name="region"
                    className="hidden"
                    checked={selectedRegion === null}
                    onChange={() => onChange(null)}
                />
                <span
                    className={`text-sm ${selectedRegion === null
                            ? 'text-white font-medium'
                            : 'text-white/70 group-hover:text-white'
                        }`}
                >
                    All Regions
                </span>
            </label>

            {/* Region options */}
            {REGIONS.map((region) => (
                <label key={region} className="flex items-center gap-3 cursor-pointer group">
                    <div
                        className={`w-5 h-5 flex items-center justify-center transition-colors ${selectedRegion === region
                                ? 'bg-yellow-400'
                                : 'bg-black/20 group-hover:bg-black/30'
                            }`}
                    >
                        {selectedRegion === region && (
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
                        type="radio"
                        name="region"
                        className="hidden"
                        checked={selectedRegion === region}
                        onChange={() => onChange(region)}
                    />
                    <span
                        className={`text-sm ${selectedRegion === region
                                ? 'text-white font-medium'
                                : 'text-white/70 group-hover:text-white'
                            }`}
                    >
                        {region}
                    </span>
                </label>
            ))}
        </div>
    );
}
