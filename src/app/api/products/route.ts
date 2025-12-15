import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const category = searchParams.get('category');
    
    const where: any = { isActive: true };
    
    if (category) {
      where.category = { slug: category };
    }
    
    const products = await prisma.product.findMany({
      where,
      include: {
        images: { orderBy: { position: 'asc' } },
        variants: true,
        category: true,
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json([], { status: 500 });
  }
}
