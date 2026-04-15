import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { clerkId: userId } });

        if (!user) {
            return NextResponse.json({ error: 'User not found in DB' }, { status: 404 });
        }

        const competitors = await prisma.competitor.findMany({
            where: { userId: user.id }
        });

        return NextResponse.json(competitors);
    } catch (error: any) {
        console.error('Fetch competitors error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { url, name } = body;

        const user = await prisma.user.findUnique({ where: { clerkId: userId } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const competitor = await prisma.competitor.create({
            data: {
                userId: user.id,
                url,
                name,
            }
        });

        return NextResponse.json(competitor);
    } catch (error: any) {
        console.error('Create competitor error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
