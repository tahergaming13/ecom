import { useState } from 'react';
import { ProjectSettings } from '../types/studio';

export const useProject = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createProject = async (settings: ProjectSettings) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/studio/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            
            if (!res.ok) throw new Error('Failed to create project');
            return await res.json();
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { createProject, isLoading, error };
}
