import { z } from "zod";

export const HERO_VARIANTS = [
  "hierarchy-led",
  "cinematic",
  "brutalist",
  "luxury-tech",
  "experimental",
] as const;

export const HERO_LAYOUTS = [
  "stacked-type",
  "split-grid",
  "asymmetric",
  "cinematic-band",
] as const;

export const signalScoutSchema = z.object({
  emergingSignals: z.array(
    z.object({
      signal: z.string(),
      sourceCategory: z.string(),
      sourceUrl: z.string(),
      signalType: z.string(),
      shippedVsConcept: z.enum(["shipped", "concept", "mixed"]),
      recurrence: z.enum(["emerging", "recurring", "short-lived"]),
      whyItMatters: z.string(),
      characteristics: z.string(),
      portfolioFit: z.string(),
      avoid: z.boolean(),
    }),
  ),
  recurringMovements: z.array(z.string()),
  shortLivedNovelty: z.array(z.string()),
});

export const visualCultureAnalystSchema = z.object({
  dominantMovement: z.string(),
  supportingPatterns: z.array(z.string()),
  emotionalTone: z.string(),
  interactionStyle: z.string(),
  portfolioRelevance: z.string(),
  riskLevel: z.string(),
  favorOverNovelty: z.string(),
});

export const creativeDirectionSchema = z.object({
  week: z.number(),
  year: z.number(),
  dateRange: z.string(),
  creativeDirectionName: z.string(),
  oneSentenceConcept: z.string(),
  heroConcept: z.string(),
  experienceMood: z.string(),
  emergingSignals: z.array(z.string()).min(2),
  visualLanguage: z.string(),
  interactionLanguage: z.string(),
  motionLanguage: z.string(),
  storytellingApproach: z.string(),
  creativeTechnologyIdeas: z.array(z.string()),
  typographyDirection: z.string(),
  compositionDirection: z.string(),
  colorDirection: z.string(),
  textureDirection: z.string(),
  supportingPageTreatment: z.string(),
  avoid: z.array(z.string()).min(1),
});

export const themeSchema = z.object({
  week: z.number(),
  year: z.number(),
  themeName: z.string(),
  heroVariant: z.enum(HERO_VARIANTS),
  background: z.string(),
  foreground: z.string(),
  accent: z.string(),
  muted: z.string(),
  border: z.string(),
  radius: z.string(),
  shadow: z.string(),
  spacing: z.object({
    section: z.enum(["airy", "balanced", "tight"]),
    grid: z.enum(["comfortable", "dense"]),
    heroPadding: z.enum(["generous", "standard", "compact"]),
  }),
  typography: z.object({
    headingMood: z.enum(["minimal", "bold", "experimental"]),
    bodyMood: z.enum(["minimal", "bold", "experimental"]),
    scale: z.string(),
  }),
  motion: z.object({
    intensity: z.enum(["none", "subtle", "expressive"]),
    style: z.string(),
  }),
  hero: z.object({
    layout: z.enum(HERO_LAYOUTS),
    visualEffect: z.string(),
    interaction: z.string(),
  }),
  pageTreatment: z.object({
    cards: z.enum(["bordered", "elevated", "glass-safe", "flat"]),
    sections: z.enum(["muted-bands", "full-bleed", "grid-rhythm"]),
    navigation: z.enum(["minimal-border", "accent-underline", "stable-flat"]),
  }),
});

export const interactionSystemSchema = z.object({
  week: z.number(),
  year: z.number(),
  cursorTreatment: z.enum(["default", "magnetic", "highlight"]),
  scrollBehavior: z.enum(["standard", "cinematic", "snap-sections"]),
  hoverBehavior: z.enum(["color-shift", "depth-reveal", "scale-lift"]),
  pageTransition: z.enum(["none", "crossfade", "slide"]),
  motionIntensity: z.enum(["none", "subtle", "expressive"]),
  navigationBehavior: z.enum(["stable", "minimal-reveal"]),
  storytellingStyle: z.enum([
    "linear-reveal",
    "chapter-scroll",
    "panel-sequence",
  ]),
  heroInteraction: z.string(),
  reducedMotionFallback: z.string(),
});

export type SignalScout = z.infer<typeof signalScoutSchema>;
export type VisualCultureAnalyst = z.infer<typeof visualCultureAnalystSchema>;
export type CreativeDirection = z.infer<typeof creativeDirectionSchema>;
export type Theme = z.infer<typeof themeSchema>;
export type InteractionSystem = z.infer<typeof interactionSystemSchema>;

const FORBIDDEN_CONTENT_KEYS = [
  "copy",
  "headline",
  "projectTitle",
  "heroGreeting",
  "positioning",
];

export function assertNoContentKeys(obj: unknown, label: string) {
  const json = JSON.stringify(obj).toLowerCase();
  for (const key of FORBIDDEN_CONTENT_KEYS) {
    if (json.includes(`"${key}"`)) {
      throw new Error(`${label} must not contain content key: ${key}`);
    }
  }
}

function parseHex(hex: string): [number, number, number] | null {
  const normalized = hex.trim().replace("#", "");
  if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(normalized)) {
    return null;
  }
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relativeLuminance(r: number, g: number, b: number): number {
  const transform = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return (
    0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b)
  );
}

export function contrastRatio(foreground: string, background: string): number {
  const fg = parseHex(foreground);
  const bg = parseHex(background);
  if (!fg || !bg) {
    return 0;
  }
  const l1 = relativeLuminance(...fg);
  const l2 = relativeLuminance(...bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function validateWeeklyOutputs(payload: {
  creativeDirection: CreativeDirection;
  theme: Theme;
  interaction: InteractionSystem;
}) {
  creativeDirectionSchema.parse(payload.creativeDirection);
  themeSchema.parse(payload.theme);
  interactionSystemSchema.parse(payload.interaction);

  const { creativeDirection: cd, theme, interaction } = payload;

  if (cd.week !== theme.week || cd.week !== interaction.week) {
    throw new Error("week mismatch across generated files");
  }
  if (cd.year !== theme.year || cd.year !== interaction.year) {
    throw new Error("year mismatch across generated files");
  }

  assertNoContentKeys(cd, "creative-direction.json");
  assertNoContentKeys(theme, "theme.json");
  assertNoContentKeys(interaction, "interaction-system.json");

  const fgBg = contrastRatio(theme.foreground, theme.background);
  if (fgBg < 4.5) {
    throw new Error(
      `foreground/background contrast ${fgBg.toFixed(2)} below WCAG AA (4.5)`,
    );
  }

  const accentBg = contrastRatio(theme.accent, theme.background);
  if (accentBg < 3) {
    throw new Error(
      `accent/background contrast ${accentBg.toFixed(2)} below 3:1 for UI accents`,
    );
  }

  if (
    interaction.scrollBehavior === "snap-sections" &&
    interaction.motionIntensity === "expressive"
  ) {
    throw new Error(
      "snap-sections + expressive motion is not portfolio-safe; reduce motion intensity",
    );
  }
}
