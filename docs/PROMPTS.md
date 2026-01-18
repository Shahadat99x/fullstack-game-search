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

## Phase 4: Deployment (TODO)

_To be populated_
