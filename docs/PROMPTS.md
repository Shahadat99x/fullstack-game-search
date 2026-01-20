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
- Created indexes for search optimization
- Created seed data with 20 games (`supabase/seed.sql`)
- Created setup documentation (`supabase/README.md`)

---

## Phase 3: API Integration

**Tasks completed:**

- Installed @supabase/supabase-js
- Created server-side Supabase client (`lib/supabase/server.ts`)
- Created games repository with snake_case to camelCase mapping (`lib/games/repo.ts`)
- Created API route handler (`app/api/list/route.ts`)
- Added URL rewrite /list → /api/list in next.config.ts
- Updated SearchBar with debounce (300ms) support
- Updated page.tsx with fetch, loading, error states
- Created LoadingSpinner and ErrorMessage components
- Updated tests with fetch mocking

**API endpoints:**

- `GET /list` — returns all games
- `GET /list?search=<term>` — searches by title (ILIKE)

---

## Phase 4: UI Polish + Deployment

**Tasks completed:**

- Applied Eneba-style visual polish to GameCard:
  - Changed image aspect ratio to `aspect-[3/4]` (portrait, consistent)
  - Reduced corner radius from `rounded-xl` to `rounded-md`
  - Glassy teal cashback pill with `backdrop-blur-md`
  - Glass platform bar with `bg-black/50 backdrop-blur-sm`
  - Tightened typography spacing
  - Added subtle hover lift (`hover:-translate-y-1`) + shadow enhancement
  - Added hover border (`hover:border-white/20`)
- Verified lint (0 errors), tests (14 passed), and build (success)
- Updated README with Vercel deployment steps
- Created submission documentation

---

## Phase 5: Search Typeahead (Eneba-like Autocomplete)

**Tasks completed:**

- Observed Eneba's live search UI patterns (dropdown structure, colors, interactions)
- Added CSS design tokens for typeahead: `--bg-hover`, `--bg-dropdown`, `--accent-teal`
- Added optional `limit` query parameter to `/api/list` for suggestion limits
- Created `SearchSuggestionRow.tsx` component (query variation suggestions)
- Created `SearchOfferRow.tsx` component (offer suggestions with thumbnail, badge, price)
- Created `SearchAutocomplete.tsx` main component:
  - ARIA combobox pattern for accessibility
  - Debounced API fetch (150ms) for offer suggestions
  - Query suggestions generated from suffixes (steam, xbox, playstation, etc.)
  - Keyboard navigation (ArrowUp/Down, Enter, Escape)
  - Click outside closes dropdown
  - Clear button support
- Updated `Header.tsx` to use `SearchAutocomplete` instead of `SearchBar`
- Created comprehensive tests in `components/__tests__/SearchAutocomplete.test.tsx`

**API endpoints (unchanged):**

- `GET /list` — returns all games
- `GET /list?search=<term>` — searches by title (ILIKE)
- `GET /list?search=<term>&limit=8` — searches with limited results (for autocomplete)

**Components added:**

- `components/SearchAutocomplete.tsx`
- `components/SearchSuggestionRow.tsx`
- `components/SearchOfferRow.tsx`
- `components/__tests__/SearchAutocomplete.test.tsx`

---

## Phase 6: Fuzzy Search RPC (pg_trgm)

**Tasks completed:**

- Created SQL migration `supabase/migrations/20260120_search_games_fuzzy.sql`:
  - Enabled `pg_trgm` extension
  - Created `search_games_fuzzy()` RPC function
  - Uses `similarity()` function with 0.1 threshold for typo tolerance
  - Supports all filters (price, region, platforms, sorting)
- Updated `lib/games/repo.ts`:
  - Added alias mapping (rdr2 → "Red Dead Redemption 2", gta5 → "GTA V", etc.)
  - Added query normalization (trim, collapse spaces)
  - Calls RPC for fuzzy search, falls back to ILIKE if RPC fails
- Fixed RPC signature to pass empty arrays instead of null for better type safety

**Fuzzy search examples:**

- `"red ded"` → matches "Red Dead Redemption 2" (similarity: 0.16)
- `"rdr2"` → alias expands to "Red Dead Redemption 2"
- `"witcher"` → matches "The Witcher 3: Wild Hunt"

**Key insight:** PostgreSQL's `%` operator has default threshold of 0.3, but short queries against long titles score lower. Solution: use explicit `similarity(title, query) > 0.1` check.
