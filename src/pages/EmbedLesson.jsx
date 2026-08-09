import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { appParams } from "@/lib/app-params";
import LessonHtmlContent from "@/components/lesson/LessonHtmlContent";

/**
 * Standalone lesson embed — renders ONLY the original uploaded lesson HTML
 * document via a sandboxed srcDoc iframe. No SilidLMS shell, no auth, no
 * navigation chrome. The complete HTML, CSS, JavaScript, calculations, IDs,
 * and interactions run independently of Silid LMS permissions.
 *
 * Intended for external embedding (LMS, blog, iframe) where the host wants
 * the lesson itself, not the course shell.
 */
async function fetchPublicLesson(lessonId) {
  const base = (appParams.appBaseUrl || "").replace(/\/$/, "");
  const url = `${base}/api/apps/${appParams.appId}/functions/getPublicLesson`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lesson_id: lessonId }),
  });
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

export default function EmbedLesson() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id || id === ":id") { setError(true); setLoading(false); return; }
    let cancelled = false;
    fetchPublicLesson(id)
      .then(data => {
        if (cancelled) return;
        if (!data || data.error || !data.lesson) { setError(true); setLoading(false); return; }
        setLesson(data.lesson);
        setLoading(false);
      })
      .catch(() => { if (!cancelled) { setError(true); setLoading(false); } });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-gray-300" size={28} />
    </div>
  );

  if (error || !lesson?.content_url) return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-2 bg-white text-gray-400">
      <AlertCircle size={24} className="text-gray-300" />
      <p className="text-sm">Lesson not available.</p>
    </div>
  );

  // Full-viewport iframe — the lesson HTML runs independently, no shell.
  return (
    <div className="fixed inset-0 bg-white overflow-hidden">
      <LessonHtmlContent url={lesson.content_url} title={lesson.title} />
    </div>
  );
}