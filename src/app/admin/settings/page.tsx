import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Globe, Mail, Phone, MapPin, Save, Building } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-[rgb(var(--color-brown))]" />
          <h2 className="text-3xl font-bold text-[rgb(var(--color-brown))]">Site Settings</h2>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              General Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" defaultValue="Severius Adventures & Travel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteTagline">Tagline</Label>
                <Input id="siteTagline" defaultValue="Authentic African Adventures" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="siteDescription">Description</Label>
                <textarea
                  id="siteDescription"
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  defaultValue="Experience unforgettable African safaris, cultural tours, and adventure travel."
                />
              </div>
            </div>
            <Button className="bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="info@severiusadventuresandtravel.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone
                </Label>
                <Input id="phone" type="tel" defaultValue="+254 712 345 678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">
                  <Phone className="w-4 h-4 inline mr-1" />
                  WhatsApp Number
                </Label>
                <Input id="whatsapp" type="tel" defaultValue="+254 712 345 678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Address
                </Label>
                <Input id="address" defaultValue="Embu, Kenya" />
              </div>
            </div>
            <Button className="bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Social Media Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  type="url"
                  defaultValue="https://www.facebook.com/severiustravels/"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  type="url"
                  defaultValue="https://www.instagram.com/severiustravels/"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter / X</Label>
                <Input id="twitter" type="url" placeholder="https://twitter.com/yourhandle" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tripadvisor">TripAdvisor</Label>
                <Input
                  id="tripadvisor"
                  type="url"
                  defaultValue="https://www.tripadvisor.com/Attraction_Review..."
                />
              </div>
            </div>
            <Button className="bg-[rgb(var(--color-gold))] hover:bg-[rgb(var(--color-gold))]/90">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Email Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Email settings are configured via environment variables
                (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS). Update your .env file to change
                email settings.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input id="fromEmail" type="email" defaultValue="noreply@severiusadventures.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromName">From Name</Label>
                <Input id="fromName" defaultValue="Severius Adventures" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Security Notice:</strong> API keys should be managed via environment
                variables. Never expose sensitive keys in the frontend.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <select
                id="currency"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="KES">KES - Kenyan Shilling</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="mpesaEnabled" defaultChecked className="w-4 h-4" />
              <Label htmlFor="mpesaEnabled">Enable M-Pesa Payments</Label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="stripeEnabled" defaultChecked className="w-4 h-4" />
              <Label htmlFor="stripeEnabled">Enable Stripe Payments</Label>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Mode */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Mode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
              <input type="checkbox" id="maintenanceMode" className="w-5 h-5" />
              <div>
                <Label htmlFor="maintenanceMode" className="font-medium">
                  Enable Maintenance Mode
                </Label>
                <p className="text-sm text-neutral-500">
                  When enabled, only admins can access the site. Visitors will see a maintenance
                  page.
                </p>
              </div>
            </div>
            <Button variant="outline" className="text-orange-600 hover:bg-orange-50">
              Toggle Maintenance Mode
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
