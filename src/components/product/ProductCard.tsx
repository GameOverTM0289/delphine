'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice, getImageUrl, cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { addItem, openCart } = useCartStore();

  const currentImage = product.colors[selectedColorIndex]?.image || product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const selectedColor = product.colors[selectedColorIndex];
    const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)]; // Middle size as default
    
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: currentImage,
      variantId: `${product.id}-${selectedColor.name}-${defaultSize}`,
      variantName: `${selectedColor.name} / ${defaultSize}`,
      size: defaultSize,
      color: selectedColor.name,
      price: product.price,
      quantity: 1,
    });
    
    setIsLoading(false);
    openCart();
  };

  return (
    <div className="group">
      <Link
        href={`/products/${product.slug}`}
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
          {/* Primary Image */}
          <Image
            src={getImageUrl(currentImage)}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-all duration-500',
              isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Hover Image */}
          <Image
            src={getImageUrl(hoverImage)}
            alt={`${product.name} - alternate view`}
            fill
            className={cn(
              'object-cover transition-all duration-500',
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="badge-ocean">New</span>
            )}
            {product.isBestSeller && (
              <span className="badge-coral">Best Seller</span>
            )}
            {product.compareAtPrice && (
              <span className="badge bg-red-500 text-white">
                -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            className={cn(
              'absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md',
              'transition-all duration-300',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            )}
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist logic
            }}
            aria-label="Add to wishlist"
          >
            <svg className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Quick Add Button */}
          <div className={cn(
            'absolute bottom-0 left-0 right-0 p-3 transition-all duration-300',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <button
              onClick={handleQuickAdd}
              disabled={isLoading}
              className="w-full py-2.5 bg-white/95 backdrop-blur-sm text-gray-900 text-sm font-medium rounded-lg
                       hover:bg-gray-900 hover:text-white transition-colors
                       disabled:opacity-70 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Adding...
                </>
              ) : (
                'Quick Add'
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5">
              {product.colors.map((color, index) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColorIndex(index);
                  }}
                  className={cn(
                    'w-4 h-4 rounded-full border-2 transition-all duration-200',
                    selectedColorIndex === index
                      ? 'border-gray-900 scale-110'
                      : 'border-transparent hover:scale-110'
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
          )}

          {/* Name */}
          <h3 className="font-medium text-gray-900 group-hover:text-ocean-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
