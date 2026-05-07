# reviewed.market

> A marketplace where tech YouTubers sell gear from their videos. Every listing is linked to the review it appeared in.

## GitHub repo name
**`reviewed-market`**

---

## Tech stack
- **Frontend + API**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Auth**: NextAuth.js with Google/YouTube OAuth
- **Payments**: Stripe
- **YouTube**: YouTube Data API v3
- **Hosting**: Vercel (free tier)
- **Shipping**: Shiprocket (integrate manually via their API)

---

## Folder structure
```
reviewed-market/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout + Navbar
│   ├── globals.css               # Global styles
│   ├── browse/
│   │   └── page.tsx              # Browse + search + filter
│   ├── listing/
│   │   └── [id]/page.tsx         # Individual listing page
│   ├── dashboard/
│   │   ├── page.tsx              # Creator dashboard
│   │   └── new/page.tsx          # Create listing flow
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── api/
│       ├── listings/route.ts     # GET all / POST new listing
│       ├── youtube/video/route.ts# Fetch YouTube video meta
│       ├── checkout/route.ts     # Stripe checkout session
│       └── webhooks/stripe/route.ts # Stripe webhook
├── components/
│   ├── layout/Navbar.tsx
│   └── ui/ListingCard.tsx
├── lib/
│   ├── supabase.ts
│   ├── youtube.ts
│   └── utils.ts
├── types/index.ts
├── supabase-schema.sql           # Run this in Supabase SQL editor
├── .env.local.example            # Copy to .env.local and fill in
└── tailwind.config.ts
```

---

## Setup

### 1. Clone and install
```bash
git clone https://github.com/yourusername/reviewed-market
cd reviewed-market
npm install
cp .env.local.example .env.local
```

### 2. Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor → paste contents of `supabase-schema.sql` → Run
3. Copy your project URL and anon key into `.env.local`

### 3. Google OAuth (YouTube verification)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → Enable **YouTube Data API v3**
3. Create OAuth 2.0 credentials
4. Add `http://localhost:3000/api/auth/callback/google` as redirect URI
5. Copy Client ID and Secret into `.env.local`
6. Get an API key for the YouTube Data API

### 4. Stripe
1. Create an account at [stripe.com](https://stripe.com)
2. Copy publishable + secret keys into `.env.local`
3. For webhooks locally, install Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### 5. Run
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Add all `.env.local` variables in Vercel dashboard → Settings → Environment Variables.

---

## Revenue model
- 10% platform fee on every sale
- Creator receives 90% of listing price
- Stripe fees (~2%) deducted from platform fee

---

## Roadmap
- [ ] Image uploads via Supabase Storage
- [ ] Shiprocket integration for shipping
- [ ] Creator payout via Stripe Connect
- [ ] Email notifications (Resend)
- [ ] Mobile app (React Native / Expo)
