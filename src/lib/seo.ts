import { useEffect } from 'react';

const SITE_NAME = 'AST';
const DEFAULT_DESCRIPTION =
  'AST builds AI-powered software, cloud systems, and modern digital experiences for ambitious teams.';

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}

interface SeoOptions {
  /** Page title, without the site-name suffix. Omit on the home page. */
  title?: string;
  description?: string;
}

/**
 * Sets the document title and description for a route. This is a client-rendered
 * SPA, so every route otherwise inherits the single title in index.html, which
 * breaks browser history, bookmarks, and screen-reader page announcements.
 */
export function useSeo({ title, description = DEFAULT_DESCRIPTION }: SeoOptions = {}) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME}, AI Software & Technology Solutions`;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', document.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + window.location.pathname;
  }, [title, description]);
}
