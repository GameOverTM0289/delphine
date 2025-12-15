export default function SizeGuidePage() {
  const sizes = [
    { size: 'XS', bust: '80-84', waist: '60-64', hips: '86-90' },
    { size: 'S', bust: '84-88', waist: '64-68', hips: '90-94' },
    { size: 'M', bust: '88-92', waist: '68-72', hips: '94-98' },
    { size: 'L', bust: '92-96', waist: '72-76', hips: '98-102' },
    { size: 'XL', bust: '96-100', waist: '76-80', hips: '102-106' },
  ];
  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Size Guide</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">Find your perfect fit.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-narrow">
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
            <h2 className="heading-4 mb-6">Size Chart (cm)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b"><th className="py-3 px-4 text-left">Size</th><th className="py-3 px-4 text-center">Bust</th><th className="py-3 px-4 text-center">Waist</th><th className="py-3 px-4 text-center">Hips</th></tr></thead>
                <tbody>
                  {sizes.map((s) => (<tr key={s.size} className="border-b last:border-0"><td className="py-3 px-4 font-medium">{s.size}</td><td className="py-3 px-4 text-center">{s.bust}</td><td className="py-3 px-4 text-center">{s.waist}</td><td className="py-3 px-4 text-center">{s.hips}</td></tr>))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="heading-4 mb-4">How to Measure</h2>
            <ul className="text-gray-600 space-y-3">
              <li><strong>Bust:</strong> Measure around the fullest part of your bust.</li>
              <li><strong>Waist:</strong> Measure around the narrowest part of your waist.</li>
              <li><strong>Hips:</strong> Measure around the fullest part of your hips.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
