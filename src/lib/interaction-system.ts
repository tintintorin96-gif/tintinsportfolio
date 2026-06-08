import interactionSystem from "@/generated/interaction-system.json";
import type { InteractionSystem as InteractionSystemType } from "@/lib/schemas/creative-direction";

export type InteractionSystem = InteractionSystemType;

export function getInteractionSystem(): InteractionSystem {
  return interactionSystem as InteractionSystem;
}

export function interactionSystemToCssVariables(
  i: InteractionSystem = getInteractionSystem(),
): Record<string, string> {
  return {
    "--cursor-treatment": i.cursorTreatment,
    "--scroll-behavior": i.scrollBehavior,
    "--hover-behavior": i.hoverBehavior,
    "--page-transition": i.pageTransition,
    "--interaction-motion-intensity": i.motionIntensity,
    "--navigation-behavior": i.navigationBehavior,
    "--storytelling-style": i.storytellingStyle,
    "--hero-interaction-mode": i.heroInteraction,
  };
}
