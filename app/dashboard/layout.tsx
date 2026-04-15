import { Sidebar } from "@/components/shared/sidebar";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full relative min-h-screen flex">
            <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80]">
                <Sidebar />
            </div>
            <main className="md:pl-64 h-full flex-1 min-h-screen">
                <div className="sticky top-0 z-50 flex w-full items-center justify-end px-4 py-4 bg-background/50 backdrop-blur-md md:px-8 border-b">
                    <UserButton afterSignOutUrl="/" />
                </div>
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
