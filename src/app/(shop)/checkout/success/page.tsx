import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const orderNumber = `DLP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
  return (
    <section className="min-h-screen flex items-center justify-center bg-ivory-100 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 border-2 border-charcoal-700 rounded-full flex items-center justify-center mx-auto mb-10 animate-scale-in">
          <svg className="w-8 h-8 text-charcoal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="heading-2 mb-4 animate-fade-up">Thank You</h1>
        
        <p className="body text-stone-500 mb-2 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Your order has been confirmed.
        </p>
        <p className="body text-stone-500 mb-10 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          A confirmation email is on its way.
        </p>

        <div className="bg-ivory-200 p-6 mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <p className="body-sm text-stone-500 mb-1">Order Number</p>
          <p className="font-display text-xl text-charcoal-800">{orderNumber}</p>
        </div>

        <div className="space-y-6 mb-12 text-left bg-ivory-200 p-6 animate-fade-up" style={{ animationDelay: '0.25s' }}>
          <h3 className="label">What&apos;s Next</h3>
          <ul className="space-y-4 body text-stone-600">
            <li className="flex gap-3">
              <span className="text-charcoal-400">01</span>
              <span>Order confirmation email sent</span>
            </li>
            <li className="flex gap-3">
              <span className="text-charcoal-400">02</span>
              <span>You&apos;ll receive shipping updates</span>
            </li>
            <li className="flex gap-3">
              <span className="text-charcoal-400">03</span>
              <span>Track delivery via email link</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link href="/shop" className="btn-primary flex-1">Continue Shopping</Link>
          <Link href="/account" className="btn-outline flex-1">View Orders</Link>
        </div>
      </div>
    </section>
  );
}
