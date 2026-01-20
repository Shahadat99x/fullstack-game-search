'use client';

import Link from 'next/link';

const NAV_ITEMS = [
    { label: 'Categories', href: '#' },
    { label: 'Cheap Games', href: '#' },
    { label: 'Windows keys', href: '#' },
    { label: "GOTY '25", href: '#' },
    { label: 'Game Pass', href: '#' },
    { label: 'Genshin', href: '#', icon: '💎' },
];

export function SubNavigation() {
    return (
        <nav className="w-full bg-[#1a1a4e]/50 border-b border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-1 h-10 overflow-x-auto scrollbar-hide">
                    {/* Hamburger menu icon */}
                    <button className="flex items-center gap-2 px-3 py-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span className="hidden sm:inline">Categories</span>
                    </button>

                    {/* Nav items */}
                    {NAV_ITEMS.slice(1).map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-1 px-3 py-1.5 text-white/80 hover:text-white text-sm font-medium whitespace-nowrap transition-colors"
                        >
                            {item.icon && <span>{item.icon}</span>}
                            {item.label}
                        </Link>
                    ))}

                    {/* Sale badge */}
                    <Link
                        href="#"
                        className="flex items-center px-3 py-1 ml-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm font-bold transition-colors"
                    >
                        Sale
                    </Link>
                </div>
            </div>
        </nav>
    );
}
