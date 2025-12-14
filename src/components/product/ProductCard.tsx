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

  const getPlaceholder = () => {
    const index = parseInt(product.id.replace(/\D/g, '') || '0') % placeholderImages.length;
    return placeholderImages[index];
  };

  const primaryImage = product.images?.[0]?.url 
    ? (product.images[0].url.startsWith('http') ? product.images[0].url : getImageUrl(product.images[0].url))
    : getPlaceholder();
  
  const secondaryImage = product.images?.[1]?.url 
    ? (product.images[1].url.startsWith('http') ? product.images[1].url : getImageUrl(product.images[1].url))
    : primaryImage;
  
  const colors = product.variants
    ?.filter(v => v.colorHex)
    .reduce((acc: { hex: string }[], v) => {
      if (!acc.find(c => c.hex === v.colorHex)) {
        acc.push({ hex: v.colorHex || '' });
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
      {/* Wishlist Button - minimal */}
      <button
        onClick={handleWishlistClick}
        className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
          inWishlist 
            ? 'bg-black text-white' 
            : 'bg-white/80 text-charcoal-600 opacity-0 group-hover:opacity-100'
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
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200 mb-4">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <Image
            src={secondaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        {/* Info - clean and simple */}
        <div className="text-center">
          <h3 className="text-sm text-black mb-2 group-hover:opacity-70 transition-opacity line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-charcoal-600 mb-3">
            {formatPrice(product.price)}
          </p>

          {/* Color dots - small and discrete */}
          {colors.length > 0 && (
            <div className="flex items-center justify-center gap-1.5">
              {colors.map((c, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-charcoal-200"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
