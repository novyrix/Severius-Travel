import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface PageProps {
  searchParams: Promise<{ ref?: string; method?: string }>;
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const { ref, method } = await searchParams;
  const isWhatsApp = method === 'whatsapp';

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center py-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-[rgb(var(--color-brown))] mb-4">
              {isWhatsApp ? 'Booking Request Sent!' : 'Payment Successful!'}
            </h1>

            {isWhatsApp ? (
              <>
                <p className="text-neutral-600 text-lg mb-2">
                  Your booking details have been sent to our team via WhatsApp.
                </p>

                {ref && (
                  <p className="text-sm text-neutral-500 mb-8">
                    Booking Reference: <span className="font-mono font-semibold">{ref}</span>
                  </p>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <Image 
                      src="/images/whatsapp.svg" 
                      alt="WhatsApp" 
                      width={20} 
                      height={20}
                      className="w-5 h-5"
                    />
                    <p className="font-semibold text-blue-900">Next Steps:</p>
                  </div>
                  <ul className="text-left text-sm text-blue-800 space-y-2 max-w-md mx-auto">
                    <li>✅ Our team will confirm availability within 24 hours</li>
                    <li>✅ We'll send you payment instructions via WhatsApp</li>
                    <li>✅ Complete payment to secure your booking</li>
                    <li>✅ Receive final confirmation and tour details</li>
                  </ul>
                </div>

                <p className="text-neutral-600 mb-8">
                  You can track your booking status in your dashboard.
                </p>
              </>
            ) : (
              <>
                <p className="text-neutral-600 text-lg mb-2">
                  Thank you for your booking. Your payment has been processed successfully.
                </p>

                {ref && (
                  <p className="text-sm text-neutral-500 mb-8">
                    Booking Reference: <span className="font-mono font-semibold">{ref}</span>
                  </p>
                )}

                <p className="text-neutral-600 mb-8">
                  A confirmation email has been sent to your email address with all the details.
                </p>
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg">
                  View My Bookings
                </Button>
              </Link>
              <Link href="/tours">
                <Button variant="outline" size="lg">
                  Browse More Tours
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
