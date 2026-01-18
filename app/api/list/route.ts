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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    console.error('[API /list] Error:', errorMessage);

    // Return more helpful error in development
    const isDev = process.env.NODE_ENV === 'development';

    return NextResponse.json(
      {
        error: isDev ? errorMessage : 'Internal server error',
        hint: isDev
          ? 'Check server console for details. Make sure schema.sql and seed.sql have been run in Supabase.'
          : undefined,
      },
      { status: 500 }
    );
  }
}
