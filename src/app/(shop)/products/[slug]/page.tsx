'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { formatPrice, getImageUrl } from '@/lib/utils';

interface ProductPageProps {
  params: { slug: string };
}

const placeholderImages = [
  'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80',
  'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=800&q=80',
  'https://images.unsplash.com/photo-1584374232938-8ba5e6ee5365?w=800&q=80',
];

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useWishlistStore.persist.rehydrate();
    
    async function fetchData() {
      try {
        const res = await fetch(`/api/products/${params.slug}`);
        const data = await res.json();
        setProduct(data);
        
        if (data?.variants?.length > 0) {
          const firstColor = data.variants[0].color;
          setSelectedColor(firstColor);
        }
        
        const relatedRes = await fetch('/api/products?limit=8');
        const relatedData = await relatedRes.json();
        setRelatedProducts(relatedData.filter((p: any) => p.slug !== params.slug));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-cream">
        <div className="w-6 h-6 border border-charcoal-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 bg-cream">
        <h1 className="text-display text-2xl mb-6">Product Not Found</h1>
        <Link href="/shop" className="btn-outline">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Get unique colors and sizes
  const colorsMap = new Map();
  const sizesSet = new Set<string>();
  
  product.variants?.forEach((v: any) => {
    if (v.color && !colorsMap.has(v.color)) {
      colorsMap.set(v.color, v.colorHex || '#888888');
    }
    if (v.size) {
      sizesSet.add(v.size);
    }
  });
  
  const colors = Array.from(colorsMap.entries()).map(([name, hex]) => ({ name, hex }));
  const sizes = Array.from(sizesSet);

  const getVariant = (size: string, color: string) => {
    return product.variants?.find((v: any) => v.size === size && v.color === color);
  };

  const selectedVariant = selectedSize && selectedColor ? getVariant(selectedSize, selectedColor) : null;
  const isInStock = selectedVariant?.stockQuantity > 0;

  const getProductImages = () => {
    if (product.images && product.images.length > 0) {
      return product.images.map((img: any) => ({
        ...img,
        url: img.url.startsWith('http') ? img.url : getImageUrl(img.url)
      }));
    }
    return placeholderImages.map((url, i) => ({ url, alt: product.name }));
  };

  const images = getProductImages();
  const primaryImage = images[0]?.url || placeholderImages[0];

  const inWishlist = mounted && isInWishlist(product.id);

  const handleWishlistClick = () => {
    toggleItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: primaryImage,
      price: product.price,
    });
  };

  const handleAddToCart = () => {
    setError('');
    
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    if (!selectedColor) {
      setError('Please select a color');
      return;
    }
    if (!selectedVariant) {
      setError('This combination is not available');
      return;
    }
    if (!isInStock) {
      setError('This item is out of stock');
      return;
    }

    setAdding(true);
    
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: primaryImage,
      variantName: `${selectedSize} / ${selectedColor}`,
      size: selectedSize,
      color: selectedColor,
      colorHex: selectedVariant.colorHex || '#000',
      price: selectedVariant.price || product.price,
    });
    
    setTimeout(() => {
      setAdding(false);
      openCart();
    }, 500);
  };

  return (
    <main className="min-h-screen bg-cream pt-20">
      <div className="container-main py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-charcoal-500">
            <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/shop" className="hover:text-black transition-colors">Shop</Link></li>
            <li>/</li>
            <li className="text-black truncate max-w-[200px]">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-[3/4] bg-ivory-200 overflow-hidden">
              <Image
                src={images[selectedImage]?.url || primaryImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 md:w-20 aspect-[3/4] bg-ivory-200 overflow-hidden flex-shrink-0 transition-opacity ${
                      selectedImage === index ? 'opacity-100 ring-1 ring-black' : 'opacity-50 hover:opacity-75'
                    }`}
                  >
                    <Image src={img.url} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            {/* Title & Price */}
            <div className="mb-8">
              <h1 className="text-display text-2xl md:text-3xl mb-4">{product.name}</h1>
              <p className="text-base text-charcoal-700">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Color Selection - Clean like Zara */}
            {colors.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs tracking-wider uppercase text-charcoal-500">Color</span>
                  <span className="text-xs text-charcoal-700">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-6 h-6 rounded-full transition-all ${
                        selectedColor === c.name 
                          ? 'ring-1 ring-offset-2 ring-black' 
                          : 'hover:ring-1 hover:ring-offset-2 hover:ring-charcoal-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection - Clean minimal */}
            {sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-wider uppercase text-charcoal-500">Size</span>
                  <Link href="/size-guide" className="text-xs text-charcoal-500 underline hover:text-black transition-colors">
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => {
                    const variant = selectedColor ? getVariant(size, selectedColor) : null;
                    const inStock = variant?.stockQuantity > 0;
                    
                    return (
                      <button
                        key={size}
                        onClick={() => inStock && setSelectedSize(size)}
                        disabled={!inStock}
                        className={`min-w-[44px] h-10 px-3 text-xs tracking-wider border transition-all ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : inStock
                              ? 'border-charcoal-300 text-black hover:border-black'
                              : 'border-charcoal-200 text-charcoal-300 cursor-not-allowed line-through'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 mb-4">{error}</p>
            )}

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 py-4 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-charcoal-800 transition-colors disabled:opacity-50"
              >
                {adding ? 'Adding...' : 'Add to Bag'}
              </button>
              <button
                onClick={handleWishlistClick}
                className={`w-14 h-14 flex items-center justify-center border transition-all ${
                  inWishlist 
                    ? 'bg-black border-black text-white' 
                    : 'border-charcoal-300 text-charcoal-600 hover:border-black'
                }`}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg 
                  className="w-5 h-5" 
                  fill={inWishlist ? 'currentColor' : 'none'} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div className="py-6 border-t border-charcoal-200">
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Details accordion style */}
            <div className="border-t border-charcoal-200">
              <details className="py-4 border-b border-charcoal-200">
                <summary className="text-xs tracking-wider uppercase cursor-pointer hover:opacity-70 transition-opacity">
                  Composition & Care
                </summary>
                <div className="mt-4 text-sm text-charcoal-600 space-y-2">
                  <p>• 80% Recycled Polyamide, 20% Elastane</p>
                  <p>• UPF 50+ sun protection</p>
                  <p>• Hand wash cold, lay flat to dry</p>
                </div>
              </details>
              <details className="py-4 border-b border-charcoal-200">
                <summary className="text-xs tracking-wider uppercase cursor-pointer hover:opacity-70 transition-opacity">
                  Shipping & Returns
                </summary>
                <div className="mt-4 text-sm text-charcoal-600 space-y-2">
                  <p>• Free shipping on orders over €100</p>
                  <p>• Delivery within 3-5 business days</p>
                  <p>• Free returns within 14 days</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* You May Also Like - All variants/related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-charcoal-200">
            <h2 className="text-display text-xl md:text-2xl text-center mb-10">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6">
              {relatedProducts.slice(0, 8).map((prod, index) => {
                const prodImage = prod.images?.[0]?.url?.startsWith('http') 
                  ? prod.images[0].url 
                  : placeholderImages[index % placeholderImages.length];
                
                return (
                  <Link key={prod.id} href={`/products/${prod.slug}`} className="group">
                    <div className="relative aspect-[3/4] bg-ivory-200 overflow-hidden mb-3">
                      <Image
                        src={prodImage}
                        alt={prod.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-sm text-black text-center mb-1 group-hover:opacity-70 transition-opacity line-clamp-1">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-charcoal-600 text-center">{formatPrice(prod.price)}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
