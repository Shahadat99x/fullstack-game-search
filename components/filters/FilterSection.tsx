'use client';

import { useState, ReactNode } from 'react';

interface FilterSectionProps {
    title: string;
    children: ReactNode;
    defaultExpanded?: boolean;
    badge?: number;
}

export function FilterSection({
    title,
    children,
    defaultExpanded = true,
    badge,
}: FilterSectionProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className="bg-[#5825cc] rounded-none">
            {/* Header */}
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between px-4 py-3 text-left group"
            >
                <span className="text-base font-extrabold text-white">{title}</span>
                <div className="flex items-center gap-2">
                    {badge !== undefined && badge > 0 && (
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400 text-xs font-bold text-black">
                            {badge}
                        </span>
                    )}
                    <svg
                        className={`w-4 h-4 text-white/70 transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'
                            }`}
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
            </button>

            {/* Content with smooth collapse */}
            <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pb-4">{children}</div>
            </div>
        </div>
    );
}
