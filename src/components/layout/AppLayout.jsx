import { Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout() {
  // Use the single source of truth for user/role from AuthContext
  const { user } = useAuth();

  console.log('ROLE:', user?.role);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopBar user={user} />
        <main className="flex-1 p-6 md:p-8">
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
}