-- =============================================================================
-- SUPABASE SCHEMA: Game Search Application
-- Phase 2: Database schema with search foundation
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- =============================================================================
-- TABLE: games
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  platform TEXT NOT NULL,
  region TEXT NOT NULL,
  image_url TEXT NOT NULL,
  price_eur NUMERIC(10,2) NOT NULL,
  old_price_eur NUMERIC(10,2) NULL,
  discount_percent INTEGER NULL,
  cashback_eur NUMERIC(10,2) NULL,
  likes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Data quality constraints
  CONSTRAINT games_title_not_empty CHECK (length(title) > 0),
  CONSTRAINT games_price_eur_positive CHECK (price_eur >= 0),
  CONSTRAINT games_old_price_eur_valid CHECK (old_price_eur IS NULL OR old_price_eur >= price_eur),
  CONSTRAINT games_discount_percent_valid CHECK (discount_percent IS NULL OR (discount_percent >= 0 AND discount_percent <= 99)),
  CONSTRAINT games_cashback_eur_positive CHECK (cashback_eur IS NULL OR cashback_eur >= 0),
  CONSTRAINT games_likes_positive CHECK (likes >= 0)
);

-- =============================================================================
-- INDEXES
-- =============================================================================

-- B-tree index for case-insensitive ILIKE searches
CREATE INDEX IF NOT EXISTS games_title_lower_idx ON public.games (lower(title));

-- GIN trigram index for fuzzy/similarity search
CREATE INDEX IF NOT EXISTS games_title_trgm_idx ON public.games USING gin (title gin_trgm_ops);

-- Index for filtering by platform
CREATE INDEX IF NOT EXISTS games_platform_idx ON public.games (platform);

-- Index for filtering by region
CREATE INDEX IF NOT EXISTS games_region_idx ON public.games (region);

-- Index for sorting by price
CREATE INDEX IF NOT EXISTS games_price_eur_idx ON public.games (price_eur);

-- Index for sorting by likes
CREATE INDEX IF NOT EXISTS games_likes_idx ON public.games (likes DESC);

-- =============================================================================
-- TRIGGER: Auto-update updated_at timestamp
-- =============================================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS games_updated_at_trigger ON public.games;

CREATE TRIGGER games_updated_at_trigger
  BEFORE UPDATE ON public.games
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- COMMENTS (for documentation)
-- =============================================================================

COMMENT ON TABLE public.games IS 'Game listings with pricing, discounts, and search support';
COMMENT ON COLUMN public.games.platform IS 'Distribution platform: Steam, EA App, Xbox Live, PlayStation Network, Nintendo eShop, etc.';
COMMENT ON COLUMN public.games.region IS 'License region: GLOBAL, EUROPE, etc.';
COMMENT ON COLUMN public.games.discount_percent IS 'Discount percentage (0-99), NULL if no discount';
COMMENT ON COLUMN public.games.cashback_eur IS 'Cashback amount in EUR, NULL if no cashback';
