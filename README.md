# Game Search

A full-stack game search application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase account (for database)

### Installation

```bash
npm install
```

### Database Setup

See [supabase/README.md](./supabase/README.md) for database setup instructions.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

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
├── app/                 # Next.js App Router
│   ├── page.tsx        # Home page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── ResultsSummary.tsx
│   ├── GameCard.tsx
│   └── GameGrid.tsx
├── lib/                # Utilities and data
│   └── mock/
│       └── games.ts    # Mock game data
├── supabase/           # Database files
│   ├── schema.sql     # Table definitions
│   ├── seed.sql       # Seed data
│   └── README.md      # Setup instructions
├── types/              # TypeScript types
│   └── game.ts
├── docs/               # Documentation
│   ├── requirements.md
│   ├── ui-map.md
│   └── PROMPTS.md
└── public/             # Static assets
```

## 📋 Development Phases

### Phase 1: Foundation + UI Shell ✅

- [x] Next.js App Router + TypeScript + Tailwind
- [x] ESLint + Prettier configuration
- [x] Vitest + React Testing Library
- [x] UI components with mock data
- [x] CI/CD with GitHub Actions

### Phase 2: Database Layer ✅

- [x] Supabase PostgreSQL schema
- [x] pg_trgm extension for fuzzy search
- [x] Seed data (20 games)
- [x] Verification queries

### Phase 3: API Integration (TODO)

- [ ] Supabase client setup
- [ ] API routes for search
- [ ] Connect UI to real data

### Phase 4: Advanced Features (TODO)

- [ ] Filters and sorting
- [ ] Pagination
- [ ] User authentication

## 🧪 Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch
```

## 📝 License

MIT
