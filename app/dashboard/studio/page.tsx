'use client';

import { PageHeader } from "@/components/shared/page-header";
import { useProject } from "@/hooks/useProject";
import { useState } from "react";
import { LoadingSpinner } from "@/components/shared/states";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";

export default function AdStudioPage() {
    const { createProject, isLoading, error } = useProject();
    const router = useRouter();
    const setProjectId = useAppStore(s => s.setCurrentProjectId);

    const [form, setForm] = useState({
        niche: "",
        targetAudience: "",
        tone: "Viral",
        platforms: ["tiktok"]
    });

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await createProject(form);
            if (res?.projectId) {
                setProjectId(res.projectId);
                // In a real app we might route to a tracking page 
                router.push('/dashboard/publish');
            }
        } catch(e) {}
    };

    return (
        <div className="h-full">
            <PageHeader 
                title="Ad Studio" 
                description="Generate highly converting video ads for your product automagically."
            />

            <div className="max-w-2xl mx-auto mt-8 animate-in zoom-in-95 duration-500">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <form onSubmit={handleCreate} className="space-y-6">
                        <div className="space-y-2">
                             <label className="text-sm font-medium">Product / Niche</label>
                             <input 
                                value={form.niche} 
                                onChange={e => setForm({...form, niche: e.target.value})}
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                             />
                        </div>

                        <div className="space-y-2">
                             <label className="text-sm font-medium">Target Audience</label>
                             <input 
                                value={form.targetAudience} 
                                onChange={e => setForm({...form, targetAudience: e.target.value})}
                                required
                                placeholder="E.g., Gen Z gamers, Work-from-home moms"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                             />
                        </div>
                        
                        <div className="space-y-2">
                             <label className="text-sm font-medium">Tone & Voice</label>
                             <select
                                value={form.tone}
                                onChange={e => setForm({...form, tone: e.target.value})}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                             >
                                 <option value="Viral">Viral & Energetic</option>
                                 <option value="Professional">Professional</option>
                                 <option value="Humorous">Humorous</option>
                                 <option value="Educational">Educational / Storytime</option>
                             </select>
                        </div>

                         <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-2 text-sm font-medium text-white shadow transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            {isLoading ? "Summoning AI Magic..." : "Generate Magic Link / Script"}
                        </button>
                    </form>
                </div>
            </div>
            {isLoading && <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"><LoadingSpinner text="Generating Script & Video Assets..." /></div>}
        </div>
    )
}
