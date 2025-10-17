import { BookOpen, CreditCard, Calendar, RefreshCw, Shield, AlertCircle } from 'lucide-react';

export default function BookingPolicyPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-5xl font-bold">Booking Policy</h1>
          </div>
          <p className="text-xl opacity-90">
            Everything you need to know about booking tours with us. Last updated: October 16, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8 space-y-8">
          
          {/* How to Book */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              How to Book
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p>Booking a tour with Severius Adventures And Travels is easy:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Browse Tours:</strong> Explore our collection of curated tours on the website</li>
                <li><strong>Select Your Tour:</strong> Click "Book This Tour" on your chosen adventure</li>
                <li><strong>Fill Booking Form:</strong> Provide traveler details, dates, and special requests</li>
                <li><strong>Make Payment:</strong> Pay via PesaPal (M-Pesa, Airtel Money, or card)</li>
                <li><strong>Receive Confirmation:</strong> Get instant email confirmation with booking details</li>
                <li><strong>Prepare for Adventure:</strong> We'll send pre-tour information 2 weeks before departure</li>
              </ol>
            </div>
          </section>

          {/* Payment Policy */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Payment Policy
            </h2>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Payment Schedule</h3>
                <ul className="space-y-2">
                  <li>• <strong>Deposit:</strong> 30% of total tour price due at booking</li>
                  <li>• <strong>Balance:</strong> Remaining 70% due 30 days before departure</li>
                  <li>• <strong>Last-Minute Bookings:</strong> Full payment required if booking within 30 days</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Accepted Payment Methods</h3>
                <p>We accept payments through PesaPal, including:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>M-Pesa (Kenya)</li>
                  <li>Airtel Money</li>
                  <li>Visa & Mastercard</li>
                  <li>Bank transfers (for large groups)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Currency</h3>
                <p>
                  All prices are quoted in <strong>USD</strong>. Payments in local currency (KES) will be converted 
                  at prevailing exchange rates at time of payment.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong>Important:</strong> Your booking is not confirmed until payment is received and 
                  confirmation email is sent. Tours may sell out while payment is pending.
                </p>
              </div>
            </div>
          </section>

          {/* Booking Confirmation */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Booking Confirmation
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p>After successful payment, you will receive:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Confirmation Email</strong> - Booking reference, tour details, payment receipt</li>
                <li><strong>Detailed Itinerary</strong> - Day-by-day schedule and activities</li>
                <li><strong>Packing List</strong> - What to bring for your specific tour</li>
                <li><strong>Pre-Tour Information</strong> - Meet-up points, emergency contacts, local tips</li>
              </ul>
              <p className="mt-4">
                Check your spam folder if you don't receive confirmation within 10 minutes. Contact us immediately 
                at <a href="tel:+254780419605" className="text-[rgb(var(--color-gold))] hover:underline">+254 780 419 605</a> if issues arise.
              </p>
            </div>
          </section>

          {/* Cancellation & Refund Policy */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4 flex items-center gap-2">
              <RefreshCw className="w-6 h-6" />
              Cancellation & Refund Policy
            </h2>
            <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
              <p>We understand plans change. Our cancellation policy is as follows:</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-neutral-100 dark:bg-neutral-700">
                      <th className="border p-3 text-left">Cancellation Period</th>
                      <th className="border p-3 text-left">Cancellation Fee</th>
                      <th className="border p-3 text-left">Refund Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3">60+ days before departure</td>
                      <td className="border p-3">15% of tour price</td>
                      <td className="border p-3 text-green-600 font-semibold">85% refund</td>
                    </tr>
                    <tr>
                      <td className="border p-3">30-59 days before</td>
                      <td className="border p-3">30% of tour price</td>
                      <td className="border p-3 text-green-600 font-semibold">70% refund</td>
                    </tr>
                    <tr>
                      <td className="border p-3">15-29 days before</td>
                      <td className="border p-3">50% of tour price</td>
                      <td className="border p-3 text-amber-600 font-semibold">50% refund</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Less than 15 days</td>
                      <td className="border p-3">100% of tour price</td>
                      <td className="border p-3 text-red-600 font-semibold">No refund</td>
                    </tr>
                    <tr>
                      <td className="border p-3">No-show</td>
                      <td className="border p-3">100% forfeiture</td>
                      <td className="border p-3 text-red-600 font-semibold">No refund</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold mb-1">Non-Refundable Services</p>
                  <p>
                    Visa fees, flight tickets, and special permits booked on your behalf are NON-REFUNDABLE 
                    regardless of cancellation timing.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">How to Cancel</h3>
                <p>To cancel your booking:</p>
                <ol className="list-decimal pl-6 mt-2 space-y-1">
                  <li>Email us at info@severiusadventuresandtravel.com with your booking reference</li>
                  <li>Include your full name and tour details</li>
                  <li>State reason for cancellation (optional)</li>
                  <li>We'll process your request within 48 hours</li>
                  <li>Refunds are issued to original payment method within 7-14 business days</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Changes & Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Changes & Modifications
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p><strong>Changing Tour Dates:</strong> Subject to availability. Must request at least 30 days before original departure. Change fee of $50 per person applies.</p>
              <p><strong>Changing Participants:</strong> Name changes allowed up to 14 days before departure. $30 administrative fee per change.</p>
              <p><strong>Upgrading/Downgrading:</strong> Contact us to upgrade to premium accommodation or downgrade. Price difference will be calculated.</p>
              <p className="text-sm italic">
                Note: All changes are subject to availability and must be confirmed in writing by us.
              </p>
            </div>
          </section>

          {/* Group Bookings */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Group Bookings (10+ People)
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p>Special rates and terms available for groups of 10 or more:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Discounts:</strong> 10-15% group discount on tour price</li>
                <li><strong>Free FOC:</strong> 1 free place for every 15 paying participants</li>
                <li><strong>Custom Itineraries:</strong> Tailor-made tours available</li>
                <li><strong>Flexible Payment:</strong> Installment plans available</li>
                <li><strong>Dedicated Coordinator:</strong> Personal tour coordinator assigned</li>
              </ul>
              <p className="mt-4">
                Contact us at <a href="mailto:info@severiusadventuresandtravel.com" className="text-[rgb(var(--color-gold))] hover:underline">
                  info@severiusadventuresandtravel.com
                </a> for group booking inquiries.
              </p>
            </div>
          </section>

          {/* Travel Insurance */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Travel Insurance (Highly Recommended)
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p>
                We STRONGLY recommend purchasing comprehensive travel insurance covering:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Trip cancellation/interruption</li>
                <li>Medical expenses and emergency evacuation</li>
                <li>Lost or delayed baggage</li>
                <li>Flight delays/cancellations</li>
                <li>Personal liability</li>
              </ul>
              <p className="mt-4">
                Insurance can protect you from unforeseen circumstances (illness, family emergencies, natural disasters) 
                that may force cancellation. Without insurance, standard cancellation fees apply.
              </p>
              <p className="mt-3 text-sm italic">
                We can recommend reputable insurance providers upon request.
              </p>
            </div>
          </section>

          {/* Special Requests */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Special Requests
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p>We accommodate special requests when possible:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dietary Requirements:</strong> Vegetarian, vegan, halal, allergies (inform at booking)</li>
                <li><strong>Accessibility Needs:</strong> Limited mobility support (contact us before booking)</li>
                <li><strong>Room Preferences:</strong> Single occupancy, twin beds, etc. (subject to availability)</li>
                <li><strong>Celebratory Arrangements:</strong> Birthdays, anniversaries, honeymoons (we'll make it special!)</li>
              </ul>
              <p className="mt-4 text-sm">
                Note: While we'll do our best to accommodate requests, we cannot guarantee fulfillment. 
                Confirm arrangements with us in writing.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Questions About Booking?
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              Our team is here to help! Contact us:
            </p>
            <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <p><strong>Email:</strong> info@severiusadventuresandtravel.com</p>
              <p><strong>Phone/WhatsApp:</strong> +254 780 419 605</p>
              <p><strong>Office Hours:</strong> Monday-Friday, 8AM-6PM EAT</p>
              <p><strong>Emergency Contact:</strong> Available 24/7 during tours</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
