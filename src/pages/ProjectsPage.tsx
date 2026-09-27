import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@ast/ui';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { CtaSection } from '../components/CtaSection';
import { Reveal } from '../components/motion/Reveal';
import { projects } from '../data/projects';
import { useSeo } from '../lib/seo';

const PREVIEW_COUNT = 3;

export function ProjectsPage() {
  useSeo({
    title: 'Projects',
    description:
      'Selected work from AST, including AI study tools, shelter management platforms, and disaster response systems.',
  });

  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, PREVIEW_COUNT);
  const hasMore = projects.length > PREVIEW_COUNT;

  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="Software we've"
        titleAccent="designed and built"
        description="A look at recent builds across AI tooling, platforms, and infrastructure."
        image="/stock/code-editor.jpg"
      />

      <Section space="loose" srTitle="All projects">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              immediate
              delay={Math.min(index * 0.06, 0.3)}
              className="h-full"
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {hasMore && (
          <Reveal className="mt-10 flex justify-center">
            <Button variant="outline" size="lg" onClick={() => setShowAll((prev) => !prev)}>
              {showAll ? 'Show fewer projects' : 'Show all projects'}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </Button>
          </Reveal>
        )}
      </Section>

      <CtaSection
        title="Want to see the"
        titleAccent="full case study?"
        description="Talk to us about your project, and we'll share relevant work in detail and honest technical advice."
      />
    </>
  );
}
