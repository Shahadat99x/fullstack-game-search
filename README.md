# Game Search

A full-stack game search application built with Next.js, TypeScript, Tailwind CSS, and Supabase.

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

Searches games by title (case-insensitive partial match).

**Examples:**

```bash
curl "http://localhost:3000/list?search=fifa"
curl "http://localhost:3000/list?search=red%20dead"
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

### Phase 4: Deployment (TODO)

- Deploy to Vercel
- Production environment setup

## 🧪 Testing

```bash
npm run test
npm run test:watch
```

## 📝 License

MIT
