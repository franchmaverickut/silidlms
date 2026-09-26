import { useState } from "react";
import { Play, List } from "lucide-react";
import ModellingStepper from "./ModellingStepper";

const VIDEO_URL = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/00f917040_QuickClips-TinkercadTutorial-VoiceOvermp4_720p.mp4";

export default function ModellingContent({ steps }) {
  const [mode, setMode] = useState("steps");

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("steps")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            mode === "steps" ? "bg-purple-600 text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/70"
          }`}
        >
          <List size={13} /> Step-by-step
        </button>
        <button
          onClick={() => setMode("video")}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            mode === "video" ? "bg-purple-600 text-white shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/70"
          }`}
        >
          <Play size={13} /> Video tutorial
        </button>
      </div>
      {mode === "steps" ? (
        <ModellingStepper steps={steps} />
      ) : (
        <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm bg-black">
          <video src={VIDEO_URL} controls preload="metadata" className="w-full" />
        </div>
      )}
    </div>
  );
}