import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Badge } from '@ats/ui';
import { Container } from '../../../components/Container';
import { Aurora } from '../../../components/Aurora';
import { Section } from '../../../components/Section';
import { CtaSection } from '../../../components/CtaSection';
import { ArrowLink } from '../../../components/ArrowLink';
import { Reveal } from '../../../components/motion/Reveal';
import { Stagger } from '../../../components/motion/Stagger';
import { RevealText } from '../../../components/motion/RevealText';
import { SpotlightCard } from '../../../components/motion/SpotlightCard';
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
    alternates: { canonical: `/projects/${project.slug}` },
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
      <section className="relative isolate overflow-hidden border-b border-ats-line pb-16 pt-10 sm:pb-24 sm:pt-14">
        <Aurora variant="quiet" />
        <Container className="relative">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ats-ink-muted transition-colors hover:text-ats-brand"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden
            />
            All projects
          </Link>

          <header className="mt-10 max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge tone="accent" dot>
                {project.status === 'illustrative' ? 'Illustrative concept' : 'Case study'}
              </Badge>
              <Badge>{project.category}</Badge>
              <span className="font-mono text-xs text-ats-ink-muted">{project.year}</span>
            </div>

            <RevealText
              as="h1"
              immediate
              className="text-display-lg font-semibold"
              parts={[{ text: project.title }]}
            />

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-ats-ink-muted">
                {project.summary}
              </p>
            </Reveal>
          </header>
        </Container>
      </section>

      <Section space="base">
        <Stagger className="grid gap-5 lg:grid-cols-2">
          {[
            { title: 'The problem', text: project.problem },
            { title: 'The solution', text: project.solution },
          ].map((block) => (
            <Reveal key={block.title} asChild as="div" className="h-full">
              <SpotlightCard
                as="article"
                className="ats-ring-gradient flex h-full flex-col rounded-4xl border border-ats-line bg-ats-surface/60 p-8 sm:p-11"
              >
                <h2 className="text-2xl font-semibold tracking-tighter2">{block.title}</h2>
                <p className="mt-4 leading-relaxed text-ats-ink-muted">{block.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </Stagger>
      </Section>

      <Section space="base" tone="raised">
        <div className="grid gap-12 lg:grid-cols-3">
          <Reveal>
            <h2 className="text-eyebrow font-semibold uppercase text-ats-ink-muted">
              Key features
            </h2>
            <ul className="mt-6 space-y-4">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ats-brand/30 bg-ats-brand/10 text-ats-brand"
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm leading-relaxed text-ats-ink">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="text-eyebrow font-semibold uppercase text-ats-ink-muted">Technology</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-ats-line bg-ats-surface/60 px-3 py-1.5 text-xs font-medium text-ats-ink-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="text-eyebrow font-semibold uppercase text-ats-ink-muted">
              {project.status === 'illustrative' ? 'Concept highlights' : 'Results'}
            </h2>
            <ul className="mt-6 space-y-4">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ats-accent/30 bg-ats-accent/10 text-ats-accent"
                  >
                    <Sparkles className="h-3 w-3" />
                  </span>
                  <span className="text-sm leading-relaxed text-ats-ink">{highlight}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section space="tight">
        <Reveal className="flex flex-col gap-4 border-t border-ats-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-eyebrow font-semibold uppercase text-ats-ink-muted">Next project</p>
            <p className="mt-2 text-xl font-semibold tracking-tighter2">{next.title}</p>
          </div>
          <ArrowLink href={`/projects/${next.slug}`}>Read next case study</ArrowLink>
        </Reveal>
      </Section>

      <CtaSection
        title="Building something"
        titleAccent="like this?"
        description="Tell us where you are and we will tell you honestly what it takes to get there."
      />
    </>
  );
}
