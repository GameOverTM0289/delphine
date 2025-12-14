import prisma from '@/lib/db/prisma';
import { formatPrice, formatDateTime } from '@/lib/utils';

export const dynamic = 'force-dynamic';

async function getOrders() {
  return prisma.order.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">Orders</h1>
        <p className="text-gray-600 mt-1">{orders.length} total orders</p>
      </div>

      <div className="admin-card overflow-hidden">
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-medium">{order.orderNumber}</td>
                    <td>
                      <div>
                        <p className="font-medium text-sm">{order.shippingName}</p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td>
                      <span className={`status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <span className={order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-yellow-600'}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="font-medium">{formatPrice(order.total)}</td>
                    <td className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</td>
                    <td>
                      <button className="p-2 hover:bg-gray-100 rounded" title="View">
                        👁️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
