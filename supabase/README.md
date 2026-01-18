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
-- Expected: 20
```

### Check required games exist

```sql
SELECT title FROM public.games
WHERE title IN ('FIFA 23', 'Red Dead Redemption 2', 'Split Fiction');
-- Expected: 3 rows
```

### Test ILIKE search (case-insensitive)

```sql
SELECT title, platform, price_eur
FROM public.games
WHERE title ILIKE '%fifa%';
-- Expected: FIFA 23
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
