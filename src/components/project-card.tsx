import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectMedia } from "@/components/project-media";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="surface-card cd-work-card h-full overflow-hidden border-0 transition-opacity hover:opacity-95">
      <Link href={`/work/${project.slug}`} className="block">
        <ProjectMedia
          src={project.images[0]}
          alt={`${project.title} preview`}
          className="aspect-[16/10] max-h-48 rounded-none border-0 border-b border-border object-contain object-center"
        />
      </Link>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{project.client}</Badge>
          <Badge variant="outline">{project.year}</Badge>
        </div>
        <CardTitle className="text-xl">
          <Link href={`/work/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription>{project.teaser}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{project.role}</p>
        <Link
          href={`/work/${project.slug}`}
          className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
        >
          View teaser →
        </Link>
      </CardContent>
    </Card>
  );
}
