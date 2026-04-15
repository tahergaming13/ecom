import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { niche, product, tone } = body;

        const prompt = `Write a short, viral script for a ${niche} product focused on ${product}. The tone should be ${tone}. Keep it under 60 seconds of speaking time.`;

        return NextResponse.json({ prompt });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
