# 🚨 Vercel Database Connection Issues - Troubleshooting Guide

**Error:** `P1001: Can't reach database server at ep-calm-meadow-adxwkbqe.c-2.us-east-1.aws.neon.tech:5432`

**Date:** October 20, 2025  
**Deployment:** Vercel Build Failed

---

## 🔍 PROBLEM DIAGNOSIS

### Error Analysis
The Prisma client cannot connect to the Neon PostgreSQL database during the Vercel build process. This typically happens due to:

1. **Missing Environment Variables** in Vercel
2. **Incorrect Connection String Format**
3. **Database Server Issues** (Neon downtime)
4. **SSL/TLS Configuration** issues
5. **Connection Pooling** misconfiguration

---

## ✅ SOLUTIONS (In Order of Likelihood)

### Solution 1: Verify Vercel Environment Variables ⭐ MOST LIKELY

#### Check These Variables in Vercel Dashboard:

**Navigate to:** Vercel Dashboard → Your Project → Settings → Environment Variables

**Required Variables:**

```env
DATABASE_URL
Value: postgresql://user:password@ep-calm-meadow-adxwkbqe.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=15

DIRECT_URL
Value: postgresql://user:password@ep-calm-meadow-adxwkbqe.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=15
```

**⚠️ CRITICAL PARAMETERS:**
- `sslmode=require` - Neon requires SSL
- `pgbouncer=true` - For pooled connection (DATABASE_URL only)
- `connect_timeout=15` - Increase from default 10s to 15s

#### How to Add in Vercel:

1. Go to https://vercel.com/dashboard
2. Select **Severius-Travel** project
3. Click **Settings** → **Environment Variables**
4. Add/Update these variables:
   - Name: `DATABASE_URL`
   - Value: `[your pooled connection string]`
   - Environment: **Production**, **Preview**, **Development** (check all)
5. Repeat for `DIRECT_URL`
6. Click **Save**
7. **Redeploy** the project

---

### Solution 2: Check Neon Database Status

#### Verify Database is Running:

1. Go to https://console.neon.tech
2. Login to your account
3. Navigate to your project
4. Check **Dashboard** for:
   - ✅ Status: Active
   - ✅ Connection details visible
   - ✅ No maintenance alerts

#### Test Connection Locally:

```powershell
# Test connection from your machine
$env:DATABASE_URL="postgresql://user:password@ep-calm-meadow-adxwkbqe.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
npx prisma db pull
```

If this fails, your Neon database might be:
- Paused (free tier auto-pauses after inactivity)
- Under maintenance
- Connection limit reached

#### Fix: Wake Up Database
If database is paused:
1. Go to Neon Console
2. Click your project
3. Click **"Wake up database"** button
4. Wait 30 seconds
5. Redeploy on Vercel

---

### Solution 3: Update Connection String Format

#### Current Format (Might Be Wrong):
```
postgresql://user:password@host/database
```

#### Correct Format for Neon + Vercel:
```
postgresql://user:password@ep-calm-meadow-adxwkbqe.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=15
```

#### Get Correct Connection Strings from Neon:

1. Go to https://console.neon.tech
2. Select your project
3. Click **"Connection Details"**
4. Copy **two connection strings:**

   **Pooled Connection** (for DATABASE_URL):
   ```
   postgres://username:password@ep-calm-meadow-adxwkbqe-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

   **Direct Connection** (for DIRECT_URL):
   ```
   postgres://username:password@ep-calm-meadow-adxwkbqe.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

5. **Add to Vercel Environment Variables**
6. **Important:** Change `postgres://` to `postgresql://`

---

### Solution 4: Update Prisma Schema

#### Check schema.prisma Connection Settings:

