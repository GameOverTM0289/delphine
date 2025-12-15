'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/data/products';
import { formatPrice, getImageUrl, cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const { addItem, openCart } = useCartStore();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  if (!product) notFound();

  const handleAddToCart = async () => {
    if (!selectedSize) return;
    setIsAdding(true);
    await new Promise((r) => setTimeout(r, 300));
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.colors[selectedColor]?.image || product.images[0],
      variantId: `${product.id}-${product.colors[selectedColor]?.name}-${selectedSize}`,
      variantName: `${product.colors[selectedColor]?.name} / ${selectedSize}`,
      size: selectedSize,
      color: product.colors[selectedColor]?.name || '',
      price: product.price,
      quantity,
    });
    setIsAdding(false);
    openCart();
  };

  return (
    <section className="pt-24 pb-16">
      <div className="container-custom">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-gray-900">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-[3/4] relative bg-gray-100 rounded-2xl overflow-hidden">
              <Image src={getImageUrl(product.images[mainImage])} alt={product.name} fill className="object-cover" priority />
              {product.isNew && <span className="absolute top-4 left-4 badge-ocean">New</span>}
              {product.isBestSeller && <span className="absolute top-4 left-4 badge-coral">Best Seller</span>}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setMainImage(i)} className={cn('relative w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2', mainImage === i ? 'border-ocean-500' : 'border-transparent')}>
                  <Image src={getImageUrl(img)} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="heading-2 mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
              {product.compareAtPrice && <span className="text-lg text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>}
            </div>
            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Color: {product.colors[selectedColor]?.name}</label>
                <div className="flex gap-2">
                  {product.colors.map((color, i) => (
                    <button key={color.name} onClick={() => setSelectedColor(i)} className={cn('w-10 h-10 rounded-full border-2', selectedColor === i ? 'border-gray-900' : 'border-gray-200')} style={{ backgroundColor: color.hex }} title={color.name} />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">Size</label>
                <Link href="/size-guide" className="text-sm text-ocean-600 hover:underline">Size Guide</Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={cn('h-11 min-w-[44px] px-4 border-2 rounded-lg font-medium transition-all', selectedSize === size ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-400')}>
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && <p className="text-sm text-red-500 mt-2">Please select a size</p>}
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900">-</button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900">+</button>
              </div>
            </div>

            <button onClick={handleAddToCart} disabled={!selectedSize || isAdding} className="btn-primary w-full py-4 text-base mb-4 disabled:opacity-50">
              {isAdding ? 'Adding...' : 'Add to Bag'}
            </button>

            {product.material && (
              <div className="border-t border-gray-100 pt-6 mt-6">
                <h3 className="font-medium mb-2">Material</h3>
                <p className="text-sm text-gray-600">{product.material}</p>
              </div>
            )}
            {product.careInstructions && (
              <div className="border-t border-gray-100 pt-6 mt-4">
                <h3 className="font-medium mb-2">Care</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {product.careInstructions.map((c, i) => <li key={i}>• {c}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
