import { useState, useEffect } from "react";
import { useParams, useOutletContext, Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  ArrowLeft, BookOpen, Clock, Users, CheckCircle, Lock, Play,
  FileText, Zap, ChevronDown, ChevronRight, Plus, Edit, Trash2, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const lessonTypeIcon = { reading: FileText, video: Play, quiz: Zap, activity: BookOpen, project: CheckCircle };
const lessonTypeColor = { reading: "text-blue-500", video: "text-purple-500", quiz: "text-orange-500", activity: "text-green-500", project: "text-teal-500" };

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [enrollment, setEnrollment] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [loading, setLoading] = useState(true);

  const role = user?.role || "student";
  const canManage = role === "teacher" || role === "admin";

  useEffect(() => {
    const load = async () => {
      const [c, m, l] = await Promise.all([
        base44.entities.Course.filter({ id }),
        base44.entities.Module.filter({ course_id: id }, "order"),
        base44.entities.Lesson.filter({ course_id: id }, "order"),
      ]);
      const cData = c[0];
      setCourse(cData);
      setModules(m);
      setLessons(l);
      // expand all modules by default
      const exp = {};
      m.forEach(mod => { exp[mod.id] = true; });
      setExpandedModules(exp);

      if (user) {
        const e = await base44.entities.Enrollment.filter({ course_id: id, student_id: user.id });
        if (e[0]) setEnrollment(e[0]);
      }
      setLoading(false);
    };
    if (user !== null) load();
  }, [id, user]);

  const handleEnroll = async () => {
    const e = await base44.entities.Enrollment.create({
      course_id: id,
      student_id: user.id,
      student_name: user.full_name,
      student_email: user.email,
      progress_percent: 0,
      status: "active",
      enrolled_date: new Date().toISOString().split("T")[0],
      completed_lessons: [],
    });
    setEnrollment(e);
    await base44.entities.Course.update(id, { enrolled_count: (course.enrolled_count || 0) + 1 });
    toast({ title: "Enrolled! 🎉", description: `You've joined "${course.title}"` });
  };

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (!course) return (
    <div className="text-center py-24">
      <p className="text-muted-foreground">Course not found.</p>
    </div>
  );

  const completedLessonIds = enrollment?.completed_lessons || [];
  const totalLessons = lessons.length;
  const completedCount = lessons.filter(l => completedLessonIds.includes(l.id)).length;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
        <ArrowLeft size={16} /> Back to Courses
      </button>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-foreground/90 to-foreground/70 text-white p-7 shadow-xl">
        <div className="absolute inset-0">
          {course.thumbnail_url && (
            <img src={course.thumbnail_url} alt="" className="w-full h-full object-cover opacity-20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">{course.skill_area}</span>
            {course.difficulty && (
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">{course.difficulty}</span>
            )}
          </div>
          <h1 className="font-poppins font-bold text-2xl md:text-3xl leading-tight mb-2">{course.title}</h1>
          {course.description && <p className="text-white/70 text-sm max-w-2xl">{course.description}</p>}

          <div className="flex flex-wrap gap-5 mt-4 text-sm text-white/80">
            {course.duration_hours && (
              <span className="flex items-center gap-1.5"><Clock size={14} />{course.duration_hours} hours</span>
            )}
            <span className="flex items-center gap-1.5"><BookOpen size={14} />{totalLessons} lessons</span>
            {course.enrolled_count > 0 && (
              <span className="flex items-center gap-1.5"><Users size={14} />{course.enrolled_count} enrolled</span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            {!canManage && !enrollment && (
              <Button onClick={handleEnroll} className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg gap-2">
                Start Learning
              </Button>
            )}
            {!canManage && enrollment && (
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-xl px-4 py-2">
                  <p className="text-xs text-white/70">Progress</p>
                  <p className="font-poppins font-bold text-lg">{enrollment.progress_percent || 0}%</p>
                </div>
                <Link to={`/lessons/${lessons[0]?.id}`}>
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2">
                    {completedCount > 0 ? "Continue" : "Start"} <ChevronRight size={15} />
                  </Button>
                </Link>
              </div>
            )}
            {canManage && (
              <div className="flex gap-2 flex-wrap">
                <Link to={`/courses/${id}/edit`}>
                  <Button className="bg-white/20 hover:bg-white/30 text-white rounded-xl gap-2 border border-white/20">
                    <Edit size={15} /> Edit Course
                  </Button>
                </Link>
                <Button
                  className="bg-white/20 hover:bg-white/30 text-white rounded-xl gap-2 border border-white/20"
                  onClick={() => {
                    const url = `${window.location.origin}/share/course/${id}`;
                    navigator.clipboard.writeText(url);
                    toast({ title: "Share link copied!", description: url });
                  }}
                >
                  <Share2 size={15} /> Copy Share Link
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modules & Lessons */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-poppins font-bold text-lg text-foreground">Course Content</h2>
            {canManage && (
              <Link to={`/courses/${id}/builder`}>
                <Button size="sm" className="bg-primary text-white rounded-xl gap-2 text-xs">
                  <Plus size={13} /> Add Module
                </Button>
              </Link>
            )}
          </div>

          {modules.length === 0 ? (
            <Card className="p-8 text-center border-dashed">
              <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">No modules yet.</p>
              {canManage && (
                <Link to={`/courses/${id}/builder`}>
                  <Button size="sm" className="mt-3 bg-primary text-white rounded-xl">Start Building</Button>
                </Link>
              )}
            </Card>
          ) : (
            modules.map((mod, modIdx) => {
              const modLessons = lessons.filter(l => l.module_id === mod.id);
              const isExpanded = expandedModules[mod.id];
              const modCompleted = modLessons.filter(l => completedLessonIds.includes(l.id)).length;

              return (
                <Card key={mod.id} className="overflow-hidden border-border/60 shadow-sm">
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-poppins font-bold text-xs flex items-center justify-center">
                        {modIdx + 1}
                      </div>
                      <div>
                        <p className="font-poppins font-semibold text-sm text-foreground">{mod.title}</p>
                        <p className="text-xs text-muted-foreground">{modLessons.length} lessons{enrollment ? ` • ${modCompleted}/${modLessons.length} done` : ""}</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
                  </button>

                  {isExpanded && modLessons.length > 0 && (
                    <div className="border-t border-border/50">
                      {modLessons.map((lesson, lessonIdx) => {
                        const Icon = lessonTypeIcon[lesson.type] || BookOpen;
                        const colorClass = lessonTypeColor[lesson.type] || "text-muted-foreground";
                        const isDone = completedLessonIds.includes(lesson.id);
                        const isLocked = !enrollment && !canManage;

                        return (
                          <div key={lesson.id} className={`flex items-center gap-3 px-4 py-3 border-b border-border/30 last:border-0 ${!isLocked ? "hover:bg-muted/20 cursor-pointer" : "opacity-60"} transition-colors`}>
                            <div className={`w-5 h-5 flex-shrink-0 ${colorClass}`}>
                              {isDone ? <CheckCircle className="text-secondary w-5 h-5" /> : isLocked ? <Lock size={16} className="text-muted-foreground" /> : <Icon size={16} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              {!isLocked ? (
                                <Link to={`/lessons/${lesson.id}`} className="font-medium text-sm text-foreground hover:text-primary transition-colors">
                                  {lesson.title}
                                </Link>
                              ) : (
                                <span className="font-medium text-sm text-foreground">{lesson.title}</span>
                              )}
                              <span className="text-xs text-muted-foreground capitalize ml-2">{lesson.type}</span>
                            </div>
                            {lesson.duration_minutes && (
                              <span className="text-xs text-muted-foreground flex-shrink-0">{lesson.duration_minutes}m</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>
              );
            })
          )}
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          {enrollment && (
            <Card className="p-5 border-border/60 shadow-sm">
              <h3 className="font-poppins font-semibold text-sm mb-3">Your Progress</h3>
              <div className="text-center mb-3">
                <span className="text-3xl font-poppins font-bold text-primary">{enrollment.progress_percent || 0}%</span>
              </div>
              <Progress value={enrollment.progress_percent || 0} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground text-center">{completedCount} of {totalLessons} lessons completed</p>
            </Card>
          )}

          {course.learning_objectives?.length > 0 && (
            <Card className="p-5 border-border/60 shadow-sm">
              <h3 className="font-poppins font-semibold text-sm mb-3">What You'll Learn</h3>
              <ul className="space-y-2">
                {course.learning_objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle size={13} className="text-secondary mt-0.5 flex-shrink-0" /> {obj}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {course.materials_required?.length > 0 && (
            <Card className="p-5 border-border/60 shadow-sm">
              <h3 className="font-poppins font-semibold text-sm mb-3">Materials Needed</h3>
              <ul className="space-y-1.5">
                {course.materials_required.map((mat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> {mat}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {course.grade_levels?.length > 0 && (
            <Card className="p-5 border-border/60 shadow-sm">
              <h3 className="font-poppins font-semibold text-sm mb-3">Grade Levels</h3>
              <div className="flex flex-wrap gap-1.5">
                {course.grade_levels.map(g => (
                  <span key={g} className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{g}</span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}