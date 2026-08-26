import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { Badge, Button } from '@ast/ui';
import { Container } from '../components/Container';
import { Aurora } from '../components/Aurora';
import { Section } from '../components/Section';
import { CtaSection } from '../components/CtaSection';
import { ArrowLink } from '../components/ArrowLink';
import { Reveal } from '../components/motion/Reveal';
import { Stagger } from '../components/motion/Stagger';
import { RevealText } from '../components/motion/RevealText';
import { SpotlightCard } from '../components/motion/SpotlightCard';
import { projects } from '../data/projects';
import { getTechIcon } from '../data/techIcons';
import { getDriveEmbedUrl } from '../lib/video';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const videoEmbedUrl = project.videoUrl ? getDriveEmbedUrl(project.videoUrl) : null;

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-ast-line pb-16 pt-10 sm:pb-24 sm:pt-14">
        <Aurora variant="quiet" />
        <Container className="relative">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ast-ink-muted transition-colors hover:text-ast-brand"
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
              <span className="font-mono text-xs text-ast-ink-muted">{project.year}</span>
            </div>

            <RevealText
              as="h1"
              immediate
              className="text-display-lg font-semibold"
              parts={[{ text: project.title }]}
            />

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-ast-ink-muted">
                {project.summary}
              </p>
            </Reveal>

            {project.demoUrl && (
              <Reveal delay={0.28} className="mt-8">
                <Button asChild variant="primary" size="lg">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    View live demo
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </Button>
              </Reveal>
            )}
          </header>

          {videoEmbedUrl ? (
            <Reveal delay={0.32} className="mt-12">
              <div className="overflow-hidden rounded-4xl border border-ast-line shadow-ast-lifted">
                <iframe
                  src={videoEmbedUrl}
                  title={`${project.title} demo video`}
                  className="aspect-video w-full"
                  allow="autoplay"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ast-ink-muted transition-colors hover:text-ast-brand"
              >
                Open video in Google Drive
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </Reveal>
          ) : (
            project.image && (
              <Reveal delay={0.32} className="mt-12">
                <div className="overflow-hidden rounded-4xl border border-ast-line shadow-ast-lifted">
                  <img
                    src={project.image}
                    alt={project.imageAlt ?? ''}
                    className="aspect-[21/9] w-full object-cover"
                  />
                </div>
              </Reveal>
            )
          )}
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
                className="ast-ring-gradient flex h-full flex-col rounded-4xl border border-ast-line bg-ast-surface/60 p-8 sm:p-11"
              >
                <h2 className="text-2xl font-semibold tracking-tighter2">{block.title}</h2>
                <p className="mt-4 leading-relaxed text-ast-ink-muted">{block.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </Stagger>
      </Section>

      <Section space="base" tone="raised">
        <div className="grid gap-12 lg:grid-cols-3">
          <Reveal>
            <h2 className="text-eyebrow font-semibold uppercase text-ast-ink-muted">
              Key features
            </h2>
            <ul className="mt-6 space-y-4">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ast-brand/30 bg-ast-brand/10 text-ast-brand"
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm leading-relaxed text-ast-ink">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="text-eyebrow font-semibold uppercase text-ast-ink-muted">Technology</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => {
                const { Icon, color } = getTechIcon(tech);
                return (
                  <li
                    key={tech}
                    className="flex items-center gap-2 rounded-full border border-ast-line bg-ast-surface/60 px-3 py-1.5 text-xs font-medium text-ast-ink-muted"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} aria-hidden />
                    {tech}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="text-eyebrow font-semibold uppercase text-ast-ink-muted">
              {project.status === 'illustrative' ? 'Concept highlights' : 'Results'}
            </h2>
            <ul className="mt-6 space-y-4">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ast-accent/30 bg-ast-accent/10 text-ast-accent"
                  >
                    <Sparkles className="h-3 w-3" />
                  </span>
                  <span className="text-sm leading-relaxed text-ast-ink">{highlight}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {next && (
        <Section space="tight">
          <Reveal className="flex flex-col gap-4 border-t border-ast-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-eyebrow font-semibold uppercase text-ast-ink-muted">
                Next project
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tighter2">{next.title}</p>
            </div>
            <ArrowLink href={`/projects/${next.slug}`}>Read next case study</ArrowLink>
          </Reveal>
        </Section>
      )}

      <CtaSection
        title="Building something"
        titleAccent="like this?"
        description="Tell us where you are and we will tell you honestly what it takes to get there."
      />
    </>
  );
}
