import type { IconType } from 'react-icons';
import {
  SiAndroid,
  SiApple,
  SiClickhouse,
  SiDjango,
  SiDocker,
  SiExpress,
  SiGo,
  SiGrafana,
  SiHuggingface,
  SiJsonwebtokens,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSharp,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { Code2, Database, Zap } from 'lucide-react';

export interface TechIcon {
  Icon: IconType;
  /** Brand color (hex). Monochrome logos use a light tone so they read on dark surfaces. */
  color: string;
}

/** Maps a tech-stack label to its brand icon and color. Unlisted labels fall back to a generic glyph. */
const TECH_ICONS: Record<string, TechIcon> = {
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  // Next.js's mark is pure black/white with no brand color, so it inherits
  // the surrounding ink color to stay visible in both themes.
  'Next.js': { Icon: SiNextdotjs, color: 'currentColor' },
  React: { Icon: SiReact, color: '#61DAFB' },
  Python: { Icon: SiPython, color: '#3776AB' },
  PostgreSQL: { Icon: SiPostgresql, color: '#4169E1' },
  AWS: { Icon: FaAws, color: '#FF9900' },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  Docker: { Icon: SiDocker, color: '#2496ED' },
  ClickHouse: { Icon: SiClickhouse, color: '#FFCC01' },
  Kubernetes: { Icon: SiKubernetes, color: '#326CE5' },
  Stripe: { Icon: SiStripe, color: '#635BFF' },
  Go: { Icon: SiGo, color: '#00ADD8' },
  Grafana: { Icon: SiGrafana, color: '#F46800' },
  Unity: { Icon: SiUnity, color: 'currentColor' },
  'C#': { Icon: SiSharp, color: '#239120' },
  Android: { Icon: SiAndroid, color: '#3DDC84' },
  iOS: { Icon: SiApple, color: 'currentColor' },
  Express: { Icon: SiExpress, color: 'currentColor' },
  MongoDB: { Icon: SiMongodb, color: '#47A248' },
  'Transformers.js': { Icon: SiHuggingface, color: '#FFD21E' },
  Groq: { Icon: Zap, color: '#F55036' },
  // Django's brand green is near-black and disappears on dark surfaces here,
  // so it inherits the surrounding ink color instead.
  Django: { Icon: SiDjango, color: 'currentColor' },
  Redis: { Icon: SiRedis, color: '#DC382D' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
  // No official brand mark ships in this icon set, so a generic database
  // glyph stands in, tinted with SQL Server's badge red.
  'SQL Server': { Icon: Database, color: '#CC2927' },
  JWT: { Icon: SiJsonwebtokens, color: 'currentColor' },
};

const FALLBACK: TechIcon = { Icon: Code2, color: 'currentColor' };

/** Icon + brand color for a tech-stack label, falling back to a generic glyph for anything unmapped. */
export function getTechIcon(tech: string): TechIcon {
  return TECH_ICONS[tech] ?? FALLBACK;
}
