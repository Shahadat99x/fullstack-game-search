# UI Map

## Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                              │
│  ┌──────┐    ┌──────────────────────────────┐    ┌──────┐   │
│  │ Logo │    │         Search Bar           │    │ User │   │
│  └──────┘    └──────────────────────────────┘    └──────┘   │
├─────────────────────────────────────────────────────────────┤
│                   Results Found: X                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │         │  │         │  │         │  │         │        │
│  │  GAME   │  │  GAME   │  │  GAME   │  │  GAME   │        │
│  │  CARD   │  │  CARD   │  │  CARD   │  │  CARD   │        │
│  │         │  │         │  │         │  │         │        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Components

| Component      | File                          | Purpose                 |
| -------------- | ----------------------------- | ----------------------- |
| Header         | components/Header.tsx         | Top navigation bar      |
| SearchBar      | components/SearchBar.tsx      | Search input field      |
| ResultsSummary | components/ResultsSummary.tsx | Shows result count      |
| GameGrid       | components/GameGrid.tsx       | Responsive grid layout  |
| GameCard       | components/GameCard.tsx       | Individual game display |

## Responsive Breakpoints

- **Mobile** (< 640px): 1 column
- **Tablet** (640px - 1024px): 2 columns
- **Desktop** (1024px - 1280px): 3 columns
- **Large Desktop** (> 1280px): 4 columns
