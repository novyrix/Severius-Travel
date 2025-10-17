# 🚀 Vercel Deployment Guide - Severius Travel

Complete guide for deploying your Next.js travel booking application to Vercel.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start (5 Minutes)](#quick-start)
3. [Database Setup (Vercel Postgres)](#database-setup)
4. [Environment Variables](#environment-variables)
5. [Deployment Steps](#deployment-steps)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisites

### Required Accounts:
- ✅ [Vercel Account](https://vercel.com/signup) (Free tier available)
- ✅ [GitHub Account](https://github.com) (for repository)
- ✅ [Resend Account](https://resend.com) (for emails)
- ✅ [PesaPal Account](https://pesapal.com) (for payments)

### Optional Services:
- ⭐ [Vercel Postgres](https://vercel.com/storage/postgres) (Recommended) or
- ⭐ [Neon](https://neon.tech) (Free PostgreSQL alternative) or
- ⭐ [Supabase](https://supabase.com) (Free PostgreSQL alternative)

---

## ⚡ Quick Start (5 Minutes)

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **That's it!** Your app will be live in ~2 minutes at `your-project.vercel.app`

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🗄️ Database Setup (Vercel Postgres)

### Option A: Vercel Postgres (Recommended)

#### Step 1: Create Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name: `severius-travel-db`
7. Select region (same as your app for low latency)
8. Click **Create**

#### Step 2: Connect to Project

1. After creation, click **Connect to Project**
2. Select your Severius Travel project
3. Environment variables will be auto-added:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

#### Step 3: Update Environment Variables

In your Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add `DATABASE_URL`:
   ```
   DATABASE_URL=${POSTGRES_PRISMA_URL}
   ```
3. Add `DIRECT_URL`:
   ```
   DIRECT_URL=${POSTGRES_URL_NON_POOLING}
   ```

### Option B: Neon (Free Alternative)

1. **Sign up** at [neon.tech](https://neon.tech)
2. **Create Project**: Name it "severius-travel"
3. **Get Connection String**: Copy the connection string
4. **Add to Vercel**:
   ```
   DATABASE_URL=postgresql://user:password@endpoint.neon.tech/dbname?sslmode=require
   DIRECT_URL=postgresql://user:password@endpoint.neon.tech/dbname?sslmode=require
   ```

### Option C: Supabase (Free Alternative)

1. **Sign up** at [supabase.com](https://supabase.com)
2. **Create Project**: Name it "severius-travel"
3. **Get Connection String**:
   - Go to Settings → Database
   - Copy "Connection string" (URI mode)
4. **Add to Vercel**:
   ```
   DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
   DIRECT_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
   ```

---

## 🔐 Environment Variables

### Required Variables

Add these in Vercel Dashboard → Your Project → Settings → Environment Variables:

#### Database (Already added if using Vercel Postgres)
```bash
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
DIRECT_URL=postgresql://user:password@host:5432/database?sslmode=require
```

#### Site Configuration
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-32-byte-hex-secret
```

**Generate NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
# or
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### Email (Resend)
```bash
RESEND_API_KEY=re_your_resend_api_key
FROM_EMAIL=noreply@your-domain.com
ADMIN_EMAIL=admin@your-domain.com
```

**Get Resend API Key**:
1. Sign up at [resend.com](https://resend.com)
2. Verify your domain or use `onboarding@resend.dev` for testing
3. Go to API Keys → Create API Key
4. Copy the key

#### Payment (PesaPal)
```bash
PESAPAL_CONSUMER_KEY=your_pesapal_consumer_key
PESAPAL_CONSUMER_SECRET=your_pesapal_consumer_secret
PESAPAL_IPN_URL=https://your-domain.vercel.app/api/payments/callback
PESAPAL_ENVIRONMENT=production
```

**Get PesaPal Credentials**:
1. Sign up at [pesapal.com](https://pesapal.com)
2. Go to Dashboard → Settings → API Keys
3. Copy Consumer Key and Consumer Secret

#### Optional
```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google OAuth (for social login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Adding Environment Variables in Vercel

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. For each variable:
   - Enter **Key** (e.g., `DATABASE_URL`)
   - Enter **Value**
   - Select environments: **Production**, **Preview**, **Development**
   - Click **Save**

---

## 🚀 Deployment Steps

### Step 1: Prepare Your Code

Ensure your code is ready:

```bash
# Update dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Test build locally
npm run build

# Test locally
npm start
```

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 3: Deploy to Vercel

#### Via Vercel Dashboard:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your repository
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `prisma generate && next build`
   - **Output Directory**: `.next`
5. Click **Deploy**

#### Via Vercel CLI:

```bash
# First deployment
vercel

# Production deployment
vercel --prod
```

### Step 4: Run Database Migrations

After first deployment:

1. **Option A - Via Vercel CLI**:
   ```bash
   # Install Vercel CLI if not installed
   npm install -g vercel

   # Link project
   vercel link

   # Run migrations
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

2. **Option B - Add Build Command** (Recommended):
   
   Update `vercel.json`:
   ```json
   {
     "buildCommand": "prisma generate && prisma migrate deploy && next build"
   }
   ```
   
   Then redeploy.

3. **Option C - Via GitHub Actions** (see below)

### Step 5: Seed Database (Optional)

```bash
# Pull environment variables
vercel env pull .env.local

# Seed database
npm run seed
```

---

## 🔧 Advanced Configuration

### Custom Domain

1. Go to your project in Vercel
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

Update environment variables:
```bash
NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
NEXTAUTH_URL=https://your-custom-domain.com
PESAPAL_IPN_URL=https://your-custom-domain.com/api/payments/callback
```

### Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Main branch** → Production deployment
- **Other branches** → Preview deployments

### Environment-Specific Variables

Set different values for different environments:

1. Go to Settings → Environment Variables
2. When adding a variable, select:
   - ✅ **Production**: Live site
   - ✅ **Preview**: Branch deployments
   - ✅ **Development**: Local development

---

## 🤖 GitHub Actions for Database Migrations

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run Prisma migrations
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: npx prisma migrate deploy
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

Add secrets in GitHub:
- `VERCEL_TOKEN`: Get from [Vercel Dashboard → Settings → Tokens](https://vercel.com/account/tokens)
- `VERCEL_ORG_ID`: Run `vercel` CLI and check `.vercel/project.json`
- `VERCEL_PROJECT_ID`: Run `vercel` CLI and check `.vercel/project.json`
- `DATABASE_URL`: Your database connection string

---

## ✅ Post-Deployment

### 1. Verify Deployment

- ✅ Visit your site: `https://your-project.vercel.app`
- ✅ Check homepage loads
- ✅ Test tours page
- ✅ Verify images load

### 2. Test Core Features

- ✅ User registration
- ✅ Email verification
- ✅ Login functionality
- ✅ Booking system
- ✅ Payment flow
- ✅ Admin panel access

### 3. Create Admin Account

1. Register a new account on your site
2. Get admin access:
   ```bash
   # Connect to database
   vercel env pull .env.local
   
   # Run Prisma Studio
   npx prisma studio
   
   # Or use SQL:
   # UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@domain.com';
   ```

### 4. Configure Email Domain

In Resend:
1. Go to Domains → Add Domain
2. Add your custom domain
3. Add DNS records (TXT, MX, CNAME)
4. Verify domain
5. Update `FROM_EMAIL` in Vercel environment variables

### 5. Set Up Monitoring

Vercel provides built-in monitoring:
- Go to your project → **Analytics**
- View performance metrics
- Monitor error rates
- Check function execution times

---

## 🚨 Troubleshooting

### Build Failures

**Error**: `Cannot find module 'prisma'`
```bash
Solution: Ensure build command includes: prisma generate && next build
```

**Error**: `Database connection failed`
```bash
Solution: 
1. Check DATABASE_URL is set correctly
2. Verify DIRECT_URL is set
3. Ensure database is accessible from Vercel
```

**Error**: `NEXTAUTH_URL not set`
```bash
Solution: Add NEXTAUTH_URL in environment variables
Value: https://your-domain.vercel.app
```

### Runtime Errors

**Error**: `PrismaClient initialization failed`
```bash
Solution:
1. Ensure DATABASE_URL is in environment variables
2. Run: npx prisma generate
3. Redeploy
```

**Error**: `Email sending failed`
```bash
Solution:
1. Verify RESEND_API_KEY is correct
2. Check domain is verified in Resend
3. Review Resend dashboard for errors
```

**Error**: `Payment callback not working`
```bash
Solution:
1. Update PESAPAL_IPN_URL with your actual domain
2. Verify webhook is registered in PesaPal dashboard
```

### Database Issues

**Migrations fail**:
```bash
# Reset database (CAUTION: Deletes all data)
npx prisma migrate reset

# Or create and apply new migration
npx prisma migrate dev --name fix_schema
npx prisma migrate deploy
```

**Connection pooling issues**:
```bash
Solution: Use DIRECT_URL for migrations:
DATABASE_URL=pooled_connection_url (for queries)
DIRECT_URL=direct_connection_url (for migrations)
```

---

## 📊 Performance Optimization

### 1. Enable Edge Runtime

For faster response times, use Edge Runtime for API routes:

```typescript
// app/api/some-route/route.ts
export const runtime = 'edge';
```

### 2. Image Optimization

Vercel automatically optimizes images via Next.js Image component.

### 3. Caching

Configure caching in `next.config.ts`:

```typescript
const nextConfig = {
  // ... other config
  images: {
    minimumCacheTTL: 60,
  },
};
```

### 4. Database Connection Pooling

Vercel Postgres includes connection pooling automatically.
For other providers, use PgBouncer or Prisma Data Proxy.

---

## 💰 Pricing

### Vercel
- **Hobby**: Free (perfect for testing)
  - 100GB bandwidth
  - Unlimited deployments
  - Custom domains
- **Pro**: $20/month (for production)
  - 1TB bandwidth
  - Advanced analytics
  - Team collaboration

### Vercel Postgres
- **Free tier**: 
  - 256 MB storage
  - 60 hours compute/month
- **Pro**: $0.28/GB storage + $0.102/hour compute

### Alternatives
- **Neon**: Free tier with 0.5GB storage
- **Supabase**: Free tier with 500MB storage

---

## 🔄 Updates & Redeployment

### Automatic
Push to GitHub main branch → Vercel auto-deploys

### Manual
```bash
vercel --prod
```

### Rollback
1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click ⋯ → **Promote to Production**

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)

---

## 🎉 Success!

Your Severius Travel application is now live on Vercel!

**Live URL**: `https://your-project.vercel.app`  
**Admin Panel**: `https://your-project.vercel.app/admin`

### Next Steps:
1. ✅ Add custom domain
2. ✅ Configure email domain
3. ✅ Set up monitoring
4. ✅ Add content
5. ✅ Launch! 🚀

---

**Deployment Time**: ~15-30 minutes  
**Difficulty**: Easy  
**Cost**: Free (Hobby tier)  
**Last Updated**: October 17, 2025
