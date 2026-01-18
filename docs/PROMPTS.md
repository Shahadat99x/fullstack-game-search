# Prompts Log

This file tracks prompts used during development.

---

## Phase 1: Foundation + UI Shell

**Tasks completed:**

- Initialized Next.js App Router with TypeScript + Tailwind CSS
- Configured ESLint + Prettier
- Set up Vitest + React Testing Library
- Created UI components: Header, SearchBar, ResultsSummary, GameCard, GameGrid
- Created mock data with 15 games
- Added documentation stubs

---

## Phase 2: Data Layer (Supabase)

**Tasks completed:**

- Created Supabase PostgreSQL schema (`supabase/schema.sql`)
- Enabled `pg_trgm` extension for fuzzy search
- Added data quality constraints (CHECK constraints)
- Created indexes for search optimization:
  - B-tree on `lower(title)` for ILIKE
  - GIN trigram index for similarity search
  - Indexes on platform, region, price, likes
- Created seed data with 20 games (`supabase/seed.sql`)
- Created setup documentation (`supabase/README.md`)

**Search capabilities:**

- Case-insensitive partial match: `WHERE title ILIKE '%query%'`
- Fuzzy similarity: `WHERE similarity(title, 'query') > 0.1`
- Typo-tolerant: `WHERE title % 'query'`

---

## Phase 3: API Integration (TODO)

_To be populated_
