import { getTheme, themeToCssVariables } from "@/lib/theme";
import {
  getInteractionSystem,
  interactionSystemToCssVariables,
} from "@/lib/interaction-system";

export function CreativeDirectionTheme() {
  const theme = getTheme();
  const interaction = getInteractionSystem();
  const vars = {
    ...themeToCssVariables(theme),
    ...interactionSystemToCssVariables(interaction),
  };
  const cssVars = Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n        ");

  const motionIntensity =
    interaction.motionIntensity === "none"
      ? theme.motion.intensity
      : interaction.motionIntensity;

  const motionStyles =
    motionIntensity === "expressive"
      ? `
      @media (prefers-reduced-motion: no-preference) {
        a, button { transition: color 200ms ease, background-color 200ms ease, border-color 200ms ease, transform 200ms ease; }
        .hero-canvas::after { animation: hero-accent-in 600ms ease forwards; }
      }
      @keyframes hero-accent-in {
        from { transform: scaleX(0); transform-origin: left; }
        to { transform: scaleX(1); }
      }`
      : motionIntensity === "subtle"
        ? `
      @media (prefers-reduced-motion: no-preference) {
        a, button { transition: color 150ms ease; }
        .hero-canvas::after { animation: hero-accent-in 400ms ease forwards; }
      }
      @keyframes hero-accent-in {
        from { transform: scaleX(0); transform-origin: left; }
        to { transform: scaleX(1); }
      }`
        : "";

  const hoverStyles =
    interaction.hoverBehavior === "depth-reveal"
      ? `
      @media (prefers-reduced-motion: no-preference) {
        .surface-card { transition: box-shadow 200ms ease, transform 200ms ease; }
        .surface-card:hover { transform: translateY(-2px); }
      }`
      : interaction.hoverBehavior === "scale-lift"
        ? `
      @media (prefers-reduced-motion: no-preference) {
        a:not([class*="button"]), button { transition: transform 150ms ease; }
        a:not([class*="button"]):hover, button:hover { transform: scale(1.02); }
      }`
        : "";

  const hideAccentRule =
    theme.heroVariant === "cinematic" || theme.hero.layout === "cinematic-band";

  return (
    <style>{`
      :root {
        ${cssVars}
      }

      html {
        scroll-behavior: ${
          interaction.scrollBehavior === "cinematic" ? "smooth" : "auto"
        };
      }

      body {
        background: var(--background);
        color: var(--foreground);
      }

      .surface-card {
        background: var(--background);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        box-shadow: var(--shadow-theme);
      }

      .text-accent {
        color: var(--accent);
      }

      .hero-canvas {
        position: relative;
      }

      ${
        hideAccentRule
          ? ""
          : `
      .hero-canvas::after {
        content: "";
        display: block;
        width: 3rem;
        height: 3px;
        margin-top: 1.5rem;
        background: var(--accent);
      }`
      }

      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        .surface-card:hover,
        a:hover,
        button:hover {
          transform: none !important;
        }
      }
      ${motionStyles}
      ${hoverStyles}
    `}</style>
  );
}

/** @deprecated Use CreativeDirectionTheme */
export { CreativeDirectionTheme as WeeklyCreativeDirectionTheme };
