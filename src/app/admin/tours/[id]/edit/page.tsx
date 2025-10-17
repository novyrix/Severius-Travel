import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { TourEditForm } from '@/components/admin/tour-edit-form';

export default async function EditTourPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  // Fetch the tour with all relations
  const tour = await prisma.tour.findUnique({
    where: { id: params.id },
    include: {
      country: {
        include: {
          region: true,
        },
      },
      images: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!tour) {
    redirect('/admin/tours');
  }

  // Fetch all countries for the dropdown
  const countries = await prisma.country.findMany({
    include: {
      region: true,
    },
    orderBy: { name: 'asc' },
  });

  return <TourEditForm tour={tour} countries={countries} />;
}
