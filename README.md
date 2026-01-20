# Game Search

A full-stack game search application built with Next.js, TypeScript, Tailwind CSS, and Supabase.

> **🔗 Live Demo:** [YOUR_LIVE_URL_HERE](YOUR_LIVE_URL_HERE)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase account (for database)

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and add your Supabase credentials:

```bash
cp .env.example .env.local
```

### Database Setup

See [supabase/README.md](./supabase/README.md) for database setup instructions.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📡 API Endpoints

### List Games

```bash
GET /list
GET /api/list
```

Returns all games ordered by title.

**Example:**

```bash
curl http://localhost:3000/list
```

**Response:**

```json
{
  "count": 20,
  "items": [
    {
      "id": "uuid",
      "title": "FIFA 23",
      "platform": "EA App",
      "region": "GLOBAL",
      "imageUrl": "/placeholder-game.png",
      "priceEur": 19.99,
      "oldPriceEur": 59.99,
      "discountPercent": 67,
      "cashbackEur": 0.5,
      "likes": 1245
    }
  ]
}
```

### Search Games

```bash
GET /list?search=<term>
GET /api/list?search=<term>
```

Searches games by title with **fuzzy matching** (typo-tolerant) using PostgreSQL's `pg_trgm` extension.

**Features:**
- Typo tolerance: `"red ded"` → matches "Red Dead Redemption 2"
- Alias support: `"rdr2"` → searches for "Red Dead Redemption 2"
- Case-insensitive partial matching
- Results ordered by similarity score

**Supported Aliases:**
| Alias | Expands To |
|-------|------------|
| `rdr2` | Red Dead Redemption 2 |
| `gta5`, `gtav` | GTA V |
| `witcher3` | The Witcher 3 |
| `fh5` | Forza Horizon 5 |

**Examples:**

```bash
# Exact search
curl "http://localhost:3000/list?search=fifa"

# Fuzzy search (typo-tolerant)
curl "http://localhost:3000/list?search=red%20ded"

# Alias search
curl "http://localhost:3000/list?search=rdr2"
```

## 📦 Scripts

| Script           | Description               |
| ---------------- | ------------------------- |
| `npm run dev`    | Start development server  |
| `npm run build`  | Build for production      |
| `npm run start`  | Start production server   |
| `npm run lint`   | Run ESLint                |
| `npm run format` | Format code with Prettier |
| `npm run test`   | Run tests                 |

## 🏗️ Project Structure

```
├── app/
│   ├── api/list/        # API route handler
│   ├── page.tsx         # Home page
│   └── layout.tsx       # Root layout
├── components/          # React components
├── lib/
│   ├── supabase/        # Supabase client
│   ├── games/           # Games repository
│   └── mock/            # Mock data (dev)
├── supabase/            # Database files
│   ├── schema.sql
│   ├── seed.sql
│   └── README.md
├── types/               # TypeScript types
└── docs/                # Documentation
```

## 📋 Development Phases

### Phase 1: Foundation + UI Shell ✅

- Next.js App Router + TypeScript + Tailwind
- ESLint + Prettier + Vitest
- UI components with mock data

### Phase 2: Database Layer ✅

- Supabase PostgreSQL schema
- pg_trgm extension for fuzzy search
- Seed data (20 games)

### Phase 3: API Integration ✅

- API endpoints: /list, /list?search=
- Supabase client integration
- Debounced search with loading states

### Phase 4: UI Polish + Deployment ✅

- Eneba-style card polish (aspect-[3/4], glassy badges, hover effects)
- Deploy to Vercel with production env vars
- Verified production build and tests

## 🚀 Vercel Deployment

### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the `fullstack-game-search` repo

### 2. Configure Environment Variables

In Vercel Project Settings → Environment Variables, add:

| Variable | Value | Scope |
|----------|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://[project-ref].supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key from Supabase | All |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key (keep secret) | Production |

### 3. Deploy

1. Click "Deploy" — Vercel will build and deploy automatically
2. Note your production URL (e.g., `https://your-app.vercel.app`)

### 4. Verify Deployment

After deployment, verify these URLs work:

```bash
# Health check - should return JSON with games
curl https://YOUR_VERCEL_URL/list

# Search test - should return matching games
curl "https://YOUR_VERCEL_URL/list?search=gta"
```

### 5. Update Live URL

Update the Live Demo URL at the top of this README with your Vercel URL.

## 🧪 Testing

```bash
npm run test
npm run test:watch
```

## 📝 License

MIT
