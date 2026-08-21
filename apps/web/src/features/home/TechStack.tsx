import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { techStack } from '../../data/site';

/** Home technology/expertise — the stack and skills behind the work. */
export function TechStack() {
  return (
    <Section eyebrow="Technology & Expertise" title="Tools we trust">
      <Reveal>
        <ul className="flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-ats-text/10 bg-ats-bg-light px-4 py-2 text-sm font-medium text-ats-text-muted transition-colors hover:border-ats-brand/40 hover:text-ats-brand dark:border-ats-bg-light/10 dark:bg-ats-bg-dark"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
