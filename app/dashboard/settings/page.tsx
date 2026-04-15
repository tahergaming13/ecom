import { PageHeader } from "@/components/shared/page-header";

export default function SettingsPage() {
    return (
        <div className="h-full">
            <PageHeader 
                title="Settings" 
                description="Manage your account preferences and integrations."
            />
            <div className="rounded-xl border bg-card p-6 shadow-sm mt-8 max-w-2xl animate-in fade-in-50 duration-700">
                <h3 className="text-lg font-semibold mb-6">Integrations</h3>
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-border/50 pb-6">
                        <div>
                            <p className="font-medium text-foreground">TikTok Accounts</p>
                            <p className="text-sm text-muted-foreground mt-1">Connect multiple TikTok business accounts.</p>
                        </div>
                        <button className="text-sm font-medium bg-muted px-4 py-2 text-foreground rounded-md hover:bg-muted/80 transition-colors">Connect</button>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/50 pb-6">
                        <div>
                            <p className="font-medium text-foreground">Instagram Graph API</p>
                            <p className="text-sm text-muted-foreground mt-1">Link your Facebook Page for Reels publishing.</p>
                        </div>
                        <button className="text-sm font-medium bg-muted px-4 py-2 text-foreground rounded-md hover:bg-muted/80 transition-colors">Connect</button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-foreground">YouTube Data API</p>
                            <p className="text-sm text-muted-foreground mt-1">Authenticate your Google Account to push Shorts.</p>
                        </div>
                        <button className="text-sm font-medium bg-muted px-4 py-2 text-foreground rounded-md hover:bg-muted/80 transition-colors">Connect</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
