import { Link } from 'react-router-dom';
import { Container } from '../components/Container';
import { useSeo } from '../lib/seo';

type LegalDocument = 'privacy' | 'terms' | 'cookies';

const UPDATED = 'October 7, 2026';

const pageMeta: Record<LegalDocument, { title: string; accent: string; description: string }> = {
  privacy: {
    title: 'Privacy',
    accent: 'Notice',
    description: 'How AST handles information when you browse this website or contact our team.',
  },
  terms: {
    title: 'Website',
    accent: 'Terms',
    description: 'The terms for using the AST website and its public portfolio content.',
  },
  cookies: {
    title: 'Cookies &',
    accent: 'Storage',
    description: 'The browser storage and third-party technologies used by this website.',
  },
};

function Updated() {
  return <p className="mb-10 text-sm text-ast-ink-muted">Last updated {UPDATED}</p>;
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-ast-line py-8 first:border-0 first:pt-0">
      <h2 className="text-xl font-semibold text-ast-ink">{title}</h2>
      <div className="mt-3 space-y-4 text-base leading-7 text-ast-ink-muted">{children}</div>
    </section>
  );
}

function PrivacyNotice() {
  return (
    <>
      <Updated />
      <LegalSection title="Information you send us">
        <p>
          If you use our contact form, we receive the name and email address you provide, your
          selected services, your message, and any optional phone number. The ask-a-question form
          also collects your name, email address, question category, and question. Please avoid
          including sensitive personal information that we have not asked for.
        </p>
        <p>
          Form submissions are sent through FormSubmit and delivered to <a className="text-ast-brand underline underline-offset-4" href="mailto:team@astsolutions.dev">team@astsolutions.dev</a>.
          FormSubmit processes the submitted content to provide its form delivery service. We use
          the information to respond to you, understand your inquiry, and maintain our business
          communications. Sending a form does not create a client relationship.
        </p>
      </LegalSection>
      <LegalSection title="Information collected when you browse">
        <p>
          Vercel Web Analytics is installed on this site. Vercel describes this service as
          cookie-free and says it uses a request-derived identifier that expires after 24 hours.
          Analytics may include page paths, referring pages, time of visit, approximate location,
          browser, operating system, and device type. We use these aggregated statistics to
          understand site traffic.
        </p>
        <p>
          The site saves your light or dark theme choice in your browser’s local storage. This
          preference stays on your device and is not sent to AST by the website.
        </p>
      </LegalSection>
      <LegalSection title="Third-party services and links">
        <p>
          FormSubmit receives information you submit through our forms. If enabled, Cloudflare
          Turnstile loads to help detect automated form submissions; Cloudflare says Turnstile
          processes information needed for that security function and does not access form entries.
          Some project pages embed videos hosted by Google Drive, and the site loads fonts from
          Google Fonts. These providers may receive technical information from your browser when
          their services load. Their own privacy notices govern their processing.
        </p>
        <p>
          Our project demos and social links may take you to other websites. AST does not control
          those sites or their privacy practices.
        </p>
      </LegalSection>
      <LegalSection title="Retention, security, and transfers">
        <p>
          We keep inquiries for as long as reasonably needed to handle the conversation and related
          business records. The retention periods applied to email and FormSubmit records have not
          been specified. Service providers may process information in countries other than yours.
          We use third-party providers to operate the site and deliver inquiries, but internet
          transmission and storage cannot be guaranteed to be completely secure.
        </p>
      </LegalSection>
      <LegalSection title="Your choices and requests">
        <p>
          You can choose not to submit a form. You can also contact us to ask about, correct, or
          request deletion of an inquiry you sent; we will respond subject to applicable law and
          records we are required or reasonably need to keep. Depending on where you live, local
          privacy law may provide additional rights.
        </p>
        <p>
          To make a request, email <a className="text-ast-brand underline underline-offset-4" href="mailto:team@astsolutions.dev">team@astsolutions.dev</a>.
        </p>
      </LegalSection>
      <LegalSection title="Updates and contact">
        <p>
          We may update this notice as the website or its providers change. The date at the top
          shows when it was last revised. Questions about privacy can be sent to{' '}
          <a className="text-ast-brand underline underline-offset-4" href="mailto:team@astsolutions.dev">team@astsolutions.dev</a>.
        </p>
      </LegalSection>
    </>
  );
}

