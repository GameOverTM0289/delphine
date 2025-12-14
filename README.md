# Delphine - Luxury Swimwear E-commerce

## Quick Start

```bash
npm install
npm run dev
```

Visit: http://localhost:3000

---

## 📦 Products

**5 Products Total:**
- 3 Bikinis (Riviera, Santorini, Capri)
- 2 One Pieces (Aegean, Amalfi)

---

## 🖼️ HOW TO ADD YOUR OWN IMAGES

### 1. HERO SLIDER IMAGES (Homepage)

**Location:** `public/images/hero/`

| Filename | Size |
|----------|------|
| `slide-1.jpg` | 1920x1080px |
| `slide-2.jpg` | 1920x1080px |
| `slide-3.jpg` | 1920x1080px |

### 2. COLLECTION IMAGES (Homepage)

**Location:** `public/images/collections/`

| Filename | Size |
|----------|------|
| `bikinis.jpg` | 600x800px |
| `one-pieces.jpg` | 600x800px |

### 3. PRODUCT IMAGES

**Location:** `public/images/products/`

| Filename | Product |
|----------|---------|
| `riviera-bikini-set-1.jpg` | Riviera Bikini main |
| `riviera-bikini-set-2.jpg` | Riviera Bikini hover |
| `santorini-bandeau-set-1.jpg` | Santorini main |
| `santorini-bandeau-set-2.jpg` | Santorini hover |
| `capri-sport-bikini-1.jpg` | Capri main |
| `capri-sport-bikini-2.jpg` | Capri hover |
| `aegean-one-piece-1.jpg` | Aegean main |
| `aegean-one-piece-2.jpg` | Aegean hover |
| `amalfi-plunge-one-piece-1.jpg` | Amalfi main |
| `amalfi-plunge-one-piece-2.jpg` | Amalfi hover |

**Size:** 800x1066px (3:4 ratio)

### 4. LOGO FILES

**Location:** `public/`

| Filename | Usage |
|----------|-------|
| `logo.png` | Header (desktop), Footer |
| `icon.png` | Header (mobile), Favicon |

---

## 📁 Folder Structure

```
public/
├── logo.png
├── icon.png
├── favicon.ico
└── images/
    ├── hero/
    │   ├── slide-1.jpg
    │   ├── slide-2.jpg
    │   └── slide-3.jpg
    ├── collections/
    │   ├── bikinis.jpg
    │   └── one-pieces.jpg
    └── products/
        ├── riviera-bikini-set-1.jpg
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

---

## 🎨 Color Palette

| Color | Hex |
|-------|-----|
| White | `#ffffff` |
| Black | `#000000` |
| Slate Blue | `#546d9d` |
| Cream | `#f1efe7` |

---

## 📐 Image Sizes

| Type | Size | Format |
|------|------|--------|
| Hero Slider | 1920x1080px | JPG |
| Collection | 600x800px | JPG |
| Product | 800x1066px | JPG |
| Logo | Any | PNG (transparent) |
| Icon | 200x200px+ | PNG (transparent) |

---

## 🔧 Database Setup

```bash
# Setup database
npx prisma generate
npx prisma db push

# Seed products
npx prisma db seed
```

---

## 🔑 Environment Variables

Create `.env` file:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 👤 Admin Access

After seeding:
- Email: `admin@delphine.com`
- Password: `admin123`
- URL: `http://localhost:3000/admin`

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

### Netlify
1. Build: `npm run build`
2. Publish: `.next`

---

## 📞 Support

Email: hello@delphineswimwear.com
