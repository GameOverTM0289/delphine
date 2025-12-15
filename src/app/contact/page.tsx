export default function ContactPage() {
  return (
    <>
      <section className="bg-cream py-16 md:py-24 mt-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Contact Us</h1>
          <p className="body-text-lg text-black/70 max-w-xl mx-auto">
            We would love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="heading-3 mb-6">Get in Touch</h2>
              <div className="space-y-4 text-black/70">
                <p><strong>Email:</strong> hello@delphineswimwear.com</p>
                <p><strong>Phone:</strong> +355 69 123 4567</p>
                <p><strong>Address:</strong> Tirana, Albania</p>
              </div>
              <div className="mt-8">
                <h3 className="font-medium mb-2">Customer Service Hours</h3>
                <p className="text-black/70">Monday - Friday: 9:00 AM - 6:00 PM CET</p>
              </div>
            </div>
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" className="input-field" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="input-field" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea className="input-field h-32 resize-none" placeholder="How can we help?" />
                </div>
                <button type="submit" className="btn-primary w-full">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
