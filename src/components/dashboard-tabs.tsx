'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, User as UserIcon, FileText, Download, Mail, Phone, MapPinIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Booking {
  id: string;
  ref: string;
  amount: number;
  status: string;
  createdAt: Date;
  tour: {
    title: string;
    slug: string;
    country: {
      name: string;
    };
    images: Array<{
      url: string;
      alt: string | null;
    }>;
  };
}

interface User {
  name: string | null;
  email: string;
  image: string | null;
}

interface Props {
  bookings: Booking[];
  user: User;
}

export function DashboardTabs({ bookings, user }: Props) {
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile' | 'documents'>('bookings');

  const tabs = [
    { id: 'bookings' as const, label: 'My Bookings', icon: Calendar },
    { id: 'profile' as const, label: 'Profile', icon: UserIcon },
    { id: 'documents' as const, label: 'Documents', icon: FileText },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 md:gap-2 mb-4 md:mb-6 border-b border-neutral-200 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[rgb(var(--color-gold))] text-[rgb(var(--color-gold))]'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[tab.label.split(' ').length - 1]}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'bookings' && (
        <Card>
          <CardHeader>
            <CardTitle>My Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => {
                  const mainImage = booking.tour.images[0];
                  return (
                    <div
                      key={booking.id}
                      className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      {/* Tour Image */}
                      <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                        {mainImage ? (
                          <Image
                            src={mainImage.url}
                            alt={mainImage.alt || booking.tour.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 192px"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-neutral-400">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Booking Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-[rgb(var(--color-brown))]">
                              {booking.tour.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                              <MapPin className="w-4 h-4" />
                              <span>{booking.tour.country.name}</span>
                            </div>
                          </div>
                          <Badge
                            variant={
                              booking.status === 'PAID'
                                ? 'success'
                                : booking.status === 'PENDING'
                                ? 'warning'
                                : 'destructive'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Booked: {formatDate(booking.createdAt)}</span>
                          </div>
                          <div>
                            <span className="font-medium">Ref:</span> {booking.ref}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-base md:text-lg font-bold text-[rgb(var(--color-gold))]">
                            {formatCurrency(booking.amount)}
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            {booking.status === 'PENDING' && (
                              <Link href={`/payment/${booking.ref}`}>
                                <Button size="sm" className="text-xs md:text-sm">Complete Payment</Button>
                              </Link>
                            )}
                            {booking.status === 'PAID' && (
                              <Button variant="outline" size="sm" className="text-xs md:text-sm hidden md:flex">
                                <Download className="w-4 h-4 mr-2" />
                                Receipt
                              </Button>
                            )}
                            <Link href={`/tours/${booking.tour.slug}`}>
                              <Button variant="outline" size="sm" className="text-xs md:text-sm">
                                View Tour
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-600 mb-4">You haven't made any bookings yet.</p>
                <Link href="/tours">
                  <Button>Browse Tours</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'profile' && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[rgb(var(--color-gold))]/10 flex items-center justify-center">
                  {user.image ? (
                    <Image src={user.image} alt={user.name || 'User'} width={80} height={80} className="rounded-full" />
                  ) : (
                    <UserIcon className="w-10 h-10 text-[rgb(var(--color-gold))]" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user.name || 'Traveler'}</h3>
                  <p className="text-neutral-600">{user.email}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-sm">Full Name</Label>
                  <Input id="name" defaultValue={user.name || ''} className="text-sm" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user.email} disabled className="bg-neutral-50 text-sm" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+254 123 456 789" className="text-sm" />
                </div>
                <div>
                  <Label htmlFor="country" className="text-sm">Country</Label>
                  <Input id="country" placeholder="Kenya" className="text-sm" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button className="w-full sm:w-auto">Save Changes</Button>
                <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'documents' && (
        <Card>
          <CardHeader>
            <CardTitle>My Documents & Itineraries</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.filter(b => b.status === 'PAID').length > 0 ? (
              <div className="space-y-3">
                {bookings
                  .filter(b => b.status === 'PAID')
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[rgb(var(--color-gold))]/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[rgb(var(--color-gold))]" />
                        </div>
                        <div>
                          <h4 className="font-medium">{booking.tour.title} - Itinerary</h4>
                          <p className="text-sm text-neutral-600">Booking Ref: {booking.ref}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm" className="text-xs md:text-sm w-full sm:w-auto">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs md:text-sm w-full sm:w-auto">
                          <FileText className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-600 mb-2">No documents available yet</p>
                <p className="text-sm text-neutral-500">
                  Documents and itineraries will appear here after you complete a booking
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
