# Supabase Database Setup

This document explains how to set up the Supabase database for the Game Search application.

## Prerequisites

1. Create a [Supabase](https://supabase.com) account
2. Create a new project

## Setup Steps

### 1. Run Schema SQL

1. Open your Supabase project dashboard
2. Go to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the contents of `schema.sql`
5. Click **Run**

### 2. Run Seed SQL

1. In the SQL Editor, create another **New Query**
2. Copy and paste the contents of `seed.sql`
3. Click **Run**

### 3. Get API Keys

1. Go to **Settings** → **API**
2. Copy the following values to your `.env.local` file:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Verification Queries

Run these queries in the SQL Editor to verify your setup:

### Count total games

```sql
SELECT count(*) FROM public.games;
-- Expected: 51 (13 Split Fiction + 10 FIFA 23 + 10 RDR2 + 6 GTA V + 6 Witcher 3 + 6 Forza Horizon 5)
```

### Count Split Fiction offers (should be exactly 13)

```sql
SELECT count(*) FROM public.games WHERE title ILIKE '%split fiction%';
-- Expected: 13
```

### Check all 6 base titles exist

```sql
SELECT DISTINCT
  CASE
    WHEN title ILIKE '%split fiction%' THEN 'Split Fiction'
    WHEN title ILIKE '%fifa 23%' THEN 'FIFA 23'
    WHEN title ILIKE '%red dead%' THEN 'Red Dead Redemption 2'
    WHEN title ILIKE '%gta%' THEN 'GTA V'
    WHEN title ILIKE '%witcher%' THEN 'The Witcher 3'
    WHEN title ILIKE '%forza%' THEN 'Forza Horizon 5'
  END AS base_title,
  count(*) as offer_count
FROM public.games
GROUP BY base_title
ORDER BY offer_count DESC;
-- Expected: 6 rows with counts (13, 10, 10, 6, 6, 6)
```

### Test ILIKE search (case-insensitive)

```sql
SELECT title, platform, price_eur
FROM public.games
WHERE title ILIKE '%fifa%';
-- Expected: 10 rows
```

### Test fuzzy search with pg_trgm

```sql
SELECT title, similarity(title, 'red dead') AS similarity_score
FROM public.games
WHERE similarity(title, 'red dead') > 0.1
ORDER BY similarity_score DESC
LIMIT 5;
-- Expected: Red Dead Redemption 2 at top
```

### Test typo-tolerant search

```sql
SELECT title, similarity(title, 'witcher') AS score
FROM public.games
WHERE title % 'witcher'
ORDER BY score DESC;
-- Expected: The Witcher 3: Wild Hunt
```

### Verify indexes exist

```sql
SELECT indexname FROM pg_indexes WHERE tablename = 'games';
-- Expected: Multiple indexes including games_title_trgm_idx
```

## Schema Overview

| Column           | Type          | Description                          |
| ---------------- | ------------- | ------------------------------------ |
| id               | UUID          | Primary key                          |
| title            | TEXT          | Game title                           |
| platform         | TEXT          | Steam, EA App, Xbox Live, etc.       |
| region           | TEXT          | GLOBAL, EUROPE                       |
| image_url        | TEXT          | Cover image URL                      |
| price_eur        | NUMERIC(10,2) | Current price in EUR                 |
| old_price_eur    | NUMERIC(10,2) | Original price (null if no discount) |
| discount_percent | INTEGER       | Discount % (0-99, null if none)      |
| cashback_eur     | NUMERIC(10,2) | Cashback amount (null if none)       |
| likes            | INTEGER       | User likes count                     |
| created_at       | TIMESTAMPTZ   | Record creation time                 |
| updated_at       | TIMESTAMPTZ   | Last update time (auto-updated)      |

## Search Capabilities

- **ILIKE**: Case-insensitive partial matching on title
- **pg_trgm**: Fuzzy/similarity search for typo tolerance
- **Indexes**: Optimized for title search, platform/region filters, price/likes sorting
