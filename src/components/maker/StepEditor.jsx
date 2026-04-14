import { useState } from "react";
import { GripVertical, Trash2, ChevronDown, ChevronUp, Plus, Image as ImageIcon, Box, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

export default function StepEditor({ step, index, onChange, onDelete }) {
  const [expanded, setExpanded] = useState(true);
  const [uploading, setUploading] = useState(false);

  const update = (field, value) => onChange({ ...step, [field]: value });

  const handleImageUpload = async (e) => {
    setUploading(true);
    const files = Array.from(e.target.files);
    const urls = [];
    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      urls.push(file_url);
    }
    update("images", [...(step.images || []), ...urls]);
    setUploading(false);
  };

  const removeImage = (idx) => {
    const updated = (step.images || []).filter((_, i) => i !== idx);
    update("images", updated);
  };

  return (
    <div className="border border-border/60 rounded-2xl overflow-hidden bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 bg-muted/30 cursor-pointer" onClick={() => setExpanded(e => !e)}>
        <GripVertical size={16} className="text-muted-foreground/40 cursor-grab flex-shrink-0" />
        <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          {index + 1}
        </div>
        <span className="flex-1 text-sm font-semibold truncate text-foreground">{step.title || `Step ${index + 1}`}</span>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-muted-foreground hover:text-destructive transition-colors p-1">
          <Trash2 size={14} />
        </button>
        {expanded ? <ChevronUp size={15} className="text-muted-foreground" /> : <ChevronDown size={15} className="text-muted-foreground" />}
      </div>

      {/* Body */}
      {expanded && (
        <div className="p-4 space-y-4 border-t border-border/40">
          <Input
            value={step.title || ""}
            onChange={e => update("title", e.target.value)}
            placeholder="Step title (e.g. Assemble the base frame)"
            className="rounded-xl text-sm"
          />
          <Textarea
            value={step.instructions || ""}
            onChange={e => update("instructions", e.target.value)}
            placeholder="Step instructions — be detailed and clear for students..."
            className="rounded-xl text-sm min-h-[100px]"
          />

          {/* Tip and Warning */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-amber-600 mb-1 flex items-center gap-1">💡 Tip (optional)</label>
              <Textarea
                value={step.tip || ""}
                onChange={e => update("tip", e.target.value)}
                placeholder="Helpful tip for students..."
                className="rounded-xl text-sm min-h-[70px] border-amber-200 focus:ring-amber-300"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-red-500 mb-1 flex items-center gap-1">⚠️ Warning (optional)</label>
              <Textarea
                value={step.warning || ""}
                onChange={e => update("warning", e.target.value)}
                placeholder="Safety warning or common mistake..."
                className="rounded-xl text-sm min-h-[70px] border-red-200 focus:ring-red-300"
              />
            </div>
          </div>

          {/* Step images */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
              <ImageIcon size={12} /> Step Images
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(step.images || []).map((img, i) => (
                <div key={i} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-border/60">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <Trash2 size={14} className="text-white" />
                  </button>
                </div>
              ))}
              <label className="w-20 h-20 rounded-xl border-2 border-dashed border-border/60 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all text-muted-foreground">
                {uploading ? (
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                ) : (
                  <>
                    <Plus size={16} />
                    <span className="text-xs mt-0.5">Add</span>
                  </>
                )}
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          {/* 3D model URL */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1.5">
              <Box size={12} /> 3D Model URL (STL/GLB, optional)
            </label>
            <Input
              value={step.model_3d_url || ""}
              onChange={e => {
                const val = e.target.value.trim();
                // Only accept plain URLs starting with http
                if (val === "" || val.startsWith("http")) {
                  update("model_3d_url", val);
                }
              }}
              placeholder="https://... .stl or .glb"
              className="rounded-xl text-sm"
            />
            {step.model_3d_url && !step.model_3d_url.startsWith("http") && (
              <p className="text-xs text-destructive mt-1">Please enter a valid URL starting with https://</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}