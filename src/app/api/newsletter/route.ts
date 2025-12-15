import { NextResponse } from 'next/server';

const subscribers: Set<string> = new Set();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (subscribers.has(email.toLowerCase())) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 400 });
    }
    subscribers.add(email.toLowerCase());
    return NextResponse.json({ success: true, message: 'Successfully subscribed!' });
  } catch {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
