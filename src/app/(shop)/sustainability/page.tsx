import Image from 'next/image';
import Link from 'next/link';

export default function SustainabilityPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=1920&q=80"
          alt="Ocean sustainability"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative text-center text-white z-10 px-6">
          <p className="text-xs tracking-[0.3em] uppercase mb-4">Our Commitment</p>
          <h1 className="text-display text-4xl md:text-5xl">Sustainability</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-main max-w-2xl text-center">
          <h2 className="text-display text-2xl md:text-3xl mb-8">Our Mission</h2>
          <p className="text-body leading-relaxed mb-5">
            At Delphine, we believe that beautiful swimwear shouldn&apos;t come at the expense 
            of our planet. We&apos;re committed to creating timeless pieces that are as kind 
            to the environment as they are to your skin.
          </p>
          <p className="text-body leading-relaxed">
            Every decision we make—from materials to packaging—is guided by our commitment 
            to sustainability and our love for the sea.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-main">
          <h2 className="text-display text-2xl md:text-3xl text-center mb-16">Our Approach</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-charcoal-200 rounded-full">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-display text-lg mb-4">Recycled Materials</h3>
              <p className="text-body text-sm leading-relaxed">
                80% of our fabrics are made from ECONYL® regenerated nylon, 
                created from ocean waste and discarded fishing nets.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-charcoal-200 rounded-full">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-display text-lg mb-4">Eco Packaging</h3>
              <p className="text-body text-sm leading-relaxed">
                All our packaging is plastic-free, recyclable, and made from 
                FSC-certified materials or recycled paper.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-charcoal-200 rounded-full">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-display text-lg mb-4">Local Production</h3>
              <p className="text-body text-sm leading-relaxed">
                We manufacture in Europe, reducing our carbon footprint while 
                supporting local craftsmanship and fair labor practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="relative h-[50vh] min-h-[350px]">
        <Image
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80"
          alt="Ocean"
          fill
          className="object-cover"
        />
      </section>

      {/* Goals */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-main max-w-2xl text-center">
          <h2 className="text-display text-2xl md:text-3xl mb-8">Our Goals</h2>
          <div className="space-y-6">
            <p className="text-body leading-relaxed">
              <strong>By 2025:</strong> 100% of our swimwear will be made from recycled or sustainable materials.
            </p>
            <p className="text-body leading-relaxed">
              <strong>By 2026:</strong> Achieve carbon-neutral shipping on all orders.
            </p>
            <p className="text-body leading-relaxed">
              <strong>By 2027:</strong> Implement a take-back program for worn swimwear recycling.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="container-main text-center">
          <h2 className="text-display text-2xl md:text-3xl mb-4">Join Our Journey</h2>
          <p className="text-sm text-charcoal-400 mb-8 max-w-md mx-auto">
            Together, we can make a difference for our oceans.
          </p>
          <Link href="/shop" className="inline-block px-10 py-4 border border-white text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500">
            Shop Sustainable
          </Link>
        </div>
      </section>
    </main>
  );
}
