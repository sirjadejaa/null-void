"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, Star, Settings, Package, Grid } from "lucide-react";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Services", href: "/admin/services", icon: Grid },
  { name: "Packages", href: "/admin/packages", icon: Package },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col fixed inset-y-0 z-10">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <span className="font-heading font-bold text-lg text-primary">NullVoid Admin</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive 
                  ? "bg-primary text-primary-foreground font-semibold" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full py-2 rounded-xl bg-destructive/10 text-destructive font-medium hover:bg-destructive/20 transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
