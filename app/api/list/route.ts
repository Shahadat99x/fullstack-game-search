import { NextRequest, NextResponse } from 'next/server';
import { listGames } from '@/lib/games/repo';
import { SortOption } from '@/types/filters';

const MAX_SEARCH_LENGTH = 80;
const VALID_SORTS: SortOption[] = ['popularity', 'price_asc', 'price_desc', 'discount'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const search = searchParams.get('search') ?? '';
    const priceMinStr = searchParams.get('priceMin');
    const priceMaxStr = searchParams.get('priceMax');
    const region = searchParams.get('region');
    const platformsStr = searchParams.get('platforms');
    const sortStr = searchParams.get('sort') as SortOption | null;

    // Validate search length
    if (search.length > MAX_SEARCH_LENGTH) {
      return NextResponse.json(
        { error: `Search term exceeds maximum length of ${MAX_SEARCH_LENGTH} characters` },
        { status: 400 }
      );
    }

    // Parse price filters
    const priceMin = priceMinStr ? parseFloat(priceMinStr) : undefined;
    const priceMax = priceMaxStr ? parseFloat(priceMaxStr) : undefined;

    // Validate price values
    if (priceMin !== undefined && isNaN(priceMin)) {
      return NextResponse.json({ error: 'Invalid priceMin value' }, { status: 400 });
    }
    if (priceMax !== undefined && isNaN(priceMax)) {
      return NextResponse.json({ error: 'Invalid priceMax value' }, { status: 400 });
    }

    // Parse platforms
    const platforms = platformsStr ? platformsStr.split(',').filter(Boolean) : undefined;

    // Validate sort
    const sort = sortStr && VALID_SORTS.includes(sortStr) ? sortStr : 'popularity';

    const result = await listGames({
      search,
      priceMin,
      priceMax,
      region: region || undefined,
      platforms,
      sort,
    });

    return NextResponse.json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[API /list] Error:', errorMessage);

    const isDev = process.env.NODE_ENV === 'development';

    return NextResponse.json(
      {
        error: isDev ? errorMessage : 'Internal server error',
        hint: isDev ? 'Check server console for details.' : undefined,
      },
      { status: 500 }
    );
  }
}
