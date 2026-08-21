import { Code2, BrainCircuit, Cloud, Lightbulb, type LucideIcon } from 'lucide-react';
import type { Service } from '../data/services';

const serviceIcons: Record<string, LucideIcon> = {
  'custom-software': Code2,
  'ai-solutions': BrainCircuit,
  'cloud-infrastructure': Cloud,
  'technology-consulting': Lightbulb,
};

interface ServiceCardProps {
  service: Service;
}

/** Service card — shared between the Home overview and the /services page. */
export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = serviceIcons[service.slug] ?? Code2;

  return (
    <article className="flex h-full flex-col rounded-lg border border-ats-text/10 bg-ats-bg-light p-6 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:border-ats-brand/40 motion-safe:hover:shadow-lg dark:border-ats-bg-light/10 dark:bg-ats-bg-dark">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-ats-brand/10 text-ats-brand">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="font-semibold">{service.title}</h3>
      <p className="mt-2 text-sm text-ats-text-muted">{service.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2 pt-2">
        {service.deliverables.map((item) => (
          <li
            key={item}
            className="rounded-full border border-ats-text/10 px-3 py-1 text-xs text-ats-text-muted dark:border-ats-bg-light/10"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
