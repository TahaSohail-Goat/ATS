import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BrainCircuit,
  Boxes,
  Cloud,
  Gamepad2,
  Globe,
  Laptop,
  Palette,
  ShoppingCart,
  Smartphone,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@ast/ui';
import type { Service } from '../data/services';
import { SpotlightCard } from './motion/SpotlightCard';

const serviceIcons: Record<string, LucideIcon> = {
  'custom-software': Laptop,
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
}

/**
 * Service card, shared between the Home overview and the /services page.
 * Follows the active theme. The title and tags sit below the photo, not over
 * it: the photos carry their own lettering and bright areas, which an overlay
 * collides with and can push below AA contrast.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = serviceIcons[service.slug] ?? Laptop;

  return (
    <SpotlightCard
      as="article"
      className="group flex h-full flex-col rounded-4xl border border-ast-line bg-ast-surface p-3 text-ast-ink shadow-ast-card transition-[transform,border-color] duration-500 ease-ast-out hover:border-ast-brand/30 motion-safe:hover:-translate-y-1.5"
    >
      {/* Header: a photo zone (like the other photo treatments across the
          site) holding the service's photo. `bg-ast-primary` is a theme
          constant, so no `dark` scoping is needed here. */}
      <div className="relative isolate aspect-[16/10] overflow-hidden rounded-3xl bg-ast-primary">
        <img
          src={service.image}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-ast-out motion-safe:group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-ast-brand-gradient opacity-15 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-25"
        />

        <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur-sm">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-4 sm:px-4">
        <h3 className="text-xl font-bold tracking-tighter2 text-ast-ink">{service.title}</h3>
        <p className="mt-2 text-sm font-medium leading-relaxed text-ast-accent">
          {service.deliverables.join(' · ')}
        </p>
        <p className="mt-3 flex-1 text-base leading-relaxed text-ast-ink-muted">{service.description}</p>
        <Button asChild variant="outline" size="sm" className="mt-5 w-full">
          <Link to="/contact">
            Start a Project
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </Button>
      </div>
    </SpotlightCard>
  );
}
