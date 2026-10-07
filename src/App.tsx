import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then(({ AboutPage }) => ({ default: AboutPage })),
);
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then(({ ServicesPage }) => ({ default: ServicesPage })),
);
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then(({ ProjectsPage }) => ({ default: ProjectsPage })),
);
const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage').then(({ ProjectDetailPage }) => ({ default: ProjectDetailPage })),
);
const FAQPage = lazy(() =>
  import('./pages/FAQPage').then(({ FAQPage }) => ({ default: FAQPage })),
);
const LegalPage = lazy(() =>
  import('./pages/LegalPage').then(({ LegalPage }) => ({ default: LegalPage })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then(({ NotFoundPage }) => ({ default: NotFoundPage })),
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then(({ ContactPage }) => ({ default: ContactPage })),
);

function LazyRoute({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh]" aria-busy="true">
          <span className="sr-only">Loading page…</span>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Analytics />
    </BrowserRouter>
  );
}

/** Shared shell, also rendered at build time for crawlable static route HTML. */
export function AppContent() {
  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-ast-canvas text-ast-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ast-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/about"
              element={<LazyRoute><AboutPage /></LazyRoute>}
            />
            <Route
              path="/services"
              element={<LazyRoute><ServicesPage /></LazyRoute>}
            />
            <Route
              path="/projects"
              element={<LazyRoute><ProjectsPage /></LazyRoute>}
            />
            <Route
              path="/projects/:slug"
              element={<LazyRoute><ProjectDetailPage /></LazyRoute>}
            />
            <Route
              path="/faq"
              element={<LazyRoute><FAQPage /></LazyRoute>}
            />
            <Route
              path="/contact"
              element={<LazyRoute><ContactPage /></LazyRoute>}
            />
            <Route
              path="/privacy"
              element={<LazyRoute><LegalPage document="privacy" /></LazyRoute>}
            />
            <Route
              path="/terms"
              element={<LazyRoute><LegalPage document="terms" /></LazyRoute>}
            />
            <Route
              path="/cookies"
              element={<LazyRoute><LegalPage document="cookies" /></LazyRoute>}
            />
            <Route
              path="*"
              element={<LazyRoute><NotFoundPage /></LazyRoute>}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
