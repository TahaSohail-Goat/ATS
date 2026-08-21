import { Star, Handshake, Eye, TrendingUp, type LucideIcon } from 'lucide-react';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { values } from '../../data/site';

const valueIcons: LucideIcon[] = [Star, Handshake, Eye, TrendingUp];

/** Home "Why ATS" — the values that make the difference. */
export function WhyAts() {
  return (
    <Section eyebrow="Why ATS" title="Built on principles, not promises">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => {
          const Icon = valueIcons[index] ?? Star;
          return (
            <Reveal key={value.title} delay={index * 0.05}>
              <div className="flex h-full flex-col rounded-lg border border-ats-text/10 bg-ats-bg-light p-6 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg dark:border-ats-bg-light/10 dark:bg-ats-bg-dark">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-ats-accent/10 text-ats-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-ats-text-muted">{value.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
