import { getCreativeDirection } from "@/lib/creative-direction";
import { getInteractionSystem } from "@/lib/interaction-system";
import { getTheme } from "@/lib/theme";

export function getHtmlCreativeDirectionAttributes(): Record<string, string> {
  const theme = getTheme();
  const interaction = getInteractionSystem();
  const direction = getCreativeDirection();

  return {
    "data-hero-variant": theme.heroVariant,
    "data-hero-layout": theme.hero.layout,
    "data-page-cards": theme.pageTreatment.cards,
    "data-page-sections": theme.pageTreatment.sections,
    "data-page-navigation": theme.pageTreatment.navigation,
    "data-spacing-section": theme.spacing.section,
    "data-hover-behavior": interaction.hoverBehavior,
    "data-storytelling-style": interaction.storytellingStyle,
    "data-creative-direction": direction.creativeDirectionName,
  };
}

export function getSectionRhythmClass(): string {
  const spacing = getTheme().spacing.section;
  if (spacing === "airy") return "cd-section-airy";
  if (spacing === "tight") return "cd-section-tight";
  return "cd-section-balanced";
}

export function getWorkGridClass(): string {
  const grid = getTheme().spacing.grid;
  return grid === "dense" ? "cd-work-grid-dense" : "cd-work-grid-comfortable";
}
