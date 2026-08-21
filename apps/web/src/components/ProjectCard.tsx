import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { Parallax } from './motion/Parallax';

interface ProjectCardProps {
  project: Project;
}

/** Project card — shared between Home, /projects, and detail-page navigation. */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-ats-line bg-ats-surface/70 transition-[transform,border-color,box-shadow] duration-500 ease-ats-out hover:border-ats-brand/30 hover:shadow-ats-lifted motion-safe:hover:-translate-y-1.5">
      {/* Whole card is one link: a single tab stop, one accessible name. */}
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-20 rounded-4xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ats-brand"
      >
        <span className="sr-only">{`View case study: ${project.title}`}</span>
      </Link>

      <div aria-hidden className="relative aspect-[16/10] overflow-hidden">
        <Parallax distance={40} className="absolute inset-0 scale-110">
          <div className="h-full w-full bg-gradient-to-br from-ats-secondary via-ats-primary to-ats-canvas" />
        </Parallax>
        <div className="ats-grid absolute inset-0 opacity-70" />
        <div className="absolute -right-10 -top-10 h-3/4 w-3/4 rounded-full bg-ats-accent/25 blur-3xl transition-transform duration-700 ease-ats-out motion-safe:group-hover:scale-125" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ats-surface to-transparent" />

        <span className="absolute left-6 top-6 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
          {project.category}
        </span>
        <span className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/85 backdrop-blur-sm transition-colors duration-300 group-hover:border-transparent group-hover:bg-ats-brand group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-7 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ats-ink-muted">
          {project.status === 'illustrative' ? 'Illustrative concept' : 'Case study'} ·{' '}
          {project.year}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tighter2 transition-colors duration-300 group-hover:text-ats-brand sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ats-ink-muted">{project.summary}</p>

        <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-ats-line pt-6">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-ats-line px-2.5 py-1 text-[0.7rem] font-medium text-ats-ink-muted"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[0.7rem] font-medium text-ats-ink-muted">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
