import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { Reveal } from '../components/motion/Reveal';
import { CtaSection } from '../components/CtaSection';
import { FAQForm } from '../features/faq-form/FAQForm';
import { faqs } from '../data/faqs';

const FAQ_CATEGORIES = ['Services', 'Process', 'Engagement', 'Technology', 'Pricing & Budget', 'Team & Expertise', 'Getting Started'];

export function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(faqs.map((faq) => faq.category)));
    return uniqueCategories.sort((a, b) => {
      const aIndex = FAQ_CATEGORIES.indexOf(a);
      const bIndex = FAQ_CATEGORIES.indexOf(b);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });
  }, [faqs]);

  const filteredFAQs = useMemo(() => {
    if (!selectedCategory) return faqs;
    const filtered = faqs.filter((faq) => faq.category === selectedCategory);
    return filtered;
  }, [selectedCategory, faqs]);

  function toggleExpanded(id: string) {
    setExpandedId(expandedId === id ? null : id);
  }

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked"
        titleAccent="Questions"
        description="Find answers to common questions about our services, process, and how we work. Don't see what you're looking for? Ask us directly."
      />

      <Section space="loose">
        {/* Category Filter */}
        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedCategory === null
                  ? 'border-ats-brand bg-ats-brand/10 text-ats-brand'
                  : 'border-ats-line bg-ats-surface/60 text-ats-ink-muted hover:border-ats-brand/30 hover:text-ats-ink'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'border-ats-brand bg-ats-brand/10 text-ats-brand'
                    : 'border-ats-line bg-ats-surface/60 text-ats-ink-muted hover:border-ats-brand/30 hover:text-ats-ink'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* FAQ Items */}
        <div className="max-w-4xl space-y-3">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <Reveal key={faq.id} immediate delay={Math.min(index * 0.04, 0.3)}>
                <div className="rounded-xl border border-ats-line bg-ats-surface/40 transition-all duration-200 hover:border-ats-brand/30 hover:bg-ats-surface/60">
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="flex w-full items-start gap-4 px-6 py-4 text-left"
                    aria-expanded={expandedId === faq.id}
                    aria-controls={`faq-${faq.id}`}
                  >
                    <span className="flex-1">
                      <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ats-accent">
                        {faq.category}
                      </span>
                      <h3 className="mt-1.5 text-base font-semibold text-ats-ink">{faq.question}</h3>
                    </span>
                    <ChevronDown
                      className={`mt-1 h-5 w-5 shrink-0 text-ats-ink-muted transition-transform duration-300 ${
                        expandedId === faq.id ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    />
                  </button>

                  {expandedId === faq.id && (
                    <div
                      id={`faq-${faq.id}`}
                      className="border-t border-ats-line px-6 py-4 text-sm leading-relaxed text-ats-ink-muted"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              </Reveal>
            ))
          ) : (
            <p className="py-8 text-center text-ats-ink-muted">No FAQs found in this category.</p>
          )}
        </div>
      </Section>

      {/* Ask a Question Section */}
      <Section
        eyebrow="Didn't find it?"
        title="Ask us"
        titleAccent="a question"
        description="If your question isn't answered above, send it our way. We review all submissions and add helpful questions to our FAQ."
        tone="raised"
      >
        <div className="max-w-3xl">
          <Reveal className="rounded-3xl border border-ats-line bg-ats-surface/70 p-8 sm:p-10 shadow-ats-lifted">
            <FAQForm />
          </Reveal>
        </div>
      </Section>

      <CtaSection
        title="Ready to start"
        titleAccent="your project?"
        description="Have a project in mind or want to discuss your needs? Let's talk."
      />
    </>
  );
}
