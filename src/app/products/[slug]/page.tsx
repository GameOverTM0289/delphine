'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/data/products';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, cn } from '@/lib/utils';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="section text-center mt-20">
        <h1 className="heading-2 mb-4">Product Not Found</h1>
        <Link href="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const selectedColor = product.colors[selectedColorIndex];
  const selectedSize = selectedSizeIndex !== null ? product.sizes[selectedSizeIndex] : null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: product.images[0].url,
      colorId: selectedColor.id,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      sizeId: selectedSize.id,
      sizeName: selectedSize.name,
      price: product.price,
    });
  };

  return (
    <section className="section-sm mt-16">
      <div className="container-custom">
        <nav className="text-sm text-black/50 mb-8">
          <Link href="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-cream">
              <Image
                src={product.images[selectedImageIndex].url}
                alt={product.images[selectedImageIndex].alt}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <span className="badge-black">New</span>}
                {product.isBestseller && <span className="badge-cream">Bestseller</span>}
              </div>
            </div>
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    'relative w-20 h-24 bg-cream transition-all',
                    selectedImageIndex === index ? 'ring-2 ring-black' : 'ring-1 ring-black/10'
                  )}
                >
                  <Image src={image.url} alt={image.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:py-8">
            <h1 className="heading-2 mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
            </div>
            <p className="body-text text-black/70 mb-8">{product.description}</p>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                Color: <span className="font-normal text-black/60">{selectedColor.name}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColorIndex(index)}
                    className={cn(
                      'w-10 h-10 rounded-full border-2 transition-all',
                      selectedColorIndex === index ? 'border-black scale-110' : 'border-black/20'
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">
                  Size: {selectedSize && <span className="font-normal text-black/60">{selectedSize.name}</span>}
                </label>
                <Link href="/size-guide" className="text-sm text-black/60 hover:text-black underline">
                  Size Guide
                </Link>
              </div>
              <div className="flex gap-3">
                {product.sizes.map((size, index) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSizeIndex(index)}
                    disabled={!size.inStock}
                    className={cn(
                      'w-14 h-14 border text-sm font-medium transition-all',
                      selectedSizeIndex === index
                        ? 'border-black bg-black text-white'
                        : size.inStock
                        ? 'border-black/20 hover:border-black'
                        : 'border-black/10 text-black/30 cursor-not-allowed'
                    )}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn-primary w-full mb-8">
              Add to Cart
            </button>

            <div className="border-t border-black/10 pt-8">
              <h3 className="font-medium mb-4">Details</h3>
              <ul className="space-y-2 text-sm text-black/70">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-black/40 rounded-full mt-2" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
