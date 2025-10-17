'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react';

function VerifyEmailSentContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-yellow-50 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] rounded-full p-6">
              <Mail className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-[rgb(var(--color-brown))] mb-2">
              Check Your Email
            </h1>
            <p className="text-neutral-600">
              We've sent a verification link to:
            </p>
            {email && (
              <p className="text-[rgb(var(--color-brown))] font-semibold mt-2 text-lg break-all">
                {decodeURIComponent(email)}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-amber-50 rounded-xl p-6 mb-6">
            <h2 className="text-[rgb(var(--color-brown))] font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">📧</span>
              What's next?
            </h2>
            <ol className="space-y-3 text-neutral-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold text-[rgb(var(--color-gold))]">1.</span>
                <span>Check your inbox for an email from Severius Adventures</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold text-[rgb(var(--color-gold))]">2.</span>
                <span>Click the verification link in the email</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold text-[rgb(var(--color-gold))]">3.</span>
                <span>You'll be redirected to login automatically</span>
              </li>
            </ol>
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-neutral-700">
              <strong className="text-[rgb(var(--color-brown))]">💡 Can't find the email?</strong>
              <br />
              Check your spam or junk folder. Add our email to your contacts to ensure future emails reach your inbox.
            </p>
          </div>

          {/* Resend Button */}
          <form action="/api/auth/resend-verification" method="POST" className="mb-6">
            <input type="hidden" name="email" value={email || ''} />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[rgb(var(--color-brown))] to-[rgb(156,102,91)] hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Resend Verification Email
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-neutral-600 text-sm mb-3">
              Already verified your email?
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[rgb(var(--color-brown))] hover:text-[rgb(var(--color-gold))] font-semibold transition-colors group"
            >
              Go to Login
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6 pt-6 border-t border-neutral-200">
            <Link
              href="/"
              className="text-sm text-neutral-500 hover:text-[rgb(var(--color-brown))] transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailSentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--color-gold))] mx-auto"></div>
        </div>
      </div>
    }>
      <VerifyEmailSentContent />
    </Suspense>
  );
}
