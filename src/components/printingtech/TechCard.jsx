import { CheckCircle2, Lightbulb, XCircle } from "lucide-react";

function InfoList({ title, icon, items, dotColor }) {
  return (
    <div className="rounded-xl border border-border/40 overflow-hidden">
      <div className="px-4 py-2.5 bg-muted/30 border-b border-border/40">
        <span className="font-poppins font-bold text-xs uppercase tracking-wider text-foreground flex items-center gap-1.5">
          {icon} {title}
        </span>
      </div>
      <ul className="px-4 py-3 space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
            <span className={`${dotColor} mt-0.5 flex-shrink-0`}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProsCons({ benefits, limitations }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="rounded-xl border border-green-200 overflow-hidden">
        <div className="px-4 py-2.5 bg-green-50 border-b border-green-200 flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-green-600" />
          <span className="font-poppins font-bold text-xs uppercase tracking-wider text-green-700">Benefits</span>
        </div>
        <ul className="px-4 py-3 space-y-1">
          {benefits.map((item, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
              <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-red-200 overflow-hidden">
        <div className="px-4 py-2.5 bg-red-50 border-b border-red-200 flex items-center gap-1.5">
          <XCircle size={14} className="text-red-500" />
          <span className="font-poppins font-bold text-xs uppercase tracking-wider text-red-600">Limitations</span>
        </div>
        <ul className="px-4 py-3 space-y-1">
          {limitations.map((item, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
              <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
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
              src={`https://www.youtube-nocookie.com/embed/${tech.videoId}`}
              title={`${tech.name} video`}
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Materials & Applications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoList title="Key Materials" icon="🧱" items={tech.materials} dotColor="text-pink-400" />
          <InfoList title="Key Applications" icon="🎯" items={tech.applications} dotColor="text-blue-400" />
        </div>

        {/* Benefits vs Limitations */}
        <ProsCons benefits={tech.benefits} limitations={tech.limitations} />

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