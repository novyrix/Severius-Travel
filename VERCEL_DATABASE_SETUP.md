# ✅ Vercel Postgres Database Setup Complete

## 🎉 Your Database Credentials

You've successfully created a Vercel Postgres database! Here's how to configure it:

---

## 🔐 Environment Variables for Vercel

Add these **exact variables** to your Vercel project:

### In Vercel Dashboard → Settings → Environment Variables:

```bash
# Database URLs (Prisma Accelerate)
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza190M0VYMHp3aDQ4N1ZEYlZ6aDAyR2IiLCJhcGlfa2V5IjoiMDFLN1NRREtUU0hQUDZDU0hTMjZQTTFaNFciLCJ0ZW5hbnRfaWQiOiJmY2EzNzQ1NTBiMTU2YTAyMmZiYzlmOWZlZTJlY2MwNWViNTAwMjU4ZWRiM2RmN2VmYTVkZDVkMjljZjM1NTgyIiwiaW50ZXJuYWxfc2VjcmV0IjoiODQwZGIxODItYmY0MC00NjkzLWE3OTEtMGM4ODRhZjJiYzA5In0.PoXuy8sD-yvUG4d8DETCXlFE7fDHw8u30U2MO7kT9HM"

DIRECT_URL="postgres://fca374550b156a022fbc9f9fee2ecc05eb500258edb3df7efa5dd5d29cf35582:sk_t3EX0zwh487VDbVzh02Gb@db.prisma.io:5432/postgres?sslmode=require"
```

**Important Notes:**
- ✅ **DATABASE_URL** = Use the **PRISMA_DATABASE_URL** (Accelerate connection with connection pooling)
- ✅ **DIRECT_URL** = Use the **POSTGRES_URL** (Direct connection for migrations)

---

## 📋 Add to Vercel (Step-by-Step)

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add **DATABASE_URL**:
   - **Key**: `DATABASE_URL`
   - **Value**: `prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGci...`
   - **Environments**: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

4. Add **DIRECT_URL**:
   - **Key**: `DIRECT_URL`
   - **Value**: `postgres://fca374550b156a022fbc9f9fee2ecc05eb500258edb3df7efa5dd5d29cf35582:sk_t3EX0zwh487VDbVzh02Gb@db.prisma.io:5432/postgres?sslmode=require`
   - **Environments**: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

---

## 🚀 Deploy & Migrate Database

### Option 1: Automatic (Recommended)

After adding the environment variables, just redeploy:

1. Go to **Deployments** tab
2. Click **⋯** on latest deployment
3. Click **Redeploy**

The build process will automatically:
- Generate Prisma Client
- Run migrations (`prisma migrate deploy`)
- Build your app

### Option 2: Manual Migration (If needed)

If you need to run migrations manually:

```bash
# Pull environment variables from Vercel
npx vercel env pull .env.local

# Run migrations
npx prisma migrate deploy

# Or create a new migration
npx prisma migrate dev --name init
```

---

## 🔍 Verify Database Connection

After deployment, check that everything works:

1. **Visit your site**: `https://your-project.vercel.app`
2. **Test registration**: Create a new user account
3. **Check database**: Go to Vercel → Storage → Data tab
4. **Verify tables**: You should see User, Tour, Booking, etc. tables

---

## 🎯 Create Admin Account

Once your app is deployed and working:

### Method 1: Via Vercel Dashboard (Easiest)

1. Go to Vercel Dashboard
2. Navigate to **Storage** → **Browse Data**
3. Select the **User** table
4. Find your registered user
5. Click **Edit** on your user row
6. Change `role` from `USER` to `ADMIN`
7. Save changes

### Method 2: Via Vercel Postgres SQL Editor

1. Go to Vercel Dashboard → Storage → Your Database
2. Click **Query** tab
3. Run this SQL:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@domain.com';
   ```
4. Click **Run Query**

### Method 3: Via Local Prisma Studio

```bash
# Pull environment variables
npx vercel env pull .env.local

# Open Prisma Studio
npx prisma studio

# Find your user and change role to ADMIN
```

---

## ✅ Complete Environment Variables Checklist

Make sure you've added ALL these to Vercel:

### Database (Just Added ✅)
- [x] `DATABASE_URL`
- [x] `DIRECT_URL`

### Authentication (Required)
- [ ] `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- [ ] `NEXTAUTH_URL` - Your Vercel URL (e.g., `https://severius-travel.vercel.app`)
- [ ] `NEXT_PUBLIC_SITE_URL` - Same as NEXTAUTH_URL

### Email (Required)
- [ ] `RESEND_API_KEY` - Your existing key: `re_LKgpXZvB_997umBeGtFkLaAZo1XTk7U2a`
- [ ] `FROM_EMAIL` - Sender email (e.g., `noreply@severiusadventuresandtravel.com`)
- [ ] `ADMIN_EMAIL` - Admin notifications (e.g., `info@severiusadventuresandtravel.com`)

