import fs from "node:fs";
import path from "node:path";

export type CreativeDirectionArchiveEntry = {
  weekLabel: string;
  week: number;
  year: number;
  title: string;
  summary: string;
  dateRange: string;
};

const ARCHIVE_DIR = path.join(process.cwd(), "creative-direction/archive");

function parseWeekLabel(filename: string): { week: number; year: number } | null {
  const match = filename.match(/^(\d{4})-W(\d{2})\.md$/);
  if (!match) return null;
  return { year: Number.parseInt(match[1], 10), week: Number.parseInt(match[2], 10) };
}

export function getCreativeDirectionArchiveEntries(): CreativeDirectionArchiveEntry[] {
  if (!fs.existsSync(ARCHIVE_DIR)) {
    return [];
  }

  return fs
    .readdirSync(ARCHIVE_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const weekLabel = file.replace(".md", "");
      const parsed = parseWeekLabel(file);
      const content = fs.readFileSync(path.join(ARCHIVE_DIR, file), "utf8");
      const titleMatch = content.match(/## Direction\n(.+)/);
      const summaryMatch = content.match(/## Concept\n([\s\S]*?)\n\n##/);
      const rangeMatch = content.match(/\*\*Range:\*\* (.+)/);

      return {
        weekLabel,
        week: parsed?.week ?? 0,
        year: parsed?.year ?? 0,
        title: titleMatch?.[1]?.trim() ?? `Week ${weekLabel}`,
        summary:
          summaryMatch?.[1]?.trim() ??
          "Weekly AI creative direction applied through design tokens.",
        dateRange: rangeMatch?.[1]?.trim() ?? "",
      };
    })
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.week - a.week;
    });
}
