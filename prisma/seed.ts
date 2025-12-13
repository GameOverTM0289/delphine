import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@delphine.com' },
    update: {},
    create: {
      email: 'admin@delphine.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create test customer
  const customerPassword = await bcrypt.hash('test123', 12);
  const customer = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: customerPassword,
      firstName: 'Test',
      lastName: 'Customer',
      role: 'CUSTOMER',
    },
  });
  console.log('✅ Test customer created:', customer.email);

  // Create categories
  const bikiniCategory = await prisma.category.upsert({
    where: { slug: 'bikinis' },
    update: {},
    create: {
      slug: 'bikinis',
      name: 'Bikinis',
      description: 'Classic and modern bikini sets',
      image: '/images/categories/bikinis.jpg',
    },
  });

  const onePieceCategory = await prisma.category.upsert({
    where: { slug: 'one-pieces' },
    update: {},
    create: {
      slug: 'one-pieces',
      name: 'One Pieces',
      description: 'Elegant one-piece swimsuits',
      image: '/images/categories/one-pieces.jpg',
    },
  });
  console.log('✅ Categories created');

  // Create collection
  const summer2024 = await prisma.collection.upsert({
    where: { slug: 'summer-2024' },
    update: {},
    create: {
      slug: 'summer-2024',
      name: 'Summer 2024',
      description: 'Our latest Mediterranean-inspired collection',
      image: '/images/collections/summer-2024.jpg',
      featured: true,
    },
  });
  console.log('✅ Collection created');

  // Create products
  const products = [
    {
      slug: 'riviera-bikini-set',
      name: 'Riviera Bikini Set',
      description: 'A timeless triangle bikini set inspired by the French Riviera. Features adjustable ties and a flattering cut that suits every body type.',
      price: 89,
      categoryId: bikiniCategory.id,
      collectionId: summer2024.id,
      featured: true,
      isNew: true,
      stockQuantity: 50,
    },
    {
      slug: 'aegean-one-piece',
      name: 'Aegean One Piece',
      description: 'An elegant one-piece swimsuit with a plunging neckline and crossed back straps. Perfect for resort days.',
      price: 120,
      categoryId: onePieceCategory.id,
      collectionId: summer2024.id,
      featured: true,
      isBestseller: true,
      stockQuantity: 35,
    },
    {
      slug: 'santorini-bandeau-set',
      name: 'Santorini Bandeau Set',
      description: 'A chic bandeau bikini set perfect for sun-soaked days. Features removable straps and a high-waist bottom.',
      price: 95,
      categoryId: bikiniCategory.id,
      collectionId: summer2024.id,
      featured: true,
      isNew: true,
      stockQuantity: 40,
    },
    {
      slug: 'capri-sport-bikini',
      name: 'Capri Sport Bikini',
      description: 'A sporty bikini designed for active beach days. Secure fit with maximum comfort and style.',
      price: 85,
      categoryId: bikiniCategory.id,
      isBestseller: true,
      stockQuantity: 60,
    },
  ];

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData,
    });

    // Create images for each product
    await prisma.productImage.createMany({
      data: [
        {
          productId: product.id,
          url: `/images/products/${product.slug}-1.jpg`,
          alt: `${product.name} - Front`,
          position: 0,
          isPrimary: true,
        },
        {
          productId: product.id,
          url: `/images/products/${product.slug}-2.jpg`,
          alt: `${product.name} - Back`,
          position: 1,
        },
      ],
      skipDuplicates: true,
    });

    // Create variants (sizes and colors)
    const sizes = ['S', 'M', 'L'];
    const colors = [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Black', hex: '#000000' },
      { name: 'Ocean Blue', hex: '#006994' },
    ];

    for (const size of sizes) {
      for (const color of colors) {
        await prisma.productVariant.upsert({
          where: { sku: `${product.slug}-${size}-${color.name}`.toLowerCase().replace(/\s/g, '-') },
          update: {},
          create: {
            productId: product.id,
            name: `${size} / ${color.name}`,
            size,
            color: color.name,
            colorHex: color.hex,
            sku: `${product.slug}-${size}-${color.name}`.toLowerCase().replace(/\s/g, '-'),
            stockQuantity: 10,
          },
        });
      }
    }
  }
  console.log('✅ Products created');

  // Create hero slides
  const heroSlides = [
    {
      title: 'Summer 2024',
      subtitle: 'New Collection',
      description: 'Discover our latest Mediterranean-inspired collection',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
      image: '/images/hero/slide-1.jpg',
      position: 0,
    },
    {
      title: 'Timeless Elegance',
      subtitle: 'One Pieces',
      description: 'Sophisticated silhouettes for every occasion',
      buttonText: 'Explore',
      buttonLink: '/collections/one-pieces',
      image: '/images/hero/slide-2.jpg',
      position: 1,
    },
    {
      title: 'Free Shipping',
      subtitle: 'On orders €100+',
      description: 'Enjoy complimentary delivery on all qualifying orders',
      buttonText: 'Shop Collection',
      buttonLink: '/shop',
      image: '/images/hero/slide-3.jpg',
      position: 2,
    },
  ];

  for (const slide of heroSlides) {
    await prisma.heroSlide.upsert({
      where: { id: `slide-${slide.position}` },
      update: slide,
      create: { id: `slide-${slide.position}`, ...slide },
    });
  }
  console.log('✅ Hero slides created');

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { id: 'settings' },
    update: {},
    create: {
      siteName: 'Delphine',
      siteDescription: 'Mediterranean-inspired swimwear',
      contactEmail: 'hello@delphineswimwear.com',
      contactPhone: '+355 69 123 4567',
      address: 'Tirana, Albania',
      socialInstagram: 'https://instagram.com/delphineswimwear',
    },
  });
  console.log('✅ Site settings created');

  console.log('');
  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('📧 Admin login: admin@delphine.com / admin123');
  console.log('📧 Test user: test@example.com / test123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
