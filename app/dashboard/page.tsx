import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/states";
import { Video } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="h-full">
            <PageHeader 
                title="Welcome back" 
                description="Manage your generated ads and market analyses here."
            />
            {/* Standard Dashboard view showing stats placeholder or empty state */}
            <div className="mt-8">
                <EmptyState
                    icon={Video}
                    title="No projects yet"
                    description="Get started by analyzing a market or creating your first video ad."
                    action={
                        <Link href="/dashboard/studio" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4">
                            Go to Ad Studio
                        </Link>
                    }
                />
            </div>
        </div>
    )
}
