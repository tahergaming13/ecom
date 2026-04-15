import { cn } from "@/lib/utils";
import { CheckCircle2, Play, Camera, Film } from "lucide-react";

export function StepBadge({ step, currentStep, label }: { step: number; currentStep: number; label: string }) {
    const isCompleted = currentStep > step;
    const isCurrent = currentStep === step;

    return (
        <div className="flex items-center gap-2">
            <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                isCompleted ? "border-primary bg-primary text-primary-foreground" : 
                isCurrent ? "border-primary text-primary" : "border-muted-foreground text-muted-foreground"
            )}>
                {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <span className="font-semibold">{step}</span>}
            </div>
            <span className={cn(
                "font-medium transition-colors duration-300",
                isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"
            )}>
                {label}
            </span>
        </div>
    );
}

export function PlatformBadge({ platform }: { platform: string }) {
    const p = platform.toLowerCase();
    
    if (p === 'tiktok') {
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-black shadow-sm"><Play className="h-3 w-3" /> TikTok</span>
    }
    if (p === 'instagram' || p === 'instagram reels') {
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-sm"><Camera className="h-3 w-3" /> Reels</span>
    }
    if (p === 'youtube' || p === 'youtube shorts') {
        return <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-sm"><Film className="h-3 w-3" /> Shorts</span>
    }
    
    return <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">{platform}</span>
}

export function InsightBadge({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'positive' | 'warning' }) {
    return (
        <span className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm",
            variant === 'default' && "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
            variant === 'positive' && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
            variant === 'warning' && "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
        )}>
            {children}
        </span>
    );
}
