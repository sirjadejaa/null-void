import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/admin/sidebar";
import { AuthProvider } from "@/components/admin/auth-provider";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Get initial of the admin
  const initial = session.user?.name ? session.user.name.charAt(0).toUpperCase() : "A";

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-sm font-semibold">{session.user?.name}</span>
              <span className="text-xs text-muted-foreground">{session.user?.email}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              {initial}
            </div>
          </div>
        </header>
        <AuthProvider>{children}</AuthProvider>
      </main>
    </div>
  );
}
