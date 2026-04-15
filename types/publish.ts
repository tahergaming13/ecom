export interface PublishSettings {
    platforms: string[];
    caption: string;
    scheduledAt?: string; // ISO string 
    videoUrl: string;
    projectId: string;
}

export interface PublishResult {
    platform: string;
    status: 'QUEUED' | 'POSTING' | 'POSTED' | 'FAILED';
    postUrl?: string;
    error?: string;
}
