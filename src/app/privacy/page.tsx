import { Shield, Lock, Eye, Database } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8" />
            <h1 className="text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl opacity-90">
            Your privacy is important to us. Last updated: October 16, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Severius Adventures And Travels ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
              you visit our website <strong>severiusadventuresandtravel.com</strong> and use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4 flex items-center gap-2">
              <Database className="w-6 h-6" />
              Information We Collect
            </h2>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
              <div>
                <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                <p>When you book a tour or contact us, we may collect:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Passport details (for international tours)</li>
                  <li>Payment information</li>
                  <li>Travel preferences and special requirements</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address and browser type</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website</li>
                  <li>Device information</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              How We Use Your Information
            </h2>
            <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Process and manage your tour bookings</li>
                <li>Communicate with you about your reservations</li>
                <li>Send booking confirmations and travel documents</li>
                <li>Provide customer support</li>
                <li>Send promotional emails about tours and special offers (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Information Sharing
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Tour operators and accommodation providers</strong> - To facilitate your bookings</li>
                <li><strong>Payment processors (PesaPal)</strong> - To process transactions securely</li>
                <li><strong>Government authorities</strong> - When required by law or for travel permits</li>
                <li><strong>Service providers</strong> - For email delivery, analytics, and customer support</li>
              </ul>
              <p className="mt-4">
                We do NOT sell your personal information to third parties for marketing purposes.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              Data Security
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              We implement industry-standard security measures to protect your information, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure payment gateways (PesaPal)</li>
              <li>Regular security audits</li>
              <li>Limited access to personal data by authorized personnel only</li>
              <li>Encrypted database storage</li>
            </ul>
            <p className="mt-4 text-neutral-700 dark:text-neutral-300">
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Your Privacy Rights
            </h2>
            <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal obligations)</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at{' '}
                <a href="mailto:info@severiusadventuresandtravel.com" className="text-[rgb(var(--color-gold))] hover:underline">
                  info@severiusadventuresandtravel.com
                </a>
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-3">
              We use cookies and similar technologies to enhance your browsing experience. Cookies help us:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>Remember your preferences (language, currency)</li>
              <li>Analyze website traffic and user behavior</li>
              <li>Personalize content and ads</li>
              <li>Maintain your login session</li>
            </ul>
            <p className="mt-4 text-neutral-700 dark:text-neutral-300">
              You can control cookie preferences through your browser settings. Disabling cookies may affect website functionality.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Data Retention
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>Fulfill the purposes outlined in this policy</li>
              <li>Comply with legal, tax, and accounting requirements</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
            <p className="mt-3 text-neutral-700 dark:text-neutral-300">
              Typically, booking records are kept for 7 years for tax and legal compliance.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Children's Privacy
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              Our services are not directed to children under 18. We do not knowingly collect personal information 
              from minors. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Third-Party Websites
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              Our website may contain links to third-party sites (tour operators, hotels, etc.). 
              We are not responsible for their privacy practices. Please review their privacy policies before sharing information.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Changes to This Policy
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated 
              "Last Modified" date. We encourage you to review this policy regularly.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Contact Us
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              If you have questions about this Privacy Policy or our data practices, contact us:
            </p>
            <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <p><strong>Email:</strong> info@severiusadventuresandtravel.com</p>
              <p><strong>Phone:</strong> +254 780 419 605</p>
              <p><strong>Address:</strong> Westlands, Nairobi, Kenya</p>
              <p><strong>Website:</strong> severiusadventuresandtravel.com</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
