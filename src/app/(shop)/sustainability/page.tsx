import Image from 'next/image';

export default function SustainabilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=1920"
          alt="Ocean"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-900/40" />
        <div className="relative text-center text-ivory-100 z-10">
          <span className="label text-ivory-200 animate-fade-down">Our Commitment</span>
          <h1 className="heading-display mt-4 animate-fade-up">Sustainability</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-ivory-100">
        <div className="container-narrow text-center">
          <div className="divider mb-8" />
          <h2 className="heading-2 mb-8">Protecting Our Oceans</h2>
          <p className="body-lg max-w-2xl mx-auto">
            At Delphine, we believe that beautiful swimwear shouldn&apos;t come at the cost 
            of our planet. Every piece we create is designed with sustainability at its core.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="section bg-ivory-200">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'Recycled Materials', desc: 'Our fabrics are made from recycled ocean plastics and post-consumer waste.' },
              { title: 'Water Conservation', desc: 'Our production process uses 90% less water than traditional methods.' },
              { title: 'Carbon Neutral', desc: 'We offset 100% of our carbon footprint through verified environmental projects.' },
              { title: 'Eco Packaging', desc: 'All packaging is made from recycled and recyclable materials.' },
            ].map((pillar, index) => (
              <div key={pillar.title} className="text-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="divider mb-8" />
                <h3 className="font-display text-xl text-charcoal-800 mb-4">{pillar.title}</h3>
                <p className="body text-stone-500">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 bg-charcoal-800 text-ivory-100">
        <div className="container-luxury text-center">
          <span className="label text-stone-400">Our Impact</span>
          <h2 className="heading-2 mt-4 mb-16 text-ivory-100">By The Numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Plastic bottles recycled' },
              { value: '2,000kg', label: 'Ocean waste collected' },
              { value: '85%', label: 'Less carbon emissions' },
              { value: '100%', label: 'Recyclable packaging' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl md:text-5xl font-light text-ivory-100 mb-2">
                  {stat.value}
                </div>
                <div className="body-sm text-stone-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section bg-ivory-100">
        <div className="container-narrow text-center">
          <span className="label">Certifications</span>
          <h2 className="heading-2 mt-4 mb-12">Our Standards</h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            {['OEKO-TEX', 'Global Recycled Standard', 'PETA Approved Vegan', 'B Corp Certified'].map((cert) => (
              <div key={cert} className="px-6 py-4 border border-stone-300 hover:border-charcoal-700 transition-colors">
                <span className="body-sm text-charcoal-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
