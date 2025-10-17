"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Map, Calendar, User, Info, HelpCircle, Mail } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function MobileNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [showMore, setShowMore] = useState(false);

  // Determine dashboard URL based on user role
  const dashboardUrl = (session as any)?.role === 'ADMIN' ? '/admin' : '/dashboard';
  
  // Hide on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { id: "home", href: "/", icon: Home, label: "Home" },
    { id: "tours", href: "/tours", icon: Map, label: "Tours" },
    { id: "about", href: "/about", icon: Info, label: "About" },
    { id: "faq", href: "/faq", icon: HelpCircle, label: "FAQ" },
    { id: "contact", href: "/contact", icon: Mail, label: "Contact" },
    { 
      id: "profile", 
      href: status === "authenticated" ? dashboardUrl : "/login", 
      icon: User, 
      label: session?.user ? "Profile" : "Login" 
    },
  ];

  const isActive = (item: typeof navItems[0]) => {
    // Home is only active on exact match
    if (item.href === "/") return pathname === "/";
    
    // For profile/login, check both dashboard, admin, and login paths
    if (item.id === "profile") {
      return pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/login");
    }
    
    return pathname.startsWith(item.href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                active
                  ? "text-[rgb(var(--color-gold))]"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${active ? "stroke-2" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
