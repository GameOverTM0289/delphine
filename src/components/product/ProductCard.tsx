'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl, formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice?: number | null;
    images: { url: string; alt?: string | null }[];
    variants?: { id: string; name: string; color?: string | null }[];
  };
  priority?: boolean;
  showPrice?: boolean;
}

export default function ProductCard({ product, priority = false, showPrice = true }: ProductCardProps) {
  const primaryImage = product.images[0]?.url || '';
  const secondaryImage = product.images[1]?.url || primaryImage;
  
  // Get unique colors from variants
  const colors = product.variants
    ?.filter(v => v.color)
    .map(v => v.color)
    .filter((color, index, self) => self.indexOf(color) === index)
    .slice(0, 4) || [];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200 mb-4">
        {/* Primary Image */}
        <Image
          src={getImageUrl(primaryImage)}
          alt={product.name}
          fill
          priority={priority}
          className="object-cover transition-opacity duration-700 group-hover:opacity-0"
        />
        {/* Secondary Image on Hover */}
        <Image
          src={getImageUrl(secondaryImage)}
          alt={product.name}
          fill
          className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="font-display text-base text-charcoal-800 mb-1 group-hover:text-charcoal-600 transition-colors">
          {product.name}
        </h3>
        
        {showPrice && (
          <div className="flex items-center justify-center gap-2">
            {product.comparePrice && product.comparePrice > product.price ? (
              <>
                <span className="body-sm text-stone-400 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
                <span className="body-sm text-charcoal-700">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="body-sm text-charcoal-700">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        )}

        {/* Color Swatches - Minimal */}
        {colors.length > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {colors.map((color) => (
              <span
                key={color}
                className="w-3 h-3 rounded-full border border-stone-200"
                style={{ backgroundColor: color || '#ccc' }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
