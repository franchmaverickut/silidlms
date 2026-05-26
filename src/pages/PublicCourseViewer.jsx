import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, BookOpen, Clock, Users, CheckCircle,
  Play, FileText, Zap, ChevronDown, ChevronRight, Layers
} from "lucide-react";
import { appParams } from "@/lib/app-params";

const lessonTypeIcon = { reading: FileText, video: Play, quiz: Zap, activity: BookOpen, project: CheckCircle };
const lessonTypeColor = { reading: "text-blue-500", video: "text-purple-500", quiz: "text-orange-500", activity: "text-green-500", project: "text-teal-500" };

async function publicFetch(body) {
  const base = (appParams.appBaseUrl || '').replace(/\/$/, '');
  const url = `${base}/api/apps/${appParams.appId}/functions/getPublicCourse`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) return res.json().catch(() => ({ error: 'fetch_failed' }));
  return res.json();
}

function ModuleRow({ module, modIdx, lessons }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 font-bold text-xs flex items-center justify-center flex-shrink-0">
            {modIdx + 1}
          </div>
          <div>
            <p className="font-poppins font-semibold text-sm text-gray-900">{module.title}</p>
            <p className="text-xs text-gray-400">{lessons.length} lesson{lessons.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
        {open
          ? <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
          : <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
        }
      </button>

      {open && lessons.length > 0 && (
        <div className="border-t border-gray-100">
          {lessons.map((lesson) => {
            const Icon = lessonTypeIcon[lesson.type] || BookOpen;
            const colorClass = lessonTypeColor[lesson.type] || "text-gray-400";
            return (
              <a
                key={lesson.id}
                href={`/share/lesson/${lesson.id}`}
                className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <Icon size={15} className={`flex-shrink-0 ${colorClass}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 truncate">{lesson.title}</p>
                  <span className="text-xs text-gray-400 capitalize">{lesson.type}</span>
                </div>
                {lesson.duration_minutes && (
                  <span className="text-xs text-gray-400 flex-shrink-0">{lesson.duration_minutes}m</span>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Lightweight skeleton for module list only
function ModuleSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map(i => (
        <div key={i} className="rounded-xl border border-gray-200 h-16 bg-gray-100" />
      ))}
    </div>
  );
}

export default function PublicCourseViewer() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errorDetail, setErrorDetail] = useState(null);

  useEffect(() => {
    if (!id || id === ':id') {
      setNotFound(true);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled) { setNotFound(true); setErrorDetail('timeout'); setLoading(false); }
    }, 20000);

    publicFetch({ course_id: id })
      .then(data => {
        if (cancelled) return;
        console.log("[PublicCourseViewer] data received:", data);
        if (data?.error) {
          console.warn("[PublicCourseViewer] error detail:", data.detail);
          setErrorDetail(data.detail || 'not_found');
          setNotFound(true);
          return;
        }
        if (!data?.course) { setNotFound(true); return; }
        setCourse(data.course);
        setModules(data.modules || []);
        setLessons(data.lessons || []);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("[PublicCourseViewer] fetch threw:", err);
          setNotFound(true);
          setErrorDetail('fetch_error');
        }
      })
      .finally(() => {
        if (!cancelled) { clearTimeout(timeout); setLoading(false); }
      });

    return () => { cancelled = true; clearTimeout(timeout); };
  }, [id]);

  // ── Not found ────────────────────────────────────────────────────────────
  if (notFound) {
    const msg = errorDetail === 'not_published'
      ? 'This course exists but has not been published yet.'
      : errorDetail === 'timeout' || errorDetail === 'fetch_error'
      ? 'Could not load the course. Please check your connection and try again.'
      : 'This course could not be found. The link may be incorrect.';
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center space-y-3">
          <p className="text-3xl">{errorDetail === 'not_published' ? '🔒' : '📭'}</p>
          <p className="font-poppins font-semibold text-gray-800">
            {errorDetail === 'not_published' ? 'Course not published' : 'Course not found'}
          </p>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">{msg}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:border-orange-400 hover:text-orange-500 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const totalLessons = lessons.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-2 sticky top-0 z-50 shadow-sm">
        <span className="text-lg font-extrabold text-orange-500 font-poppins">Silid</span>
        <span className="text-lg font-extrabold text-gray-800 font-poppins">LMS</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Back */}
        <Link to="/share/courses" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm transition-colors">
          <ArrowLeft size={15} /> Back to Courses
        </Link>

        {/* ── Hero — renders immediately once course arrives, or shows a slim skeleton ── */}
        {loading && !course ? (
          <div className="rounded-2xl bg-gray-200 h-52 animate-pulse" />
        ) : course ? (
          <div className="relative overflow-hidden rounded-2xl bg-gray-900 text-white p-7 shadow-lg">
            {course.thumbnail_url && (
              <img
                src={course.thumbnail_url}
                alt=""
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50" />
            <div className="relative z-10">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">{course.skill_area}</span>
                {course.difficulty && (
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">{course.difficulty}</span>
                )}
              </div>
              <h1 className="font-poppins font-bold text-2xl md:text-3xl leading-tight mb-2">{course.title}</h1>
              {course.description && (
                <p className="text-white/70 text-sm max-w-2xl leading-relaxed">{course.description}</p>
              )}
              <div className="flex flex-wrap gap-5 mt-4 text-sm text-white/70">
                {course.duration_hours && (
                  <span className="flex items-center gap-1.5"><Clock size={13} />{course.duration_hours}h</span>
                )}
                <span className="flex items-center gap-1.5"><Layers size={13} />{modules.length} modules</span>
                <span className="flex items-center gap-1.5"><BookOpen size={13} />{totalLessons} lessons</span>
                {course.enrolled_count > 0 && (
                  <span className="flex items-center gap-1.5"><Users size={13} />{course.enrolled_count} enrolled</span>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Two-column layout ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: modules */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-poppins font-bold text-base text-gray-900">Course Content</h2>
            {loading ? (
              <ModuleSkeleton />
            ) : modules.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center">
                <BookOpen className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No modules available yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {modules.map((mod, idx) => (
                  <ModuleRow
                    key={mod.id}
                    module={mod}
                    modIdx={idx}
                    lessons={lessons.filter(l => l.module_id === mod.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: info */}
          {course && (
            <div className="space-y-4">
              {course.learning_objectives?.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="font-poppins font-semibold text-sm text-gray-900 mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {course.learning_objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                        <CheckCircle size={12} className="text-green-500 mt-0.5 flex-shrink-0" /> {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {course.materials_required?.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="font-poppins font-semibold text-sm text-gray-900 mb-3">Materials Needed</h3>
                  <ul className="space-y-1.5">
                    {course.materials_required.map((mat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" /> {mat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {course.grade_levels?.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="font-poppins font-semibold text-sm text-gray-900 mb-3">Grade Levels</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {course.grade_levels.map(g => (
                      <span key={g} className="px-2.5 py-1 bg-orange-50 text-orange-600 text-xs rounded-full font-medium">{g}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">Powered by <span className="font-semibold text-orange-500">SilidLMS</span></p>
        </div>
      </div>
    </div>
  );
}