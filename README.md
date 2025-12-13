# Delphine Swimwear - E-commerce Website

A luxury swimwear e-commerce website built with Next.js 14, Prisma, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and NextAuth secret

# Set up the database
npx prisma generate
npx prisma db push
npx prisma db seed

# Run development server
npm run dev
```

## Adding Your Own Images

### Method 1: Easy Way (Recommended)
Simply use full URLs to your images hosted on any image service:

1. **Cloudinary** (Free tier available)
   - Upload images to Cloudinary
   - Copy the URL and paste it in the admin panel

2. **Unsplash/Pexels** (Free stock photos)
   - Find images you like
   - Right-click → Copy image address
   - Paste URL in admin panel

3. **Your own hosting**
   - Upload to any image host (AWS S3, Vercel Blob, etc.)
   - Use the full URL

### Method 2: Local Images
Place images in the `public/images/` folder:

```
public/
  images/
    products/
      your-product-1.jpg
      your-product-2.jpg
    hero/
      slide-1.jpg
      slide-2.jpg
    categories/
      bikinis.jpg
      one-pieces.jpg
```

Then reference them as `/images/products/your-product-1.jpg` in the admin panel.

### Image Guidelines
- **Product images**: 800x1000px recommended (4:5 ratio)
- **Hero slides**: 1920x1080px recommended (16:9 ratio)
- **Category images**: 800x1000px recommended (4:5 ratio)
- **Format**: JPG or WebP for best performance
- **File size**: Keep under 500KB for fast loading

### Updating Product Images via Admin
1. Go to `/admin` (login required)
2. Navigate to Products
3. Edit a product
4. Paste image URL in the image field
5. Save

### Updating Hero Slides via Admin
1. Go to `/admin`
2. Navigate to Slides
3. Add or edit slides
4. Paste image URL
5. Save

## Environment Variables

```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="generate-a-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Prisma (Database ORM)
- NextAuth.js (Authentication)
- Tailwind CSS (Styling)
- Zustand (State Management)

## Features
- Modern, animated homepage
- Custom cursor effect (desktop)
- Product catalog with filters
- Shopping cart
- Wishlist
- User authentication
- Admin dashboard
- Responsive design

## Contact Info (in code)
- Email: hello@delphineswimwear.com
- Phone: +355 69 444 4818
- Instagram: @delphine.swimwear

## Folder Structure
```
src/
  app/
    (shop)/       # Customer-facing pages
    (auth)/       # Login/register pages
    admin/        # Admin dashboard
    api/          # API routes
  components/
    cart/         # Cart components
    home/         # Homepage components
    layout/       # Header, Footer
    product/      # Product cards
    ui/           # Reusable UI components
    wishlist/     # Wishlist components
  lib/
    store/        # Zustand stores
    db/           # Prisma client
    utils.ts      # Helper functions
```

## Support
For issues or questions, contact the developer.
