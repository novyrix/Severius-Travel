# Severius Adventures & Travel# Severius Travel & Adventures 🌍



> Your Gateway to Unforgettable African Adventures> **Your trusted gateway to authentic African adventures**



[![Live Site](https://img.shields.io/badge/Live-severiusadventuresandtravel.com-brown)](https://severiusadventuresandtravel.com)A modern, full-featured travel booking platform specializing in African safari experiences, cultural journeys, and luxury getaways. Built with Next.js 15, TypeScript, PostgreSQL, and optimized for Vercel deployment.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black)](https://nextjs.org/)

[![License](https://img.shields.io/badge/License-Proprietary-red)](#)## 🚀 Quick Start



---### Local Development

```bash

## 🌍 About Severius Travel# Install dependencies

npm install

Severius Adventures & Travel is a premier travel company specializing in authentic African safari experiences, cultural tours, and adventure packages across East Africa and beyond. We create unforgettable journeys that connect travelers with the natural beauty, wildlife, and rich cultures of Africa.

# Set up environment variables

### 🎯 Our Missioncp .env.example .env

# Edit .env with your Neon PostgreSQL credentials

To provide world-class travel experiences that inspire, educate, and create lasting memories while promoting sustainable tourism and supporting local communities.

# Run database migrations

---npx prisma migrate dev



## ✨ Featured Destinations# Start development server

npm run dev

- **🇰🇪 Kenya** - Maasai Mara, Amboseli, Diani Beach```

- **🇹🇿 Tanzania** - Serengeti, Kilimanjaro, Zanzibar

- **🇺🇬 Uganda** - Bwindi Forest, Murchison FallsVisit `http://localhost:3000`

- **🇷🇼 Rwanda** - Volcanoes National Park, Gorilla Trekking

- **🇿🇦 South Africa** - Kruger, Cape Town, Garden Route### Deploy to Vercel

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete deployment guide.

---

## ✨ Features

## 🚀 What We Offer

### 🎨 **User Features**

### Safari Packages- Multi-language support (English, Spanish, French)

Expert-guided wildlife safaris with guaranteed wildlife sightings and luxury accommodations.- 24 curated safari tours across 9 African countries

- Advanced tour search & filtering

### Cultural Tours- Interactive photo galleries (130+ high-quality images)

Immersive experiences with local communities, traditional ceremonies, and authentic African culture.- Real-time booking system

- Secure payment processing (PesaPal - M-PESA, Cards, Bank Transfer)

### Adventure Activities- Personal dashboard for managing bookings

Hiking, mountain climbing, hot air balloon safaris, and water sports.- Responsive mobile-first design



### Beach Holidays### 👨‍💼 **Admin Features**

Pristine coastal getaways in Zanzibar, Diani, and other tropical paradises.- Complete user management

- Booking & payment oversight

### Custom Itineraries- Rich text blog editor (TipTap)

Tailored travel experiences designed around your preferences and budget.- Analytics dashboard

- Email campaign management

---

### 🛡️ **Security & Performance**

## 💼 Why Choose Severius?- NextAuth.js authentication (auto-verified registration)

- Honeypot & rate limiting protection

✅ **Expert Local Guides** - Knowledgeable guides with deep local expertise  - Server-side rendering & static generation

✅ **Competitive Pricing** - Best value safari packages with no hidden fees  - Image optimization

✅ **24/7 Support** - Round-the-clock customer service and on-ground assistance  - SEO optimized with dynamic sitemaps

✅ **Sustainable Tourism** - Eco-friendly practices and community support  

✅ **Flexible Booking** - Easy online booking with flexible payment options  ## 💻 Tech Stack

✅ **Safety First** - Comprehensive travel insurance and safety protocols

- **Framework**: Next.js 15.5.5 (App Router)

---- **Language**: TypeScript 5.5.4

- **Database**: PostgreSQL (Neon) with Prisma ORM 6.17.1

## 📞 Contact Us- **Styling**: Tailwind CSS 4.1.14 + Framer Motion

- **Authentication**: NextAuth.js 4.24.11

**Head Office:**  - **Payments**: PesaPal API

Westlands, Nairobi, Kenya- **Deployment**: Vercel

- **Email**: Resend API (optional)

**Email:**  

info@severiusadventuresandtravel.com## 📁 Project Structure



**Phone:**  ```

+254 780 419 605severius-travel/

├── src/

**Website:**  │   ├── app/              # Next.js App Router

[severiusadventuresandtravel.com](https://severiusadventuresandtravel.com)│   │   ├── api/          # API endpoints

│   │   ├── admin/        # Admin dashboard

**Social Media:**  │   │   ├── dashboard/    # User dashboard

- [Facebook](https://www.facebook.com/severiustravels/)│   │   ├── tours/        # Tour pages

- [Instagram](https://www.instagram.com/severiustravels/)│   │   └── blog/         # Blog pages

- [TikTok](https://www.tiktok.com/@severius.travels)│   ├── components/       # React components

- [TripAdvisor](https://www.tripadvisor.com/Attraction_Review-g482864-d33033760-Reviews-Severius_Adventures_And_Travels-Embu_Eastern_Province.html)│   │   ├── ui/          # Reusable UI components

│   │   └── admin/       # Admin components

---│   ├── data/            # Static tour data (24 tours)

│   ├── lib/             # Utilities & helpers

## 🌟 Popular Tours│   └── styles/          # Global styles

├── prisma/

### Wildlife Safaris│   ├── schema.prisma    # Database schema

- **Maasai Mara Great Migration** - 5 Days│   └── migrations/      # Migration files

- **Serengeti & Ngorongoro Crater** - 7 Days  ├── public/

- **Uganda Gorilla Trekking** - 4 Days│   └── images/          # 130+ tour & destination images

- **Rwanda Primate Adventure** - 6 Days├── messages/            # i18n translations (en, es, fr)

└── scripts/

### Beach & Island Escapes    └── delete-all-blogs.ts  # Database management utility

- **Zanzibar Beach Paradise** - 5 Days```

- **Diani Beach Getaway** - 4 Days

- **Coastal Kenya Explorer** - 6 Days## 🔧 Available Scripts



### Mountain Adventures```bash

- **Mount Kilimanjaro Climb** - 8 Daysnpm run dev              # Start development server

- **Mount Kenya Expedition** - 5 Daysnpm run build            # Build for production

- **Rwenzori Mountains Trek** - 9 Daysnpm run start            # Start production server

npm run lint             # Run ESLint

[View All Tours →](https://severiusadventuresandtravel.com/tours)npx prisma studio        # Open Prisma Studio (database GUI)

npx prisma migrate dev   # Run database migrations

---npx tsx scripts/delete-all-blogs.ts  # Clear blog posts

```

## 🎓 Travel Resources

## 🌍 Environment Variables

- **Blog** - Travel tips, destination guides, and safari stories

- **FAQ** - Answers to common questions about our toursCreate `.env` file with these variables:

- **Booking Policy** - Terms and conditions for bookings

- **Travel Tips** - Essential information for African travel```env

# Database (Neon PostgreSQL)

---DATABASE_URL="postgresql://..."

DIRECT_URL="postgresql://..."

## 🏆 Awards & Recognition

# Authentication

- Featured on TripAdvisorNEXTAUTH_URL="https://severiusadventuresandtravel.com"

- Trusted by thousands of happy travelersNEXTAUTH_SECRET="your-secret-here"

- Certified tour operator in Kenya, Tanzania, Uganda, and Rwanda

- Member of local tourism associations# PesaPal Payment Gateway

PESAPAL_CONSUMER_KEY="your-key"

---PESAPAL_CONSUMER_SECRET="your-secret"

PESAPAL_ENVIRONMENT="sandbox" # or "live"

## 📱 Book Your Adventure Today

# Site Configuration

Visit our website to explore tours, check availability, and book your dream African adventure:NEXT_PUBLIC_SITE_URL="https://severiusadventuresandtravel.com"

NEXT_PUBLIC_WHATSAPP_NUMBER="254780419605"

**[Browse Tours](https://severiusadventuresandtravel.com/tours)** | **[Contact Us](https://severiusadventuresandtravel.com/contact)** | **[Get a Quote](https://severiusadventuresandtravel.com/contact)**NEXT_PUBLIC_CONTACT_EMAIL="info@severiusadventuresandtravel.com"



---# Optional: Email Service

RESEND_API_KEY="re_..."

## 📄 Legal```



© 2025 Severius Adventures & Travel. All rights reserved.## 🗄️ Database



This website and its contents are proprietary to Severius Adventures & Travel. Unauthorized use, reproduction, or distribution is prohibited.### Neon PostgreSQL (Production)

- **Provider**: Neon (Vercel's managed PostgreSQL)

- [Privacy Policy](https://severiusadventuresandtravel.com/privacy)- **Connection**: Pooled via pgbouncer (9 connections)

- [Terms & Conditions](https://severiusadventuresandtravel.com/terms)- **Region**: us-east-1 (AWS)

- [Cookie Policy](https://severiusadventuresandtravel.com/cookie-policy)- **SSL**: Required

- [Booking Policy](https://severiusadventuresandtravel.com/booking-policy)

### Database Models

---- **User** - Authentication & profiles

- **Booking** - Tour reservations

## 🔒 Technology- **Post** - Blog content

- **Newsletter** - Email subscriptions

Built with modern web technologies to ensure a fast, secure, and seamless booking experience:- **Session** - NextAuth sessions

- **Account** - OAuth accounts

- **Framework:** Next.js 15 with App Router

- **Database:** PostgreSQL with Prisma ORM### Management

- **Authentication:** NextAuth.js```bash

- **Payments:** Pesapal & PayPal Integration# View database in browser

- **Email:** Resend APInpx prisma studio

- **Hosting:** Vercel

- **Languages:** TypeScript, React# Check migration status

npx prisma migrate status

---

# Apply migrations

**Made with ❤️ in Kenya 🇰🇪**npx prisma migrate deploy

```

*Experience the magic of Africa with Severius Adventures & Travel*

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