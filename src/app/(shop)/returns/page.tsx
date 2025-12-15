export default function ReturnsPage() {
  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Returns & Exchanges</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">Easy returns within 30 days.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-narrow">
          <div className="prose max-w-none space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="heading-4 mb-4">Return Policy</h2>
              <p className="text-gray-600 mb-4">We offer free returns within 30 days of purchase. Items must be unworn, unwashed, and have original tags attached.</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Original tags must be attached</li>
                <li>Items must be unworn and unwashed</li>
                <li>Swimwear hygiene liner must be intact</li>
                <li>Items must be in original packaging</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="heading-4 mb-4">How to Return</h2>
              <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                <li>Contact us at returns@delphineswimwear.com</li>
                <li>Receive your prepaid return label</li>
                <li>Pack items securely and attach label</li>
                <li>Drop off at your nearest shipping point</li>
              </ol>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="heading-4 mb-4">Refund Processing</h2>
              <p className="text-gray-600">Refunds are processed within 5-7 business days after we receive your return. You will receive an email confirmation once processed.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
