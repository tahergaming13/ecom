import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { niche, region } = body;

        if (!niche || !region) {
            return NextResponse.json({ error: 'Niche and region are required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        
        if (!user) {
            return NextResponse.json({ error: 'User not found in DB' }, { status: 404 });
        }

        // Mock data logic for market analysis
        // In a real scenario, this would trigger firecrawl or other external APIs
        const marketAnalysisData = await prisma.marketAnalysis.create({
            data: {
                userId: user.id,
                niche,
                region,
                pricePositioning: {
                    create: {
                        minPrice: 10,
                        maxPrice: 150,
                        averagePrice: 45,
                        suggestedPrice: 40,
                        recommendation: 'Position slightly below average to gain market entry.',
                    }
                },
                trendingProducts: {
                    create: [
                        { name: 'Trending Product 1', price: 35, engagement: 'High' },
                        { name: 'Trending Product 2', price: 45, engagement: 'Medium' }
                    ]
                },
                videoIdeas: {
                    create: [
                        { hook: 'Did you know you can...', format: 'Reaction', tone: 'Excited', platform: 'TikTok', performance: 'High' }
                    ]
                },
                hashtags: {
                    create: [
                        { platform: 'TikTok', tags: ['#trending', '#foryou', '#product'] }
                    ]
                }
            },
            include: {
                pricePositioning: true,
                trendingProducts: true,
                videoIdeas: true,
                hashtags: true
            }
        });

        return NextResponse.json(marketAnalysisData);

    } catch (error: any) {
        console.error('Market analysis error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
