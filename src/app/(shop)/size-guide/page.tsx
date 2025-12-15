export default function SizeGuidePage() {
  return (
    <main className="min-h-screen bg-cream pt-28 pb-20">
      <div className="container-main max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-display text-3xl md:text-4xl mb-4">Size Guide</h1>
          <p className="text-body max-w-lg mx-auto">
            Find your perfect fit with our comprehensive size guide.
          </p>
        </div>

        {/* How to Measure */}
        <section className="mb-16">
          <h2 className="text-display text-xl mb-8 text-center">How to Measure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-charcoal-200 rounded-full">
                <span className="text-display text-lg">1</span>
              </div>
              <h3 className="text-sm font-medium mb-2">Bust</h3>
              <p className="text-body text-sm">
                Measure around the fullest part of your bust, keeping the tape horizontal.
              </p>
            </div>
            <div className="text-center p-6 bg-white">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-charcoal-200 rounded-full">
                <span className="text-display text-lg">2</span>
              </div>
              <h3 className="text-sm font-medium mb-2">Waist</h3>
              <p className="text-body text-sm">
                Measure around the narrowest part of your waist, usually just above the navel.
              </p>
            </div>
            <div className="text-center p-6 bg-white">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-charcoal-200 rounded-full">
                <span className="text-display text-lg">3</span>
              </div>
              <h3 className="text-sm font-medium mb-2">Hips</h3>
              <p className="text-body text-sm">
                Measure around the fullest part of your hips, approximately 20cm below waist.
              </p>
            </div>
          </div>
        </section>

        {/* Size Chart */}
        <section className="mb-16">
          <h2 className="text-display text-xl mb-8 text-center">Size Chart</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr className="border-b border-charcoal-200">
                  <th className="py-4 px-6 text-left text-xs tracking-wider uppercase text-charcoal-500 font-medium">Size</th>
                  <th className="py-4 px-6 text-center text-xs tracking-wider uppercase text-charcoal-500 font-medium">EU</th>
                  <th className="py-4 px-6 text-center text-xs tracking-wider uppercase text-charcoal-500 font-medium">UK</th>
                  <th className="py-4 px-6 text-center text-xs tracking-wider uppercase text-charcoal-500 font-medium">US</th>
                  <th className="py-4 px-6 text-center text-xs tracking-wider uppercase text-charcoal-500 font-medium">Bust (cm)</th>
                  <th className="py-4 px-6 text-center text-xs tracking-wider uppercase text-charcoal-500 font-medium">Waist (cm)</th>
                  <th className="py-4 px-6 text-center text-xs tracking-wider uppercase text-charcoal-500 font-medium">Hips (cm)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-charcoal-100">
                  <td className="py-4 px-6 font-medium">XS</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">34</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">6</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">2</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">80-84</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">60-64</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">86-90</td>
                </tr>
                <tr className="border-b border-charcoal-100">
                  <td className="py-4 px-6 font-medium">S</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">36</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">8</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">4</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">84-88</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">64-68</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">90-94</td>
                </tr>
                <tr className="border-b border-charcoal-100">
                  <td className="py-4 px-6 font-medium">M</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">38</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">10</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">6</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">88-92</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">68-72</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">94-98</td>
                </tr>
                <tr className="border-b border-charcoal-100">
                  <td className="py-4 px-6 font-medium">L</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">40</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">12</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">8</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">92-96</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">72-76</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">98-102</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">XL</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">42</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">14</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">10</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">96-100</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">76-80</td>
                  <td className="py-4 px-6 text-center text-charcoal-600">102-106</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-16">
          <h2 className="text-display text-xl mb-8 text-center">Fit Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white">
              <h3 className="text-sm font-medium mb-3">Between Sizes?</h3>
              <p className="text-body text-sm">
                If you&apos;re between sizes, we recommend sizing up for a more relaxed fit or down for a more supportive fit.
              </p>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-sm font-medium mb-3">First Time Buyer?</h3>
              <p className="text-body text-sm">
                Our swimwear is designed to fit true to size. We recommend choosing your regular size.
              </p>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-sm font-medium mb-3">Adjustable Features</h3>
              <p className="text-body text-sm">
                Many of our styles feature adjustable straps and ties for a customizable fit.
              </p>
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-sm font-medium mb-3">Need Help?</h3>
              <p className="text-body text-sm">
                Contact our team at hello@delphineswimwear.com for personalized sizing advice.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-body mb-6">Still have questions about sizing?</p>
          <a 
            href="mailto:hello@delphineswimwear.com" 
            className="btn-outline"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
