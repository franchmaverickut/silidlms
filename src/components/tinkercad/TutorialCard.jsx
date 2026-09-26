import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Sparkles, Video } from "lucide-react";

export default function TutorialCard({ tutorial }) {
  const [takeawaysOpen, setTakeawaysOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const { num, title, description, videoUrl, modelUrl, keyTakeaways, aiActivity } = tutorial;

  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-violet-50 border-b border-violet-100">
        <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
          {num}
        </span>
        <span className="font-poppins font-bold text-base text-foreground">{title}</span>
      </div>

      <div className="p-5 space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

        {/* Video */}
        {videoUrl ? (
          <div className="rounded-xl overflow-hidden border border-border/40 bg-black">
            <video src={videoUrl} controls preload="metadata" className="w-full" />
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border/60 bg-muted/30 p-8 flex flex-col items-center gap-2 text-center">
            <Video size={24} className="text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground font-medium">Video coming soon</p>
          </div>
        )}

        {/* Starting model link */}
        <a
          href={modelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors"
        >
          <ExternalLink size={15} /> Open starting model in Tinkercad
        </a>

        {/* Key Takeaways toggle */}
        <div className="rounded-xl border border-border/40 overflow-hidden">
          <button
            onClick={() => setTakeawaysOpen(o => !o)}
            className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
          >
            <span className="font-poppins font-bold text-sm text-foreground">Key Takeaways</span>
            {takeawaysOpen ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
          </button>
          {takeawaysOpen && (
            <div className="px-4 py-3 border-t border-border/40">
              <ul className="space-y-2">
                {keyTakeaways.map((t, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* AI Activity toggle */}
        {aiActivity && (
          <div className="rounded-xl border border-violet-200 overflow-hidden">
            <button
              onClick={() => setAiOpen(o => !o)}
              className="w-full flex items-center justify-between px-4 py-3 bg-violet-50 hover:bg-violet-100/60 transition-colors text-left"
            >
              <span className="flex items-center gap-1.5 font-poppins font-bold text-sm text-violet-800">
                <Sparkles size={15} /> Optional: Try More with AI
              </span>
              {aiOpen ? <ChevronUp size={16} className="text-violet-600" /> : <ChevronDown size={16} className="text-violet-600" />}
            </button>
            {aiOpen && (
              <div className="px-4 py-3 border-t border-violet-200 space-y-3">
                <div className="bg-muted/40 rounded-lg p-3.5 border border-border/40">
                  <p className="text-xs font-bold text-foreground mb-1.5 uppercase tracking-wide">Prompt</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{aiActivity.prompt}</p>
                </div>
                {aiActivity.keepExploring && (
                  <div className="bg-amber-50 rounded-lg p-3.5 border border-amber-200">
                    <p className="text-xs font-bold text-amber-800 mb-1.5 uppercase tracking-wide">Keep exploring</p>
                    <p className="text-sm text-amber-800 leading-relaxed">{aiActivity.keepExploring}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}