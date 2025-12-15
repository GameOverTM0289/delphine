import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/utils';

export default function AboutPage() {
  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Our Story</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">Crafted with passion for the Mediterranean lifestyle.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
              <Image src={getImageUrl('/images/about/story.jpg')} alt="Our Story" fill className="object-cover" />
            </div>
            <div>
              <span className="text-ocean-600 text-sm uppercase tracking-widest mb-4 block">Since 2020</span>
              <h2 className="heading-2 mb-6">Born from the Mediterranean</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Delphine was born from a deep love for the Mediterranean Sea and a commitment to sustainable fashion. Founded in Albania in 2020, we set out to create swimwear that captures the essence of coastal elegance.</p>
                <p>Every piece in our collection is designed in Tirana and crafted using recycled ocean plastics and eco-friendly materials.</p>
              </div>
              <Link href="/sustainability" className="btn-primary mt-8 inline-block">Our Sustainability Promise</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