function WebsiteTerms() {
  return (
    <>
      <Updated />
      <LegalSection title="About these terms">
        <p>
          These terms apply to your use of the AST public website, including its pages, project
          portfolio, and contact features. By using the site, you agree to use it lawfully and in a
          way that does not interfere with other visitors’ use of it.
        </p>
        <p>
          These website terms do not set the commercial terms for software, consulting, design, or
          other paid work. Any project scope, fees, delivery commitments, ownership rights, support,
          and other service terms must be agreed separately in a written proposal or contract.
        </p>
      </LegalSection>
      <LegalSection title="Website content and intellectual property">
        <p>
          Unless a page says otherwise, the AST name, site design, and original text and graphics
          are owned by AST or used with permission. You may view the site and share links to its
          public pages. You must not copy, republish, modify, sell, or commercially exploit site
          content without permission from the rights holder.
        </p>
        <p>
          Project names, logos, screenshots, and third-party materials may belong to their
          respective owners. Showing a project in this portfolio does not transfer ownership or
          grant you a licence to that project or its materials.
        </p>
      </LegalSection>
      <LegalSection title="Acceptable use">
        <p>
          Do not use the site to break the law, attempt unauthorized access, disrupt its operation,
          submit malicious code, or send content that is unlawful or infringes another person’s
          rights. Do not use our forms to send spam or information you are not entitled to share.
        </p>
      </LegalSection>
      <LegalSection title="Information and external services">
        <p>
          Portfolio descriptions and other website content are provided for general information.
          We work to keep them useful and current, but do not promise that every item is complete,
          error-free, or suitable for a particular decision. Contact us to confirm details relevant
          to a potential engagement.
        </p>
        <p>
          The site may link to third-party websites or services. Those links are provided for
          convenience; AST does not control or endorse all content, availability, or practices on
          those services. Your use of them is subject to their own terms.
        </p>
      </LegalSection>
      <LegalSection title="Availability and changes">
        <p>
          We may update, suspend, or remove site features or content as the site changes. We may
          revise these terms by posting an updated version here. The date above identifies the
          latest revision.
        </p>
      </LegalSection>
      <LegalSection title="Contact">
        <p>
          Questions about these website terms can be sent to{' '}
          <a className="text-ast-brand underline underline-offset-4" href="mailto:team@astsolutions.dev">team@astsolutions.dev</a>.
        </p>
      </LegalSection>
    </>
  );
}

function CookieNotice() {
  return (
    <>
      <Updated />
      <LegalSection title="Cookies">
        <p>
          The site does not currently set its own cookies for analytics or advertising. Vercel
          states that Web Analytics does not use cookies. Third-party services loaded by a page,
          such as Cloudflare Turnstile or an embedded Google Drive video, may use their own
          technologies under their policies.
        </p>
      </LegalSection>
      <LegalSection title="Local storage">
        <p>
          We use your browser’s local storage to remember your light or dark theme choice under the
          key <code className="rounded bg-ast-surface px-1.5 py-0.5 text-sm text-ast-ink">ast-theme</code>.
          It remains on your device. You can clear it using your browser’s site-data controls; the
          site will then use its default theme.
        </p>
      </LegalSection>
      <LegalSection title="Analytics and third-party content">
        <p>
          Vercel Web Analytics provides traffic statistics without cookies, using a short-lived
          request-derived identifier. Project videos embedded from Google Drive and fonts loaded
          from Google Fonts connect your browser to those providers. You can avoid loading an
          embedded video by not opening the project page that contains it; browser settings can
          also limit third-party storage or requests, though some content may not work as expected.
        </p>
      </LegalSection>
      <LegalSection title="More information">
        <p>
          See our <Link className="text-ast-brand underline underline-offset-4" to="/privacy">Privacy Notice</Link> for
          details on website analytics, forms, and third-party services. Questions can be sent to{' '}
          <a className="text-ast-brand underline underline-offset-4" href="mailto:team@astsolutions.dev">team@astsolutions.dev</a>.
        </p>
      </LegalSection>
    </>
  );
}

export function LegalPage({ document }: { document: LegalDocument }) {
  const meta = pageMeta[document];
  useSeo({ title: `${meta.title} ${meta.accent}`, description: meta.description });

  return (
    <>
      <section className="dark border-b border-ast-line bg-ast-canvas py-16 text-ast-ink sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-display-lg font-bold text-ast-ink">
              {meta.title} {meta.accent}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ast-ink-muted">
              {meta.description}
            </p>
          </div>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container>
          <article className="mx-auto max-w-3xl">
            {document === 'privacy' && <PrivacyNotice />}
            {document === 'terms' && <WebsiteTerms />}
            {document === 'cookies' && <CookieNotice />}
          </article>
        </Container>
      </section>
    </>
  );
}
