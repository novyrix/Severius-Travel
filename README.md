# Severius Travel & Adventures 🌍

> **Your trusted gateway to authentic African adventures**

A modern, full-featured travel booking platform specializing in African safari experiences, cultural journeys, and luxury getaways. Built with Next.js 15, TypeScript, PostgreSQL, and optimized for Vercel deployment.

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Neon PostgreSQL credentials

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Deploy to Vercel
See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete deployment guide.

## ✨ Features

### 🎨 **User Features**
- Multi-language support (English, Spanish, French)
- 24 curated safari tours across 9 African countries
- Advanced tour search & filtering
- Interactive photo galleries (130+ high-quality images)
- Real-time booking system
- Secure payment processing (PesaPal - M-PESA, Cards, Bank Transfer)
- Personal dashboard for managing bookings
- Responsive mobile-first design

### 👨‍💼 **Admin Features**
- Complete user management
- Booking & payment oversight
- Rich text blog editor (TipTap)
- Analytics dashboard
- Email campaign management

### 🛡️ **Security & Performance**
- NextAuth.js authentication (auto-verified registration)
- Honeypot & rate limiting protection
- Server-side rendering & static generation
- Image optimization
- SEO optimized with dynamic sitemaps

## 💻 Tech Stack

- **Framework**: Next.js 15.5.5 (App Router)
- **Language**: TypeScript 5.5.4
- **Database**: PostgreSQL (Neon) with Prisma ORM 6.17.1
- **Styling**: Tailwind CSS 4.1.14 + Framer Motion
- **Authentication**: NextAuth.js 4.24.11
- **Payments**: PesaPal API
- **Deployment**: Vercel
- **Email**: Resend API (optional)

## 📁 Project Structure

```
severius-travel/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API endpoints
│   │   ├── admin/        # Admin dashboard
│   │   ├── dashboard/    # User dashboard
│   │   ├── tours/        # Tour pages
│   │   └── blog/         # Blog pages
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   └── admin/       # Admin components
│   ├── data/            # Static tour data (24 tours)
│   ├── lib/             # Utilities & helpers
│   └── styles/          # Global styles
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Migration files
├── public/
│   └── images/          # 130+ tour & destination images
├── messages/            # i18n translations (en, es, fr)
└── scripts/
    └── delete-all-blogs.ts  # Database management utility
```

## 🔧 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npx prisma studio        # Open Prisma Studio (database GUI)
npx prisma migrate dev   # Run database migrations
npx tsx scripts/delete-all-blogs.ts  # Clear blog posts
```

## 🌍 Environment Variables

Create `.env` file with these variables:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Authentication
NEXTAUTH_URL="https://severiusadventuresandtravel.com"
NEXTAUTH_SECRET="your-secret-here"

# PesaPal Payment Gateway
PESAPAL_CONSUMER_KEY="your-key"
PESAPAL_CONSUMER_SECRET="your-secret"
PESAPAL_ENVIRONMENT="sandbox" # or "live"

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://severiusadventuresandtravel.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="254780419605"
NEXT_PUBLIC_CONTACT_EMAIL="info@severiusadventuresandtravel.com"

# Optional: Email Service
RESEND_API_KEY="re_..."
```

## 🗄️ Database

### Neon PostgreSQL (Production)
- **Provider**: Neon (Vercel's managed PostgreSQL)
- **Connection**: Pooled via pgbouncer (9 connections)
- **Region**: us-east-1 (AWS)
- **SSL**: Required

### Database Models
- **User** - Authentication & profiles
- **Booking** - Tour reservations
- **Post** - Blog content
- **Newsletter** - Email subscriptions
- **Session** - NextAuth sessions
- **Account** - OAuth accounts

### Management
```bash
# View database in browser
npx prisma studio

# Check migration status
npx prisma migrate status

# Apply migrations
npx prisma migrate deploy
```

## 🌍 Featured Destinations

### 🦁 **Kenya** (6 tours)
- Maasai Mara National Reserve
- Amboseli National Park
- Lake Nakuru National Park
- Samburu National Reserve

### � **Tanzania** (4 tours)
- Serengeti National Park
- Ngorongoro Crater
- Mount Kilimanjaro
- Tarangire National Park

### 🦒 **Uganda** (2 tours)
- Bwindi Impenetrable Forest
- Queen Elizabeth National Park

### 🦛 **Rwanda** (1 tour)
- Volcanoes National Park (Gorilla Trekking)

### 🏝️ **Zanzibar** (2 tours)
- Beach holidays & island escapes

### 🦌 **Botswana, Namibia, South Africa, Zambia, Zimbabwe** (9 tours)
- Okavango Delta, Etosha, Kruger Park, Victoria Falls, and more

**Total**: 24 handcrafted tours with 120+ verified high-quality images

## 🎯 Recent Updates (October 2025)

### ✅ Completed
- Database migrated to Neon PostgreSQL (cloud)
- All 120 tour images downloaded and verified
- Email verification removed (auto-verify on registration)
- Authentication system simplified
- Marquee component optimized (no rotation)
- Featured tours carousel enhanced (smooth scroll)
- Hero section mobile optimization
- Workspace cleaned (47 unused files removed)
- Build tested successfully

### 📝 Ready For
- Blog content (database cleared, ready for new posts)
- GitHub push (workspace cleaned and optimized)
- Production deployment (already on Vercel)

## 📞 Contact Severius Travel

**Office**: Westlands, Nairobi, Kenya  
**Email**: info@severiusadventuresandtravel.com  
**Phone**: +254 780 419 605  
**WhatsApp**: +254 780 419 605  
**Website**: [severiusadventuresandtravel.com](https://severiusadventuresandtravel.com)

## 📝 License

© 2024-2025 Severius Travel & Adventures. All rights reserved.

---

*Creating unforgettable African adventures since 2014* ✨