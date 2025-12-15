import Link from 'next/link';
import prisma from '@/lib/db/prisma';
import { formatPrice, formatDate } from '@/lib/utils';

async function getDashboardData() {
  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    totalRevenue,
    recentOrders,
    topProducts,
  ] = await Promise.all([
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.count(),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: { paymentStatus: 'PAID' },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
    prisma.product.findMany({
      take: 5,
      where: { isActive: true },
      orderBy: { stockQuantity: 'desc' },
    }),
  ]);

  return {
    stats: {
      products: totalProducts,
      orders: totalOrders,
      customers: totalCustomers,
      revenue: totalRevenue._sum.total || 0,
    },
    recentOrders,
    topProducts,
  };
}

export default async function AdminDashboard() {
  const { stats, recentOrders, topProducts } = await getDashboardData();

  const statCards = [
    { label: 'Total Revenue', value: formatPrice(stats.revenue), icon: '💰' },
    { label: 'Orders', value: stats.orders.toString(), icon: '📦' },
    { label: 'Customers', value: stats.customers.toString(), icon: '👥' },
    { label: 'Products', value: stats.products.toString(), icon: '🏷️' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading-2">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your store overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="admin-stat-card">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <span className="text-sm text-gray-500">{stat.label}</span>
            <span className="text-2xl font-bold mt-1">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-4">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-ocean-600 hover:underline">
              View all →
            </Link>
          </div>
          {recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="font-medium">{order.orderNumber}</td>
                      <td>{order.user?.firstName || order.email}</td>
                      <td>
                        <span className={`status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{formatPrice(order.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          )}
        </div>

        {/* Top Products */}
        <div className="admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-4">Top Products</h2>
            <Link href="/admin/products" className="text-sm text-ocean-600 hover:underline">
              View all →
            </Link>
          </div>
          {topProducts.length > 0 ? (
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">Stock: {product.stockQuantity}</p>
                  </div>
                  <span className="font-medium text-sm">{formatPrice(product.price)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No products yet</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card">
        <h2 className="heading-4 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/products" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-2xl">➕</span>
            <span className="font-medium">Add Product</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-2xl">📋</span>
            <span className="font-medium">View Orders</span>
          </Link>
          <Link href="/admin/slides" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-2xl">🖼️</span>
            <span className="font-medium">Edit Slides</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-2xl">⚙️</span>
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
