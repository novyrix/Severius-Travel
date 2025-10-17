'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { TourActions } from '@/components/admin/tour-actions';

interface Tour {
  id: string;
  title: string;
  slug: string;
  price: number;
  durationDays: number;
  published: boolean;
  country: {
    name: string;
    region: {
      name: string;
    };
  };
  bookings: any[];
}

interface ToursTableProps {
  tours: Tour[];
  itemsPerPage?: number;
}

export function ToursTable({ tours, itemsPerPage = 10 }: ToursTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tours.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTours = tours.slice(startIndex, endIndex);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Tours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-3 text-sm font-medium text-neutral-600">Title</th>
                <th className="pb-3 text-sm font-medium text-neutral-600">Destination</th>
                <th className="pb-3 text-sm font-medium text-neutral-600">Duration</th>
                <th className="pb-3 text-sm font-medium text-neutral-600">Price</th>
                <th className="pb-3 text-sm font-medium text-neutral-600">Bookings</th>
                <th className="pb-3 text-sm font-medium text-neutral-600">Status</th>
                <th className="pb-3 text-sm font-medium text-neutral-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTours.map((tour) => (
                <tr key={tour.id} className="border-b last:border-0 hover:bg-neutral-50">
                  <td className="py-4">
                    <div>
                      <p className="font-medium text-[rgb(var(--color-brown))]">{tour.title}</p>
                      <p className="text-sm text-neutral-500">{tour.slug}</p>
                    </div>
                  </td>
                  <td className="py-4 text-sm">
                    {tour.country.name}, {tour.country.region.name}
                  </td>
                  <td className="py-4 text-sm">{tour.durationDays} days</td>
                  <td className="py-4 text-sm font-medium">{formatCurrency(tour.price)}</td>
                  <td className="py-4">
                    <Badge variant="secondary">{tour.bookings.length}</Badge>
                  </td>
                  <td className="py-4">
                    <Badge variant={tour.published ? 'success' : 'secondary'}>
                      {tour.published ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/tours/${tour.slug}`} target="_blank">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/tours/${tour.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <TourActions 
                        tourId={tour.id} 
                        tourTitle={tour.title}
                        published={tour.published}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={tours.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </CardContent>
    </Card>
  );
}
