"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LogOut,
  LayoutDashboard,
  Plane,
  ChevronDown,
  MapPin,
  Globe,
  Compass,
  Mountain,
  Palmtree,
  Building2,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { LanguageSwitcher } from "./language-switcher";
import { CurrencySwitcher } from "./currency-switcher";

interface Region {
  name: string;
  slug: string;
  icon: React.ReactNode;
  description: string;
}

const regions: Region[] = [
  {
    name: "East Africa",
    slug: "EA",
    icon: <Mountain className="w-6 h-6" />,
    description: "Kenya, Tanzania, Uganda, Rwanda",
  },
  {
    name: "Southern Africa",
    slug: "SA",
    icon: <Compass className="w-6 h-6" />,
    description: "South Africa, Botswana, Namibia, Zimbabwe, Zambia",
  },
  {
    name: "Islands",
    slug: "IS",
    icon: <Palmtree className="w-6 h-6" />,
    description: "Zanzibar & Seychelles beaches",
  },
];

const popularDestinations = [
  { name: "Maasai Mara, Kenya", href: "/tours?country=Kenya", image: "🦁" },
  { name: "Serengeti, Tanzania", href: "/tours?country=Tanzania", image: "🐘" },
  { name: "Victoria Falls, Zimbabwe", href: "/tours?country=Zimbabwe", image: "�" },
  { name: "Okavango Delta, Botswana", href: "/tours?country=Botswana", image: "🦒" },
  { name: "Kruger Park, South Africa", href: "/tours?country=South%20Africa", image: "🦏" },
  { name: "Zanzibar Beaches", href: "/tours?country=Zanzibar", image: "🏝️" },
];

export function HeaderNew() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine dashboard URL based on user role
  const dashboardUrl = (session as any)?.role === 'ADMIN' ? '/admin' : '/dashboard';
  
  // Hide on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-neutral-200 shadow-sm">
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-[rgb(var(--color-brown))] hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo.svg"
              alt="Severius Adventures & Travel"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <span>Severius Travel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Destinations Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsDestinationsOpen(true)}
              onMouseLeave={() => setIsDestinationsOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors">
                <Globe className="w-4 h-4" />
                Destinations
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDestinationsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isDestinationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[600px]"
                  >
                    <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
                      <div className="grid grid-cols-2 divide-x divide-neutral-200">
                        {/* Regions */}
                        <div className="p-6">
                          <h3 className="text-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                            <Compass className="w-4 h-4 text-[rgb(var(--color-gold))]" />
                            Explore by Region
                          </h3>
                          <div className="space-y-3">
                            {regions.map((region) => (
                              <Link
                                key={region.slug}
                                href={`/tours?region=${region.slug}`}
                                className="group flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                              >
                                <div className="text-[rgb(var(--color-gold))] group-hover:scale-110 transition-transform">
                                  {region.icon}
                                </div>
                                <div>
                                  <div className="font-medium text-neutral-900 group-hover:text-[rgb(var(--color-brown))]">
                                    {region.name}
                                  </div>
                                  <div className="text-xs text-neutral-600">
                                    {region.description}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Popular Destinations */}
                        <div className="p-6 bg-neutral-50">
                          <h3 className="text-sm font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[rgb(var(--color-gold))]" />
                            Popular Destinations
                          </h3>
                          <div className="space-y-3">
                            {popularDestinations.map((dest) => (
                              <Link
                                key={dest.href}
                                href={dest.href}
                                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-all hover:shadow-sm"
                              >
                                <div className="text-3xl">{dest.image}</div>
                                <div className="font-medium text-neutral-900 group-hover:text-[rgb(var(--color-brown))]">
                                  {dest.name}
                                </div>
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/tours"
                            className="mt-4 block text-center text-sm font-medium text-[rgb(var(--color-gold))] hover:text-[rgb(var(--color-brown))] transition-colors"
                          >
                            View All Tours →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/tours"
              className="text-sm font-medium text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors"
            >
              All Tours
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center gap-2">
            {/* TripAdvisor Icon */}
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g482864-d33033760-Reviews-Severius_Adventures_And_Travels-Embu_Eastern_Province.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors"
              title="View our TripAdvisor reviews"
            >
              <Image
                src="/images/tripadvisor.svg"
                alt="TripAdvisor"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </a>
            
            <LanguageSwitcher />
            <CurrencySwitcher />
            {status === "authenticated" ? (
              <>
                <Link
                  href={dashboardUrl}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {(session as any)?.role === 'ADMIN' ? 'Admin' : 'Dashboard'}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgb(var(--color-brown))] text-white hover:bg-[rgb(var(--color-brown))]/90 transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgb(var(--color-gold))] text-white hover:bg-[rgb(var(--color-gold))]/90 transition-colors text-sm font-medium"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button - Hidden since we have bottom nav */}
          {/* <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-[rgb(var(--color-gold))]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button> */}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-neutral-200"
            >
              <div className="py-4 space-y-2">
                <Link
                  href="/tours"
                  className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Tours
                </Link>
                {regions.map((region) => (
                  <Link
                    key={region.slug}
                    href={`/tours?region=${region.slug}`}
                    className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {region.name}
                  </Link>
                ))}
                <Link
                  href="/blog"
                  className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                {status === "authenticated" ? (
                  <>
                    <Link
                      href={dashboardUrl}
                      className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {(session as any)?.role === 'ADMIN' ? 'Admin Dashboard' : 'Dashboard'}
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-neutral-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-2 bg-[rgb(var(--color-gold))] text-white rounded-lg text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
