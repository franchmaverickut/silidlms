import { Link, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  LayoutDashboard, BookOpen, Users, Settings, GraduationCap,
  Trophy, Megaphone, ChevronRight, LogOut, Wrench, PanelLeftClose, PanelLeftOpen
} from "lucide-react";

const navItems = {
  student: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: BookOpen, label: "My Courses", path: "/courses" },
    { icon: Wrench, label: "Maker Lessons", path: "/maker" },
    { icon: Trophy, label: "Achievements", path: "/achievements" },
  ],
  teacher: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: BookOpen, label: "Courses", path: "/courses" },
    { icon: Wrench, label: "Maker Lessons", path: "/maker" },
    { icon: Users, label: "My Classes", path: "/teacher" },
    { icon: GraduationCap, label: "Submissions", path: "/submissions" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: BookOpen, label: "Courses", path: "/courses" },
    { icon: Wrench, label: "Maker Lessons", path: "/maker" },
    { icon: Users, label: "Users", path: "/admin" },
    { icon: Megaphone, label: "Announcements", path: "/announcements" },
    { icon: Settings, label: "Settings", path: "/admin" },
  ],
};

export default function Sidebar({ user, collapsed, onToggle }) {
  const location = useLocation();
  const role = user?.role || "student";
  const items = navItems[role] || navItems.student;

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-sidebar flex flex-col z-40 shadow-2xl transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      {/* Logo + toggle */}
      <div className={`flex items-center border-b border-sidebar-border ${collapsed ? "justify-center px-2 py-5" : "px-5 py-5 justify-between"}`}>
        {!collapsed && (
          <img src="https://media.base44.com/images/public/69d386ad9523e2ce04536574/91c0dc902_IMG_3183.png" alt="SilidLMS" className="h-10 w-auto" />
        )}
        <button
          onClick={onToggle}
          className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors p-1 rounded-lg hover:bg-sidebar-accent"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-sidebar-accent">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-poppins font-bold text-sm flex-shrink-0">
              {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sidebar-foreground font-medium text-sm truncate">{user?.full_name || "User"}</p>
              <p className="text-sidebar-foreground/50 text-xs capitalize">{role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed avatar */}
      {collapsed && (
        <div className="flex justify-center py-4 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-poppins font-bold text-sm">
            {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {items.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={label}
              to={path}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${collapsed ? "justify-center" : ""} ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <Icon className="flex-shrink-0" size={18} />
              {!collapsed && <span className="font-medium text-sm flex-1">{label}</span>}
              {!collapsed && isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-sidebar-border">
        <button
          onClick={() => base44.auth.logout("/")}
          title={collapsed ? "Log Out" : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-sidebar-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-all duration-200 ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={18} />
          {!collapsed && <span className="font-medium text-sm">Log Out</span>}
        </button>
      </div>
    </aside>
  );
}