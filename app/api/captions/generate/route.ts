import { NextResponse } from 'next/server';
import { anthropic, getSystemPrompt } from '@/lib/anthropic';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { prompt } = body;

        if (!prompt) return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });

        const response = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 300,
            system: getSystemPrompt(),
            messages: [{ role: 'user', content: prompt }]
        });

        return NextResponse.json({ result: response.content[0] });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
