import Link from "next/link";
import { profile } from "@/data/profile";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactCta() {
  return (
    <section className="cd-supporting-section mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="surface-card rounded-[var(--radius)] px-8 py-12 text-center md:px-12">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Let&apos;s build something inclusive and impactful
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Open to senior UX, service design, and accessibility-led engagements in
          Stockholm and remote-friendly collaborations.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
            Get in touch
          </Link>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
