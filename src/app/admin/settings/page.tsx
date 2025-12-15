import prisma from '@/lib/db/prisma';

async function getSettings() {
  return prisma.siteSettings.findUnique({
    where: { id: 'settings' },
  });
}

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your store configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Info */}
        <div className="admin-card">
          <h2 className="heading-4 mb-6">Store Information</h2>
          <form className="space-y-4">
            <div>
              <label className="label">Store Name</label>
              <input type="text" className="input-field" defaultValue={settings?.siteName || 'Delphine'} />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea className="input-field h-24" defaultValue={settings?.siteDescription || ''} />
            </div>
            <div>
              <label className="label">Contact Email</label>
              <input type="email" className="input-field" defaultValue={settings?.contactEmail || ''} />
            </div>
            <div>
              <label className="label">Contact Phone</label>
              <input type="text" className="input-field" defaultValue={settings?.contactPhone || ''} />
            </div>
            <button type="submit" className="btn-primary">Save Changes</button>
          </form>
        </div>

        {/* Shipping */}
        <div className="admin-card">
          <h2 className="heading-4 mb-6">Shipping & Tax</h2>
          <form className="space-y-4">
            <div>
              <label className="label">Free Shipping Threshold (€)</label>
              <input type="number" className="input-field" defaultValue={settings?.shippingFreeThreshold || 100} />
            </div>
            <div>
              <label className="label">Standard Shipping Rate (€)</label>
              <input type="number" step="0.01" className="input-field" defaultValue={settings?.shippingStandardRate || 8.99} />
            </div>
            <div>
              <label className="label">Express Shipping Rate (€)</label>
              <input type="number" step="0.01" className="input-field" defaultValue={settings?.shippingExpressRate || 15.99} />
            </div>
            <div>
              <label className="label">Tax Rate (%)</label>
              <input type="number" step="0.01" className="input-field" defaultValue={(settings?.taxRate || 0.20) * 100} />
            </div>
            <button type="submit" className="btn-primary">Save Changes</button>
          </form>
        </div>

        {/* Social Links */}
        <div className="admin-card">
          <h2 className="heading-4 mb-6">Social Media</h2>
          <form className="space-y-4">
            <div>
              <label className="label">Instagram URL</label>
              <input type="url" className="input-field" defaultValue={settings?.socialInstagram || ''} />
            </div>
            <div>
              <label className="label">Facebook URL</label>
              <input type="url" className="input-field" defaultValue={settings?.socialFacebook || ''} />
            </div>
            <div>
              <label className="label">TikTok URL</label>
              <input type="url" className="input-field" defaultValue={settings?.socialTiktok || ''} />
            </div>
            <button type="submit" className="btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}
