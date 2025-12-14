export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream pt-28 pb-20">
      <div className="container-main max-w-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-display text-3xl md:text-4xl mb-4">Privacy Policy</h1>
          <p className="text-body">Last updated: January 2024</p>
        </div>

        {/* Content */}
        <div className="bg-white p-8 md:p-12 space-y-10">
          <section>
            <h2 className="text-display text-lg mb-4">Information We Collect</h2>
            <p className="text-body leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, subscribe to our newsletter, or contact us for support. This may include 
              your name, email address, postal address, phone number, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg mb-4">How We Use Your Information</h2>
            <p className="text-body leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="text-body leading-relaxed space-y-2 pl-4">
              <li>• Process and fulfill your orders</li>
              <li>• Send you order confirmations and updates</li>
              <li>• Respond to your questions and requests</li>
              <li>• Send promotional communications (with your consent)</li>
              <li>• Improve our products and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-display text-lg mb-4">Information Sharing</h2>
            <p className="text-body leading-relaxed">
              We do not sell or rent your personal information to third parties. We may share your 
              information with service providers who assist us in operating our business, such as 
              payment processors and shipping carriers.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg mb-4">Data Security</h2>
            <p className="text-body leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg mb-4">Your Rights</h2>
            <p className="text-body leading-relaxed">
              You have the right to access, correct, or delete your personal information. You may also 
              opt out of receiving promotional communications at any time by clicking the unsubscribe 
              link in our emails.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg mb-4">Contact Us</h2>
            <p className="text-body leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
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
