export interface ProjectSettings {
    niche: string;
    targetAudience: string;
    tone: string;
    platforms: string[];
}

export interface VideoGenerationParams {
    projectId: string;
    settings: ProjectSettings;
    script?: string;
    selectedAudioId?: string;
}

export interface GenerationStatus {
    status: 'DRAFT' | 'GENERATING' | 'COMPLETED' | 'FAILED';
    progress?: number;
    videoUrls?: string[];
    error?: string;
}
