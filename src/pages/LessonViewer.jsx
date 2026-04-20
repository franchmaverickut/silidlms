import { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
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

  const currentIndex = allLessons.findIndex(l => l.id === id);
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];
  const isCompleted = enrollment?.completed_lessons?.includes(id);
  const progress = enrollment ? Math.round(((enrollment.completed_lessons?.length || 0) / allLessons.length) * 100) : 0;

  const lessonTypeMap = { reading: { icon: FileText, color: "text-blue-500", bg: "bg-blue-50" }, video: { icon: Play, color: "text-purple-500", bg: "bg-purple-50" }, quiz: { icon: Zap, color: "text-orange-500", bg: "bg-orange-50" }, activity: { icon: BookOpen, color: "text-green-500", bg: "bg-green-50" }, project: { icon: CheckCircle, color: "text-teal-500", bg: "bg-teal-50" } };
  const typeInfo = lessonTypeMap[lesson.type] || lessonTypeMap.reading;
  const TypeIcon = typeInfo.icon;

  return (
    <div className="max-w-4xl space-y-5">
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
            <iframe src={lesson.video_url} className="w-full h-full" allowFullScreen title={lesson.title} />
          </div>
        </Card>
      )}

      {/* Rich Text Content */}
      {lesson.content && (
        <Card className="p-6 border-border/60 shadow-sm overflow-hidden">
          <style>{`
            /* Flip cards */
            .rev-card { perspective: 600px; width: 120px; height: 120px; cursor: pointer; display: inline-block; margin: 6px; }
            .rev-card .rev-front, .rev-card .rev-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; text-align: center; transition: transform 0.5s; }
            .rev-card { position: relative; transform-style: preserve-3d; transition: transform 0.5s; }
            .rev-card .rev-front { background: #f0f4ff; border: 2px solid #c7d2fe; }
            .rev-card .rev-back { background: #4F46E5; color: white; transform: rotateY(180deg); }
            .rev-card.flipped { transform: rotateY(180deg); }
            .rev-hint { font-size: 10px; color: #6366f1; margin-top: 4px; }
            .rev-name { font-weight: 800; font-size: 13px; margin-bottom: 4px; }
            .rev-desc { font-size: 11px; opacity: .9; }
            .reveal-grid { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 20px; }

            /* Drag & drop */
            .drag-bank { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; min-height: 44px; padding: 10px; background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 10px; }
            .chip { padding: 8px 16px; background: #4F46E5; color: white; border-radius: 20px; font-size: 13px; font-weight: 700; cursor: grab; user-select: none; }
            .chip:active { cursor: grabbing; opacity: .8; }
            .drop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; margin-bottom: 20px; }
            .drop-zone { border: 2px dashed #94a3b8; border-radius: 12px; padding: 12px 8px; min-height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; transition: all .2s; background: #f8fafc; }
            .drop-zone.over { border-color: #6366f1; background: #eef2ff; }
            .drop-zone.correct { border-color: #22c55e; background: #dcfce7; }
            .drop-zone.wrong { border-color: #ef4444; background: #fee2e2; }
            .drop-label { font-size: 11px; color: #64748b; font-weight: 600; }

            /* Quiz */
            .section-label { font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #6366f1; margin: 24px 0 12px; padding-bottom: 6px; border-bottom: 2px solid #e0e7ff; }
            .qcard { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
            .qnum { font-size: 11px; font-weight: 800; color: #6366f1; margin-bottom: 6px; }
            .qtext { font-weight: 700; font-size: 14px; color: #1e1b4b; margin-bottom: 12px; }
            .qopts { display: flex; flex-wrap: wrap; gap: 8px; }
            .qopt { padding: 8px 14px; border: 2px solid #c7d2fe; border-radius: 8px; background: white; font-size: 13px; font-weight: 600; cursor: pointer; transition: all .15s; color: #312e81; }
            .qopt:hover:not(:disabled) { border-color: #6366f1; background: #eef2ff; }
            .qopt.correct { background: #dcfce7; border-color: #22c55e; color: #166534; }
            .qopt.wrong { background: #fee2e2; border-color: #ef4444; color: #991b1b; }
            .qfb { font-size: 12px; font-weight: 700; margin-top: 8px; min-height: 18px; }
            .score-box { background: linear-gradient(135deg,#4F46E5,#7c3aed); color: white; border-radius: 16px; padding: 24px; text-align: center; margin-top: 16px; }
            .score-stars { font-size: 28px; margin-bottom: 8px; }
            .score-val { font-size: 22px; font-weight: 900; }
            .score-msg { font-size: 13px; opacity: .85; margin-top: 4px; }
            .retry-btn { margin-top: 14px; padding: 8px 22px; background: white; color: #4F46E5; border: none; border-radius: 20px; font-weight: 800; font-size: 13px; cursor: pointer; }
            .done-banner { background: linear-gradient(135deg,#22c55e,#16a34a); color: white; border-radius: 14px; padding: 20px 24px; text-align: center; margin-top: 24px; }
            .done-banner h3 { margin: 0 0 6px; font-size: 1.2rem; font-weight: 800; }
            .done-banner p { margin: 0; opacity: .9; font-size: 13px; }
            .reading-block { display: flex; gap: 16px; align-items: flex-start; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 10px; }
            .reading-icon { flex-shrink: 0; }
            .reading-heading { font-weight: 800; font-size: 14px; color: #1e1b4b; margin-bottom: 4px; }
            .reading-body { font-size: 13px; color: #475569; line-height: 1.6; }
            .wrap { padding: 4px 0; }
          `}</style>
          <div
            className="lesson-html-content"
            style={{ padding: 0 }}
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
          <script dangerouslySetInnerHTML={{ __html: `
            (function() {
              // Quiz handler
              window.qans = function(cardId, btn, isCorrect) {
                var card = document.getElementById(cardId);
                if (!card) return;
                var opts = card.querySelectorAll('.qopt');
                opts.forEach(function(o) { o.disabled = true; });
                btn.classList.add(isCorrect ? 'correct' : 'wrong');
                if (!isCorrect) {
                  opts.forEach(function(o) {
                    if (o.onclick && o.onclick.toString().includes(',true)')) o.classList.add('correct');
                  });
                }
                var fb = document.getElementById(cardId + '-fb');
                if (fb) { fb.textContent = isCorrect ? '✅ Correct!' : '❌ Not quite — try again next time!'; fb.style.color = isCorrect ? '#166534' : '#991b1b'; }
                // Check if all questions in the quiz are answered
                var wrapId = cardId.replace(/q(\\d+)_\\d+/, 'quiz-wrap-$1');
                var wrap = document.getElementById(wrapId);
                if (wrap) {
                  var allCards = wrap.querySelectorAll('.qcard');
                  var allAnswered = true;
                  allCards.forEach(function(c) {
                    var btns = c.querySelectorAll('.qopt');
                    var answered = false;
                    btns.forEach(function(b) { if (b.disabled) answered = true; });
                    if (!answered) allAnswered = false;
                  });
                  if (allAnswered) {
                    var numMatch = wrapId.match(/quiz-wrap-(\\d+)/);
                    if (numMatch) showScore(numMatch[1], allCards.length);
                  }
                }
              };

              function showScore(n, total) {
                var scoreBox = document.getElementById('score-' + n);
                if (!scoreBox) return;
                var correct = 0;
                var wrap = document.getElementById('quiz-wrap-' + n);
                if (wrap) {
                  wrap.querySelectorAll('.qopt.correct').forEach(function() { correct++; });
                }
                var pct = Math.round((correct / total) * 100);
                var stars = pct === 100 ? '⭐⭐⭐' : pct >= 66 ? '⭐⭐' : '⭐';
                document.getElementById('stars-' + n).textContent = stars;
                document.getElementById('sval-' + n).textContent = correct + ' / ' + total + ' correct (' + pct + '%)';
                var msgEl = document.getElementById('smsg-' + n);
                if (msgEl) msgEl.textContent = pct === 100 ? 'Perfect score! Amazing work! 🎉' : pct >= 66 ? 'Great job! Keep it up!' : 'Good try! Review and try again.';
                scoreBox.style.display = 'block';
              }

              window.retryQuiz = function(n, total) {
                var wrap = document.getElementById('quiz-wrap-' + n);
                if (!wrap) return;
                wrap.querySelectorAll('.qopt').forEach(function(btn) {
                  btn.disabled = false;
                  btn.classList.remove('correct', 'wrong');
                });
                wrap.querySelectorAll('.qfb').forEach(function(fb) { fb.textContent = ''; });
                var scoreBox = document.getElementById('score-' + n);
                if (scoreBox) scoreBox.style.display = 'none';
              };

              // Drag & drop
              var draggedVal = null;
              document.addEventListener('dragstart', function(e) {
                if (e.target.classList.contains('chip')) { draggedVal = e.target.dataset.val; e.target.style.opacity = '.5'; }
              });
              document.addEventListener('dragend', function(e) {
                if (e.target.classList.contains('chip')) e.target.style.opacity = '1';
              });
              window.dov = function(e) { e.preventDefault(); e.currentTarget.classList.add('over'); };
              window.dlv = function(e) { e.currentTarget.classList.remove('over'); };
              window.dop = function(e) {
                e.preventDefault();
                var zone = e.currentTarget;
                zone.classList.remove('over');
                if (!draggedVal) return;
                var correct = zone.dataset.answer === draggedVal;
                zone.classList.add(correct ? 'correct' : 'wrong');
                setTimeout(function() { if (!correct) zone.classList.remove('wrong'); }, 800);
              };
            })();
          ` }} />
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