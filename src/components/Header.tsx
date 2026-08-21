import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@ats/ui';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { NAV_LINKS } from '../data/navigation';
import { transitionUi } from '../lib/motion';

/**
 * Site header: a sticky glass navigation bar with a full-screen mobile panel
 * and active-route highlighting.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  // Close the panel whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className="ats-glass sticky top-0 z-50 border-b border-ats-line shadow-[0_12px_40px_-28px_rgb(var(--ats-primary)/0.9)]">
      <div
        className={`mx-auto flex h-20 w-full max-w-shell items-center justify-between gap-4 px-5 sm:px-8 lg:px-12`}
      >
        <Link
          to="/"
          className="group flex items-center rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ats-brand"
          aria-label="ATS — home"
        >
          <Logo showTagline priority />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Main">
          <ul className="flex items-center gap-1 rounded-full border border-ats-line bg-ats-surface/50 p-1.5 backdrop-blur-sm">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      active ? 'text-ats-ink' : 'text-ats-ink-muted hover:text-ats-ink'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-navigation"
                        aria-hidden
                        className="bg-ats-brand/12 absolute inset-0 rounded-full border border-ats-brand/25"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden lg:inline-flex">
            <Link to="/contact">
              Start a Project
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </Button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ats-line bg-ats-surface/60 text-ats-ink-muted transition-colors duration-200 hocus:border-ats-brand/40 hocus:text-ats-brand lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="ats-glass fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto border-t border-ats-line lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={transitionUi}
          >
            <nav aria-label="Mobile" className="px-5 pb-10 pt-6 sm:px-8">
              <motion.ul
                className="flex flex-col"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                }}
              >
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <motion.li
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, x: -16 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                      className="border-b border-ats-line/70"
                    >
                      <Link
                        to={link.href}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between py-4 text-2xl font-semibold tracking-display transition-colors ${
                          active ? 'text-ats-brand' : 'text-ats-ink hover:text-ats-brand'
                        }`}
                      >
                        {link.label}
                        <ArrowUpRight className="h-5 w-5 opacity-40" aria-hidden />
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <Button asChild size="lg" fullWidth className="mt-8">
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  Start a Project
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
