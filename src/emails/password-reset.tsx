import * as React from 'react';

interface PasswordResetEmailProps {
  resetUrl: string;
  userEmail: string;
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
  resetUrl,
  userEmail,
}) => (
  <html>
    <head>
      <style>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
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
          color: #ffffff;
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        .content {
          padding: 40px 30px;
        }
        .content p {
          margin: 0 0 16px;
          color: #555555;
        }
        .button-container {
          text-align: center;
          margin: 32px 0;
        }
        .button {
          display: inline-block;
          padding: 14px 32px;
          background: linear-gradient(135deg, rgb(101, 67, 33) 0%, rgb(184, 134, 11) 100%);
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          transition: opacity 0.2s;
        }
        .button:hover {
          opacity: 0.9;
        }
        .info-box {
          background-color: #fff9e6;
          border-left: 4px solid rgb(184, 134, 11);
          padding: 16px;
          margin: 24px 0;
          border-radius: 4px;
        }
        .info-box p {
          margin: 0;
          font-size: 14px;
          color: #856404;
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
          background-color: #eeeeee;
          margin: 24px 0;
        }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <h1>🔐 Password Reset Request</h1>
        </div>
        
        <div className="content">
          <p>Hello,</p>
          
          <p>
            We received a request to reset the password for your Severius Adventures & Travel account
            associated with <strong>{userEmail}</strong>.
          </p>
          
          <p>
            Click the button below to reset your password. This link will expire in <strong>1 hour</strong> for security reasons.
          </p>
          
          <div className="button-container">
            <a href={resetUrl} className="button">
              Reset Your Password
            </a>
          </div>
          
          <div className="info-box">
            <p>
              <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, 
              please ignore this email or contact our support team immediately. 
              Your password will remain unchanged.
            </p>
          </div>
          
          <div className="divider"></div>
          
          <p style={{ fontSize: '14px', color: '#888888' }}>
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p style={{ 
            fontSize: '12px', 
            color: '#0066cc', 
            wordBreak: 'break-all',
            backgroundColor: '#f5f5f5',
            padding: '8px',
            borderRadius: '4px'
          }}>
            {resetUrl}
          </p>
        </div>
        
        <div className="footer">
          <p><strong>Severius Adventures & Travel</strong></p>
          <p>Your trusted partner for unforgettable adventures</p>
          <p style={{ marginTop: '16px' }}>
            Need help? Contact us at{' '}
            <a href="mailto:support@severiusadventuresandtravel.com">
              support@severiusadventuresandtravel.com
            </a>
          </p>
          <p style={{ marginTop: '12px', fontSize: '11px' }}>
            This is an automated email. Please do not reply to this message.
          </p>
        </div>
      </div>
    </body>
  </html>
);

export default PasswordResetEmail;
