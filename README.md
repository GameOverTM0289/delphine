# Delphine Swimwear 🏖️

Modern e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern Design**: Playfair Display (titles) + Raleway (body) fonts
- **Full E-commerce**: Product catalog, cart, checkout with validation
- **Form Validation**: Email regex, international phone prefixes (Albania default)
- **Responsive**: Mobile-first design
- **Secure**: Next.js 14.2.35 (latest security patch)

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Deploy!

Or use CLI:
```bash
npm i -g vercel
vercel
```

## 🖼️ Adding Your Images

Replace placeholder images in `public/images/`:

| Folder | Purpose | Size |
|--------|---------|------|
| `/images/hero/` | Hero slider | 1920x1080 |
| `/images/products/` | Product photos | 800x1000 |
| `/images/collections/` | Collection covers | 800x1000 |
| `/images/about/` | About page | 800x1000 |
| `/images/instagram/` | Instagram grid | 600x600 |

Update paths in `/src/lib/data/products.ts` if needed.

## 📦 Tech Stack

- Next.js 14.2.35 (secure)
- TypeScript
- Tailwind CSS 3.4.15
- Zustand (cart state)
- Google Fonts (Playfair Display, Raleway)

## 📄 License

MIT
