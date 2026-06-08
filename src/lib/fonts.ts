import { Space_Grotesk, Syne } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
});

/** Owner baseline: minimal + bold (never editorial serif). */
const fontMoodMap = {
  minimal: null,
  bold: spaceGrotesk,
  experimental: syne,
} as const;

type FontMood = keyof typeof fontMoodMap;

function normalizeFontMood(fontMood: string): FontMood {
  const key = fontMood.toLowerCase();
  if (key in fontMoodMap) return key as FontMood;
  if (key.includes("editorial") || key.includes("warm")) return "bold";
  return "bold";
}

export function getFontClassForMood(fontMood: string): string | undefined {
  const mood = normalizeFontMood(fontMood);
  const font = fontMoodMap[mood];
  return font?.variable;
}
