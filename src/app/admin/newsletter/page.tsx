import prisma from '@/lib/db/prisma';

// Prevent static generation - this page needs database access
export const dynamic = 'force-dynamic';

async function getSubscribers() {
  try {
    return await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export default async function AdminNewsletterPage() {
  const subscribers = await getSubscribers();
  const activeCount = subscribers.filter(s => s.isActive).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading-2">Newsletter</h1>
        <p className="body text-stone-500 mt-1">{activeCount} active subscribers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="admin-stat-card">
          <span className="text-2xl mb-2">📧</span>
          <span className="body-sm text-stone-500">Total</span>
          <span className="text-2xl font-display">{subscribers.length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="text-2xl mb-2">✓</span>
          <span className="body-sm text-stone-500">Active</span>
          <span className="text-2xl font-display text-green-600">{activeCount}</span>
        </div>
        <div className="admin-stat-card">
          <span className="text-2xl mb-2">✗</span>
          <span className="body-sm text-stone-500">Unsubscribed</span>
          <span className="text-2xl font-display text-red-600">{subscribers.length - activeCount}</span>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <h2 className="heading-4 mb-6">All Subscribers</h2>
        {subscribers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id}>
                    <td className="font-medium">{sub.email}</td>
                    <td>
                      <span className={sub.isActive ? 'status-delivered' : 'status-cancelled'}>
                        {sub.isActive ? 'Active' : 'Unsubscribed'}
                      </span>
                    </td>
                    <td className="body-sm text-stone-500">{formatDate(sub.subscribedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="body text-stone-500">No subscribers yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
