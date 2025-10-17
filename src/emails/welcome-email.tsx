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

interface WelcomeEmailProps {
  customerName: string;
  userEmail?: string;
}

export const WelcomeEmail = ({
  customerName = 'Traveler',
  userEmail,
}: WelcomeEmailProps) => {
  const previewText = 'Welcome to Severius Adventures & Travel!';

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

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Welcome Aboard! 🎉</Heading>
            <Text style={text}>
              Dear {customerName},
            </Text>
            <Text style={text}>
              Welcome to Severius Adventures & Travel! We're thrilled to have you join our 
              community of adventurous travelers exploring the wonders of Africa and beyond.
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightText}>
                Your journey to unforgettable experiences starts here!
              </Text>
            </Section>

            <Hr style={hr} />

            {/* What We Offer */}
            <Heading style={h2}>What You Can Expect</Heading>
            
            <Section style={featureBox}>
              <Text style={featureTitle}>🌍 Authentic Adventures</Text>
              <Text style={featureText}>
                From the Maasai Mara to the Pyramids of Egypt, we curate experiences 
                that bring you closer to Africa's heart.
              </Text>
            </Section>

            <Section style={featureBox}>
              <Text style={featureTitle}>🏆 Expert Guidance</Text>
              <Text style={featureText}>
                Our experienced guides ensure every moment is safe, meaningful, and memorable.
              </Text>
            </Section>

            <Section style={featureBox}>
              <Text style={featureTitle}>🎯 Personalized Service</Text>
              <Text style={featureText}>
                We tailor each journey to your interests, pace, and style.
              </Text>
            </Section>

            <Section style={featureBox}>
              <Text style={featureTitle}>💎 Best Value</Text>
              <Text style={featureText}>
                Premium experiences at competitive prices, with no hidden fees.
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Quick Links */}
            <Heading style={h2}>Ready to Explore?</Heading>
            <Text style={text}>
              Browse our curated tours and find your next adventure:
            </Text>

            <Section style={buttonContainer}>
              <Link style={button} href="https://severiusadventuresandtravel.com/tours">
                Explore Tours
              </Link>
            </Section>

            <Section style={linksContainer}>
              <Link style={link} href="https://severiusadventuresandtravel.com/tours?region=AF">
                🦁 Africa Safaris
              </Link>
              {' • '}
              <Link style={link} href="https://severiusadventuresandtravel.com/tours?region=EU">
                🏰 Europe Tours
              </Link>
              {' • '}
              <Link style={link} href="https://severiusadventuresandtravel.com/tours?region=AS">
                🏯 Asia Adventures
              </Link>
            </Section>

            <Hr style={hr} />

            {/* Contact Info */}
            <Heading style={h2}>Get in Touch</Heading>
            <Text style={text}>
              Have questions? Our team is here to help 24/7:
            </Text>
            <Text style={contactText}>
              📧 Email: info@severiusadventuresandtravel.com<br />
              📱 Phone: +254 780 419 605<br />
              💬 WhatsApp: +254 780 419 605
            </Text>

            <Section style={socialBox}>
              <Text style={socialTitle}>Follow Our Adventures:</Text>
              <Link style={socialLink} href="https://www.facebook.com/severiustravels/">
                Facebook
              </Link>
              {' | '}
              <Link style={socialLink} href="https://www.instagram.com/severiustravels/">
                Instagram
              </Link>
              {' | '}
              <Link style={socialLink} href="https://www.tiktok.com/@severius.travels">
                TikTok
              </Link>
            </Section>

            <Text style={signOff}>
              Looking forward to making your travel dreams come true!
            </Text>
            <Text style={signature}>
              <strong>The Severius Travel Team</strong>
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
              <Link href="https://severiusadventuresandtravel.com/about" style={footerLink}>
                About Us
              </Link>
              {' | '}
              <Link href="https://severiusadventuresandtravel.com/contact" style={footerLink}>
                Contact
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

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
  padding: '40px 20px',
  background: 'linear-gradient(135deg, #4e342e 0%, #d4af37 100%)',
};

const logo = {
  margin: '0 auto',
  filter: 'brightness(0) invert(1)',
};

const heading = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '15px 0 0 0',
};

const content = {
  padding: '0 40px 40px',
};

const h1 = {
  color: '#4e342e',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '30px 0 15px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#4e342e',
  fontSize: '22px',
  fontWeight: 'bold',
  margin: '30px 0 15px',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '12px 0',
};

const contactText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '28px',
  margin: '15px 0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '30px 0',
};

const highlightBox = {
  backgroundColor: '#fef3c7',
  borderLeft: '4px solid #d4af37',
  padding: '20px',
  margin: '25px 0',
};

const highlightText = {
  color: '#4e342e',
  fontSize: '18px',
  fontWeight: 'bold' as const,
  margin: '0',
  textAlign: 'center' as const,
};

const featureBox = {
  margin: '20px 0',
};

const featureTitle = {
  color: '#4e342e',
  fontSize: '16px',
  fontWeight: 'bold' as const,
  margin: '0 0 5px 0',
};

const featureText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
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

const linksContainer = {
  textAlign: 'center' as const,
  margin: '20px 0',
};

const link = {
  color: '#d4af37',
  fontSize: '14px',
  textDecoration: 'none',
  fontWeight: '500' as const,
};

const socialBox = {
  textAlign: 'center' as const,
  margin: '25px 0',
  padding: '20px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
};

const socialTitle = {
  color: '#4e342e',
  fontSize: '14px',
  fontWeight: 'bold' as const,
  margin: '0 0 10px 0',
};

const socialLink = {
  color: '#d4af37',
  fontSize: '14px',
  textDecoration: 'none',
  fontWeight: '500' as const,
};

const signOff = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '30px 0 10px 0',
  textAlign: 'center' as const,
};

const signature = {
  color: '#4e342e',
  fontSize: '16px',
  textAlign: 'center' as const,
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
