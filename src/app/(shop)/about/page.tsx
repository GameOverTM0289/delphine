import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920"
          alt="Mediterranean coastline"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-900/40" />
        <div className="relative text-center text-ivory-100 z-10">
          <span className="label text-ivory-200 animate-fade-down">Our Story</span>
          <h1 className="heading-display mt-4 animate-fade-up">About Delphine</h1>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-ivory-100">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <div className="divider mb-8" />
            <h2 className="heading-2 mb-8">Born by the Sea</h2>
            <div className="space-y-6 body-lg text-center max-w-2xl mx-auto">
              <p>
                Delphine was born from a love of the Mediterranean—its crystal-clear waters, 
                sun-drenched coastlines, and timeless elegance that has inspired artists and 
                travelers for centuries.
              </p>
              <p>
                Our name comes from the Greek word for dolphin, symbolizing grace, 
                intelligence, and the pure joy of moving freely through water.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="bg-ivory-200">
        <div className="container-luxury py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=800"
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"
                alt="Mediterranean lifestyle"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-ivory-100">
        <div className="container-narrow text-center">
          <span className="label">Our Philosophy</span>
          <h2 className="heading-2 mt-4 mb-16">What We Believe</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: 'Quality',
                text: 'Every piece is crafted with premium Italian fabrics, designed to last season after season.',
              },
              {
                title: 'Sustainability',
                text: 'We use eco-friendly materials and ethical production methods to protect our oceans.',
              },
              {
                title: 'Timelessness',
                text: 'Our designs transcend trends, offering elegant silhouettes that never go out of style.',
              },
            ].map((value) => (
              <div key={value.title}>
                <div className="divider mb-8" />
                <h3 className="font-display text-xl text-charcoal-800 mb-4">{value.title}</h3>
                <p className="body text-stone-500">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal-800 text-ivory-100 text-center">
        <div className="container-narrow">
          <h2 className="font-display text-3xl font-light mb-6">Discover the Collection</h2>
          <p className="body text-stone-400 mb-10 max-w-md mx-auto">
            Explore our carefully curated selection of swimwear, designed for the modern woman.
          </p>
          <Link href="/shop" className="btn-outline border-ivory-100 text-ivory-100 hover:bg-ivory-100 hover:text-charcoal-800">
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
}
