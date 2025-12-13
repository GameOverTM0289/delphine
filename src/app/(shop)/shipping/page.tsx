export default function ShippingPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-ivory-100">
        <div className="container-luxury text-center">
          <span className="label animate-fade-down">Delivery</span>
          <h1 className="heading-display mt-4 animate-fade-up">Shipping</h1>
        </div>
      </section>

      <section className="section bg-ivory-200">
        <div className="container-narrow">
          {/* Shipping Options */}
          <div className="mb-20">
            <h2 className="heading-3 mb-10 text-center">Shipping Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Standard', price: '€8.99', time: '5-7 business days', note: 'Free over €100' },
                { name: 'Express', price: '€15.99', time: '2-3 business days', featured: true },
                { name: 'International', price: '€24.99', time: '7-14 business days' },
              ].map((option) => (
                <div 
                  key={option.name} 
                  className={`p-8 text-center ${option.featured ? 'bg-ivory-100 border border-charcoal-700' : 'bg-ivory-100'}`}
                >
                  <h3 className="font-display text-lg text-charcoal-800 mb-2">{option.name}</h3>
                  <p className="font-display text-2xl text-charcoal-700 mb-2">{option.price}</p>
                  <p className="body-sm text-stone-500 mb-2">{option.time}</p>
                  {option.note && (
                    <p className="body-sm text-stone-400">{option.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Areas */}
          <div>
            <h2 className="heading-3 mb-10 text-center">Delivery Areas</h2>
            <div className="bg-ivory-100 p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Albania', 'Kosovo', 'North Macedonia', 'Montenegro', 'Greece', 'Italy', 'Germany', 'UK', 'France', 'Austria', 'Switzerland', 'USA'].map((country) => (
                  <div key={country} className="body-sm text-charcoal-700">
                    {country}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
