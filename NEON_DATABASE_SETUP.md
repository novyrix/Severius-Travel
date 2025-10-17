# Neon Database Setup

## Database Information

**Provider**: Neon (Serverless PostgreSQL)  
**Region**: US East 1 (AWS)  
**Database**: neondb  
**Status**: ✅ Active and Seeded

## Connection Details

### For Prisma (Recommended)
```env
# Pooled connection (via pgbouncer) - Use for queries
DATABASE_URL=postgresql://neondb_owner:npg_Zrf0HRodlN1M@ep-calm-meadow-adxwkbqe-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

# Direct connection (without pooling) - Use for migrations
DIRECT_URL=postgresql://neondb_owner:npg_Zrf0HRodlN1M@ep-calm-meadow-adxwkbqe.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### For Direct Connection (psql)
```bash
psql "postgresql://neondb_owner:npg_Zrf0HRodlN1M@ep-calm-meadow-adxwkbqe-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

## Vercel Deployment Setup

### Required Environment Variables

Add these to your Vercel project settings (Project → Settings → Environment Variables):

```env
# Database (Required)
DATABASE_URL=postgresql://neondb_owner:npg_Zrf0HRodlN1M@ep-calm-meadow-adxwkbqe-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_Zrf0HRodlN1M@ep-calm-meadow-adxwkbqe.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

# Authentication (Required)
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=Si3TsMQwuiepvnkHQIn2M6N3k8oI7GG9Rso0dN/pFYY=

# Site Configuration (Required)
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_WHATSAPP_NUMBER=254780419605
NEXT_PUBLIC_CONTACT_EMAIL=info@severiusadventuresandtravel.com
NEXT_PUBLIC_CONTACT_PHONE=+254 780419605
NEXT_PUBLIC_CONTACT_PHONE_DISPLAY=+254 780419605

# Email (Required for notifications)
RESEND_API_KEY=re_LKgpXZvB_997umBeGtFkLaAZo1XTk7U2a

# Payment Gateway (Required for bookings)
PESAPAL_CONSUMER_KEY=3RH7aAXjJ1gQmRoFlZyw5HyE1mXoQuph
PESAPAL_CONSUMER_SECRET=3pM0jNmn0H/L8u/Nei+EvjcnrlM=
PESAPAL_IPN_URL=https://your-project.vercel.app/api/payments/callback
PESAPAL_ENVIRONMENT=sandbox

# Optional (for blog images)
UNSPLASH_ACCESS_KEY=mcC1D3wGPUrzevXZxXKGs9-7KpzYY6vpjM3NwBOt-aA
UNSPLASH_SECRET_KEY=MGWvc7sXxsRWKA7IcTVWw8RYa-7EgnPmlCcuUWx-Axk
```

### Important Notes:
1. ⚠️ **Add as PLAIN TEXT** - Do NOT check "Secret" box
2. ✅ Select all environments: Production, Preview, Development
3. 🔄 Replace `https://your-project.vercel.app` with your actual Vercel URL
4. 🚀 Vercel will auto-deploy after adding environment variables

## Database Status

✅ **Migrations Applied**: 1 migration (init_postgresql)  
✅ **Seeded**: Tours, Users, Blog Posts, Regions, Countries  
✅ **Test Accounts**:
- Admin: `admin@sevadv.com` / `Admin123!`
- User: `user@test.com` / `User123!`

## Neon Features

- ✅ **Serverless**: Auto-scaling, pay-per-use
- ✅ **Connection Pooling**: Built-in pgbouncer
- ✅ **Branching**: Create database branches for development
- ✅ **Auto-suspend**: Pauses after inactivity (free tier)
- ✅ **Fast**: Low-latency connections

## Commands

### Run Migrations
```bash
npx prisma migrate deploy
```

### Seed Database
```bash
npm run seed
```

### View Database
```bash
npx prisma studio
```

### Generate Prisma Client
```bash
npx prisma generate
```

## Troubleshooting

### Migration Issues
If migrations fail, check:
1. DIRECT_URL is set correctly (without pgbouncer)
2. Database is accessible from your IP
3. SSL mode is set to `require`

### Connection Errors
- Use pooled URL (DATABASE_URL) for queries
- Use direct URL (DIRECT_URL) for migrations
- Ensure `sslmode=require` is in connection string

### Vercel Deployment Fails
1. Verify all environment variables are added as **plain text** (not secrets)
2. Check Vercel build logs for specific errors
3. Ensure DATABASE_URL and DIRECT_URL are both set
4. Confirm NEXTAUTH_URL matches your Vercel domain

## Next Steps

1. ✅ Push to GitHub (already done)
2. 🔄 Add environment variables to Vercel
3. 🚀 Deploy to Vercel
4. ✅ Test production deployment

## Resources

- [Neon Console](https://console.neon.tech/)
- [Neon Documentation](https://neon.tech/docs)
- [Prisma with Neon](https://neon.tech/docs/guides/prisma)
- [Vercel Deployment](https://vercel.com/docs)
