import prisma from '@/lib/db/prisma';
import { formatDateTime } from '@/lib/utils';

async function getSubscribers() {
  return prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: 'desc' },
  });
}

export default async function AdminNewsletterPage() {
  const subscribers = await getSubscribers();
  const activeCount = subscribers.filter(s => s.isActive).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">Newsletter</h1>
        <p className="text-gray-600 mt-1">{activeCount} active subscribers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="admin-stat-card">
          <span className="text-3xl mb-2">📧</span>
          <span className="text-sm text-gray-500">Total</span>
          <span className="text-2xl font-bold">{subscribers.length}</span>
        </div>
        <div className="admin-stat-card">
          <span className="text-3xl mb-2">✅</span>
          <span className="text-sm text-gray-500">Active</span>
          <span className="text-2xl font-bold text-green-600">{activeCount}</span>
        </div>
        <div className="admin-stat-card">
          <span className="text-3xl mb-2">❌</span>
          <span className="text-sm text-gray-500">Unsubscribed</span>
          <span className="text-2xl font-bold text-red-600">{subscribers.length - activeCount}</span>
        </div>
      </div>

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
                    <td className="text-sm text-gray-500">{formatDateTime(sub.subscribedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="text-5xl mb-4 block">📭</span>
            <p className="text-gray-500">No subscribers yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
