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
  }, [pathname]);

  return null;
}
