'use client';

interface PriceRangeFilterProps {
    priceMin: number | null;
    priceMax: number | null;
    onChange: (priceMin: number | null, priceMax: number | null) => void;
}

export function PriceRangeFilter({
    priceMin,
    priceMax,
    onChange,
}: PriceRangeFilterProps) {
    const handleMinChange = (value: string) => {
        const numValue = value === '' ? null : parseFloat(value);
        onChange(numValue, priceMax);
    };

    const handleMaxChange = (value: string) => {
        const numValue = value === '' ? null : parseFloat(value);
        onChange(priceMin, numValue);
    };

    return (
        <div className="flex items-center gap-1.5">
            <input
                type="number"
                placeholder="€ Min"
                value={priceMin ?? ''}
                onChange={(e) => handleMinChange(e.target.value)}
                className="w-1/2 min-w-0 h-10 px-2 bg-black/20 text-white/80 text-sm placeholder-white/40
                   border-0 outline-none focus:bg-black/30 transition-colors"
            />
            <span className="text-white/40 text-sm flex-shrink-0">-</span>
            <input
                type="number"
                placeholder="€ Max"
                value={priceMax ?? ''}
                onChange={(e) => handleMaxChange(e.target.value)}
                className="w-1/2 min-w-0 h-10 px-2 bg-black/20 text-white/80 text-sm placeholder-white/40
                   border-0 outline-none focus:bg-black/30 transition-colors"
            />
        </div>
    );
}
