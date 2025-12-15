import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream py-16 md:py-24 mt-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">About Delphine</h1>
          <p className="body-text-lg text-black/70 max-w-xl mx-auto">
            Mediterranean-inspired swimwear crafted for elegance and comfort.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
                alt="Mediterranean coastline"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-black/60">Our Story</span>
              <h2 className="heading-2 mt-3 mb-6">Where Simplicity Meets Depth</h2>
              <div className="space-y-4 body-text text-black/70">
                <p>
                  Delphine was born from a love of the Mediterranean—its crystal-clear waters, 
                  sun-drenched coastlines, and timeless elegance.
                </p>
                <p>
                  Our name comes from the Greek word for dolphin, symbolizing grace, 
                  intelligence, and the joy of moving freely through water.
                </p>
                <p>
                  Each piece in our collection is designed to make you feel confident, 
                  comfortable, and connected to the beauty of the sea.
                </p>
              </div>
              <Link href="/shop" className="btn-primary mt-8 inline-block">
                Explore Our Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
