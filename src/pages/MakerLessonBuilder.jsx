import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  Save, ArrowLeft, Plus, Trash2, Upload, Box, Image as ImageIcon,
  Layers, Package, FileText, Send, Eye, Loader2, Globe, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import StepEditor from "@/components/maker/StepEditor";
import MaterialEditor from "@/components/maker/MaterialEditor";
import STLViewer from "@/components/maker/STLViewer";

const GRADE_LEVELS = ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"];
const SKILL_AREAS = ["3D Printing","Robotics","Prompt Engineering","Coding","Electronics","Digital Creativity","Other"];

const emptyLesson = {
  title: "",
  description: "",
  skill_area: "3D Printing",
  difficulty: "Beginner",
  estimated_minutes: 60,
  grade_levels: [],
  status: "draft",
  thumbnail_url: "",
  hero_image_url: "",
  gallery_images: [],
  video_url: "",
  model_3d_url: "",
  overview_html: "",
  learning_objectives: [],
  materials: [],
  steps: [],
  files: [],
  submission_prompt: "",
  reflection_questions: [],
  tags: [],
};

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function MakerLessonBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const { toast } = useToast();
  const isNew = !id || id === "new";

  const [lesson, setLesson] = useState({ ...emptyLesson });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("basics");
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileUploadRef = useRef(null);

  useEffect(() => {
    if (!isNew) {
      base44.entities.MakerLesson.list("-created_date", 200)
        .then(all => {
          const found = all.find(l => l.id === id);
          if (found) setLesson(found);
          setLoading(false);
        });
    }
  }, [id]);

  const update = (field, value) => setLesson(prev => ({ ...prev, [field]: value }));

  const handleSave = async (status) => {
    // Guard: never allow saving/overwriting is_seed_data flag via the builder
    setSaving(true);
    const { is_seed_data, ...editableData } = lesson;
    const data = status ? { ...editableData, status } : editableData;
    if (isNew) {
      const created = await base44.entities.MakerLesson.create({
        ...data,
        teacher_id: user?.id,
        is_seed_data: false,
      });
      toast({ title: "Lesson created!" });
      navigate(`/maker/${created.id}/edit`, { replace: true });
    } else {
      await base44.entities.MakerLesson.update(lesson.id, data);
      toast({ title: "Lesson saved!" });
    }
    setSaving(false);
  };

  const handleThumbnailUpload = async (e) => {
    setUploadingThumb(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file: e.target.files[0] });
    update("thumbnail_url", file_url);
    setUploadingThumb(false);
  };

  const handleHeroUpload = async (e) => {
    setUploadingHero(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file: e.target.files[0] });
    update("hero_image_url", file_url);
    setUploadingHero(false);
  };

  const handleGalleryUpload = async (e) => {
    setUploadingGallery(true);
    const files = Array.from(e.target.files);
    const urls = [];
    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      urls.push(file_url);
    }
    update("gallery_images", [...(lesson.gallery_images || []), ...urls]);
    setUploadingGallery(false);
  };

  const addStep = () => {
    const newStep = { id: generateId(), order: (lesson.steps?.length || 0) + 1, title: "", instructions: "", images: [], tip: "", warning: "", model_3d_url: "" };
    update("steps", [...(lesson.steps || []), newStep]);
  };

  const updateStep = (i, step) => {
    const steps = [...(lesson.steps || [])];
    steps[i] = step;
    update("steps", steps);
  };

  const deleteStep = (i) => update("steps", lesson.steps.filter((_, idx) => idx !== i));

  const uploadFiles = async (files) => {
    if (!files || files.length === 0) return;
    setUploadingFile(true);
    const newEntries = [];
    for (const file of Array.from(files)) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const ext = file.name.split(".").pop().toUpperCase();
      const size_kb = Math.round(file.size / 1024);
      newEntries.push({ name: file.name, url: file_url, type: ext, size_kb });
    }
    update("files", [...(lesson.files || []), ...newEntries]);
    setUploadingFile(false);
  };

  const handleFileUpload = (e) => uploadFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    uploadFiles(e.dataTransfer.files);
  };

  const addFile = () => update("files", [...(lesson.files || []), { name: "", url: "", type: "", size_kb: 0 }]);
  const updateFile = (i, field, val) => {
    const files = [...(lesson.files || [])];
    files[i] = { ...files[i], [field]: val };
    update("files", files);
  };
  const deleteFile = (i) => update("files", lesson.files.filter((_, idx) => idx !== i));

  const addObjective = () => update("learning_objectives", [...(lesson.learning_objectives || []), ""]);
  const updateObjective = (i, val) => {
    const objs = [...(lesson.learning_objectives || [])];
    objs[i] = val;
    update("learning_objectives", objs);
  };
  const deleteObjective = (i) => update("learning_objectives", lesson.learning_objectives.filter((_, idx) => idx !== i));

  const addReflection = () => update("reflection_questions", [...(lesson.reflection_questions || []), ""]);
  const updateReflection = (i, val) => {
    const qs = [...(lesson.reflection_questions || [])];
    qs[i] = val;
    update("reflection_questions", qs);
  };
  const deleteReflection = (i) => update("reflection_questions", lesson.reflection_questions.filter((_, idx) => idx !== i));

  const toggleGrade = (g) => {
    const current = lesson.grade_levels || [];
    update("grade_levels", current.includes(g) ? current.filter(x => x !== g) : [...current, g]);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-16">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-3 -mx-1 px-1">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/maker")} className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-poppins font-bold text-lg text-foreground">
              {isNew ? "New Maker Lesson" : lesson.title || "Edit Lesson"}
            </h1>
            <p className="text-xs text-muted-foreground capitalize">{lesson.status} • {lesson.skill_area}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <button
              onClick={() => navigate(`/maker/${lesson.id}`)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-xl border border-border/60 hover:border-primary/40"
            >
              <Eye size={14} /> Preview
            </button>
          )}
          {lesson.status !== "published" && (
            <Button
              onClick={() => handleSave("published")}
              disabled={saving}
              variant="outline"
              className="rounded-xl gap-1.5 text-xs border-secondary text-secondary hover:bg-secondary/10"
            >
              <Globe size={13} /> Publish
            </Button>
          )}
          {lesson.status === "published" && (
            <Button
              onClick={() => handleSave("draft")}
              disabled={saving}
              variant="outline"
              className="rounded-xl gap-1.5 text-xs"
            >
              <Lock size={13} /> Unpublish
            </Button>
          )}
          <Button onClick={() => handleSave()} disabled={saving} className="bg-primary text-white rounded-xl gap-1.5 text-sm">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-muted h-auto flex-wrap gap-1 p-1.5">
          <TabsTrigger value="basics" className="text-xs rounded-lg">Basics</TabsTrigger>
          <TabsTrigger value="media" className="text-xs rounded-lg"><ImageIcon size={12} className="mr-1" /> Media</TabsTrigger>
          <TabsTrigger value="materials" className="text-xs rounded-lg"><Package size={12} className="mr-1" /> Materials</TabsTrigger>
          <TabsTrigger value="steps" className="text-xs rounded-lg"><Layers size={12} className="mr-1" /> Build Steps</TabsTrigger>
          <TabsTrigger value="files" className="text-xs rounded-lg"><FileText size={12} className="mr-1" /> Files</TabsTrigger>
          <TabsTrigger value="submission" className="text-xs rounded-lg"><Send size={12} className="mr-1" /> Submission</TabsTrigger>
        </TabsList>

        {/* Basics */}
        <TabsContent value="basics" className="mt-5 space-y-5">
          <Card className="p-5 border-border/60 shadow-sm space-y-4">
            <h3 className="font-poppins font-bold text-sm">Lesson Info</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Title *</label>
                <Input value={lesson.title} onChange={e => update("title", e.target.value)} placeholder="e.g. Build a Robot Arm with Servos" className="rounded-xl" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Description</label>
                <Textarea value={lesson.description} onChange={e => update("description", e.target.value)} placeholder="Brief project description..." className="rounded-xl min-h-[80px]" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Skill Area</label>
                  <Select value={lesson.skill_area} onValueChange={v => update("skill_area", v)}>
                    <SelectTrigger className="rounded-xl text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>{SKILL_AREAS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Difficulty</label>
                  <Select value={lesson.difficulty} onValueChange={v => update("difficulty", v)}>
                    <SelectTrigger className="rounded-xl text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Est. Minutes</label>
                  <Input type="number" value={lesson.estimated_minutes} onChange={e => update("estimated_minutes", Number(e.target.value))} className="rounded-xl text-sm" />
                </div>
              </div>
            </div>
          </Card>

          {/* Grade levels */}
          <Card className="p-5 border-border/60 shadow-sm">
            <h3 className="font-poppins font-bold text-sm mb-3">Target Grade Levels</h3>
            <div className="flex flex-wrap gap-2">
              {GRADE_LEVELS.map(g => (
                <button
                  key={g}
                  onClick={() => toggleGrade(g)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    (lesson.grade_levels || []).includes(g)
                      ? "bg-primary text-white shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </Card>

          {/* Learning objectives */}
          <Card className="p-5 border-border/60 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-poppins font-bold text-sm">Learning Objectives</h3>
              <Button variant="ghost" size="sm" onClick={addObjective} className="gap-1 text-xs h-7 rounded-lg"><Plus size={12} /> Add</Button>
            </div>
            <div className="space-y-2">
              {(lesson.learning_objectives || []).map((obj, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={obj}
                    onChange={e => updateObjective(i, e.target.value)}
                    placeholder={`Objective ${i + 1}`}
                    className="rounded-xl text-sm flex-1"
                  />
                  <button onClick={() => deleteObjective(i)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                </div>
              ))}
              {(lesson.learning_objectives || []).length === 0 && (
                <p className="text-xs text-muted-foreground">No objectives yet. Click Add to start.</p>
              )}
            </div>
          </Card>

          {/* Overview */}
          <Card className="p-5 border-border/60 shadow-sm">
            <h3 className="font-poppins font-bold text-sm mb-3">Overview / Introduction</h3>
            <Textarea
              value={lesson.overview_html}
              onChange={e => update("overview_html", e.target.value)}
              placeholder="Write an introduction or overview for this lesson (HTML supported)..."
              className="rounded-xl text-sm min-h-[120px]"
            />
          </Card>
        </TabsContent>

        {/* Media */}
        <TabsContent value="media" className="mt-5 space-y-5">
          <Card className="p-5 border-border/60 shadow-sm space-y-4">
            <h3 className="font-poppins font-bold text-sm">Images & Video</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Thumbnail */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">Thumbnail</label>
                <label className="block cursor-pointer group">
                  <div className="aspect-video rounded-xl border-2 border-dashed border-border/60 overflow-hidden bg-muted/30 hover:border-primary/40 transition-all flex items-center justify-center relative">
                    {lesson.thumbnail_url ? (
                      <img src={lesson.thumbnail_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        {uploadingThumb ? <Loader2 size={20} className="animate-spin mx-auto" /> : <><Upload size={20} className="mx-auto mb-1" /><p className="text-xs">Upload thumbnail</p></>}
                      </div>
                    )}
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
                </label>
              </div>

              {/* Hero image */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-2 block">Hero Image</label>
                <label className="block cursor-pointer group">
                  <div className="aspect-video rounded-xl border-2 border-dashed border-border/60 overflow-hidden bg-muted/30 hover:border-primary/40 transition-all flex items-center justify-center relative">
                    {lesson.hero_image_url ? (
                      <img src={lesson.hero_image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        {uploadingHero ? <Loader2 size={20} className="animate-spin mx-auto" /> : <><Upload size={20} className="mx-auto mb-1" /><p className="text-xs">Upload hero image</p></>}
                      </div>
                    )}
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} />
                </label>
              </div>
            </div>

            {/* Gallery */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">Gallery Images</label>
              <div className="flex flex-wrap gap-2">
                {(lesson.gallery_images || []).map((img, i) => (
                  <div key={i} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-border/60">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => update("gallery_images", lesson.gallery_images.filter((_, idx) => idx !== i))}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <Trash2 size={14} className="text-white" />
                    </button>
                  </div>
                ))}
                <label className="w-20 h-20 rounded-xl border-2 border-dashed border-border/60 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all text-muted-foreground">
                  {uploadingGallery ? <Loader2 size={16} className="animate-spin" /> : <><Plus size={16} /><span className="text-xs mt-0.5">Add</span></>}
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleGalleryUpload} />
                </label>
              </div>
            </div>

            {/* Video URL */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">YouTube Video URL</label>
              <Input
                value={lesson.video_url}
                onChange={e => update("video_url", e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="rounded-xl text-sm"
              />
            </div>
          </Card>

          {/* 3D Model */}
          <Card className="p-5 border-border/60 shadow-sm space-y-4">
            <h3 className="font-poppins font-bold text-sm flex items-center gap-2"><Box size={15} className="text-primary" /> 3D Model</h3>
            <Input
              value={lesson.model_3d_url}
              onChange={e => update("model_3d_url", e.target.value)}
              placeholder="Direct URL to .stl or .glb file"
              className="rounded-xl text-sm"
            />
            {lesson.model_3d_url && (
              <STLViewer url={lesson.model_3d_url} height={280} />
            )}
          </Card>
        </TabsContent>

        {/* Materials */}
        <TabsContent value="materials" className="mt-5">
          <Card className="p-5 border-border/60 shadow-sm">
            <h3 className="font-poppins font-bold text-sm mb-4 flex items-center gap-2"><Package size={15} className="text-primary" /> Materials & Tools</h3>
            <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-muted-foreground mb-2 px-0.5">
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Qty</div>
              <div className="col-span-3">Category</div>
              <div className="col-span-2">Notes</div>
              <div className="col-span-1 text-center">Del</div>
            </div>
            <MaterialEditor materials={lesson.materials || []} onChange={mats => update("materials", mats)} />
          </Card>
        </TabsContent>

        {/* Build Steps */}
        <TabsContent value="steps" className="mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-poppins font-bold text-sm">Build Steps</h3>
              <p className="text-xs text-muted-foreground">{lesson.steps?.length || 0} steps added</p>
            </div>
            <Button onClick={addStep} className="bg-primary text-white rounded-xl gap-1.5 text-sm">
              <Plus size={14} /> Add Step
            </Button>
          </div>

          {(lesson.steps || []).length === 0 ? (
            <Card className="p-10 text-center border-dashed">
              <Layers className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
              <p className="font-poppins font-semibold text-foreground">No steps yet</p>
              <p className="text-muted-foreground text-sm mt-1 mb-4">Build steps guide students through the project one action at a time.</p>
              <Button onClick={addStep} className="bg-primary text-white rounded-xl gap-1.5">
                <Plus size={14} /> Add First Step
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {lesson.steps.map((step, i) => (
                <StepEditor
                  key={step.id || i}
                  step={step}
                  index={i}
                  onChange={s => updateStep(i, s)}
                  onDelete={() => deleteStep(i)}
                />
              ))}
              <Button onClick={addStep} variant="outline" className="w-full rounded-xl gap-1.5 text-sm border-dashed">
                <Plus size={14} /> Add Another Step
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Files */}
        <TabsContent value="files" className="mt-5 space-y-4">
          <Card className="p-5 border-border/60 shadow-sm space-y-4">
            <h3 className="font-poppins font-bold text-sm">Downloadable Files</h3>

            {/* Drag & Drop Zone */}
            <input ref={fileUploadRef} type="file" multiple accept=".stl,.glb,.pdf,.zip,.png,.jpg,.jpeg,.gltf,.f3d" className="hidden" onChange={handleFileUpload} />
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => !uploadingFile && fileUploadRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.01]"
                  : "border-border/60 hover:border-primary/40 hover:bg-muted/30"
              } ${uploadingFile ? "pointer-events-none opacity-70" : ""}`}
            >
              {uploadingFile ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 size={28} className="animate-spin text-primary" />
                  <p className="text-sm font-semibold text-primary">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload size={28} className={isDragging ? "text-primary" : ""} />
                  <p className="text-sm font-semibold">Drop files here or click to browse</p>
                  <p className="text-xs">STL, GLB, PDF, ZIP, images supported • Multiple files at once</p>
                </div>
              )}
            </div>

            {/* File list */}
            {(lesson.files || []).length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">{lesson.files.length} file{lesson.files.length !== 1 ? "s" : ""} added</p>
                {lesson.files.map((file, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 bg-muted/40 rounded-xl">
                    <div className="flex-1 min-w-0">
                      <Input value={file.name} onChange={e => updateFile(i, "name", e.target.value)} placeholder="File name" className="rounded-lg text-xs h-7 bg-background" />
                    </div>
                    <div className="w-20 flex-shrink-0">
                      <Input value={file.type} onChange={e => updateFile(i, "type", e.target.value)} placeholder="Type" className="rounded-lg text-xs h-7 bg-background" />
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {file.size_kb < 1024 ? `${file.size_kb} KB` : `${(file.size_kb / 1024).toFixed(1)} MB`}
                    </span>
                    <button onClick={() => deleteFile(i)} className="text-muted-foreground hover:text-destructive flex-shrink-0"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            )}

            <Button variant="ghost" size="sm" onClick={addFile} className="gap-1 text-xs rounded-lg w-full border border-dashed border-border/60">
              <Plus size={12} /> Add file by URL
            </Button>
          </Card>
        </TabsContent>

        {/* Submission */}
        <TabsContent value="submission" className="mt-5 space-y-5">
          <Card className="p-5 border-border/60 shadow-sm space-y-4">
            <h3 className="font-poppins font-bold text-sm flex items-center gap-2"><Send size={15} className="text-primary" /> Submission Settings</h3>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Submission Prompt / Challenge</label>
              <Textarea
                value={lesson.submission_prompt}
                onChange={e => update("submission_prompt", e.target.value)}
                placeholder="Describe what students need to submit (e.g. 'Upload a photo of your completed robot arm and a video of it moving')..."
                className="rounded-xl text-sm min-h-[100px]"
              />
            </div>
          </Card>

          <Card className="p-5 border-border/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-poppins font-bold text-sm">Reflection Questions</h3>
              <Button variant="ghost" size="sm" onClick={addReflection} className="gap-1 text-xs rounded-lg h-7"><Plus size={12} /> Add</Button>
            </div>
            <div className="space-y-2">
              {(lesson.reflection_questions || []).map((q, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={q}
                    onChange={e => updateReflection(i, e.target.value)}
                    placeholder={`Question ${i + 1} (e.g. What was the hardest part?)`}
                    className="rounded-xl text-sm flex-1"
                  />
                  <button onClick={() => deleteReflection(i)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                </div>
              ))}
              {(lesson.reflection_questions || []).length === 0 && (
                <p className="text-xs text-muted-foreground">No reflection questions yet.</p>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}