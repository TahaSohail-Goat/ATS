import {
  BrainCircuit,
  Boxes,
  Cloud,
  Code2,
  Gamepad2,
  Globe,
  Palette,
  ShoppingCart,
  Smartphone,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { Service } from '../data/services';
import { SpotlightCard } from './motion/SpotlightCard';

const serviceIcons: Record<string, LucideIcon> = {
  'custom-software': Code2,
  'ai-solutions': BrainCircuit,
  'cloud-infrastructure': Cloud,
  'web-saas': Globe,
  'mobile-app': Smartphone,
  'ui-ux-design': Palette,
  ecommerce: ShoppingCart,
  automation: Workflow,
  'game-development': Gamepad2,
  'game-asset-creation': Boxes,
};

interface ServiceCardProps {
  service: Service;
  /** Displayed as a monospace index in the corner. */
  index?: number;
}

/** Service card — shared between the Home overview and the /services page. */
export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = serviceIcons[service.slug] ?? Code2;

  return (
    <SpotlightCard
      as="article"
      className="ats-ring-gradient group flex h-full flex-col rounded-4xl border border-ats-line bg-ats-surface/70 p-7 transition-[transform,border-color] duration-500 ease-ats-out hover:border-ats-brand/30 motion-safe:hover:-translate-y-1.5 sm:p-9"
    >
      {typeof index === 'number' && (
        <span
          aria-hidden
          className="absolute right-7 top-7 font-mono text-xs tabular-nums text-ats-ink-muted"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      )}

      <span
        aria-hidden
        className="relative mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-ats-line bg-ats-surface-raised text-ats-accent transition-transform duration-500 ease-ats-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-105"
      >
        <span className="absolute inset-0 rounded-2xl bg-ats-brand-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-15" />
        <Icon className="relative h-6 w-6" />
      </span>

      <h3 className="text-xl font-semibold tracking-tighter2 sm:text-2xl">{service.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-ats-ink-muted">{service.description}</p>

      <ul className="mt-7 flex flex-wrap gap-2 border-t border-ats-line pt-6">
        {service.deliverables.map((item) => (
          <li
            key={item}
            className="rounded-full border border-ats-line bg-ats-surface-raised/60 px-3 py-1.5 text-xs font-medium text-ats-ink-muted transition-colors duration-300 group-hover:border-ats-brand/20 group-hover:text-ats-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}
