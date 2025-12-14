import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { generateOrderNumber } from '@/lib/utils';

// POK API Configuration
const POK_API_URL = process.env.POK_API_URL || 'https://api-staging.pokpay.io';
const POK_KEY_ID = process.env.POK_KEY_ID || '';
const POK_KEY_SECRET = process.env.POK_KEY_SECRET || '';
const POK_MERCHANT_ID = process.env.POK_MERCHANT_ID || '';

// Helper to authenticate with POK
async function getPokToken(): Promise<string | null> {
  try {
    const response = await fetch(`${POK_API_URL}/auth/sdk/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        keyId: POK_KEY_ID,
        keySecret: POK_KEY_SECRET,
      }),
    });

    if (!response.ok) {
      console.error('POK Auth failed:', await response.text());
      return null;
    }

    const data = await response.json();
    return data.data?.token || null;
  } catch (error) {
    console.error('POK Auth error:', error);
    return null;
  }
}

// Helper to create POK order
async function createPokOrder(token: string, orderData: {
  orderNumber: string;
  amount: number;
  currency: string;
  products: { name: string; quantity: number; unitPrice: number }[];
  successUrl: string;
  cancelUrl: string;
  webhookUrl: string;
}) {
  try {
    const response = await fetch(`${POK_API_URL}/merchants/${POK_MERCHANT_ID}/sdk-orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        externalId: orderData.orderNumber,
        amount: Math.round(orderData.amount * 100), // Convert to cents
        currency: orderData.currency,
        products: orderData.products.map(p => ({
          name: p.name,
          quantity: p.quantity,
          unitPrice: Math.round(p.unitPrice * 100),
        })),
        redirectUrl: orderData.successUrl,
        cancelUrl: orderData.cancelUrl,
        webhookUrl: orderData.webhookUrl,
      }),
    });

    if (!response.ok) {
      console.error('POK Create Order failed:', await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('POK Create Order error:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shipping, subtotal, shippingCost, total } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Create shipping address
    const shippingAddress = await prisma.address.create({
      data: {
        firstName: shipping.firstName,
        lastName: shipping.lastName,
        email: shipping.email,
        phone: shipping.phone || null,
        address1: shipping.address,
        city: shipping.city,
        postalCode: shipping.postalCode,
        country: shipping.country,
      },
    });

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentMethod: 'POK',
        subtotal,
        shippingCost,
        tax: 0,
        total,
        currency: 'EUR',
        shippingAddressId: shippingAddress.id,
        billingAddressId: shippingAddress.id,
        items: {
          create: items.map((item: { productId: string; variantId?: string; quantity: number; price: number }) => ({
            productId: item.productId,
            variantId: item.variantId || null,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // Get base URL
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    // Try to create POK payment
    if (POK_KEY_ID && POK_KEY_SECRET && POK_MERCHANT_ID) {
      const token = await getPokToken();
      
      if (token) {
        const pokOrder = await createPokOrder(token, {
          orderNumber,
          amount: total,
          currency: 'EUR',
          products: items.map((item: { name: string; quantity: number; price: number }) => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
          })),
          successUrl: `${baseUrl}/checkout/success?order=${orderNumber}`,
          cancelUrl: `${baseUrl}/checkout?cancelled=true`,
          webhookUrl: `${baseUrl}/api/webhooks/pok`,
        });

        if (pokOrder?.data) {
          // Update order with POK order ID
          await prisma.order.update({
            where: { id: order.id },
            data: {
              pokOrderId: pokOrder.data.id,
              pokPaymentUrl: pokOrder.data.paymentUrl,
            },
          });

          // Return payment URL for redirect
          if (pokOrder.data.paymentUrl) {
            return NextResponse.json({
              success: true,
              orderNumber,
              orderId: order.id,
              paymentUrl: pokOrder.data.paymentUrl,
            });
          }
        }
      }
    }

    // If POK is not configured or failed, return success for manual payment
    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: order.id,
      message: 'Order created. Payment will be processed manually.',
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}
