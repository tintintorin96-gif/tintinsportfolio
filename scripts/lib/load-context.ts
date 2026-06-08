import fs from "node:fs";
import path from "node:path";

const BRAND_FILES = [
  "creative-direction/brand.md",
  "creative-direction/visual-principles.md",
  "creative-direction/design-language.md",
  "creative-direction/freedom-model.md",
];

export const DESIGN_TRENDS_DIR = path.join("obsidian", "design-trends");

export function loadBrandContext(): string {
  return BRAND_FILES.filter((file) => fs.existsSync(file))
    .map((file) => fs.readFileSync(file, "utf8"))
    .join("\n\n");
}

export function loadDesignTrendLenses(): string {
  if (!fs.existsSync(DESIGN_TRENDS_DIR)) {
    return "";
  }

  return fs
    .readdirSync(DESIGN_TRENDS_DIR)
    .filter(
      (file) =>
        file.endsWith(".md") &&
        file !== "README.md" &&
        !file.match(/^\d{4}-W\d{2}\./),
    )
    .sort()
    .map((file) => {
      const content = fs.readFileSync(
        path.join(DESIGN_TRENDS_DIR, file),
        "utf8",
      );
      return `### ${file}\n${content}`;
    })
    .join("\n\n");
}

export function loadPriorWeeklySignals(weekLabel: string): string {
  if (!fs.existsSync(DESIGN_TRENDS_DIR)) {
    return "";
  }

  const prior = fs
    .readdirSync(DESIGN_TRENDS_DIR)
    .filter((file) => file.endsWith(".signals.md") && file !== `${weekLabel}.signals.md`)
    .sort()
    .slice(-2)
    .map((file) => fs.readFileSync(path.join(DESIGN_TRENDS_DIR, file), "utf8"));

  if (prior.length === 0) {
    return "";
  }

  return `Prior weekly signal reports:\n${prior.join("\n---\n")}`;
}

export function loadPipelineContext(): string {
  const brand = loadBrandContext();
  const lenses = loadDesignTrendLenses();
  return [brand && `Brand context:\n${brand}`, lenses && `Design trend lenses:\n${lenses}`]
    .filter(Boolean)
    .join("\n\n");
}
