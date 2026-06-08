import { HeroContent } from "@/components/hero/hero-shared";

export function ExperimentalHero() {
  return (
    <section className="hero-canvas relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <HeroContent />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 20% 0%, var(--accent) 0%, transparent 55%)`,
        }}
        aria-hidden
      />
    </section>
  );
}
