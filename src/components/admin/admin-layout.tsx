import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/admin');
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true, emailVerified: true, isActive: true },
  });

  if (!user) {
    redirect('/login');
  }

  // Check email verification
  if (!user.emailVerified) {
    redirect('/verify-email?message=Please verify your email to access the dashboard');
  }

  // Check if active
  if (!user.isActive) {
    redirect('/login?error=Your account has been deactivated');
  }

  // Check if admin
  if (user.role !== 'ADMIN') {
    redirect('/dashboard'); // Redirect regular users to user dashboard
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[rgb(var(--color-brown))]">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-600">
                Welcome, <strong>{session.user.name || session.user.email}</strong>
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
