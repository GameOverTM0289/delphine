export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-cream pt-28 pb-20">
      <div className="container-main max-w-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-display text-3xl md:text-4xl mb-4">Returns & Exchanges</h1>
          <p className="text-body">
            We want you to love your Delphine pieces.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          <section>
            <h2 className="text-display text-xl mb-6">Return Policy</h2>
            <div className="bg-white p-6">
              <p className="text-body leading-relaxed mb-4">
                We accept returns within 14 days of delivery. Items must be unworn, unwashed, 
                and in their original packaging with all tags attached.
              </p>
              <p className="text-body leading-relaxed">
                For hygiene reasons, swimwear that has been worn or has had the hygiene seal removed 
                cannot be returned.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-display text-xl mb-6">How to Return</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 flex gap-4">
                <span className="w-8 h-8 flex items-center justify-center border border-charcoal-200 rounded-full text-sm flex-shrink-0">1</span>
                <div>
                  <h3 className="text-sm font-medium mb-2">Contact Us</h3>
                  <p className="text-body text-sm">Email hello@delphineswimwear.com with your order number and reason for return.</p>
                </div>
              </div>
              <div className="bg-white p-6 flex gap-4">
                <span className="w-8 h-8 flex items-center justify-center border border-charcoal-200 rounded-full text-sm flex-shrink-0">2</span>
                <div>
                  <h3 className="text-sm font-medium mb-2">Pack Your Items</h3>
                  <p className="text-body text-sm">Place items in original packaging or a secure box.</p>
                </div>
              </div>
              <div className="bg-white p-6 flex gap-4">
                <span className="w-8 h-8 flex items-center justify-center border border-charcoal-200 rounded-full text-sm flex-shrink-0">3</span>
                <div>
                  <h3 className="text-sm font-medium mb-2">Ship & Track</h3>
                  <p className="text-body text-sm">Send your package using a tracked shipping method.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-display text-xl mb-6">Refunds</h2>
            <p className="text-body leading-relaxed">
              Once we receive and inspect your return, we&apos;ll process your refund within 5-7 business days. 
              The refund will be credited to your original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-display text-xl mb-6">Exchanges</h2>
            <p className="text-body leading-relaxed mb-6">
              For exchanges, please return your original item and place a new order for the desired size or color.
            </p>
            <a href="mailto:hello@delphineswimwear.com" className="btn-outline">
              Start a Return
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
