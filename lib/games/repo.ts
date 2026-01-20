import { createServerClient } from '@/lib/supabase/server';
import { Game } from '@/types/game';
import { SortOption } from '@/types/filters';

/**
 * Database row shape (snake_case as stored in Postgres)
 */
interface GameRow {
  id: string;
  title: string;
  platform: string;
  region: string;
  country: string;
  product_type: string;
  operating_system: string;
  genre: string;
  image_url: string;
  price_eur: number;
  old_price_eur: number | null;
  discount_percent: number | null;
  cashback_eur: number | null;
  likes: number;
}

/**
 * Maps database row (snake_case) to API response (camelCase)
 */
function mapRowToGame(row: GameRow): Game {
  return {
    id: row.id,
    title: row.title,
    platform: row.platform,
    region: row.region,
    country: row.country,
    productType: row.product_type,
    operatingSystem: row.operating_system,
    genre: row.genre,
    imageUrl: row.image_url,
    priceEur: Number(row.price_eur),
    oldPriceEur: row.old_price_eur ? Number(row.old_price_eur) : null,
    discountPercent: row.discount_percent,
    cashbackEur: row.cashback_eur ? Number(row.cashback_eur) : null,
    likes: row.likes,
  };
}

export interface ListGamesOptions {
  search?: string;
  priceMin?: number;
  priceMax?: number;
  region?: string;
  platforms?: string[];
  sort?: SortOption;
  limit?: number;
}

export interface ListGamesResult {
  count: number;
  items: Game[];
}

/**
 * Common game title aliases for better search UX
 */
const SEARCH_ALIASES: Record<string, string> = {
  'rdr2': 'red dead redemption 2',
  'rdr': 'red dead redemption',
  'gta5': 'gta v',
  'gtav': 'gta v',
  'gta 5': 'gta v',
  'witcher3': 'witcher 3',
  'witcher 3': 'the witcher 3',
  'fh5': 'forza horizon 5',
};

/**
 * Normalizes search query: trim, collapse spaces, apply aliases
 */
function normalizeSearchQuery(query: string): string {
  const normalized = query.trim().toLowerCase().replace(/\s+/g, ' ');
  return SEARCH_ALIASES[normalized] || query.trim();
}

/**
 * Fetches games from Supabase with optional filters.
 * Uses fuzzy search (pg_trgm) for search queries >= 2 characters.
 */
export async function listGames(options: ListGamesOptions = {}): Promise<ListGamesResult> {
  const supabase = createServerClient();
  const {
    search,
    priceMin,
    priceMax,
    region,
    platforms,
    sort = 'popularity',
    limit = 100,
  } = options;

  const normalizedSearch = search ? normalizeSearchQuery(search) : null;
  const effectiveLimit = Math.min(limit, 100);

  // Use fuzzy search RPC for queries >= 2 characters
  if (normalizedSearch && normalizedSearch.length >= 2) {
    const { data, error } = await supabase.rpc('search_games_fuzzy', {
      search_term: normalizedSearch,
      min_price: priceMin ?? null,
      max_price: priceMax ?? null,
      region_filter: region ?? null,
      platform_filters: platforms && platforms.length > 0 ? platforms : null,
      sort_by: sort,
      result_limit: effectiveLimit,
    });

    if (error) {
      console.error('[listGames] Fuzzy search RPC error:', {
        message: error.message,
        code: error.code,
      });

      // Fallback to ILIKE if RPC fails (e.g., function not yet deployed)
      console.warn('[listGames] Falling back to ILIKE search');
    } else if (data) {
      const items = (data as GameRow[]).map(mapRowToGame);
      return { count: items.length, items };
    }
  }

  // Fallback: standard query with ILIKE (for short queries or RPC fallback)
  let query = supabase.from('games').select('*').limit(effectiveLimit);

  // Search filter (ILIKE)
  if (normalizedSearch && normalizedSearch.length > 0) {
    query = query.ilike('title', `%${normalizedSearch}%`);
  }

  // Price filters
  if (priceMin !== undefined && priceMin !== null) {
    query = query.gte('price_eur', priceMin);
  }
  if (priceMax !== undefined && priceMax !== null) {
    query = query.lte('price_eur', priceMax);
  }

  // Region filter
  if (region) {
    query = query.eq('region', region);
  }

  // Platform filter
  if (platforms && platforms.length > 0) {
    query = query.in('platform', platforms);
  }

  // Sorting
  switch (sort) {
    case 'price_asc':
      query = query.order('price_eur', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price_eur', { ascending: false });
      break;
    case 'discount':
      query = query.order('discount_percent', { ascending: false, nullsFirst: false });
      break;
    case 'popularity':
    default:
      query = query.order('likes', { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error) {
    console.error('[listGames] Supabase error:', {
      message: error.message,
      code: error.code,
    });

    if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
      throw new Error('Table "games" does not exist. Please run schema.sql and seed.sql.');
    }

    throw new Error(`Database error: ${error.message}`);
  }

  if (!data) {
    return { count: 0, items: [] };
  }

  const items = (data as GameRow[]).map(mapRowToGame);

  return {
    count: items.length,
    items,
  };
}
