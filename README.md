# Delphine - Luxury Swimwear E-commerce

## Quick Start

```bash
npm install
npm run dev
```

Visit: http://localhost:3000

---

## 🖼️ HOW TO ADD YOUR OWN IMAGES

### 1. HERO SLIDER IMAGES (Homepage)

**Location:** `public/images/hero/`

| Filename | Description | Size |
|----------|-------------|------|
| `slide-1.jpg` | First slider image | 1920x1080px |
| `slide-2.jpg` | Second slider image | 1920x1080px |
| `slide-3.jpg` | Third slider image | 1920x1080px |

**Steps:**
1. Prepare 3 images (1920x1080px recommended)
2. Name them: `slide-1.jpg`, `slide-2.jpg`, `slide-3.jpg`
3. Put them in `public/images/hero/`
4. Edit `src/app/(shop)/page.tsx` - change `fallback` URLs to `/images/hero/slide-X.jpg`

---

### 2. COLLECTION IMAGES (Homepage Categories)

**Location:** `public/images/collections/`

| Filename | Description | Size |
|----------|-------------|------|
| `bikinis.jpg` | Bikinis category | 600x800px |
| `one-pieces.jpg` | One pieces category | 600x800px |
| `cover-ups.jpg` | Cover ups category | 600x800px |
| `accessories.jpg` | Accessories category | 600x800px |

**Steps:**
1. Prepare 4 images (600x800px, portrait)
2. Name them as above
3. Put in `public/images/collections/`
4. Edit `src/app/(shop)/page.tsx` - change `fallback` URLs

---

### 3. PRODUCT IMAGES

**Location:** `public/images/products/`

**Naming convention:** `product-slug-1.jpg`, `product-slug-2.jpg`

Example: For "Riviera Bikini Set"
- `riviera-bikini-set-1.jpg` (main image)
- `riviera-bikini-set-2.jpg` (hover image)

**Size:** 800x1066px (3:4 ratio) recommended

**Steps:**
1. Add images to `public/images/products/`
2. When adding products in Admin, use path: `/images/products/your-image.jpg`

---

### 4. LOGO FILES

**Location:** `public/`

| Filename | Usage | Size |
|----------|-------|------|
| `logo.png` | Header (desktop), Footer | Your logo with tagline |
| `icon.png` | Header (mobile), Favicon | Just the icon/symbol |

**Steps:**
1. Replace `logo.png` with your full logo (transparent PNG)
2. Replace `icon.png` with your icon only (transparent PNG)
3. Run `npm run build` to update favicon

---

## 📁 Image Folder Structure

```
public/
├── logo.png           # Full logo
├── icon.png           # Icon only
├── favicon.ico        # Browser favicon
├── images/
│   ├── hero/
│   │   ├── slide-1.jpg
│   │   ├── slide-2.jpg
│   │   └── slide-3.jpg
│   ├── collections/
│   │   ├── bikinis.jpg
│   │   ├── one-pieces.jpg
│   │   ├── cover-ups.jpg
│   │   └── accessories.jpg
│   └── products/
│       ├── product-name-1.jpg
│       └── product-name-2.jpg
```

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| White | `#ffffff` | Backgrounds, text |
| Black | `#000000` | Text, buttons |
| Slate Blue | `#546d9d` | Accents |
| Cream | `#f1efe7` | Main background |

---

## 📱 Image Sizes Guide

| Type | Size | Ratio |
|------|------|-------|
| Hero Slider | 1920x1080px | 16:9 |
| Collection | 600x800px | 3:4 |
| Product | 800x1066px | 3:4 |
| Logo | Your size | Transparent PNG |
| Icon | 200x200px+ | 1:1 |

---

## 🚀 Deployment

### Netlify
1. Connect your GitHub repo
2. Build command: `npm run build`
3. Publish directory: `.next`

### Vercel
1. Import from GitHub
2. Framework: Next.js (auto-detected)
3. Deploy!

---

## 🔑 Environment Variables

Create `.env` file:

```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 📞 Support

Email: hello@delphineswimwear.com
