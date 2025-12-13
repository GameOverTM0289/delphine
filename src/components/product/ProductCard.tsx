'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, getImageUrl } from '@/lib/utils';
import { useWishlistStore } from '@/lib/store/wishlist';

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

const placeholderImages = [
  'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80',
  'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=600&q=80',
  'https://images.unsplash.com/photo-1584374232938-8ba5e6ee5365?w=600&q=80',
  'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?w=600&q=80',
];

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  useEffect(() => {
    setMounted(true);
    useWishlistStore.persist.rehydrate();
  }, []);

  // Get random placeholder based on product id
  const getPlaceholder = () => {
    const index = parseInt(product.id.replace(/\D/g, '') || '0') % placeholderImages.length;
    return placeholderImages[index];
  };

  const primaryImage = product.images?.[0]?.url 
    ? getImageUrl(product.images[0].url) 
    : getPlaceholder();
  const secondaryImage = product.images?.[1]?.url 
    ? getImageUrl(product.images[1].url) 
    : primaryImage;
  
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

  const inWishlist = mounted && isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: primaryImage,
      price: product.price,
    });
  };

  return (
    <div className="group relative">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className={`absolute top-3 right-3 z-10 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
          inWishlist 
            ? 'bg-charcoal-800 text-ivory-100' 
            : 'bg-white/80 text-charcoal-600 hover:bg-white hover:text-charcoal-800'
        }`}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg 
          className="w-4 h-4" 
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

      <Link href={`/products/${product.slug}`} className="block">
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
          
          {/* Quick View on Hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="block w-full py-2.5 bg-charcoal-800 text-ivory-100 text-xs tracking-wider uppercase text-center">
              Quick View
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center">
          <h3 className="font-display text-sm md:text-base text-charcoal-800 mb-1 group-hover:text-charcoal-600 transition-colors line-clamp-2">
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
    </div>
  );
}
