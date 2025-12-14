import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('POK Webhook received:', JSON.stringify(body, null, 2));

    const { externalId, status, paymentStatus } = body;

    if (!externalId) {
      return NextResponse.json({ error: 'Missing externalId' }, { status: 400 });
    }

    // Find order by orderNumber (externalId in POK)
    const order = await prisma.order.findUnique({
      where: { orderNumber: externalId },
    });

    if (!order) {
      console.error('Order not found:', externalId);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Map POK status to our status
    let newPaymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' = 'PENDING';
    let newOrderStatus: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' = order.status as 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

    if (paymentStatus === 'completed' || paymentStatus === 'paid' || status === 'completed') {
      newPaymentStatus = 'PAID';
      newOrderStatus = 'CONFIRMED';
    } else if (paymentStatus === 'failed' || status === 'failed') {
      newPaymentStatus = 'FAILED';
    } else if (paymentStatus === 'refunded' || status === 'refunded') {
      newPaymentStatus = 'REFUNDED';
    } else if (paymentStatus === 'cancelled' || status === 'cancelled') {
      newPaymentStatus = 'FAILED';
      newOrderStatus = 'CANCELLED';
    }

    // Update order
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: newPaymentStatus,
        status: newOrderStatus,
      },
    });

    console.log(`Order ${externalId} updated: payment=${newPaymentStatus}, status=${newOrderStatus}`);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('POK Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Also handle GET for webhook verification if needed
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
