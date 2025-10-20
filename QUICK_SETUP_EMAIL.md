# Quick Setup Guide - Email Integration

## 🚀 5-Minute Setup for Password Reset Emails

### Step 1: Get Resend API Key (2 minutes)

1. Go to **[resend.com](https://resend.com)** and sign up/login
2. Click **API Keys** in the sidebar
3. Click **Create API Key**
4. Copy the key (starts with `re_`)

### Step 2: Verify Your Domain (1 minute)

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter: `severiusadventuresandtravel.com`
4. Follow DNS instructions to verify ownership
5. Wait for verification (usually instant)

### Step 3: Add to Vercel (1 minute)

1. Go to **[vercel.com/dashboard](https://vercel.com/dashboard)**
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```env
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=Severius Travel <noreply@severiusadventuresandtravel.com>
```

5. Click **Save**

### Step 4: Redeploy (1 minute)

1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. OR: Push any commit to trigger auto-deployment

---

## ✅ Verify It Works

1. Go to your live site: `https://severiusadventuresandtravel.com/forgot-password`
2. Enter a test email address
3. Check your inbox
4. You should receive a professional email with a reset link

---

## 📧 Email Template Preview

Your users will receive an email like this:

```
┌────────────────────────────────────────┐
│  🔐 Password Reset Request             │
│  [Brown & Gold Gradient Header]       │
└────────────────────────────────────────┘

Hello,

We received a request to reset the password 
for your Severius Adventures & Travel account
associated with user@example.com.

Click the button below to reset your password.
This link will expire in 1 hour for security
reasons.

┌─────────────────────────────────┐
│  [Reset Your Password] Button   │
└─────────────────────────────────┘

⚠️ Security Notice: If you didn't request
this password reset, please ignore this email
or contact our support team immediately.

────────────────────────────────────────

If the button doesn't work, copy this link:
https://severiusadventuresandtravel.com/reset-password?token=xxx

────────────────────────────────────────

Severius Adventures & Travel
Your trusted partner for unforgettable adventures

Need help? Contact: support@severiusadventuresandtravel.com
```

---

## 🔧 Troubleshooting

### "Email not arriving"
- Check spam/junk folder
- Verify domain is verified in Resend
- Check Resend dashboard for delivery status
- Ensure `RESEND_API_KEY` is correct

### "Domain not verified"
- Add DNS records as shown in Resend
- Wait 5-10 minutes for DNS propagation
- Use Resend's verification check button

### "Still using development URL"
- Ensure `NEXTAUTH_URL` is set to production URL
- Clear Next.js build cache
- Redeploy the application

---

## 💰 Pricing (Resend)

- **Free tier**: 3,000 emails/month
- **Pro tier**: $20/month for 50,000 emails
- **More info**: [resend.com/pricing](https://resend.com/pricing)

For most travel businesses, the free tier is sufficient.

---

## 📊 Monitoring

View email statistics in Resend dashboard:
- Delivery rate
- Open rate (if tracking enabled)
- Bounce rate
- Spam complaints

---

## 🎯 What Happens Without Setup?

If you deploy without Resend API key:

- Password reset tokens still generate ✅
- Tokens stored in database ✅
- Users receive success message ✅
- **But**: No email is sent ❌

In development mode:
- Reset URL shown in console ✅
- Reset URL in API response ✅
- Can copy/paste for testing ✅

---

## 📝 Quick Command Reference

```bash
# Test email sending locally
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Check environment variables in Vercel
vercel env ls

# Add environment variable
vercel env add RESEND_API_KEY

# Redeploy
vercel --prod
```

---

## ✨ That's It!

Once set up, your password reset system is:
- ✅ Fully automated
- ✅ Professional looking
- ✅ Secure (1-hour expiry)
- ✅ Mobile-friendly
- ✅ Monitored (via Resend dashboard)

No manual intervention required!

---

**Need help?** Check `AUTH_REDIRECT_EMAIL_FIXES.md` for detailed documentation.
