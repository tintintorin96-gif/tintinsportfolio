import theme from "@/generated/theme.json";

export function DailyTheme() {
  return (
    <style>{`
      :root {
        --background: ${theme.background};
        --foreground: ${theme.foreground};
        --accent: ${theme.accent};
        --muted: ${theme.muted};
        --border: ${theme.border};
        --radius: ${theme.radius};
        --shadow: ${theme.shadow};
      }

      body {
        background: var(--background);
        color: var(--foreground);
      }

      .accent {
        color: var(--accent);
      }

      .surface {
        background: color-mix(in srgb, var(--background), white 30%);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
      }

      @media (prefers-reduced-motion: reduce) {
        * {
          animation: none !important;
          transition: none !important;
        }
      }
    `}</style>
  );
}
