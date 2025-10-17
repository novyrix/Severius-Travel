# Production Deployment Checklist

## 🚨 CRITICAL STEPS - DO THIS FIRST

### 1. Add Environment Variables to Vercel

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these **exactly** as shown (select all 3 environments: Production, Preview, Development):

```env
# Database (CRITICAL - App won't work without these)
DATABASE_URL=postgresql://neondb_owner:npg_Zrf0HRodlN1M@ep-calm-meadow-adxwkbqe-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_Zrf0HRodlN1M@ep-calm-meadow-adxwkbqe.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

# Authentication (CRITICAL)
NEXTAUTH_URL=https://your-actual-vercel-url.vercel.app
NEXTAUTH_SECRET=Si3TsMQwuiepvnkHQIn2M6N3k8oI7GG9Rso0dN/pFYY=

# Site URLs (CRITICAL)
NEXT_PUBLIC_SITE_URL=https://your-actual-vercel-url.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=254780419605
NEXT_PUBLIC_CONTACT_EMAIL=info@severiusadventuresandtravel.com
NEXT_PUBLIC_CONTACT_PHONE=+254 780419605
NEXT_PUBLIC_CONTACT_PHONE_DISPLAY=+254 780419605

# Email (CRITICAL - Without this, emails won't send!)
RESEND_API_KEY=re_LKgpXZvB_997umBeGtFkLaAZo1XTk7U2a

# Payment Gateway
PESAPAL_CONSUMER_KEY=3RH7aAXjJ1gQmRoFlZyw5HyE1mXoQuph
PESAPAL_CONSUMER_SECRET=3pM0jNmn0H/L8u/Nei+EvjcnrlM=
PESAPAL_IPN_URL=https://your-actual-vercel-url.vercel.app/api/payments/callback
PESAPAL_ENVIRONMENT=sandbox

# Optional (for blog images)
UNSPLASH_ACCESS_KEY=mcC1D3wGPUrzevXZxXKGs9-7KpzYY6vpjM3NwBOt-aA
UNSPLASH_SECRET_KEY=MGWvc7sXxsRWKA7IcTVWw8RYa-7EgnPmlCcuUWx-Axk
```

⚠️ **IMPORTANT**: Replace `https://your-actual-vercel-url.vercel.app` with your actual Vercel deployment URL!

---

### 2. Seed the Production Database

After deployment succeeds, you MUST seed the database:

**Option A: Use Vercel CLI** (Recommended)
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Run seed command on production
vercel env pull .env.production
npx tsx prisma/seed.ts
```

**Option B: Temporary API Route** (Easier)

Create a temporary seeding endpoint:

1. Go to Vercel Dashboard → Deployments → Latest → Functions
2. Create a new file: `src/app/api/seed/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashSync } from 'bcryptjs';

export async function GET(request: Request) {
  // Add basic authentication
  const authHeader = request.headers.get('authorization');
  if (authHeader !== 'Bearer YOUR_SECRET_KEY_HERE') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Copy the entire seed.ts logic here
    // Then visit: https://your-app.vercel.app/api/seed
    // With header: Authorization: Bearer YOUR_SECRET_KEY_HERE
    
    return NextResponse.json({ success: true, message: 'Database seeded!' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

3. Visit: `https://your-app.vercel.app/api/seed` with authorization header
4. **DELETE THIS FILE AFTER SEEDING!**

---

### 3. Verify Email Setup (Resend)

Your Resend API key is: `re_LKgpXZvB_997umBeGtFkLaAZo1XTk7U2a`

**Check Resend Dashboard**:
1. Go to https://resend.com/
2. Verify your domain or use their test domain
3. Confirm the API key is active
4. Check sending limits (free tier = 100 emails/day)

**Test Email Sending**:
```bash
# Test locally first
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-email@example.com",
    "password": "Test123!"
  }'
```

Check your email inbox and Resend logs.

---

### 4. Post-Deployment Checks

✅ **Test these features**:

1. **Registration Flow**:
   - Go to `/register`
   - Create account
   - Check email for verification link ✉️
   - Click verification link
   - Should redirect to login

2. **Tour Pages**:
   - Go to `/tours`
   - Click on "Maasai Mara Safari"
   - Should see full details, highlights, itinerary
   - Check booking button works

3. **Database Check**:
   - Go to `/admin` (login with admin@sevadv.com / Admin123!)
   - Check if tours are visible
   - Should see 5 tours listed

4. **Booking Flow**:
   - Try booking a tour
   - Should create booking record
   - Should redirect to payment

---

## 🔥 Common Issues & Fixes

### Issue: "Tour page shows no details"
**Cause**: Database not seeded on production  
**Fix**: Run seed command (see step 2 above)

### Issue: "Emails not sending"
**Causes**:
- RESEND_API_KEY not in Vercel env vars
- Resend domain not verified
- API key expired or invalid

**Fix**:
1. Add RESEND_API_KEY to Vercel
2. Verify domain in Resend dashboard
3. Check Resend logs for errors

### Issue: "401 on site.webmanifest"
**Cause**: File was missing  
**Fix**: Already added in latest commit ✅

### Issue: "Registration gives 404"
**Cause**: verify-email-sent page missing  
**Fix**: Already added in latest commit ✅

### Issue: "Can't login after registration"
**Cause**: Email not verified, or NEXTAUTH_SECRET mismatch  
**Fix**:
1. Check email verification
2. Ensure NEXTAUTH_SECRET same in Vercel as local
3. Check NEXTAUTH_URL matches your Vercel URL

---

## 📋 Final Checklist

Before going live:

- [ ] All environment variables added to Vercel
- [ ] Production database seeded with tours
- [ ] Email sending tested and working
- [ ] Registration flow tested end-to-end
- [ ] Tour pages display full details
- [ ] Booking flow tested
- [ ] Admin panel accessible
- [ ] Payment gateway configured
- [ ] Custom domain connected (if applicable)
- [ ] SSL certificate active

---

## 🆘 Still Having Issues?

1. **Check Vercel build logs**: Dashboard → Deployments → View Log
2. **Check runtime logs**: Dashboard → Deployments → Functions → Logs
3. **Check database**: Use Prisma Studio or database console
4. **Test locally first**: `npm run dev` and test all features

---

## 🚀 Quick Commands Reference

```bash
# Rebuild and redeploy
git add .
git commit -m "Update"
git push origin main

# Seed production database (via Vercel CLI)
vercel env pull
tsx prisma/seed.ts

# View production logs
vercel logs

# Check database
npx prisma studio
```

---

**Last Updated**: October 18, 2025  
**Status**: Ready for production deployment
