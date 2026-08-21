import { Badge } from '@ats/ui';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';
import { CtaSection } from '../components/CtaSection';
import { Reveal } from '../components/motion/Reveal';
import { Stagger } from '../components/motion/Stagger';
import { projects } from '../data/projects';

export function ProjectsPage() {
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
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Reveal key={project.slug} asChild as="div" className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </Stagger>
      </Section>

      <CtaSection
        title="Want to see the"
        titleAccent="full case study?"
        description="Talk to us about your project — we'll share relevant work in detail and honest technical advice."
      />
    </>
  );
}
