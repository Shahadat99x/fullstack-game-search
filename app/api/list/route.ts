import { NextRequest, NextResponse } from 'next/server';
import { listGames } from '@/lib/games/repo';

const MAX_SEARCH_LENGTH = 80;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') ?? '';

    // Validate search length
    if (search.length > MAX_SEARCH_LENGTH) {
      return NextResponse.json(
        { error: `Search term exceeds maximum length of ${MAX_SEARCH_LENGTH} characters` },
        { status: 400 }
      );
    }

    const result = await listGames({ search });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching games:', error);

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
