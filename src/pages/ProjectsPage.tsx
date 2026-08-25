import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge, Button } from '@ats/ui';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { CtaSection } from '../components/CtaSection';
import { Reveal } from '../components/motion/Reveal';
import { projects } from '../data/projects';

const PREVIEW_COUNT = 3;

export function ProjectsPage() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, PREVIEW_COUNT);
  const hasMore = projects.length > PREVIEW_COUNT;

  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="Illustrative work for"
        titleAccent="future case studies"
        description="These concepts show how ATS approaches complex software problems. Approved case studies will replace them as they become available."
      >
        <Reveal delay={0.16} className="mt-8">
          <Badge tone="accent" dot>
            Concepts, not client claims
          </Badge>
        </Reveal>
      </PageHero>

      <Section space="loose">
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
