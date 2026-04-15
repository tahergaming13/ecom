import { useState } from 'react';
import { PublishSettings } from '../types/publish';

export const usePublish = () => {
    const [isPublishing, setIsPublishing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const publishVideo = async (settings: PublishSettings) => {
        setIsPublishing(true);
        setError(null);
        try {
            const res = await fetch('/api/publish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            
            if (!res.ok) throw new Error('Failed to publish video');
            return await res.json();
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setIsPublishing(false);
        }
    };

    return { publishVideo, isPublishing, error };
}
