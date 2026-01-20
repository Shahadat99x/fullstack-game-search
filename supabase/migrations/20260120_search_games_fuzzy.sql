-- =============================================================================
-- MIGRATION: Enable Fuzzy Search with pg_trgm
-- Date: 2026-01-20
-- =============================================================================

-- Ensure pg_trgm extension is enabled (idempotent)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Ensure GIN index exists for fuzzy search (idempotent)
CREATE INDEX IF NOT EXISTS games_title_trgm_idx ON public.games USING gin (title gin_trgm_ops);

-- =============================================================================
-- FUNCTION: search_games_fuzzy
-- Provides fuzzy search using trigram similarity + ILIKE fallback
-- Supports all existing filters (price, region, platforms, sorting)
-- =============================================================================

CREATE OR REPLACE FUNCTION public.search_games_fuzzy(
  search_term text DEFAULT NULL,
  min_price numeric DEFAULT NULL,
  max_price numeric DEFAULT NULL,
  region_filter text DEFAULT NULL,
  platform_filters text[] DEFAULT NULL,
  sort_by text DEFAULT 'popularity',
  result_limit integer DEFAULT 100
)
RETURNS SETOF public.games
LANGUAGE plpgsql
SECURITY INVOKER
STABLE
AS $$
DECLARE
  normalized_search text;
BEGIN
  -- Normalize search term: trim, collapse spaces
  normalized_search := NULLIF(regexp_replace(TRIM(COALESCE(search_term, '')), '\s+', ' ', 'g'), '');
  
  RETURN QUERY
  SELECT g.*
  FROM public.games g
  WHERE 
    -- Fuzzy search: similarity match OR ILIKE fallback
    (normalized_search IS NULL OR 
     g.title % normalized_search OR 
     g.title ILIKE '%' || normalized_search || '%')
    -- Price filters
    AND (min_price IS NULL OR g.price_eur >= min_price)
    AND (max_price IS NULL OR g.price_eur <= max_price)
    -- Region filter
    AND (region_filter IS NULL OR g.region = region_filter)
    -- Platform filter (array match)
    AND (platform_filters IS NULL OR array_length(platform_filters, 1) IS NULL OR g.platform = ANY(platform_filters))
  ORDER BY
    -- Primary sort by user preference
    CASE WHEN sort_by = 'price_asc' THEN g.price_eur END ASC NULLS LAST,
    CASE WHEN sort_by = 'price_desc' THEN g.price_eur END DESC NULLS LAST,
    CASE WHEN sort_by = 'discount' THEN COALESCE(g.discount_percent, 0) END DESC,
    -- Secondary sort by similarity when searching
    CASE WHEN normalized_search IS NOT NULL 
         THEN similarity(g.title, normalized_search) END DESC NULLS LAST,
    -- Final sort by popularity
    g.likes DESC
  LIMIT result_limit;
END;
$$;

-- Grant execute to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.search_games_fuzzy TO anon, authenticated;

-- Add comment for documentation
COMMENT ON FUNCTION public.search_games_fuzzy IS 'Fuzzy search for games using pg_trgm similarity. Supports typos like "red ded" matching "Red Dead Redemption 2".';
