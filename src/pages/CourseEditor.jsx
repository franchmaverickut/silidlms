import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Save, Sparkles, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const SKILL_AREAS = ["3D Printing", "Prompt Engineering", "AI Literacy", "Robotics", "Coding", "Digital Creativity", "Other"];
const GRADE_OPTIONS = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

export default function CourseEditor() {
  const { id } = useParams();
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = id === "new";

  const [form, setForm] = useState({
    title: "", description: "", skill_area: "Coding", grade_levels: [],
    difficulty: "Beginner", duration_hours: "", status: "draft",
    thumbnail_url: "", learning_objectives: [], materials_required: [], tags: [],
  });
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newObjective, setNewObjective] = useState("");
  const [newMaterial, setNewMaterial] = useState("");
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      base44.entities.Course.filter({ id }).then(r => {
        if (r[0]) setForm({ ...r[0] });
        setLoading(false);
      });
    }
  }, [id, isNew]);

  const handleSave = async (status) => {
    setSaving(true);
    const data = { ...form, status: status || form.status, teacher_id: user?.id };
    if (isNew) {
      const c = await base44.entities.Course.create(data);
      toast({ title: "Course created!", description: "Start adding modules in the builder." });
      navigate(`/courses/${c.id}/builder`);
    } else {
      await base44.entities.Course.update(id, data);
      toast({ title: "Saved!" });
    }
    setSaving(false);
  };

  const generateWithAI = async () => {
    if (!form.title) { toast({ title: "Add a title first" }); return; }
    setAiLoading(true);
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Create a detailed course description for a tech skills course titled "${form.title}" for Grade 1–12 students in the area of "${form.skill_area}". Include: 1) A compelling 2-3 sentence description, 2) 4-5 specific learning objectives, 3) Required materials list. Format as JSON with keys: description (string), learning_objectives (array of strings), materials_required (array of strings).`,
      response_json_schema: {
        type: "object",
        properties: {
          description: { type: "string" },
          learning_objectives: { type: "array", items: { type: "string" } },
          materials_required: { type: "array", items: { type: "string" } },
        }
      }
    });
    setForm(prev => ({
      ...prev,
      description: result.description || prev.description,
      learning_objectives: result.learning_objectives || prev.learning_objectives,
      materials_required: result.materials_required || prev.materials_required,
    }));
    setAiLoading(false);
    toast({ title: "✨ AI suggestions applied!" });
  };

  const handleThumbnail = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(prev => ({ ...prev, thumbnail_url: file_url }));
    setUploading(false);
  };

  const toggleGrade = (grade) => {
    setForm(prev => ({
      ...prev,
      grade_levels: prev.grade_levels?.includes(grade)
        ? prev.grade_levels.filter(g => g !== grade)
        : [...(prev.grade_levels || []), grade],
    }));
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setForm(prev => ({ ...prev, learning_objectives: [...(prev.learning_objectives || []), newObjective.trim()] }));
      setNewObjective("");
    }
  };

  const addMaterial = () => {
    if (newMaterial.trim()) {
      setForm(prev => ({ ...prev, materials_required: [...(prev.materials_required || []), newMaterial.trim()] }));
      setNewMaterial("");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/courses")} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-poppins font-bold text-xl">{isNew ? "Create New Course" : "Edit Course"}</h1>
            <p className="text-muted-foreground text-sm">Fill in the course details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave("draft")} disabled={saving} className="rounded-xl text-sm">
            Save Draft
          </Button>
          <Button onClick={() => handleSave("published")} disabled={saving} className="bg-primary text-white rounded-xl gap-2 text-sm shadow-lg shadow-primary/20">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Publish
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="grid gap-5">
        <Card className="p-5 border-border/60 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-poppins font-semibold text-sm">Basic Info</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={generateWithAI}
              disabled={aiLoading}
              className="gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary/5"
            >
              {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              AI Assist
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Course Title *</label>
            <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g., Introduction to 3D Printing for Beginners" className="text-sm" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Description</label>
            <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="What will students learn?" className="min-h-[100px] text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Skill Area *</label>
              <Select value={form.skill_area} onValueChange={v => setForm(p => ({ ...p, skill_area: v }))}>
                <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>{SKILL_AREAS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Difficulty</label>
              <Select value={form.difficulty} onValueChange={v => setForm(p => ({ ...p, difficulty: v }))}>
                <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>{DIFFICULTIES.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Duration (hours)</label>
            <Input type="number" value={form.duration_hours} onChange={e => setForm(p => ({ ...p, duration_hours: parseFloat(e.target.value) || "" }))} placeholder="e.g., 4" className="text-sm w-40" />
          </div>
        </Card>

        {/* Thumbnail */}
        <Card className="p-5 border-border/60">
          <h2 className="font-poppins font-semibold text-sm mb-3">Course Thumbnail</h2>
          {form.thumbnail_url ? (
            <div className="relative w-full h-40 rounded-xl overflow-hidden">
              <img src={form.thumbnail_url} alt="thumbnail" className="w-full h-full object-cover" />
              <button onClick={() => setForm(p => ({ ...p, thumbnail_url: "" }))} className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70">
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center gap-2 p-8 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors">
              {uploading ? <Loader2 size={20} className="animate-spin text-primary" /> : <Upload size={20} className="text-muted-foreground" />}
              <span className="text-sm text-muted-foreground">{uploading ? "Uploading..." : "Click to upload thumbnail"}</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleThumbnail} />
            </label>
          )}
        </Card>

        {/* Grade Levels */}
        <Card className="p-5 border-border/60">
          <h2 className="font-poppins font-semibold text-sm mb-3">Target Grade Levels</h2>
          <div className="flex flex-wrap gap-2">
            {GRADE_OPTIONS.map(g => (
              <button
                key={g}
                onClick={() => toggleGrade(g)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  form.grade_levels?.includes(g)
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </Card>

        {/* Learning Objectives */}
        <Card className="p-5 border-border/60">
          <h2 className="font-poppins font-semibold text-sm mb-3">Learning Objectives</h2>
          <ul className="space-y-2 mb-3">
            {form.learning_objectives?.map((obj, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                <span className="flex-1">{obj}</span>
                <button onClick={() => setForm(p => ({ ...p, learning_objectives: p.learning_objectives.filter((_, idx) => idx !== i) }))} className="text-muted-foreground hover:text-destructive">
                  <X size={13} />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <Input value={newObjective} onChange={e => setNewObjective(e.target.value)} placeholder="Add a learning objective" className="text-sm" onKeyDown={e => e.key === "Enter" && addObjective()} />
            <Button size="sm" onClick={addObjective} variant="outline" className="rounded-xl">Add</Button>
          </div>
        </Card>

        {/* Materials */}
        <Card className="p-5 border-border/60">
          <h2 className="font-poppins font-semibold text-sm mb-3">Required Materials</h2>
          <ul className="space-y-2 mb-3">
            {form.materials_required?.map((mat, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="flex-1">{mat}</span>
                <button onClick={() => setForm(p => ({ ...p, materials_required: p.materials_required.filter((_, idx) => idx !== i) }))} className="text-muted-foreground hover:text-destructive">
                  <X size={13} />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <Input value={newMaterial} onChange={e => setNewMaterial(e.target.value)} placeholder="e.g., 3D printer, computer" className="text-sm" onKeyDown={e => e.key === "Enter" && addMaterial()} />
            <Button size="sm" onClick={addMaterial} variant="outline" className="rounded-xl">Add</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}