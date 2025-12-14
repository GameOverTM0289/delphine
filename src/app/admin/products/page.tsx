import Image from 'next/image';
import prisma from '@/lib/db/prisma';
import { formatPrice, getImageUrl } from '@/lib/utils';

async function getProducts() {
  return prisma.product.findMany({
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      category: true,
      _count: { select: { variants: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2">Products</h1>
          <p className="text-gray-600 mt-1">{products.length} total products</p>
        </div>
        <button className="btn-primary">+ Add Product</button>
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Variants</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-gray-100 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={getImageUrl(product.images[0]?.url || '')}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td>{product.category?.name || '-'}</td>
                  <td className="font-medium">{formatPrice(product.price)}</td>
                  <td>{product.stockQuantity}</td>
                  <td>{product._count.variants}</td>
                  <td>
                    <span className={product.isActive ? 'status-delivered' : 'status-cancelled'}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded" title="Edit">
                        ✏️
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded text-red-600" title="Delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No products yet</p>
            <button className="btn-primary">Add Your First Product</button>
          </div>
        )}
      </div>

      <div className="bg-ocean-50 p-4 rounded-lg text-sm text-ocean-800">
        <strong>Tip:</strong> Run <code className="bg-ocean-100 px-1 rounded">npm run db:seed</code> to add sample products.
      </div>
    </div>
  );
}
