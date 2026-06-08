import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { getWorkGridClass } from "@/lib/apply-creative-direction";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected UX, service design, and accessibility projects.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Work</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Case studies published as public teasers. Full documentation is available
        on request.
      </p>
      <ul
        className={cn(
          "cd-work-grid mt-12 grid md:grid-cols-2",
          getWorkGridClass(),
        )}
      >
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