**File:** `prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

**✅ Correct Configuration**

**❌ Incorrect:** Missing `directUrl`

---

### Solution 5: Modify Vercel Build Command

#### Current Build Command:
```json
"buildCommand": "prisma generate && prisma migrate deploy && next build"
```

#### Updated Build Command (with error handling):
```json
"buildCommand": "prisma generate && prisma migrate deploy --skip-seed && next build || (echo 'Migration failed, continuing...' && prisma generate && next build)"
```

#### How to Update:

**Option A: Update vercel.json**
```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm ci --prefer-offline --no-audit || npm install"
}
```

**Option B: Update in Vercel Dashboard**
1. Settings → General
2. Scroll to "Build & Development Settings"
3. Override Build Command:
   ```
   prisma generate && next build
   ```
4. Save
5. Redeploy

**⚠️ Note:** This skips migrations during build. Run migrations manually after deployment.

---

### Solution 6: Check Neon Connection Limits

Neon Free Tier Limits:
- **Connections:** 20 max
- **Active time:** 100 hours/month
- **Storage:** 512 MB

#### Check Current Connections:

```sql
-- Run in Neon SQL Editor
SELECT count(*) FROM pg_stat_activity;
```

If at limit:
1. Close unused connections
2. Upgrade Neon plan
3. Reduce connection pool size in Prisma

---

### Solution 7: Add Retry Logic to Build

Update `vercel.json`:

```json
{
  "buildCommand": "for i in 1 2 3; do prisma generate && prisma migrate deploy && next build && break || sleep 10; done",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
```

This retries the build command 3 times with 10-second delays.

---

## 🛠️ STEP-BY-STEP FIX (Recommended)

### Step 1: Get Fresh Connection Strings from Neon

1. Go to https://console.neon.tech
2. Navigate to your project
3. Click **"Connection Details"**
4. **Copy the Pooled Connection String:**
   ```
   Should look like:
   postgres://user:password@ep-calm-meadow-adxwkbqe-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

5. **Copy the Direct Connection String:**
   ```
   Should look like:
   postgres://user:password@ep-calm-meadow-adxwkbqe.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

### Step 2: Update Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Select **Severius-Travel**
3. Settings → Environment Variables
4. **Delete old DATABASE_URL** (if exists)
5. **Add new DATABASE_URL:**
   ```
   Name: DATABASE_URL
   Value: [Paste Pooled Connection - change postgres:// to postgresql://]
   Environments: Production, Preview, Development (all checked)
   ```

6. **Delete old DIRECT_URL** (if exists)
7. **Add new DIRECT_URL:**
   ```
   Name: DIRECT_URL
   Value: [Paste Direct Connection - change postgres:// to postgresql://]
   Environments: Production, Preview, Development (all checked)
   ```

8. Click **Save**

### Step 3: Verify Other Environment Variables

Ensure these are also set in Vercel:

```env
NEXTAUTH_URL=https://severiusadventuresandtravel.com
NEXTAUTH_SECRET=[your secret]
RESEND_API_KEY=re_xxxxx
NEXT_PUBLIC_SITE_URL=https://severiusadventuresandtravel.com
```

### Step 4: Simplify Build Command (Temporarily)

Update `vercel.json`:

```json
{
  "buildCommand": "prisma generate && next build",
  "framework": "nextjs"
}
```

This skips migrations during build (run them manually after).

### Step 5: Commit and Push

```bash
git add vercel.json
git commit -m "fix: simplify build command to resolve database connection issue"
git push origin main
```

### Step 6: Monitor Deployment

1. Watch Vercel deployment logs
2. Look for successful Prisma generation
3. Check for Next.js build completion

### Step 7: Run Migrations (After Successful Build)

Once the site is deployed:

```bash
# Option A: Use Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy

# Option B: From Neon Console SQL Editor
-- Run any pending migrations manually
```

---

## 🚀 ALTERNATIVE: Use Vercel Postgres Instead

If Neon continues to have issues, switch to Vercel Postgres:

### Setup Vercel Postgres:

1. Go to Vercel Dashboard → Storage
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Name: `severius-production`
5. Region: `US East 1`
6. Click **Create**

### Automatic Integration:

Vercel will automatically add these to your project:
```env
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
```

### Update Environment Variables:

```env
DATABASE_URL=$POSTGRES_PRISMA_URL
DIRECT_URL=$POSTGRES_URL_NON_POOLING
```

### Benefits:
- ✅ Seamless integration
- ✅ No connection issues
- ✅ Better reliability
- ✅ Same network as app
- ❌ Cost: $20/month (vs Neon free)

---

## 📊 DEBUGGING CHECKLIST

Before redeploying, verify:

- [ ] DATABASE_URL set in Vercel (Production, Preview, Development)
- [ ] DIRECT_URL set in Vercel (Production, Preview, Development)
- [ ] Connection strings include `?sslmode=require`
- [ ] Connection strings use `postgresql://` (not `postgres://`)
- [ ] Neon database is active (not paused)
- [ ] Neon connection limit not reached
- [ ] Build command is simplified (no migrate during build)
- [ ] All other environment variables are set
- [ ] vercel.json has correct configuration
- [ ] Local build works: `npm run build`

---

## 🔍 CHECK VERCEL BUILD LOGS

After redeploying, check logs for:

**✅ Success Indicators:**
```
✓ Prisma Client generated
✓ Compiled successfully
✓ Deployment complete
```

**❌ Still Failing?**
Look for:
```
Error: P1001 - Can't reach database
Error: P3009 - Migration failed
Error: ETIMEDOUT - Connection timeout
```

If still failing after all steps:
1. Check Neon status page: https://neon.tech/docs/introduction/status
2. Contact Neon support
3. Consider Vercel Postgres
4. Or use temporary build without migrations

---

## 💡 QUICK FIX (If Urgent)

**Skip Database During Build:**

```json
// vercel.json
{
  "buildCommand": "SKIP_ENV_VALIDATION=true next build"
}
```

Then run migrations after deployment using Vercel CLI:

```bash
vercel env pull
npx prisma migrate deploy
```

---

## 📞 SUPPORT

**Neon Support:** https://neon.tech/docs/introduction/support  
**Vercel Support:** https://vercel.com/support  
**Prisma Discord:** https://pris.ly/discord

---

**Most Common Fix:** Update DATABASE_URL and DIRECT_URL in Vercel with fresh connection strings from Neon Console (including `?sslmode=require`).

**Action:** Go to Vercel → Settings → Environment Variables → Update both URLs → Redeploy

---

*Last Updated: October 20, 2025*
