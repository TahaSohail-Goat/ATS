import { Section } from '../../components/Section';
import { Reveal } from '../../components/motion/Reveal';
import { Stagger } from '../../components/motion/Stagger';
import { techGroups } from '../../data/site';

/** Home technology/expertise — the stack and skills behind the work. */
export function TechStack() {
  return (
    <Section
      eyebrow="Technology & Expertise"
      title="Tools we"
      titleAccent="trust"
      description="A deliberately small stack we know deeply, chosen for longevity and hiring pool, not novelty."
    >
      <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {techGroups.map((group) => (
          <Reveal key={group.label} asChild as="div">
            <div>
              <h3 className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-ast-ink-muted">
                <span aria-hidden className="h-px w-6 bg-ast-brand-gradient" />
                {group.label}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-3 text-[0.95rem] font-medium text-ast-ink transition-colors"
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-ast-line transition-colors duration-300 group-hover:bg-ast-accent"
                    />
                    <span className="transition-colors duration-300 group-hover:text-ast-brand">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </Stagger>
    </Section>
  );
}
