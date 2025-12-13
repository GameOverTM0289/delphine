import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json({ error: 'Already subscribed' }, { status: 400 });
      }
      await prisma.newsletterSubscriber.update({
        where: { email: email.toLowerCase() },
        data: { isActive: true, unsubscribedAt: null },
      });
      return NextResponse.json({ success: true, message: 'Welcome back!' });
    }

    await prisma.newsletterSubscriber.create({
      data: { email: email.toLowerCase() },
    });

    return NextResponse.json({ success: true, message: 'Subscribed!' });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
