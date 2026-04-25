import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Clock, Layers, CheckCircle, ArrowLeft } from "lucide-react";

const difficultyColors = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-red-100 text-red-700",
};

const categoryGroups = [
  { key: "material", label: "Materials", icon: "📦" },
  { key: "electronic", label: "Electronics", icon: "⚡" },
  { key: "tool", label: "Tools", icon: "🔧" },
  { key: "other", label: "Other", icon: "📌" },
];

export default function PublicMakerLessonViewer() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id || id === ':id') { setNotFound(true); setLoading(false); return; }
    const load = async () => {
      try {
        const res = await base44.functions.invoke('getPublicMakerLesson', { lesson_id: id });
        setLesson(res.data.lesson);
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
      <p className="text-gray-500 text-sm">Lesson not found or not published.</p>
    </div>
  );

  const totalSteps = lesson.steps?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        {(lesson.hero_image_url || lesson.thumbnail_url) && (
          <img
            src={lesson.hero_image_url || lesson.thumbnail_url}
            alt={lesson.title}
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
        )}
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">{lesson.skill_area}</span>
            {lesson.difficulty && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[lesson.difficulty]}`}>{lesson.difficulty}</span>
            )}
            {lesson.grade_levels?.slice(0, 3).map(g => (
              <span key={g} className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">{g}</span>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">{lesson.title}</h1>
          {lesson.description && <p className="text-white/80 text-sm leading-relaxed mb-5 max-w-xl">{lesson.description}</p>}
          <div className="flex flex-wrap gap-5 text-white/80 text-sm">
            {lesson.estimated_minutes && <span className="flex items-center gap-1.5"><Clock size={14} /> {lesson.estimated_minutes} min</span>}
            {totalSteps > 0 && <span className="flex items-center gap-1.5"><Layers size={14} /> {totalSteps} steps</span>}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
        {/* Back to Maker Projects */}
        <Link to="/share/maker" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition-colors">
          <ArrowLeft size={15} /> Back to Maker Projects
        </Link>

        {/* Learning Objectives */}
        {lesson.learning_objectives?.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-3">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lesson.learning_objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                  {obj}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overview */}
        {lesson.overview_html && (
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-3">Overview</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-5 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: lesson.overview_html }} />
          </div>
        )}

        {/* Video */}
        {lesson.video_url && (
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-3">Project Video</h2>
            <div className="rounded-xl overflow-hidden aspect-video bg-black">
              <iframe
                src={lesson.video_url.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={lesson.title}
              />
            </div>
          </div>
        )}

        {/* Gallery */}
        {lesson.gallery_images?.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-3">Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {lesson.gallery_images.map((img, i) => (
                <img key={i} src={img} alt={`Gallery ${i + 1}`} className="w-full h-32 object-cover rounded-xl border border-gray-200" />
              ))}
            </div>
          </div>
        )}

        {/* Materials */}
        {lesson.materials?.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-3">Materials</h2>
            {categoryGroups.map(group => {
              const items = lesson.materials.filter(m => m.category === group.key);
              if (!items.length) return null;
              return (
                <div key={group.key} className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{group.icon} {group.label}</p>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm">
                        <span className="flex-1 font-medium text-gray-800">{item.name}</span>
                        {item.quantity && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.quantity}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Steps */}
        {lesson.steps?.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-3">Build Steps</h2>
            <div className="space-y-4">
              {lesson.steps.map((step, i) => (
                <div key={step.id || i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100">
                    <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span className="font-semibold text-gray-900 text-sm">{step.title}</span>
                  </div>
                  <div className="p-5 space-y-3">
                    {step.images?.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {step.images.map((img, j) => (
                          <img key={j} src={img} alt={`Step ${i+1}`} className="h-40 rounded-lg object-cover border border-gray-200" />
                        ))}
                      </div>
                    )}
                    {step.instructions && <p className="text-sm text-gray-700 leading-relaxed">{step.instructions}</p>}
                    {step.tip && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800">
                        💡 <strong>Tip:</strong> {step.tip}
                      </div>
                    )}
                    {step.warning && (
                      <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-800">
                        ⚠️ <strong>Warning:</strong> {step.warning}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Files */}
        {lesson.files?.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-3">Downloads</h2>
            <div className="space-y-2">
              {lesson.files.map((file, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-3 bg-white rounded-xl border border-gray-200">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-500 text-base">📄</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-400">{file.type?.toUpperCase()}</p>
                  </div>
                  {file.url && (
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-600 font-semibold hover:underline flex-shrink-0">Download</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reflection Questions */}
        {lesson.reflection_questions?.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 text-base mb-3">Reflection Questions</h2>
            <div className="space-y-2">
              {lesson.reflection_questions.map((q, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl px-4 py-3">
                  <span className="font-bold text-orange-500 flex-shrink-0">{i + 1}.</span>
                  {q}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">Powered by SilidLMS</p>
        </div>
      </div>
    </div>
  );
}