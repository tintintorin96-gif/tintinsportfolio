import Link from "next/link";
import { profile } from "@/data/profile";

export function TeaserNotice() {
  return (
    <div
      className="rounded-[var(--radius)] border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
      role="note"
    >
      This page is a public teaser. Extended case study materials are available
      on request —{" "}
      <Link href="/contact" className="font-medium text-accent hover:underline">
        contact {profile.name.split(" ")[0]}
      </Link>
      .
    </div>
  );
}
