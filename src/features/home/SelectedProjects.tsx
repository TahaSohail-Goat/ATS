import { Section } from '../../components/Section';
import { ProjectCard } from '../../components/ProjectCard';
import { ArrowLink } from '../../components/ArrowLink';
import { Reveal } from '../../components/motion/Reveal';
import { Stagger } from '../../components/motion/Stagger';
import { projects } from '../../data/projects';

/** Home selected projects, 3 featured case studies, linked to /projects. */
export function SelectedProjects() {
  return (
    <Section
      eyebrow="Selected Work"
      title="Projects we are"
      titleAccent="proud of"
      description="A few recent engagements, each one a partnership, not a hand-off."
      action={<ArrowLink href="/projects">View all projects</ArrowLink>}
      tone="raised"
    >
      <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <Reveal key={project.slug} asChild as="div" className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </Stagger>
    </Section>
  );
}
