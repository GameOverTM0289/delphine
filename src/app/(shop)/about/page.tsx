import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Mediterranean coastline"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-900/40" />
        <div className="relative text-center text-ivory-100 z-10 px-6">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-ivory-200">Our Story</span>
          <h1 className="font-display text-4xl md:text-6xl font-light mt-4">About Delphine</h1>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 md:py-28 bg-ivory-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-12 h-px bg-stone-300 mx-auto mb-8" />
          <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mb-10">Born by the Sea</h2>
          <div className="space-y-6 text-stone-600 leading-relaxed">
            <p>
              Delphine was born from a love of the Mediterranean—its crystal-clear waters, 
              sun-drenched coastlines, and timeless elegance that has inspired artists and 
              travelers for centuries. Founded in 2020 by Elena Marku in Tirana, Albania, 
              our brand emerged from a simple desire: to create swimwear that embodies the 
              effortless sophistication of coastal living.
            </p>
            <p>
              Our name comes from the Greek word for dolphin, symbolizing grace, 
              intelligence, and the pure joy of moving freely through water. Just as 
              dolphins glide effortlessly through the sea, we want every woman to feel 
              that same sense of freedom and confidence when wearing Delphine.
            </p>
            <p>
              What began as a small collection of five pieces has grown into a beloved 
              brand worn by women across Europe and beyond. Yet our commitment to quality, 
              sustainability, and timeless design remains unchanged.
            </p>
          </div>
        </div>
      </section>

      {/* Image Break */}
      <section className="bg-ivory-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="relative aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80"
                alt="Swimwear detail"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&q=80"
                alt="Beach lifestyle"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80"
                alt="Ocean view"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Our Mission</span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4 mb-8">
                Empowering Women Through Design
              </h2>
              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p>
                  At Delphine, we believe that every woman deserves to feel beautiful, 
                  confident, and comfortable in her own skin. Our mission is to create 
                  swimwear that celebrates diverse body types while never compromising 
                  on style or quality.
                </p>
                <p>
                  We design for real women—mothers enjoying beach days with their children, 
                  professionals seeking weekend escapes, athletes training in open water, 
                  and dreamers planning their next Mediterranean adventure.
                </p>
                <p>
                  Each piece in our collection is thoughtfully crafted to provide the 
                  perfect balance of support, coverage, and allure. Because confidence 
                  isn't about showing more or less—it's about feeling perfectly yourself.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=800&q=80"
                alt="Our mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-ivory-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Our Values</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4 mb-16">What We Stand For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            {[
              {
                title: 'Uncompromising Quality',
                desc: 'We source only the finest Italian Lycra and work with skilled European artisans. Every stitch, every cut, every detail is executed with precision. Our swimwear is designed to maintain its shape, color, and comfort season after season.',
              },
              {
                title: 'Environmental Responsibility',
                desc: 'The ocean inspires us, so protecting it is our duty. We use ECONYL® regenerated nylon made from ocean waste and fishing nets. Our packaging is 100% recyclable, and we offset our carbon footprint through verified environmental projects.',
              },
              {
                title: 'Inclusive Design',
                desc: 'Beauty has no size. Our collections range from XS to XXL, with silhouettes designed to flatter every body type. We conduct extensive fit testing with women of diverse shapes to ensure true comfort and confidence.',
              },
              {
                title: 'Timeless Aesthetics',
                desc: 'We reject fast fashion. Our designs are created to transcend trends, offering elegant silhouettes that remain stylish year after year. Invest in fewer, better pieces that you\'ll treasure for decades.',
              },
            ].map((value) => (
              <div key={value.title} className="bg-ivory-100 p-8">
                <h3 className="font-display text-xl text-charcoal-800 mb-4">{value.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-20 md:py-28 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&q=80"
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Craftsmanship</span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4 mb-8">
                Made with Care
              </h2>
              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p>
                  Every Delphine piece is crafted in our partner atelier in Portugal, 
                  where generations of textile expertise meet modern innovation. Our 
                  artisans bring decades of experience to each garment, ensuring 
                  impeccable construction and finishing.
                </p>
                <p>
                  We begin with premium Italian Lycra—selected for its superior stretch 
                  recovery, UV protection, and resistance to chlorine and salt water. 
                  The fabric is then precision-cut using advanced technology that 
                  minimizes waste while ensuring perfect symmetry.
                </p>
                <p>
                  Each swimsuit passes through 47 quality checkpoints before earning 
                  the Delphine label. From the strength of every seam to the placement 
                  of each stitch, we leave nothing to chance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team / Founder */}
      <section className="py-20 md:py-28 bg-ivory-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">The Founder</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4 mb-10">Elena Marku</h2>
          
          <div className="relative w-48 h-48 mx-auto mb-10 rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
              alt="Elena Marku"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="space-y-6 text-stone-600 leading-relaxed">
            <p>
              "I grew up spending every summer on the Albanian Riviera, where the Adriatic 
              Sea meets ancient olive groves and hidden coves. Those endless days of 
              swimming, sunbathing, and exploring shaped my understanding of what great 
              swimwear should be: beautiful enough for a seaside lunch, comfortable 
              enough for hours of adventure."
            </p>
            <p>
              After studying fashion design in Milan and working for luxury houses in 
              Paris, I returned home with a vision: to create a swimwear brand that 
              combines European craftsmanship with Mediterranean soul. Delphine is 
              the realization of that dream.
            </p>
            <p className="font-display text-charcoal-800 italic">
              — Elena Marku, Founder & Creative Director
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal-800 text-ivory-100 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl font-light mb-6">Discover the Collection</h2>
          <p className="text-sm text-stone-400 mb-10 leading-relaxed">
            Explore our carefully curated selection of swimwear, designed for the modern woman 
            who values quality, sustainability, and timeless style.
          </p>
          <Link 
            href="/shop" 
            className="inline-flex items-center justify-center px-10 py-4 text-xs font-medium tracking-[0.15em] uppercase border border-ivory-100 text-ivory-100 hover:bg-ivory-100 hover:text-charcoal-800 transition-all"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
}
