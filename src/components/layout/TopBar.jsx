import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function TopBar({ user }) {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-6 md:px-8 py-4 flex items-center gap-4">
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, lessons..."
            className="pl-9 bg-muted/50 border-transparent focus:border-primary/30 focus:bg-white h-9 text-sm"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-poppins font-bold text-sm">
            {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="hidden md:block">
            <p className="font-medium text-sm text-foreground leading-none">{user?.full_name || "User"}</p>
            <p className="text-xs text-muted-foreground capitalize mt-0.5">{user?.role || "student"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}