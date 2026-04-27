import { useState, useEffect } from "react";

const htmlCache = {};
import { useParams, useOutletContext, useNavigate, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { GRADE1_MAKER_LESSONS } from "@/components/lesson/lessonData";
import { GRADE2_MAKER_LESSONS } from "@/components/lesson/lessonDataGrade2";
import { GRADE3_MAKER_LESSONS } from "@/components/lesson/lessonDataGrade3";
import { GRADE4_MAKER_LESSONS } from "@/components/lesson/lessonDataGrade4";
import Grade1MakerLesson from "@/components/lesson/Grade1MakerLesson";
import {
  ArrowLeft, ArrowRight, CheckCircle, FileText, Play,
  Zap, BookOpen, Upload, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function LessonViewer() {
  const { id } = useParams();
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [lesson, setLesson] = useState(null);
  const [allLessons, setAllLessons] = useState([]);
  const [enrollment, setEnrollment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [textResponse, setTextResponse] = useState("");
  const [uploading, setUploading] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState(null);

  useEffect(() => {
    if (user === null) return; // wait for auth to resolve
    let cancelled = false;
    const load = async () => {
      const l = await base44.entities.Lesson.filter({ id });
      if (cancelled) return;
      const lessonData = l[0];
      setLesson(lessonData);
      if (lessonData) {
        const [all, enrList] = await Promise.all([
          base44.entities.Lesson.filter({ course_id: lessonData.course_id, module_id: lessonData.module_id }, "order"),
          user ? base44.entities.Enrollment.filter({ course_id: lessonData.course_id, student_id: user.id }) : Promise.resolve([]),
        ]);
        if (cancelled) return;
        setAllLessons(all);
        if (enrList[0]) {
          setEnrollment(enrList[0]);
          const sub = await base44.entities.Submission.filter({ lesson_id: id, student_id: user?.id });
          if (cancelled) return;
          if (sub[0]) { setSubmission(sub[0]); setTextResponse(sub[0].text_response || ""); }
        }
      }
      if (lessonData?.content_url) {
        const url = lessonData.content_url;
        if (htmlCache[url]) {
          if (!cancelled) setHtmlContent(htmlCache[url]);
        } else {
          fetch(url)
            .then(res => res.text())
            .then(html => { htmlCache[url] = html; if (!cancelled) setHtmlContent(html); })
            .catch(() => {});
        }
      }
      setLoading(false);
    };
    load();
    return () => { cancelled = true; };
  }, [id, user]);

  const handleMarkComplete = async () => {
    if (!enrollment || !user) return;
    setCompleting(true);
    const completed = [...(enrollment.completed_lessons || [])];
    if (!completed.includes(id)) completed.push(id);
    const progress = Math.round((completed.length / allLessons.length) * 100);
    const updated = await base44.entities.Enrollment.update(enrollment.id, {
      completed_lessons: completed,
      progress_percent: progress,
      status: progress === 100 ? "completed" : "active",
      ...(progress === 100 ? { completed_date: new Date().toISOString().split("T")[0] } : {}),
    });
    setEnrollment(updated);

    if (progress === 100) {
      await base44.entities.Achievement.create({
        student_id: user.id,
        student_name: user.full_name,
        type: "certificate",
        title: "Course Completed!",
        description: `Completed all lessons.`,
        course_id: lesson.course_id,
        icon: "🏆",
        earned_date: new Date().toISOString().split("T")[0],
      });
      toast({ title: "🏆 Course Complete!", description: "You earned a completion certificate!" });
    } else {
      toast({ title: "✅ Lesson completed!", description: `Progress: ${progress}%` });
    }
    setCompleting(false);
  };

  const handleSubmit = async () => {
    if (!user || !lesson) return;
    setUploading(true);
    if (submission) {
      await base44.entities.Submission.update(submission.id, { text_response: textResponse });
    } else {
      const sub = await base44.entities.Submission.create({
        lesson_id: id,
        course_id: lesson.course_id,
        student_id: user.id,
        student_name: user.full_name,
        text_response: textResponse,
        status: "pending",
        submitted_date: new Date().toISOString().split("T")[0],
      });
      setSubmission(sub);
    }
    toast({ title: "Submitted!", description: "Your response has been submitted for review." });
    setUploading(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user || !lesson) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const sub = await base44.entities.Submission.create({
      lesson_id: id,
      course_id: lesson.course_id,
      student_id: user.id,
      student_name: user.full_name,
      file_url,
      status: "pending",
      submitted_date: new Date().toISOString().split("T")[0],
    });
    setSubmission(sub);
    toast({ title: "File uploaded!", description: "Your file has been submitted." });
    setUploading(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (!lesson) return <div className="text-center py-24 text-muted-foreground">Lesson not found.</div>;

  // ── Native interactive renderer for Grade 1 & 2 Maker lessons ──────────
  const ALL_INTERACTIVE = [...GRADE1_MAKER_LESSONS, ...GRADE2_MAKER_LESSONS, ...GRADE3_MAKER_LESSONS, ...GRADE4_MAKER_LESSONS];
  const isGrade1Maker = ALL_INTERACTIVE.some(l => l.id === id);
  if (isGrade1Maker) {
    return (
      <div className="max-w-4xl">
        {/* Back */}
        <button onClick={() => navigate(`/courses/${lesson.course_id}`)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors mb-4">
          <ArrowLeft size={16} /> Back to Course
        </button>
        <Grade1MakerLesson
          lessonId={id}
          enrollment={enrollment}
          allLessons={allLessons}
          user={user}
          onComplete={handleMarkComplete}
        />
        {/* Nav */}
        <div className="flex items-center justify-between pt-4 max-w-2xl mx-auto">
          <Button variant="outline" disabled={!allLessons[allLessons.findIndex(l => l.id === id) - 1]} onClick={() => navigate(`/lessons/${allLessons[allLessons.findIndex(l => l.id === id) - 1]?.id}`)} className="gap-2 rounded-xl">
            <ArrowLeft size={15} /> Previous
          </Button>
          {allLessons[allLessons.findIndex(l => l.id === id) + 1] ? (
            <Button onClick={() => navigate(`/lessons/${allLessons[allLessons.findIndex(l => l.id === id) + 1].id}`)} className="bg-primary text-white rounded-xl gap-2">
              Next <ArrowRight size={15} />
            </Button>
          ) : (
            <Link to={`/courses/${lesson.course_id}`}>
              <Button className="bg-primary text-white rounded-xl gap-2">Back to Course <ArrowRight size={15} /></Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  const currentIndex = allLessons.findIndex(l => l.id === id);
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];
  const isCompleted = enrollment?.completed_lessons?.includes(id);
  const progress = enrollment ? Math.round(((enrollment.completed_lessons?.length || 0) / allLessons.length) * 100) : 0;

  const lessonTypeMap = { reading: { icon: FileText, color: "text-blue-500", bg: "bg-blue-50" }, video: { icon: Play, color: "text-purple-500", bg: "bg-purple-50" }, quiz: { icon: Zap, color: "text-orange-500", bg: "bg-orange-50" }, activity: { icon: BookOpen, color: "text-green-500", bg: "bg-green-50" }, project: { icon: CheckCircle, color: "text-teal-500", bg: "bg-teal-50" } };
  const typeInfo = lessonTypeMap[lesson.type] || lessonTypeMap.reading;
  const TypeIcon = typeInfo.icon;

  return (
    <div className="max-w-5xl space-y-4">
      {/* Back & Progress */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(`/courses/${lesson.course_id}`)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors flex-shrink-0">
          <ArrowLeft size={16} /> Back
        </button>
        {enrollment && (
          <div className="flex-1">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Course Progress</span><span className="font-medium text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
      </div>

      {/* Lesson Header */}
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl ${typeInfo.bg} flex items-center justify-center flex-shrink-0`}>
          <TypeIcon className={`${typeInfo.color}`} size={22} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold capitalize px-2.5 py-0.5 rounded-full ${typeInfo.bg} ${typeInfo.color}`}>{lesson.type}</span>
            {lesson.duration_minutes && <span className="text-xs text-muted-foreground">{lesson.duration_minutes} min</span>}
          </div>
          <h1 className="font-poppins font-bold text-xl text-foreground mt-1">{lesson.title}</h1>
        </div>
        {isCompleted && (
          <div className="ml-auto flex items-center gap-1.5 text-secondary text-sm font-semibold">
            <CheckCircle size={16} /> Completed
          </div>
        )}
      </div>

      {/* Objectives */}
      {lesson.objectives?.length > 0 && (
        <Card className="p-5 border-secondary/20 bg-secondary/5">
          <p className="font-poppins font-semibold text-sm text-foreground mb-2">Learning Objectives</p>
          <ul className="space-y-1.5">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <CheckCircle size={13} className="text-secondary mt-0.5 flex-shrink-0" /> {obj}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Video */}
      {lesson.video_url && (
        <Card className="overflow-hidden border-border/60">
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

      {/* Rich Text Content */}
      {!htmlContent && lesson.content && (
        <Card className="p-6 border-border/60 shadow-sm">
          <div
            className="prose prose-sm max-w-none text-foreground/90 leading-relaxed text-sm ql-editor"
            style={{ padding: 0 }}
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </Card>
      )}

      {/* Materials */}
      {lesson.materials?.length > 0 && (
        <Card className="p-5 border-border/60">
          <p className="font-poppins font-semibold text-sm mb-3">Required Materials</p>
          <ul className="space-y-1.5">
            {lesson.materials.map((m, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" /> {m}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Submission Area */}
      {enrollment && (lesson.type === "activity" || lesson.type === "project") && (
        <Card className="p-6 border-primary/20 bg-primary/5">
          <h3 className="font-poppins font-semibold text-foreground mb-1">Submit Your Work</h3>
          <p className="text-sm text-muted-foreground mb-4">Share your response, reflection, or upload a file.</p>

          {submission?.feedback && (
            <div className="mb-4 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
              <p className="text-xs font-semibold text-secondary mb-1">Teacher Feedback</p>
              <p className="text-sm text-foreground">{submission.feedback}</p>
              {submission.grade && <p className="text-sm font-bold text-primary mt-2">Grade: {submission.grade}</p>}
            </div>
          )}

          <Textarea
            value={textResponse}
            onChange={e => setTextResponse(e.target.value)}
            placeholder="Write your response, reflection, or describe your project..."
            className="min-h-[120px] text-sm mb-3"
          />

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSubmit} disabled={uploading || !textResponse.trim()} className="bg-primary text-white rounded-xl gap-2">
              {uploading ? <Loader2 size={14} className="animate-spin" /> : null}
              {submission ? "Update Response" : "Submit Response"}
            </Button>
            <label className="cursor-pointer">
              <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.png,.jpg,.stl,.zip" />
              <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
                <Upload size={14} /> Upload File
              </div>
            </label>
          </div>
          {submission?.file_url && (
            <p className="text-xs text-secondary mt-2 flex items-center gap-1"><CheckCircle size={12} /> File submitted</p>
          )}
        </Card>
      )}

      {/* Navigation & Complete */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          disabled={!prevLesson}
          onClick={() => navigate(`/lessons/${prevLesson?.id}`)}
          className="gap-2 rounded-xl"
        >
          <ArrowLeft size={15} /> Previous
        </Button>

        <div className="flex items-center gap-3">
          {enrollment && !isCompleted && (
            <Button
              onClick={handleMarkComplete}
              disabled={completing}
              className="bg-secondary hover:bg-secondary/90 text-white rounded-xl gap-2"
            >
              {completing ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={15} />}
              Mark Complete
            </Button>
          )}
          {nextLesson ? (
            <Button onClick={() => navigate(`/lessons/${nextLesson.id}`)} className="bg-primary text-white rounded-xl gap-2">
              Next <ArrowRight size={15} />
            </Button>
          ) : (
            <Link to={`/courses/${lesson.course_id}`}>
              <Button className="bg-primary text-white rounded-xl gap-2">
                Back to Course <ArrowRight size={15} />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}