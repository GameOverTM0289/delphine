import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920"
          alt="Mediterranean beach"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-xl">
            <span className="inline-block text-cream text-sm tracking-[0.3em] uppercase mb-4">
              Summer 2024
            </span>
            <h1 className="heading-1 text-white mb-6">
              Mediterranean Elegance
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Discover our latest collection inspired by the Mediterranean coastline.
            </p>
            <Link href="/shop" className="btn bg-cream text-black hover:bg-white">
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
