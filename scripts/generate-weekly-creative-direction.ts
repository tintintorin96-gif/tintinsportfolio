/**
 * Optional local generator — requires OPENAI_API_KEY.
 * Weekly production uses Cursor Automation; see creative-direction/agent-runbook.md.
 * CI validates only via .github/workflows/creative-direction-validate.yml
 */
import fs from "node:fs";
import path from "node:path";
import {
  signalScoutSchema,
  visualCultureAnalystSchema,
  creativeDirectionSchema,
  themeSchema,
  interactionSystemSchema,
  validateWeeklyOutputs,
} from "../src/lib/schemas/creative-direction";
import {
  loadPipelineContext,
  loadPriorWeeklySignals,
} from "./lib/load-context";
import { createOpenAIClient, runAgentStep } from "./lib/run-agent-step";
import { getISOWeekInfo } from "./lib/week-info";
import { writeDesignTrendResearch } from "./lib/write-design-trend-research";

const AGENTS_DIR = path.join("creative-direction", "agents");
const ARCHIVE_DIR = path.join("creative-direction", "archive");

function loadAgent(name: string): string {
  return fs.readFileSync(path.join(AGENTS_DIR, name), "utf8");
}

async function main() {
  const client = createOpenAIClient();
  const weekInfo = getISOWeekInfo();

  const signalScout = loadAgent("01-experience-signal-scout.md");
  const cultureAnalyst = loadAgent("02-visual-culture-analyst.md");
  const creativeDirector = loadAgent("03-ai-creative-director.md");
  const systemDirector = loadAgent("04-experience-system-director.md");

  const contextBlock = [
    loadPipelineContext(),
    loadPriorWeeklySignals(weekInfo.weekLabel),
  ]
    .filter(Boolean)
    .join("\n\n");

  const scoutRaw = await runAgentStep(
    client,
    signalScout,
    `Analyze ${weekInfo.analysisWindow} for Tintin's living portfolio.
Week: ${weekInfo.weekLabel} (${weekInfo.dateRange}).

Study lenses in obsidian/design-trends/ (Awwwards, FWA, CSS Design Awards, Webflow, Figma Community, creative dev portfolios, AI-native, luxury digital, editorial, motion, experimental portfolios, creative technology).

Prioritize shipped award-level sites over static inspiration. Map each signal to sourceCategory matching a lens filename (without .md). Use sourceUrl for a reference URL when known, or "" if unknown.

${contextBlock}

Return structured findings as JSON.`,
    {
      name: "signal_scout_weekly",
      schema: {
        type: "object",
        additionalProperties: false,
        required: [
          "emergingSignals",
          "recurringMovements",
          "shortLivedNovelty",
        ],
        properties: {
          emergingSignals: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "signal",
                "sourceCategory",
                "sourceUrl",
                "signalType",
                "shippedVsConcept",
                "recurrence",
                "whyItMatters",
                "characteristics",
                "portfolioFit",
                "avoid",
              ],
              properties: {
                signal: { type: "string" },
                sourceCategory: { type: "string" },
                sourceUrl: { type: "string" },
                signalType: { type: "string" },
                shippedVsConcept: {
                  type: "string",
                  enum: ["shipped", "concept", "mixed"],
                },
                recurrence: {
                  type: "string",
                  enum: ["emerging", "recurring", "short-lived"],
                },
                whyItMatters: { type: "string" },
                characteristics: { type: "string" },
                portfolioFit: { type: "string" },
                avoid: { type: "boolean" },
              },
            },
          },
          recurringMovements: { type: "array", items: { type: "string" } },
          shortLivedNovelty: { type: "array", items: { type: "string" } },
        },
      },
    },
  );

  const scout = signalScoutSchema.parse(scoutRaw);

  const analystRaw = await runAgentStep(
    client,
    cultureAnalyst,
    `Interpret scout findings as emerging experience language (week ${weekInfo.weekLabel}):

${JSON.stringify(scout, null, 2)}

${contextBlock}

Translate surface trends into movements (atmospheric depth, cinematic storytelling, spatial navigation, AI-native interaction patterns). Return JSON.`,
    {
      name: "visual_trend_analyst_weekly",
      schema: {
        type: "object",
        additionalProperties: false,
        required: [
          "dominantMovement",
          "supportingPatterns",
          "emotionalTone",
          "interactionStyle",
          "portfolioRelevance",
          "riskLevel",
          "favorOverNovelty",
        ],
        properties: {
          dominantMovement: { type: "string" },
          supportingPatterns: { type: "array", items: { type: "string" } },
          emotionalTone: { type: "string" },
          interactionStyle: { type: "string" },
          portfolioRelevance: { type: "string" },
          riskLevel: { type: "string" },
          favorOverNovelty: { type: "string" },
        },
      },
    },
  );

  const analyst = visualCultureAnalystSchema.parse(analystRaw);

  writeDesignTrendResearch(weekInfo.weekLabel, weekInfo.dateRange, scout, analyst);

  const directionRaw = await runAgentStep(
    client,
    creativeDirector,
    `Create one weekly creative direction for week ${weekInfo.weekLabel} (${weekInfo.dateRange}).

Analyst interpretation:
${JSON.stringify(analyst, null, 2)}

Scout signals:
${JSON.stringify(scout, null, 2)}

${contextBlock}

Rules:
- Hero is the experimental canvas; content and navigation stay stable.
- Favor recurring movements over short-lived novelty.
- Art-directed, intentional, portfolio-safe.
- week=${weekInfo.week}, year=${weekInfo.year}, dateRange="${weekInfo.dateRange}"
- Include experienceMood and motionLanguage (not motionDirection).`,
    {
      name: "weekly_creative_direction",
      schema: {
        type: "object",
        additionalProperties: false,
        required: [
          "week",
          "year",
          "dateRange",
          "creativeDirectionName",
          "oneSentenceConcept",
          "heroConcept",
          "experienceMood",
          "emergingSignals",
          "visualLanguage",
          "interactionLanguage",
          "motionLanguage",
          "storytellingApproach",
          "creativeTechnologyIdeas",
          "typographyDirection",
          "compositionDirection",
          "colorDirection",
          "textureDirection",
          "supportingPageTreatment",
          "avoid",
        ],
        properties: {
          week: { type: "number" },
          year: { type: "number" },
          dateRange: { type: "string" },
          creativeDirectionName: { type: "string" },
          oneSentenceConcept: { type: "string" },
          heroConcept: { type: "string" },
          experienceMood: { type: "string" },
          emergingSignals: { type: "array", items: { type: "string" } },
          visualLanguage: { type: "string" },
          interactionLanguage: { type: "string" },
          motionLanguage: { type: "string" },
          storytellingApproach: { type: "string" },
          creativeTechnologyIdeas: { type: "array", items: { type: "string" } },
          typographyDirection: { type: "string" },
          compositionDirection: { type: "string" },
          colorDirection: { type: "string" },
          textureDirection: { type: "string" },
          supportingPageTreatment: { type: "string" },
          avoid: { type: "array", items: { type: "string" } },
        },
      },
    },
    process.env.CREATIVE_DIRECTION_DIRECTOR_MODEL,
  );

  const direction = creativeDirectionSchema.parse(directionRaw);

  const themeRaw = await runAgentStep(
    client,
    systemDirector,
    `Translate creative direction into theme.json for week ${weekInfo.weekLabel}:

${JSON.stringify(direction, null, 2)}

Rules:
- WCAG AA contrast; minimal + bold baseline with full expressive hero.
- week=${weekInfo.week}, year=${weekInfo.year}
- heroVariant: hierarchy-led | cinematic | brutalist | luxury-tech | experimental
- hero.layout: stacked-type | split-grid | asymmetric | cinematic-band
- spacing.section: airy | balanced | tight
- pageTreatment cards/sections/navigation use schema enums
- Output theme.json fields only.`,
    {
      name: "weekly_portfolio_theme",
      schema: {
        type: "object",
        additionalProperties: false,
        required: [
          "week",
          "year",
          "themeName",
          "heroVariant",
          "background",
          "foreground",
          "accent",
          "muted",
          "border",
          "radius",
          "shadow",
          "spacing",
          "typography",
          "motion",
          "hero",
          "pageTreatment",
        ],
        properties: {
          week: { type: "number" },
          year: { type: "number" },
          themeName: { type: "string" },
          heroVariant: {
            type: "string",
            enum: [
              "hierarchy-led",
              "cinematic",
              "brutalist",
              "luxury-tech",
              "experimental",
            ],
          },
          background: { type: "string" },
          foreground: { type: "string" },
          accent: { type: "string" },
          muted: { type: "string" },
          border: { type: "string" },
          radius: { type: "string" },
          shadow: { type: "string" },
          spacing: {
            type: "object",
            additionalProperties: false,
            required: ["section", "grid", "heroPadding"],
            properties: {
              section: {
                type: "string",
                enum: ["airy", "balanced", "tight"],
              },
              grid: {
                type: "string",
                enum: ["comfortable", "dense"],
              },
              heroPadding: {
                type: "string",
                enum: ["generous", "standard", "compact"],
              },
            },
          },
          typography: {
            type: "object",
            additionalProperties: false,
            required: ["headingMood", "bodyMood", "scale"],
            properties: {
              headingMood: {
                type: "string",
                enum: ["minimal", "bold", "experimental"],
              },
              bodyMood: {
                type: "string",
                enum: ["minimal", "bold", "experimental"],
              },
              scale: { type: "string" },
            },
          },
          motion: {
            type: "object",
            additionalProperties: false,
            required: ["intensity", "style"],
            properties: {
              intensity: {
                type: "string",
                enum: ["none", "subtle", "expressive"],
              },
              style: { type: "string" },
            },
          },
          hero: {
            type: "object",
            additionalProperties: false,
            required: ["layout", "visualEffect", "interaction"],
            properties: {
              layout: {
                type: "string",
                enum: [
                  "stacked-type",
                  "split-grid",
                  "asymmetric",
                  "cinematic-band",
                ],
              },
              visualEffect: { type: "string" },
              interaction: { type: "string" },
            },
          },
          pageTreatment: {
            type: "object",
            additionalProperties: false,
            required: ["cards", "sections", "navigation"],
            properties: {
              cards: {
                type: "string",
                enum: ["bordered", "elevated", "glass-safe", "flat"],
              },
              sections: {
                type: "string",
                enum: ["muted-bands", "full-bleed", "grid-rhythm"],
              },
              navigation: {
                type: "string",
                enum: ["minimal-border", "accent-underline", "stable-flat"],
              },
            },
          },
        },
      },
    },
  );

  const theme = themeSchema.parse(themeRaw);

  const interactionRaw = await runAgentStep(
    client,
    systemDirector,
    `Translate creative direction into interaction-system.json for week ${weekInfo.weekLabel}:

${JSON.stringify(direction, null, 2)}

Theme:
${JSON.stringify(theme, null, 2)}

Rules:
- prefers-reduced-motion safe; reducedMotionFallback required
- storytellingStyle: linear-reveal | chapter-scroll | panel-sequence
- navigationBehavior must stay stable or minimal-reveal only
- week=${weekInfo.week}, year=${weekInfo.year}`,
    {
      name: "weekly_interaction_system",
      schema: {
        type: "object",
        additionalProperties: false,
        required: [
          "week",
          "year",
          "cursorTreatment",
          "scrollBehavior",
          "hoverBehavior",
          "pageTransition",
          "motionIntensity",
          "navigationBehavior",
          "storytellingStyle",
          "heroInteraction",
          "reducedMotionFallback",
        ],
        properties: {
          week: { type: "number" },
          year: { type: "number" },
          cursorTreatment: {
            type: "string",
            enum: ["default", "magnetic", "highlight"],
          },
          scrollBehavior: {
            type: "string",
            enum: ["standard", "cinematic", "snap-sections"],
          },
          hoverBehavior: {
            type: "string",
            enum: ["color-shift", "depth-reveal", "scale-lift"],
          },
          pageTransition: {
            type: "string",
            enum: ["none", "crossfade", "slide"],
          },
          motionIntensity: {
            type: "string",
            enum: ["none", "subtle", "expressive"],
          },
          navigationBehavior: {
            type: "string",
            enum: ["stable", "minimal-reveal"],
          },
          storytellingStyle: {
            type: "string",
            enum: ["linear-reveal", "chapter-scroll", "panel-sequence"],
          },
          heroInteraction: { type: "string" },
          reducedMotionFallback: { type: "string" },
        },
      },
    },
  );

  const interaction = interactionSystemSchema.parse(interactionRaw);
  validateWeeklyOutputs({ creativeDirection: direction, theme, interaction });

  fs.mkdirSync("src/generated", { recursive: true });
  fs.writeFileSync(
    "src/generated/creative-direction.json",
    JSON.stringify(direction, null, 2),
  );
  fs.writeFileSync("src/generated/theme.json", JSON.stringify(theme, null, 2));
  fs.writeFileSync(
    "src/generated/interaction-system.json",
    JSON.stringify(interaction, null, 2),
  );

  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(ARCHIVE_DIR, `${weekInfo.weekLabel}.md`),
    `# Weekly Creative Direction — ${weekInfo.weekLabel}

**Range:** ${weekInfo.dateRange}

## Direction
${direction.creativeDirectionName}

## Concept
${direction.oneSentenceConcept}

## Experience mood
${direction.experienceMood}

## Hero
${direction.heroConcept}

## Emerging signals
${direction.emergingSignals.map((s) => `- ${s}`).join("\n")}

## Visual language
${direction.visualLanguage}

## Interaction language
${direction.interactionLanguage}

## Motion language
${direction.motionLanguage}

## Storytelling
${direction.storytellingApproach}

## Supporting page treatment
${direction.supportingPageTreatment}

## How sections inherit the hero
${direction.supportingPageTreatment}

## Avoid
${direction.avoid.map((s) => `- ${s}`).join("\n")}

## Research
- Signals: \`obsidian/design-trends/${weekInfo.weekLabel}.signals.md\`
- Pipeline: \`creative-direction/archive/${weekInfo.weekLabel}.pipeline.json\`

## Theme tokens

\`\`\`json
${JSON.stringify(theme, null, 2)}
\`\`\`

## Interaction system

\`\`\`json
${JSON.stringify(interaction, null, 2)}
\`\`\`
`,
  );

  console.log(`Weekly creative direction written for ${weekInfo.weekLabel}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
