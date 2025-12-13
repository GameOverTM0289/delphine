import Image from 'next/image';
import prisma from '@/lib/db/prisma';
import { getImageUrl } from '@/lib/utils';

async function getSlides() {
  return prisma.heroSlide.findMany({
    orderBy: { position: 'asc' },
  });
}

export default async function AdminSlidesPage() {
  const slides = await getSlides();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2">Hero Slides</h1>
          <p className="text-gray-600 mt-1">Manage your homepage slider</p>
        </div>
        <button className="btn-primary">+ Add Slide</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div key={slide.id} className="admin-card overflow-hidden">
            <div className="relative aspect-video bg-gray-100">
              <Image
                src={getImageUrl(slide.image)}
                alt={slide.title}
                fill
                className="object-cover"
              />
              {!slide.isActive && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="badge-black">Inactive</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium">{slide.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{slide.subtitle}</p>
              <div className="flex items-center gap-2 mt-4">
                <button className="btn-sm btn-outline flex-1">Edit</button>
                <button className="btn-sm btn-ghost text-red-600">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length === 0 && (
        <div className="admin-card text-center py-12">
          <p className="text-gray-500 mb-4">No slides yet</p>
          <button className="btn-primary">Add Your First Slide</button>
        </div>
      )}

      <div className="bg-ocean-50 p-4 rounded-lg text-sm text-ocean-800">
        <strong>Image Guide:</strong> Place your hero images in <code className="bg-ocean-100 px-1 rounded">public/images/hero/</code> and reference them as <code className="bg-ocean-100 px-1 rounded">/images/hero/filename.jpg</code>
      </div>
    </div>
  );
}
