import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { triggerN8nWorkflow } from '@/lib/n8n';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { projectId, platforms, caption, videoUrl } = body;

        // Optionally, check if user is allowed to publish

        // Save publish logs
        for (const platform of platforms) {
            await prisma.publishLog.create({
                data: {
                    projectId,
                    platform,
                    status: 'QUEUED',
                }
            });

            // Trigger n8n logic
            if (process.env.N8N_WORKFLOW_PUBLISH_URL) {
                triggerN8nWorkflow(process.env.N8N_WORKFLOW_PUBLISH_URL, {
                    projectId, platform, caption, videoUrl
                }).catch(e => console.error('Failed to trigger n8n process:', e));
            }
        }

        return NextResponse.json({ success: true, platforms });
    } catch (error: any) {
        console.error('Publish error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