### Payment (Required)
- [ ] `PESAPAL_CONSUMER_KEY` - Your key: `3RH7aAXjJ1gQmRoFlZyw5HyE1mXoQuph`
- [ ] `PESAPAL_CONSUMER_SECRET` - Your secret: `3pM0jNmn0H/L8u/Nei+EvjcnrlM=`
- [ ] `PESAPAL_IPN_URL` - `https://your-vercel-url.vercel.app/api/payments/callback`
- [ ] `PESAPAL_ENVIRONMENT` - `production` or `sandbox`

### Optional
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics (if using)
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` - Your WhatsApp: `254780419605`
- [ ] `NEXT_PUBLIC_CONTACT_EMAIL` - `info@severiusadventuresandtravel.com`
- [ ] `NEXT_PUBLIC_CONTACT_PHONE` - `+254 780419605`

---

## 🔐 Generate NEXTAUTH_SECRET

You need to generate a secure secret for authentication:

### On Windows (PowerShell):
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### On Mac/Linux:
```bash
openssl rand -base64 32
```

Copy the output and add it as `NEXTAUTH_SECRET` in Vercel.

---

## 📝 Quick Copy-Paste for Vercel

Here are your ready-to-use values:

```bash
# Database ✅ (Already configured)
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza190M0VYMHp3aDQ4N1ZEYlZ6aDAyR2IiLCJhcGlfa2V5IjoiMDFLN1NRREtUU0hQUDZDU0hTMjZQTTFaNFciLCJ0ZW5hbnRfaWQiOiJmY2EzNzQ1NTBiMTU2YTAyMmZiYzlmOWZlZTJlY2MwNWViNTAwMjU4ZWRiM2RmN2VmYTVkZDVkMjljZjM1NTgyIiwiaW50ZXJuYWxfc2VjcmV0IjoiODQwZGIxODItYmY0MC00NjkzLWE3OTEtMGM4ODRhZjJiYzA5In0.PoXuy8sD-yvUG4d8DETCXlFE7fDHw8u30U2MO7kT9HM

DIRECT_URL=postgres://fca374550b156a022fbc9f9fee2ecc05eb500258edb3df7efa5dd5d29cf35582:sk_t3EX0zwh487VDbVzh02Gb@db.prisma.io:5432/postgres?sslmode=require

# Authentication (Generate NEXTAUTH_SECRET first!)
NEXTAUTH_SECRET=[GENERATE_THIS]
NEXTAUTH_URL=https://your-project.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# Email
RESEND_API_KEY=re_LKgpXZvB_997umBeGtFkLaAZo1XTk7U2a
FROM_EMAIL=info@severiusadventuresandtravel.com
ADMIN_EMAIL=info@severiusadventuresandtravel.com

# Payment
PESAPAL_CONSUMER_KEY=3RH7aAXjJ1gQmRoFlZyw5HyE1mXoQuph
PESAPAL_CONSUMER_SECRET=3pM0jNmn0H/L8u/Nei+EvjcnrlM=
PESAPAL_IPN_URL=https://your-project.vercel.app/api/payments/callback
PESAPAL_ENVIRONMENT=sandbox

# Contact Info (Optional)
NEXT_PUBLIC_WHATSAPP_NUMBER=254780419605
NEXT_PUBLIC_CONTACT_EMAIL=info@severiusadventuresandtravel.com
NEXT_PUBLIC_CONTACT_PHONE=+254 780419605
```

**Remember to**:
1. Generate `NEXTAUTH_SECRET` using the command above
2. Replace `https://your-project.vercel.app` with your actual Vercel URL
3. Select all environments (Production, Preview, Development) for each variable

---

## 🚨 Troubleshooting

### Error: "Prisma Client is not configured to use Accelerate"

**Solution**: Make sure `DATABASE_URL` uses the `prisma+postgres://` protocol (Accelerate URL)

### Error: "Migration engine requires DIRECT_URL"

**Solution**: Ensure `DIRECT_URL` is set with the direct `postgres://` connection string

### Error: "Database does not exist"

**Solution**: 
1. Check database connection strings are correct
2. Ensure database is active in Vercel Storage tab
3. Try redeploying

---

## ✅ Next Steps

1. **Add remaining environment variables** (see checklist above)
2. **Redeploy** your Vercel application
3. **Test** your site at `https://your-project.vercel.app`
4. **Create admin account** using one of the methods above
5. **Add tours and content** via admin panel
6. **Configure custom domain** (optional)

---

## 🎉 You're Almost There!

Your database is configured! Just add the remaining environment variables and you'll be live! 🚀

**Need help?** See `VERCEL_DEPLOYMENT.md` for comprehensive troubleshooting.

---

**Last Updated**: October 17, 2025
