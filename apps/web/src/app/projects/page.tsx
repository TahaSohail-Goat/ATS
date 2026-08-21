import type { Metadata } from 'next';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { ProjectCard } from '../../components/ProjectCard';
import { CtaSection } from '../../components/CtaSection';
import { projects } from '../../data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected software projects by ATS — case studies with the problems, solutions, and measurable results.',
};

export default function ProjectsPage() {
  return (
    <>
      <Section
        eyebrow="Selected Work"
        title="Projects with measurable results"
        description="Each engagement below shipped to production — here is what we built and what changed."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaSection
        title="Want to see the full case study?"
        description="Talk to us about your project — we'll share relevant work in detail and honest technical advice."
      />
    </>
  );
}
