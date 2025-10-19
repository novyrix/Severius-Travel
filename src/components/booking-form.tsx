'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Calendar as CalendarIcon, Users, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency, generateBookingRef } from '@/lib/utils';

interface BookingFormProps {
  tour: {
    slug: string;
    title: string;
    price: number;
    durationDays: number;
    country: string;
  };
}

export function BookingForm({ tour }: BookingFormProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [travelers, setTravelers] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState(session?.user?.email || '');
  const [contactPhone, setContactPhone] = useState('');

  const totalAmount = tour.price * travelers;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (status !== 'authenticated') {
      router.push(`/login?callbackUrl=/booking/${tour.slug}`);
      return;
    }

    setLoading(true);

    try {
      const bookingRef = generateBookingRef();
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourSlug: tour.slug,
          tourTitle: tour.title,
          ref: bookingRef,
          amount: totalAmount,
          travelers,
          startDate,
          contactName,
          contactEmail,
          contactPhone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const booking = await response.json();
      
      // Redirect to payment
      router.push(`/payment/${booking.ref}`);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tour Details */}
      <Card>
        <CardHeader>
          <CardTitle>Tour Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-[rgb(var(--color-brown))]">
              {tour.title}
            </h3>
            <p className="text-neutral-600">{tour.country}</p>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Duration:</span>
            <span className="font-medium">{tour.durationDays} Days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Price per person:</span>
            <span className="font-medium">{formatCurrency(tour.price)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Booking Information */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <CalendarIcon className="inline w-4 h-4 mr-2" />
              Start Date
            </label>
            <Input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <Users className="inline w-4 h-4 mr-2" />
              Number of Travelers
            </label>
            <Input
              type="number"
              required
              min="1"
              max="15"
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
            />
            <p className="text-xs text-neutral-500 mt-1">Maximum 15 travelers</p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <Input
              type="tel"
              required
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+254 700 000 000"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Price per person:</span>
            <span>{formatCurrency(tour.price)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Number of travelers:</span>
            <span>× {travelers}</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-lg">
            <span>Total Amount:</span>
            <span className="text-[rgb(var(--color-gold))]">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          'Proceed to Payment'
        )}
      </Button>

      <p className="text-xs text-center text-neutral-600">
        By proceeding, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
}
