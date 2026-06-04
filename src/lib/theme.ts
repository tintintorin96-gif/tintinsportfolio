import theme from "@/generated/theme.json";

export type Theme = typeof theme;

export function getTheme(): Theme {
  return theme;
}

export function themeToCssVariables(
  t: Theme = getTheme(),
): Record<string, string> {
  return {
    "--background": t.background,
    "--foreground": t.foreground,
    "--accent": t.accent,
    "--muted": t.muted,
    "--border": t.border,
    "--radius": t.radius,
    "--shadow": t.shadow,
  };
}
