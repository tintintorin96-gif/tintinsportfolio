import { designPrinciples, skills } from "@/data/experience";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function HowIWorkSection() {
  return (
    <section className="cd-supporting-section border-t border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          How I work
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A blend of research, facilitation, systems thinking, and accessible
          craft — tuned for complex B2B and public-sector environments.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {skills.slice(0, 10).map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>

        <Accordion className="mt-10 w-full">
          {designPrinciples.map((principle) => (
            <AccordionItem key={principle.title} value={principle.title}>
              <AccordionTrigger>{principle.title}</AccordionTrigger>
              <AccordionContent>{principle.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
