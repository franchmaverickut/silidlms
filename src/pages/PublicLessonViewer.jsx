import { useState, useEffect, useRef } from "react";

// Module-level cache so HTML is not re-fetched when navigating between lessons
const htmlCache = {};
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, ArrowRight, FileText, Play, Zap, BookOpen, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "react-quill/dist/quill.snow.css";
import Grade1MakerLesson from "@/components/lesson/Grade1MakerLesson";
import { GRADE1_MAKER_LESSONS } from "@/components/lesson/lessonData";
import { GRADE2_MAKER_LESSONS } from "@/components/lesson/lessonDataGrade2";
import { GRADE3_MAKER_LESSONS } from "@/components/lesson/lessonDataGrade3";
import { GRADE4_MAKER_LESSONS } from "@/components/lesson/lessonDataGrade4";

const ALL_INTERACTIVE_IDS = new Set([
  ...GRADE1_MAKER_LESSONS,
  ...GRADE2_MAKER_LESSONS,
  ...GRADE3_MAKER_LESSONS,
  ...GRADE4_MAKER_LESSONS,
].map(l => l.id));

const lessonTypeMap = {
  reading: { icon: FileText, color: "text-blue-500", bg: "bg-blue-50", label: "Reading" },
  video: { icon: Play, color: "text-purple-500", bg: "bg-purple-50", label: "Video" },
  quiz: { icon: Zap, color: "text-orange-500", bg: "bg-orange-50", label: "Quiz" },
  activity: { icon: BookOpen, color: "text-green-500", bg: "bg-green-50", label: "Activity" },
  project: { icon: CheckCircle, color: "text-teal-500", bg: "bg-teal-50", label: "Project" },
};

export default function PublicLessonViewer() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [htmlContent, setHtmlContent] = useState(null);

  useEffect(() => {
    if (!id || id === ':id') { setNotFound(true); setLoading(false); return; }
    const load = async () => {
      const res = await base44.functions.invoke('getPublicLesson', { lesson_id: id });
      const data = res.data;
      if (!data || data.error || !data.lesson) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setLesson(data.lesson);
      setAllLessons(data.siblings || []);
      if (data.lesson?.content_url) {
        const url = data.lesson.content_url;
        if (htmlCache[url]) {
          setHtmlContent(htmlCache[url]);
        } else {
          fetch(url)
            .then(res => res.text())
            .then(html => { htmlCache[url] = html; setHtmlContent(html); })
            .catch(() => {});
        }
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="bg-white border-b border-gray-200 h-12" />
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        <div className="h-4 w-36 bg-gray-200 rounded" />
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gray-200 flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-5 w-64 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="h-64 bg-gray-200 rounded-xl" />
        <div className="h-32 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500 text-sm">Lesson not found.</p>
    </div>
  );

  const typeInfo = lessonTypeMap[lesson.type] || lessonTypeMap.reading;
  const TypeIcon = typeInfo.icon;
  const currentIndex = allLessons.findIndex(l => l.id === id);
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];

  // Interactive lesson — render using the same component as LMS
  if (ALL_INTERACTIVE_IDS.has(id)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold text-orange-500 font-poppins">Silid</span>
            <span className="text-lg font-extrabold text-gray-800 font-poppins">LMS</span>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <Link to={`/share/course/${lesson.course_id}`} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition-colors">
              <ArrowLeft size={15} /> Back to Course
            </Link>
          </div>
          <Grade1MakerLesson lessonId={id} enrollment={null} allLessons={allLessons} user={null} onComplete={null} />
          <div className="flex items-center justify-between pt-4">
            {prevLesson ? (
              <Link to={`/share/lesson/${prevLesson.id}`}>
                <Button variant="outline" className="gap-2 rounded-xl border-gray-200"><ArrowLeft size={15} /> Previous</Button>
              </Link>
            ) : <div />}
            {nextLesson ? (
              <Link to={`/share/lesson/${nextLesson.id}`}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl gap-2">Next <ArrowRight size={15} /></Button>
              </Link>
            ) : (
              <Link to={`/share/course/${lesson.course_id}`}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl gap-2">Back to Course <ArrowRight size={15} /></Button>
              </Link>
            )}
          </div>
          <div className="border-t border-gray-200 pt-6 mt-6 text-center">
            <p className="text-xs text-gray-400">Powered by <span className="font-semibold text-orange-500">SilidLMS</span></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold text-orange-500 font-poppins">Silid</span>
          <span className="text-lg font-extrabold text-gray-800 font-poppins">LMS</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        {/* Back buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link to={`/share/course/${lesson.course_id}`} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition-colors">
            <ArrowLeft size={15} /> Back to Course
          </Link>
          <Link to="/share/courses" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-500 transition-colors">
            <ArrowLeft size={15} /> Back to Gallery
          </Link>
        </div>

        {/* Lesson Header */}
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl ${typeInfo.bg} flex items-center justify-center flex-shrink-0`}>
            <TypeIcon className={typeInfo.color} size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold capitalize px-2.5 py-0.5 rounded-full ${typeInfo.bg} ${typeInfo.color}`}>{lesson.type}</span>
              {lesson.duration_minutes && (
                <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11} /> {lesson.duration_minutes} min</span>
              )}
            </div>
            <h1 className="font-poppins font-bold text-xl text-gray-900 mt-1">{lesson.title}</h1>
          </div>
        </div>

        {/* Objectives */}
        {lesson.objectives?.length > 0 && (
          <Card className="p-5 border-green-100 bg-green-50/50">
            <p className="font-poppins font-semibold text-sm text-gray-800 mb-2">Learning Objectives</p>
            <ul className="space-y-1.5">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={13} className="text-green-500 mt-0.5 flex-shrink-0" /> {obj}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Video */}
        {lesson.video_url && (
          <Card className="overflow-hidden border-gray-200">
            <div className="aspect-video bg-black">
              <iframe
                src={lesson.video_url}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title={lesson.title}
              />
            </div>
          </Card>
        )}

        {/* External HTML Content */}
        {htmlContent && (
          <div
            className="w-full text-foreground/90 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}

        {/* Rich Content */}
        {!htmlContent && lesson.content && (
          <Card className="p-6 border-gray-200 shadow-sm">
            <div
              className="prose prose-sm max-w-none text-foreground/90 leading-relaxed text-sm ql-editor"
              style={{ padding: 0 }}
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </Card>
        )}

        {/* Materials */}
        {lesson.materials?.length > 0 && (
          <Card className="p-5 border-gray-200">
            <p className="font-poppins font-semibold text-sm mb-3 text-gray-800">Required Materials</p>
            <ul className="space-y-1.5">
              {lesson.materials.map((m, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" /> {m}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* No content fallback */}
        {!htmlContent && !lesson.content && !lesson.video_url && lesson.objectives?.length === 0 && (
          <Card className="p-8 text-center border-dashed border-gray-200">
            <FileText className="w-10 h-10 text-gray-200 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">No content available for this lesson yet.</p>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          {prevLesson ? (
            <Link to={`/share/lesson/${prevLesson.id}`}>
              <Button variant="outline" className="gap-2 rounded-xl border-gray-200"><ArrowLeft size={15} /> Previous</Button>
            </Link>
          ) : <div />}
          {nextLesson ? (
            <Link to={`/share/lesson/${nextLesson.id}`}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl gap-2">Next <ArrowRight size={15} /></Button>
            </Link>
          ) : (
            <Link to={`/share/course/${lesson.course_id}`}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl gap-2">Back to Course <ArrowRight size={15} /></Button>
            </Link>
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