import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { ProjectCard } from '../../components/ProjectCard';
import { projects } from '../../data/projects';

/** Home selected projects — 3 featured case studies, linked to /projects. */
export function SelectedProjects() {
  return (
    <Section
      eyebrow="Selected Work"
      title="Projects we are proud of"
      description="A few recent engagements — each one a partnership, not a hand-off."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ats-brand hover:underline"
        >
          View all projects <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Reveal>
    </Section>
  );
}
