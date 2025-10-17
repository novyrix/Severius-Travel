# Severius Travel - Deployment Guide

Complete guide for deploying the Severius Travel booking platform to Vercel with Neon PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Neon database (already configured)

### Deploy in 5 Minutes

1. **Push to GitHub** (already done)
2. **Import to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Click "Deploy"

3. **Add Environment Variables** in Vercel Dashboard
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env` file (see below)

4. **Redeploy** - Vercel will automatically build and deploy

---

## 📝 Environment Variables

Add these in **Vercel Dashboard → Settings → Environment Variables**:

### Database (Required)
```env
DATABASE_URL=postgresql://neondb_owner:npg_Zrf0HRodlN1M@ep-calm-meadow-adxwkbqe-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_Zrf0HRodlN1M@ep-calm-meadow-adxwkbqe.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Authentication (Required)
```env
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=Si3TsMQwuiepvnkHQIn2M6N3k8oI7GG9Rso0dN/pFYY=
```

### Site Configuration (Required)
```env
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=254780419605
NEXT_PUBLIC_CONTACT_EMAIL=info@severiusadventuresandtravel.com
NEXT_PUBLIC_CONTACT_PHONE=+254 780419605
NEXT_PUBLIC_CONTACT_PHONE_DISPLAY=+254 780419605
```

### Email Service (Required for notifications)
```env
RESEND_API_KEY=re_LKgpXZvB_997umBeGtFkLaAZo1XTk7U2a
```

### Payment Gateway (Required for bookings)
```env
PESAPAL_CONSUMER_KEY=3RH7aAXjJ1gQmRoFlZyw5HyE1mXoQuph
PESAPAL_CONSUMER_SECRET=3pM0jNmn0H/L8u/Nei+EvjcnrlM=
PESAPAL_IPN_URL=https://your-project.vercel.app/api/payments/callback
PESAPAL_ENVIRONMENT=sandbox
```

### Optional (for blog images)
```env
UNSPLASH_ACCESS_KEY=mcC1D3wGPUrzevXZxXKGs9-7KpzYY6vpjM3NwBOt-aA
UNSPLASH_SECRET_KEY=MGWvc7sXxsRWKA7IcTVWw8RYa-7EgnPmlCcuUWx-Axk
```

**⚠️ Important:**
- Replace `https://your-project.vercel.app` with your actual Vercel URL
- Add as **plain text** (do NOT check "Secret" box)
- Select **all 3 environments**: Production, Preview, Development

---

## 🗄️ Database Information

**Provider:** Neon PostgreSQL (Serverless)  
**Status:** ✅ Configured and Seeded  
**Region:** US East 1 (AWS)

### Test Accounts
- **Admin:** `admin@sevadv.com` / `Admin123!`
- **User:** `user@test.com` / `User123!`

### Database Features
- ✅ Connection pooling (pgbouncer)
- ✅ Auto-scaling
- ✅ Auto-pause on inactivity
- ✅ Fast global connections

---

## 🏗️ Build Configuration

### Vercel Settings (already configured in vercel.json)
```json
{
  "buildCommand": "prisma generate && prisma migrate deploy && next build",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Build Process
1. Generate Prisma Client
2. Run database migrations
3. Build Next.js app
4. Deploy to Vercel edge network

---

## ✅ Post-Deployment Checklist

After successful deployment:

- [ ] Visit your site URL
- [ ] Test user registration/login
- [ ] Browse tours
- [ ] Test booking flow
- [ ] Check admin panel (`/admin`)
- [ ] Verify email notifications
- [ ] Test payment gateway (sandbox mode)

---

## 🔧 Troubleshooting

### Build Fails
**Check Vercel build logs:**
1. Go to Vercel Dashboard → Deployments
2. Click failed deployment
3. View "Build Logs"

**Common issues:**
- Missing environment variables
- Database connection errors
- TypeScript compilation errors

### Database Connection Errors
- Verify `DATABASE_URL` is set correctly
- Check Neon database is active
- Ensure SSL mode is `require`

### Migration Errors
- Check `DIRECT_URL` is set (non-pooled connection)
- Verify database has no conflicting tables
- Check migration files are committed to git

---

## 📚 Project Structure

```
severius-travel/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   ├── [locale]/     # Internationalized pages
│   │   └── admin/        # Admin dashboard
│   ├── components/       # React components
│   ├── lib/             # Utilities and helpers
│   └── styles/          # Global styles
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── public/              # Static assets
└── messages/            # i18n translations
```

---

## 🌐 Features

- ✅ Multi-language support (EN, ES, FR)
- ✅ Tour booking system
- ✅ Payment integration (PesaPal)
- ✅ Admin dashboard
- ✅ Blog/CMS
- ✅ Email notifications
- ✅ WhatsApp integration
- ✅ SEO optimized
- ✅ Mobile responsive
- ✅ Progressive Web App (PWA)

---

## 🔐 Security

- ✅ HTTPS enforced
- ✅ Secure authentication (NextAuth.js)
- ✅ CSRF protection
- ✅ XSS protection headers
- ✅ Rate limiting on API routes
- ✅ SQL injection prevention (Prisma ORM)

---

## 📊 Performance

- ✅ Edge caching
- ✅ Image optimization
- ✅ Static generation where possible
- ✅ Database connection pooling
- ✅ Lazy loading components

---

## 🆘 Support

**Issues?**
- Check build logs in Vercel
- Review environment variables
- Check database connection
- Contact support: info@severiusadventuresandtravel.com

**Resources:**
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

---

## 📝 Notes

- Database migrations run automatically on each deployment
- Prisma Client is generated during build
- Environment variables can be updated without redeployment
- Use Preview deployments for testing changes

---

**Last Updated:** October 17, 2025  
**Status:** ✅ Production Ready
