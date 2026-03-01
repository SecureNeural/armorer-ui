# Armorer UI

The web interface for [Armorer](https://github.com/SecureNeural/Armorer) — the Ollama for AI agents with built-in security.

**Live:** https://armorer-ui.pages.dev

## Features

- **Agent Catalog** — Browse 12+ AI agents with security ratings, risk levels, and one-click install commands
- **Skill Armory** — Verified MCP skills you can inject into any agent
- **Authentication** — User accounts via Cloudflare Pages Functions + D1 (email/password)
- **Favorites** — Save agents and skills to your dashboard (Cloudflare D1)
- **Dark UI** — Clean, terminal-inspired dark theme inspired by Ollama

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript, static export)
- **Styling**: Tailwind CSS
- **Auth + DB**: Cloudflare Pages Functions + D1 (cookie sessions)
- **Hosting**: Cloudflare Pages
- **Icons**: Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Note: `npm run dev` serves the Next.js UI only. Auth/favorites API routes are Cloudflare Pages Functions, so test those with a Pages preview (`wrangler pages dev ... --functions functions`) or a deployed Pages environment.

## Deployment

### Cloudflare Pages (Current)

```bash
npm run build
wrangler pages deploy out --project-name armorer-ui --functions functions
```

### Cloudflare D1 Setup (Auth + Favorites)

1. Create a D1 database (example: `armorer-ui`)
2. Apply `cloudflare/d1/schema.sql`
3. Bind the database as `DB` in Cloudflare Pages / `wrangler.toml`

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
    └── favorites/          # Cloudflare D1 favorites API client
```
