'use client';

import { PageHeader } from "@/components/shared/page-header";
import { usePublish } from "@/hooks/usePublish";
import { useState } from "react";
import { useAppStore } from "@/store";
import { Camera, Film, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PublishHubPage() {
    const { publishVideo, isPublishing } = usePublish();
    const projectId = useAppStore(s => s.currentProjectId);
    
    const [caption, setCaption] = useState("");
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['tiktok']);

    const togglePlatform = (p: string) => {
        if (selectedPlatforms.includes(p)) {
            setSelectedPlatforms(selectedPlatforms.filter(x => x !== p));
        } else {
            setSelectedPlatforms([...selectedPlatforms, p]);
        }
    };

    const handlePublish = async () => {
        if (!projectId) return alert("Please generate a video first from Ad Studio.");
        await publishVideo({
            platforms: selectedPlatforms,
            caption,
            videoUrl: 'https://example.com/video.mp4',
            projectId
        });
        alert('Items queued for publishing!');
    };

    return (
        <div className="h-full">
            <PageHeader 
                title="Publish Hub" 
                description="Distribute your generated content instantly to connected channels."
            />

            {!projectId ? (
                <div className="rounded-md bg-amber-500/15 p-4 text-amber-600 mb-8 border border-amber-500/20">
                    No active video queued. Please go to Ad Studio to create one.
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-8 mt-8">
                     <div className="rounded-xl border bg-card p-6 shadow-sm overflow-hidden relative min-h-[400px]">
                         <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
                             <span className="bg-background/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium shadow-sm">Video Preview Unavailable</span>
                         </div>
                     </div>
                     <div className="space-y-6">
                        <div className="space-y-2">
                             <label className="text-sm font-medium">Platforms</label>
                             <div className="flex gap-4">
                                <button onClick={() => togglePlatform('tiktok')} className={cn("flex flex-1 flex-col items-center justify-center rounded-xl border p-4 transition-all", selectedPlatforms.includes('tiktok') ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-muted")}>
                                    <Play className="mb-2 h-6 w-6" />
                                    <span className="text-xs font-medium">TikTok</span>
                                </button>
                                <button onClick={() => togglePlatform('instagram')} className={cn("flex flex-1 flex-col items-center justify-center rounded-xl border p-4 transition-all", selectedPlatforms.includes('instagram') ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-muted")}>
                                    <Camera className="mb-2 h-6 w-6" />
                                    <span className="text-xs font-medium">Reels</span>
                                </button>
                                <button onClick={() => togglePlatform('youtube')} className={cn("flex flex-1 flex-col items-center justify-center rounded-xl border p-4 transition-all", selectedPlatforms.includes('youtube') ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-muted")}>
                                    <Film className="mb-2 h-6 w-6" />
                                    <span className="text-xs font-medium">Shorts</span>
                                </button>
                             </div>
                        </div>

                         <div className="space-y-2">
                             <label className="text-sm font-medium">Caption</label>
                             <textarea 
                                value={caption} 
                                onChange={e => setCaption(e.target.value)}
                                rows={5}
                                placeholder="Generated caption will appear here..."
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                             />
                        </div>

                        <button 
                            onClick={handlePublish}
                            disabled={isPublishing || selectedPlatforms.length === 0}
                            className="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {isPublishing ? "Distributing..." : "Publish to Selected Platforms"}
                        </button>
                     </div>
                </div>
            )}
        </div>
    );
}
