import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

/** Project card — shared between Home, /projects, and detail-page navigation. */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-ats-text/10 bg-ats-bg-light transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg dark:border-ats-bg-light/10 dark:bg-ats-bg-dark">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View case study: ${project.title}`}
        className="block aspect-[16/10]"
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-ats-secondary to-ats-primary">
          <div
            aria-hidden
            className="absolute -right-8 -top-8 h-3/4 w-3/4 rounded-full bg-ats-accent/20 blur-2xl transition-transform duration-500 motion-safe:group-hover:scale-110"
          />
          <span
            aria-hidden
            className="text-sm font-semibold uppercase tracking-widest text-ats-bg-light/70"
          >
            {project.category}
          </span>
          <span
            aria-hidden
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-ats-bg-light/10 text-ats-bg-light/80 transition-colors group-hover:bg-ats-brand group-hover:text-white"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs uppercase tracking-widest text-ats-text-muted">
          {project.category} · {project.year}
        </p>
        <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-ats-text-muted">{project.summary}</p>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ats-brand hover:underline"
        >
          View case study <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
