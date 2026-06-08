# Weekly Creative Direction — Agent Runbook

Primary execution path for the living portfolio. **Cursor Automation** runs this weekly, opens a **Pull Request**, and **GitHub Actions validates** before merge.

## Prerequisites (read first)

Cursor Automation checks out **`main` from GitHub** — not your laptop’s uncommitted files.

Before the first scheduled run, **commit and push** this entire system to `main`:

| Must exist on GitHub `main` | Purpose |
|-----------------------------|---------|
| `creative-direction/agent-runbook.md` | This runbook |
| `creative-direction/agents/*.md` | Four-agent prompts |
| `creative-direction/schemas/*.json` | Output contracts |
| `package.json` scripts `creative-direction:*` | CI validation |
| `scripts/validate-creative-direction.ts` | Schema gate |
| `.github/workflows/creative-direction-validate.yml` | PR checks |
| `src/lib/schemas/creative-direction.ts` | Zod validation |
| `AGENTS.md` | Agent rules |

**Verify on GitHub:** open the repo in the browser → confirm those paths exist on `main`. If the remote still has `daily-theme.yml` or `generate-daily-theme.ts` only, automation will fail with “scripts / runbook / schemas not present”.

The cloud agent **cannot** run `npm run creative-direction:check` during the run (no Terminal tool). Validation happens on the **PR via GitHub Actions** after the agent opens the PR.

## Schedule

- **When:** Monday 06:00 UTC (`0 6 * * 1`)
- **Where:** Cursor Automation (scheduled cloud agent)
- **Fallback (manual):** Run the prompt below in Cursor Agent mode in this repo

## Cursor Automation setup

| Setting | Value |
|---------|--------|
| **Name** | Weekly Creative Direction |
| **Trigger** | Cron — `0 6 * * 1` (weekly, Monday 06:00 UTC) |
| **Tools** | **Open Pull Request** (required). Optional: **Memories**, **MCP Server** (research) |
| **Repo** | This portfolio repository |
| **Base branch** | `main` (or your default branch) |
| **Cloud Agent** | Enabled for this repo in [Cloud Agent dashboard](https://cursor.com/dashboard?tab=cloud-agents) |

Cursor Automations do **not** expose a Terminal or generic Git push tool. Use **Open Pull Request** to publish changes; do **not** merge inside the automation.

### Automation prompt (copy into Cursor)

```
Run the Weekly AI Creative Direction Engine for this portfolio.

## Preflight
If creative-direction/agent-runbook.md, creative-direction/schemas/, or package.json scripts creative-direction:validate are missing from this checkout, STOP and report: "Creative direction system not on remote main — push local main to GitHub first." Do not invent files.

Follow in order:
1. AGENTS.md
2. creative-direction/agent-runbook.md (this file — execution steps)
3. creative-direction/agents/01-experience-signal-scout.md
4. creative-direction/agents/02-visual-culture-analyst.md
5. creative-direction/agents/03-ai-creative-director.md
6. creative-direction/agents/04-experience-system-director.md
7. creative-direction/freedom-model.md
8. creative-direction/schemas/*.json (output must validate)

## Scope — you may ONLY edit:
- obsidian/design-trends/*.md
- src/generated/creative-direction.json
- src/generated/theme.json
- src/generated/interaction-system.json
- creative-direction/archive/YYYY-WXX.md
- creative-direction/archive/YYYY-WXX.pipeline.json (optional audit)

## Forbidden — do NOT edit:
- src/data/**
- obsidian/tintinportfolio/**
- src/components/**, src/app/** (except if explicitly asked later)
- routing, navigation data, case study copy

## Workflow
1. Research emerging experience signals from the **previous 7 days** (shipped sites: Awwwards, FWA, CSS Design Awards, Webflow, creative dev portfolios, AI-native products, etc.).
2. Write obsidian/design-trends/YYYY-WXX.signals.md and update category lenses under obsidian/design-trends/.
3. Produce creative-direction.json, theme.json, interaction-system.json matching schemas. week/year/dateRange must align across all three files.
4. Write creative-direction/archive/YYYY-WXX.md (signals, direction, hero, inheritance, avoid).
5. Self-check outputs against creative-direction/schemas/*.json (week/year sync, WCAG AA contrast, required fields, avoid[] non-empty).
6. Open a Pull Request titled "Update weekly creative direction (YYYY-WXX)".
   Include ONLY: obsidian/design-trends/, src/generated/*.json, creative-direction/archive/.
7. Do NOT merge the PR. CI (.github/workflows/creative-direction-validate.yml) runs npm run creative-direction:check on the PR.
8. If CI would fail, fix files on the branch and update the PR — do not merge until checks pass.

PR body should include:
- Week label and date range
- creativeDirectionName and one-sentence concept
- Hero concept (1–2 lines)
- Top emerging signals (bullets)
- Note that content and navigation were not changed

Favor recurring movements over short-lived novelty. Hero is the experimental canvas. Portfolio-safe, WCAG AA contrast.
```

## After the automation runs

1. Open the PR on GitHub.
2. Wait for **Creative Direction Validate** to pass.
3. Merge the PR (manually, or enable auto-merge if you trust the checks).

## Manual run (local Agent mode)

1. Open Cursor Agent in this repo.
2. Paste the automation prompt above (or use steps 1–5 only).
3. Optionally run `npm run creative-direction:check` locally before opening a PR yourself.
4. Open a PR or push a branch — do not push directly to `main` unless you intend to skip review.

## Local OpenAI script (optional, disabled in CI)

`npm run creative-direction:weekly` remains for local use when `OPENAI_API_KEY` has quota. It is **not** run by GitHub Actions or Cursor Automation.

```bash
npm run creative-direction:weekly   # requires OPENAI_API_KEY in .env.local
npm run creative-direction:check
```

## CI (GitHub Actions)

Workflow: `.github/workflows/creative-direction-validate.yml`

- Runs on pull requests and pushes that touch generated direction files.
- Runs `npm run creative-direction:check` only — **no generation, no OpenAI secret required**.
- This is the quality gate before merge.

## Failure policy

| Step | On failure |
|------|------------|
| Self-check (schema / contrast) | Fix JSON; do not open PR |
| Open PR | Only after self-check passes |
| CI on PR | Fix branch; update PR; do not merge until green |
| Merge | Human or auto-merge **after** CI passes — not inside automation |

## Allowed PR paths

```
obsidian/design-trends/
src/generated/creative-direction.json
src/generated/theme.json
src/generated/interaction-system.json
creative-direction/archive/
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|--------|-----|
| “scripts / runbook / schemas not present in checkout” | GitHub `main` is behind your local machine | Commit + push full portfolio to `origin/main`, re-run automation |
| Automation succeeded, no site change | PR not merged, or same tokens as last week | Merge PR on GitHub; `git pull` locally |
| CI fails on PR | Invalid JSON or contrast | Agent updates PR branch until checks pass |
