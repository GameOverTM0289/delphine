export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-cream pt-28 pb-20">
      <div className="container-main max-w-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-display text-3xl md:text-4xl mb-4">Shipping</h1>
          <p className="text-body">
            We deliver worldwide with care and precision.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          <section>
            <h2 className="text-display text-xl mb-6">Delivery Times</h2>
            <div className="bg-white p-6 space-y-4">
              <div className="flex justify-between py-3 border-b border-charcoal-100">
                <span className="text-sm">Albania</span>
                <span className="text-sm text-charcoal-600">1-2 business days</span>
              </div>
              <div className="flex justify-between py-3 border-b border-charcoal-100">
                <span className="text-sm">Europe</span>
                <span className="text-sm text-charcoal-600">3-5 business days</span>
              </div>
              <div className="flex justify-between py-3 border-b border-charcoal-100">
                <span className="text-sm">USA & Canada</span>
                <span className="text-sm text-charcoal-600">5-7 business days</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-sm">Rest of World</span>
                <span className="text-sm text-charcoal-600">7-14 business days</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-display text-xl mb-6">Shipping Costs</h2>
            <div className="bg-white p-6 space-y-4">
              <div className="flex justify-between py-3 border-b border-charcoal-100">
                <span className="text-sm">Orders over €100</span>
                <span className="text-sm text-charcoal-600">Free</span>
              </div>
              <div className="flex justify-between py-3 border-b border-charcoal-100">
                <span className="text-sm">Standard Shipping</span>
                <span className="text-sm text-charcoal-600">€8.99</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-sm">Express Shipping</span>
                <span className="text-sm text-charcoal-600">€15.99</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-display text-xl mb-6">Order Tracking</h2>
            <p className="text-body leading-relaxed">
              Once your order has been shipped, you will receive a confirmation email with a tracking number. 
              You can use this number to track your package on our shipping partner&apos;s website.
            </p>
          </section>

          <section>
            <h2 className="text-display text-xl mb-6">Questions?</h2>
            <p className="text-body leading-relaxed mb-6">
              If you have any questions about shipping, please don&apos;t hesitate to contact us.
            </p>
            <a href="mailto:hello@delphineswimwear.com" className="btn-outline">
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
