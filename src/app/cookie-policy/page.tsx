import { Plane, Cookie, Shield, Settings, Eye, Database, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Cookie Policy - Severius Adventures & Travel",
  description: "Learn about how Severius Adventures & Travel uses cookies to improve your browsing experience.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--color-beige))]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[rgb(78,52,46)] to-[rgb(212,175,55)] text-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Cookie className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-lg text-white/90">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[rgb(78,52,46)] to-[rgb(212,175,55)] flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-3">Introduction</h2>
                <p className="text-neutral-700 leading-relaxed">
                  This Cookie Policy explains how Severius Adventures & Travel ("we", "us", or "our") uses cookies and
                  similar tracking technologies when you visit our website at{" "}
                  <Link href="/" className="text-[rgb(var(--color-gold))] hover:underline">
                    severiusadventuresandtravel.com
                  </Link>
                  . This policy describes what cookies are, how we use them, and your choices regarding their use.
                </p>
              </div>
            </div>
          </div>

          {/* What Are Cookies */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[rgb(78,52,46)] to-[rgb(212,175,55)] flex items-center justify-center">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-3">What Are Cookies?</h2>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you
                  visit a website. They are widely used to make websites work more efficiently and to provide information
                  to the website owners.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  Cookies help us understand how visitors use our site, improve your browsing experience, and deliver
                  personalized content and advertisements.
                </p>
              </div>
            </div>
          </div>

          {/* Types of Cookies */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[rgb(78,52,46)] to-[rgb(212,175,55)] flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Types of Cookies We Use</h2>
                
                {/* Essential Cookies */}
                <div className="mb-6 pb-6 border-b border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[rgb(var(--color-gold))]" />
                    1. Essential Cookies
                  </h3>
                  <p className="text-neutral-700 leading-relaxed mb-3">
                    These cookies are necessary for the website to function properly. They enable core functionality such
                    as security, network management, and accessibility.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-7">
                    <li>Authentication and session management</li>
                    <li>Security and fraud prevention</li>
                    <li>Language preferences</li>
                    <li>Shopping cart functionality</li>
                  </ul>
                  <p className="text-sm text-neutral-600 mt-3 italic">
                    These cookies cannot be disabled as they are essential for the website to work.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="mb-6 pb-6 border-b border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[rgb(var(--color-gold))]" />
                    2. Analytics Cookies
                  </h3>
                  <p className="text-neutral-700 leading-relaxed mb-3">
                    These cookies help us understand how visitors interact with our website by collecting and reporting
                    information anonymously.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-7">
                    <li>Google Analytics - visitor statistics and behavior</li>
                    <li>Page views and time spent on site</li>
                    <li>Traffic sources and referrals</li>
                    <li>Device and browser information</li>
                  </ul>
                </div>

                {/* Functional Cookies */}
                <div className="mb-6 pb-6 border-b border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[rgb(var(--color-gold))]" />
                    3. Functional Cookies
                  </h3>
                  <p className="text-neutral-700 leading-relaxed mb-3">
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences
                    and settings.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-7">
                    <li>Currency selection</li>
                    <li>Language preferences</li>
                    <li>User interface customizations</li>
                    <li>Recently viewed tours</li>
                  </ul>
                </div>

                {/* Marketing Cookies */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-[rgb(var(--color-gold))]" />
                    4. Marketing Cookies
                  </h3>
                  <p className="text-neutral-700 leading-relaxed mb-3">
                    These cookies track your online activity to help us deliver more relevant advertising or to limit how
                    many times you see an advertisement.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-7">
                    <li>Facebook Pixel - social media advertising</li>
                    <li>Google Ads - targeted advertising</li>
                    <li>Retargeting campaigns</li>
                    <li>Ad performance measurement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Managing Cookies */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[rgb(78,52,46)] to-[rgb(212,175,55)] flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">How to Manage Cookies</h2>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie
                  preferences by:
                </p>

                <div className="space-y-4">
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h4 className="font-semibold text-neutral-900 mb-2">Browser Settings</h4>
                    <p className="text-sm text-neutral-700">
                      Most web browsers allow you to control cookies through their settings. You can set your browser to
                      refuse cookies or to alert you when cookies are being sent.
                    </p>
                  </div>

                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h4 className="font-semibold text-neutral-900 mb-2">Popular Browsers</h4>
                    <ul className="text-sm text-neutral-700 space-y-1">
                      <li>
                        • <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                      </li>
                      <li>
                        • <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                      </li>
                      <li>
                        • <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
                      </li>
                      <li>
                        • <strong>Edge:</strong> Settings → Privacy, search, and services → Cookies
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> Disabling certain cookies may impact the functionality of our website and
                      limit your access to some features.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third-Party Cookies */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Third-Party Cookies</h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We use services from third-party companies that may set cookies on your device. These companies have their
              own privacy and cookie policies:
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="text-[rgb(var(--color-gold))] mt-1">•</span>
                <span>
                  <strong>Google Analytics:</strong>{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgb(var(--color-gold))] hover:underline"
                  >
                    Google Privacy Policy
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[rgb(var(--color-gold))] mt-1">•</span>
                <span>
                  <strong>Facebook:</strong>{" "}
                  <a
                    href="https://www.facebook.com/privacy/policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgb(var(--color-gold))] hover:underline"
                  >
                    Facebook Privacy Policy
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[rgb(var(--color-gold))] mt-1">•</span>
                <span>
                  <strong>Payment Processors:</strong> Stripe, PayPal (see their respective privacy policies)
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-[rgb(78,52,46)] to-[rgb(212,175,55)] rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Questions About Our Cookie Policy?</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              If you have any questions about our use of cookies or this Cookie Policy, please don't hesitate to contact
              us. We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[rgb(var(--color-brown))] rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-600 text-center mb-4">Related Policies</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/privacy" className="text-[rgb(var(--color-gold))] hover:underline">
                Privacy Policy
              </Link>
              <span className="text-neutral-400">•</span>
              <Link href="/terms" className="text-[rgb(var(--color-gold))] hover:underline">
                Terms of Service
              </Link>
              <span className="text-neutral-400">•</span>
              <Link href="/booking-policy" className="text-[rgb(var(--color-gold))] hover:underline">
                Booking Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
