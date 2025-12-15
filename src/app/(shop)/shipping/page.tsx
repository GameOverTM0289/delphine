export default function ShippingPage() {
  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Shipping Information</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">Fast and reliable shipping worldwide.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-narrow">
          <div className="prose max-w-none space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="heading-4 mb-4">Shipping Rates</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b"><span>Standard Shipping (5-7 days)</span><span className="font-medium">€8.99</span></div>
                <div className="flex justify-between py-3 border-b"><span>Express Shipping (2-3 days)</span><span className="font-medium">€15.99</span></div>
                <div className="flex justify-between py-3"><span>Free shipping on orders over</span><span className="font-medium text-green-600">€100</span></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="heading-4 mb-4">Delivery Times</h2>
              <p className="text-gray-600">Orders are processed within 1-2 business days. Delivery times vary by location. You will receive tracking information once your order ships.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="heading-4 mb-4">International Shipping</h2>
              <p className="text-gray-600">We ship to over 50 countries worldwide. International orders may be subject to customs duties and taxes.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
