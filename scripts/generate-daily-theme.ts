import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const today = new Date().toISOString().slice(0, 10);

const schema = {
  name: "daily_portfolio_theme",
  schema: {
    type: "object",
    additionalProperties: false,
    required: [
      "date",
      "themeName",
      "trendSummary",
      "background",
      "foreground",
      "accent",
      "muted",
      "border",
      "radius",
      "shadow",
      "motion",
      "fontMood",
      "visualMood",
    ],
    properties: {
      date: { type: "string" },
      themeName: { type: "string" },
      trendSummary: { type: "string" },
      background: { type: "string" },
      foreground: { type: "string" },
      accent: { type: "string" },
      muted: { type: "string" },
      border: { type: "string" },
      radius: { type: "string" },
      shadow: { type: "string" },
      motion: { type: "string", enum: ["none", "subtle", "expressive"] },
      fontMood: { type: "string" },
      visualMood: { type: "string" },
    },
  },
};

const automationPrompt = `
You are the Portfolio Theme Agent.

Generate one daily visual theme based on recent visual design trends.

Only produce values for these theme fields:
- themeName
- date
- trendSummary
- background
- foreground
- accent
- muted
- border
- radius
- shadow
- motion
- fontMood
- visualMood

Interpret current trends from:
- product design
- portfolio design
- editorial web design
- interaction design
- visual identity systems

Rules:
- Keep the theme professional, not gimmicky.
- Interpret trends subtly through design tokens.
- Preserve readable contrast and highly legible body text.
- Avoid pure novelty over usability.
- Avoid flashing or aggressive motion.
- Respect prefers-reduced-motion by keeping motion no stronger than subtle unless clearly justified.
- Use accessible color contrast suitable for a designer/developer portfolio.
- Return today's date: ${today}.
`;

const response = await client.responses.create({
  model: "gpt-4.1-mini",
  input: automationPrompt,
  text: {
    format: {
      type: "json_schema",
      ...schema,
    },
  },
});

const raw = response.output_text;
const theme = JSON.parse(raw);

fs.mkdirSync("src/generated", { recursive: true });
fs.writeFileSync(
  "src/generated/theme.json",
  JSON.stringify(theme, null, 2),
);

fs.mkdirSync("obsidian/design-trends", { recursive: true });
fs.writeFileSync(
  path.join("obsidian/design-trends", `${today}.md`),
  `# Design Trends — ${today}

## Theme
${theme.themeName}

## Summary
${theme.trendSummary}

## Visual mood
${theme.visualMood}

## Generated tokens

\`\`\`json
${JSON.stringify(theme, null, 2)}
\`\`\`
`,
);
