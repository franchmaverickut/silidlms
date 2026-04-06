import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Users, BookOpen, CheckSquare, Clock, ArrowRight, Star, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatsCard from "@/components/dashboard/StatsCard";
import { format } from "date-fns";

export default function TeacherDashboard() {
  const { user } = useOutletContext();
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [c, e, s] = await Promise.all([
        base44.entities.Course.filter({ teacher_id: user?.id }),
        base44.entities.Enrollment.list("-created_date", 50),
        base44.entities.Submission.filter({ status: "pending" }, "-created_date", 20),
      ]);
      setCourses(c);
      const myCourseIds = new Set(c.map(co => co.id));
      setEnrollments(e.filter(en => myCourseIds.has(en.course_id)));
      setSubmissions(s.filter(sub => myCourseIds.has(sub.course_id)));
      setLoading(false);
    };
    if (user) load();
  }, [user]);

  const totalStudents = new Set(enrollments.map(e => e.student_id)).size;
  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((sum, e) => sum + (e.progress_percent || 0), 0) / enrollments.length)
    : 0;

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-7">
      <div>
        <h1 className="font-poppins font-bold text-2xl text-foreground">Teacher Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Monitor your classes and student progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard icon={BookOpen} label="My Courses" value={courses.length} color="primary" />
        <StatsCard icon={Users} label="Total Students" value={totalStudents} color="secondary" />
        <StatsCard icon={CheckSquare} label="Pending Reviews" value={submissions.length} color="purple" />
        <StatsCard icon={Star} label="Avg. Progress" value={`${avgProgress}%`} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-poppins font-bold text-lg">My Courses</h2>
            <Link to="/courses">
              <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1.5">
                View All <ArrowRight size={13} />
              </Button>
            </Link>
          </div>

          {courses.length === 0 ? (
            <Card className="p-8 text-center border-dashed">
              <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">You haven't created any courses yet.</p>
              <Link to="/courses/new">
                <Button size="sm" className="mt-3 bg-primary text-white rounded-xl">Create Course</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-3">
              {courses.map(course => {
                const courseEnrollments = enrollments.filter(e => e.course_id === course.id);
                const courseAvg = courseEnrollments.length
                  ? Math.round(courseEnrollments.reduce((s, e) => s + (e.progress_percent || 0), 0) / courseEnrollments.length)
                  : 0;

                return (
                  <Card key={course.id} className="p-4 border-border/60 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link to={`/courses/${course.id}`}>
                            <h3 className="font-poppins font-semibold text-sm hover:text-primary transition-colors">{course.title}</h3>
                          </Link>
                          <Badge variant="outline" className={`text-xs ${course.status === "published" ? "border-secondary text-secondary" : "border-muted-foreground text-muted-foreground"}`}>
                            {course.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{course.skill_area} • {courseEnrollments.length} students enrolled</p>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Class avg. progress</span>
                            <span className="text-primary font-medium">{courseAvg}%</span>
                          </div>
                          <Progress value={courseAvg} className="h-1.5" />
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Link to={`/courses/${course.id}/builder`}>
                          <Button size="sm" variant="outline" className="rounded-xl text-xs">Edit</Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Pending Submissions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-poppins font-bold text-lg">Pending Reviews</h2>
          </div>
          <Card className="p-4 border-border/60 shadow-sm">
            {submissions.length === 0 ? (
              <div className="text-center py-6">
                <CheckSquare className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-muted-foreground text-xs">No pending submissions</p>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.slice(0, 8).map(sub => (
                  <div key={sub.id} className="flex items-start gap-3 pb-3 border-b border-border/40 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                      {sub.student_name?.charAt(0) || "S"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs text-foreground truncate">{sub.student_name || "Student"}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{sub.text_response?.substring(0, 60) || "File submitted"}...</p>
                      {sub.submitted_date && (
                        <p className="text-xs text-muted-foreground/60 mt-1">{format(new Date(sub.submitted_date), "MMM d")}</p>
                      )}
                    </div>
                    <Link to={`/submissions`}>
                      <button className="text-primary hover:text-primary/70 flex-shrink-0">
                        <ExternalLink size={14} />
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Student Progress Overview */}
          {enrollments.length > 0 && (
            <Card className="p-4 border-border/60 shadow-sm mt-4">
              <h3 className="font-poppins font-semibold text-sm mb-3">Student Progress</h3>
              <div className="space-y-2.5">
                {enrollments.slice(0, 6).map(e => (
                  <div key={e.id} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {e.student_name?.charAt(0) || "S"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{e.student_name || "Student"}</p>
                      <Progress value={e.progress_percent || 0} className="h-1 mt-1" />
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{e.progress_percent || 0}%</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}