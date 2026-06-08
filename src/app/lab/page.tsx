import type { Metadata } from "next";
import Link from "next/link";
import { formatWeekLabel, getCreativeDirection } from "@/lib/creative-direction";
import { getTheme } from "@/lib/theme";
import { getCreativeDirectionArchiveEntries } from "@/lib/theme-archive";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Weekly creative direction experiments and emerging visual language archive.",
};

export default function LabPage() {
  const direction = getCreativeDirection();
  const theme = getTheme();
  const archive = getCreativeDirectionArchiveEntries();
  const weekLabel = formatWeekLabel(direction.week, direction.year);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Lab</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        A living experience layer for this portfolio — one weekly creative direction,
        generated from emerging experience design signals and applied through a
        hero-led token and interaction system.
      </p>

      <Card className="surface-card mt-10 border-0">
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            <Badge>This week</Badge>
            <Badge variant="outline">{weekLabel}</Badge>
            <Badge variant="outline">{direction.dateRange}</Badge>
          </div>
          <CardTitle className="text-2xl">{direction.creativeDirectionName}</CardTitle>
          <CardDescription>{direction.oneSentenceConcept}</CardDescription>
        </CardHeader>
      </Card>

      <div className="mt-8">
        <ButtonLink
          href="/creative-direction"
          label="View weekly creative direction in detail"
        />
      </div>

      <h2 className="mt-16 text-2xl font-semibold">Weekly direction archive</h2>
      {archive.length === 0 ? (
        <p className="mt-4 text-muted-foreground">
          Archive entries appear in{" "}
          <code className="text-sm">creative-direction/archive/</code>; research
          notes in{" "}
          <code className="text-sm">obsidian/design-trends/</code> after the
          weekly GitHub Action runs.
        </p>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {archive.map((entry) => (
            <li key={entry.weekLabel}>
              <Card className="h-full border-border/80">
                <CardHeader>
                  <CardTitle className="text-lg">{entry.title}</CardTitle>
                  <CardDescription>
                    {entry.weekLabel}
                    {entry.dateRange ? ` · ${entry.dateRange}` : ""}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground">{entry.summary}</p>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-sm text-muted-foreground">
        Current theme tokens: {theme.themeName} ({theme.heroVariant} hero variant)
      </p>
    </div>
  );
}

function ButtonLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
    >
      {label}
    </Link>
  );
}
