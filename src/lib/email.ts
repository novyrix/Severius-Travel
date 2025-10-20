import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender email (should be verified in Resend)
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@severiustours.com';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email using Resend
 */
export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️  RESEND_API_KEY not configured. Email not sent.');
    console.log('📧 Would send email:', { to, subject });
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text: text || undefined,
    });

    console.log('✅ Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error };
  }
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(to: string, name: string) {
  const subject = 'Welcome to Severius Tours! 🌍';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #4E342E 0%, #D4AF37 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            border-radius: 12px 12px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 40px 30px;
            border: 1px solid #e0e0e0;
            border-top: none;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #D4AF37 0%, #4E342E 100%);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            background: #f5f5f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 12px 12px;
          }
          .highlight {
            background: #FFF9E6;
            padding: 20px;
            border-left: 4px solid #D4AF37;
            margin: 20px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">Welcome to Severius Tours!</h1>
        </div>
        <div class="content">
          <h2 style="color: #4E342E;">Hello ${name}! 👋</h2>
          <p>Thank you for joining Severius Tours! We're thrilled to have you as part of our travel community.</p>
          
          <div class="highlight">
            <strong>🌍 What's Next?</strong>
            <ul>
              <li>Explore our curated tour packages</li>
              <li>Book your dream adventure</li>
              <li>Get exclusive travel tips and deals</li>
            </ul>
          </div>

          <p>Ready to start your journey? Browse our featured tours:</p>
          
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/tours" class="button">
            Explore Tours
          </a>

          <p>If you have any questions, our team is here to help!</p>
          
          <p style="margin-top: 30px;">
            Safe travels,<br>
            <strong>The Severius Tours Team</strong>
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Severius Tours. All rights reserved.</p>
          <p>You're receiving this email because you created an account with us.</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmation(
  to: string,
  name: string,
  booking: {
    ref: string;
    tourTitle: string;
    amount: number;
    date: Date;
  }
) {
  const subject = `Booking Confirmed: ${booking.tourTitle} 🎉`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #4E342E 0%, #D4AF37 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            border-radius: 12px 12px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 40px 30px;
            border: 1px solid #e0e0e0;
            border-top: none;
          }
          .booking-details {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #D4AF37 0%, #4E342E 100%);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            background: #f5f5f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 12px 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">🎉 Booking Confirmed!</h1>
        </div>
        <div class="content">
          <h2 style="color: #4E342E;">Hello ${name}!</h2>
          <p>Great news! Your booking has been confirmed. We're excited to help you create unforgettable memories!</p>
          
          <div class="booking-details">
            <h3 style="margin-top: 0; color: #4E342E;">Booking Details</h3>
            <div class="detail-row">
              <strong>Reference Number:</strong>
              <span>${booking.ref}</span>
            </div>
            <div class="detail-row">
              <strong>Tour:</strong>
              <span>${booking.tourTitle}</span>
            </div>
            <div class="detail-row">
              <strong>Amount:</strong>
              <span style="color: #D4AF37; font-weight: bold;">$${booking.amount.toFixed(2)}</span>
            </div>
            <div class="detail-row">
              <strong>Booking Date:</strong>
              <span>${booking.date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>

          <p><strong>📋 Next Steps:</strong></p>
          <ul>
            <li>Check your dashboard for booking details</li>
            <li>You'll receive travel documents 7 days before departure</li>
            <li>Contact us if you have any questions</li>
          </ul>
          
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard" class="button">
            View My Bookings
          </a>

          <p style="margin-top: 30px;">
            Looking forward to your adventure!<br>
            <strong>The Severius Tours Team</strong>
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Severius Tours. All rights reserved.</p>
          <p>Booking Reference: ${booking.ref}</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}

/**
 * Send contact form submission notification
 */
export async function sendContactFormNotification(
  formData: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }
) {
  const subject = `New Contact Form Submission from ${formData.name}`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .field {
            margin: 15px 0;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 6px;
          }
          .label {
            font-weight: bold;
            color: #4E342E;
            display: block;
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2 style="color: #4E342E;">New Contact Form Submission</h2>
          
          <div class="field">
            <span class="label">Name:</span>
            ${formData.name}
          </div>

          <div class="field">
            <span class="label">Email:</span>
            <a href="mailto:${formData.email}">${formData.email}</a>
          </div>

          ${formData.phone ? `
          <div class="field">
            <span class="label">Phone:</span>
            ${formData.phone}
          </div>
          ` : ''}

          <div class="field">
            <span class="label">Message:</span>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${formData.message}</p>
          </div>

          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            Received: ${new Date().toLocaleString()}
          </p>
        </div>
      </body>
    </html>
  `;

  // Send to admin email
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@severiustours.com';
  return sendEmail({ to: adminEmail, subject, html });
}

/**
 * Send newsletter welcome email
 */
export async function sendNewsletterWelcome(to: string) {
  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const subject = 'Welcome to Severius Travel Newsletter! 🌍✈️';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, rgb(101, 67, 33) 0%, rgb(184, 134, 11) 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
          }
          .logo {
            max-width: 180px;
            height: auto;
            margin-bottom: 20px;
          }
          .content {
            padding: 40px 30px;
          }
          .welcome-title {
            color: rgb(101, 67, 33);
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 20px;
            text-align: center;
          }
          .benefits {
            background: linear-gradient(135deg, #FFF9E6 0%, #FFF4D6 100%);
            padding: 24px;
            border-radius: 8px;
            margin: 24px 0;
            border-left: 4px solid rgb(184, 134, 11);
          }
          .benefits h3 {
            color: rgb(101, 67, 33);
            margin: 0 0 16px;
            font-size: 18px;
          }
          .benefits ul {
            margin: 0;
            padding-left: 20px;
          }
          .benefits li {
            margin: 8px 0;
            color: #555555;
          }
          .cta-button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, rgb(101, 67, 33) 0%, rgb(184, 134, 11) 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            margin: 24px 0;
            text-align: center;
          }
          .footer {
            background-color: #f8f8f8;
            padding: 24px 30px;
            text-align: center;
            font-size: 12px;
            color: #888888;
          }
          .footer p {
            margin: 8px 0;
          }
          .footer a {
            color: rgb(101, 67, 33);
            text-decoration: none;
          }
          .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, rgb(184, 134, 11), transparent);
            margin: 24px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${baseUrl}/images/logo/landscape.png" alt="Severius Travel" class="logo" />
            <h1 style="margin: 0; font-size: 32px; font-weight: 700;">Welcome Aboard! 🎉</h1>
          </div>
          
          <div class="content">
            <h2 class="welcome-title">You're Part of the Adventure Now!</h2>
            
            <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">
              Thank you for subscribing to the Severius Travel newsletter! We're thrilled to have you join our community of adventure seekers and travel enthusiasts.
            </p>
            
            <div class="benefits">
              <h3>🌟 Here's What You'll Receive:</h3>
              <ul>
                <li><strong>🦁 Exclusive Safari Deals</strong> - Early access to special promotions and discounts</li>
                <li><strong>✈️ New Tour Announcements</strong> - Be the first to know about exciting new destinations</li>
                <li><strong>📸 Travel Inspiration</strong> - Stunning photos, stories, and tips from across Africa</li>
                <li><strong>🎁 Subscriber-Only Offers</strong> - Special perks just for our newsletter family</li>
                <li><strong>🗺️ Destination Guides</strong> - Expert advice on the best times to visit and what to see</li>
              </ul>
            </div>

            <div class="divider"></div>

            <p style="font-size: 16px; color: #555555; margin-bottom: 24px; text-align: center;">
              Ready to start exploring? Browse our amazing tour packages and find your next adventure!
            </p>

            <div style="text-align: center;">
              <a href="${baseUrl}/tours" class="cta-button">
                🌍 Explore Our Tours
              </a>
            </div>

            <div class="divider"></div>
            
            <p style="margin-top: 30px; color: #666666;">
              <strong>Stay tuned</strong> for amazing travel opportunities, insider tips, and exclusive deals coming your way!
            </p>

            <p style="margin-top: 24px; color: #888888; font-size: 14px;">
              Happy travels,<br>
              <strong style="color: rgb(101, 67, 33); font-size: 16px;">The Severius Travel Team</strong>
            </p>
          </div>
          
          <div class="footer">
            <p><strong>Severius Adventures & Travel</strong></p>
            <p>Your trusted partner for unforgettable African adventures</p>
            <p style="margin-top: 16px;">
              📧 <a href="mailto:info@severiusadventuresandtravel.com">info@severiusadventuresandtravel.com</a> | 
              📞 +254 780 419 605
            </p>
            <p style="margin-top: 12px; font-size: 11px; color: #aaa;">
              © ${new Date().getFullYear()} Severius Adventures & Travel. All rights reserved.
            </p>
            <p style="margin-top: 8px;">
              <a href="${baseUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(to)}">Unsubscribe</a> | 
              <a href="${baseUrl}/privacy">Privacy Policy</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}

export default resend;
