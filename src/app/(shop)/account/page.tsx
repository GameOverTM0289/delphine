'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/account');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin w-8 h-8 border-2 border-ocean-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'addresses', label: 'Addresses', icon: '📍' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
  ];

  return (
    <section className="section pt-32">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="heading-2">My Account</h1>
          <p className="text-gray-600 mt-1">Welcome back, {session.user.firstName}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-ocean-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="heading-4 mb-6">Profile Information</h2>
                <form className="space-y-4 max-w-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">First Name</label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={session.user.firstName}
                      />
                    </div>
                    <div>
                      <label className="label">Last Name</label>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={session.user.lastName}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      className="input-field"
                      defaultValue={session.user.email}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="label">Phone</label>
                    <input type="tel" className="input-field" placeholder="+355 69 xxx xxxx" />
                  </div>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </form>

                <hr className="my-8" />

                <h3 className="font-medium mb-4">Change Password</h3>
                <form className="space-y-4 max-w-md">
                  <div>
                    <label className="label">Current Password</label>
                    <input type="password" className="input-field" />
                  </div>
                  <div>
                    <label className="label">New Password</label>
                    <input type="password" className="input-field" />
                  </div>
                  <div>
                    <label className="label">Confirm New Password</label>
                    <input type="password" className="input-field" />
                  </div>
                  <button type="submit" className="btn-outline">
                    Update Password
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="heading-4 mb-6">Order History</h2>
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">📦</span>
                  <p className="text-gray-500 mb-4">No orders yet</p>
                  <Link href="/shop" className="btn-primary">
                    Start Shopping
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-4">Saved Addresses</h2>
                  <button className="btn-outline btn-sm">+ Add Address</button>
                </div>
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">📍</span>
                  <p className="text-gray-500">No saved addresses</p>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="heading-4 mb-6">My Wishlist</h2>
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">❤️</span>
                  <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                  <Link href="/shop" className="btn-primary">
                    Explore Products
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
