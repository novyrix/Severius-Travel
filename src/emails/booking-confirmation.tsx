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

interface BookingConfirmationEmailProps {
  customerName: string;
  userEmail?: string;
  tourName: string;
  bookingRef: string;
  amount: number;
  currency: string;
  bookingDate: string;
  tourDuration: string;
  tourLocation: string;
}

export const BookingConfirmationEmail = ({
  customerName = 'Valued Customer',
  userEmail,
  tourName = 'Amazing Safari Adventure',
  bookingRef = 'SEV-123456',
  amount = 150000,
  currency = 'KES',
  bookingDate = 'January 15, 2025',
  tourDuration = '5 Days',
  tourLocation = 'Maasai Mara, Kenya',
}: BookingConfirmationEmailProps) => {
  const previewText = `Booking Confirmation - ${bookingRef}`;

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
            <Text style={successText}>✓ Booking Confirmed</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Thank You for Your Booking!</Heading>
            <Text style={text}>
              Dear {customerName},
            </Text>
            <Text style={text}>
              We're thrilled to confirm your booking with Severius Adventures & Travel. 
              Your adventure awaits!
            </Text>

            <Hr style={hr} />

            {/* Booking Details */}
            <Heading style={h2}>Booking Details</Heading>
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
                <td style={labelCell}>Location:</td>
                <td style={valueCell}>{tourLocation}</td>
              </tr>
              <tr>
                <td style={labelCell}>Duration:</td>
                <td style={valueCell}>{tourDuration}</td>
              </tr>
              <tr>
                <td style={labelCell}>Booking Date:</td>
                <td style={valueCell}>{bookingDate}</td>
              </tr>
              <tr>
                <td style={labelCell}>Total Amount:</td>
                <td style={amountCell}>{currency} {amount.toLocaleString()}</td>
              </tr>
            </table>

            <Hr style={hr} />

            {/* Next Steps */}
            <Heading style={h2}>What's Next?</Heading>
            <Text style={text}>
              1. <strong>Complete Payment:</strong> Please complete your payment to confirm your tour.
            </Text>
            <Text style={text}>
              2. <strong>Receive Itinerary:</strong> We'll send you a detailed itinerary once payment is confirmed.
            </Text>
            <Text style={text}>
              3. <strong>Prepare for Adventure:</strong> Check your email for pre-departure information.
            </Text>

            <Section style={buttonContainer}>
              <Link
                style={button}
                href={`https://severiusadventuresandtravel.com/payment/${bookingRef}`}
              >
                Complete Payment
              </Link>
            </Section>

            <Hr style={hr} />

            {/* Contact Info */}
            <Heading style={h2}>Need Help?</Heading>
            <Text style={text}>
              Our team is here to assist you 24/7:
            </Text>
            <Text style={contactText}>
              📧 Email: info@severiusadventuresandtravel.com<br />
              📱 Phone: +254 780 419 605<br />
              💬 WhatsApp: +254 780 419 605
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
              <Link href="https://severiusadventuresandtravel.com/terms" style={footerLink}>
                Terms
              </Link>
              {' | '}
              <Link href="https://severiusadventuresandtravel.com/privacy" style={footerLink}>
                Privacy
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingConfirmationEmail;

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
  backgroundColor: '#d4af37',
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
