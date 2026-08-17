/**
 * Homepage — Server Component (no interactivity needed here).
 * Placeholder content: final copy/design is a business/design deliverable,
 * see docs/product/vision.md.
 */
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-4 px-6">
      <h1 className="text-4xl font-bold text-ats-brand">
        ATS — AI Software and Technology Solutions
      </h1>
      <p className="text-ats-text-muted">
        This is a placeholder homepage. Final content and design are tracked
        in docs/product — see the repository README for the engineering
        foundation this site is built on.
      </p>
    </main>
  );
}
