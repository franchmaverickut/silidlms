import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

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