import type { Metadata } from 'next';
import { ContactForm } from '../../features/contact-form/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with ATS about your project.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-bold">Contact us</h1>
      <ContactForm />
    </main>
  );
}
