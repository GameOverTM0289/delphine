'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number | null;
    images: { url: string; alt?: string | null }[];
    variants?: { id: string; color?: string | null; colorHex?: string | null }[];
  };
  priority?: boolean;
}

const placeholderImage = 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80';

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const primaryImage = product.images?.[0]?.url || placeholderImage;
  const secondaryImage = product.images?.[1]?.url || primaryImage;
  
  // Get unique colors
  const colors = product.variants
    ?.filter(v => v.colorHex)
    .reduce((acc: { color: string; hex: string }[], v) => {
      if (!acc.find(c => c.hex === v.colorHex)) {
        acc.push({ color: v.color || '', hex: v.colorHex || '' });
      }
      return acc;
    }, [])
    .slice(0, 4) || [];

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200 mb-4">
        {/* Primary Image */}
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {/* Secondary Image on Hover */}
        <Image
          src={secondaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="font-display text-base text-charcoal-800 mb-1 group-hover:text-charcoal-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-center gap-2">
          {product.compareAtPrice && product.compareAtPrice > product.price ? (
            <>
              <span className="text-xs text-stone-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="text-xs text-charcoal-700">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-xs text-charcoal-700">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        {colors.length > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {colors.map((c, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border border-stone-200"
                style={{ backgroundColor: c.hex }}
                title={c.color}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
