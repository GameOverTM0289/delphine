export default function ShippingPage() {
  return (
    <section className="section mt-16">
      <div className="container-narrow">
        <h1 className="heading-1 mb-8">Shipping Information</h1>
        <div className="prose max-w-none text-black/70 space-y-6">
          <h2 className="heading-3 text-black">Shipping Options</h2>
          <p><strong>Standard Shipping:</strong> 5-7 business days - €8.99</p>
          <p><strong>Express Shipping:</strong> 2-3 business days - €15.99</p>
          <p><strong>Free Shipping:</strong> On orders over €100</p>
          <h2 className="heading-3 text-black">International Shipping</h2>
          <p>We ship to most countries worldwide. International shipping times and costs vary by destination.</p>
          <h2 className="heading-3 text-black">Order Tracking</h2>
          <p>Once your order ships, you will receive a confirmation email with tracking information.</p>
        </div>
      </div>
    </section>
  );
}
