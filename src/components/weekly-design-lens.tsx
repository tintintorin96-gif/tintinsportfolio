import Link from "next/link";
import {
  formatWeekLabel,
  getCreativeDirection,
} from "@/lib/creative-direction";
import { getInteractionSystem } from "@/lib/interaction-system";
import { getTheme } from "@/lib/theme";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WeeklyDesignLens() {
  const direction = getCreativeDirection();
  const theme = getTheme();
  const interaction = getInteractionSystem();
  const weekLabel = formatWeekLabel(direction.week, direction.year);

  const swatches = [
    { label: "Background", value: theme.background },
    { label: "Foreground", value: theme.foreground },
    { label: "Accent", value: theme.accent },
    { label: "Muted", value: theme.muted },
    { label: "Border", value: theme.border },
  ];

  return (
    <section className="cd-supporting-section border-y border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Weekly Creative Direction
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
              {direction.creativeDirectionName}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {direction.oneSentenceConcept}
            </p>
            <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
              Experience signals from the last 7 days → hero-led reinterpretation.
              Research lives in{" "}
              <code className="text-xs">obsidian/design-trends/</code>.
            </p>
          </div>
          <Link
            href="/creative-direction"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            View this week&apos;s direction
          </Link>
        </div>

        <Card className="surface-card border-0 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Experience system (live)</CardTitle>
            <CardDescription>
              {direction.experienceMood} · {direction.interactionLanguage} ·{" "}
              {direction.motionLanguage}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{weekLabel}</Badge>
              <Badge variant="outline">{direction.dateRange}</Badge>
              <Badge variant="outline">hero: {theme.heroVariant}</Badge>
              <Badge variant="outline">motion: {interaction.motionIntensity}</Badge>
              <Badge variant="outline">scroll: {interaction.scrollBehavior}</Badge>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {swatches.map((swatch) => (
                <li
                  key={swatch.label}
                  className="overflow-hidden rounded-[var(--radius)] border border-border"
                >
                  <div
                    className="h-16 w-full"
                    style={{ backgroundColor: swatch.value }}
                    aria-hidden
                  />
                  <div className="space-y-0.5 bg-background/60 px-3 py-2 text-xs">
                    <p className="font-medium">{swatch.label}</p>
                    <p className="font-mono text-muted-foreground">
                      {swatch.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
