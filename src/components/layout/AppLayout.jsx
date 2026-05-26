import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout() {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Public (unauthenticated) layout — clean, no sidebar
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border px-6 py-3 flex items-center gap-2 sticky top-0 z-50 shadow-sm">
          <span className="text-lg font-extrabold text-primary font-poppins">Silid</span>
          <span className="text-lg font-extrabold text-foreground font-poppins">LMS</span>
        </div>
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Outlet context={{ user: null }} />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>
        <TopBar user={user} />
        <main className="flex-1 p-6 md:p-8">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}