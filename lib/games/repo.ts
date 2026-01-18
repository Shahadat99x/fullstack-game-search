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
 * Fetches games from Supabase with optional filters.
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

  let query = supabase.from('games').select('*').limit(Math.min(limit, 100));

  // Search filter
  if (search && search.trim().length > 0) {
    const searchTerm = search.trim();
    query = query.ilike('title', `%${searchTerm}%`);
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
