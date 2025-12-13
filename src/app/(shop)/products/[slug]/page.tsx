'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, getImageUrl, PLACEHOLDER_IMAGE } from '@/lib/utils';

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const { addItem, toggleCart } = useCartStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/products/${params.slug}`);
        const data = await res.json();
        setProduct(data);
        
        // Set default color if available
        if (data?.variants?.length > 0) {
          const firstColor = data.variants[0].color;
          setSelectedColor(firstColor);
        }
        
        // Fetch related products
        const relatedRes = await fetch('/api/products?limit=4');
        const relatedData = await relatedRes.json();
        setRelatedProducts(relatedData.filter((p: any) => p.slug !== params.slug).slice(0, 4));
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
      <div className="min-h-screen flex items-center justify-center pt-20 bg-ivory-100">
        <div className="w-8 h-8 border border-charcoal-300 border-t-charcoal-700 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 bg-ivory-100">
        <h1 className="font-display text-3xl text-charcoal-800 mb-6">Product Not Found</h1>
        <Link href="/shop" className="px-8 py-3 bg-charcoal-800 text-ivory-100 text-xs tracking-widest uppercase">
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

  // Check if selected combo is in stock
  const getVariant = (size: string, color: string) => {
    return product.variants?.find((v: any) => v.size === size && v.color === color);
  };

  const selectedVariant = selectedSize && selectedColor ? getVariant(selectedSize, selectedColor) : null;
  const isInStock = selectedVariant?.stockQuantity > 0;

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
    
    const imageUrl = product.images?.[0]?.url || '';
    
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: imageUrl,
      variantName: `${selectedSize} / ${selectedColor}`,
      size: selectedSize,
      color: selectedColor,
      colorHex: selectedVariant.colorHex || '#000',
      price: selectedVariant.price || product.price,
    });
    
    setTimeout(() => {
      setAdding(false);
      toggleCart();
    }, 500);
  };

  const images = (product.images || []).map((img: any) => ({
    ...img,
    url: img?.url ? getImageUrl(img.url) : PLACEHOLDER_IMAGE,
  }));

  return (
    <div className="min-h-screen bg-ivory-100 pt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-stone-500">
            <li><Link href="/" className="hover:text-charcoal-700 transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/shop" className="hover:text-charcoal-700 transition-colors">Shop</Link></li>
            <li>/</li>
            <li className="text-charcoal-700">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-ivory-200 overflow-hidden">
              {images[selectedImage] && (
                <Image
                  src={images[selectedImage].url}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
              )}
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 aspect-[3/4] bg-ivory-200 overflow-hidden transition-opacity ${
                      selectedImage === index ? 'ring-1 ring-charcoal-700' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.url} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            <h1 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mb-4">{product.name}</h1>
            
            <div className="mb-8">
              {product.compareAtPrice && product.compareAtPrice > product.price ? (
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl text-stone-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="font-display text-xl text-charcoal-800">
                    {formatPrice(product.price)}
                  </span>
                </div>
              ) : (
                <span className="font-display text-xl text-charcoal-800">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium tracking-widest uppercase text-stone-500">Color</span>
                  <span className="text-sm text-charcoal-700">{selectedColor}</span>
                </div>
                <div className="flex gap-3">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-10 h-10 rounded-full transition-all ${
                        selectedColor === c.name 
                          ? 'ring-2 ring-offset-2 ring-charcoal-700' 
                          : 'hover:ring-2 hover:ring-offset-2 hover:ring-stone-300'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium tracking-widest uppercase text-stone-500">Size</span>
                  <Link href="/size-guide" className="text-xs text-stone-500 underline hover:text-charcoal-700 transition-colors">
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
                        onClick={() => setSelectedSize(size)}
                        disabled={!inStock}
                        className={`min-w-[56px] h-12 px-4 text-xs font-medium tracking-wider uppercase border transition-all ${
                          selectedSize === size
                            ? 'border-charcoal-800 bg-charcoal-800 text-ivory-100'
                            : inStock
                              ? 'border-stone-300 text-charcoal-700 hover:border-charcoal-700'
                              : 'border-stone-200 text-stone-300 cursor-not-allowed line-through'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="w-full py-4 bg-charcoal-800 text-ivory-100 text-xs font-medium tracking-widest uppercase hover:bg-charcoal-900 transition-colors disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add to Bag'}
            </button>

            {/* Description */}
            {product.description && (
              <div className="mt-12 pt-8 border-t border-stone-200">
                <h3 className="text-xs font-medium tracking-widest uppercase text-stone-500 mb-4">Description</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Details */}
            <div className="mt-8 pt-8 border-t border-stone-200">
              <h3 className="text-xs font-medium tracking-widest uppercase text-stone-500 mb-4">Details</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li>• Premium Italian Lycra</li>
                <li>• UPF 50+ sun protection</li>
                <li>• Chlorine resistant</li>
                <li>• Quick-drying fabric</li>
                <li>• Made in Europe</li>
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="mt-8 pt-8 border-t border-stone-200">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-medium tracking-wider uppercase text-charcoal-700 mb-1">Free Shipping</h4>
                  <p className="text-xs text-stone-500">On orders over €100</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium tracking-wider uppercase text-charcoal-700 mb-1">Free Returns</h4>
                  <p className="text-xs text-stone-500">Within 14 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-stone-200">
            <h2 className="font-display text-2xl text-charcoal-800 text-center mb-12">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
              {relatedProducts.map((prod) => (
                <Link key={prod.id} href={`/products/${prod.slug}`} className="group">
                  <div className="relative aspect-[3/4] bg-ivory-200 overflow-hidden mb-4">
                    <Image
                      src={prod.images?.[0]?.url ? getImageUrl(prod.images[0].url) : PLACEHOLDER_IMAGE}
                      alt={prod.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-base text-charcoal-800 text-center mb-1">{prod.name}</h3>
                  <p className="text-xs text-stone-500 text-center">{formatPrice(prod.price)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
