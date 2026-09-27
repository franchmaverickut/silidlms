import { useState } from "react";
import { ChevronDown, ChevronUp, Video } from "lucide-react";

export default function IndustryLessonCard({ lesson }) {
  const [takeawaysOpen, setTakeawaysOpen] = useState(false);
  const { num, title, description, videoUrl, keyTakeaways } = lesson;

  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-indigo-50 border-b border-indigo-100">
        <span className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}