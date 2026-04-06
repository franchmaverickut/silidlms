import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { BookOpen, Trophy, TrendingUp, Star, ArrowRight, Megaphone, Pin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StatsCard from "@/components/dashboard/StatsCard";
import CourseCard from "@/components/courses/CourseCard";
import { format } from "date-fns";

export default function Dashboard() {
  const { user } = useOutletContext();
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [c, a, ann, ach] = await Promise.all([
        base44.entities.Course.filter({ status: "published" }, "-created_date", 6).catch(() => []),
        user ? base44.entities.Enrollment.filter({ student_id: user.id }, "-created_date", 10).catch(() => []) : [],
        base44.entities.Announcement.list("-created_date", 5).catch(() => []),
        user ? base44.entities.Achievement.filter({ student_id: user.id }, "-earned_date", 5).catch(() => []) : [],
      ]);
      setCourses(c);
      setEnrollments(a);
      setAnnouncements(ann);
      setAchievements(ach);
      setLoading(false);
    };
    if (user !== null) load();
  }, [user]);

  const role = user?.role || "student";
  const isStudent = role === "student";
  const inProgressEnrollments = enrollments.filter(e => e.status === "active" && e.progress_percent < 100);
  const completedEnrollments = enrollments.filter(e => e.status === "completed" || e.progress_percent === 100);

  const greet = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-orange-400 p-7 text-white shadow-lg shadow-primary/20">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-10 -right-2 w-28 h-28 bg-white/5 rounded-full" />
        <div className="relative z-10">
          <p className="text-orange-100 text-sm font-medium">{greet()},</p>
          <h1 className="font-poppins font-bold text-2xl md:text-3xl mt-0.5 mb-2">
            {user?.full_name?.split(" ")[0] || "Learner"} 👋
          </h1>
          <p className="text-orange-100 text-sm max-w-md">
            {isStudent
              ? `You have ${inProgressEnrollments.length} course${inProgressEnrollments.length !== 1 ? "s" : ""} in progress. Keep going!`
              : "Manage your classes and track student progress."}
          </p>
          {isStudent && (
            <Link to="/courses">
              <Button className="mt-4 bg-white text-primary hover:bg-orange-50 font-semibold text-sm rounded-xl">
                Start Learning <ArrowRight size={15} className="ml-1.5" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard icon={BookOpen} label="Enrolled Courses" value={enrollments.length} color="primary" />
        <StatsCard icon={TrendingUp} label="In Progress" value={inProgressEnrollments.length} color="secondary" trend="Keep it up!" />
        <StatsCard icon={Trophy} label="Completed" value={completedEnrollments.length} color="green" />
        <StatsCard icon={Star} label="Achievements" value={achievements.length} color="purple" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses section */}
        <div className="lg:col-span-2 space-y-4">
          {isStudent && inProgressEnrollments.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-poppins font-bold text-foreground text-lg">Continue Learning</h2>
                <Link to="/courses" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {inProgressEnrollments.slice(0, 3).map(enrollment => {
                  const course = courses.find(c => c.id === enrollment.course_id);
                  if (!course) return null;
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
                            <Progress value={enrollment.progress_percent || 0} className="h-1.5" />
                            <p className="text-xs text-primary font-medium mt-1">{enrollment.progress_percent || 0}% complete</p>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommended / Featured Courses */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-poppins font-bold text-foreground text-lg">
                {isStudent ? "Recommended for You" : "Published Courses"}
              </h2>
              <Link to="/courses" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            {courses.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">No courses yet. Start by creating one!</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses.slice(0, 4).map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Announcements */}
          <Card className="p-5 border-border/60 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Megaphone size={14} className="text-primary" />
              </div>
              <h3 className="font-poppins font-semibold text-sm text-foreground">Announcements</h3>
            </div>
            {announcements.length === 0 ? (
              <p className="text-muted-foreground text-xs text-center py-4">No announcements yet</p>
            ) : (
              <div className="space-y-3">
                {announcements.slice(0, 4).map(a => (
                  <div key={a.id} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start gap-2">
                      {a.is_pinned && <Pin size={11} className="text-primary mt-0.5 flex-shrink-0" />}
                      <div>
                        <p className="font-semibold text-xs text-foreground">{a.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{a.content}</p>
                        {a.published_date && (
                          <p className="text-xs text-muted-foreground/60 mt-1">
                            {format(new Date(a.published_date), "MMM d")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Recent Achievements */}
          {isStudent && (
            <Card className="p-5 border-border/60 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Trophy size={14} className="text-amber-600" />
                </div>
                <h3 className="font-poppins font-semibold text-sm text-foreground">Recent Badges</h3>
              </div>
              {achievements.length === 0 ? (
                <div className="text-center py-4">
                  <Trophy className="w-8 h-8 text-muted-foreground/20 mx-auto mb-2" />
                  <p className="text-muted-foreground text-xs">Complete lessons to earn badges!</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {achievements.slice(0, 6).map(ach => (
                    <div key={ach.id} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-muted/50 hover:bg-primary/5 transition-colors">
                      <span className="text-2xl">{ach.icon || "🏅"}</span>
                      <p className="text-xs text-center text-muted-foreground leading-tight line-clamp-2">{ach.title}</p>
                    </div>
                  ))}
                </div>
              )}
              {achievements.length > 0 && (
                <Link to="/achievements">
                  <Button variant="outline" size="sm" className="w-full mt-3 text-xs rounded-xl">
                    View All Achievements
                  </Button>
                </Link>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}