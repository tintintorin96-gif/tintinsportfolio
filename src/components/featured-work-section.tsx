import Link from "next/link";
import { getFeaturedProjects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { getSectionRhythmClass, getWorkGridClass } from "@/lib/apply-creative-direction";
import { cn } from "@/lib/utils";

export function FeaturedWorkSection() {
  const featured = getFeaturedProjects();

  return (
    <section
      className={cn(
        "cd-supporting-section mx-auto max-w-6xl px-6",
        getSectionRhythmClass(),
      )}
    >
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Featured work
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Selected projects showing systems thinking, research depth, and
            measurable impact — public teasers only.
          </p>
        </div>
        <Link href="/work" className={cn(buttonVariants({ variant: "outline" }))}>
          View all work
        </Link>
      </div>
      <ul className={cn("grid md:grid-cols-2 cd-work-grid", getWorkGridClass())}>
        {featured.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
