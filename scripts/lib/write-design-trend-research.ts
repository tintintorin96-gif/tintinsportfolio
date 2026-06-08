import fs from "node:fs";
import path from "node:path";
import type { SignalScout } from "../../src/lib/schemas/creative-direction";
import { DESIGN_TRENDS_DIR } from "./load-context";

const CATEGORY_FILES: Record<string, string> = {
  awwwards: "awwwards.md",
  fwa: "fwa.md",
  "css-design-awards": "css-design-awards.md",
  "webflow-showcase": "webflow-showcase.md",
  "figma-community": "figma-community.md",
  "creative-dev-portfolios": "creative-dev-portfolios.md",
  "ai-native-products": "ai-native-products.md",
  "luxury-digital": "luxury-digital.md",
  "editorial-experiences": "editorial-experiences.md",
  "motion-design": "motion-design.md",
  "experimental-portfolios": "experimental-portfolios.md",
  "creative-technology": "creative-technology.md",
};

function normalizeCategory(raw: string): string {
  const key = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (key in CATEGORY_FILES) {
    return key;
  }

  if (key.includes("awwward")) return "awwwards";
  if (key.includes("fwa")) return "fwa";
  if (key.includes("css")) return "css-design-awards";
  if (key.includes("webflow")) return "webflow-showcase";
  if (key.includes("figma")) return "figma-community";
  if (key.includes("motion")) return "motion-design";
  if (key.includes("ai")) return "ai-native-products";
  if (key.includes("luxury")) return "luxury-digital";
  if (key.includes("editorial")) return "editorial-experiences";
  if (key.includes("portfolio")) return "experimental-portfolios";
  if (key.includes("creative") && key.includes("tech")) {
    return "creative-technology";
  }

  return "creative-dev-portfolios";
}

function formatSignalBlock(
  signal: SignalScout["emergingSignals"][number],
): string {
  const url =
    signal.sourceUrl.trim().length > 0
      ? `\n- **URL:** ${signal.sourceUrl}`
      : "";
  return `- **${signal.signal}** (${signal.signalType}, ${signal.shippedVsConcept}, ${signal.recurrence})${url}
  - Why it matters: ${signal.whyItMatters}
  - Characteristics: ${signal.characteristics}
  - Portfolio fit: ${signal.portfolioFit}
  - Avoid: ${signal.avoid ? "yes" : "no"}`;
}

export function writeDesignTrendResearch(
  weekLabel: string,
  dateRange: string,
  scout: SignalScout,
  analyst: Record<string, unknown>,
) {
  fs.mkdirSync(DESIGN_TRENDS_DIR, { recursive: true });

  const signalsPath = path.join(DESIGN_TRENDS_DIR, `${weekLabel}.signals.md`);
  const pipelinePath = path.join(
    "creative-direction",
    "archive",
    `${weekLabel}.pipeline.json`,
  );

  const byCategory = new Map<string, typeof scout.emergingSignals>();

  for (const signal of scout.emergingSignals) {
    const category = normalizeCategory(signal.sourceCategory);
    const list = byCategory.get(category) ?? [];
    list.push(signal);
    byCategory.set(category, list);
  }

  fs.writeFileSync(
    signalsPath,
    `# Experience signals — ${weekLabel}

**Range:** ${dateRange}

## Dominant movement (analyst)
${analyst.dominantMovement ?? ""}

## Recurring movements
${scout.recurringMovements.map((m) => `- ${m}`).join("\n")}

## Emerging signals
${scout.emergingSignals.map((s) => formatSignalBlock(s)).join("\n\n")}

## Short-lived novelty (deprioritize)
${scout.shortLivedNovelty.map((n) => `- ${n}`).join("\n")}
`,
  );

  for (const [category, signals] of byCategory) {
    const fileName = CATEGORY_FILES[category];
    if (!fileName) continue;

    const filePath = path.join(DESIGN_TRENDS_DIR, fileName);
    if (!fs.existsSync(filePath)) continue;

    const existing = fs.readFileSync(filePath, "utf8");
    const marker = "## Latest weekly research";
    const base = existing.includes(marker)
      ? existing.slice(0, existing.indexOf(marker)).trimEnd()
      : existing.trimEnd();

    const section = `${marker} — ${weekLabel}

**Range:** ${dateRange}

${signals.map((s) => formatSignalBlock(s)).join("\n\n")}
`;

    fs.writeFileSync(filePath, `${base}\n\n${section}\n`);
  }

  fs.mkdirSync(path.dirname(pipelinePath), { recursive: true });
  fs.writeFileSync(
    pipelinePath,
    JSON.stringify({ scout, analyst }, null, 2),
  );
}
