import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, User, Mail, CheckCircle, XCircle } from 'lucide-react';
import { UserActions } from '@/components/admin/user-actions';

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const users = await prisma.user.findMany({
    include: {
      bookings: true
    },
    orderBy: { createdAt: 'desc' }
  });

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'ADMIN').length,
    active: users.filter(u => u.isActive).length,
    verified: users.filter(u => u.emailVerified).length
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <h2 className="text-3xl font-bold text-[rgb(var(--color-brown))]">User Management</h2>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Total Users</p>
              <p className="text-2xl font-bold text-[rgb(var(--color-brown))]">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Admins</p>
              <p className="text-2xl font-bold text-blue-600">{stats.admins}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Email Verified</p>
              <p className="text-2xl font-bold text-[rgb(var(--color-gold))]">{stats.verified}</p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 text-sm font-medium text-neutral-600">User</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Email</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Role</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Status</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Verified</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Bookings</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Joined</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b last:border-0 hover:bg-neutral-50">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name || 'User'}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[rgb(var(--color-brown))] flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <span className="font-medium">{user.name || 'No name'}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm">{user.email}</td>
                      <td className="py-4">
                        <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                          {user.role === 'ADMIN' && <Shield className="w-3 h-3 mr-1" />}
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge variant={user.isActive ? 'success' : 'destructive'}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="py-4">
                        {user.emailVerified ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </td>
                      <td className="py-4 text-sm">{user.bookings.length}</td>
                      <td className="py-4 text-sm text-neutral-500">
                        {user.createdAt && new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-2">
                          <UserActions
                            userId={user.id}
                            userName={user.name}
                            userEmail={user.email}
                            userRole={user.role}
                            isActive={user.isActive}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
