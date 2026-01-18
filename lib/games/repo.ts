import { createServerClient } from '@/lib/supabase/server';
import { Game } from '@/types/game';

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
  limit?: number;
}

export interface ListGamesResult {
  count: number;
  items: Game[];
}

/**
 * Fetches games from Supabase with optional search filter.
 * - If search is provided: filters by title ILIKE and orders by title ASC
 * - If no search: returns all games ordered by title ASC
 */
export async function listGames(options: ListGamesOptions = {}): Promise<ListGamesResult> {
  const supabase = createServerClient();
  const { search, limit = 50 } = options;

  let query = supabase
    .from('games')
    .select('*')
    .order('title', { ascending: true })
    .limit(Math.min(limit, 100));

  // Apply search filter if provided
  if (search && search.trim().length > 0) {
    const searchTerm = search.trim();
    query = query.ilike('title', `%${searchTerm}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  const items = (data as GameRow[]).map(mapRowToGame);

  return {
    count: items.length,
    items,
  };
}
