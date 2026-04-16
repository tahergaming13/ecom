import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const projects = await prisma.project.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            include: { publishLogs: true }
        });

        return NextResponse.json(projects);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
