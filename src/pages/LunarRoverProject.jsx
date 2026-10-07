import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronDown, ChevronUp, Clock, Cpu, Wrench, Check, Download, Printer, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LUNAR_ROVER } from "@/data/lunarRoverData";
import ZipStlViewer from "@/components/maker/ZipStlViewer";
import GearRatioExplorer from "@/components/lunarrover/GearRatioExplorer";
import SolarPowerExplorer from "@/components/lunarrover/SolarPowerExplorer";

function Section({ title, icon, children, defaultOpen = false, accent = "blue" }) {
  const [open, setOpen] = useState(defaultOpen);
  const accentBg = {
    blue: "bg-blue-50/50 border-blue-200",
    purple: "bg-purple-50/50 border-purple-200",
    amber: "bg-amber-50/50 border-amber-200",
    green: "bg-green-50/50 border-green-200",
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

function StemCard({ card }) {
  const tagColor = { Science: "bg-emerald-600", Math: "bg-indigo-600", Engineering: "bg-amber-600" }[card.tag] || "bg-slate-600";
  return (
    <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5 space-y-3 shadow-sm">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-lg">{card.icon}</span>
        <span className={`px-2 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wide ${tagColor}`}>{card.tag}</span>
        <span className="font-poppins font-bold text-sm text-foreground">{card.title}</span>
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed">{card.body}</p>
      {card.interactive === "gear" && <GearRatioExplorer />}
      {card.interactive === "solar" && <SolarPowerExplorer />}
    </div>
  );
}

function PartCard({ part }) {
  return (
    <div className="rounded-xl border border-border/60 overflow-hidden shadow-sm flex bg-white">
      <div className="w-20 h-20 flex-shrink-0 bg-white flex items-center justify-center p-2">
        <img src={part.image} alt={part.name} className="max-h-16 w-auto h-auto object-contain" />
      </div>
      <div className="p-3 space-y-0.5 flex flex-col justify-center">
        <p className="font-poppins font-bold text-xs text-foreground">{part.name}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{part.desc}</p>
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

  const printed = d.parts.filter((p) => p.printed);
  const hardware = d.parts.filter((p) => !p.printed);

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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white">3D Printing</span>
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
        <div className="space-y-2">
          <h3 className="font-poppins font-bold text-sm text-foreground flex items-center gap-2"><Printer size={14} className="text-primary" /> 3D-printed parts ({printed.length})</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Print every part below yourself. Lay them out and tick each one off as you find it.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {printed.map((part, i) => <PartCard key={i} part={part} />)}
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <h3 className="font-poppins font-bold text-sm text-foreground flex items-center gap-2"><Wrench size={14} className="text-amber-600" /> Hardware (not printed) ({hardware.length})</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">These parts come with the kit or from an electronics shop. You do not print them.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hardware.map((part, i) => <PartCard key={i} part={part} />)}
          </div>
        </div>
      </Section>

      {/* 3D Print the Parts */}
      <Section title="3D Print the Parts" icon="🖨️" defaultOpen={true} accent="purple">
        <p className="text-sm text-foreground/80 leading-relaxed">Download the STL files, then preview each part in 3D before you print. Use the recommended settings so the tabs, slots and gear teeth come out strong.</p>
        <a href={d.stlZipUrl} download>
          <Button variant="outline" className="w-full rounded-xl gap-2 border-purple-300 text-purple-700 hover:bg-purple-50">
            <Download size={16} /> Download all STL files (ZIP)
          </Button>
        </a>
        <ZipStlViewer zipUrl={d.stlZipUrl} label="Preview the printable parts" height={320} />

        {/* Print settings */}
        <div className="pt-1 space-y-2">
          <h3 className="font-poppins font-bold text-sm text-foreground">Recommended print settings</h3>
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border/40">
                {d.printSettings.map((row, i) => (
                  <tr key={i} className="hover:bg-muted/20 align-top">
                    <td className="px-4 py-2 font-medium text-foreground text-xs whitespace-nowrap w-1/3">{row.setting}</td>
                    <td className="px-4 py-2 text-muted-foreground text-xs">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Print steps */}
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">How to print your parts</h3>
          <div className="space-y-3">
            {d.printSteps.map((step) => (
              <div key={step.num} className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
                <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
                  <span className="px-2.5 py-1 rounded-full bg-purple-600 text-white text-xs font-bold flex-shrink-0">{step.num}</span>
                  <span className="font-poppins font-bold text-sm text-foreground">{step.title}</span>
                </div>
                <div className="p-5">
                  <p className="text-sm text-foreground/80 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 border border-amber-200">
            <Lightbulb size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">Print the two gears last and at 40% infill. Strong gear teeth mean the motor can push the rover without stripping the teeth.</p>
          </div>
        </div>
      </Section>

      {/* Assembly Steps with interspersed STEM */}
      <Section title="Assemble Your Rover" icon="🔧" defaultOpen={true} accent="amber">
        <p className="text-sm text-muted-foreground leading-relaxed">Follow the steps in order. Tick the Completed button when you finish each step. Watch for the science and math spotlights between the steps, they explain how your rover really works.</p>
        <div className="space-y-4">
          {d.steps.map((step) => (
            <Fragment key={step.num}>
              <StepCard step={step} done={!!completed[step.num]} onToggle={() => toggle(step.num)} />
              {d.stemCards
                .filter((c) => c.afterStep === step.num)
                .map((card, i) => <StemCard key={i} card={card} />)}
            </Fragment>
          ))}
        </div>
      </Section>
    </div>
  );
}