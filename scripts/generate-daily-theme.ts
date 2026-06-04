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

const response = await client.responses.create({
  model: "gpt-4.1-mini",
  input: `
Create today's portfolio visual theme based on current visual design trends.

Interpret trends from:
- product design
- portfolio design
- editorial web design
- interaction design
- visual identity systems

Rules:
- Keep it professional.
- Do not make it gimmicky.
- Strong accessibility.
- High text contrast.
- Suitable for a designer/developer portfolio.
- Return today's date: ${today}.
`,
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
