'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface WhatsAppPaymentButtonProps {
  bookingRef: string;
  amount: number;
  tourTitle: string;
  guests: number;
  startDate: string;
  userName: string;
  userEmail: string;
}

export function WhatsAppPaymentButton({ 
  bookingRef, 
  amount, 
  tourTitle,
  guests,
  startDate,
  userName,
  userEmail
}: WhatsAppPaymentButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleWhatsAppPayment = async () => {
    setLoading(true);

    try {
      // Format booking details for WhatsApp
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254712345678";
      
      const message = `
🎫 *NEW BOOKING REQUEST*

📋 *Booking Reference:* ${bookingRef}

🗺️ *Tour:* ${tourTitle}

👥 *Details:*
• Number of Guests: ${guests}
• Start Date: ${new Date(startDate).toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
• Customer Name: ${userName}
• Email: ${userEmail}

💰 *Total Amount:* $${amount.toLocaleString()} USD

---

I would like to proceed with this booking and arrange payment details.
`.trim();

      // Open WhatsApp with pre-filled message
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp in new window
      window.open(whatsappUrl, '_blank');
      
      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push(`/payment/success?ref=${bookingRef}&method=whatsapp`);
      }, 2000);
      
    } catch (error) {
      console.error('WhatsApp payment error:', error);
      alert('Failed to initiate WhatsApp payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleWhatsAppPayment}
      disabled={loading}
      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
      size="lg"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Opening WhatsApp...
        </>
      ) : (
        <>
          <Image 
            src="/images/whatsapp.svg" 
            alt="WhatsApp" 
            width={20} 
            height={20}
            className="w-5 h-5 mr-2"
          />
          Send Booking via WhatsApp
        </>
      )}
    </Button>
  );
}
