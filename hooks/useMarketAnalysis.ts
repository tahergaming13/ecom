import { useState } from 'react';
import { MarketAnalysisResponse } from '../types/market';

export const useMarketAnalysis = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<MarketAnalysisResponse | null>(null);

    const analyzeMarket = async (niche: string, region: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/market/analyse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ niche, region })
            });
            
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || 'Failed to analyze market');
            }
            
            const result = await res.json();
            setData(result);
            return result;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { analyzeMarket, data, isLoading, error };
}
