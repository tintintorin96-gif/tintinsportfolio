import theme from "@/generated/theme.json";
import type { Theme as ThemeType } from "@/lib/schemas/creative-direction";

export type Theme = ThemeType;

export function getTheme(): Theme {
  return theme as Theme;
}

function radiusToRem(radius: string): string {
  if (radius.endsWith("px")) {
    const px = Number.parseFloat(radius);
    if (!Number.isNaN(px)) {
      return `${px / 16}rem`;
    }
  }
  return radius;
}

export function themeToCssVariables(t: Theme = getTheme()): Record<string, string> {
  const radius = radiusToRem(t.radius);

  return {
    "--background": t.background,
    "--foreground": t.foreground,
    "--card": t.background,
    "--card-foreground": t.foreground,
    "--popover": t.background,
    "--popover-foreground": t.foreground,
    "--primary": t.foreground,
    "--primary-foreground": t.background,
    "--secondary": t.muted,
    "--secondary-foreground": t.foreground,
    "--muted": t.muted,
    "--muted-foreground": `color-mix(in srgb, ${t.foreground} 62%, ${t.background})`,
    "--accent": t.accent,
    "--accent-foreground": t.background,
    "--border": t.border,
    "--input": t.border,
    "--ring": t.accent,
    "--radius": radius,
    "--shadow-theme": t.shadow,
    "--motion-theme": t.motion.intensity,
    "--motion-style": t.motion.style,
    "--font-mood": t.typography.headingMood,
    "--font-body-mood": t.typography.bodyMood,
    "--typography-scale": t.typography.scale,
    "--hero-variant": t.heroVariant,
    "--hero-layout": t.hero.layout,
    "--hero-visual-effect": t.hero.visualEffect,
    "--hero-interaction": t.hero.interaction,
    "--spacing-section": t.spacing.section,
    "--spacing-grid": t.spacing.grid,
    "--spacing-hero-padding": t.spacing.heroPadding,
    "--page-cards": t.pageTreatment.cards,
    "--page-sections": t.pageTreatment.sections,
    "--page-navigation": t.pageTreatment.navigation,
  };
}
