import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface PaymentConfirmationEmailProps {
  customerName: string;
  userEmail?: string;
  tourName: string;
  bookingRef: string;
  amount: number;
  currency: string;
  paymentDate: string;
  paymentMethod: string;
}

export const PaymentConfirmationEmail = ({
  customerName = 'Valued Customer',
  userEmail,
  tourName = 'Amazing Safari Adventure',
  bookingRef = 'SEV-123456',
  amount = 150000,
  currency = 'KES',
  paymentDate = 'January 15, 2025',
  paymentMethod = 'M-PESA',
}: PaymentConfirmationEmailProps) => {
  const previewText = `Payment Confirmed - ${bookingRef}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo Section */}
          <Section style={logoSection}>
            <Img
              src="https://severiusadventuresandtravel.com/images/logo.png"
              alt="Severius Adventures & Travel"
              width="200"
              height="auto"
              style={logoImage}
            />
          </Section>

          {/* Success Badge */}
          <Section style={successBadge}>
            <Text style={successText}>✓ Payment Successful</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Payment Confirmed!</Heading>
            <Text style={text}>
              Dear {customerName},
            </Text>
            <Text style={text}>
              Thank you! Your payment has been successfully processed. Your adventure with 
              Severius Adventures & Travel is now fully confirmed.
            </Text>

            <Hr style={hr} />

            {/* Payment Details */}
            <Heading style={h2}>Payment Receipt</Heading>
            <table style={detailsTable}>
              <tr>
                <td style={labelCell}>Booking Reference:</td>
                <td style={valueCell}>{bookingRef}</td>
              </tr>
              <tr>
                <td style={labelCell}>Tour:</td>
                <td style={valueCell}>{tourName}</td>
              </tr>
              <tr>
                <td style={labelCell}>Payment Date:</td>
                <td style={valueCell}>{paymentDate}</td>
              </tr>
              <tr>
                <td style={labelCell}>Payment Method:</td>
                <td style={valueCell}>{paymentMethod}</td>
              </tr>
              <tr>
                <td style={labelCell}>Amount Paid:</td>
                <td style={amountCell}>{currency} {amount.toLocaleString()}</td>
              </tr>
              <tr>
                <td style={labelCell}>Status:</td>
                <td style={paidCell}>PAID ✓</td>
              </tr>
            </table>

            <Hr style={hr} />

            {/* What's Next */}
            <Heading style={h2}>What Happens Next?</Heading>
            <Text style={text}>
              <strong>1. Detailed Itinerary:</strong> You'll receive your complete tour itinerary within 24 hours.
            </Text>
            <Text style={text}>
              <strong>2. Pre-Departure Info:</strong> We'll send you packing lists, visa requirements, and travel tips.
            </Text>
            <Text style={text}>
              <strong>3. Meet Your Guide:</strong> You'll receive contact details for your tour guide 7 days before departure.
            </Text>

            <Section style={buttonContainer}>
              <Link
                style={button}
                href={`https://severiusadventuresandtravel.com/dashboard`}
              >
                View My Bookings
              </Link>
            </Section>

            <Section style={infoBox}>
              <Text style={infoText}>
                <strong>📄 Download Your Receipt</strong><br />
                Your official receipt is available in your dashboard.
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Contact Info */}
            <Heading style={h2}>Questions or Special Requests?</Heading>
            <Text style={text}>
              We're here to make your experience unforgettable:
            </Text>
            <Text style={contactText}>
              📧 Email: info@severiusadventuresandtravel.com<br />
              📱 Phone: +254 780 419 605<br />
              💬 WhatsApp: +254 780 419 605
            </Text>

            <Text style={thankYouText}>
              Thank you for choosing Severius Adventures & Travel. We can't wait to show you 
              the wonders of Africa!
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2025 Severius Adventures & Travel. All rights reserved.
            </Text>
            <Text style={footerText}>
              <Link href="https://severiusadventuresandtravel.com" style={footerLink}>
                Visit Website
              </Link>
              {' | '}
              <Link href="https://severiusadventuresandtravel.com/booking-policy" style={footerLink}>
                Booking Policy
              </Link>
              {' | '}
              <Link href="https://severiusadventuresandtravel.com/contact" style={footerLink}>
                Contact Us
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PaymentConfirmationEmail;

// Styles
const main = {
  backgroundColor: '#f5f3f1',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '600px',
};

const logoSection = {
  background: 'linear-gradient(135deg, rgb(78, 52, 46) 0%, rgb(212, 175, 55) 100%)',
  padding: '40px 20px',
  textAlign: 'center' as const,
};

const logoImage = {
  margin: '0 auto',
  display: 'block',
};

const header = {
  textAlign: 'center' as const,
  padding: '30px 20px',
};

const logo = {
  margin: '0 auto',
};

const heading = {
  color: '#4e342e',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '10px 0 0 0',
};

const successBadge = {
  backgroundColor: '#10b981',
  padding: '12px',
  textAlign: 'center' as const,
  margin: '0 20px 20px 20px',
  borderRadius: '8px',
};

const successText = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const content = {
  padding: '0 40px 40px',
};

const h1 = {
  color: '#4e342e',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '30px 0 15px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#4e342e',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '25px 0 15px',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '10px 0',
};

const contactText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '28px',
  margin: '10px 0',
};

const thankYouText = {
  color: '#4e342e',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '25px 0',
  fontStyle: 'italic' as const,
  textAlign: 'center' as const,
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '25px 0',
};

const detailsTable = {
  width: '100%',
  margin: '15px 0',
};

const labelCell = {
  color: '#6b7280',
  fontSize: '14px',
  padding: '8px 0',
  width: '40%',
};

const valueCell = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: '500' as const,
  padding: '8px 0',
};

const amountCell = {
  color: '#d4af37',
  fontSize: '18px',
  fontWeight: 'bold' as const,
  padding: '8px 0',
};

const paidCell = {
  color: '#10b981',
  fontSize: '14px',
  fontWeight: 'bold' as const,
  padding: '8px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#d4af37',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '14px 40px',
};

const infoBox = {
  backgroundColor: '#fef3c7',
  border: '1px solid #fbbf24',
  borderRadius: '8px',
  padding: '15px',
  margin: '20px 0',
};

const infoText = {
  color: '#92400e',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const footer = {
  backgroundColor: '#f9fafb',
  padding: '20px 40px',
  textAlign: 'center' as const,
  marginTop: '20px',
};

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '5px 0',
};

const footerLink = {
  color: '#d4af37',
  textDecoration: 'underline',
};
