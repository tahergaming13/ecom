export const PLATFORMS = [
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok' },
  { id: 'instagram', name: 'Instagram Reels', icon: 'instagram' },
  { id: 'youtube', name: 'YouTube Shorts', icon: 'youtube' },
];

export const isValidPlatform = (platform: string) => {
    return PLATFORMS.some(p => p.id === platform);
}
