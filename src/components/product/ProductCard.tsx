'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const hoverImage = product.images[1] || primaryImage;
  const selectedColor = product.colors[selectedColorIndex];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes.find((s) => s.name === 'M') || product.sizes[0];
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: primaryImage.url,
      colorId: selectedColor.id,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      sizeId: defaultSize.id,
      sizeName: defaultSize.name,
      price: product.price,
    });
  };

  return (
    <article className="group">
      <Link
        href={`/products/${product.slug}`}
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] bg-cream overflow-hidden mb-4">
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            priority={priority}
            className={cn(
              'object-cover transition-all duration-700',
              isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            )}
          />
          <Image
            src={hoverImage.url}
            alt={hoverImage.alt}
            fill
            className={cn(
              'object-cover transition-all duration-700',
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            )}
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <span className="badge-black">New</span>}
            {product.isBestseller && <span className="badge-cream">Bestseller</span>}
          </div>
          <button
            onClick={handleQuickAdd}
            className={cn(
              'absolute bottom-4 left-4 right-4 btn-primary text-sm py-2 transition-all duration-300',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            Quick Add
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            {product.colors.map((color, index) => (
              <button
                key={color.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColorIndex(index);
                }}
                className={cn(
                  'w-4 h-4 rounded-full border-2 transition-all',
                  selectedColorIndex === index ? 'border-black scale-110' : 'border-transparent hover:scale-110'
                )}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
          <h3 className="font-medium text-sm group-hover:underline line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-medium">{formatPrice(product.price)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
