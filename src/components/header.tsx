"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { useI18n } from './providers/i18n-provider';

export function Header() {
  const { data: session, status } = useSession();
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/90 border-b border-neutral-200 shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[rgb(var(--color-brown))]">
            <Image
              src="/images/logo.svg"
              alt="Severius Adventures & Travel"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            Severius Travel
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/tours" className="text-sm font-medium text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors">
              {t('nav.tours')}
            </Link>
            <Link href="/about" className="text-sm font-medium text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/blog" className="text-sm font-medium text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors">
              {t('nav.blog')}
            </Link>
            <Link href="/faq" className="text-sm font-medium text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-sm font-medium text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors">
              {t('nav.contact')}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {status === 'authenticated' ? (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 text-sm text-neutral-700 hover:text-[rgb(var(--color-gold))] transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                {t('nav.dashboard')}
              </Link>
              <button 
                className="btn-gold flex items-center gap-2" 
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut className="w-4 h-4" />
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <button 
              className="btn-gold flex items-center gap-2" 
              onClick={() => signIn(undefined, { callbackUrl: '/' })}
            >
              <User className="w-4 h-4" />
              {t('nav.login')}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
