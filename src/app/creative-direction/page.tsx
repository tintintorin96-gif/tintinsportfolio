import type { Metadata } from "next";
import Link from "next/link";
import {
  formatWeekLabel,
  getCreativeDirection,
} from "@/lib/creative-direction";
import {
  getInteractionSystem,
  interactionSystemToCssVariables,
} from "@/lib/interaction-system";
import { getTheme, themeToCssVariables } from "@/lib/theme";
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

export const metadata: Metadata = {
  title: "Weekly Creative Direction",
  description:
    "Weekly experience direction and design tokens from the AI Creative Direction Engine.",
};

export default function CreativeDirectionPage() {
  const direction = getCreativeDirection();
  const theme = getTheme();
  const interaction = getInteractionSystem();
  const tokens = {
    ...themeToCssVariables(theme),
    ...interactionSystemToCssVariables(interaction),
  };
  const weekLabel = formatWeekLabel(direction.week, direction.year);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/lab"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Lab
      </Link>

      <p className="mt-8 text-sm font-medium uppercase tracking-widest text-accent">
        Weekly Creative Direction
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
        {direction.creativeDirectionName}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {weekLabel} · {direction.dateRange}
      </p>
      <p className="mt-6 text-lg leading-relaxed">
        {direction.oneSentenceConcept}
      </p>
      <p className="mt-2 text-muted-foreground">
        <span className="font-medium text-foreground">Experience mood:</span>{" "}
        {direction.experienceMood}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Updated weekly from research in obsidian/design-trends/. The hero carries
        the experimental treatment; navigation and content stay stable.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="secondary">{theme.heroVariant} hero</Badge>
        <Badge variant="secondary">{theme.typography.headingMood} headings</Badge>
        <Badge variant="outline">{interaction.motionIntensity} interaction</Badge>
      </div>

      <Card className="surface-card mt-10 border-0">
        <CardHeader>
          <CardTitle>Hero concept</CardTitle>
          <CardDescription>{direction.heroConcept}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Visual language:</span>{" "}
            {direction.visualLanguage}
          </p>
          <p>
            <span className="font-medium text-foreground">Color:</span>{" "}
            {direction.colorDirection}
          </p>
          <p>
            <span className="font-medium text-foreground">Interaction:</span>{" "}
            {direction.interactionLanguage}
          </p>
          <p>
            <span className="font-medium text-foreground">Storytelling:</span>{" "}
            {direction.storytellingApproach}
          </p>
          <p>
            <span className="font-medium text-foreground">Motion:</span>{" "}
            {direction.motionLanguage}
          </p>
        </CardContent>
      </Card>

      <Card className="surface-card mt-8 border-0">
        <CardHeader>
          <CardTitle>Interaction system</CardTitle>
          <CardDescription>
            Cursor, scroll, hover, and transition behavior for this week.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Hero:</span>{" "}
            {interaction.heroInteraction}
          </p>
          <p>
            <span className="font-medium text-foreground">Scroll:</span>{" "}
            {interaction.scrollBehavior} ·{" "}
            <span className="font-medium text-foreground">Hover:</span>{" "}
            {interaction.hoverBehavior}
          </p>
          <p>
            <span className="font-medium text-foreground">Reduced motion:</span>{" "}
            {interaction.reducedMotionFallback}
          </p>
        </CardContent>
      </Card>

      <Card className="surface-card mt-8 border-0">
        <CardHeader>
          <CardTitle>Token map</CardTitle>
          <CardDescription>
            Injected site-wide via CSS variables each week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3 text-sm">
            {Object.entries(tokens).map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-[1fr_auto] gap-4 border-b border-border/60 py-2 last:border-0"
              >
                <dt className="font-mono text-muted-foreground">{key}</dt>
                <dd className="font-mono text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <div className="mt-8 flex gap-4">
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          Back home
        </Link>
        <Link href="/lab" className={cn(buttonVariants())}>
          Direction archive
        </Link>
      </div>
    </div>
  );
}
