"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Plane,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send,
  CheckCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useI18n } from "./providers/i18n-provider";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/severiustravels/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/severiustravels/", label: "Instagram" },
  { icon: Twitter, href: "https://www.tiktok.com/@severius.travels", label: "TikTok" },
  { icon: Linkedin, href: "https://www.tripadvisor.com/Attraction_Review-g482864-d33033760-Reviews-Severius_Adventures_And_Travels-Embu_Eastern_Province.html", label: "TripAdvisor" },
];

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useI18n();
  
  // Hide on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const footerLinks = {
    company: [
      { name: t('nav.about'), href: "/about" },
      { name: t('nav.contact'), href: "/contact" },
      { name: t('nav.blog'), href: "/blog" },
      { name: "Careers", href: "#" },
    ],
    destinations: [
      { name: "Africa Tours", href: "/tours?region=AF" },
      { name: "Europe Tours", href: "/tours?region=EU" },
      { name: "Asia Tours", href: "/tours?region=AS" },
      { name: t('nav.tours'), href: "/tours" },
    ],
    support: [
      { name: "FAQs", href: "/faq" },
      { name: "Booking Policy", href: "/booking-policy" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to subscribe');
        setLoading(false);
        return;
      }

      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    } catch (error) {
      alert('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[rgb(var(--color-brown))] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Plane className="w-8 h-8 text-[rgb(var(--color-gold))]" />
              <span className="text-2xl font-bold">Severius Travel</span>
            </Link>
            <p className="text-white/80 mb-6 leading-relaxed">
              Creating unforgettable travel experiences. Your trusted
              partner for adventures around the world with Severius Adventures & Travel.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:info@severiusadventuresandtravel.com"
                    className="hover:text-[rgb(var(--color-gold))] transition-colors"
                  >
                    info@severiusadventuresandtravel.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+254780419605"
                    className="hover:text-[rgb(var(--color-gold))] transition-colors"
                  >
                    +254 780 419 605
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>Westlands, Nairobi, Kenya</div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href={`https://severiusadventuresandtravel.com`}
                    className="hover:text-[rgb(var(--color-gold))] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    severiusadventuresandtravel.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-[rgb(var(--color-gold))] transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-[rgb(var(--color-gold))] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Destinations</h3>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-[rgb(var(--color-gold))] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-[rgb(var(--color-gold))] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-12 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-3">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-white/80 mb-6">
              Get the latest travel deals, tips, and destination guides delivered
              to your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-[rgb(var(--color-gold))]">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-[rgb(var(--color-gold))] h-12"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90 text-white h-12 px-6"
                >
                  {loading ? (
                    <span>Subscribing...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>
              © {new Date().getFullYear()} Severius Adventures & Travel. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
              <Link
                href="/privacy"
                className="hover:text-[rgb(var(--color-gold))] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[rgb(var(--color-gold))] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="hover:text-[rgb(var(--color-gold))] transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="/booking-policy"
                className="hover:text-[rgb(var(--color-gold))] transition-colors"
              >
                Booking Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
