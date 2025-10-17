# 🎯 QUICK ACTION: Add These to Vercel NOW

## ⚡ Step 1: Generate NEXTAUTH_SECRET

Run this command:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output - you'll need it in Step 2.

---

## ⚡ Step 2: Add Environment Variables to Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

### Add these ONE BY ONE:

#### 1. DATABASE_URL ✅ (Prisma Accelerate)
```
prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza190M0VYMHp3aDQ4N1ZEYlZ6aDAyR2IiLCJhcGlfa2V5IjoiMDFLN1NRREtUU0hQUDZDU0hTMjZQTTFaNFciLCJ0ZW5hbnRfaWQiOiJmY2EzNzQ1NTBiMTU2YTAyMmZiYzlmOWZlZTJlY2MwNWViNTAwMjU4ZWRiM2RmN2VmYTVkZDVkMjljZjM1NTgyIiwiaW50ZXJuYWxfc2VjcmV0IjoiODQwZGIxODItYmY0MC00NjkzLWE3OTEtMGM4ODRhZjJiYzA5In0.PoXuy8sD-yvUG4d8DETCXlFE7fDHw8u30U2MO7kT9HM
```
✅ Select: Production, Preview, Development

#### 2. DIRECT_URL ✅ (Direct Connection)
```
postgres://fca374550b156a022fbc9f9fee2ecc05eb500258edb3df7efa5dd5d29cf35582:sk_t3EX0zwh487VDbVzh02Gb@db.prisma.io:5432/postgres?sslmode=require
```
✅ Select: Production, Preview, Development

#### 3. NEXTAUTH_SECRET 🔐 (Use generated value from Step 1)
```
[PASTE_YOUR_GENERATED_SECRET_HERE]
```
✅ Select: Production, Preview, Development

#### 4. NEXTAUTH_URL 🌐
```
https://your-project-name.vercel.app
```
⚠️ Replace `your-project-name` with your actual Vercel project name
✅ Select: Production, Preview, Development

#### 5. NEXT_PUBLIC_SITE_URL 🌐
```
https://your-project-name.vercel.app
```
⚠️ Replace `your-project-name` with your actual Vercel project name
✅ Select: Production, Preview, Development

#### 6. RESEND_API_KEY 📧
```
re_LKgpXZvB_997umBeGtFkLaAZo1XTk7U2a
```
✅ Select: Production, Preview, Development

#### 7. FROM_EMAIL 📧
```
info@severiusadventuresandtravel.com
```
⚠️ Must be verified in Resend dashboard or use `onboarding@resend.dev` for testing
✅ Select: Production, Preview, Development

#### 8. ADMIN_EMAIL 📧
```
info@severiusadventuresandtravel.com
```
✅ Select: Production, Preview, Development

#### 9. PESAPAL_CONSUMER_KEY 💳
```
3RH7aAXjJ1gQmRoFlZyw5HyE1mXoQuph
```
✅ Select: Production, Preview, Development

#### 10. PESAPAL_CONSUMER_SECRET 💳
```
3pM0jNmn0H/L8u/Nei+EvjcnrlM=
```
✅ Select: Production, Preview, Development

#### 11. PESAPAL_IPN_URL 💳
```
https://your-project-name.vercel.app/api/payments/callback
```
⚠️ Replace `your-project-name` with your actual Vercel project name
✅ Select: Production, Preview, Development

#### 12. PESAPAL_ENVIRONMENT 💳
```
sandbox
```
⚠️ Change to `production` when going live
✅ Select: Production, Preview, Development

---

## ⚡ Step 3: Redeploy

After adding ALL variables:

1. Go to **Deployments** tab
2. Click **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes

---

## ⚡ Step 4: Verify

Visit: `https://your-project-name.vercel.app`

Test:
- ✅ Homepage loads
- ✅ Tours display
- ✅ Can register a user
- ✅ Receive verification email

---

## ⚡ Step 5: Create Admin

### Option A: Vercel Dashboard
1. Vercel → Storage → Browse Data
2. Select **User** table
3. Find your email
4. Edit → Change `role` to `ADMIN`

### Option B: SQL Query
1. Vercel → Storage → Query tab
2. Run:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@domain.com';
   ```

---

## ✅ Done!

Access admin panel: `https://your-project-name.vercel.app/admin`

---

**Total Time**: 10 minutes  
**Difficulty**: Easy (copy-paste)

Need help? See `VERCEL_DATABASE_SETUP.md` for detailed explanations.
