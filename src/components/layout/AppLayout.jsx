import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout() {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

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