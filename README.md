# Armorer UI

The web interface for [Armorer](https://github.com/SecureNeural/Armorer) — the Ollama for AI agents with built-in security.

Browse, install, and run AI agents securely. One command to sandbox, monitor, and manage credentials.

## Features

- **Agent Catalog** — Browse 12+ AI agents with security ratings, risk levels, and one-click install commands
- **Skill Armory** — Verified MCP skills you can inject into any agent
- **Authentication** — User accounts with email/password (JWT + httpOnly cookies)
- **Favorites** — Save agents and skills to your dashboard
- **Dark UI** — Clean, terminal-inspired dark theme inspired by Ollama

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Auth**: Custom JWT (jose + bcryptjs)
- **Database**: SQLite via libSQL (local) / Turso (production) + Drizzle ORM
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run database migration
npm run db:migrate

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `AUTH_SECRET` | JWT signing secret | dev default |
| `DATABASE_URL` | SQLite file or Turso URL | `file:armorer.db` |
| `DATABASE_AUTH_TOKEN` | Turso auth token (prod only) | — |

## Deployment

### Vercel + Turso (Recommended — Free)

1. Create a free [Turso](https://turso.tech) database:
   ```bash
   turso db create armorer-ui
   turso db tokens create armorer-ui
   ```
2. Run the migration against Turso:
   ```bash
   DATABASE_URL=libsql://your-db.turso.io DATABASE_AUTH_TOKEN=your-token npm run db:migrate
   ```
3. Deploy to Vercel:
   ```bash
   vercel
   ```
4. Set environment variables in the Vercel dashboard:
   - `AUTH_SECRET` — generate with `openssl rand -base64 32`
   - `DATABASE_URL` — your Turso database URL
   - `DATABASE_AUTH_TOKEN` — your Turso token

Both Vercel and Turso have generous free tiers (no credit card required).

### Cloudflare Pages

The app can be adapted for Cloudflare Pages with `@cloudflare/next-on-pages` and D1 for the database.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── agents/             # Agent catalog + detail pages
│   ├── skills/             # Skill catalog + detail pages
│   ├── auth/               # Login + register pages
│   ├── dashboard/          # User dashboard
│   └── api/                # API routes (auth, favorites)
├── components/             # Reusable UI components
├── lib/
│   ├── data/               # Static catalog data (agents, skills)
│   ├── db/                 # Database (schema, migration)
│   └── auth.ts             # Authentication logic
```

## Adding Agents

Edit `src/lib/data/agents.ts` to add new agents to the catalog. Each agent needs:
- `slug` — URL-safe identifier
- `name`, `tagline`, `description` — Display info
- `securityStatus` — `verified` | `hardened` | `community` | `unverified`
- `riskLevel` — `low` | `medium` | `high` | `critical`
- `installCommand` / `runCommand` — CLI commands

## Adding Skills

Edit `src/lib/data/skills.ts` to add new MCP skills. Each skill needs:
- `slug` — URL-safe identifier
- MCP config (`command`, `args`, `env`)
- `compatibleAgents` — list of agent slugs
