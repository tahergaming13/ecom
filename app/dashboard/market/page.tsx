'use client';

import { PageHeader } from "@/components/shared/page-header";
import { useState } from "react";
import { useMarketAnalysis } from "@/hooks/useMarketAnalysis";
import { LoadingSpinner, EmptyState } from "@/components/shared/states";
import { BarChart3 } from "lucide-react";

export default function MarketAnalyzerPage() {
    const { analyzeMarket, data, isLoading, error } = useMarketAnalysis();
    const [niche, setNiche] = useState("");
    const [region, setRegion] = useState("");

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!niche || !region) return;
        await analyzeMarket(niche, region);
    };

    return (
        <div className="h-full">
            <PageHeader 
                title="Market Analyser" 
                description="Discover trending products and top competitors in your niche."
            />
            
            <div className="rounded-xl border bg-card p-6 shadow-sm mb-8 animate-in slide-in-from-bottom-4 duration-700">
                <form onSubmit={handleAnalyze} className="flex flex-col gap-4 md:flex-row md:items-end">
                    <div className="flex-1 space-y-2">
                        <label htmlFor="niche" className="text-sm font-medium">Niche</label>
                        <input 
                            id="niche"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            placeholder="e.g. Minimalist Home Decor"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <label htmlFor="region" className="text-sm font-medium">Target Region</label>
                        <input 
                            id="region"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            placeholder="e.g. MENA, USA, UK"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoading || !niche || !region}
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        {isLoading ? "Analyzing..." : "Analyze Market"}
                    </button>
                </form>
            </div>

            {error && (
                 <div className="rounded-md bg-destructive/15 p-4 text-destructive mb-8">
                    {error}
                </div>
            )}

            {isLoading && <LoadingSpinner text="Scanning competitors and trends..." />}

            {!isLoading && !data && !error && (
                <EmptyState 
                    icon={BarChart3} 
                    title="Ready for Analysis" 
                    description="Enter a niche and region above to generate a comprehensive market report based on live competitor data." 
                />
            )}

            {data && !isLoading && (
                <div className="grid gap-6 animate-in slide-in-from-bottom-8 duration-700">
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-4">Price Positioning</h3>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="rounded-lg bg-muted p-4">
                                <p className="text-sm text-muted-foreground">Average Price</p>
                                <p className="text-2xl font-bold mt-1">${data.pricePositioning.averagePrice}</p>
                            </div>
                            <div className="rounded-lg bg-muted p-4">
                                <p className="text-sm text-muted-foreground">Suggested Price</p>
                                <p className="text-2xl font-bold text-emerald-500 mt-1">${data.pricePositioning.suggestedPrice}</p>
                            </div>
                            <div className="rounded-lg bg-muted p-4 md:col-span-2">
                                <p className="text-sm text-muted-foreground">Recommendation</p>
                                <p className="text-lg font-medium mt-1">{data.pricePositioning.recommendation}</p>
                            </div>
                        </div>
                    </div>
                    
                     <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-4">Trending Products</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {data.trendingProducts.map((p, idx) => (
                                <div key={idx} className="flex gap-4 rounded-lg border p-4 bg-background">
                                    <div className="h-16 w-16 bg-muted rounded-md flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold">{p.name}</p>
                                        <p className="text-sm text-muted-foreground">{p.engagement} Engagement</p>
                                        <p className="text-sm font-medium mt-1 text-primary">${p.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
