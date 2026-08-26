/**
 * Placeholder service data — replace with AST's real offerings (TBD,
 * see docs/frontend/website-design-brief.md). Shape is the contract for both the
 * Home services overview and the /services page.
 *
 * Order matters: the first 4 are the headline practice areas shown by
 * default; the rest are revealed by the "Show all services" toggle on
 * the /services page.
 */
export interface Service {
  slug: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    slug: 'custom-software',
    title: 'Custom Software Development',
    description:
      'Web and mobile products designed, built, and shipped end-to-end, from first commit to deployed, monitored production systems.',
    deliverables: ['Product Engineering', 'API Development', 'Legacy Modernization'],
  },
  {
    slug: 'ai-solutions',
    title: 'AI & Machine Learning',
    description:
      'AI that earns its keep: forecasting, classification, document extraction, and automation, trained on your data, deployed in your workflow.',
    deliverables: ['AI Solutions & Integration', 'ML Model Deployment', 'Data Pipelines'],
  },
  {
    slug: 'cloud-infrastructure',
    title: 'Cloud & Infrastructure',
    description:
      'AWS, containers, and CI/CD configured so your systems stay fast, available, and predictable to operate.',
    deliverables: ['Cloud Architecture', 'DevOps & CI/CD', 'Observability'],
  },
  {
    slug: 'web-saas',
    title: 'Web & SaaS Development',
    description:
      'Multi-tenant SaaS platforms and marketing sites built for scale and speed, from first line of code to production deploy.',
    deliverables: ['SaaS Platforms', 'Marketing Sites', 'API Integrations'],
  },
  {
    slug: 'mobile-app',
    title: 'Mobile App Development',
    description:
      'Native and cross-platform apps built for iOS and Android, shipped to the app stores and supported after launch.',
    deliverables: ['iOS & Android', 'Cross-Platform Builds', 'App Store Delivery'],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX & Product Design',
    description:
      'Interfaces designed around how people actually work, validated with prototypes before a single line of production code ships.',
    deliverables: ['Product Design', 'Design Systems', 'Prototyping'],
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce Solutions',
    description: 'Storefronts, checkout flows, and inventory systems built to convert and scale with demand.',
    deliverables: ['Storefront Builds', 'Payment Integration', 'Inventory Systems'],
  },
  {
    slug: 'automation',
    title: 'Automation & Business Process Optimization',
    description:
      'Manual workflows replaced with reliable automation, so your team spends time on the work that actually needs a person.',
    deliverables: ['Workflow Automation', 'Process Audits', 'Tooling Integration'],
  },
  {
    slug: 'game-development',
    title: 'Game Development',
    description: 'Playable, performant games built for the platforms your players are on: Android, desktop, and VR.',
    deliverables: ['Android & Desktop', 'VR Experiences', 'Performance Tuning'],
  },
  {
    slug: 'game-asset-creation',
    title: 'Game Asset Creation',
    description:
      "3D models, textures, animations, and environment art built to match your game's style and performance budget.",
    deliverables: ['3D Modeling', 'Texturing & Animation', 'Environment Art'],
  },
];
