import prisma from '@/lib/db/prisma';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

async function getCustomers() {
  return prisma.user.findMany({
    where: { role: 'USER' },
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">Customers</h1>
        <p className="text-gray-600 mt-1">{customers.length} total customers</p>
      </div>

      <div className="admin-card overflow-hidden">
        {customers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="font-medium">{customer.firstName} {customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td>{customer._count.orders}</td>
                    <td className="text-sm text-gray-500">{formatDate(customer.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No customers yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
