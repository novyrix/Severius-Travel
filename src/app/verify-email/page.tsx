'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, Mail } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'resent'>('loading');
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token || !email) {
      setStatus('error');
      setMessage('Invalid verification link. Please check your email and try again.');
      return;
    }

    verifyEmail();
  }, [token, email]);

  const verifyEmail = async () => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Your email has been verified successfully! Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to verify email. The link may have expired.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred while verifying your email. Please try again.');
    }
  };

  const resendVerification = async () => {
    if (!email) return;

    setResending(true);
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStatus('resent');
        setMessage('Verification email sent! Please check your inbox.');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Failed to resend verification email.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              {status === 'loading' && (
                <Loader2 className="w-16 h-16 text-[rgb(var(--color-gold))] animate-spin" />
              )}
              {status === 'success' && (
                <CheckCircle className="w-16 h-16 text-green-600" />
              )}
              {(status === 'error' || status === 'resent') && (
                <Mail className="w-16 h-16 text-[rgb(var(--color-gold))]" />
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-[rgb(var(--color-brown))]">
              {status === 'loading' && 'Verifying Email...'}
              {status === 'success' && 'Email Verified!'}
              {status === 'error' && 'Verification Failed'}
              {status === 'resent' && 'Email Sent!'}
            </h1>

            {/* Message */}
            <p className="text-neutral-600">{message}</p>

            {/* Actions */}
            <div className="space-y-3">
              {status === 'success' && (
                <Link href="/dashboard">
                  <Button className="w-full bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90">
                    Go to Dashboard
                  </Button>
                </Link>
              )}

              {status === 'error' && (
                <>
                  <Button
                    onClick={resendVerification}
                    disabled={resending}
                    className="w-full bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90"
                  >
                    {resending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Resend Verification Email
                  </Button>
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Back to Login
                    </Button>
                  </Link>
                </>
              )}

              {status === 'resent' && (
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              )}

              {status === 'loading' && (
                <p className="text-sm text-neutral-500">
                  Please wait while we verify your email address...
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
