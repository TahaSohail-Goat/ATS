import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Automatically scrolls window to top on route navigation */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // The options-object form is required here: html has `scroll-behavior:
    // smooth` globally, and the positional scrollTo(0, 0) form inherits that,
    // animating a slow scroll-up on every route change (worst from the
    // Footer, scrolled thousands of px down) instead of landing instantly.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // A page component can survive a route change (only its params differ), and
    // then the link that was just activated is still in the DOM and still
    // focused. The browser scrolls to keep a focused element in view once the
    // new content lays out, undoing the reset above and opening the new page
    // part-way down. Dropping focus also means a Tab press starts from the top.
    const active = document.activeElement;
    if (active instanceof HTMLElement && active !== document.body) active.blur();
  }, [pathname]);

  return null;
}
