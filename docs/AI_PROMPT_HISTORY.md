# AI Prompt History (ChatGPT + Antigravity)

I used AI as a helper for planning, scaffolding, and debugging — then implemented/adjusted everything in VS Code.
This is a curated log of the most important prompts that influenced the final solution (not a full transcript).

Repo: https://github.com/Shahadat99x/fullstack-game-search  
Live: https://enebasearch.vercel.app

---

## How I used AI (quick summary)
- Planning: break the assignment into small deliverable steps.
- Implementation support: generate starter code patterns (Next.js route handler, Supabase repo pattern, UI component structure).
- Debugging: production issue with Supabase RPC fuzzy search signature.
- Verification: reviewer-style checklist and curl proof.

---

## Phase 1 — Planning + project skeleton (Next.js / React)
### Prompt (ChatGPT)
“I need to build Eneba’s internship homework: a web app matching a screenshot, with `/list` and `/list?search=` (fuzzy preferred), using an SQL DB. Propose a simple architecture (React + Node/Next + Postgres) and a step-by-step plan.”

**What I took from the answer**
- A phase plan: UI first → DB schema/seed → API → polish → fuzzy → verification.
- Suggested component breakdown for the UI.

**What I changed**
- Kept scope tight (only what’s needed for the screenshot + required endpoints).

---

## Phase 2 — Database schema + seed (Supabase Postgres)
### Prompt (ChatGPT)
“Design a minimal Postgres schema based on the screenshot: games/offers + fields needed for filtering (price, region, platform, etc.). Include constraints and indexes.”

**What I took from the answer**
- A clean schema with indexing guidance.

**What I changed**
- Seeded realistic content with the required games and a few extra.
- Final data (verified in `VERIFICATION_REPORT.md`): **6 games, 51 offers**.

**Files**
- `supabase/schema.sql`
- `supabase/seed.sql`

---

## Phase 3 — Backend API (`/list`, `/list?search=...`)
### Prompt (ChatGPT)
“Implement `/list` and `/list?search=<term>` in Next.js App Router using Supabase. Return `{ count, items }`. Keep it readable and typed.”

**What I took from the answer**
- Route handler structure and a small repository layer (`lib/games/repo.ts`).
- Pattern for Supabase server client.

**What I changed**
- Ensured the public route `/list` works (rewrite to `/api/list`).
- Standardized response format and mapping.

**Files**
- `app/api/list/route.ts`
- `lib/supabase/server.ts`
- `lib/games/repo.ts`
- `next.config.ts`

---

## Phase 4 — UI details to match screenshot
### Prompt (ChatGPT)
“Given an Eneba-like screenshot, suggest Tailwind layout and component styling for the results page (filters sidebar + game cards). Keep it close to the screenshot and not over-designed.”

**What I took from the answer**
- Card layout ideas (image ratio, badges, hover states, spacing).
- Suggestions for grid and sidebar spacing.

**What I changed**
- Tuned spacing/typography manually by comparing to the screenshot.
- Verified image loading on Vercel.

---

## Phase 5 — Autocomplete (typeahead)
### Prompt (ChatGPT)
“Implement an accessible autocomplete dropdown (ARIA combobox) similar to Eneba search. Needs debounce, keyboard navigation, escape/click-outside close. Fetch from `/list?search=...&limit=...`.”

**What I took from the answer**
- ARIA combobox behavior and keyboard controls.
- Debounced fetching approach.

**What I changed**
- Kept suggestions lightweight and fast.
- Added tests to cover the main interactions.

**Files**
- `components/SearchAutocomplete.tsx`
- `components/__tests__/SearchAutocomplete.test.tsx`

---

## Phase 6 — Fuzzy search (pg_trgm + Supabase RPC)
### Prompt (ChatGPT)
“Implement fuzzy search in Postgres using `pg_trgm` + `similarity()`. Provide a Supabase RPC function and show how to call it from Supabase JS with named params. Make optional filters safe.”

**What I took from the answer**
- Use `pg_trgm` and `similarity(title, query)` instead of relying on `%` defaults.
- RPC-based approach for fuzzy searching in the database.

**What I changed**
- Set a low threshold (**0.1**) so short queries like `red ded` still match long titles.
- Added query normalization + a small alias map (e.g. `rdr2` → “Red Dead Redemption 2”).
- Kept ILIKE fallback if RPC fails.

**Files**
- `supabase/migrations/20260120_search_games_fuzzy.sql`
- `lib/games/repo.ts`

---

## Phase 7 — Production bug (RPC signature mismatch)
### Prompt (Antigravity)
“Production fuzzy search returns empty results. Inspect Supabase RPC function signature and the `.rpc()` call (named params). Fix any mismatch or null typing issues and verify again using live curl.”

**What I took from the answer**
- Root cause: function signature / parameter naming mismatch between SQL and `.rpc()` call.
- Minimal fix to align the RPC signature and the JS named parameters.

**Result**
- Live fuzzy search works: `/list?search=red%20ded` returns results.

**Commit**
- `22865cf — fix(api): align fuzzy search RPC signature`

---

## Phase 8 — Final verification + report
### Prompt (Antigravity)
“Run a reviewer checklist: lint/test/build, local curls, production curls, UI smoke test. Write a verification report with counts and links.”

**Result (recorded in `VERIFICATION_REPORT.md`)**
- Lint: ✅ (0 errors, warnings only)
- Tests: ✅ 15/15
- Build: ✅
- Production API: ✅ fuzzy search working

**Commit**
- `f37998b — chore: add verification report and fix README live URL`

---

## Proof endpoints I used (production)
- `GET https://enebasearch.vercel.app/list`
- `GET https://enebasearch.vercel.app/list?search=red%20ded`
- `GET https://enebasearch.vercel.app/list?search=fifa`
- `GET https://enebasearch.vercel.app/list?search=split%20fiction`

---

## Note on authorship
AI helped with planning and code suggestions, but I reviewed the output and implemented the final solution in VS Code, keeping the scope minimal and aligning it with the assignment requirements.
