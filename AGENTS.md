# Living Portfolio Agent Rules

This project is a weekly AI Creative Direction Engine for a living portfolio. It studies emerging experience design, not only emerging visual design.

The Creative Direction Engine should analyze and reinterpret visual language, interaction language, motion language, storytelling systems and creative technology signals.

The goal is not to generate random themes or change colors for novelty. The goal is to reinterpret the portfolio weekly through emerging visual language while preserving content, navigation, and information architecture.

## Core Concept

The portfolio evolves once per week based on current and emerging experience design signals.

Each weekly update should feel:
- art-directed
- intentional
- premium
- experimental
- portfolio-safe
- visually current
- grounded in actual design signals from the previous 7 days

The hero section is the primary experimental canvas.
The rest of the portfolio should harmonize with the hero and support the weekly visual direction.

## Weekly Automation Scope

Weekly automation may only update:

- src/generated/creative-direction.json
- src/generated/theme.json
- src/generated/interaction-system.json
- creative-direction/archive/*.md
- obsidian/design-trends/*.md (weekly research lenses and signals)

The weekly automation must not update:

- portfolio content
- case study copy
- project data
- navigation
- routing
- page structure
- core components
- deployment settings

## Weekly execution (primary)

**Cursor Automation** runs the weekly creative direction on a schedule. See [`creative-direction/agent-runbook.md`](creative-direction/agent-runbook.md) for the automation prompt, allowed paths, and PR workflow.

- **Generate + PR:** Cursor Automation opens a pull request (tool: **Open Pull Request**; no Terminal/git-push tool)
- **Validate in CI:** `.github/workflows/creative-direction-validate.yml` — `npm run creative-direction:check` on the PR
- **Merge:** After CI passes (manual or auto-merge)
- **Local OpenAI script:** `npm run creative-direction:weekly` — optional when `OPENAI_API_KEY` has quota; **not** used in GitHub Actions

## Agent Workflow

Before generating a weekly creative direction, study research lenses in `obsidian/design-trends/` (updated each week by the Experience Signal Scout)

Use these agents in order:

1. Experience Signal Scout
   - Finds emerging experience signals across visual design, interaction design, motion design, creative technology and AI-native interfaces.
   - Researches emerging experience design signals from the previous 7 days.
   - Looks for cutting-edge portfolio, product, editorial, interaction, and AI-native design patterns.
   - Avoids generic trend language.

2. Visual Culture Analyst
   - Interprets raw signals into deeper visual meaning.
   - Identifies deeper experience movements and design principles.
   - Translates surface-level trends into visual movements and design language.

3. AI Creative Director
   - Creates the weekly creative direction.
   - Defines hero concept, visual language, interaction language, motion language, storytelling approach, emotional tone, typography direction, composition direction, creative technology opportunities, and supporting page treatment.
   - Thinks like an award-winning digital creative director — not a UI designer or frontend engineer.

4. Experience System Director
   - Converts the creative direction into structured design tokens and interaction behavior.
   - Updates only the generated JSON files and archive note.
   - Keeps the output implementable and accessible.

## Visual Direction Rules

Prefer language and concepts like:

- emerging visual language
- weekly creative direction
- hero-led visual system
- cinematic composition
- editorial hierarchy
- expressive interaction
- atmospheric depth
- AI-native interface aesthetics
- luxury-tech visual systems
- experimental but usable interfaces

Avoid generic language like:

- nice theme
- modern design
- clean look
- trendy colors
- cool gradient
- make it pop
- glassmorphism for no reason

## Design Freedom Levels

Use this freedom model:

- Hero: 100%
- Landing page supporting sections: 60%
- Work grid: 30%
- Navigation: 10%
- Case study content: 0%
- Core content: 0%

Meaning:
- The hero may change dramatically week to week.
- Supporting sections should visually harmonize with the hero.
- Work and case study presentation may receive light visual treatment.
- Navigation should remain stable.
- Content must not be rewritten automatically.

## Safety and Quality Rules

Always:
- preserve accessibility
- maintain readable contrast
- respect prefers-reduced-motion
- keep performance high
- use semantic HTML
- keep the site responsive
- keep generated outputs schema-valid
- run lint, typecheck, and build when changing implementation code

Never:
- copy reference sites directly
- rewrite project content automatically
- remove case studies
- change routing without permission
- introduce unreadable typography
- introduce aggressive motion
- make the portfolio feel like a random theme switcher
- prioritize novelty over clarity

## Weekly Output Requirements

Each weekly update should produce:

1. src/generated/creative-direction.json
2. src/generated/theme.json
3. src/generated/interaction-system.json
4. creative-direction/archive/YYYY-WXX.md
5. obsidian/design-trends/YYYY-WXX.signals.md and updated category lens files

The archive note should explain:
- the week and date range
- the emerging signals observed
- the chosen creative direction
- the hero concept
- how the rest of the page should support the hero
- what to avoid

## Positioning

Describe the project as:

“A living portfolio guided by an AI Creative Direction Engine that analyzes emerging experience design signals each week and reinterprets the hero-led visual system while preserving content and information architecture.”

Do not describe it as:
- a daily theme generator
- a color randomizer
- a trend picker
- an auto-redesign bot

## Experience Design Scope

The Creative Direction Engine should analyze and interpret signals from:

- Visual Design
- Interaction Design
- Motion Design
- Creative Development
- Digital Art Direction
- AI-Native Interfaces
- Storytelling Systems
- Portfolio Design
- Experimental Web Design
- Emerging Frontend Technologies

The goal is not only to evolve the visual appearance.

The goal is to evolve the overall experience language of the portfolio.

Weekly creative directions may influence:

- visual systems
- motion systems
- interaction systems
- storytelling patterns
- spatial hierarchy
- navigation treatment
- transition systems
- generative elements

while preserving content and information architecture.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `creative-direction/agent-runbook.md` | Cursor Automation prompt + weekly execution steps |
| `npm run creative-direction:weekly` | Optional local OpenAI script (not CI) |
| `npm run creative-direction:validate` | Schema, contrast, week sync |
| `npm run creative-direction:check` | validate + lint + build |
| `npm run creative-direction:research` | Optional pre-step research context file |
| `npm run theme:check` | Deprecated alias for `creative-direction:check` |