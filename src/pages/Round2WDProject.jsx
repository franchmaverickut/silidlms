import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronDown, ChevronUp, Clock, Cpu, Wrench, Check, Download, Printer, Lightbulb, Maximize2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUND_2WD } from "@/data/round2wdData";
import ZipStlViewer from "@/components/maker/ZipStlViewer";

function Section({ title, icon, children, defaultOpen = false, accent = "blue" }) {
  const [open, setOpen] = useState(defaultOpen);
  const accentBg = {
    blue: "bg-blue-50/50 border-blue-200",
    purple: "bg-purple-50/50 border-purple-200",
    amber: "bg-amber-50/50 border-amber-200",
    green: "bg-green-50/50 border-green-200",
    slate: "bg-slate-50/60 border-slate-200",
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
      <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
        <span className="px-2.5 py-1 rounded-full bg-slate-800 text-white text-xs font-bold flex-shrink-0">STEP {step.num}</span>
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

export default function Round2WDProject({ isPublic = false }) {
  const d = ROUND_2WD;
  const [completed, setCompleted] = useState({});
  const toggle = (num) => setCompleted((c) => ({ ...c, [num]: !c[num] }));
  const doneCount = Object.values(completed).filter(Boolean).length;
  const pct = Math.round((doneCount / d.steps.length) * 100);

  return (
    <div className="max-w-4xl mx-auto pb-16 space-y-6">
      {!isPublic && (
        <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft size={16} /> Back to Maker Lessons
        </Link>
      )}

      {/* Title */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">Robotics</span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white">3D Printing</span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-600 text-white">Intermediate</span>
        </div>
        <h1 className="font-poppins font-bold text-3xl md:text-4xl text-foreground leading-tight">{d.title}</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">{d.subtitle}</p>
        <div className="flex flex-wrap gap-5 text-muted-foreground text-sm">
          <span className="flex items-center gap-1.5"><Clock size={15} /> {d.buildTime}</span>
          <span className="flex items-center gap-1.5"><Cpu size={15} /> {d.skill}</span>
          <span className="flex items-center gap-1.5"><Wrench size={15} /> {d.steps.length} Steps</span>
        </div>
      </div>

      {/* Interactive 3D model */}
      <Card className="overflow-hidden border-border/60 shadow-md">
        <div className="relative w-full h-[620px] md:h-[640px] bg-[#fbfbf8]">
          <iframe
            src={d.viewerUrl}
            title="Round 2WD Smart Car 3D model"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-border/50 bg-white">
          <span className="text-xs text-muted-foreground">Drag to turn, scroll or pinch to zoom, tap a part to name it.</span>
          <a href={d.viewerUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="rounded-full gap-1.5 text-xs"><Maximize2 size={13} /> Open full screen</Button>
          </a>
        </div>
      </Card>

      {/* Intro + specs */}
      <Card className="p-6 border-border/60 shadow-sm space-y-4">
        <p className="text-sm text-foreground/80 leading-relaxed">{d.intro}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {d.specs.map((s) => (
            <div key={s.label} className="rounded-xl border border-border/60 px-3 py-2 bg-white">
              <p className="font-poppins font-bold text-sm text-foreground">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Build progress</span>
            <span className="font-medium">{doneCount} / {d.steps.length} steps</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </Card>

      {/* Projects */}
      <Section title="Same Projects as the 4WD Car" icon="🧭" defaultOpen={true} accent="blue">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {d.projects.map((p) => (
            <div key={p.title} className="rounded-xl border border-border/60 bg-white p-4 space-y-1">
              <p className="font-poppins font-bold text-sm text-foreground">{p.title}</p>
              <p className="text-sm text-foreground/75 leading-relaxed">{p.desc}</p>
              <p className="text-[11px] font-mono text-muted-foreground">{p.uses}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The sketches from the <Link to={isPublic ? "/share/smart-car-kit" : "/maker/smart-car-kit"} className="text-primary underline underline-offset-2">4WD Arduino Smart Car Kit</Link> run unchanged because every pin stays the same. Each driver channel now powers one motor instead of two.
        </p>
      </Section>

      {/* Print */}
      <Section title="3D Print the Parts" icon="🖨️" defaultOpen={true} accent="purple">
        <p className="text-sm text-foreground/80 leading-relaxed">Download the STL files and preview each part before you print. Every part is already laid flat in its print position.</p>
        <a href={d.stlZipUrl} download>
          <Button variant="outline" className="w-full rounded-xl gap-2 border-purple-300 text-purple-700 hover:bg-purple-50">
            <Download size={16} /> Download all STL files (ZIP)
          </Button>
        </a>
        <ZipStlViewer zipUrl={d.stlZipUrl} label="Preview the printable parts" height={320} />
        <div className="space-y-2">
          <h3 className="font-poppins font-bold text-sm text-foreground flex items-center gap-2"><Printer size={14} className="text-primary" /> Printed parts</h3>
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="px-3 py-2 font-semibold">File</th>
                  <th className="px-3 py-2 font-semibold">Size (mm)</th>
                  <th className="px-3 py-2 font-semibold">Qty</th>
                  <th className="px-3 py-2 font-semibold">What it is</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {d.stlFiles.map((f) => (
                  <tr key={f.file} className="align-top hover:bg-muted/20">
                    <td className="px-3 py-2 text-xs font-mono whitespace-nowrap">
                      <a href={`/round-2wd/stl/${f.file}`} download className="text-primary underline underline-offset-2">{f.file}</a>
                    </td>
                    <td className="px-3 py-2 text-xs whitespace-nowrap">{f.size}</td>
                    <td className="px-3 py-2 text-xs">{f.qty}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">{f.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-poppins font-bold text-sm text-foreground">Recommended print settings</h3>
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border/40">
                {d.printSettings.map((row) => (
                  <tr key={row.setting} className="hover:bg-muted/20 align-top">
                    <td className="px-4 py-2 font-medium text-foreground text-xs whitespace-nowrap w-1/3">{row.setting}</td>
                    <td className="px-4 py-2 text-muted-foreground text-xs">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Kit parts */}
      <Section title="Parts from the 4WD Kit" icon="📦" defaultOpen={false} accent="slate">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {d.kitParts.map((p) => (
            <div key={p.name} className="flex gap-3 items-start rounded-xl border border-border/60 bg-white px-3 py-2">
              <span className="font-poppins font-bold text-sm w-7 text-right flex-shrink-0">{p.qty}</span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 border border-amber-200">
          <Package size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">{d.newItem} {d.leftover}</p>
        </div>
      </Section>

      {/* Build steps */}
      <Section title="Build Your Round 2WD Car" icon="🔧" defaultOpen={true} accent="amber">
        <p className="text-sm text-muted-foreground leading-relaxed">Follow the steps in order and mark each one done. Use the 3D model above: drag the Explode slider and use Hide top deck to see where each part goes.</p>
        <div className="space-y-4">
          {d.steps.map((step) => (
            <StepCard key={step.num} step={step} done={!!completed[step.num]} onToggle={() => toggle(step.num)} />
          ))}
        </div>
        <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 border border-amber-200">
          <Lightbulb size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">Keep the battery switch off while the USB cable is plugged in. Do not over-tighten screws into printed parts; stop as soon as they are snug.</p>
        </div>
      </Section>
    </div>
  );
}
