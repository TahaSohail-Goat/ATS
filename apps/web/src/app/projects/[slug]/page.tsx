import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@ats/ui';
import { Container } from '../../../components/Container';
import { projects } from '../../../data/projects';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  if (!next) notFound();

  return (
    <>
      <Container className="py-12 sm:py-16">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-ats-text-muted transition-colors hover:text-ats-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> All projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-ats-brand">
            {project.category} · {project.year}
          </p>
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-ats-text-muted">{project.summary}</p>
        </header>
      </Container>

      <Container className="pb-20 sm:pb-24">
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-ats-text/10 bg-ats-bg-light p-8 dark:border-ats-bg-light/10 dark:bg-ats-bg-dark">
            <h2 className="text-lg font-semibold">The problem</h2>
            <p className="mt-3 text-ats-text-muted">{project.problem}</p>
          </div>
          <div className="rounded-lg border border-ats-text/10 bg-ats-bg-light p-8 dark:border-ats-bg-light/10 dark:bg-ats-bg-dark">
            <h2 className="text-lg font-semibold">The solution</h2>
            <p className="mt-3 text-ats-text-muted">{project.solution}</p>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold">Key features</h2>
            <ul className="mt-4 space-y-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-ats-text-muted">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ats-brand"
                    aria-hidden
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Technology</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-ats-text/10 px-3 py-1 text-sm text-ats-text-muted dark:border-ats-bg-light/10"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Results</h2>
            <ul className="mt-4 space-y-2">
              {project.results.map((result) => (
                <li key={result} className="flex items-start gap-2 text-sm text-ats-text-muted">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ats-accent"
                    aria-hidden
                  />
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-ats-text/10 pt-8 dark:border-ats-bg-light/10 sm:flex-row sm:items-center">
          <p className="text-sm text-ats-text-muted">
            Next case study:{' '}
            <Link
              href={`/projects/${next.slug}`}
              className="inline-flex items-center gap-1.5 font-semibold text-ats-brand hover:underline"
            >
              {next.title} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
          <Button asChild>
            <Link href="/contact">Start a Project</Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
