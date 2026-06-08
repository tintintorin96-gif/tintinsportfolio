import Link from "next/link";
import { profile } from "@/data/profile";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function HeroContent({ className }: { className?: string }) {
  return (
    <div className={cn("hero-canvas-inner", className)}>
      <Badge variant="secondary" className="mb-6 w-fit">
        {profile.location}
      </Badge>
      <h1 className="max-w-3xl font-[family-name:var(--font-display,var(--font-sans))] text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
        {profile.heroGreeting}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
        {profile.title}
      </p>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
        {profile.positioning}
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/work" className={cn(buttonVariants({ size: "lg" }))}>
          View work
        </Link>
        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
