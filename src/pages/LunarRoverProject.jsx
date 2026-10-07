import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronDown, ChevronUp, Clock, Cpu, Wrench, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LUNAR_ROVER } from "@/data/lunarRoverData";

function Section({ title, icon, children, defaultOpen = false, accent = "blue" }) {
  const [open, setOpen] = useState(defaultOpen);
  const accentBg = {
    blue: "bg-blue-50/50 border-blue-200",
    purple: "bg-purple-50/50 border-purple-200",
    amber: "bg-amber-50/50 border-amber-200",
  }[accent];
  return (
    <Card className={`overflow-hidden border ${accentBg} shadow-sm`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">{icon}</span>
          <span className="font-poppins font-bold text-base text-foreground">{title}</span>
        </div>
        {open ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
      </button>
      {open && <div className="px-6 pb-6 space-y-4 border-t border-border/40 pt-4">{children}</div>}
    </Card>
  );
}

function StepCard({ step, done, onToggle }) {
  return (
    <div className={`rounded-2xl border overflow-hidden shadow-sm transition-colors ${done ? "border-green-300 bg-green-50/40" : "border-border/60"}`}>
      {step.image && (
        <div className="bg-muted/20 p-4 flex items-center justify-center">
          <img src={step.image} alt={step.title} className="max-h-72 w-auto object-contain rounded-lg" />
        </div>
      )}
      <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
        <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-bold flex-shrink-0">STEP {step.num}</span>
        <span className="font-poppins font-bold text-sm text-foreground flex-1">{step.title}</span>
        <button
          onClick={onToggle}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
            done ? "bg-green-600 text-white" : "bg-white border border-border text-muted-foreground hover:bg-muted/50"
          }`}
        >
          {done ? <Check size={12} /> : <span className="w-3 h-3 rounded-full border border-current" />}
          {done ? "Completed" : "Mark done"}
        </button>
      </div>
      <div className="p-5">
        <p className="text-sm text-foreground/80 leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
}

export default function LunarRoverProject({ isPublic = false }) {
  const d = LUNAR_ROVER;
  const [completed, setCompleted] = useState({});

  const toggle = (num) => setCompleted((c) => ({ ...c, [num]: !c[num] }));
  const doneCount = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((doneCount / d.steps.length) * 100);

  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-6">
      {!isPublic && (
        <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft size={16} /> Back to Maker Lessons
        </Link>
      )}

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[300px] shadow-xl">
        <img src={d.heroImage} alt={d.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white">Robotics</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-black">Solar Power</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Beginner</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">{d.title}</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">{d.subtitle}</p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> {d.buildTime}</span>
            <span className="flex items-center gap-1.5"><Cpu size={15} /> {d.skill}</span>
            <span className="flex items-center gap-1.5"><Wrench size={15} /> 12 Steps</span>
          </div>
        </div>
      </div>

      {/* Intro */}
      <Card className="p-6 border-border/60 shadow-sm">
        <p className="text-sm text-foreground/80 leading-relaxed">{d.intro}</p>
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Assembly progress</span>
            <span className="font-medium">{doneCount} / {d.steps.length} steps</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </Card>

      {/* Parts Gallery */}
      <Section title="Parts Gallery" icon="📦" defaultOpen={true} accent="blue">
        <p className="text-sm text-muted-foreground leading-relaxed">Lay out every part and tick it off. Match each piece to the name and picture below.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {d.parts.map((part, i) => (
            <div key={i} className="rounded-xl border border-border/60 overflow-hidden shadow-sm flex bg-white">
              <div className="w-20 h-20 flex-shrink-0 bg-muted/30 flex items-center justify-center text-3xl">
                {part.icon}
              </div>
              <div className="p-3 space-y-0.5 flex flex-col justify-center">
                <p className="font-poppins font-bold text-xs text-foreground">{part.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{part.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Assembly Steps */}
      <Section title="Assembly Steps" icon="🔧" defaultOpen={true} accent="amber">
        <p className="text-sm text-muted-foreground leading-relaxed">Follow the steps in order. Tick the Completed button when you finish each step.</p>
        <div className="space-y-4">
          {d.steps.map((step) => (
            <StepCard key={step.num} step={step} done={!!completed[step.num]} onToggle={() => toggle(step.num)} />
          ))}
        </div>
      </Section>
    </div>
  );
}