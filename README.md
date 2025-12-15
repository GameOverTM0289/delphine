# 🌊 Delphine Swimwear - Full E-Commerce Platform

A complete Next.js 14 e-commerce platform with PostgreSQL database, authentication, admin dashboard, and beautiful Mediterranean-inspired design.

## ✨ Features

- **🛒 Full E-commerce**: Products, cart, checkout
- **👤 User Authentication**: Register, login, account management
- **👑 Admin Dashboard**: Manage products, orders, customers, hero slides, settings
- **🎨 Beautiful Design**: Stunning hero slider, animations, responsive
- **🗄️ PostgreSQL Database**: Full Prisma ORM integration
- **📱 Mobile First**: Fully responsive design

## 🚀 Quick Start (5 Minutes)

### Step 1: Get a Free PostgreSQL Database

Go to **[neon.tech](https://neon.tech)** (free tier):
1. Sign up → Create Project
2. Copy your connection string (looks like: `postgresql://user:pass@host/db?sslmode=require`)

### Step 2: Setup Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your database URL
DATABASE_URL="postgresql://YOUR_CONNECTION_STRING_HERE"
NEXTAUTH_SECRET="run-this-command-below-to-generate"
NEXTAUTH_URL="http://localhost:3000"
```

Generate secret:
```bash
openssl rand -base64 32
```

### Step 3: Install & Setup Database

```bash
# Install dependencies
npm install

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### Step 4: Run!

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🔐 Demo Accounts

After seeding:
- **Admin**: admin@delphine.com / admin123
- **Customer**: test@example.com / test123

---

## 📸 EASY IMAGE SYSTEM

### Adding Your Own Images

Images can be added in two ways:

#### Option 1: Local Images (Recommended)

Put your images in the `public/images/` folder:

```
public/
  images/
    hero/
      slide-1.jpg    (1920x1080 or larger)
      slide-2.jpg
      slide-3.jpg
    products/
      product-slug-1.jpg   (800x1000)
      product-slug-2.jpg
    categories/
      bikinis.jpg    (800x800)
      one-pieces.jpg
    collections/
      summer-2024.jpg  (1200x800)
```

Then reference them in the database as `/images/hero/slide-1.jpg`

#### Option 2: External URLs

Use any image URL (Unsplash, Cloudinary, etc.):
- Just paste the full URL in the admin panel or database

### Image Naming Convention

For products:
- `{product-slug}-1.jpg` - Primary image
- `{product-slug}-2.jpg` - Secondary image
- etc.

Example: For a product with slug "riviera-bikini-set":
- `riviera-bikini-set-1.jpg`
- `riviera-bikini-set-2.jpg`

### Recommended Image Sizes

| Type | Size | Format |
|------|------|--------|
| Hero Slides | 1920x1080 | JPG |
| Product Images | 800x1000 | JPG |
| Category Images | 800x800 | JPG |
| Collection Images | 1200x800 | JPG |

---

## 🌐 Deploy to Netlify

### Option A: GitHub + Netlify (Recommended)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/delphine-swimwear.git
git push -u origin master
```

2. Go to [Netlify](https://netlify.com):
   - "Add new site" → "Import from Git"
   - Select your repo
   - Add environment variables:
     - `DATABASE_URL` = your Neon connection string
     - `NEXTAUTH_SECRET` = your generated secret
     - `NEXTAUTH_URL` = https://your-site.netlify.app
   - Deploy!

### Option B: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify env:set DATABASE_URL "your-connection-string"
netlify env:set NEXTAUTH_SECRET "your-secret"
netlify deploy --prod
```

---

## 🗄️ Database Commands

```bash
# View database in browser
npm run db:studio

# Reset and reseed database
npm run db:push
npm run db:seed

# Generate Prisma client after schema changes
npx prisma generate
```

---

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Sample data
├── public/
│   └── images/          # Your images go here!
├── src/
│   ├── app/
│   │   ├── (auth)/      # Login, register pages
│   │   ├── (shop)/      # Store pages
│   │   ├── admin/       # Admin dashboard
│   │   └── api/         # API routes
│   ├── components/      # React components
│   └── lib/             # Utilities, database, store
├── .env.example         # Environment template
├── netlify.toml         # Netlify config
└── package.json
```

---

## 🛠️ Admin Dashboard

Access at `/admin` (login with admin account)

Features:
- **Dashboard**: Overview stats
- **Products**: Add/edit/delete products
- **Orders**: View and manage orders
- **Customers**: View customer list
- **Hero Slides**: Manage homepage slider
- **Settings**: Store configuration

---

## 🎨 Customization

### Colors

Edit `tailwind.config.ts`:
```ts
colors: {
  cream: { ... },
  ocean: { ... },
  coral: { ... },
}
```

### Brand

Update in:
- `src/app/layout.tsx` - Site title/description
- `src/components/layout/Header.tsx` - Logo
- `src/components/layout/Footer.tsx` - Footer content
- `prisma/seed.ts` - Default settings

---

## 📞 Support

Having issues? Check:
1. Database connection string is correct
2. `npm run db:push` completed successfully
3. Environment variables are set in Netlify

---

## 📄 License

MIT License - Free for personal and commercial use.

---

Built with ❤️ using Next.js 14, Prisma, PostgreSQL, and Tailwind CSS.
