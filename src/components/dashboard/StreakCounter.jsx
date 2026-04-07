import { Flame } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function StreakCounter({ streak }) {
  const flames = streak >= 7 ? 3 : streak >= 3 ? 2 : streak >= 1 ? 1 : 0;

  return (
    <Card className="p-5 border-border/60 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${
          streak >= 7 ? "bg-red-100" : streak >= 3 ? "bg-orange-100" : streak >= 1 ? "bg-amber-100" : "bg-muted"
        }`}>
          {streak > 0 ? "🔥" : "💤"}
        </div>
        <div className="flex-1">
          <p className="font-poppins font-bold text-2xl text-foreground leading-none">
            {streak} <span className="text-sm font-normal text-muted-foreground">day{streak !== 1 ? "s" : ""}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Learning Streak</p>
        </div>
        <div className="flex gap-0.5">
          {[1, 2, 3].map(i => (
            <Flame
              key={i}
              size={16}
              className={i <= flames ? "text-orange-500" : "text-muted-foreground/20"}
              fill={i <= flames ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-1.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-all ${
              i < streak % 7 || streak >= 7
                ? streak >= 7 ? "bg-red-400" : streak >= 3 ? "bg-orange-400" : "bg-amber-400"
                : "bg-muted"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-1.5">
        {streak === 0
          ? "Log in daily to build your streak!"
          : streak >= 7
          ? "You're on fire! 🔥 Keep it up!"
          : `${7 - (streak % 7)} more days to reach a 7-day streak!`}
      </p>
    </Card>
  );
}