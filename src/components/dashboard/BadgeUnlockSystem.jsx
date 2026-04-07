import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Lock } from "lucide-react";

// Badge definitions — unlocked based on completedCount and milestones
const BADGE_MILESTONES = [
  { id: "first_lesson",   icon: "🌱", title: "First Step",     description: "Complete your first lesson",    requirement: 1  },
  { id: "three_lessons",  icon: "📚", title: "Bookworm",       description: "Complete 3 lessons",            requirement: 3  },
  { id: "five_lessons",   icon: "⚡", title: "Power Learner",  description: "Complete 5 lessons",            requirement: 5  },
  { id: "ten_lessons",    icon: "🏆", title: "Champion",       description: "Complete 10 lessons",           requirement: 10 },
  { id: "first_course",   icon: "🎓", title: "Graduate",       description: "Complete your first course",    requirement: 1, type: "course" },
  { id: "three_courses",  icon: "🚀", title: "Scholar",        description: "Complete 3 courses",            requirement: 3, type: "course" },
];

export default function BadgeUnlockSystem({ achievements, completedLessons = 0, completedCourses = 0 }) {
  return (
    <Card className="p-5 border-border/60 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
          <Trophy size={14} className="text-amber-600" />
        </div>
        <h3 className="font-poppins font-semibold text-sm text-foreground">Badge Progress</h3>
      </div>

      <div className="space-y-2">
        {BADGE_MILESTONES.map(badge => {
          const count = badge.type === "course" ? completedCourses : completedLessons;
          const unlocked = count >= badge.requirement;
          const progress = Math.min(100, Math.round((count / badge.requirement) * 100));

          return (
            <div
              key={badge.id}
              className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                unlocked ? "bg-amber-50 border border-amber-200/60" : "bg-muted/40"
              }`}
            >
              <span className={`text-xl ${unlocked ? "" : "grayscale opacity-40"}`}>{badge.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className={`text-xs font-semibold ${unlocked ? "text-amber-700" : "text-muted-foreground"}`}>
                    {badge.title}
                  </p>
                  {unlocked && <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">UNLOCKED</span>}
                </div>
                {!unlocked && (
                  <div className="mt-1 h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary/40 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                )}
                <p className="text-[10px] text-muted-foreground mt-0.5">{badge.description}</p>
              </div>
              {!unlocked && <Lock size={11} className="text-muted-foreground/40 flex-shrink-0" />}
            </div>
          );
        })}
      </div>

      {achievements.length > 0 && (
        <Link to="/achievements">
          <Button variant="outline" size="sm" className="w-full mt-3 text-xs rounded-xl">
            View All Achievements
          </Button>
        </Link>
      )}
    </Card>
  );
}