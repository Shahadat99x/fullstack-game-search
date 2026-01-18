import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

/**
 * Helper to get env var with fallback names
 */
function getEnvVar(primaryName: string, fallbackName: string): string | undefined {
  return process.env[primaryName] ?? process.env[fallbackName];
}

/**
 * Creates a Supabase client for server-side operations.
 * Uses anon key for read-only operations.
 * Lazily initialized to avoid build-time errors.
 */
export function createServerClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_URL');
  const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY');

  // Log presence (not values) for debugging
  console.log('[Supabase] ENV check:', {
    hasUrl: !!supabaseUrl,
    hasAnonKey: !!supabaseAnonKey,
  });

  if (!supabaseUrl) {
    throw new Error(
      'Missing env var: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL. Check your .env.local file.'
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      'Missing env var: NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY. Check your .env.local file.'
    );
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return supabaseClient;
}
