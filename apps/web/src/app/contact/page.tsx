import { ContactForm } from '../../features/contact-form/ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with the ATS team.',
};

export default function ContactPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-3xl font-bold text-ats-brand">Contact Us</h1>
      <p className="text-ats-text-muted">
        Have a project in mind or want to learn more about what we do? Fill out the form below and
        we will get back to you.
      </p>
      <ContactForm />
    </main>
  );
}
