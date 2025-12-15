const values = [
  {
    icon: '🌊',
    title: 'Sustainable Materials',
    description: 'Our swimwear is made from recycled ocean plastics and eco-friendly fabrics.',
  },
  {
    icon: '✨',
    title: 'Premium Quality',
    description: 'Designed for durability with attention to every detail and stitch.',
  },
  {
    icon: '💚',
    title: 'Ethical Production',
    description: 'Fair wages and safe working conditions for all our artisans.',
  },
  {
    icon: '📦',
    title: 'Eco Packaging',
    description: '100% recyclable and plastic-free packaging for all orders.',
  },
];

export default function CoreValues() {
  return (
    <section className="section bg-gray-900 text-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-ocean-400 text-sm uppercase tracking-widest mb-2 block">
            Our Commitment
          </span>
          <h2 className="heading-2 mb-4">What We Stand For</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We&apos;re committed to creating beautiful swimwear while protecting the oceans we love.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="text-center p-6 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-colors animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="font-display text-lg font-medium mb-2">{value.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
