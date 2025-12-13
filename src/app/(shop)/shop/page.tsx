import ProductCard from '@/components/product/ProductCard';
import prisma from '@/lib/db/prisma';

async function getProducts() {
  return prisma.product.findMany({
    where: { isActive: true },
    include: {
      images: true,
      variants: true,
      category: true,
    },
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' },
    ],
  });
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-ivory-100">
        <div className="container-luxury text-center">
          <span className="label animate-fade-down">The Collection</span>
          <h1 className="heading-display mt-4 animate-fade-up">Shop</h1>
        </div>
      </section>

      {/* Products */}
      <section className="section bg-ivory-200">
        <div className="container-luxury">
          <p className="body-sm text-stone-500 mb-12 text-center">
            {products.length} piece{products.length !== 1 ? 's' : ''}
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-up"
                style={{ animationDelay: `${(index % 4) * 0.1}s` }}
              >
                <ProductCard product={product} priority={index < 4} />
              </div>
            ))}
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="body text-stone-500">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
