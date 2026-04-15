'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BarChart3, Video, Send, Clock, LayoutDashboard } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Market Analyser', href: '/dashboard/market', icon: BarChart3 },
  { name: 'Ad Studio', href: '/dashboard/studio', icon: Video },
  { name: 'Publish Hub', href: '/dashboard/publish', icon: Send },
  { name: 'History', href: '/dashboard/history', icon: Clock },
];

export function SidebarProgress() {
    return (
        <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
            <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium">Credits Used</p>
                <span className="text-sm text-muted-foreground">75%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: '75%' }} />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Upgrade for unlimited generations.</p>
        </div>
    )
}

export function SidebarItem({ item, isActive }: { item: any, isActive: boolean }) {
    return (
        <li>
            <Link
            href={item.href}
            className={cn(
                isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-all duration-200'
            )}
            >
            <item.icon
                className={cn(
                isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
                'h-5 w-5 shrink-0 transition-colors duration-200'
                )}
                aria-hidden="true"
            />
            {item.name}
            </Link>
        </li>
    );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex sticky top-0 h-screen w-64 flex-col border-r bg-background/50 backdrop-blur-xl">
      <div className="flex h-16 shrink-0 items-center px-6">
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-xl font-bold tracking-tight text-transparent">
          AdGen Studio
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-y-7 overflow-y-auto px-4 py-4">
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (pathname?.startsWith(item.href + '/') && item.href !== '/dashboard');
              return <SidebarItem key={item.name} item={item} isActive={isActive} />;
            })}
          </ul>
        </nav>
        
        <div className="mt-auto">
             <SidebarProgress />
        </div>
      </div>
    </div>
  );
}
