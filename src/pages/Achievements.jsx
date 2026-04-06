import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Trophy, Award, Star, Medal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

const typeConfig = {
  badge: { icon: Medal, color: "bg-amber-100 text-amber-600", label: "Badge" },
  certificate: { icon: Award, color: "bg-teal-100 text-teal-600", label: "Certificate" },
  milestone: { icon: Star, color: "bg-purple-100 text-purple-600", label: "Milestone" },
};

export default function Achievements() {
  const { user } = useOutletContext();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      base44.entities.Achievement.filter({ student_id: user.id }, "-earned_date").then(data => {
        setAchievements(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 p-7 text-white shadow-lg">
        <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/10 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-7 h-7" />
            <h1 className="font-poppins font-bold text-2xl">My Achievements</h1>
          </div>
          <p className="text-orange-100 text-sm">Badges, certificates, and milestones you've earned</p>
          <div className="flex gap-4 mt-4">
            <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
              <p className="font-poppins font-bold text-xl">{achievements.length}</p>
              <p className="text-xs text-orange-100">Total</p>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
              <p className="font-poppins font-bold text-xl">{achievements.filter(a => a.type === "certificate").length}</p>
              <p className="text-xs text-orange-100">Certificates</p>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
              <p className="font-poppins font-bold text-xl">{achievements.filter(a => a.type === "badge").length}</p>
              <p className="text-xs text-orange-100">Badges</p>
            </div>
          </div>
        </div>
      </div>

      {achievements.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <Trophy className="w-14 h-14 text-muted-foreground/20 mx-auto mb-3" />
          <h3 className="font-poppins font-semibold text-foreground">No achievements yet</h3>
          <p className="text-muted-foreground text-sm mt-1">Complete lessons and courses to earn badges and certificates!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {achievements.map(ach => {
            const config = typeConfig[ach.type] || typeConfig.badge;
            const Icon = config.icon;
            return (
              <Card key={ach.id} className="p-5 border-border/60 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className={`w-16 h-16 rounded-2xl ${config.color} flex items-center justify-center mx-auto mb-3`}>
                  {ach.icon ? (
                    <span className="text-3xl">{ach.icon}</span>
                  ) : (
                    <Icon size={28} />
                  )}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${config.color}`}>{config.label}</span>
                <h3 className="font-poppins font-bold text-foreground mt-2 text-sm">{ach.title}</h3>
                {ach.description && <p className="text-xs text-muted-foreground mt-1">{ach.description}</p>}
                {ach.course_title && (
                  <p className="text-xs text-primary mt-1.5 font-medium">{ach.course_title}</p>
                )}
                {ach.earned_date && (
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    Earned {format(new Date(ach.earned_date), "MMM d, yyyy")}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}