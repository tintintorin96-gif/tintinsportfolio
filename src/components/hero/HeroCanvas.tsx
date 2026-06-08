import type { ReactElement } from "react";
import type { Theme } from "@/lib/theme";
import { getTheme } from "@/lib/theme";
import { BrutalistHero } from "@/components/hero/variants/brutalist";
import { HierarchyLedHero } from "@/components/hero/variants/hierarchy-led";
import { CinematicHero } from "@/components/hero/variants/cinematic";
import { LuxuryTechHero } from "@/components/hero/variants/luxury-tech";
import { ExperimentalHero } from "@/components/hero/variants/experimental";

const VARIANTS = {
  brutalist: BrutalistHero,
  "hierarchy-led": HierarchyLedHero,
  cinematic: CinematicHero,
  "luxury-tech": LuxuryTechHero,
  experimental: ExperimentalHero,
} as const satisfies Record<Theme["heroVariant"], () => ReactElement>;

export function HeroCanvas({ theme = getTheme() }: { theme?: Theme }) {
  const Variant = VARIANTS[theme.heroVariant] ?? BrutalistHero;
  return <Variant />;
}
