import { Link, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  LayoutDashboard, BookOpen, Users, Settings, GraduationCap,
  Trophy, Megaphone, ChevronRight, LogOut, Zap
} from "lucide-react";

const navItems = {
  student: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: BookOpen, label: "My Courses", path: "/courses" },
    { icon: Trophy, label: "Achievements", path: "/achievements" },
  ],
  teacher: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: BookOpen, label: "Courses", path: "/courses" },
    { icon: Users, label: "My Classes", path: "/teacher" },
    { icon: GraduationCap, label: "Submissions", path: "/submissions" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: BookOpen, label: "Courses", path: "/courses" },
    { icon: Users, label: "Users", path: "/admin" },
    { icon: Megaphone, label: "Announcements", path: "/announcements" },
    { icon: Settings, label: "Settings", path: "/admin" },
  ],
};

export default function Sidebar({ user }) {
  const location = useLocation();
  const role = user?.role || "student";
  const items = navItems[role] || navItems.student;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col z-40 shadow-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-sidebar-foreground font-poppins font-bold text-lg leading-none">Silid</span>
          <span className="text-primary font-poppins font-bold text-lg leading-none">LMS</span>
        </div>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-sidebar-accent">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-poppins font-bold text-sm">
            {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sidebar-foreground font-medium text-sm truncate">{user?.full_name || "User"}</p>
            <p className="text-sidebar-foreground/50 text-xs capitalize">{role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {items.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={label}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" size={18} />
              <span className="font-medium text-sm flex-1">{label}</span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <button
          onClick={() => base44.auth.logout("/")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-sidebar-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
}