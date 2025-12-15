import Image from 'next/image';
import Link from 'next/link';

export default function SustainabilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=1920&q=80"
          alt="Ocean"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-900/40" />
        <div className="relative text-center text-ivory-100 z-10 px-6">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-ivory-200">Our Commitment</span>
          <h1 className="font-display text-4xl md:text-6xl font-light mt-4">Sustainability</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-ivory-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-12 h-px bg-stone-300 mx-auto mb-8" />
          <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mb-10">Protecting Our Oceans</h2>
          <div className="space-y-6 text-stone-600 leading-relaxed">
            <p>
              The Mediterranean Sea is our muse and our responsibility. At Delphine, 
              we believe that beautiful swimwear shouldn&apos;t come at the cost of our planet. 
              That&apos;s why every piece we create is designed with sustainability at its core.
            </p>
            <p>
              From the materials we source to the way we package our products, 
              every decision is made with the environment in mind. We&apos;re committed 
              to reducing our footprint while creating swimwear you&apos;ll treasure for years.
            </p>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-20 md:py-28 bg-ivory-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
                alt="Sustainable materials"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Our Materials</span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4 mb-8">
                From Ocean Waste to Fashion
              </h2>
              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p>
                  Our swimwear is crafted from ECONYL® regenerated nylon—a revolutionary 
                  material made from ocean waste, fishing nets, and fabric scraps. This 
                  innovative fabric can be recycled infinitely without losing quality.
                </p>
                <p>
                  The result? A premium fabric that&apos;s softer than virgin nylon, offers 
                  superior UV protection, and dries quickly. It&apos;s proof that sustainability 
                  and luxury can go hand in hand.
                </p>
                <p>
                  We also use recycled polyester for our linings and trims, 
                  natural rubber for elastics, and water-based inks for all prints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-20 md:py-28 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Our Approach</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4">Four Pillars of Sustainability</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Recycled Materials', 
                desc: 'Our fabrics are made from recycled ocean plastics and post-consumer waste, reducing virgin material use by 90%.',
              },
              { 
                title: 'Water Conservation', 
                desc: 'Our dyeing process uses 50% less water than traditional methods. We also use closed-loop water systems.',
              },
              { 
                title: 'Carbon Neutral', 
                desc: 'We offset 100% of our carbon footprint through verified reforestation and ocean cleanup projects.',
              },
              { 
                title: 'Zero Waste Packaging', 
                desc: 'All packaging is made from recycled and recyclable materials. No plastic, ever.',
              },
            ].map((pillar) => (
              <div key={pillar.title} className="bg-ivory-200 p-8">
                <div className="w-12 h-px bg-stone-300 mb-6" />
                <h3 className="font-display text-lg text-charcoal-800 mb-4">{pillar.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-24 bg-charcoal-800 text-ivory-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-400">Our Impact</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-ivory-100 mt-4 mb-16">By The Numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '50K+', label: 'Plastic bottles recycled' },
              { value: '2,000kg', label: 'Ocean waste collected' },
              { value: '85%', label: 'Less carbon emissions' },
              { value: '100%', label: 'Recyclable packaging' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl md:text-5xl font-light text-ivory-100 mb-3">
                  {stat.value}
                </div>
                <div className="text-xs text-stone-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production */}
      <section className="py-20 md:py-28 bg-ivory-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Ethical Production</span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4 mb-8">
                Made with Care
              </h2>
              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p>
                  All Delphine swimwear is produced in Portugal by a family-owned 
                  atelier that has been crafting swimwear for three generations. 
                  Our partners are certified by OEKO-TEX Standard 100, ensuring 
                  safe working conditions and fair wages.
                </p>
                <p>
                  By manufacturing in Europe, we minimize transportation emissions 
                  while supporting local craftsmanship. We visit our atelier regularly 
                  to maintain close relationships with the artisans who bring our 
                  designs to life.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&q=80"
                alt="Ethical production"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 md:py-28 bg-ivory-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Certifications</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4 mb-12">Our Standards</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['OEKO-TEX', 'Global Recycled Standard', 'PETA Approved Vegan', 'B Corp Certified'].map((cert) => (
              <div key={cert} className="p-6 border border-stone-300 hover:border-charcoal-700 transition-colors">
                <span className="text-xs font-medium tracking-wider uppercase text-charcoal-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal-800 text-ivory-100 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl font-light mb-6">Join Our Mission</h2>
          <p className="text-sm text-stone-400 mb-10 leading-relaxed">
            Every Delphine purchase supports ocean cleanup initiatives. 
            Together, we can make a difference.
          </p>
          <Link 
            href="/shop" 
            className="inline-flex items-center justify-center px-10 py-4 text-xs font-medium tracking-[0.15em] uppercase border border-ivory-100 text-ivory-100 hover:bg-ivory-100 hover:text-charcoal-800 transition-all"
          >
            Shop Sustainable
          </Link>
        </div>
      </section>
    </>
  );
}
