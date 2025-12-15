export default function ReturnsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-ivory-100">
        <div className="container-luxury text-center">
          <span className="label animate-fade-down">Customer Care</span>
          <h1 className="heading-display mt-4 animate-fade-up">Returns</h1>
        </div>
      </section>

      <section className="section bg-ivory-200">
        <div className="container-narrow">
          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { title: '14 Days', desc: 'Return window from delivery' },
              { title: 'Free Returns', desc: 'On all Albanian orders' },
              { title: 'Easy Exchange', desc: 'Different size? We\'ll swap it' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-ivory-100">
                <h3 className="font-display text-xl text-charcoal-800 mb-2">{item.title}</h3>
                <p className="body-sm text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Process */}
          <div className="mb-20">
            <h2 className="heading-3 mb-10 text-center">How to Return</h2>
            <div className="space-y-6">
              {[
                { step: '01', title: 'Start Your Return', desc: 'Log into your account and select the items you wish to return.' },
                { step: '02', title: 'Pack Your Items', desc: 'Place items in original packaging with tags attached.' },
                { step: '03', title: 'Ship It Back', desc: 'Use the prepaid label or ship via your preferred carrier.' },
                { step: '04', title: 'Get Refunded', desc: 'Refunds processed within 3-5 business days of receipt.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-8 items-start p-6 bg-ivory-100">
                  <span className="font-display text-2xl text-stone-300">{item.step}</span>
                  <div>
                    <h3 className="font-display text-lg text-charcoal-800 mb-2">{item.title}</h3>
                    <p className="body text-stone-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-ivory-100">
              <h3 className="label text-green-700 mb-4">We Accept</h3>
              <ul className="space-y-2 body text-stone-600">
                <li>Unworn items with all tags attached</li>
                <li>Items with hygiene liner intact</li>
                <li>Items in original packaging</li>
              </ul>
            </div>
            <div className="p-8 bg-ivory-100">
              <h3 className="label text-red-700 mb-4">We Cannot Accept</h3>
              <ul className="space-y-2 body text-stone-600">
                <li>Items worn, washed, or altered</li>
                <li>Swimwear without hygiene liner</li>
                <li>Sale items marked as final sale</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
