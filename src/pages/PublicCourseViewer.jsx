import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ChevronDown, ChevronUp, BookOpen, Play, Zap, CheckCircle, FileText, Clock, Layers } from "lucide-react";

const lessonTypeMap = {
  reading: { icon: FileText, color: "text-blue-500", bg: "bg-blue-50", label: "Reading" },
  video: { icon: Play, color: "text-purple-500", bg: "bg-purple-50", label: "Video" },
  quiz: { icon: Zap, color: "text-orange-500", bg: "bg-orange-50", label: "Quiz" },
  activity: { icon: BookOpen, color: "text-green-500", bg: "bg-green-50", label: "Activity" },
  project: { icon: CheckCircle, color: "text-teal-500", bg: "bg-teal-50", label: "Project" },
};

function ModuleAccordion({ module, lessons }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
            {module.order || "·"}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{module.title}</p>
            {module.description && (
              <p className="text-xs text-gray-500 mt-0.5">{module.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-gray-400">{lessons.length} lesson{lessons.length !== 1 ? "s" : ""}</span>
          {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </button>

      {open && (
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          {lessons.length === 0 && (
            <p className="px-5 py-3 text-sm text-gray-400 italic">No lessons available yet.</p>
          )}
          {lessons.map((lesson, i) => {
            const typeInfo = lessonTypeMap[lesson.type] || lessonTypeMap.reading;
            const TypeIcon = typeInfo.icon;
            return (
              <div key={lesson.id} className="flex items-center gap-4 px-5 py-3 bg-gray-50">
                <div className={`w-8 h-8 rounded-lg ${typeInfo.bg} flex items-center justify-center flex-shrink-0`}>
                  <TypeIcon size={14} className={typeInfo.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{lesson.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs font-medium ${typeInfo.color}`}>{typeInfo.label}</span>
                    {lesson.duration_minutes && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={10} /> {lesson.duration_minutes} min
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
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

  useEffect(() => {
    if (!id || id === ':id') {
      setNotFound(true);
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        const res = await base44.functions.invoke('getPublicCourse', { course_id: id });
        const { course: courseData, modules: mods, lessons: lsns } = res.data;
        setCourse(courseData);
        setModules(mods);
        setLessons(lsns);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-8 h-8 border-4 border-orange-400/30 border-t-orange-500 rounded-full animate-spin" />
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500 text-sm">Course not found or not published.</p>
    </div>
  );

  const totalLessons = lessons.length;
  const totalHours = course.duration_hours;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">{course.skill_area}</span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">{course.difficulty}</span>
            {course.grade_levels?.slice(0, 3).map(g => (
              <span key={g} className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">{g}</span>
            ))}
            {course.grade_levels?.length > 3 && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">+{course.grade_levels.length - 3} more</span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">{course.title}</h1>
          <p className="text-white/80 text-sm leading-relaxed mb-6 max-w-2xl">{course.description}</p>
          <div className="flex flex-wrap gap-5 text-white/80 text-sm">
            {totalHours && <span className="flex items-center gap-1.5"><Clock size={14} /> {totalHours}h total</span>}
            <span className="flex items-center gap-1.5"><Layers size={14} /> {modules.length} modules</span>
            <span className="flex items-center gap-1.5"><BookOpen size={14} /> {totalLessons} lessons</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

        {/* Learning Objectives */}
        {course.learning_objectives?.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-3">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.learning_objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                  {obj}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Curriculum */}
        <div>
          <h2 className="font-bold text-gray-900 text-base mb-3">Course Curriculum</h2>
          {modules.length === 0 && (
            <p className="text-sm text-gray-400 italic">No modules available yet.</p>
          )}
          {modules.map(mod => (
            <ModuleAccordion
              key={mod.id}
              module={mod}
              lessons={lessons.filter(l => l.module_id === mod.id)}
            />
          ))}
        </div>

        {/* Materials */}
        {course.materials_required?.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-3">Materials Required</h2>
            <ul className="space-y-1.5">
              {course.materials_required.map((m, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">Powered by SilidLMS</p>
        </div>
      </div>
    </div>
  );
}