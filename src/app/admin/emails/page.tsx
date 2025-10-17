import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, UserCheck, UserX } from 'lucide-react';

export default async function AdminEmailsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const subscribers = await prisma.newsletter.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const stats = {
    total: subscribers.length,
    subscribed: subscribers.filter(s => s.subscribed).length,
    unsubscribed: subscribers.filter(s => !s.subscribed).length
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[rgb(var(--color-brown))]">Email & Newsletter</h2>
          <Button className="bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90">
            <Send className="w-4 h-4 mr-2" />
            Compose Email
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Total Subscribers</p>
              <p className="text-2xl font-bold text-[rgb(var(--color-brown))]">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.subscribed}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-neutral-600">Unsubscribed</p>
              <p className="text-2xl font-bold text-red-600">{stats.unsubscribed}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Mail className="w-6 h-6" />
                <span>Send Newsletter</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Send className="w-6 h-6" />
                <span>Send Promotion</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <UserCheck className="w-6 h-6" />
                <span>Export Subscribers</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscribers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Newsletter Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 text-sm font-medium text-neutral-600">Email</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Status</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600">Subscribed</th>
                    <th className="pb-3 text-sm font-medium text-neutral-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="border-b last:border-0 hover:bg-neutral-50">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-neutral-400" />
                          <span className="font-medium">{subscriber.email}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge variant={subscriber.subscribed ? 'success' : 'secondary'}>
                          {subscriber.subscribed ? (
                            <>
                              <UserCheck className="w-3 h-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <UserX className="w-3 h-3 mr-1" />
                              Unsubscribed
                            </>
                          )}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm text-neutral-500">
                        {new Date(subscriber.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Send className="w-4 h-4" />
                          </Button>
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
