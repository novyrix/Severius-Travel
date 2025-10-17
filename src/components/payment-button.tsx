'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentButtonProps {
  bookingRef: string;
  amount: number;
}

export function PaymentButton({ bookingRef, amount }: PaymentButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingRef }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to initiate payment');
      }

      if (data.redirectUrl) {
        // Redirect to PesaPal payment page
        window.location.href = data.redirectUrl;
      } else {
        throw new Error('No redirect URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to initiate payment. Please try again.';
      alert(errorMessage);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="w-full"
      size="lg"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Redirecting to payment...
        </>
      ) : (
        <>
          <CreditCard className="w-5 h-5 mr-2" />
          Pay Now
        </>
      )}
    </Button>
  );
}
