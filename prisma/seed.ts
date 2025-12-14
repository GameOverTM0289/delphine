import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.category.deleteMany();
  await prisma.heroSlide.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.create({
    data: {
      email: 'admin@delphine.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  // Create test user
  const testPassword = await bcrypt.hash('test123', 12);
  await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: testPassword,
      firstName: 'Test',
      lastName: 'User',
      role: 'CUSTOMER',
    },
  });

  console.log('✅ Users created');

  // Create categories
  const bikinis = await prisma.category.create({
    data: {
      name: 'Bikinis',
      slug: 'bikinis',
      description: 'Two-piece swimwear for the modern woman',
      image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80',
    },
  });

  const onePieces = await prisma.category.create({
    data: {
      name: 'One Pieces',
      slug: 'one-pieces',
      description: 'Elegant one-piece swimsuits',
      image: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=800&q=80',
    },
  });

  console.log('✅ Categories created');

  // Create collections
  await prisma.collection.createMany({
    data: [
      {
        name: 'Summer 2024',
        slug: 'summer-2024',
        description: 'Our latest summer collection',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        featured: true,
        isActive: true,
      },
      {
        name: 'Essentials',
        slug: 'essentials',
        description: 'Timeless pieces for every wardrobe',
        image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
        featured: true,
        isActive: true,
      },
    ],
  });

  console.log('✅ Collections created');

  // Create hero slides
  await prisma.heroSlide.createMany({
    data: [
      {
        title: 'Summer Collection',
        subtitle: 'New Arrivals',
        description: 'Timeless elegance meets Mediterranean spirit',
        buttonText: 'Shop Now',
        buttonLink: '/shop',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
        position: 1,
        isActive: true,
      },
      {
        title: 'Free Shipping',
        subtitle: 'On Orders €100+',
        description: 'Enjoy complimentary delivery on all qualifying orders',
        buttonText: 'Shop Collection',
        buttonLink: '/shop',
        image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80',
        position: 2,
        isActive: true,
      },
      {
        title: 'Sustainable Luxury',
        subtitle: 'Eco-Conscious',
        description: 'Crafted from recycled ocean plastics',
        buttonText: 'Learn More',
        buttonLink: '/sustainability',
        image: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=1920&q=80',
        position: 3,
        isActive: true,
      },
    ],
  });

  console.log('✅ Hero slides created');

  // Define colors
  const colors = [
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Navy', hex: '#1e3a5f' },
    { name: 'Coral', hex: '#e07b67' },
    { name: 'Sage', hex: '#9caf88' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  // Product 1: Riviera Bikini
  const product1 = await prisma.product.create({
    data: {
      name: 'Riviera Bikini',
      slug: 'riviera-bikini',
      description: 'Our signature bikini featuring a flattering high-waisted bottom and supportive triangle top. Crafted from premium Italian Lycra with UPF 50+ protection. The perfect blend of style and comfort for long days by the sea.',
      price: 129,
      compareAtPrice: null,
      featured: true,
      isNew: true,
      isBestseller: true,
      isActive: true,
      stockQuantity: 100,
      categoryId: bikinis.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80', alt: 'Riviera Bikini Front', position: 0, isPrimary: true },
          { url: 'https://images.unsplash.com/photo-1583846783214-e82ad2d9f421?w=800&q=80', alt: 'Riviera Bikini Back', position: 1 },
        ],
      },
      variants: {
        create: sizes.flatMap((size) =>
          [colors[0], colors[2], colors[3]].map((color) => ({
            name: `${size} / ${color.name}`,
            size,
            color: color.name,
            colorHex: color.hex,
            stockQuantity: 10,
            isActive: true,
          }))
        ),
      },
    },
  });

  // Product 2: Mediterranean One Piece
  const product2 = await prisma.product.create({
    data: {
      name: 'Mediterranean One Piece',
      slug: 'mediterranean-one-piece',
      description: 'A sophisticated one-piece swimsuit with elegant cutout details. Features a scoop neckline, adjustable straps, and built-in support. Made from our signature eco-friendly fabric blend.',
      price: 165,
      compareAtPrice: 195,
      featured: true,
      isNew: false,
      isBestseller: true,
      isActive: true,
      stockQuantity: 75,
      categoryId: onePieces.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=800&q=80', alt: 'Mediterranean One Piece Front', position: 0, isPrimary: true },
          { url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&q=80', alt: 'Mediterranean One Piece Side', position: 1 },
        ],
      },
      variants: {
        create: sizes.flatMap((size) =>
          [colors[0], colors[1], colors[2]].map((color) => ({
            name: `${size} / ${color.name}`,
            size,
            color: color.name,
            colorHex: color.hex,
            stockQuantity: 8,
            isActive: true,
          }))
        ),
      },
    },
  });

  // Product 3: Amalfi Bikini
  const product3 = await prisma.product.create({
    data: {
      name: 'Amalfi Bikini',
      slug: 'amalfi-bikini',
      description: 'Inspired by the Italian coast, this bikini features a bandeau top with removable straps and classic high-leg bottoms. Perfect for achieving that effortlessly chic Mediterranean look.',
      price: 139,
      compareAtPrice: null,
      featured: true,
      isNew: true,
      isBestseller: false,
      isActive: true,
      stockQuantity: 60,
      categoryId: bikinis.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&q=80', alt: 'Amalfi Bikini Front', position: 0, isPrimary: true },
          { url: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80', alt: 'Amalfi Bikini Detail', position: 1 },
        ],
      },
      variants: {
        create: sizes.flatMap((size) =>
          [colors[1], colors[3], colors[4]].map((color) => ({
            name: `${size} / ${color.name}`,
            size,
            color: color.name,
            colorHex: color.hex,
            stockQuantity: 6,
            isActive: true,
          }))
        ),
      },
    },
  });

  // Product 4: Capri One Piece
  const product4 = await prisma.product.create({
    data: {
      name: 'Capri One Piece',
      slug: 'capri-one-piece',
      description: 'A minimalist one-piece with a plunging V-neckline and open back. Features adjustable cross-back straps and full coverage bottom. Designed for the confident woman.',
      price: 155,
      compareAtPrice: null,
      featured: true,
      isNew: false,
      isBestseller: false,
      isActive: true,
      stockQuantity: 45,
      categoryId: onePieces.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&q=80', alt: 'Capri One Piece Front', position: 0, isPrimary: true },
          { url: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=800&q=80', alt: 'Capri One Piece Back', position: 1 },
        ],
      },
      variants: {
        create: sizes.flatMap((size) =>
          [colors[0], colors[2], colors[4]].map((color) => ({
            name: `${size} / ${color.name}`,
            size,
            color: color.name,
            colorHex: color.hex,
            stockQuantity: 5,
            isActive: true,
          }))
        ),
      },
    },
  });

  // Product 5: Santorini Bikini
  const product5 = await prisma.product.create({
    data: {
      name: 'Santorini Bikini',
      slug: 'santorini-bikini',
      description: 'Our most versatile bikini with a sporty twist. Features a supportive crop-top style top and mid-rise bottoms. Ideal for both swimming and beach volleyball.',
      price: 119,
      compareAtPrice: 149,
      featured: false,
      isNew: true,
      isBestseller: false,
      isActive: true,
      stockQuantity: 80,
      categoryId: bikinis.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1583846783214-e82ad2d9f421?w=800&q=80', alt: 'Santorini Bikini Front', position: 0, isPrimary: true },
          { url: 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&q=80', alt: 'Santorini Bikini Style', position: 1 },
        ],
      },
      variants: {
        create: sizes.flatMap((size) =>
          [colors[0], colors[1], colors[2], colors[3]].map((color) => ({
            name: `${size} / ${color.name}`,
            size,
            color: color.name,
            colorHex: color.hex,
            stockQuantity: 8,
            isActive: true,
          }))
        ),
      },
    },
  });

  console.log('✅ Products created');

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { id: 'settings' },
    update: {},
    create: {
      id: 'settings',
      siteName: 'Delphine',
      siteDescription: 'Luxury Mediterranean Swimwear',
      contactEmail: 'hello@delphineswimwear.com',
      contactPhone: '+355 69 123 4567',
      address: 'Tirana, Albania',
      socialInstagram: 'https://instagram.com/delphine',
      socialFacebook: 'https://facebook.com/delphine',
      shippingFreeThreshold: 100,
      shippingStandardRate: 8.99,
      shippingExpressRate: 15.99,
      taxRate: 0.20,
      currency: 'EUR',
    },
  });

  console.log('✅ Site settings created');
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
