import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  ArrowLeft, BookOpen, Clock, Users, CheckCircle,
  Play, FileText, Zap, ChevronDown, ChevronRight, Layers
} from "lucide-react";

const lessonTypeIcon = { reading: FileText, video: Play, quiz: Zap, activity: BookOpen, project: CheckCircle };
const lessonTypeColor = { reading: "text-blue-500", video: "text-purple-500", quiz: "text-orange-500", activity: "text-green-500", project: "text-teal-500" };

function ModuleAccordion({ module, modIdx, lessons }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-xl border border-border/60 shadow-sm overflow-hidden bg-card">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-poppins font-bold text-xs flex items-center justify-center flex-shrink-0">
            {modIdx + 1}
          </div>
          <div>
            <p className="font-poppins font-semibold text-sm text-foreground">{module.title}</p>
            <p className="text-xs text-muted-foreground">{lessons.length} lesson{lessons.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        {open
          ? <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />
          : <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
        }
      </button>

      {open && lessons.length > 0 && (
        <div className="border-t border-border/50">
          {lessons.map((lesson) => {
            const Icon = lessonTypeIcon[lesson.type] || BookOpen;
            const colorClass = lessonTypeColor[lesson.type] || "text-muted-foreground";
            return (
              <a
                key={lesson.id}
                href={`/share/lesson/${lesson.id}`}
                className="flex items-center gap-3 px-4 py-3 border-b border-border/30 last:border-0 hover:bg-muted/20 transition-colors"
              >
                <div className={`w-5 h-5 flex-shrink-0 ${colorClass}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{lesson.title}</p>
                  <span className="text-xs text-muted-foreground capitalize">{lesson.type}</span>
                </div>
                {lesson.duration_minutes && (
                  <span className="text-xs text-muted-foreground flex-shrink-0">{lesson.duration_minutes}m</span>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CourseSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="rounded-2xl bg-muted h-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <div className="h-5 w-40 bg-muted rounded" />
            {[1, 2, 3].map(i => <div key={i} className="rounded-xl border border-border/40 h-16 bg-muted/40" />)}
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-border/40 h-32 bg-muted/40" />
            <div className="rounded-xl border border-border/40 h-24 bg-muted/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PublicCourseViewer() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id || id === ':id') { setNotFound(true); setCourseLoading(false); setContentLoading(false); return; }

    // Load course metadata first — renders the hero immediately
    base44.entities.Course.filter({ id, status: "published" })
      .then(courses => {
        if (!courses[0]) { setNotFound(true); setCourseLoading(false); setContentLoading(false); return; }
        setCourse(courses[0]);
        setCourseLoading(false);

        // Then load modules + lessons in parallel
        return Promise.all([
          base44.entities.Module.filter({ course_id: id }, "order"),
          base44.entities.Lesson.filter({ course_id: id }, "order"),
        ]);
      })
      .then(results => {
        if (!results) return;
        const [mods, lsns] = results;
        setModules(mods);
        // Strip heavy fields — only keep what the overview needs
        setLessons(lsns.map(({ id, title, type, duration_minutes, module_id, order, is_published }) =>
          ({ id, title, type, duration_minutes, module_id, order, is_published })
        ));
      })
      .catch(() => setNotFound(true))
      .finally(() => setContentLoading(false));
  }, [id]);

  const totalLessons = useMemo(() => lessons.length, [lessons]);

  if (courseLoading) return <CourseSkeleton />;

  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground text-sm">Course not found or not published.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Back */}
        <Link to="/share/courses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors">
          <ArrowLeft size={16} /> Back to Courses
        </Link>

        {/* Hero card — dark gradient matching LMS style */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-foreground/90 to-foreground/70 text-white p-7 shadow-xl">
          <div className="absolute inset-0">
            {course.thumbnail_url && (
              <img src={course.thumbnail_url} alt="" className="w-full h-full object-cover opacity-20" loading="lazy" />
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
            {course.description && (
              <p className="text-white/70 text-sm max-w-2xl leading-relaxed">{course.description}</p>
            )}
            <div className="flex flex-wrap gap-5 mt-4 text-sm text-white/80">
              {course.duration_hours && (
                <span className="flex items-center gap-1.5"><Clock size={14} />{course.duration_hours} hours</span>
              )}
              <span className="flex items-center gap-1.5"><Layers size={14} />{modules.length} modules</span>
              <span className="flex items-center gap-1.5"><BookOpen size={14} />{totalLessons} lessons</span>
              {course.enrolled_count > 0 && (
                <span className="flex items-center gap-1.5"><Users size={14} />{course.enrolled_count} enrolled</span>
              )}
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Course Content */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-poppins font-bold text-lg text-foreground">Course Content</h2>

            {contentLoading ? (
              <div className="space-y-3 animate-pulse">
                {[1, 2, 3].map(i => <div key={i} className="rounded-xl border border-border/40 h-16 bg-muted/40" />)}
              </div>
            ) : modules.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-8 text-center">
                <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">No modules available yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {modules.map((mod, modIdx) => (
                  <ModuleAccordion
                    key={mod.id}
                    module={mod}
                    modIdx={modIdx}
                    lessons={lessons.filter(l => l.module_id === mod.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Info cards */}
          <div className="space-y-4">
            {course.learning_objectives?.length > 0 && (
              <div className="rounded-xl border border-border/60 shadow-sm bg-card p-5">
                <h3 className="font-poppins font-semibold text-sm text-foreground mb-3">What You'll Learn</h3>
                <ul className="space-y-2">
                  {course.learning_objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle size={13} className="text-secondary mt-0.5 flex-shrink-0" /> {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {course.materials_required?.length > 0 && (
              <div className="rounded-xl border border-border/60 shadow-sm bg-card p-5">
                <h3 className="font-poppins font-semibold text-sm text-foreground mb-3">Materials Needed</h3>
                <ul className="space-y-1.5">
                  {course.materials_required.map((mat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> {mat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {course.grade_levels?.length > 0 && (
              <div className="rounded-xl border border-border/60 shadow-sm bg-card p-5">
                <h3 className="font-poppins font-semibold text-sm text-foreground mb-3">Grade Levels</h3>
                <div className="flex flex-wrap gap-1.5">
                  {course.grade_levels.map(g => (
                    <span key={g} className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{g}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">Powered by <span className="font-semibold text-primary">SilidLMS</span></p>
        </div>
      </div>
    </div>
  );
}