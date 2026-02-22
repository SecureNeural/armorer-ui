# Armorer UI

The web interface for [Armorer](https://github.com/SecureNeural/Armorer) — the Ollama for AI agents with built-in security.

**Live:** https://armorer-ui.pages.dev

## Features

- **Agent Catalog** — Browse 12+ AI agents with security ratings, risk levels, and one-click install commands
- **Skill Armory** — Verified MCP skills you can inject into any agent
- **Authentication** — User accounts via Supabase Auth (email/password)
- **Favorites** — Save agents and skills to your dashboard (with Row Level Security)
- **Dark UI** — Clean, terminal-inspired dark theme inspired by Ollama

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript, static export)
- **Styling**: Tailwind CSS
- **Auth + DB**: Supabase (Auth + PostgreSQL with RLS)
- **Hosting**: Cloudflare Pages
- **Icons**: Lucide React

## Getting Started

```bash
npm install
cp .env.example .env   # fill in your Supabase keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

### Cloudflare Pages (Current)

```bash
npm run build
wrangler pages deploy out --project-name armorer-ui
```

Environment variables are baked in at build time (`NEXT_PUBLIC_*`).

### Supabase Setup

1. Create a Supabase project
2. Run the migration: `supabase db push`
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── agents/             # Agent catalog + detail pages
│   ├── skills/             # Skill catalog + detail pages
│   ├── auth/               # Login + register pages
│   └── dashboard/          # User dashboard
├── components/             # UI components (navbar, cards, auth provider)
└── lib/
    ├── data/               # Static catalog data (agents, skills)
    └── supabase/           # Supabase client + types
```
