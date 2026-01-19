// Filter types for the search functionality
export interface FilterState {
  priceMin: number | null;
  priceMax: number | null;
  region: string | null;
  platforms: string[];
  sort: SortOption;
}

export type SortOption = 'popularity' | 'price_asc' | 'price_desc' | 'discount';

export const PLATFORMS = [
  'Steam',
  'EA App',
  'Xbox Live',
  'PlayStation Network',
  'Nintendo eShop',
  'Battle.net',
  'Ubisoft Connect',
  'GOG',
  'Rockstar',
] as const;

export const REGIONS = ['GLOBAL', 'EUROPE'] as const;

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'discount', label: 'Discount: High to Low' },
];

export const DEFAULT_FILTERS: FilterState = {
  priceMin: null,
  priceMax: null,
  region: null,
  platforms: [],
  sort: 'popularity',
};
