export default function PrivacyPage() {
  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Privacy Policy</h1>
          <p className="body-text-lg text-gray-600">Last updated: December 2024</p>
        </div>
      </section>
      <section className="section">
        <div className="container-narrow">
          <div className="prose max-w-none space-y-8 text-gray-600">
            <div><h2 className="heading-4 text-gray-900 mb-4">Information We Collect</h2><p>We collect information you provide directly, including name, email, shipping address, and payment information when you make a purchase.</p></div>
            <div><h2 className="heading-4 text-gray-900 mb-4">How We Use Your Information</h2><p>We use your information to process orders, send updates, and improve our services. We never sell your personal data to third parties.</p></div>
            <div><h2 className="heading-4 text-gray-900 mb-4">Data Security</h2><p>We implement industry-standard security measures to protect your personal information. All transactions are encrypted using SSL technology.</p></div>
            <div><h2 className="heading-4 text-gray-900 mb-4">Contact Us</h2><p>If you have questions about our privacy practices, please contact us at privacy@delphineswimwear.com.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
