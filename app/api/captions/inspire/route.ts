import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    return NextResponse.json({
        inspirations: [
            "What if everything you knew about X was wrong?",
            "The 1 secret they don't want you to know about...",
            "POV: You just found the perfect solution for your..."
        ]
    });
}
