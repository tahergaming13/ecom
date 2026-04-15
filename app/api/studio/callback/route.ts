import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        // Here you would verify a shared secret or signature to ensure the request is from n8n
        const body = await req.json();
        const { projectId, status, videoUrls, error } = body;

        await prisma.project.update({
            where: { id: projectId },
            data: {
                status,
                ...(videoUrls && { videoUrls }),
            }
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
