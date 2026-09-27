import { useState } from "react";
import {
  ChevronDown,
  Eye,
  Lightbulb,
  Scale,
  SlidersHorizontal,
  PlayCircle,
} from "lucide-react";

const TOGGLE_CONFIG = [
  { key: "reviewModel", label: "Review the Model", icon: Eye, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  { key: "topTip", label: "Top Tip", icon: Lightbulb, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  { key: "designTradeoffs", label: "Design Trade-offs", icon: Scale, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
  { key: "goFurther", label: "Go Further with Slicing", icon: SlidersHorizontal, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200" },
];

function TogglePanel({ config, content }) {
  const [open, setOpen] = useState(false);
  if (!content) return null;
  const Icon = config.icon;
  return (
    <div className={`rounded-xl border ${config.border} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-muted/30 transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <span className={`w-7 h-7 rounded-lg ${config.bg} flex items-center justify-center`}>
            <Icon size={15} className={config.color} />
          </span>
          <span className="font-poppins font-semibold text-sm text-foreground">{config.label}</span>
        </span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1">
          <p className="text-sm text-muted-foreground leading-relaxed pl-9">{content}</p>
        </div>
      )}
    </div>
  );
}

export default function DesignSectionCard({ section }) {
  const isBonus = section.isBonus;
  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-blue-50 border-b border-blue-100">
        {isBonus ? (
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
            ★
          </span>
        ) : (
          <span className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
            {section.number}
          </span>
        )}
        <div>
          <p className="font-poppins font-bold text-base text-foreground">
            {isBonus ? "Bonus Section: " : `${section.number}. `}
            {section.title}
          </p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Intro */}
        <p className="text-sm text-muted-foreground leading-relaxed">{section.intro}</p>

        {/* Video */}
        {section.videoUrl && (
          <div className="rounded-xl overflow-hidden border border-border/40 shadow-sm bg-muted/20" style={{ aspectRatio: "16 / 9" }}>
            <video src={section.videoUrl} controls className="w-full h-full object-contain" />
          </div>
        )}

        {/* Toggles */}
        <div className="space-y-2.5">
          {TOGGLE_CONFIG.map((cfg) => (
            <TogglePanel key={cfg.key} config={cfg} content={section.toggles[cfg.key]} />
          ))}
        </div>

        {/* Key Learnings */}
        <div>
          <p className="font-poppins font-bold text-xs text-foreground uppercase tracking-wider mb-3">
            Key Learnings
          </p>
          <div className="space-y-3">
            {section.keyLearnings.map((kl, i) => (
              <div
                key={i}
                className={`rounded-xl border border-border/40 overflow-hidden ${
                  kl.imageUrl ? "flex flex-col sm:flex-row" : "p-4"
                }`}
              >
                {kl.imageUrl && (
                  <div className="sm:w-44 flex-shrink-0 bg-muted/20 flex items-center justify-center p-3">
                    <img
                      src={kl.imageUrl}
                      alt={kl.title}
                      className="max-w-full max-h-40 object-contain rounded-lg"
                    />
                  </div>
                )}
                <div className="p-4 flex-1">
                  <p className="font-poppins font-semibold text-sm text-foreground mb-1.5">
                    {kl.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{kl.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}