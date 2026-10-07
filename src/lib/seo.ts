import { useEffect } from 'react';

export const SITE_ORIGIN = 'https://www.astsolutions.dev';
export const SITE_NAME = 'AST Solutions';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/opengraph-image.png`;

export interface SeoMetadata {
  title: string;
  description: string;
  canonical: string;
  image: string;
  noIndex?: boolean;
}

const ROUTE_METADATA: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'AST Solutions | Software Development & AI Solutions',
    description:
      'AST Solutions (AI Software & Technology Solutions) designs and builds custom software, AI features, mobile apps, and cloud systems for growing businesses.',
  },
  '/about': {
    title: 'About AST Solutions | Software Engineering Team',
    description:
      'Meet AST Solutions, a software engineering team that designs, builds, and modernizes reliable digital products for businesses.',
  },
  '/services': {
    title: 'Software Development Services | AST Solutions',
    description:
      'Explore custom software development, AI and machine learning, mobile apps, SaaS, cloud infrastructure, design, and automation from AST Solutions.',
  },
  '/projects': {
    title: 'Software Projects & Portfolio | AST Solutions',
    description:
      'Explore software projects by AST Solutions, including AI study tools, business platforms, mobile apps, and games.',
  },
  '/faq': {
    title: 'Frequently Asked Questions | AST Solutions',
    description:
      'Answers about AST Solutions services, project process, software development, timelines, and how to start a project.',
  },
  '/contact': {
    title: 'Contact AST Solutions | Start a Software Project',
    description:
      'Contact AST Solutions about custom software, AI, mobile apps, or cloud infrastructure. Tell us what you are building and get a practical next step.',
  },
  '/privacy': {
    title: 'Privacy Notice | AST Solutions',
    description: 'How AST Solutions handles information when you browse this website or contact our team.',
  },
  '/terms': {
    title: 'Website Terms | AST Solutions',
    description: 'Terms for using the AST Solutions website and its public portfolio content.',
  },
  '/cookies': {
    title: 'Cookies & Storage | AST Solutions',
    description: 'Browser storage and third-party technologies used by the AST Solutions website.',
  },
};

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return `/${pathname.replace(/^\/+|\/+$/g, '')}`;
}

export function getSeoMetadata(
  pathname: string,
  overrides: { title?: string; description?: string; image?: string } = {},
): SeoMetadata {
  const path = normalizePath(pathname);
  const route = ROUTE_METADATA[path];

  if (path.startsWith('/projects/') && overrides.title) {
    return {
      title: `${overrides.title} | AST Solutions`,
      description: overrides.description ?? '',
      canonical: `${SITE_ORIGIN}${path}`,
      image: overrides.image ? `${SITE_ORIGIN}${overrides.image}` : DEFAULT_OG_IMAGE,
    };
  }

  if (route) {
    return {
      ...route,
      canonical: `${SITE_ORIGIN}${path}`,
      image: DEFAULT_OG_IMAGE,
    };
  }

  return {
    title: 'Page Not Found | AST Solutions',
    description: 'The page you are looking for could not be found.',
    canonical: `${SITE_ORIGIN}${path}`,
    image: DEFAULT_OG_IMAGE,
    noIndex: true,
  };
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}

function setCanonical(url: string) {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

/**
 * Updates route metadata for client-side navigation. The build also uses
 * `getSeoMetadata` to emit the same metadata into each route's HTML response.
 */
export function useSeo(options: { title?: string; description?: string; image?: string } = {}) {
  useEffect(() => {
    const metadata = getSeoMetadata(window.location.pathname, options);
    const title = metadata.title;
    const description = metadata.description;

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', metadata.noIndex ? 'noindex, follow' : 'index, follow');
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', metadata.canonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', metadata.image);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', metadata.image);
    setCanonical(metadata.canonical);
  }, [options.title, options.description, options.image]);
}
