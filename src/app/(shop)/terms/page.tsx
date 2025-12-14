export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cream pt-28 pb-20">
      <div className="container-main max-w-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-display text-3xl md:text-4xl mb-4">Terms of Service</h1>
          <p className="text-body">Last updated: January 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white p-8 md:p-12 space-y-10">
          <section>
            <h2 className="text-display text-lg mb-4">Agreement to Terms</h2>
            <p className="text-body leading-relaxed">
              By accessing or using our website, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg mb-4">Use of Website</h2>
            <p className="text-body leading-relaxed">
              You may use our website for lawful purposes only. You agree not to use the website 
              in any way that could damage, disable, or impair the website or interfere with any 
              other party&apos;s use of the website.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg mb-4">Products and Pricing</h2>
            <p className="text-body leading-relaxed">
              We make every effort to ensure the accuracy of product descriptions and pricing. 
              However, we reserve the right to correct any errors and to change or update information 
              at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg mb-4">Orders and Payment</h2>
            <p className="text-body leading-relaxed">
              By placing an order, you are making an offer to purchase a product. We reserve the 
              right to accept or decline your order for any reason. Payment must be received before 
              your order is processed.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg mb-4">Intellectual Property</h2>
            <p className="text-body leading-relaxed">
              All content on this website, including text, graphics, logos, and images, is the 
              property of Delphine and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg mb-4">Limitation of Liability</h2>
            <p className="text-body leading-relaxed">
              Delphine shall not be liable for any indirect, incidental, special, or consequential 
              damages arising out of or in connection with your use of the website or products.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg mb-4">Contact</h2>
            <p className="text-body leading-relaxed">
              For questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:hello@delphineswimwear.com" className="underline hover:opacity-70">
                hello@delphineswimwear.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
