# Living Portfolio — Tintin Torin

A Next.js portfolio with stable content and a **weekly AI Creative Direction Engine** that studies emerging experience design signals and reinterprets the hero-led visual system.

## Stack

- Next.js App Router (TypeScript)
- Tailwind CSS v4 + shadcn/ui
- OpenAI API for weekly creative direction generation
- Vercel deployment
- Obsidian notes for content source-of-truth (`obsidian/tintinportfolio/`)

## Routes

| Path | Description |
|------|-------------|
| `/` | Home |
| `/work` | Project index |
| `/work/[slug]` | Teaser case study |
| `/about` | Bio, skills, methods |
| `/contact` | Email & social |
| `/lab` | Creative direction lab & archive |
| `/creative-direction` | Weekly direction & token breakdown |

## Setup

```bash
npm install
cp .env.example .env.local   # add OPENAI_API_KEY (account needs billing/credits; 4 API calls per weekly run)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit portfolio content

Update typed data files (sourced from Obsidian):

- `src/data/profile.ts`
- `src/data/projects.ts`
- `src/data/experience.ts`

Keep Obsidian notes in sync when you change narrative copy.

## Weekly creative direction

**Primary:** Cursor Automation runs weekly per [`creative-direction/agent-runbook.md`](creative-direction/agent-runbook.md) (Monday 06:00 UTC). The agent updates research, generated JSON, and archive — then **opens a PR**. CI runs `creative-direction:check` on the PR before you merge.

**CI:** [`.github/workflows/creative-direction-validate.yml`](.github/workflows/creative-direction-validate.yml) validates direction files on PR/push (no generation, no API key).

**Optional local script** (when `OPENAI_API_KEY` has quota):

```bash
npm run creative-direction:weekly
npm run creative-direction:check
```

Allowed output paths:

- `obsidian/design-trends/`
- `src/generated/creative-direction.json`, `theme.json`, `interaction-system.json`
- `creative-direction/archive/YYYY-Www.md`

(`theme:check` is a deprecated alias for `creative-direction:check`.)

## Deploy (Vercel)

1. Import the repository in Vercel.
2. `OPENAI_API_KEY` is optional (local script only; weekly generation uses Cursor Automation).
3. Build command: `npm run build`
4. Output: Next.js default

## Agent / Codex instructions

See `AGENTS.md` and `.cursor/rules/` for automation boundaries.

## Project structure

```
src/
  app/              Pages
  components/       UI + sections
  data/             Portfolio content
  generated/        creative-direction.json, theme.json, interaction-system.json
  lib/              Theme, interaction & creative direction utilities
creative-direction/
  agent-runbook.md  Cursor Automation prompt + weekly steps
  agents/           Weekly AI workflow prompts
  archive/          Weekly archive notes
obsidian/
  tintinportfolio/  Portfolio content notes
  design-trends/    Weekly experience design research (agent-filled lenses)
scripts/
  generate-weekly-creative-direction.ts
```
