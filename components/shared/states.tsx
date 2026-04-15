import { Loader2 } from "lucide-react";

export function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium text-muted-foreground animate-pulse">{text}</p>
        </div>
    );
}

export function EmptyState({ 
    icon: Icon, 
    title, 
    description, 
    action 
}: { 
    icon: any, 
    title: string, 
    description: string, 
    action?: React.ReactNode 
}) {
    return (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50 zoom-in-95 duration-500">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
            {action && action}
        </div>
    );
}
