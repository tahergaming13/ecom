import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { triggerN8nWorkflow } from '@/lib/n8n';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { niche, targetAudience, tone, platforms } = body;

        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Create the draft project in DB
        const project = await prisma.project.create({
            data: {
                userId: user.id,
                niche,
                status: 'GENERATING',
            }
        });

        // Trigger n8n async generation, if URL is provided
        if (process.env.N8N_WORKFLOW_GENERATE_URL) {
            triggerN8nWorkflow(process.env.N8N_WORKFLOW_GENERATE_URL, {
                projectId: project.id,
                niche,
                targetAudience,
                tone,
                platforms
            }).catch(e => console.error('Failed to trigger n8n process:', e));
        }

        return NextResponse.json({ projectId: project.id, status: 'GENERATING' });
    } catch (error: any) {
        console.error('Studio generate error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
