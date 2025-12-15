import Link from 'next/link';

export default function AccountPage() {
  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">My Account</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">Manage your orders and preferences.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-narrow">
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h2 className="heading-4 mb-4">Welcome Back</h2>
            <p className="text-gray-600 mb-6">Sign in to view your orders and manage your account.</p>
            <p className="text-sm text-gray-500 mb-6">(Demo mode - accounts not implemented)</p>
            <Link href="/shop" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </section>
    </>
  );
}
