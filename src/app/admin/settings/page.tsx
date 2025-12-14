'use client';

import { useState } from 'react';

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your store configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-6">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2" defaultValue="Delphine" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea className="w-full border rounded-lg px-3 py-2 h-24" defaultValue="Luxury swimwear from Albania" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input type="email" className="w-full border rounded-lg px-3 py-2" defaultValue="hello@delphineswimwear.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" className="w-full border rounded-lg px-3 py-2" defaultValue="+355 69 444 4818" />
            </div>
          </div>
        </div>

        {/* Currency & Region */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-6">Currency & Region</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="ALL">ALL (Lek)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Country</label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option value="AL">Albania</option>
                <option value="XK">Kosovo</option>
                <option value="IT">Italy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-6">Shipping</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Standard Shipping (€)</label>
              <input type="number" step="0.01" className="w-full border rounded-lg px-3 py-2" defaultValue="8.99" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Express Shipping (€)</label>
              <input type="number" step="0.01" className="w-full border rounded-lg px-3 py-2" defaultValue="15.99" />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-6">Social Media</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="@delphineswimwear" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="facebook.com/delphine" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
              <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="@delphineswimwear" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
