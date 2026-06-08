import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { ProjectMediaGallery } from "@/components/project-media";
import { TeaserNotice } from "@/components/teaser-notice";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.teaser,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/work"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← All work
      </Link>

      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge>{project.client}</Badge>
          <Badge variant="outline">{project.year}</Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground">{project.teaser}</p>
        <p className="text-sm text-muted-foreground">{project.role}</p>
      </div>

      <div className="mt-8">
        <TeaserNotice />
      </div>

      <div className="mt-10">
        <ProjectMediaGallery
          images={project.images}
          alt={`${project.title} — ${project.client}`}
          priority
        />
      </div>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">Problem</h2>
        <p className="leading-relaxed text-muted-foreground">{project.problem}</p>
      </section>

      <Separator className="my-10" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Process</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          {project.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>

      <Separator className="my-10" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Outcome</h2>
        <p className="leading-relaxed text-muted-foreground">{project.outcome}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Tools</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <Badge key={tool} variant="secondary">
              {tool}
            </Badge>
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/contact" className={cn(buttonVariants())}>
          Request full case study
        </Link>
        <Link href="/work" className={cn(buttonVariants({ variant: "outline" }))}>
          Back to work
        </Link>
      </div>
    </article>
  );
}
