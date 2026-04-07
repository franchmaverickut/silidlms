import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { BookOpen, ArrowRight } from "lucide-react";

function getProgressColor(pct) {
  if (pct >= 80) return { bar: "bg-green-500", text: "text-green-600", label: "Almost there!" };
  if (pct >= 50) return { bar: "bg-secondary", text: "text-secondary", label: "Good progress!" };
  if (pct >= 25) return { bar: "bg-amber-400", text: "text-amber-600", label: "Keep going!" };
  return { bar: "bg-primary", text: "text-primary", label: "Just started" };
}

export default function GamifiedProgress({ enrollments, courses }) {
  if (!enrollments.length) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-poppins font-bold text-foreground text-lg">Continue Learning</h2>
        <Link to="/courses" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="space-y-3">
        {enrollments.slice(0, 3).map(enrollment => {
          const course = courses.find(c => c.id === enrollment.course_id);
          if (!course) return null;
          const pct = enrollment.progress_percent || 0;
          const { bar, text, label } = getProgressColor(pct);
          return (
            <Link key={enrollment.id} to={`/courses/${course.id}`}>
              <Card className="p-4 border-border/60 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="text-primary" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-poppins font-semibold text-sm text-foreground truncate">{course.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{course.skill_area}</p>
                  <div className="mt-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${bar}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs font-semibold ${text}`}>{pct}% complete</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  </div>
                </div>
                <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}