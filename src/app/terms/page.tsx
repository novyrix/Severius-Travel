import { FileText, Scale, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[rgb(var(--color-brown))] to-[rgb(var(--color-gold))] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8" />
            <h1 className="text-5xl font-bold">Terms & Conditions</h1>
          </div>
          <p className="text-xl opacity-90">
            Please read these terms carefully before using our services. Last updated: October 16, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Welcome to Severius Adventures And Travels. By accessing our website (severiusadventuresandtravel.com) 
              and booking our tours, you agree to be bound by these Terms and Conditions. If you do not agree to all 
              terms, please do not use our services.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6" />
              Acceptance of Terms
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              These terms constitute a legally binding agreement between you and Severius Adventures And Travels. 
              By making a booking, you confirm that you are at least 18 years old and have the legal capacity to 
              enter into contracts.
            </p>
          </section>

          {/* Bookings and Reservations */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Bookings & Reservations
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p><strong>1. Booking Confirmation:</strong> A binding contract is formed once we send you a booking confirmation email.</p>
              <p><strong>2. Booking Requirements:</strong> You must provide accurate personal information, including full names matching passport details for international tours.</p>
              <p><strong>3. Availability:</strong> All tours are subject to availability. We reserve the right to decline bookings.</p>
              <p><strong>4. Minimum Numbers:</strong> Tours may have minimum participant requirements. If minimums aren't met, we may cancel or reschedule with full refund options.</p>
            </div>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Pricing & Payment
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p><strong>1. Prices:</strong> All prices are quoted in USD unless otherwise stated. Prices include services as specified in tour descriptions.</p>
              <p><strong>2. Price Changes:</strong> Prices are subject to change without notice. The price confirmed at booking time applies.</p>
              <p><strong>3. Payment Terms:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>30% deposit required at booking</li>
                <li>Full balance due 30 days before departure</li>
                <li>Bookings within 30 days require full payment</li>
              </ul>
              <p><strong>4. Payment Methods:</strong> We accept payments via PesaPal (M-Pesa, Airtel Money, credit/debit cards).</p>
              <p><strong>5. Currency Fluctuations:</strong> Prices are fixed in USD. Exchange rate fluctuations are customer's responsibility.</p>
            </div>
          </section>

          {/* Cancellations */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Cancellation Policy
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p>Cancellations must be made in writing (email). The following cancellation fees apply:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>60+ days before departure:</strong> 15% cancellation fee (85% refund)</li>
                <li><strong>30-59 days before departure:</strong> 30% cancellation fee (70% refund)</li>
                <li><strong>15-29 days before departure:</strong> 50% cancellation fee (50% refund)</li>
                <li><strong>Less than 15 days:</strong> No refund (100% forfeiture)</li>
              </ul>
              <p className="mt-4">
                <strong>No-shows:</strong> Failure to arrive without prior cancellation results in 100% forfeiture.
              </p>
              <p className="mt-3">
                We strongly recommend purchasing travel insurance to cover cancellation costs.
              </p>
            </div>
          </section>

          {/* Changes and Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Changes & Modifications
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p><strong>By Customer:</strong> Changes to bookings (dates, participants, tour type) are subject to availability and may incur fees. Contact us at least 30 days in advance.</p>
              <p><strong>By Company:</strong> We reserve the right to modify itineraries due to weather, safety concerns, political situations, or operational reasons. We will provide comparable alternatives or full refunds.</p>
              <p><strong>Force Majeure:</strong> We are not liable for cancellations or changes due to events beyond our control (natural disasters, pandemics, war, etc.).</p>
            </div>
          </section>

          {/* Travel Documents */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Travel Documents & Visas
            </h2>
            <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Valid passport (minimum 6 months validity)</li>
                <li>Obtaining necessary visas</li>
                <li>Meeting health/vaccination requirements</li>
                <li>Travel insurance (highly recommended)</li>
              </ul>
              <p className="mt-4">
                We can provide guidance but are not responsible for visa denials or entry refusals.
              </p>
            </div>
          </section>

          {/* Health and Safety */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Health & Safety
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p>
                <strong>Medical Fitness:</strong> You must be medically fit for the tour. Inform us of any health conditions, 
                disabilities, or dietary requirements at booking.
              </p>
              <p>
                <strong>Vaccinations:</strong> Certain destinations require vaccinations (Yellow Fever, etc.). Check requirements 
                with your doctor.
              </p>
              <p>
                <strong>Travel Insurance:</strong> We STRONGLY recommend comprehensive travel insurance covering medical emergencies, 
                evacuation, cancellations, and lost belongings.
              </p>
              <p>
                <strong>Safety Regulations:</strong> Follow guide instructions at all times. We are not liable for injuries resulting 
                from disregarding safety rules.
              </p>
            </div>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Liability & Disclaimer
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p>
                <strong>Our Liability:</strong> We act as an intermediary between you and third-party service providers 
                (hotels, transport, tour operators). We are not liable for their acts, omissions, or defaults.
              </p>
              <p>
                <strong>Personal Belongings:</strong> We are not responsible for loss, theft, or damage to personal items. 
                Keep valuables secure.
              </p>
              <p>
                <strong>Injuries and Accidents:</strong> Travel involves inherent risks. We are not liable for injuries, 
                illness, or death except where caused by our proven negligence.
              </p>
              <p>
                <strong>Maximum Liability:</strong> Our total liability for any claim is limited to the amount you paid for the tour.
              </p>
            </div>
          </section>

          {/* Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Traveler Conduct
            </h2>
            <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Behave respectfully toward guides, staff, fellow travelers, and local communities</li>
                <li>Comply with local laws and customs</li>
                <li>Not engage in illegal activities</li>
                <li>Not cause damage to property or the environment</li>
              </ul>
              <p className="mt-4">
                <strong>Right to Refuse Service:</strong> We reserve the right to refuse service or remove participants 
                who are disruptive, intoxicated, or pose a risk to others. No refund will be provided.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Intellectual Property
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              All content on our website (text, images, logos, itineraries) is owned by Severius Adventures And Travels 
              and protected by copyright laws. You may not reproduce, distribute, or use our content without written permission.
            </p>
          </section>

          {/* Disputes */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Disputes & Governing Law
            </h2>
            <div className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <p>
                <strong>Complaints:</strong> Address complaints to us in writing within 30 days of tour completion. 
                We will investigate and respond within 14 days.
              </p>
              <p>
                <strong>Governing Law:</strong> These terms are governed by the laws of Kenya. Any disputes will be 
                subject to the exclusive jurisdiction of Kenyan courts.
              </p>
            </div>
          </section>

          {/* Amendments */}
          <section>
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4">
              Amendments
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300">
              We reserve the right to modify these Terms & Conditions at any time. Changes will be posted on this page 
              with an updated date. Continued use of our services constitutes acceptance of revised terms.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-[rgb(var(--color-brown))] dark:text-[rgb(var(--color-gold))] mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              Contact Information
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              For questions about these Terms & Conditions, contact us:
            </p>
            <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <p><strong>Company:</strong> Severius Adventures And Travels</p>
              <p><strong>Email:</strong> info@severiusadventuresandtravel.com</p>
              <p><strong>Phone:</strong> +254 780 419 605</p>
              <p><strong>Address:</strong> Westlands, Nairobi, Kenya</p>
              <p><strong>Website:</strong> severiusadventuresandtravel.com</p>
            </div>
          </section>

          {/* Acknowledgment */}
          <section className="border-t pt-6">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">
              By making a booking with Severius Adventures And Travels, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms & Conditions.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
