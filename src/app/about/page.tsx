import type { Metadata } from "next";
import { profile } from "@/data/profile";
import {
  designPrinciples,
  experienceHighlights,
  methodGroups,
  skills,
} from "@/data/experience";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description: profile.bio.slice(0, 160),
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
        About
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{profile.title}</p>

      <div className="prose prose-neutral mt-10 max-w-none space-y-4 text-muted-foreground">
        {profile.bio.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <p className="mt-8 text-sm font-medium text-accent">{profile.certification}</p>

      <Separator className="my-12" />

      <h2 className="text-xl font-semibold">Experience highlights</h2>
      <ul className="mt-6 space-y-6">
        {experienceHighlights.map((item) => (
          <li key={item.title} className="surface-card rounded-[var(--radius)] p-5">
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-accent">{item.period}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </li>
        ))}
      </ul>

      <Separator className="my-12" />

      <h2 className="text-xl font-semibold">Skills</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-semibold">Methods</h2>
      <Accordion className="mt-4">
        {methodGroups.map((group) => (
          <AccordionItem key={group.name} value={group.name}>
            <AccordionTrigger>{group.name}</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-1 pl-5">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h2 className="mt-12 text-xl font-semibold">Principles</h2>
      <ul className="mt-6 space-y-4">
        {designPrinciples.map((p) => (
          <li key={p.title}>
            <p className="font-medium">{p.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
