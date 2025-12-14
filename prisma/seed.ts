import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@delphine.com' },
    update: {},
    create: {
      email: 'admin@delphine.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✓ Admin user created:', admin.email);

  // Create categories
  const bikinis = await prisma.category.upsert({
    where: { slug: 'bikinis' },
    update: {},
    create: {
      name: 'Bikinis',
      slug: 'bikinis',
      description: 'Beautiful bikini sets for every style',
    },
  });

  const onePieces = await prisma.category.upsert({
    where: { slug: 'one-pieces' },
    update: {},
    create: {
      name: 'One Pieces',
      slug: 'one-pieces',
      description: 'Elegant one-piece swimsuits',
    },
  });
  console.log('✓ Categories created');

  // Products data - 3 Bikinis + 2 One Pieces = 5 total
  const productsData = [
    // BIKINIS (3)
    {
      name: 'Riviera Bikini Set',
      slug: 'riviera-bikini-set',
      description: 'A classic triangle bikini in luxurious Italian fabric. Features adjustable ties and gold-tone hardware. Perfect for sun-soaked days by the Mediterranean.',
      price: 89.00,
      categoryId: bikinis.id,
      images: [
        { url: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80', alt: 'Riviera Bikini Set', position: 0 },
        { url: 'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?w=800&q=80', alt: 'Riviera Bikini Set Back', position: 1 },
      ],
      variants: [
        { size: 'XS', color: 'Black', colorHex: '#000000', sku: 'RIV-BLK-XS', price: 89.00, stockQuantity: 10 },
        { size: 'S', color: 'Black', colorHex: '#000000', sku: 'RIV-BLK-S', price: 89.00, stockQuantity: 15 },
        { size: 'M', color: 'Black', colorHex: '#000000', sku: 'RIV-BLK-M', price: 89.00, stockQuantity: 12 },
        { size: 'L', color: 'Black', colorHex: '#000000', sku: 'RIV-BLK-L', price: 89.00, stockQuantity: 8 },
        { size: 'XS', color: 'White', colorHex: '#FFFFFF', sku: 'RIV-WHT-XS', price: 89.00, stockQuantity: 10 },
        { size: 'S', color: 'White', colorHex: '#FFFFFF', sku: 'RIV-WHT-S', price: 89.00, stockQuantity: 14 },
        { size: 'M', color: 'White', colorHex: '#FFFFFF', sku: 'RIV-WHT-M', price: 89.00, stockQuantity: 11 },
        { size: 'L', color: 'White', colorHex: '#FFFFFF', sku: 'RIV-WHT-L', price: 89.00, stockQuantity: 7 },
      ],
    },
    {
      name: 'Santorini Bandeau Set',
      slug: 'santorini-bandeau-set',
      description: 'Elegant bandeau bikini with removable straps. Made from recycled ocean plastic with UPF 50+ protection. Inspired by the white and blue of Santorini.',
      price: 95.00,
      categoryId: bikinis.id,
      images: [
        { url: 'https://images.unsplash.com/photo-1594046243098-0fceea9d451e?w=800&q=80', alt: 'Santorini Bandeau Set', position: 0 },
        { url: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80', alt: 'Santorini Bandeau Set Back', position: 1 },
      ],
      variants: [
        { size: 'XS', color: 'Ocean Blue', colorHex: '#546d9d', sku: 'SAN-BLU-XS', price: 95.00, stockQuantity: 8 },
        { size: 'S', color: 'Ocean Blue', colorHex: '#546d9d', sku: 'SAN-BLU-S', price: 95.00, stockQuantity: 12 },
        { size: 'M', color: 'Ocean Blue', colorHex: '#546d9d', sku: 'SAN-BLU-M', price: 95.00, stockQuantity: 10 },
        { size: 'L', color: 'Ocean Blue', colorHex: '#546d9d', sku: 'SAN-BLU-L', price: 95.00, stockQuantity: 6 },
        { size: 'XS', color: 'Cream', colorHex: '#f1efe7', sku: 'SAN-CRM-XS', price: 95.00, stockQuantity: 9 },
        { size: 'S', color: 'Cream', colorHex: '#f1efe7', sku: 'SAN-CRM-S', price: 95.00, stockQuantity: 11 },
        { size: 'M', color: 'Cream', colorHex: '#f1efe7', sku: 'SAN-CRM-M', price: 95.00, stockQuantity: 8 },
        { size: 'L', color: 'Cream', colorHex: '#f1efe7', sku: 'SAN-CRM-L', price: 95.00, stockQuantity: 5 },
      ],
    },
    {
      name: 'Capri Sport Bikini',
      slug: 'capri-sport-bikini',
      description: 'Sporty yet feminine bikini with a supportive crop top design. Quick-dry fabric perfect for active beach days. Features a comfortable wide band.',
      price: 85.00,
      categoryId: bikinis.id,
      images: [
        { url: 'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?w=800&q=80', alt: 'Capri Sport Bikini', position: 0 },
        { url: 'https://images.unsplash.com/photo-1594046243098-0fceea9d451e?w=800&q=80', alt: 'Capri Sport Bikini Back', position: 1 },
      ],
      variants: [
        { size: 'XS', color: 'Coral', colorHex: '#E8927C', sku: 'CAP-CRL-XS', price: 85.00, stockQuantity: 7 },
        { size: 'S', color: 'Coral', colorHex: '#E8927C', sku: 'CAP-CRL-S', price: 85.00, stockQuantity: 13 },
        { size: 'M', color: 'Coral', colorHex: '#E8927C', sku: 'CAP-CRL-M', price: 85.00, stockQuantity: 11 },
        { size: 'L', color: 'Coral', colorHex: '#E8927C', sku: 'CAP-CRL-L', price: 85.00, stockQuantity: 6 },
        { size: 'XS', color: 'Black', colorHex: '#000000', sku: 'CAP-BLK-XS', price: 85.00, stockQuantity: 8 },
        { size: 'S', color: 'Black', colorHex: '#000000', sku: 'CAP-BLK-S', price: 85.00, stockQuantity: 14 },
        { size: 'M', color: 'Black', colorHex: '#000000', sku: 'CAP-BLK-M', price: 85.00, stockQuantity: 10 },
        { size: 'L', color: 'Black', colorHex: '#000000', sku: 'CAP-BLK-L', price: 85.00, stockQuantity: 5 },
      ],
    },
    // ONE PIECES (2)
    {
      name: 'Aegean One Piece',
      slug: 'aegean-one-piece',
      description: 'Sophisticated one-piece with a flattering square neckline and low back. Made from sustainable fabric that shapes and supports. A timeless silhouette.',
      price: 120.00,
      categoryId: onePieces.id,
      images: [
        { url: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=800&q=80', alt: 'Aegean One Piece', position: 0 },
        { url: 'https://images.unsplash.com/photo-1584374232938-8ba5e6ee5365?w=800&q=80', alt: 'Aegean One Piece Back', position: 1 },
      ],
      variants: [
        { size: 'XS', color: 'Navy', colorHex: '#1a1a2e', sku: 'AEG-NVY-XS', price: 120.00, stockQuantity: 6 },
        { size: 'S', color: 'Navy', colorHex: '#1a1a2e', sku: 'AEG-NVY-S', price: 120.00, stockQuantity: 10 },
        { size: 'M', color: 'Navy', colorHex: '#1a1a2e', sku: 'AEG-NVY-M', price: 120.00, stockQuantity: 9 },
        { size: 'L', color: 'Navy', colorHex: '#1a1a2e', sku: 'AEG-NVY-L', price: 120.00, stockQuantity: 5 },
        { size: 'XL', color: 'Navy', colorHex: '#1a1a2e', sku: 'AEG-NVY-XL', price: 120.00, stockQuantity: 4 },
        { size: 'XS', color: 'Olive', colorHex: '#5c6b4d', sku: 'AEG-OLV-XS', price: 120.00, stockQuantity: 5 },
        { size: 'S', color: 'Olive', colorHex: '#5c6b4d', sku: 'AEG-OLV-S', price: 120.00, stockQuantity: 8 },
        { size: 'M', color: 'Olive', colorHex: '#5c6b4d', sku: 'AEG-OLV-M', price: 120.00, stockQuantity: 7 },
        { size: 'L', color: 'Olive', colorHex: '#5c6b4d', sku: 'AEG-OLV-L', price: 120.00, stockQuantity: 4 },
        { size: 'XL', color: 'Olive', colorHex: '#5c6b4d', sku: 'AEG-OLV-XL', price: 120.00, stockQuantity: 3 },
      ],
    },
    {
      name: 'Amalfi Plunge One Piece',
      slug: 'amalfi-plunge-one-piece',
      description: 'Bold and elegant with a deep V-neckline and high-cut legs. Features a stunning back detail with gold ring accent. For the confident woman.',
      price: 135.00,
      categoryId: onePieces.id,
      images: [
        { url: 'https://images.unsplash.com/photo-1584374232938-8ba5e6ee5365?w=800&q=80', alt: 'Amalfi Plunge One Piece', position: 0 },
        { url: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=800&q=80', alt: 'Amalfi Plunge One Piece Back', position: 1 },
      ],
      variants: [
        { size: 'XS', color: 'Black', colorHex: '#000000', sku: 'AML-BLK-XS', price: 135.00, stockQuantity: 5 },
        { size: 'S', color: 'Black', colorHex: '#000000', sku: 'AML-BLK-S', price: 135.00, stockQuantity: 9 },
        { size: 'M', color: 'Black', colorHex: '#000000', sku: 'AML-BLK-M', price: 135.00, stockQuantity: 8 },
        { size: 'L', color: 'Black', colorHex: '#000000', sku: 'AML-BLK-L', price: 135.00, stockQuantity: 4 },
        { size: 'XL', color: 'Black', colorHex: '#000000', sku: 'AML-BLK-XL', price: 135.00, stockQuantity: 3 },
        { size: 'XS', color: 'Burgundy', colorHex: '#722F37', sku: 'AML-BRG-XS', price: 135.00, stockQuantity: 4 },
        { size: 'S', color: 'Burgundy', colorHex: '#722F37', sku: 'AML-BRG-S', price: 135.00, stockQuantity: 7 },
        { size: 'M', color: 'Burgundy', colorHex: '#722F37', sku: 'AML-BRG-M', price: 135.00, stockQuantity: 6 },
        { size: 'L', color: 'Burgundy', colorHex: '#722F37', sku: 'AML-BRG-L', price: 135.00, stockQuantity: 3 },
        { size: 'XL', color: 'Burgundy', colorHex: '#722F37', sku: 'AML-BRG-XL', price: 135.00, stockQuantity: 2 },
      ],
    },
  ];

  // Create products with images and variants
  for (const productData of productsData) {
    const { images, variants, ...product } = productData;
    
    const createdProduct = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        images: {
          create: images,
        },
        variants: {
          create: variants,
        },
      },
    });
    console.log(`✓ Product created: ${createdProduct.name}`);
  }

  // Create hero slides
  const slides = [
    {
      title: 'Rhythm of a Free Spirit',
      subtitle: 'Summer 2024',
      description: 'Timeless elegance meets Mediterranean spirit',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
      buttonText: 'Explore Collection',
      buttonLink: '/shop',
      position: 0,
      isActive: true,
    },
    {
      title: 'Coastal Dreams',
      subtitle: 'New Collection',
      description: 'Discover the essence of summer',
      imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=80',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
      position: 1,
      isActive: true,
    },
    {
      title: 'Azure Collection',
      subtitle: 'Limited Edition',
      description: 'Inspired by the Adriatic Sea',
      imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=80',
      buttonText: 'Discover',
      buttonLink: '/collections',
      position: 2,
      isActive: true,
    },
  ];

  for (const slide of slides) {
    await prisma.heroSlide.upsert({
      where: { position: slide.position },
      update: slide,
      create: slide,
    });
  }
  console.log('✓ Hero slides created');

  console.log('');
  console.log('🎉 Seed completed successfully!');
  console.log('');
  console.log('📦 Products created: 5 (3 Bikinis + 2 One Pieces)');
  console.log('👤 Admin login: admin@delphine.com / admin123');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
