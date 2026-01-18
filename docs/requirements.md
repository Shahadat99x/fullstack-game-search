# Requirements

## Phase 1: Foundation + UI Shell ✅

### Core Requirements

- [x] Next.js App Router with TypeScript
- [x] Tailwind CSS for styling
- [x] ESLint + Prettier for code quality
- [x] Vitest + React Testing Library for testing

### UI Requirements

- [x] Header with brand and search bar
- [x] Results summary with count
- [x] Responsive game grid (4/2/1 columns)
- [x] Game cards with image, title, platform, region, price, discount, cashback, likes

### Mock Data

- [x] 15 games with full schema
- [x] Static data only (no API calls)

---

## Phase 2: Database Layer ✅

### Supabase Schema

- [x] `public.games` table with all required columns
- [x] Data quality constraints (price, discount, cashback validation)
- [x] `updated_at` trigger for automatic timestamps

### Search Foundation

- [x] pg_trgm extension enabled for fuzzy search
- [x] B-tree index on `lower(title)` for ILIKE performance
- [x] GIN trigram index for similarity search
- [x] Additional indexes on platform, region, price, likes

### Seed Data

- [x] 20 games seeded
- [x] Required games: FIFA 23, Red Dead Redemption 2, Split Fiction
- [x] Variety of platforms: Steam, EA App, Xbox Live, PlayStation Network, etc.

---

## Phase 3: API Integration ✅

### API Endpoints

- [x] GET /list — returns all games
- [x] GET /list?search=term — returns filtered games by title
- [x] Response format: `{ count, items }`

### Backend Implementation

- [x] Supabase client setup (`lib/supabase/server.ts`)
- [x] Games repository with DB mapping (`lib/games/repo.ts`)
- [x] Next.js route handler (`app/api/list/route.ts`)
- [x] URL rewrite: /list → /api/list

### Frontend Integration

- [x] Debounced search input (300ms)
- [x] Loading state with spinner
- [x] Error state with message
- [x] Empty state when no results

---

## Phase 4: Deployment (TODO)

- [ ] Deploy to Vercel
- [ ] Configure production environment variables
- [ ] Verify public API endpoints
