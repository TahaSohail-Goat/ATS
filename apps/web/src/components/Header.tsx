'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@ats/ui';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Site header with desktop nav and mobile menu. Client component: needs
 * menu state and active-route highlighting — see apps/web/AGENTS.md.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ats-text/10 bg-ats-bg-light/90 backdrop-blur dark:border-ats-bg-light/10 dark:bg-ats-bg-dark/90">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="ATS — home">
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-ats-brand to-ats-accent text-sm font-bold text-white"
          >
            A
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight">ATS</span>
            <span className="hidden text-xs text-ats-text-muted sm:block">
              AI Software &amp; Technology Solutions
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`text-sm font-medium transition-colors hover:text-ats-brand ${
                isActive(link.href) ? 'text-ats-brand' : 'text-ats-text-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <Link href="/contact">Start a Project</Link>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-ats-text-muted hover:text-ats-brand md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            aria-hidden={!menuOpen}
            className="border-t border-ats-text/10 bg-ats-bg-light dark:border-ats-bg-light/10 dark:bg-ats-bg-dark md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`block rounded-md px-3 py-2 text-sm font-medium ${
                      isActive(link.href)
                        ? 'bg-ats-brand/10 text-ats-brand'
                        : 'text-ats-text-muted hover:text-ats-brand'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={() => setMenuOpen(false)}>
                    Start a Project
                  </Link>
                </Button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
