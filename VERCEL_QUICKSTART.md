# 🚀 Quick Start: Deploy to Vercel in 5 Minutes

The fastest way to deploy your Severius Travel application to production.

---

## ⚡ Step 1: Push to GitHub (1 minute)

```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

---

## ⚡ Step 2: Import to Vercel (2 minutes)

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Click **"Import Git Repository"**
3. Select your **GitHub repository**
4. Click **"Deploy"**

✅ Your app is now live at: `https://your-project.vercel.app`

---

## ⚡ Step 3: Add Database (2 minutes)

### Option A: Vercel Postgres (Easiest)

1. In Vercel Dashboard → **Storage** → **Create Database**
2. Select **Postgres** → Name it `severius-db`
3. Click **Connect to Project**
4. Environment variables auto-added! ✅

### Option B: Neon (Free)

1. Sign up at **[neon.tech](https://neon.tech)**
2. Create project → Copy connection string
3. In Vercel → **Settings** → **Environment Variables**:
   ```
   DATABASE_URL=your_neon_connection_string
   DIRECT_URL=your_neon_connection_string
   ```

---

## ⚡ Step 4: Add Required Variables (3 minutes)

In Vercel → **Settings** → **Environment Variables**, add:

### Essential Variables:

```bash
# Authentication (Generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-generated-secret

# Site URL (Auto-fill with your Vercel URL)
NEXTAUTH_URL=https://your-project.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# Email (Sign up at resend.com, use onboarding@resend.dev for testing)
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=onboarding@resend.dev
ADMIN_EMAIL=admin@yourdomain.com

# Payment (Sign up at pesapal.com)
PESAPAL_CONSUMER_KEY=your_key
PESAPAL_CONSUMER_SECRET=your_secret
PESAPAL_IPN_URL=https://your-project.vercel.app/api/payments/callback
PESAPAL_ENVIRONMENT=production
```

**For each variable**: Select all environments (Production, Preview, Development)

---

## ⚡ Step 5: Redeploy (1 minute)

After adding environment variables:

1. Go to **Deployments**
2. Click ⋯ on latest deployment
3. Click **Redeploy**

Or push any change to GitHub to trigger auto-deploy.

---

## ✅ Verify Deployment

Visit your site and test:

- ✅ Homepage loads
- ✅ Tours display
- ✅ User registration works
- ✅ Email verification received
- ✅ Login functional

---

## 🎯 Create Admin Account

1. Register on your site
2. Go to Vercel → **Storage** → **Data** tab
3. Run SQL:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@domain.com';
   ```
4. Access admin panel: `https://your-project.vercel.app/admin`

---

## 🎉 You're Live!

**Your site**: `https://your-project.vercel.app`  
**Admin panel**: `https://your-project.vercel.app/admin`

### Next Steps:

1. **Custom Domain**: Settings → Domains → Add your domain
2. **Email Domain**: Verify your domain in Resend
3. **Monitoring**: Check Analytics tab in Vercel
4. **Add Content**: Use admin panel to add tours and blog posts

---

## 📚 Full Documentation

- **Complete Guide**: See `VERCEL_DEPLOYMENT.md`
- **Environment Variables**: See `.env.vercel.example`
- **Troubleshooting**: See `VERCEL_DEPLOYMENT.md` Section 🚨

---

## 🆘 Quick Troubleshooting

### Build failed?
- Check build logs in Vercel
- Ensure all environment variables are set

### Database connection error?
- Verify `DATABASE_URL` is set correctly
- Ensure `DIRECT_URL` is also set

### Email not sending?
- Check `RESEND_API_KEY` is correct
- Verify sender email in Resend dashboard

### Need help?
See full troubleshooting guide in `VERCEL_DEPLOYMENT.md`

---

**Total Time**: ~10 minutes  
**Cost**: Free (Hobby tier)  
**Last Updated**: October 17, 2025
