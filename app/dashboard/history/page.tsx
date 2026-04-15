'use client';

import { PageHeader } from "@/components/shared/page-header";
import { useEffect, useState } from "react";
import { LoadingSpinner, EmptyState } from "@/components/shared/states";
import { PlatformBadge } from "@/components/shared/badges";
import { Clock } from "lucide-react";

export default function HistoryPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/history')
            .then(res => res.json())
            .then(data => {
                if(!data.error) setProjects(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="h-full">
            <PageHeader 
                title="Generation History" 
                description="View past projects and their publishing status."
            />
            
            {loading ? <LoadingSpinner /> : 
                projects.length === 0 ? (
                    <EmptyState icon={Clock} title="No History" description="Your generated ads will appear here." />
                ) : (
                    <div className="grid gap-4 mt-8 animate-in slide-in-from-bottom-6 duration-700">
                        {projects.map((p: any) => (
                            <div key={p.id} className="rounded-xl border bg-card p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{p.niche}</h3>
                                    <p className="text-sm text-muted-foreground">Generated on {new Date(p.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">{p.status}</span>
                                    {p.publishLogs?.map((log: any) => (
                                        <PlatformBadge key={log.id} platform={log.platform} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
