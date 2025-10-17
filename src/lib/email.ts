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
  const subject = 'Welcome to Severius Tours Newsletter! 📬';
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
          .footer {
            background: #f5f5f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 12px 12px;
          }
          .benefits {
            background: #FFF9E6;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">📬 Welcome to Our Newsletter!</h1>
        </div>
        <div class="content">
          <h2 style="color: #4E342E;">You're In! 🎉</h2>
          <p>Thank you for subscribing to the Severius Tours newsletter!</p>
          
          <div class="benefits">
            <strong>Here's what you'll receive:</strong>
            <ul>
              <li>🌍 Exclusive travel deals and promotions</li>
              <li>✈️ New tour announcements</li>
              <li>📸 Travel inspiration and tips</li>
              <li>🎁 Special subscriber-only offers</li>
            </ul>
          </div>

          <p>Stay tuned for amazing travel opportunities coming your way!</p>
          
          <p style="margin-top: 30px;">
            Happy travels,<br>
            <strong>The Severius Tours Team</strong>
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Severius Tours. All rights reserved.</p>
          <p><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/unsubscribe">Unsubscribe</a></p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to, subject, html });
}

export default resend;
