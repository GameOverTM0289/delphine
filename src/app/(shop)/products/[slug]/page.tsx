'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, getImageUrl } from '@/lib/utils';

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const { addItem, toggleCart } = useCartStore();

  useEffect(() => {
    fetch(`/api/products/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data?.variants?.length > 0) {
          setSelectedColor(data.variants[0].color);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
        <h1 className="heading-2 mb-6">Product Not Found</h1>
        <Link href="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const colors = [...new Map(product.variants?.map((v: any) => [v.color, { color: v.color, hex: v.colorHex }])).values()] as any[];
  const sizes = [...new Set(product.variants?.map((v: any) => v.size))] as string[];

  const selectedVariant = product.variants?.find(
    (v: any) => v.size === selectedSize && v.color === selectedColor
  );

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) return;
    if (!selectedVariant) return;

    setAdding(true);
    
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: getImageUrl(product.images?.[0]?.url || ''),
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

  return (
    <div className="min-h-screen bg-ivory-100 pt-24">
      <div className="container-luxury py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 body-sm text-stone-500">
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
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-ivory-200">
              <Image
                src={getImageUrl(product.images?.[selectedImage]?.url || '')}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 aspect-[3/4] bg-ivory-200 transition-opacity ${
                      selectedImage === index ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                    }`}
                  >
                    <Image
                      src={getImageUrl(img.url)}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            <h1 className="heading-2 mb-4">{product.name}</h1>
            
            <div className="mb-8">
              {product.comparePrice && product.comparePrice > product.price ? (
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl text-stone-400 line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                  <span className="font-display text-xl text-charcoal-700">
                    {formatPrice(product.price)}
                  </span>
                </div>
              ) : (
                <span className="font-display text-xl text-charcoal-700">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="label">Color</span>
                  <span className="body-sm text-stone-500">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {colors.map((c: any) => (
                    <button
                      key={c.color}
                      onClick={() => setSelectedColor(c.color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === c.color 
                          ? 'border-charcoal-700 scale-110' 
                          : 'border-transparent hover:border-stone-300'
                      }`}
                      style={{ backgroundColor: c.hex || '#ccc' }}
                      title={c.color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="label">Size</span>
                  <Link href="/size-guide" className="body-sm text-stone-500 underline hover:text-charcoal-700 transition-colors">
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => {
                    const variant = product.variants?.find(
                      (v: any) => v.size === size && v.color === selectedColor
                    );
                    const inStock = variant?.stock > 0;
                    
                    return (
                      <button
                        key={size}
                        onClick={() => inStock && setSelectedSize(size)}
                        disabled={!inStock}
                        className={`min-w-[48px] h-12 px-4 text-xs tracking-wider uppercase border transition-all ${
                          selectedSize === size
                            ? 'border-charcoal-700 bg-charcoal-700 text-ivory-100'
                            : inStock
                              ? 'border-stone-300 hover:border-charcoal-700'
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

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor || adding}
              className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {adding ? 'Adding...' : !selectedSize || !selectedColor ? 'Select Options' : 'Add to Bag'}
            </button>

            {/* Description */}
            {product.description && (
              <div className="mt-12 pt-8 border-t border-stone-200">
                <h3 className="label mb-4">Description</h3>
                <p className="body text-stone-600">{product.description}</p>
              </div>
            )}

            {/* Details */}
            <div className="mt-8 pt-8 border-t border-stone-200">
              <h3 className="label mb-4">Details</h3>
              <ul className="space-y-2 body text-stone-600">
                <li>• Premium Italian Lycra</li>
                <li>• UPF 50+ sun protection</li>
                <li>• Chlorine resistant</li>
                <li>• Quick-drying fabric</li>
                <li>• Made in Europe</li>
              </ul>
            </div>

            {/* Shipping */}
            <div className="mt-8 pt-8 border-t border-stone-200">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h4 className="text-xs font-medium tracking-wider uppercase mb-1">Free Shipping</h4>
                  <p className="body-sm text-stone-500">On orders over €100</p>
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-medium tracking-wider uppercase mb-1">Free Returns</h4>
                  <p className="body-sm text-stone-500">Within 14 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
