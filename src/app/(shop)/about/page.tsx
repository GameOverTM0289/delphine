import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Mediterranean coastline"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative text-center text-white z-10 px-6">
          <p className="text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl">About Delphine</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-display text-2xl md:text-3xl mb-8">Born by the Sea</h2>
            <div className="space-y-6 text-body leading-relaxed">
              <p>
                Delphine was born from a love of the Mediterranean—its crystal-clear waters, 
                sun-drenched coastlines, and timeless elegance that has inspired artists and 
                travelers for centuries.
              </p>
              <p>
                Founded in 2020 in Tirana, Albania, our brand emerged from a simple desire: 
                to create swimwear that embodies the effortless sophistication of coastal living.
              </p>
              <p>
                Our name comes from the Greek word for dolphin, symbolizing grace, 
                intelligence, and the pure joy of moving freely through water.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80"
          alt="Coastal lifestyle"
          fill
          className="object-cover"
        />
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-display text-2xl md:text-3xl mb-8">Our Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-display text-lg mb-4">Quality</h3>
              <p className="text-body">
                Premium Italian fabrics and meticulous craftsmanship in every piece.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-display text-lg mb-4">Sustainability</h3>
              <p className="text-body">
                Eco-conscious materials and responsible production practices.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-display text-lg mb-4">Timeless</h3>
              <p className="text-body">
                Classic designs that transcend seasons and trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container-main text-center">
          <h2 className="text-display text-2xl md:text-3xl mb-8">Discover the Collection</h2>
          <Link href="/shop" className="inline-block px-10 py-4 border border-white text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500">
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}
