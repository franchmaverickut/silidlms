import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Lightbulb } from "lucide-react";

function CollapsibleList({ title, icon, items, accent = "pink" }) {
  const [open, setOpen] = useState(false);
  const accentClasses = {
    pink: { header: "text-pink-700", bg: "bg-pink-50 hover:bg-pink-100", dot: "text-pink-400" },
    green: { header: "text-green-700", bg: "bg-green-50 hover:bg-green-100", dot: "text-green-500" },
    red: { header: "text-red-600", bg: "bg-red-50 hover:bg-red-100", dot: "text-red-400" },
    blue: { header: "text-blue-700", bg: "bg-blue-50 hover:bg-blue-100", dot: "text-blue-400" },
  };
  const c = accentClasses[accent];
  return (
    <div className={`rounded-xl border border-border/40 overflow-hidden`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 ${c.bg} transition-colors text-left`}
      >
        <span className={`font-poppins font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 ${c.header}`}>
          {icon} {title}
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <ul className="px-4 py-3 space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
              <span className={`${c.dot} mt-0.5 flex-shrink-0`}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function TechCard({ tech }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-pink-50 border-b border-pink-100">
        <span className="w-8 h-8 rounded-full bg-pink-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
          {tech.number}
        </span>
        <div>
          <p className="font-poppins font-bold text-base text-foreground">{tech.name}</p>
          <p className="text-xs text-muted-foreground">{tech.tagline}</p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* How it works */}
        <div>
          <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">How it works</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{tech.howItWorks}</p>
        </div>

        {/* Diagram */}
        <div>
          <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Diagram</p>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            A diagram showing the key components of a {tech.name.split(" — ")[0]} 3D printer.
          </p>
          <div className="rounded-xl overflow-hidden border border-border/40 bg-muted/20 flex items-center justify-center p-4">
            <img
              src={tech.diagramUrl}
              alt={`${tech.name} diagram`}
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* External Video */}
        <div>
          <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">External Video</p>
          <div className="rounded-xl overflow-hidden border border-border/40 shadow-sm" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              src={`https://www.youtube.com/embed/${tech.videoId}`}
              title={`${tech.name} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Collapsible info sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CollapsibleList title="Key Materials" icon="🧱" items={tech.materials} accent="pink" />
          <CollapsibleList title="Key Applications" icon="🎯" items={tech.applications} accent="blue" />
          <CollapsibleList title="Benefits" icon="✅" items={tech.benefits} accent="green" />
          <CollapsibleList title="Limitations" icon="⚠️" items={tech.limitations} accent="red" />
        </div>

        {/* Key learnings */}
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
          <p className="font-poppins font-bold text-xs text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Lightbulb size={14} /> 3 Key Learnings
          </p>
          <ul className="space-y-1.5">
            {tech.keyLearnings.map((k, i) => (
              <li key={i} className="text-xs text-amber-900 flex items-start gap-2 leading-relaxed">
                <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}