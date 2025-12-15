export default function SizeGuidePage() {
  return (
    <>
      <section className="bg-cream-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Size Guide</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">
            Find your perfect fit with our comprehensive size guide.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          {/* Size Chart */}
          <div className="mb-12">
            <h2 className="heading-3 mb-6">Size Chart</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-4 px-6 text-left font-medium border-b">Size</th>
                    <th className="py-4 px-6 text-left font-medium border-b">EU</th>
                    <th className="py-4 px-6 text-left font-medium border-b">UK</th>
                    <th className="py-4 px-6 text-left font-medium border-b">US</th>
                    <th className="py-4 px-6 text-left font-medium border-b">Bust (cm)</th>
                    <th className="py-4 px-6 text-left font-medium border-b">Waist (cm)</th>
                    <th className="py-4 px-6 text-left font-medium border-b">Hips (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-6 font-medium">S</td>
                    <td className="py-4 px-6">34-36</td>
                    <td className="py-4 px-6">6-8</td>
                    <td className="py-4 px-6">2-4</td>
                    <td className="py-4 px-6">82-86</td>
                    <td className="py-4 px-6">62-66</td>
                    <td className="py-4 px-6">88-92</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="py-4 px-6 font-medium">M</td>
                    <td className="py-4 px-6">38-40</td>
                    <td className="py-4 px-6">10-12</td>
                    <td className="py-4 px-6">6-8</td>
                    <td className="py-4 px-6">86-90</td>
                    <td className="py-4 px-6">66-70</td>
                    <td className="py-4 px-6">92-96</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6 font-medium">L</td>
                    <td className="py-4 px-6">42-44</td>
                    <td className="py-4 px-6">14-16</td>
                    <td className="py-4 px-6">10-12</td>
                    <td className="py-4 px-6">90-94</td>
                    <td className="py-4 px-6">70-74</td>
                    <td className="py-4 px-6">96-100</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure */}
          <div className="mb-12">
            <h2 className="heading-3 mb-6">How to Measure</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Bust</h3>
                <p className="text-sm text-gray-600">
                  Measure around the fullest part of your bust, keeping the tape parallel to the floor.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Waist</h3>
                <p className="text-sm text-gray-600">
                  Measure around the narrowest part of your natural waist, usually just above the belly button.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Hips</h3>
                <p className="text-sm text-gray-600">
                  Measure around the fullest part of your hips, keeping the tape parallel to the floor.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-ocean-50 p-6 rounded-lg">
            <h3 className="font-medium mb-4">Fit Tips</h3>
            <ul className="space-y-2 text-sm text-ocean-800">
              <li>• If you&apos;re between sizes, we recommend sizing up for a more comfortable fit.</li>
              <li>• Our swimwear has a snug fit that will relax slightly when wet.</li>
              <li>• For bikinis, you can mix and match top and bottom sizes.</li>
              <li>• Still unsure? Contact us for personalized sizing advice.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
