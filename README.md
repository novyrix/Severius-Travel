# Severius Travel & Adventures 🌍

> **Your trusted gateway to authentic African adventures**

A modern, full-featured travel booking platform specializing in African safari experi## 📁 Project Structure

```
severius-travel/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API endpoints
│   │   ├── [locale]/     # i18n pages
│   │   └── admin/        # Admin dashboard
│   ├── components/       # React components
│   ├── lib/             # Utilities & helpers
│   └── styles/          # Global styles
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── seed.ts          # Database seeding
│   └── migrations/      # Migration files
├── public/              # Static assets
├── messages/            # i18n translations
└── DEPLOYMENT.md        # Deployment guide
```

## 🔧 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript checks
npm run seed             # Seed database
npx prisma studio        # Open Prisma Studio
npx prisma migrate dev   # Run migrations (dev)
```

## 🌍 Environment Variables

See `.env.example` for all required variables. Key variables:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Authentication secret
- `RESEND_API_KEY` - Email service API key
- `PESAPAL_CONSUMER_KEY` - Payment gateway key

## 📞 Contact Severius Travel

**Office**: Westlands, Nairobi, Kenya  
**Email**: info@severiusadventuresandtravel.com  
**Phone**: +254 780 419 605  
**Website**: [severiusadventuresandtravel.com](https://severiusadventuresandtravel.com)

## 📝 License

© 2024 Severius Travel & Adventures. All rights reserved.

---

*Creating unforgettable African adventures since 2014* ✨journeys, and luxury getaways. Built with Next.js 15, TypeScript, and optimized for Vercel deployment.

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npx prisma migrate dev

# Seed the database
npm run seed

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Deploy to Vercel
See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete deployment guide.

**Quick Deploy:**
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## ✨ Features

### 🎨 **User Features**
- Multi-language support (English, Spanish, French)
- Advanced tour search & filtering
- Interactive photo galleries
- Real-time booking system
- Secure payment processing (PesaPal)
- Personal dashboard for managing bookings
- Responsive mobile-first design

### 👨‍💼 **Admin Features**
- Complete tour management
- Booking & payment oversight
- Rich text blog editor (TipTap)
- Customer communication tools
- Analytics dashboard

### 🛡️ **Security & Performance**
- NextAuth.js authentication
- CSRF & XSS protection
- Rate limiting on API routes
- Server-side rendering
- Image optimization
- SEO optimized

## 💻 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS + Framer Motion
- **Authentication**: NextAuth.js
- **Email**: Resend
- **Payments**: PesaPal
- **Deployment**: Vercel
- **CMS**: TipTap Rich Text Editor

## 🏢 About Severius Travel

Founded in 2014, Severius Travel has been creating unforgettable travel experiences across East Africa, Southern Africa, and North Africa. We design personalized journeys that reflect your interests, pace, and style.

### 🌟 Our Mission
To make Africa's most beautiful destinations accessible, seamless, and inspiring for travelers worldwide through expert planning, trusted partnerships, and genuine passion for discovery.

### 🎯 What We Offer
- **Handcrafted Safari Tours** - From the Maasai Mara to Serengeti
- **Cultural Experiences** - Authentic interactions with local communities  
- **Luxury Accommodations** - Carefully selected lodges and camps
- **Personalized Service** - Every journey tailored to your preferences
- **Expert Guides** - Local knowledge and wildlife expertise
- **Seamless Booking** - Easy online reservations and secure payments

## 🌍 Featured Destinations

### 🦁 **Kenya**
- Maasai Mara National Reserve
- Amboseli National Park
- Lake Nakuru National Park
- Samburu National Reserve

### � **Tanzania** 
- Serengeti National Park
- Ngorongoro Crater
- Mount Kilimanjaro
- Tarangire National Park

### 🦒 **Uganda**
- Bwindi Impenetrable Forest
- Queen Elizabeth National Park
- Murchison Falls National Park

### 🏝️ **Island Escapes**
- Zanzibar Beach Holidays
- Seychelles Luxury Resorts
- Madagascar Adventures

## ✨ Website Features

### 🎨 **User Experience**
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Multi-Language Support** - English, Spanish, French
- **Advanced Search & Filters** - Find tours by destination, duration, difficulty
- **Interactive Photo Galleries** - Immersive tour previews
- **Real-Time Availability** - Live booking calendar

### 🛒 **Booking System**
- **Smart Tour Search** - Filter by region, country, price, duration
- **Detailed Itineraries** - Day-by-day tour breakdowns
- **Flexible Group Sizes** - From 2 to 20+ travelers
- **Instant Booking Confirmation** - Immediate reservation processing
- **Secure Payment Processing** - PesaPal integration (M-PESA, Cards, Bank Transfer)

### � **Customer Portal**
- **Personal Dashboard** - Manage all your bookings in one place
- **Booking History** - Track past and upcoming adventures  
- **Payment Management** - View receipts and pending payments
- **Travel Documents** - Access itineraries and travel guides

### � **Travel Blog**
- **Destination Guides** - Expert insights and travel tips
- **Safari Stories** - Real experiences from our guides
- **Cultural Features** - Learn about local traditions and wildlife
- **Travel Photography** - Stunning visuals from across Africa

### �‍💼 **Admin Management**
- **Tour Management** - Create and update tour packages
- **Booking Oversight** - Monitor reservations and payments
- **Content Management** - Rich text editor for blog posts
- **Customer Communication** - Email notifications and newsletters
- **Analytics Dashboard** - Track bookings, revenue, and performance

## 🛠️ Technology Stack

**Built with modern web technologies for performance, security, and scalability:**

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Responsive utility-first styling
- **Framer Motion** - Smooth animations and transitions

### Backend  
- **Next.js API Routes** - Server-side functionality
- **Prisma ORM** - Type-safe database operations
- **SQLite/PostgreSQL** - Reliable data storage

### Authentication & Security
- **NextAuth.js** - Secure user authentication
- **bcrypt** - Password hashing
- **CSRF Protection** - Security against cross-site attacks
- **Rate Limiting** - API protection

### Integrations
- **PesaPal Payment Gateway** - African payment processing (M-PESA, Cards)
- **Resend Email Service** - Transactional emails and newsletters
- **Google Analytics** - Website analytics and insights
- **Next.js Sitemap** - SEO optimization

### Performance & SEO
- **Server-Side Rendering** - Fast initial page loads
- **Static Site Generation** - Optimized performance
- **Meta Tag Optimization** - Search engine friendly
- **Image Optimization** - Automatic image processing
- **Mobile-First Design** - Responsive across all devices

## � Contact Severius Travel

**Office**: Westlands, Nairobi, Kenya  
**Email**: info@severiusadventuresandtravel.com  
**Phone**: +254 780 419 605  
**Website**: [severiusadventuresandtravel.com](https://severiusadventuresandtravel.com)

### 🌐 Follow Our Journey
- **Instagram**: @severiustravel
- **Facebook**: Severius Travel & Adventures  
- **Twitter**: @severiustravel
- **LinkedIn**: Severius Travel & Adventures

---

*Creating unforgettable African adventures since 2014* ✨