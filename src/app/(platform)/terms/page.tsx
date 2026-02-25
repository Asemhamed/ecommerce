'use client';

import { ArrowRight, FileText, HelpCircle, Scale, ShieldCheck } from 'lucide-react';

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of Terms', icon: <ShieldCheck className="h-5 w-5" /> },
  { id: 'accounts', title: '2. User Accounts', icon: <FileText className="h-5 w-5" /> },
  { id: 'privacy', title: '3. Privacy Policy', icon: <Scale className="h-5 w-5" /> },
  { id: 'purchases', title: '4. Purchases & Payments', icon: <HelpCircle className="h-5 w-5" /> },
];

export default function TermsPage() {
  const lastUpdated = "February 23, 2026";

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-200 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated on <span className="font-semibold text-green-600">{lastUpdated}</span>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">

          <aside className="lg:w-64 flex-shrink-0">
            <nav className="sticky top-8 space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 px-3">
                Contents
              </p>
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-green-50 hover:text-green-600"
                >
                  <span className="text-gray-400 group-hover:text-green-600">
                    {section.icon}
                  </span>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <main className="flex-1 max-w-3xl">
            <div className="prose prose-green prose-lg max-w-none text-gray-600">
              
              <section id="acceptance" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  1. Acceptance of Terms
                </h2>
                <p className="leading-relaxed">
                  By accessing or using our platform, you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations. If you do not agree with any of these terms, 
                  you are prohibited from using or accessing this site.
                </p>
                <div className="mt-6 rounded-2xl bg-green-50 p-6 border-l-4 border-green-500">
                  <p className="text-sm font-semibold text-green-900 leading-relaxed">
                    <span className="uppercase text-xs block mb-1 tracking-widest text-green-600">Summary</span>
                    By using this website, you are legally agreeing to follow our rules. 
                    If you don't like the rules, please don't use the site.
                  </p>
                </div>
              </section>

              <section id="accounts" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2. User Accounts
                </h2>
                <p className="leading-relaxed mb-4">
                  When you create an account with us, you must provide information that is accurate, 
                  complete, and current at all times. Failure to do so constitutes a breach of the 
                  Terms, which may result in immediate termination of your account.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>You are responsible for safeguarding your password.</li>
                  <li>You must notify us immediately of any security breaches.</li>
                  <li>You may not use as a username the name of another person or entity.</li>
                </ul>
              </section>

              <section id="privacy" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  3. Privacy Policy
                </h2>
                <p className="leading-relaxed">
                  Your privacy is important to us. It is our policy to respect your privacy regarding 
                  any information we may collect from you across our website. We only ask for personal 
                  information when we truly need it to provide a service to you.
                </p>
                <button className="mt-4 flex items-center gap-2 text-green-600 font-bold text-sm hover:underline">
                  Read Full Privacy Policy <ArrowRight className="h-4 w-4" />
                </button>
              </section>

              <section id="purchases" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  4. Purchases & Payments
                </h2>
                <p className="leading-relaxed">
                  If you wish to purchase any product or service made available through the Service, 
                  you may be asked to supply certain information relevant to your Purchase including, 
                  without limitation, your credit card number, the expiration date of your credit card, 
                  and your billing address.
                </p>
              </section>

            </div>
            <div className="mt-16 pt-10 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Have questions about our terms?</h3>
              <p className="mt-2 text-gray-600">
                Our legal team is here to help. Contact us at 
                <a href="mailto:legal@example.com" className="ml-1 text-green-600 font-semibold underline">
                  legal@example.com
                </a>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}