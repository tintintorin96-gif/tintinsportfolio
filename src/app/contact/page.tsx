import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
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
  title: "Get in touch",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        Get in touch
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        For senior UX, service design, accessibility audits, or design system
        engagements — reach out directly.
      </p>

      <Card className="surface-card mt-10 border-0">
        <CardHeader>
          <CardTitle>Email</CardTitle>
          <CardDescription>Typically responds within a few business days.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <a
            href={`mailto:${profile.email}`}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            {profile.email}
          </a>
          <p className="text-sm text-muted-foreground">{profile.location}</p>
        </CardContent>
      </Card>

      <div className="mt-8">
        <a
          href={profile.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          LinkedIn
        </a>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Prefer to browse work first?{" "}
        <Link href="/work" className="text-accent hover:underline">
          View selected projects
        </Link>
        .
      </p>
    </div>
  );
}
