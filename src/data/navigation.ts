export interface NavLink {
  href: string;
  label: string;
  /** Short supporting line, used in the footer's grouped navigation. */
  hint?: string;
}

/** Single source of truth for site navigation — header, footer, mobile panel. */
export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home', hint: 'Start here' },
  { href: '/services', label: 'Services', hint: 'What we build' },
  { href: '/projects', label: 'Projects', hint: 'Selected work' },
  { href: '/about', label: 'About', hint: 'Who we are' },
  { href: '/faq', label: 'FAQ', hint: 'Common questions' },
  { href: '/contact', label: 'Contact', hint: 'Start a project' },
];
