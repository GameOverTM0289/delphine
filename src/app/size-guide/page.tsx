export default function SizeGuidePage() {
  return (
    <>
      <section className="bg-cream py-16 md:py-24 mt-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Size Guide</h1>
          <p className="body-text-lg text-black/70 max-w-xl mx-auto">
            Find your perfect fit with our sizing guide.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="py-4 px-4 text-left font-medium">Size</th>
                  <th className="py-4 px-4 text-left font-medium">EU</th>
                  <th className="py-4 px-4 text-left font-medium">UK</th>
                  <th className="py-4 px-4 text-left font-medium">US</th>
                  <th className="py-4 px-4 text-left font-medium">Bust (cm)</th>
                  <th className="py-4 px-4 text-left font-medium">Waist (cm)</th>
                  <th className="py-4 px-4 text-left font-medium">Hips (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/10">
                  <td className="py-4 px-4 font-medium">S</td>
                  <td className="py-4 px-4">34-36</td>
                  <td className="py-4 px-4">6-8</td>
                  <td className="py-4 px-4">2-4</td>
                  <td className="py-4 px-4">82-86</td>
                  <td className="py-4 px-4">62-66</td>
                  <td className="py-4 px-4">88-92</td>
                </tr>
                <tr className="border-b border-black/10">
                  <td className="py-4 px-4 font-medium">M</td>
                  <td className="py-4 px-4">38-40</td>
                  <td className="py-4 px-4">10-12</td>
                  <td className="py-4 px-4">6-8</td>
                  <td className="py-4 px-4">86-90</td>
                  <td className="py-4 px-4">66-70</td>
                  <td className="py-4 px-4">92-96</td>
                </tr>
                <tr className="border-b border-black/10">
                  <td className="py-4 px-4 font-medium">L</td>
                  <td className="py-4 px-4">42-44</td>
                  <td className="py-4 px-4">14-16</td>
                  <td className="py-4 px-4">10-12</td>
                  <td className="py-4 px-4">90-94</td>
                  <td className="py-4 px-4">70-74</td>
                  <td className="py-4 px-4">96-100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
