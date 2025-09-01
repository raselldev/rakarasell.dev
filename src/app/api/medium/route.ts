import { NextResponse } from 'next/server';
import { getMediumFeed } from '@/lib/medium';

export const revalidate = 1800; // cache respons API 30 menit (di level fetch yang manggil)

export async function GET() {
  try {
    const items = await getMediumFeed();
    return NextResponse.json({ items }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed' }, { status: 500 });
  }
}
