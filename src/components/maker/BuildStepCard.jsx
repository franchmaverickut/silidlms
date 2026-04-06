import { useState } from "react";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, AlertTriangle, Lightbulb, Image as ImageIcon, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import STLViewer from "./STLViewer";

export default function BuildStepCard({ step, index, isCompleted, onMarkDone, isActive }) {
  const [expanded, setExpanded] = useState(isActive);
  const [previewImg, setPreviewImg] = useState(null);

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
      isCompleted
        ? "border-secondary/40 bg-secondary/5"
        : isActive
        ? "border-primary/40 bg-primary/3 shadow-md shadow-primary/10"
        : "border-border/60 bg-card"
    }`}>
      {/* Step header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-poppins font-bold text-sm transition-colors ${
          isCompleted ? "bg-secondary text-white" : isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground"
        }`}>
          {isCompleted ? <CheckCircle2 size={18} /> : index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-poppins font-semibold text-sm ${isCompleted ? "line-through text-muted-foreground" : "text-foreground"}`}>
            {step.title}
          </p>
          {!expanded && step.instructions && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">{step.instructions.slice(0, 80)}...</p>
          )}
        </div>
        {expanded ? <ChevronUp size={16} className="text-muted-foreground flex-shrink-0" /> : <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />}
      </button>

      {/* Step body */}
      {expanded && (
        <div className="px-4 pb-5 space-y-4 border-t border-border/40">
          {/* Instructions */}
          {step.instructions && (
            <div className="pt-4">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{step.instructions}</p>
            </div>
          )}

          {/* Warning */}
          {step.warning && (
            <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{step.warning}</p>
            </div>
          )}

          {/* Tip */}
          {step.tip && (
            <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <Lightbulb size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">{step.tip}</p>
            </div>
          )}

          {/* Images */}
          {step.images?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {step.images.map((img, i) => (
                <button key={i} onClick={() => setPreviewImg(img)} className="group relative aspect-video rounded-xl overflow-hidden border border-border/40 hover:border-primary/40 transition-colors">
                  <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <ImageIcon size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 3D Model */}
          {step.model_3d_url && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Box size={14} className="text-primary" />
                <span className="text-xs font-semibold text-primary">3D Preview</span>
              </div>
              <STLViewer url={step.model_3d_url} height={240} />
            </div>
          )}

          {/* Mark done */}
          {!isCompleted && (
            <Button
              onClick={onMarkDone}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl gap-2 font-semibold"
            >
              <CheckCircle2 size={16} />
              Mark as Done
            </Button>
          )}
          {isCompleted && (
            <div className="flex items-center justify-center gap-2 py-2 text-secondary font-semibold text-sm">
              <CheckCircle2 size={16} />
              Step Completed!
            </div>
          )}
        </div>
      )}

      {/* Image lightbox */}
      {previewImg && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setPreviewImg(null)}>
          <img src={previewImg} alt="" className="max-w-full max-h-full rounded-2xl shadow-2xl" />
        </div>
      )}
    </div>
  );
}