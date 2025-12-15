# Delphine - Luxury Swimwear E-commerce

## 🚀 Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with your credentials
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

---

## 📦 COMPLETE SETUP GUIDE

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup PostgreSQL Database

**Option A: Local PostgreSQL**

1. Install PostgreSQL: https://www.postgresql.org/download/
2. Create database:
```bash
psql -U postgres
CREATE DATABASE delphine;
\q
```
3. Update `.env`:
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/delphine?schema=public"
```

**Option B: Cloud PostgreSQL (Recommended)**

Use one of these free/cheap options:

| Provider | Free Tier | URL |
|----------|-----------|-----|
| **Neon** | 0.5GB free | https://neon.tech |
| **Supabase** | 500MB free | https://supabase.com |
| **Railway** | $5 credit | https://railway.app |
| **Vercel Postgres** | 256MB free | https://vercel.com/storage/postgres |

Copy the connection string to `.env`:
```env
DATABASE_URL="postgresql://user:pass@host:5432/database?sslmode=require"
```

### Step 3: Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:
```env
# Database
DATABASE_URL="postgresql://..."

# Auth (generate a random string)
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# POK Payment (get from merchant.pokpay.io)
POK_API_URL="https://api-staging.pokpay.io"
POK_KEY_ID="your-key-id"
POK_KEY_SECRET="your-key-secret"
POK_MERCHANT_ID="your-merchant-id"
```

### Step 4: Initialize Database

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### Step 5: Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## 💳 POK PAYMENT SETUP

### 1. Create POK Merchant Account

1. Go to https://merchant.pokpay.io/
2. Register for a merchant account
3. Complete verification

### 2. Get API Credentials

In POK Merchant Dashboard:
1. Go to Settings → API Keys
2. Create new SDK Key
3. Copy:
   - Key ID
   - Key Secret
   - Merchant ID

### 3. Configure Environment

For **Staging** (testing):
```env
POK_API_URL="https://api-staging.pokpay.io"
POK_KEY_ID="your-staging-key-id"
POK_KEY_SECRET="your-staging-key-secret"
POK_MERCHANT_ID="your-merchant-id"
```

For **Production** (live):
```env
POK_API_URL="https://api.pokpay.io"
POK_KEY_ID="your-production-key-id"
POK_KEY_SECRET="your-production-key-secret"
POK_MERCHANT_ID="your-merchant-id"
```

### 4. Setup Webhook

In POK Dashboard:
1. Go to Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/pok`
3. Select events: `payment.completed`, `payment.failed`

---

## 🖼️ ADD YOUR IMAGES

### Folder Structure

```
public/
├── logo.png              ← Your full logo (transparent PNG)
├── icon.png              ← Icon only (transparent PNG)
│
└── images/
    ├── hero/
    │   ├── slide-1.jpg   ← 1920x1080px
    │   ├── slide-2.jpg
    │   └── slide-3.jpg
    │
    ├── collections/
    │   ├── bikinis.jpg   ← 600x800px
    │   └── one-pieces.jpg
    │
    └── products/
        ├── riviera-bikini-set-1.jpg    ← 800x1066px
        ├── riviera-bikini-set-2.jpg
        ├── santorini-bandeau-set-1.jpg
        ├── santorini-bandeau-set-2.jpg
        ├── capri-sport-bikini-1.jpg
        ├── capri-sport-bikini-2.jpg
        ├── aegean-one-piece-1.jpg
        ├── aegean-one-piece-2.jpg
        ├── amalfi-plunge-one-piece-1.jpg
        └── amalfi-plunge-one-piece-2.jpg
```

### Image Sizes

| Type | Size | Format |
|------|------|--------|
| Hero Slider | 1920×1080px | JPG |
| Collection | 600×800px | JPG |
| Product | 800×1066px | JPG |
| Logo | Any | PNG (transparent) |
| Icon | 200×200px+ | PNG (transparent) |

---

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| White | `#ffffff` | Backgrounds |
| Black | `#000000` | Text, buttons |
| Slate Blue | `#546d9d` | Accents |
| Cream | `#f1efe7` | Main background |

---

## 👤 Admin Access

After seeding:
- **Email:** admin@delphine.com
- **Password:** admin123
- **URL:** http://localhost:3000/admin

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to vercel.com
3. Import your repository
4. Add environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your vercel domain)
   - `POK_API_URL`
   - `POK_KEY_ID`
   - `POK_KEY_SECRET`
   - `POK_MERCHANT_ID`
5. Deploy!

### Deploy to Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables
4. Deploy!

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (shop)/          ← Public pages
│   │   ├── page.tsx     ← Homepage
│   │   ├── shop/        ← Shop page
│   │   ├── products/    ← Product pages
│   │   ├── checkout/    ← Checkout + success
│   │   └── ...
│   ├── admin/           ← Admin dashboard
│   └── api/             ← API routes
│       ├── checkout/    ← Checkout API
│       └── webhooks/pok ← POK webhook
├── components/
│   ├── layout/          ← Header, Footer
│   ├── cart/            ← Cart drawer
│   └── ...
├── lib/
│   ├── db/prisma.ts     ← Database client
│   ├── store/           ← Zustand stores
│   └── utils.ts         ← Helpers
└── prisma/
    ├── schema.prisma    ← Database schema
    └── seed.ts          ← Seed data
```

---

## 📦 Products (5 Total)

**Bikinis (3):**
1. Riviera Bikini Set - €89
2. Santorini Bandeau Set - €95
3. Capri Sport Bikini - €85

**One Pieces (2):**
4. Aegean One Piece - €120
5. Amalfi Plunge One Piece - €135

---

## 🔧 Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Database commands
npx prisma studio      # Visual database editor
npx prisma db push     # Push schema changes
npx prisma db seed     # Run seed
npx prisma migrate dev # Create migration

# Generate Prisma client
npx prisma generate
```

---

## ❓ Troubleshooting

### Database connection error
- Check `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- For cloud DB, check if IP is whitelisted

### POK payment not working
- Verify API credentials in `.env`
- Use staging URL for testing
- Check webhook URL is accessible

### Images not showing
- Place images in correct folders
- Use exact filenames from README
- Check file extensions (lowercase .jpg/.png)

---

## 📞 Support

Email: hello@delphineswimwear.com
