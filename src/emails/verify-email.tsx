import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerifyEmailProps {
  userName?: string;
  userEmail?: string;
  verificationUrl: string;
}

export const VerifyEmail = ({
  userName = 'Traveler',
  userEmail,
  verificationUrl,
}: VerifyEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your email to access your Severius Adventures account</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Logo Section */}
        <Section style={logoSection}>
          <Img
            src="https://severiusadventuresandtravel.com/images/logo.png"
            alt="Severius Adventures & Travel"
            width="200"
            height="auto"
            style={logo}
          />
        </Section>
        
        <Section style={contentSection}>
          <Heading style={h1}>Verify Your Email Address</Heading>
          
          <Text style={text}>
            Hello <strong>{userName}</strong>,
          </Text>
          
          <Text style={text}>
            Thank you for registering with Severius Adventures & Travel! We're excited to have you join our community of adventure seekers.
          </Text>
          
          <Text style={text}>
            To complete your registration and access your dashboard, please verify your email address by clicking the button below:
          </Text>
          
          <Section style={buttonContainer}>
            <Button style={button} href={verificationUrl}>
              Verify Email Address
            </Button>
          </Section>
          
          <Text style={text}>
            This verification link will expire in <strong>24 hours</strong> for security purposes.
          </Text>
          
          <Text style={smallText}>
            If you didn't create an account with Severius Adventures & Travel, you can safely ignore this email.
          </Text>
          
          <Section style={divider} />
          
          <Text style={smallText}>
            Or copy and paste this URL into your browser:
          </Text>
          <Link href={verificationUrl} style={link}>
            {verificationUrl}
          </Link>
        </Section>
        
        <Section style={footer}>
          <Text style={footerText}>
            Severius Adventures & Travel
          </Text>
          <Text style={footerText}>
            Email: info@severiusadventuresandtravel.com
          </Text>
          <Text style={footerText}>
            Phone: +254 780419605
          </Text>
          <Text style={footerText}>
            © {new Date().getFullYear()} Severius Adventures & Travel. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default VerifyEmail;

const main = {
  backgroundColor: '#f6f6f6',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const logoSection = {
  background: 'linear-gradient(135deg, rgb(78, 52, 46) 0%, rgb(212, 175, 55) 100%)',
  padding: '40px 20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
  display: 'block',
};

const logoContainer = {
  background: 'linear-gradient(135deg, rgb(78, 52, 46) 0%, rgb(212, 175, 55) 100%)',
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: '0',
  textAlign: 'center' as const,
};

const contentSection = {
  padding: '32px 40px',
};

const h1 = {
  color: '#4e342e',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const text = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const smallText = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '12px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#d4af37',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 40px',
};

const link = {
  color: '#d4af37',
  fontSize: '14px',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
};

const divider = {
  borderTop: '1px solid #e0e0e0',
  margin: '32px 0',
};

const footer = {
  backgroundColor: '#f9f9f9',
  padding: '20px 40px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#666666',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '4px 0',
};
