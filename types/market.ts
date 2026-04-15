export interface MarketAnalysisResponse {
    niche: string;
    region: string;
    pricePositioning: PricePositioningData;
    trendingProducts: TrendingProductData[];
    videoIdeas: VideoIdeaData[];
    hashtags: HashtagData[];
}

export interface PricePositioningData {
    minPrice: number;
    maxPrice: number;
    averagePrice: number;
    suggestedPrice: number;
    recommendation: string;
}

export interface TrendingProductData {
    name: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    engagement?: string;
}

export interface VideoIdeaData {
    hook: string;
    format: string;
    tone: string;
    platform: string;
    performance: string;
}

export interface HashtagData {
    platform: string;
    tags: string[];
}
