import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Plus, Trash2, ChevronUp, ChevronDown, Save, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const LESSON_TYPES = ["reading", "video", "quiz", "activity", "project"];

export default function CourseBuilder() {
  const { id } = useParams();
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(null);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [editingLesson, setEditingLesson] = useState(null);

  useEffect(() => {
    const load = async () => {
      const [m, l] = await Promise.all([
        base44.entities.Module.filter({ course_id: id }, "order"),
        base44.entities.Lesson.filter({ course_id: id }, "order"),
      ]);
      setModules(m);
      setLessons(l);
      setLoading(false);
    };
    load();
  }, [id]);

  const addModule = async () => {
    if (!newModuleTitle.trim()) return;
    setSaving(true);
    const m = await base44.entities.Module.create({
      course_id: id,
      title: newModuleTitle,
      order: modules.length + 1,
    });
    setModules(prev => [...prev, m]);
    setNewModuleTitle("");
    setSaving(false);
    toast({ title: "Module added!" });
  };

  const addLesson = async (moduleId) => {
    const modLessons = lessons.filter(l => l.module_id === moduleId);
    const l = await base44.entities.Lesson.create({
      module_id: moduleId,
      course_id: id,
      title: "New Lesson",
      type: "reading",
      order: modLessons.length + 1,
      is_published: false,
    });
    setLessons(prev => [...prev, l]);
    setEditingLesson(l.id);
  };

  const updateLesson = async (lessonId, data) => {
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, ...data } : l));
    await base44.entities.Lesson.update(lessonId, data);
  };

  const deleteLesson = async (lessonId) => {
    await base44.entities.Lesson.delete(lessonId);
    setLessons(prev => prev.filter(l => l.id !== lessonId));
    if (editingLesson === lessonId) setEditingLesson(null);
  };

  const deleteModule = async (moduleId) => {
    const modLessons = lessons.filter(l => l.module_id === moduleId);
    for (const l of modLessons) await base44.entities.Lesson.delete(l.id);
    await base44.entities.Module.delete(moduleId);
    setModules(prev => prev.filter(m => m.id !== moduleId));
    setLessons(prev => prev.filter(l => l.module_id !== moduleId));
    toast({ title: "Module deleted" });
  };

  const generateAIContent = async (lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    setAiLoading(lessonId);
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Write engaging educational content for a lesson titled "${lesson.title}" of type "${lesson.type}". Make it appropriate for Grade 1–12 students learning practical tech skills. Include clear explanations, examples, and activities. Keep it structured and encouraging. Return as plain text.`,
    });
    await updateLesson(lessonId, { content: result });
    setAiLoading(null);
    toast({ title: "✨ AI content generated!" });
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/courses/${id}`)} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-poppins font-bold text-xl text-foreground">Lesson Builder</h1>
            <p className="text-muted-foreground text-sm">Add modules and lessons to your course</p>
          </div>
        </div>
      </div>

      {/* Add Module */}
      <Card className="p-5 border-dashed border-2 border-primary/30 bg-primary/5">
        <p className="font-poppins font-semibold text-sm text-foreground mb-3">Add New Module</p>
        <div className="flex gap-3">
          <Input
            value={newModuleTitle}
            onChange={e => setNewModuleTitle(e.target.value)}
            placeholder="e.g., Introduction to 3D Printing"
            className="flex-1 text-sm"
            onKeyDown={e => e.key === "Enter" && addModule()}
          />
          <Button onClick={addModule} disabled={saving || !newModuleTitle.trim()} className="bg-primary text-white rounded-xl gap-2">
            <Plus size={15} /> Add
          </Button>
        </div>
      </Card>

      {/* Modules */}
      {modules.map((mod, modIdx) => {
        const modLessons = lessons.filter(l => l.module_id === mod.id);
        return (
          <Card key={mod.id} className="overflow-hidden border-border/60 shadow-sm">
            <div className="flex items-center justify-between p-4 bg-muted/30 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-white font-poppins font-bold text-xs flex items-center justify-center">
                  {modIdx + 1}
                </div>
                <p className="font-poppins font-semibold text-sm">{mod.title}</p>
                <span className="text-xs text-muted-foreground">{modLessons.length} lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={() => deleteModule(mod.id)} className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>

            <div className="divide-y divide-border/30">
              {modLessons.map(lesson => (
                <div key={lesson.id} className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <Input
                        value={lesson.title}
                        onChange={e => updateLesson(lesson.id, { title: e.target.value })}
                        placeholder="Lesson title"
                        className="text-sm"
                      />
                      <Select value={lesson.type} onValueChange={val => updateLesson(lesson.id, { type: val })}>
                        <SelectTrigger className="text-sm h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LESSON_TYPES.map(t => (
                            <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        value={lesson.duration_minutes || ""}
                        onChange={e => updateLesson(lesson.id, { duration_minutes: parseInt(e.target.value) || 0 })}
                        placeholder="Duration (min)"
                        className="text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => generateAIContent(lesson.id)}
                        disabled={aiLoading === lesson.id}
                        className="gap-1.5 text-xs h-8 border-primary/30 text-primary hover:bg-primary/5"
                      >
                        {aiLoading === lesson.id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                        AI
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingLesson(editingLesson === lesson.id ? null : lesson.id)} className="h-8 text-xs">
                        {editingLesson === lesson.id ? "Collapse" : "Edit"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteLesson(lesson.id)} className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0">
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </div>

                  {editingLesson === lesson.id && (
                    <div className="space-y-3 pt-2">
                      {lesson.type === "video" && (
                        <Input
                          value={lesson.video_url || ""}
                          onChange={e => updateLesson(lesson.id, { video_url: e.target.value })}
                          placeholder="Video URL (YouTube embed URL)"
                          className="text-sm"
                        />
                      )}
                      <Textarea
                        value={lesson.content || ""}
                        onChange={e => updateLesson(lesson.id, { content: e.target.value })}
                        placeholder="Lesson content, instructions, or description..."
                        className="min-h-[120px] text-sm"
                      />
                    </div>
                  )}
                </div>
              ))}

              <div className="p-3">
                <button
                  onClick={() => addLesson(mod.id)}
                  className="flex items-center gap-2 text-primary text-sm font-medium hover:bg-primary/5 px-3 py-2 rounded-xl transition-colors w-full"
                >
                  <Plus size={14} /> Add Lesson
                </button>
              </div>
            </div>
          </Card>
        );
      })}

      {modules.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">Add your first module above to start building your course.</p>
        </div>
      )}
    </div>
  );
}