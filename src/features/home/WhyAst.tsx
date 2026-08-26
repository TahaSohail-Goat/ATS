import { Eye, Handshake, Star, TrendingUp, type LucideIcon } from 'lucide-react';
import { Section } from '../../components/Section';
import { Reveal } from '../../components/motion/Reveal';
import { Stagger } from '../../components/motion/Stagger';
import { SpotlightCard } from '../../components/motion/SpotlightCard';
import { values } from '../../data/site';

const valueIcons: LucideIcon[] = [Star, Handshake, Eye, TrendingUp];

/**
 * Asymmetric bento spans, a 3-column grid filled as 2·1·1·2 so the four
 * values read as a composed layout rather than a row of identical boxes.
 */
const spans = ['lg:col-span-2', 'lg:col-span-1', 'lg:col-span-1', 'lg:col-span-2'];

/** Home "Why AST", the values that make the difference. */
export function WhyAst() {
  return (
    <Section
      eyebrow="Why AST"
      title="Built on principles,"
      titleAccent="not promises"
      description="The habits behind every engagement, the ones that decide whether software still works in three years."
    >
      <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {values.map((value, index) => {
          const Icon = valueIcons[index] ?? Star;
          const wide = spans[index] === 'lg:col-span-2';

          return (
            <Reveal
              key={value.title}
              asChild
              as="div"
              className={`h-full ${spans[index] ?? 'lg:col-span-1'}`}
            >
              <SpotlightCard
                as="article"
                className="ast-ring-gradient group flex h-full flex-col justify-between gap-8 rounded-4xl border border-ast-line bg-ast-surface/60 p-8 transition-[transform,border-color] duration-500 ease-ast-out hover:border-ast-brand/30 motion-safe:hover:-translate-y-1.5 sm:p-9"
              >
                <span
                  aria-hidden
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-ast-line bg-ast-surface-raised text-ast-accent"
                >
                  <span className="absolute inset-0 rounded-2xl bg-ast-brand-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-15" />
                  <Icon className="relative h-5 w-5" />
                </span>

                <div className={wide ? 'max-w-xl' : undefined}>
                  <h3 className="text-xl font-semibold tracking-tighter2 sm:text-2xl">
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ast-ink-muted">{value.description}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </Stagger>
    </Section>
  );
}
