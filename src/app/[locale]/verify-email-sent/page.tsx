import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VerifyEmailSent' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function VerifyEmailSentPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brown-50 via-white to-gold-50 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brown-400 to-gold-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-brown-500 to-gold-500 rounded-full p-6">
              <Mail className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-brown-100 p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-brown-800 mb-2">
              Check Your Email
            </h1>
            <p className="text-brown-600">
              We've sent a verification link to:
            </p>
            {email && (
              <p className="text-brown-800 font-semibold mt-2 text-lg break-all">
                {decodeURIComponent(email)}
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-beige-100 rounded-xl p-6 mb-6">
            <h2 className="text-brown-800 font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">📧</span>
              What's next?
            </h2>
            <ol className="space-y-3 text-brown-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold text-gold-600">1.</span>
                <span>Check your inbox for an email from Severius Adventures</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold text-gold-600">2.</span>
                <span>Click the verification link in the email</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-bold text-gold-600">3.</span>
                <span>You'll be redirected to login automatically</span>
              </li>
            </ol>
          </div>

          {/* Tips */}
          <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-brown-700">
              <strong className="text-brown-800">💡 Can't find the email?</strong>
              <br />
              Check your spam or junk folder. Add our email to your contacts to ensure future emails reach your inbox.
            </p>
          </div>

          {/* Resend Button */}
          <form action="/api/auth/resend-verification" method="POST" className="mb-6">
            <input type="hidden" name="email" value={email} />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brown-600 to-brown-700 hover:from-brown-700 hover:to-brown-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Resend Verification Email
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-brown-600 text-sm mb-3">
              Already verified your email?
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-brown-700 hover:text-gold-600 font-medium transition-colors group"
            >
              Go to Login
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-brown-600 text-sm mt-6">
          Need help? Contact us at{' '}
          <a
            href="mailto:support@severiusadventuresandtravel.com"
            className="text-gold-600 hover:text-gold-700 font-medium"
          >
            support@severiusadventuresandtravel.com
          </a>
        </p>
      </div>
    </div>
  );
}
