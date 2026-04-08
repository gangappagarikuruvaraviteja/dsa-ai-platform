# AlgoCoach — AI-Powered DSA Learning Platform

An interactive coding interview preparation platform with AI tutoring, real-time code validation, and progress tracking.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-teal)

## Features

- **150+ DSA Problems** organized by topic (Arrays, Trees, Graphs, DP, etc.)
- **Monaco Code Editor** with syntax highlighting for Java, Python, C++, JavaScript
- **AI Tutor** — get hints, solution explanations, complexity analysis, and similar problem suggestions
- **AI Code Validation** — submit code and get instant feedback powered by AI
- **Daily Challenges** — a new problem every day to keep your streak going
- **Progress Tracking** — track solved problems, streaks, and topic mastery
- **Leaderboard** — compete with other users
- **Authentication** — email/password and Google OAuth sign-in
- **Dark/Light Mode** — full theme support

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 18** | UI component library |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling with custom design tokens |
| **shadcn/ui + Radix UI** | Accessible, themeable component primitives |
| **Monaco Editor** | VS Code-powered code editor |
| **TanStack React Query** | Server state, caching, data fetching |
| **React Router v6** | Client-side routing with protected routes |
| **React Hook Form + Zod** | Form handling with schema validation |
| **Recharts** | Dashboard charts and progress visualization |
| **Lucide React** | Icon library |
| **Sonner** | Toast notifications |
| **react-resizable-panels** | Split-pane editor layout |
| **react-markdown** | Render AI responses in markdown |
| **next-themes** | Dark/light mode |
| **canvas-confetti** | Celebration animations |

### Backend (Lovable Cloud)

| Service | Purpose |
|---|---|
| **PostgreSQL Database** | Problems, profiles, progress, daily challenges |
| **Authentication** | Email/password + Google OAuth |
| **Edge Functions (Deno)** | AI tutor, code validation, problem seeding |
| **Row-Level Security** | Per-user data access control |
| **Lovable AI Gateway** | AI model access (Gemini/GPT) — no API key needed |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── home/            # Landing page components
│   ├── problem/         # Problem detail (editor, AI tutor, description)
│   ├── problems/        # Problem list (topic sections, progress rings)
│   └── ui/              # shadcn/ui primitives
├── contexts/            # Auth context provider
├── data/                # Mock/fallback data
├── hooks/               # Custom hooks (useProblems, useSpringApi, etc.)
├── integrations/        # Lovable Cloud client & types
├── pages/               # Route pages
├── services/            # API layer & code execution service
└── index.css            # Design tokens & global styles

supabase/
└── functions/           # Edge functions
    ├── ai-tutor/        # AI tutoring (hints, explanations)
    ├── validate-code/   # AI-powered code validation
    ├── seed-problems/   # Database seeding
    └── enrich-problems/ # Problem enrichment
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (install via [nvm](https://github.com/nvm-sh/nvm))
- npm or bun

### Local Development

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:8080`.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run build:dev` | Development build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

## Deployment

Open [Lovable](https://lovable.dev) and click **Share → Publish** to deploy instantly.

## License

Private project — all rights reserved.
