import { useState, useEffect, useRef } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  Clock, Layers, ChevronLeft, Play, Box, Download, FileText,
  Image as ImageIcon, Wrench, Cpu, Package, ListChecks, Upload,
  CheckCircle2, Send, Star, AlertCircle, Printer, FileArchive, File
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import STLViewer from "@/components/maker/STLViewer";
import BuildStepCard from "@/components/maker/BuildStepCard";

const difficultyColors = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-red-100 text-red-700",
};

const categoryGroups = [
  { key: "material", label: "Materials", icon: Package },
  { key: "electronic", label: "Electronics", icon: Cpu },
  { key: "tool", label: "Tools", icon: Wrench },
  { key: "other", label: "Other", icon: Package },
];

function fileIcon(type) {
  if (!type) return File;
  if (type.includes("stl") || type.includes("glb")) return Box;
  if (type.includes("pdf")) return FileText;
  if (type.includes("zip")) return FileArchive;
  if (type.includes("image") || type.includes("png") || type.includes("jpg")) return ImageIcon;
  return File;
}

export default function MakerLessonViewer() {
  const { id } = useParams();
  const { user } = useOutletContext();
  const { toast } = useToast();
  const [lesson, setLesson] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview");
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [reflectionAnswers, setReflectionAnswers] = useState([]);
  const [outputFiles, setOutputFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      const [l, subs] = await Promise.all([
        base44.entities.MakerLesson.filter({ id }, "-created_date", 1).catch(() => []),
        user ? base44.entities.MakerSubmission.filter({ lesson_id: id, student_id: user.id }, "-created_date", 1).catch(() => []) : [],
      ]);
      const lessonData = l[0] || null;
      setLesson(lessonData);
      const sub = subs[0] || null;
      setSubmission(sub);
      if (sub) {
        setStarted(true);
        setReflectionAnswers(sub.reflection_answers || []);
      } else {
        setReflectionAnswers((lessonData?.reflection_questions || []).map(() => ""));
      }
      setLoading(false);
    };
    load();
  }, [id, user]);

  const handleStart = async () => {
    if (!submission) {
      const sub = await base44.entities.MakerSubmission.create({
        lesson_id: id,
        student_id: user.id,
        student_name: user.full_name,
        completed_steps: [],
        status: "in_progress",
      });
      setSubmission(sub);
    }
    setStarted(true);
    setTab("steps");
  };

  const handleMarkStep = async (stepId) => {
    const current = submission?.completed_steps || [];
    if (current.includes(stepId)) return;
    const updated = [...current, stepId];
    const updatedSub = await base44.entities.MakerSubmission.update(submission.id, {
      completed_steps: updated,
    });
    setSubmission(updatedSub);
    const total = lesson?.steps?.length || 1;
    const progress = Math.round((updated.length / total) * 100);
    toast({ title: progress === 100 ? "🎉 All steps done! Now submit your project." : `Step done! ${updated.length}/${total} complete` });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const urls = [];
    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      urls.push(file_url);
    }
    setOutputFiles(prev => [...prev, ...urls]);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const updatedSub = await base44.entities.MakerSubmission.update(submission.id, {
      status: "submitted",
      reflection_answers: reflectionAnswers,
      output_files: [...(submission.output_files || []), ...outputFiles],
      submitted_date: new Date().toISOString().split("T")[0],
    });
    setSubmission(updatedSub);
    setSubmitting(false);
    toast({ title: "Project submitted!", description: "Your teacher will review your work soon." });
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
  if (!lesson) return (
    <div className="text-center py-24">
      <p className="text-muted-foreground">Lesson not found.</p>
    </div>
  );

  const completedSteps = submission?.completed_steps || [];
  const totalSteps = lesson.steps?.length || 0;
  const progressPct = totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0;
  const allStepsDone = totalSteps > 0 && completedSteps.length >= totalSteps;
  const isSubmitted = submission?.status === "submitted" || submission?.status === "reviewed" || submission?.status === "graded";
  const allImages = [lesson.hero_image_url, ...(lesson.gallery_images || [])].filter(Boolean);
  const activeStepIdx = lesson.steps?.findIndex(s => !completedSteps.includes(s.id)) ?? 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Back */}
      <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ChevronLeft size={16} /> Back to Maker Lessons
      </Link>

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[280px] bg-gradient-to-br from-primary to-orange-400 shadow-xl shadow-primary/20">
        {(lesson.hero_image_url || lesson.thumbnail_url) && (
          <img
            src={lesson.hero_image_url || lesson.thumbnail_url}
            alt={lesson.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
              {lesson.skill_area}
            </span>
            {lesson.difficulty && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[lesson.difficulty]}`}>
                {lesson.difficulty}
              </span>
            )}
          </div>
          <div>
            <h1 className="font-poppins font-bold text-2xl md:text-4xl text-white leading-tight">{lesson.title}</h1>
            {lesson.description && (
              <p className="text-orange-100 mt-2 max-w-xl text-sm md:text-base">{lesson.description}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-4 text-white/80 text-sm">
            {lesson.estimated_minutes && (
              <span className="flex items-center gap-1.5"><Clock size={15} /> {lesson.estimated_minutes} min</span>
            )}
            {totalSteps > 0 && (
              <span className="flex items-center gap-1.5"><Layers size={15} /> {totalSteps} steps</span>
            )}
          </div>

          {/* Progress bar if started */}
          {started && totalSteps > 0 && (
            <div className="max-w-sm">
              <div className="flex justify-between text-xs text-white/80 mb-1">
                <span>Build Progress</span>
                <span className="font-bold">{progressPct}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          )}

          {!started && (
            <Button
              onClick={handleStart}
              className="mt-2 bg-white text-primary hover:bg-orange-50 font-bold rounded-xl px-8 py-3 text-base shadow-lg w-fit gap-2"
            >
              <Play size={18} /> Start Build
            </Button>
          )}
          {started && !isSubmitted && (
            <Button
              onClick={() => setTab("steps")}
              className="mt-2 bg-white text-primary hover:bg-orange-50 font-bold rounded-xl px-6 py-2 text-sm w-fit gap-2"
            >
              <Layers size={16} /> Continue Build
            </Button>
          )}
          {isSubmitted && (
            <div className="flex items-center gap-2 mt-2 text-white font-semibold">
              <CheckCircle2 size={18} /> Project Submitted!
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-muted h-auto flex-wrap gap-1 p-1.5">
          <TabsTrigger value="overview" className="gap-1.5 text-xs rounded-lg">Overview</TabsTrigger>
          <TabsTrigger value="media" className="gap-1.5 text-xs rounded-lg"><ImageIcon size={12} /> Media</TabsTrigger>
          <TabsTrigger value="materials" className="gap-1.5 text-xs rounded-lg"><Package size={12} /> Materials</TabsTrigger>
          <TabsTrigger value="steps" className="gap-1.5 text-xs rounded-lg"><ListChecks size={12} /> Build Steps</TabsTrigger>
          <TabsTrigger value="files" className="gap-1.5 text-xs rounded-lg"><Download size={12} /> Files</TabsTrigger>
          <TabsTrigger value="submit" className="gap-1.5 text-xs rounded-lg"><Send size={12} /> Submit</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-5 space-y-5">
          {lesson.overview_html && (
            <Card className="p-6 border-border/60 shadow-sm">
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: lesson.overview_html }} />
            </Card>
          )}
          {!lesson.overview_html && lesson.description && (
            <Card className="p-6 border-border/60 shadow-sm">
              <p className="text-sm text-foreground leading-relaxed">{lesson.description}</p>
            </Card>
          )}
          {lesson.learning_objectives?.length > 0 && (
            <Card className="p-6 border-border/60 shadow-sm">
              <h3 className="font-poppins font-bold text-sm mb-4 flex items-center gap-2">
                <Star size={15} className="text-primary" /> What You'll Learn
              </h3>
              <ul className="space-y-2">
                {lesson.learning_objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 size={15} className="text-secondary flex-shrink-0 mt-0.5" />
                    {obj}
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {lesson.model_3d_url && (
            <Card className="p-6 border-border/60 shadow-sm">
              <h3 className="font-poppins font-bold text-sm mb-4 flex items-center gap-2">
                <Box size={15} className="text-primary" /> 3D Model Preview
              </h3>
              <STLViewer url={lesson.model_3d_url} height={360} />
            </Card>
          )}
        </TabsContent>

        {/* Media */}
        <TabsContent value="media" className="mt-5 space-y-5">
          {allImages.length > 0 && (
            <Card className="p-5 border-border/60 shadow-sm">
              <h3 className="font-poppins font-bold text-sm mb-4 flex items-center gap-2">
                <ImageIcon size={15} className="text-primary" /> Project Gallery
              </h3>
              <div className="rounded-2xl overflow-hidden mb-3 aspect-video bg-muted">
                <img src={allImages[galleryIdx]} alt="" className="w-full h-full object-cover" />
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIdx(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === galleryIdx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </Card>
          )}
          {lesson.video_url && (
            <Card className="p-5 border-border/60 shadow-sm">
              <h3 className="font-poppins font-bold text-sm mb-4 flex items-center gap-2">
                <Play size={15} className="text-primary" /> Project Video
              </h3>
              <div className="rounded-2xl overflow-hidden aspect-video bg-black">
                <iframe
                  src={lesson.video_url.replace("watch?v=", "embed/")}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>
          )}
          {lesson.model_3d_url && (
            <Card className="p-5 border-border/60 shadow-sm">
              <h3 className="font-poppins font-bold text-sm mb-4 flex items-center gap-2">
                <Box size={15} className="text-primary" /> Interactive 3D Model
              </h3>
              <STLViewer url={lesson.model_3d_url} height={380} />
            </Card>
          )}
        </TabsContent>

        {/* Materials */}
        <TabsContent value="materials" className="mt-5 space-y-4">
          {lesson.materials?.length === 0 || !lesson.materials ? (
            <Card className="p-8 text-center border-dashed">
              <Package className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">No materials listed for this lesson.</p>
            </Card>
          ) : (
            categoryGroups.map(group => {
              const items = (lesson.materials || []).filter(m => m.category === group.key);
              if (!items.length) return null;
              const GroupIcon = group.icon;
              return (
                <Card key={group.key} className="p-5 border-border/60 shadow-sm">
                  <h3 className="font-poppins font-bold text-sm mb-4 flex items-center gap-2">
                    <GroupIcon size={15} className="text-primary" /> {group.label}
                  </h3>
                  <div className="space-y-2">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-border/60 flex-shrink-0" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                        <span className="font-medium text-sm flex-1">{item.name}</span>
                        {item.quantity && (
                          <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full border">{item.quantity}</span>
                        )}
                        {item.notes && (
                          <span className="text-xs text-muted-foreground">{item.notes}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* Build Steps */}
        <TabsContent value="steps" className="mt-5 space-y-4">
          {!started && (
            <Card className="p-8 text-center border-dashed">
              <Layers className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
              <h3 className="font-poppins font-semibold text-foreground">Ready to start building?</h3>
              <p className="text-muted-foreground text-sm mt-1 mb-4">Click Start Build to begin tracking your progress.</p>
              <Button onClick={handleStart} className="bg-primary text-white rounded-xl gap-2">
                <Play size={16} /> Start Build
              </Button>
            </Card>
          )}
          {started && (
            <>
              {/* Progress summary */}
              <Card className="p-4 border-border/60 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-poppins font-semibold text-sm">Build Progress</p>
                  <span className="text-primary font-bold text-sm">{completedSteps.length} / {totalSteps} steps</span>
                </div>
                <Progress value={progressPct} className="h-2" />
                {allStepsDone && !isSubmitted && (
                  <p className="text-secondary text-xs font-semibold mt-2 flex items-center gap-1">
                    <CheckCircle2 size={13} /> All steps done! Go to Submit to finish your project.
                  </p>
                )}
              </Card>

              {lesson.steps?.length === 0 || !lesson.steps ? (
                <Card className="p-8 text-center border-dashed">
                  <p className="text-muted-foreground text-sm">No build steps added yet.</p>
                </Card>
              ) : (
                lesson.steps.map((step, i) => (
                  <BuildStepCard
                    key={step.id || i}
                    step={step}
                    index={i}
                    isCompleted={completedSteps.includes(step.id)}
                    onMarkDone={() => handleMarkStep(step.id)}
                    isActive={i === activeStepIdx && !completedSteps.includes(step.id)}
                  />
                ))
              )}
            </>
          )}
        </TabsContent>

        {/* Files */}
        <TabsContent value="files" className="mt-5">
          {lesson.files?.length === 0 || !lesson.files ? (
            <Card className="p-8 text-center border-dashed">
              <Download className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">No files available for this lesson.</p>
            </Card>
          ) : (
            <Card className="divide-y divide-border/40 border-border/60 shadow-sm overflow-hidden">
              {lesson.files.map((file, i) => {
                const FIcon = fileIcon(file.type);
                return (
                  <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/20 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FIcon size={18} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.type?.toUpperCase()} {file.size_kb && `• ${file.size_kb < 1024 ? `${file.size_kb} KB` : `${(file.size_kb / 1024).toFixed(1)} MB`}`}
                      </p>
                    </div>
                    {file.url && (
                      <a href={file.url} target="_blank" rel="noopener noreferrer" download>
                        <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs">
                          <Download size={12} /> Download
                        </Button>
                      </a>
                    )}
                  </div>
                );
              })}
            </Card>
          )}
        </TabsContent>

        {/* Submit */}
        <TabsContent value="submit" className="mt-5 space-y-5">
          {isSubmitted ? (
            <Card className="p-8 text-center border-secondary/30 bg-secondary/5 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-poppins font-bold text-lg text-foreground">Project Submitted!</h3>
              <p className="text-muted-foreground text-sm mt-1">Your teacher will review your work soon.</p>
              {submission?.feedback && (
                <div className="mt-5 p-4 bg-background border rounded-xl text-left">
                  <p className="font-semibold text-xs text-muted-foreground mb-1">Teacher Feedback</p>
                  <p className="text-sm text-foreground">{submission.feedback}</p>
                  {submission.grade && (
                    <p className="font-bold text-primary mt-2">Grade: {submission.grade}</p>
                  )}
                </div>
              )}
            </Card>
          ) : (
            <>
              {!started && (
                <Card className="p-6 text-center border-dashed">
                  <AlertCircle className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">Start the lesson first before submitting.</p>
                </Card>
              )}
              {started && (
                <>
                  {lesson.submission_prompt && (
                    <Card className="p-5 border-border/60 shadow-sm">
                      <p className="font-poppins font-semibold text-sm mb-1">Project Challenge</p>
                      <p className="text-sm text-muted-foreground">{lesson.submission_prompt}</p>
                    </Card>
                  )}

                  {/* Upload outputs */}
                  <Card className="p-5 border-border/60 shadow-sm space-y-3">
                    <h3 className="font-poppins font-bold text-sm flex items-center gap-2">
                      <Upload size={15} className="text-primary" /> Upload Your Work
                    </h3>
                    <p className="text-xs text-muted-foreground">Upload photos, STL files, or documents showing your completed project.</p>
                    <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileUpload} />
                    <Button variant="outline" className="rounded-xl gap-2 text-sm" onClick={() => fileInputRef.current?.click()}>
                      <Upload size={14} /> Choose Files
                    </Button>
                    {outputFiles.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {outputFiles.map((url, i) => (
                          <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary text-xs rounded-full font-medium">
                            <CheckCircle2 size={12} /> File {i + 1} uploaded
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>

                  {/* Reflection questions */}
                  {lesson.reflection_questions?.length > 0 && (
                    <Card className="p-5 border-border/60 shadow-sm space-y-4">
                      <h3 className="font-poppins font-bold text-sm flex items-center gap-2">
                        <Star size={15} className="text-primary" /> Reflection Questions
                      </h3>
                      {lesson.reflection_questions.map((q, i) => (
                        <div key={i} className="space-y-2">
                          <p className="text-sm font-medium text-foreground">{i + 1}. {q}</p>
                          <Textarea
                            value={reflectionAnswers[i] || ""}
                            onChange={e => {
                              const updated = [...reflectionAnswers];
                              updated[i] = e.target.value;
                              setReflectionAnswers(updated);
                            }}
                            placeholder="Write your answer..."
                            className="min-h-[80px] text-sm rounded-xl"
                          />
                        </div>
                      ))}
                    </Card>
                  )}

                  <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full bg-primary text-white rounded-xl gap-2 font-bold text-base py-5 shadow-lg shadow-primary/20"
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    Submit Project
                  </Button>
                </>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}