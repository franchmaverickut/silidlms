# 4WD Arduino Smart Car Kit — Project Source Code

This file contains the full source code for the **4WD Smart Car** maker project ("Build a robot car that thinks!"). It has three parts:

1. `src/pages/SmartCarProject.jsx` — the page component.
2. `src/data/smartcarData.js` — the content/data file.
3. `src/data/smartcarCode.js` — the Arduino sketches (Project A, B, C1, C2).

> Note: `/share/smart-car-kit` renders the same component with `isPublic={true}`.

---

## 1. `src/pages/SmartCarProject.jsx`

```jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Download, Clock, Cpu, Wrench,
  BookOpen, Lightbulb, AlertTriangle, Code, Zap, Eye, Brain, Car as CarIcon,
  Map, Sparkles, Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SMART_CAR } from "@/data/smartcarData";
import InteractiveWiringDiagram from "@/components/smartcar/InteractiveWiringDiagram";
import SmartCarSimulator from "@/components/smartcar/SmartCarSimulator";
import ProgramFlowSimulator from "@/components/smartcar/ProgramFlowSimulator";
import ChassisPrintStudio from "@/components/smartcar/ChassisPrintStudio";
import EchoExplorer from "@/components/smartcar/EchoExplorer";

function Section({ title, kicker, icon, children, defaultOpen = false, accent = "blue" }) {
  const [open, setOpen] = useState(defaultOpen);
  const accentBg = {
    blue: "bg-blue-50/50 border-blue-200",
    green: "bg-green-50/50 border-green-200",
    purple: "bg-purple-50/50 border-purple-200",
    amber: "bg-amber-50/50 border-amber-200",
    sky: "bg-sky-50/50 border-sky-200",
  }[accent];
  return (
    <Card className={`overflow-hidden border ${accentBg} shadow-sm`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors text-left">
        <div className="flex items-center gap-2.5">
          <span className="text-base">{icon}</span>
          <div className="flex flex-col">
            {kicker && <span className="text-[10px] uppercase tracking-wide font-bold text-muted-foreground">{kicker}</span>}
            <span className="font-poppins font-bold text-base text-foreground">{title}</span>
          </div>
        </div>
        {open ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
      </button>
      {open && <div className="px-6 pb-6 space-y-4 border-t border-border/40 pt-4">{children}</div>}
    </Card>
  );
}

// Kid-friendly code block: collapsed by default, labelled for older builders.
function CodeBlock({ code, filename }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="rounded-xl border border-border/60 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 text-white">
        <button onClick={() => setOpen(o => !o)} className="flex items-center gap-2 text-sm font-medium">
          <Code size={14} /> {filename || "Arduino Sketch"}
          <span className="text-xs text-slate-400">({code.split('\n').length} lines)</span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className="text-xs text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-slate-700 transition-colors">
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button onClick={() => setOpen(o => !o)} className="text-slate-300 hover:text-white">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
      {!open && (
        <button onClick={() => setOpen(true)} className="w-full px-4 py-2.5 bg-slate-100 text-xs text-slate-500 hover:bg-slate-200 transition-colors text-left">
          🔒 For older builders — tap to {open ? "hide" : "show"} the code
        </button>
      )}
      {open && (
        <pre className="bg-slate-900 text-slate-100 text-xs leading-relaxed p-4 overflow-x-auto max-h-[600px]"><code>{code}</code></pre>
      )}
    </div>
  );
}

function StepCard({ step }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      {step.image && (
        <div className="bg-muted/20 p-4 flex items-center justify-center">
          <img src={step.image} alt={step.title} className="max-h-52 w-auto object-contain rounded-lg" />
        </div>
      )}
      {step.secondaryImage && (
        <div className="bg-muted/20 p-4 flex items-center justify-center border-t border-border/40">
          <img src={step.secondaryImage} alt={step.title} className="max-h-52 w-auto object-contain rounded-lg" />
        </div>
      )}
      <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
        <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-bold flex-shrink-0">STEP {step.num}</span>
        <span className="font-poppins font-bold text-sm text-foreground">{step.title}</span>
      </div>
      <div className="p-5 space-y-3">
        {step.desc && <p className="text-sm text-foreground/80 leading-relaxed">{step.desc}</p>}
        {step.bullets && (
          <ul className="space-y-2">
            {step.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
                <span className="text-blue-500 font-bold flex-shrink-0 mt-0.5">•</span> {b}
              </li>
            ))}
          </ul>
        )}
        {step.tip && (
          <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 border border-amber-200">
            <Lightbulb size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">{step.tip}</p>
          </div>
        )}
        {step.warning && (
          <div className="flex gap-2 items-start p-3 rounded-lg bg-red-50 border border-red-200">
            <AlertTriangle size={14} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-800 leading-relaxed">{step.warning}</p>
          </div>
        )}
        {step.conclusion && (
          <div className="flex gap-2 items-start p-3 rounded-lg bg-green-50 border border-green-200">
            <Lightbulb size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-800 leading-relaxed">{step.conclusion}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function DataTable({ headers, rows, renderRow }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>{headers.map((h, i) => <th key={i} className="px-4 py-2.5 text-left font-poppins font-semibold text-foreground text-xs uppercase tracking-wide">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {rows.map((row, i) => renderRow(row, i))}
        </tbody>
      </table>
    </div>
  );
}

const HOW_CARDS = [
  { icon: <Eye size={22} className="text-sky-600" />, color: "bg-sky-50 border-sky-200", title: "It SEES", body: "The car has an ultrasonic eye that sends a tiny sound beep we cannot hear. It listens for the echo. If the echo comes back fast, something is close!" },
  { icon: <Brain size={22} className="text-purple-600" />, color: "bg-purple-50 border-purple-200", title: "It THINKS", body: "A small computer called Arduino is the brain. You write instructions for it, like 'if too close, stop and turn'. The brain decides what to do." },
  { icon: <CarIcon size={22} className="text-blue-600" />, color: "bg-blue-50 border-blue-200", title: "It MOVES", body: "The brain tells the wheels to roll forward, backward, or turn. A part called the motor driver gives the wheels the power they need to spin." },
];

const ADVENTURE = [
  { n: 1, icon: "📦", title: "Know your parts", body: "Lay out every piece and match it to its picture." },
  { n: 2, icon: "🖨️", title: "Print the chassis", body: "If you have a 3D printer, print the plates (or use the kit plates)." },
  { n: 3, icon: "🔧", title: "Build the base car", body: "Screw, plug and wire it up once. Then it is ready for all three games." },
  { n: 4, icon: "🚗", title: "Game A: Dodge walls", body: "Make it drive and steer away from anything in its way." },
  { n: 5, icon: "📏", title: "Game B: Follow the line", body: "Teach it to stick to a black tape path on the floor." },
  { n: 6, icon: "🧩", title: "Game C: Escape the maze", body: "Help it solve a maze and remember the shortest way out." },
];

export default function SmartCarProject({ isPublic = false }) {
  const d = SMART_CAR;
  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-6">
      {!isPublic && (
        <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft size={16} /> Back to Maker Lessons
        </Link>
      )}

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[320px] shadow-xl">
        <img src={d.kitImage} alt={d.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">Robotics</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">Arduino</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">For young makers</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Build a robot car that thinks!</h1>
          <p className="text-white/90 text-sm md:text-base max-w-xl">Your car can dodge walls, follow a line, and even escape a maze. Build it once, then teach it three cool games.</p>
          <div className="flex flex-wrap gap-5 text-white/80 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> {d.buildTime}</span>
            <span className="flex items-center gap-1.5"><Cpu size={15} /> {d.software}</span>
            <span className="flex items-center gap-1.5"><Wrench size={15} /> 3 Games</span>
          </div>
        </div>
      </div>

      {/* Downloads */}
      <div className="grid grid-cols-1 gap-3">
        <a href={d.sketchesZipUrl} download>
          <Button variant="outline" className="w-full rounded-xl gap-2 border-blue-300 text-blue-700 hover:bg-blue-50">
            <Download size={16} /> Get the Arduino code (ZIP)
          </Button>
        </a>
      </div>

      {/* Meet your robot car */}
      <Card className="p-6 border-border/60 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-primary" />
          <h2 className="font-poppins font-bold text-lg text-foreground">Meet your robot car</h2>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">A robot car is just three things working together. Get these three ideas and the rest is easy!</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {HOW_CARDS.map((c, i) => (
            <div key={i} className={`rounded-2xl border ${c.color} p-4 space-y-2`}>
              <div className="flex items-center gap-2">
                {c.icon}
                <span className="font-poppins font-bold text-sm text-foreground">{c.title}</span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Try it: how the car sees */}
      <Section title="Try it: how your car sees" kicker="Play before you build" icon="👁️" defaultOpen={true} accent="sky">
        <p className="text-sm text-foreground/80 leading-relaxed">Before you build, play with the car's eye. Move the wall and watch how the car knows when to stop. This is exactly how the real sensor works.</p>
        <EchoExplorer />
      </Section>

      {/* Your build adventure */}
      <Section title="Your build adventure" kicker="The plan" icon="🗺️" defaultOpen={true} accent="blue">
        <p className="text-sm text-foreground/80 leading-relaxed">{d.intro}</p>
        <p className="text-sm text-foreground/80 leading-relaxed">Here is the whole adventure in six little steps. Tap a section below to open it and start building.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ADVENTURE.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border/60 p-4 flex gap-3 items-start bg-white">
              <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-bold flex-shrink-0">{s.n}</span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{s.icon}</span>
                  <p className="font-poppins font-bold text-xs text-foreground">{s.title}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-start p-3 rounded-lg bg-blue-50 border border-blue-200">
          <Lightbulb size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 leading-relaxed">Build the car ONCE. Then you only change the code for each game, you never rewire it. The code for older builders is hidden in little boxes you can open when you are ready.</p>
        </div>
      </Section>

      {/* Stage 1: Know Your Kit */}
      <Section title="Stage 1. Know your parts" kicker="What is in the box?" icon="📦" defaultOpen={true} accent="blue">
        <p className="text-sm text-muted-foreground leading-relaxed">Lay every part on a clean table and tick it off. Your parts should look like the pictures.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {d.parts.map((part, i) => (
            <div key={i} className="rounded-xl border border-border/60 overflow-hidden shadow-sm flex bg-white">
              <div className="w-28 h-28 flex-shrink-0 bg-white flex items-center justify-center p-3">
                <img src={part.image} alt={part.name} className="max-h-20 w-auto h-auto object-contain rounded" />
              </div>
              <div className="p-3 space-y-1">
                <p className="font-poppins font-bold text-xs text-foreground">{part.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{part.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-2">
          <h3 className="font-poppins font-bold text-sm text-foreground mb-2">The chassis pieces (the frame)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {d.chassisAssembly.parts.map((part, i) => (
              <div key={i} className="rounded-xl border border-border/60 overflow-hidden shadow-sm flex bg-white">
                <div className="w-28 h-28 flex-shrink-0 bg-white flex items-center justify-center p-3">
                  {part.image ? (
                    <img src={part.image} alt={part.name} className="max-h-20 w-auto h-auto object-contain" />
                  ) : (
                    <span className="text-3xl text-muted-foreground/30">🔩</span>
                  )}
                </div>
                <div className="p-4 space-y-1 flex flex-col justify-center">
                  <p className="font-poppins font-bold text-xs text-foreground">{part.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{part.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-2">
          <p className="font-poppins font-semibold text-sm text-foreground mb-2">Extra tools you also need (not in the kit)</p>
          <ul className="space-y-2">
            {d.extraTools.map((tool, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
                <span className="text-blue-500 font-bold flex-shrink-0 mt-0.5">•</span> {tool}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Stage 2: 3D-Print the Chassis */}
      <Section title="Stage 2. Print the chassis (optional)" kicker="If you have a 3D printer" icon="🖨️" defaultOpen={false} accent="purple">
        <p className="text-sm text-foreground/80 leading-relaxed">{d.chassisPrint.intro}</p>
        <a href={d.chassisPrintZipUrl} download>
          <Button variant="outline" className="w-full rounded-xl gap-2 border-purple-300 text-purple-700 hover:bg-purple-50">
            <Download size={16} /> Download the print files (ZIP)
          </Button>
        </a>
        <p className="text-sm text-foreground/80 leading-relaxed">{d.chassisPrint.thicknessNote}</p>

        <ChassisPrintStudio previews={d.chassisPrint.stlPreviews} />
        <p className="text-xs text-muted-foreground italic">Use the 3D preview to turn each part and check its real shape and size against your printer bed before you print.</p>

        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">Print and prepare the parts</h3>
          {d.chassisPrint.steps.map(step => <StepCard key={step.num} step={step} />)}
        </div>

        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">{d.chassisPrint.compact2wd.title}</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{d.chassisPrint.compact2wd.desc}</p>
          <ul className="space-y-2">
            {d.chassisPrint.compact2wd.points.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
                <span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">{p.label}:</span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 border border-amber-200">
            <Lightbulb size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">{d.chassisPrint.compact2wd.tip}</p>
          </div>
        </div>
      </Section>

      {/* Stage 3: Build the Base Car */}
      <Section title="Stage 3. Build the base car" kicker="Screw, plug, wire" icon="🔧" defaultOpen={false} accent="blue">
        <p className="text-sm text-muted-foreground leading-relaxed">{d.baseCar.intro}</p>
        <div className="rounded-2xl overflow-hidden border border-border/60">
          <div className="bg-muted/20 p-4 flex items-center justify-center">
            <img src={d.baseCar.sideViewImage} alt="Side view" className="max-h-64 w-auto object-contain rounded-lg" />
          </div>
          <p className="p-3 text-xs text-muted-foreground italic">{d.baseCar.sideViewCaption}</p>
        </div>
        <div className="space-y-4">
          {d.chassisAssembly.steps.map(step => <StepCard key={'chassis-'+step.num} step={step} />)}
          {d.baseCar.steps.map(step => <StepCard key={'base-'+step.num} step={{...step, num: step.num + 5}} />)}
        </div>
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">STEP 16: Connect the power</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">Power is where most cars fail, so read this twice. All the grounds (minus wires) must join together.</p>
          <DataTable
            headers={["Connection", "From", "To"]}
            rows={d.baseCar.powerWiring}
            renderRow={(row, i) => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="px-4 py-2.5 font-medium text-foreground">{row.connection}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{row.from}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{row.to}</td>
              </tr>
            )}
          />
          <div className="flex gap-2 items-start p-3 rounded-lg bg-red-50 border border-red-200">
            <AlertTriangle size={14} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-800 leading-relaxed">{d.baseCar.powerCaution}</p>
          </div>
        </div>
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">STEP 17: Wire the signals (the one master map)</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">Use the jumper wires to connect everything below. This same map is used by all three games, so you only wire once.</p>
          <InteractiveWiringDiagram />
          <p className="text-xs text-muted-foreground italic">Figure 3. Tap any wire to see what it does.</p>
          <DataTable
            headers={["Module pin", "Shield / UNO pin", "Wire colour", "Used in"]}
            rows={d.baseCar.pinMap}
            renderRow={(row, i) => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="px-4 py-2 font-medium text-foreground">{row.module}</td>
                <td className="px-4 py-2 text-muted-foreground font-mono text-xs">{row.pin}</td>
                <td className="px-4 py-2 text-muted-foreground">{row.color}</td>
                <td className="px-4 py-2 text-center"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">{row.usedIn}</span></td>
              </tr>
            )}
          />
          <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 border border-amber-200">
            <Lightbulb size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">{d.baseCar.pinMapNote}</p>
          </div>
        </div>
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">STEP 18: Test the motors</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{d.baseCar.motorTestDesc}</p>
          <CodeBlock code={d.baseCar.motorTestCode} filename="00_MotorTest.ino" />
        </div>
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">STEP 19: Test the sensors</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{d.baseCar.sensorTestDesc}</p>
          <CodeBlock code={d.baseCar.sensorTestCode} filename="01_SensorTest.ino" />
        </div>
        <div className="flex gap-2 items-start p-3 rounded-lg bg-green-50 border border-green-200">
          <Rocket size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-green-800 leading-relaxed">{d.baseCar.baseCarTip}</p>
        </div>
      </Section>

      {/* Explore: how it works */}
      <Section title="Explore: how the maths works" kicker="Play and learn" icon="⚡" defaultOpen={false} accent="purple">
        <p className="text-sm text-muted-foreground leading-relaxed">Before you upload code, play with these. Move the sliders and watch how distance, speed and steering change in real time.</p>
        <SmartCarSimulator />
      </Section>

      <Section title="Explore: follow the code logic" kicker="Step through the thinking" icon="🔀" defaultOpen={false} accent="green">
        <p className="text-sm text-muted-foreground leading-relaxed">These maps match the real code. Change the inputs and watch the bright path, or press Step Through to walk it one choice at a time.</p>
        <ProgramFlowSimulator />
      </Section>

      {/* Games A, B, C */}
      {d.projects.map((proj) => (
        <Section key={proj.key} title={proj.title} kicker={`Game ${proj.key}`} icon={proj.key === "A" ? "🚗" : proj.key === "B" ? "📏" : "🧩"} defaultOpen={false} accent={proj.key === "A" ? "green" : proj.key === "B" ? "purple" : "amber"}>
          {proj.howItWorks && <p className="text-sm text-foreground/80 leading-relaxed">{proj.howItWorks}</p>}
          {proj.flowchartImage && (
            <div className="space-y-2">
              <ProgramFlowSimulator defaultFlow={proj.key} />
              <p className="text-xs text-muted-foreground italic">{proj.flowchartCaption}</p>
            </div>
          )}
          {proj.diagrams && proj.diagrams.map((diagram, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-border/60">
              <div className="bg-muted/20 p-4 flex items-center justify-center">
                <img src={diagram.image} alt={diagram.caption} className="max-h-64 w-auto object-contain rounded-lg" />
              </div>
              <p className="p-3 text-xs text-muted-foreground italic">{diagram.caption}</p>
            </div>
          ))}
          {proj.versions && (
            <DataTable
              headers={["Version", "Maze type", "Sensors used"]}
              rows={proj.versions}
              renderRow={(row, i) => (
                <tr key={i} className="hover:bg-muted/20">
                  <td className="px-4 py-2.5 font-poppins font-semibold text-foreground text-sm">{row.title}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{row.mazeType}</td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{row.sensors}</td>
                </tr>
              )}
            />
          )}
          {proj.c1 && (
            <div className="space-y-4 pt-2">
              <h3 className="font-poppins font-bold text-sm text-foreground">{proj.c1.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{proj.c1.desc}</p>
              <DataTable
                headers={["Pattern", "Becomes", "Why"]}
                rows={proj.c1.simplificationTable}
                renderRow={(row, i) => (
                  <tr key={i} className="hover:bg-muted/20">
                    <td className="px-4 py-2 font-mono text-sm font-medium text-foreground">{row.pattern}</td>
                    <td className="px-4 py-2 font-mono text-sm text-green-600 font-bold">{row.becomes}</td>
                    <td className="px-4 py-2 text-muted-foreground text-xs">{row.why}</td>
                  </tr>
                )}
              />
              <div className="rounded-2xl overflow-hidden border border-border/60">
                <div className="bg-muted/20 p-4 flex items-center justify-center">
                  <img src={proj.c1.mazeImage} alt={proj.c1.mazeCaption} className="max-h-64 w-auto object-contain rounded-lg" />
                </div>
                <p className="p-3 text-xs text-muted-foreground italic">{proj.c1.mazeCaption}</p>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{proj.c1.workedExample}</p>
              <div className="space-y-2">
                <ProgramFlowSimulator defaultFlow="C1" />
                <p className="text-xs text-muted-foreground italic">{proj.c1.flowchartCaption}</p>
              </div>
              <div className="space-y-3">
                {proj.c1.steps.map(step => <StepCard key={step.num} step={step} />)}
              </div>
              <CodeBlock code={proj.c1.code} filename="C1_LineMazeSolver.ino" />
            </div>
          )}
          {proj.c2 && (
            <div className="space-y-4 pt-2">
              <h3 className="font-poppins font-bold text-sm text-foreground">{proj.c2.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{proj.c2.desc}</p>
              <div className="rounded-2xl overflow-hidden border border-border/60">
                <div className="bg-muted/20 p-4 flex items-center justify-center">
                  <img src={proj.c2.scanImage} alt={proj.c2.scanCaption} className="max-h-64 w-auto object-contain rounded-lg" />
                </div>
                <p className="p-3 text-xs text-muted-foreground italic">{proj.c2.scanCaption}</p>
              </div>
              <div className="space-y-2">
                <ProgramFlowSimulator defaultFlow="C2" />
                <p className="text-xs text-muted-foreground italic">{proj.c2.flowchartCaption}</p>
              </div>
              <div className="space-y-3">
                {proj.c2.steps.map(step => <StepCard key={step.num} step={step} />)}
              </div>
              <CodeBlock code={proj.c2.code} filename="C2_WallMazeSolver.ino" />
            </div>
          )}
          {proj.steps && (
            <div className="space-y-4">
              {proj.steps.map(step => <StepCard key={step.num} step={step} />)}
            </div>
          )}
          {proj.code && <CodeBlock code={proj.code} filename={proj.key === "A" ? "A_ObstacleAvoidance.ino" : proj.key === "B" ? "B_LineFollower.ino" : ""} />}
          {proj.tuningTable && (
            <div className="pt-2 space-y-3">
              <h3 className="font-poppins font-bold text-sm text-foreground">Tuning guide</h3>
              <DataTable
                headers={["Setting", "Default", "Effect when increased"]}
                rows={proj.tuningTable}
                renderRow={(row, i) => (
                  <tr key={i} className="hover:bg-muted/20">
                    <td className="px-4 py-2 font-mono text-sm font-medium text-foreground">{row.setting}</td>
                    <td className="px-4 py-2 font-mono text-sm text-muted-foreground">{row.default}</td>
                    <td className="px-4 py-2 text-muted-foreground">{row.effect}</td>
                  </tr>
                )}
              />
            </div>
          )}
          {proj.challenges && (
            <div className="pt-2 space-y-2">
              <h3 className="font-poppins font-bold text-sm text-foreground flex items-center gap-2"><Rocket size={14} /> Try these next</h3>
              <ul className="space-y-2">
                {proj.challenges.map((c, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
                    <span className="text-blue-500 font-bold flex-shrink-0 mt-0.5">•</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Section>
      ))}

      {/* Oops: Troubleshooting */}
      <Section title="Oops! Troubleshooting" kicker="When something is wrong" icon="🛠️" defaultOpen={false} accent="amber">
        <p className="text-sm text-muted-foreground leading-relaxed">Cars acting weird? Find your problem in the list below and try the fix.</p>
        <DataTable
          headers={["What is wrong", "Likely cause", "How to fix it"]}
          rows={d.troubleshooting}
          renderRow={(row, i) => (
            <tr key={i} className="hover:bg-muted/20">
              <td className="px-4 py-2.5 font-medium text-foreground">{row.symptom}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{row.cause}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{row.fix}</td>
            </tr>
          )}
        />
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">The code files in this kit</h3>
          <DataTable
            headers={["Sketch", "What it does"]}
            rows={d.sketchList}
            renderRow={(row, i) => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="px-4 py-2 font-mono text-sm font-medium text-foreground">{row.name}</td>
                <td className="px-4 py-2 text-muted-foreground">{row.purpose}</td>
              </tr>
            )}
          />
          <p className="text-xs text-muted-foreground italic leading-relaxed">{d.sketchNote}</p>
        </div>
        <div className="pt-2 space-y-2">
          <h3 className="font-poppins font-bold text-sm text-foreground">References</h3>
          <ul className="space-y-1.5">
            {d.references.map((ref, i) => (
              <li key={i} className="text-xs text-muted-foreground leading-relaxed">{ref}</li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
```

---

## 2. `src/data/smartcarData.js`

```js
import { MOTOR_TEST, SENSOR_TEST, OBSTACLE_AVOIDANCE, LINE_FOLLOWER, LINE_MAZE_SOLVER, WALL_MAZE_SOLVER } from './smartcarCode';

const IMG = {
  kitContents: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/5c7ab985f_89896f6642cd25e6a6d4794c39e1118d1ae01466.png",
  uno: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/e087ccfd2_Part_01_UNO_R3_Board.png",
  shield: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/d7176355e_Part_02_Sensor_Shield_V5.png",
  l298n: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/74cf6a90b_Part_03_L298N_Motor_Driver.png",
  motors: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/7b3688d33_386a69b58b77384d4e207e7677d7277e235611d1.png",
  wheels: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/fdca32441_61d49a0432f8622b43ea83adfb4c2123802c1824.png",
  chassis: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/2943138b2_b5e5d7643920eef788a0315db6207b7a0a1d3323.png",
  mounts: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/288ffd2a8_7c4d07f150e6e373d8ec9fde30f59ce5c260f85a.png",
  hcsr04: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/6f2f67ce6_Part_04_HC_SR04_Ultrasonic_Sensor.png",
  servo: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/7611e640c_Part_05_SG90_Micro_Servo.png",
  pantilt: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/69a464343_79ab920f43ad6061ad731ee53a0540c153089fee.png",
  tracker: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/f29257fb2_Part_06_Four_Channel_Tracking_Board.png",
  probes: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/c51bd7ca1_Part_07_IR_Line_Probes_Set_of_4.png",
  battery: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/af18bfd1c_368510c8624f5c4d6b1e8a95dd2518b04abdf061.png",
  encoders: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/b1415b34a_5ba62b937b834090602e95f6ea5c6217f3269932.png",
  screws: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/26f83d21c_e47e85206e29ae6e752771df417780458873448a.png",
  wires: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/077c29ce4_Part_09_Dupont_Female_Female_Jumper_Wires.png",
  usb: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/f7ab64a71_39a466f22d44919106a5361c2742f97032b91e81.png",
  sideView: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/c633d681c_image.png",
  wiring: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/322e81e8b_42d9d69bbbf3eb299d4889c8f79685dec0d28065.png",
  obstacleFlow: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/cb0388c65_acc011c4cce30436c78e52871bf9f5253e5d3914.png",
  lineSensors: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/6f4be1f80_2cafb46e4235b4c085b0a3f93eac56b5d3869891.png",
  lineFlow: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/b369520c9_bfbd656fa8c1bcd840bc3ef083cb987f20d8a958.png",
  lineMaze: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/4115718b0_888bb85dab25f989d9fdf5facfb53823930593f1.png",
  lineMazeFlow: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/78fe457a6_41a0f8ddf5e820afe8ec6591199cc7d7c525bef0.png",
  wallMaze: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/d53dc40cb_80f257ef1cb8c03969b1317b02d2065de55eca65.png",
  wallMazeFlow: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/abed1b2aa_1410ad98726805ce7ac2df447f76a01a55e911c8.png",
  stl1piece: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/7673255de_4WD_smart_buggy_chassis_1piece.stl",
  stlPartA: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/648fa7486_4WD_smart_buggy_chassis_part_A.stl",
  stlPartB: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/1c7ec32c6_4WD_smart_buggy_chassis_part_B.stl",
  stlMount: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/42945bf2b_motor_mount.stl",
  figThreeWays: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/1cebea698_image1.png",
  figBedFit: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/3d95e67e8_image2.png",
  figOption1: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/1c0382456_Option_1_One_Piece_4WD_Dimensions.png",
  figOption2: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/8aef97bf9_Option_2_Two_Piece_4WD_Part_A_and_B_Dimensions.png",
  figOption3: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/1fa68907f_Option_3_Compact_2WD_Dimensions.png",
  figDovetail: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/b65292387_image3.png",
  figMountDims: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/ad235f379_image4.png",
  // 4WD Robot Chassis — illustrated assembly assets
  partWheel: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/10e2ed303_Part_01_Wheel.png",
  partChassisPlate: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/958d80217_Part_02_Chassis_Plate.png",
  partEncoderDisc: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/3cf0073de_Part_03_Encoder_Disc.png",
  partMotor: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/bff1b8680_Part_04_DC_Gear_Motor.png",
  partLongScrew: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/065b76039_Part_05_Long_Screw.png",
  partBatteryHolder: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/174181272_Part_06_Battery_Holder.png",
  partMotorBracket: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/6e3420795_Part_07_Motor_Bracket.png",
  partShortScrew: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/834b91fe8_Part_08_Short_Screw.png",
  partHexSpacer: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/06afc9d7c_Part_09_Hex_Spacer.png",
  partHexNut: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/3c8aff770_Part_10_Hex_Nut.png",
  asmStep01: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/71b30be4f_Step_01_Install_Motor_Brackets.png",
  asmStep02: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/aaabe9fd5_Step_02_Position_Motors_and_Encoder_Discs.png",
  asmStep03: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/8e929dd5b_Step_03_Secure_Motors.png",
  asmStep04: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/f41965710_Step_04_Attach_Wheels.png",
  asmStep05: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/a5a11ecd9_Step_05_Add_Spacers_and_Upper_Chassis.png",
};

export const SMART_CAR = {
  title: "4WD Arduino Smart Car Kit",
  subtitle: "Three step-by-step builds: Obstacle Avoidance Car, Line-Following Robot and Maze Solver",
  level: "Beginner to intermediate maker",
  buildTime: "Base car 2–3 hours; each project 1–2 hours",
  software: "Arduino IDE 2.x, built-in Servo and EEPROM libraries only",
  author: "Franch Maverick A. Lorilla, PECE, DEng",
  affiliation: "University of Science and Technology of Southern Philippines, Cagayan de Oro — College of Engineering and Architecture",
  docxUrl: "https://media.base44.com/files/public/69d386ad9523e2ce04536574/06c1a15ca_4WD_Smart_Car_Kit_Build_Module.docx",
  sketchesZipUrl: "https://media.base44.com/files/public/69d386ad9523e2ce04536574/ea64e875b_SmartCar_Sketches.zip",
  chassisPrintZipUrl: "https://media.base44.com/files/public/69d386ad9523e2ce04536574/df8ba9f8b_SmartCar_Chassis_Print_Files.zip",
  kitImage: IMG.kitContents,
  intro: "This module follows the same pattern that popular maker sites such as Instructables use for robot car builds: a short introduction, a Supplies list with a photo of every part, then numbered steps, each with a picture and a few clear actions, followed by the code, a test, and a troubleshooting section. We keep that familiar order but add one important idea: build the car once, then change only the code and a few sensors for each project.",
  extraTools: [
    "Small Phillips screwdriver, wire stripper, and electrical tape. A soldering iron is needed only if your motors do not have wires attached.",
    "Batteries for the battery box (2 or 4 cells). Rechargeable 18650 cells need a proper charger.",
    "A small ON/OFF switch (strongly recommended) placed in the red battery wire.",
    "For Project B and C1: black electrical tape 18–25 mm wide and a light, matte floor or a large white cartolina/illustration board.",
    "For Project C2: cardboard, books or wood blocks to make maze walls at least 10 cm high.",
    "A computer with Arduino IDE 2.x installed (free from arduino.cc). Select Tools > Board > Arduino Uno and the correct Port.",
  ],
  parts: [
    { name: "UNO R3 board (1)", desc: "The \"brain\". Runs your Arduino sketch and reads sensors.", image: IMG.uno },
    { name: "Sensor Shield v5.0 (1)", desc: "Plugs on top of the UNO. Every pin gets a 3-pin G/V/S header, so sensors plug in with no breadboard.", image: IMG.shield },
    { name: "L298N motor driver (1)", desc: "Turns the small Arduino signals into motor power. Drives the left pair and right pair of motors forward or backward at variable speed.", image: IMG.l298n },
    { name: "HC-SR04 ultrasonic sensor (1)", desc: "Measures distance (2–400 cm) with sound echoes. The car's \"eyes\" for obstacles and walls.", image: IMG.hcsr04 },
    { name: "SG90 micro servo (1)", desc: "Turns the ultrasonic sensor left and right so the car can look around.", image: IMG.servo },
    { name: "Pan-tilt bracket (1 set)", desc: "Holds the servo and the HC-SR04 at the front of the car.", image: IMG.pantilt },
    { name: "4-channel tracking board (1)", desc: "Comparator board with 4 blue sensitivity knobs. Converts the probe signals into clean HIGH/LOW outputs.", image: IMG.tracker },
    { name: "IR line probes (4)", desc: "Small TCRT5000-type sensors mounted under the front to see black tape.", image: IMG.probes },
    { name: "Dupont jumper wires", desc: "Female-female ribbon wires for all signal connections.", image: IMG.wires },
    { name: "USB cable, red/black wire, header pins", desc: "USB for programming; red/black wire for power; header strip for spare connections.", image: IMG.usb },
  ],
  chassisAssembly: {
    intro: "Before wiring any electronics, build the mechanical chassis. These five steps assemble the 4WD robot base: brackets, motors, encoder discs, wheels, and the upper deck.",
    parts: [
      { name: "Wheel (4)", image: IMG.partWheel, desc: "Rubber tire that pushes onto each motor shaft." },
      { name: "Chassis Plate (2)", image: IMG.partChassisPlate, desc: "Flat plate that holds all the parts. Two plates: top and bottom." },
      { name: "Encoder Disc (4)", image: IMG.partEncoderDisc, desc: "Slotted disc that measures wheel speed." },
      { name: "DC Gear Motor (4)", image: IMG.partMotor, desc: "Motor that spins each wheel." },
      { name: "Long Screw (8)", image: IMG.partLongScrew, desc: "Long screw that holds the motors." },
      { name: "Battery Holder (1)", image: IMG.partBatteryHolder, desc: "Box that holds the batteries." },
      { name: "Motor Bracket (8)", image: IMG.partMotorBracket, desc: "Metal clip that holds each motor to the plate." },
      { name: "Short Screw (12)", image: IMG.partShortScrew, desc: "Short screw for boards and spacers." },
      { name: "Hex Spacer (4)", image: IMG.partHexSpacer, desc: "Brass rod that spaces the top and bottom plates apart." },
      { name: "Hex Nut (8)", image: IMG.partHexNut, desc: "Nut that locks the motor screws tight." },
    ],
    steps: [
      { num: 1, title: "Install motor brackets", image: IMG.asmStep01, desc: "Place the motor brackets in the matching lower chassis slots. Keep the axle openings facing the wheel positions." },
      { num: 2, title: "Position motors and encoder discs", image: IMG.asmStep02, desc: "Fit one encoder disc to each motor shaft as shown in the kit instructions. Seat the four motors in their brackets." },
      { num: 3, title: "Secure motors", image: IMG.asmStep03, desc: "Insert the motor mounting screws and tighten the nuts evenly. Check that the motors sit firmly and each shaft turns freely." },
      { num: 4, title: "Attach wheels", image: IMG.asmStep04, desc: "Press each wheel onto its motor shaft. Support the motor while pressing and check that the wheels clear the chassis." },
      { num: 5, title: "Add spacers and upper chassis", image: IMG.asmStep05, desc: "Fasten the spacers to the lower chassis. Align the upper plate with the spacers and secure it with screws. Check that the frame is stable." },
    ],
  },
  chassisPrint: {
    intro: "If you have a 3D printer, you can print your own chassis plates and motor mounts. This is useful when an acrylic plate cracks, when you build extra cars for a class, or when you want a smaller two-wheel version. Skip this part if you are using the acrylic plates from the kit.",
    thicknessNote: "All sizes below were measured directly from the supplied files. The chassis plates are 3 mm thick and have the same outline and hole pattern in every version, so the build steps in Part 3 still apply.",
    filesNote: "Part A plus Part B make exactly the same outline as the one-piece plate. The halves are only there so the chassis fits on a smaller printer bed.",
    stlPreviews: [
      { name: "4WD_smart_buggy_chassis_1piece.stl", url: IMG.stl1piece, label: "One-piece 4WD plate", size: "150 × 257 × 3" },
      { name: "4WD_smart_buggy_chassis_part_A.stl", url: IMG.stlPartA, label: "Part A (round-end half)", size: "150 × 120 × 3" },
      { name: "4WD_smart_buggy_chassis_part_B.stl", url: IMG.stlPartB, label: "Part B (dovetail half)", size: "150 × 151 × 3" },
      { name: "motor_mount.stl", url: IMG.stlMount, label: "Motor mount", size: "16 × 33 × 2.5" },
    ],
    figures: {
      threeWays: IMG.figThreeWays,
      bedFit: IMG.figBedFit,
      option1: IMG.figOption1,
      option2: IMG.figOption2,
      option3: IMG.figOption3,
      dovetail: IMG.figDovetail,
      mountDims: IMG.figMountDims,
    },
    printFiles: [
      { file: "4WD_smart_buggy_chassis_1piece.stl", size: "150 × 257 × 3", what: "Complete 4WD plate in one piece.", qty: "2 (bottom and top deck)" },
      { file: "4WD_smart_buggy_chassis_part_A.stl", size: "150 × 120 × 3", what: "Round-end half with one axle position. Has two dovetail tabs.", qty: "1 per plate" },
      { file: "4WD_smart_buggy_chassis_part_B.stl", size: "150 × 151 × 3", what: "Other half with one axle position, the wide side tabs and two dovetail sockets.", qty: "1 per plate" },
      { file: "motor_mount.step", size: "16 × 33 × 2.5", what: "Original T-shaped motor mount (CAD format).", qty: "8 for 4WD, 4 for 2WD" },
      { file: "motor_mount.stl", size: "16 × 33 × 2.5", what: "Same mount converted to STL for slicers that cannot open STEP files (for example Cura).", qty: "same as above" },
      { file: "motor_mount_x8_plate.stl", size: "79 × 72 × 2.5", what: "All 8 mounts arranged on one plate, ready to slice.", qty: "1" },
    ],
    versions: [
      { version: "Option 1: One-piece 4WD", files: "One-piece plate ×2, motor mounts ×8", bed: "At least 256 × 256 mm with the plate turned 45°, or 260 mm+ straight", when: "You have a large printer and want the stiffest chassis." },
      { version: "Option 2: Two-piece 4WD", files: "Part A ×2, Part B ×2, motor mounts ×8", bed: "180 × 180 mm or larger (one half per print)", when: "Your printer is smaller, such as a 220 × 220 mm bed." },
      { version: "Option 3: Compact 2WD", files: "Part B ×2, motor mounts ×4, plus a ball caster (not in the kit)", bed: "180 × 180 mm or larger", when: "You want a smaller, cheaper car that turns more tightly." },
    ],
    printSettings: [
      { setting: "Material", value: "PLA or PLA+ for most rooms. Use PETG if the car will sit in a hot vehicle or in direct sun, because PLA softens at about 55–60 °C." },
      { setting: "Nozzle / layer height", value: "0.4 mm nozzle, 0.2 mm layers (15 layers for the 3 mm plate)." },
      { setting: "Walls / top and bottom", value: "4 walls; 4 top and 4 bottom layers." },
      { setting: "Infill", value: "Plates: 40%, gyroid or grid. Motor mounts: 100% (they are thin and carry the motor load)." },
      { setting: "Supports", value: "None. Every part is flat." },
      { setting: "Orientation", value: "Flat on the bed, exactly as the files open. Print the motor mounts lying flat, not standing up." },
      { setting: "Bed adhesion", value: "Clean bed and a skirt. For PETG, or if the corners lift, add a 5 mm brim and peel it off afterwards." },
      { setting: "Elephant-foot compensation", value: "0.1–0.2 mm. This keeps the first layer from spreading, which matters for the dovetail joint and the slots." },
      { setting: "Estimated material (PLA)", value: "About 70 g for each one-piece plate, 30 g for Part A, 40 g for Part B, 11 g for 8 mounts. Your slicer gives the exact weight and time." },
    ],
    steps: [
      {
        num: "P1", title: "Load the files in your slicer", image: null,
        bullets: [
          "Open the files in your slicer (Cura, PrusaSlicer, OrcaSlicer or Bambu Studio).",
          "Check the size after import. The files are in millimetres, so the plate must measure 150 mm wide. Do not rescale the plates.",
          "PrusaSlicer, OrcaSlicer and Bambu Studio open motor_mount.step directly. In Cura, use motor_mount.stl or motor_mount_x8_plate.stl instead.",
          "Option 1 on a 256 mm bed: rotate the plate 45° on the Z axis so it lies corner to corner, and turn off the brim. There is only about 3 mm spare on each side.",
        ],
      },
      {
        num: "P2", title: "Print the chassis plates",
        bullets: [
          "You need two plates: one for the bottom deck (motors, driver, battery) and one for the top deck (UNO, servo, sensors).",
          "Option 1: print the one-piece plate twice.",
          "Option 2: print Part A and Part B, then repeat for the second deck (4 prints in total).",
          "Option 3: print Part B twice.",
        ],
        tip: "Let the bed cool before removing the plate. Bending a warm plate off the bed is the most common cause of a warped chassis.",
      },
      {
        num: "P3", title: "Join Part A and Part B (Option 2 only)", image: IMG.figDovetail,
        bullets: [
          "The two dovetail tabs on Part A slide into the two sockets on Part B.",
          "The files were modelled with no gap in the joint, so expect a very tight fit. Scrape off any first-layer flare (elephant foot) with a deburring tool or a small file until the parts slide together by hand.",
          "Dry-fit first and check that the plate lies flat on the table.",
          "Glue the joint with cyanoacrylate (super glue) or 5-minute epoxy. Press the plate flat on a table for 10 minutes while it sets.",
        ],
        tip: "The top deck joint should not sit directly over the bottom deck joint if you can avoid it. Turn the top plate end for end so the joints are on opposite sides of the standoffs.",
      },
      {
        num: "P4", title: "Print and fit the motor mounts", image: IMG.figMountDims,
        bullets: [
          "Print 8 mounts for 4WD or 4 for 2WD, lying flat at 100% infill.",
          "Each motor uses two mounts: an outer mount in the notch on the plate edge and an inner mount in the 4 × 12 mm slot. The gear motor sits between them and two long M3 screws pass through mount, motor and mount.",
          "The foot (16 mm wide) rests on the top face of the plate; the narrower stem goes through the plate and holds the motor underneath.",
          "The stem is 12.8 mm wide. It matches the 12.8 mm edge notch, but the inner slots measure 12.0 mm, so the inner mounts will not pass as printed. Either file about 0.4 mm off each side of the stem, or print the inner mounts with the X (width) scale set to 93%. That scaling does not move the screw holes.",
        ],
        warning: "Test fit before printing all of them.",
      },
      {
        num: "P5", title: "Clean up the holes",
        bullets: [
          "The round mounting holes in the plate are 3.0–4.0 mm across, and the holes in the motor mounts are 3.0 mm. Printed holes usually come out slightly small.",
          "Twist a 3.2 mm drill bit through the 3.0 mm holes by hand (or with a pin vise) so M3 screws pass freely.",
          "Remove any strings or blobs from the slots so the line probes, standoffs and wires fit.",
        ],
        conclusion: "Your printed chassis is now ready. Continue with Part 3. Build the Base Car from Step 6, using the printed parts in place of the acrylic ones.",
      },
    ],
    compact2wd: {
      title: "Option 3: Building the compact 2WD",
      desc: "The 2WD version uses one Part B for each deck, two TT motors with wheels at the round end, and a small ball caster at the dovetail end. The caster is not in the kit; any small ball caster that bolts on with M3 screws will do.",
      points: [
        { label: "Front of the car", text: "Treat the caster end as the front. The line probes then sit ahead of the drive wheels, which helps line following." },
        { label: "Caster", text: "Bolt it under the bottom plate near the dovetail end, on the centre line. Use existing holes if they line up with your caster; otherwise drill two 3.2 mm holes. Add spacers under the caster until the plate sits level when the wheels are on." },
        { label: "Wiring", text: "Keep the master pin map from Part 3. The left motor goes to OUT1/OUT2, the right motor to OUT3/OUT4. Only one motor per side, so there is no parallel pair." },
        { label: "Direction check", text: "Because the front is now the caster end, run the Motor Test (Step 18). If the car drives wheels-first instead of caster-first, swap the two wires of each motor or set LEFT_INVERT and RIGHT_INVERT to true. If the left and right sides are swapped, exchange the two motor plugs between OUT1/OUT2 and OUT3/OUT4." },
        { label: "Code", text: "All six sketches work unchanged. A 2WD car pivots faster, so re-tune the turn timings: TURN_MS (Project A), INCH_MS and TURN_CLEAR_MS (Project C1) and TURN90_MS and CELL_MS (Project C2)." },
      ],
      tip: "The 2WD battery and electronics share a smaller plate. Put the battery box on the bottom deck between the motors to keep the weight over the drive wheels, which gives better grip.",
    },
  },
  baseCar: {
    intro: "The base car is the same for all three projects. Follow the steps in order. The side view below shows where everything ends up.",
    sideViewImage: IMG.sideView,
    sideViewCaption: "Figure 2. Side view of the finished base car: two plates, motors below, electronics on top, sensors at the front.",
    steps: [
      { num: 1, title: "Prepare the four motors", image: IMG.motors, desc: "If the motors have no wires, solder a red and a black wire (about 15 cm) to each motor's two tabs.", bullets: ["Mark every motor with tape: LF, LR, RF, RR (left front, left rear, right front, right rear).", "Optional: slide an encoder disk onto the inner shaft of each motor for later upgrades."], tip: "Solder the red wire to the same tab on every motor. This makes directions consistent later." },
      { num: 2, title: "Mount the motors on the bottom plate", image: IMG.mounts, desc: "Each motor uses two T-shaped mounts. Push one mount up through the slot from underneath and place the other against the outside of the motor.", bullets: ["Pass two long M3 screws through mount, motor and mount, then tighten the nuts.", "Motor shafts point outward; wires point toward the middle of the plate.", "Repeat for all four corners."], tip: "Do not over-tighten. Acrylic cracks easily. Stop when the motor no longer wobbles." },
      { num: 3, title: "Fit the wheels", image: IMG.wheels, desc: "Line up the flat side of the wheel hole with the flat of the motor shaft and press straight on.", bullets: ["Support the motor from behind while pressing so the mount does not bend.", "Spin each wheel by hand: it should turn freely and not rub the chassis."] },
      { num: 4, title: "Mount the L298N driver", image: IMG.l298n, desc: "Place the L298N on the bottom plate between the front motors, screw terminals facing the sides so motor wires reach easily.", bullets: ["Use short M3 screws with a brass standoff or nut as a spacer so the board does not touch the plate.", "Remove the two jumper caps on ENA and ENB. The Arduino will control speed through these pins.", "Keep the 5V-EN jumper (near the power terminal) in place if your battery is 12 V or less."] },
      { num: 5, title: "Connect the motors to the L298N", image: IMG.motors, desc: "The two left motors are wired together (in parallel), and so are the two right motors.", bullets: ["LF + LR red wires into OUT1, black wires into OUT2.", "RF + RR red wires into OUT3, black wires into OUT4.", "Twist each pair of wires before inserting and tighten the terminal screws firmly."], tip: "If one side later spins backward, just swap its two wires on the terminal, or change LEFT_INVERT / RIGHT_INVERT in the code." },
      { num: 6, title: "Install the line probes (for Projects B and C1)", image: IMG.probes, desc: "Screw the four IR probes in a straight row under the front edge of the bottom plate, facing down.", bullets: ["Keep the probes about 5–10 mm above the floor.", "Spacing: the two middle probes should be about as far apart as your tape is wide (around 18–20 mm). Outer probes go 15–20 mm further out.", "Order seen from behind the car: S1 far-left, S2, S3, S4 far-right."] },
      { num: 7, title: "Fit the standoffs and the battery box", image: IMG.battery, desc: "Screw the brass standoffs into the bottom plate (usually 4–6 positions).", bullets: ["Fix the battery box on the rear half of the bottom plate with screws or double-sided tape.", "Route the red wire to where your ON/OFF switch will sit."], tip: "Keep the heavy battery low and toward the middle for better balance." },
      { num: 8, title: "Attach the top plate", image: IMG.chassis, desc: "Pull all wires (motor power, L298N signal pins, probe cables) up through the large holes in the top plate.", bullets: ["Place the top plate on the standoffs and fix with short M3 screws.", "Screw the 4-channel tracking board on the top plate near the front, knobs facing up so you can adjust them."] },
      { num: 9, title: "Mount the UNO and the Sensor Shield", image: IMG.uno, desc: "Fix the UNO on the top plate with short screws and standoffs, USB port toward the rear or side so you can reach it.", bullets: ["Press the Sensor Shield straight down onto the UNO headers. Check that no pin is bent or left outside.", "On the shield, every digital pin has three pins: G (ground), V (5 V) and S (signal)."], secondaryImage: IMG.shield },
      { num: 10, title: "Assemble the servo \"neck\" and the HC-SR04", image: IMG.servo, desc: "Center the servo first. Plug it into D3, upload the Sensor Test sketch from Step 14, and let it stop at 90 degrees. Now fit the horn pointing straight forward.", bullets: ["Build the pan bracket around the servo with the small screws, then screw the bracket to the front of the top plate.", "Clip or screw the HC-SR04 onto the bracket face with the two \"eyes\" looking forward."], secondaryImage: IMG.pantilt, tip: "If you skip centering, the sensor will look sideways when the code thinks it looks forward." },
    ],
    powerWiring: [
      { connection: "Battery positive", from: "Battery box red wire, through the ON/OFF switch", to: "L298N 12V (VS) terminal" },
      { connection: "Battery negative", from: "Battery box black wire", to: "L298N GND terminal" },
      { connection: "Common ground", from: "L298N GND terminal", to: "Sensor Shield G pin (any row)" },
      { connection: "UNO power, 2×18650 (7.4V)", from: "L298N 12V terminal (second wire)", to: "UNO VIN pin on the shield power header" },
      { connection: "UNO power, 4×AA (6V)", from: "L298N +5V terminal", to: "UNO 5V pin on the shield power header" },
    ],
    powerCaution: "Use only ONE of the two UNO power options. Keep the L298N 5V-EN jumper fitted only when the battery is 12 V or less. When you upload with USB while the car is wired to the 5V option, switch the battery OFF first.",
    pinMap: [
      { module: "L298N ENA", pin: "D5 (S)", color: "purple", usedIn: "all" },
      { module: "L298N IN1", pin: "D7 (S)", color: "blue", usedIn: "all" },
      { module: "L298N IN2", pin: "D8 (S)", color: "cyan", usedIn: "all" },
      { module: "L298N ENB", pin: "D6 (S)", color: "purple", usedIn: "all" },
      { module: "L298N IN3", pin: "D9 (S)", color: "green", usedIn: "all" },
      { module: "L298N IN4", pin: "D11 (S)", color: "lime", usedIn: "all" },
      { module: "Servo signal (orange)", pin: "D3: S, red to V, brown to G", color: "servo cable", usedIn: "A, C2" },
      { module: "HC-SR04 Trig", pin: "A0 (S)", color: "light blue", usedIn: "A, C2" },
      { module: "HC-SR04 Echo", pin: "A1 (S)", color: "violet", usedIn: "A, C2" },
      { module: "HC-SR04 VCC / GND", pin: "V / G on A0 or A1 row", color: "red / black", usedIn: "A, C2" },
      { module: "Tracker OUT1 (far left)", pin: "A2 (S)", color: "red", usedIn: "B, C1" },
      { module: "Tracker OUT2", pin: "A3 (S)", color: "orange", usedIn: "B, C1" },
      { module: "Tracker OUT3", pin: "A4 (S)", color: "green", usedIn: "B, C1" },
      { module: "Tracker OUT4 (far right)", pin: "A5 (S)", color: "blue", usedIn: "B, C1" },
      { module: "Tracker VCC / GND", pin: "V / G on any row", color: "red / black", usedIn: "B, C1" },
      { module: "Maze mode jumper", pin: "D12 to G (only for replay)", color: "any", usedIn: "C1" },
    ],
    pinMapNote: "Why D9 and D11 for IN3 and IN4? The Servo library takes over the timer that makes PWM on D9 and D10. IN3 and IN4 only need simple on/off signals, so D9 is safe, and the speed pins ENA and ENB stay on D5 and D6 which the servo does not affect.",
    motorTestCode: MOTOR_TEST,
    motorTestDesc: "Lift the car so the wheels are in the air. Connect USB, open 00_MotorTest.ino, click Upload, then open Serial Monitor at 9600 baud. Turn the battery switch ON. During \"FORWARD\" all four wheels must roll forward. If one side rolls backward, set LEFT_INVERT or RIGHT_INVERT to true.",
    sensorTestCode: SENSOR_TEST,
    sensorTestDesc: "Upload 01_SensorTest.ino. The servo sweeps 30, 90 and 150 degrees and the Serial Monitor prints the distance and the four line sensors (B = black, w = white). Hold your hand in front of the HC-SR04: the distance should drop. Put the car on your track and turn each blue knob until its LED switches cleanly.",
    baseCarTip: "Your base car is finished when the Motor Test drives all wheels the right way and the Sensor Test gives sensible distances and B/w readings. Do not start a project before both tests pass.",
  },
  projects: [
    {
      key: "A",
      title: "Project A: Obstacle Avoidance Car",
      image: IMG.hcsr04,
      howItWorks: "The HC-SR04 sends a short burst of 40 kHz sound and times how long the echo takes to return. Sound travels about 0.0343 cm per microsecond and makes a round trip, so distance (cm) = echo time (microseconds) / 58. The car drives forward while the path is clear. When something is closer than 25 cm it stops, reverses briefly, turns its servo \"neck\" to look right and left, and then turns toward the side with more free space. If both sides are blocked it turns around.",
      flowchartImage: IMG.obstacleFlow,
      flowchartCaption: "Figure 4. Program flow of the obstacle avoidance car.",
      steps: [
        { num: "A1", title: "Check the hardware", image: IMG.servo, desc: "This project uses the base car plus the servo on D3 and the HC-SR04 on A0/A1. The line probes can stay on; they are ignored.", bullets: ["Make sure the HC-SR04 is not tilted down, or it will \"see\" the floor."] },
        { num: "A2", title: "Upload the code", desc: "Open A_ObstacleAvoidance.ino, upload with the battery switch OFF, unplug USB, place the car on the floor and switch ON. The car waits 2 seconds before moving." },
        { num: "A3", title: "Test and tune", desc: "Start in an open room, then add boxes and chair legs as obstacles.", bullets: ["If the car looks sideways when centered, change SERVO_CENTER (e.g. 85 or 95).", "If it turns too little or too much, change TURN_MS. On carpet you may need a higher TURN_SPEED.", "If it bumps into things, raise STOP_CM to 30 or 35."] },
      ],
      code: OBSTACLE_AVOIDANCE,
      tuningTable: [
        { setting: "STOP_CM", default: "25", effect: "Reacts earlier; safer but needs more space." },
        { setting: "SLOW_CM", default: "45", effect: "Starts slowing down earlier." },
        { setting: "CRUISE_SPEED", default: "170", effect: "Faster car; needs larger STOP_CM." },
        { setting: "TURN_MS", default: "350", effect: "Larger turn angle per decision." },
        { setting: "LOOK_RIGHT / LOOK_LEFT", default: "20 / 160", effect: "How far the servo looks to each side (keep 0–180)." },
      ],
      challenges: [
        "Add a buzzer on D12 that beeps faster as the obstacle gets closer.",
        "Instead of three looks, sweep from 20 to 160 degrees in 10 degree steps and turn toward the angle with the largest distance.",
      ],
    },
    {
      key: "B",
      title: "Project B: Line-Following Robot",
      image: IMG.probes,
      howItWorks: "Each IR probe shines infrared light at the floor. A white floor reflects it back; black tape absorbs it. The tracking board compares the reflection with the knob setting and outputs a clean digital signal. With four probes the car does not just know \"on or off the line\", it knows how far the line is from the center. Each probe gets a weight (-3, -1, +1, +3) and the average weight of the probes that see black is the error. The code then steers with a simple PD controller: the P part turns harder when the error is large, and the D part looks at how fast the error is changing to stop the zig-zag.",
      diagrams: [
        { image: IMG.lineSensors, caption: "Figure 5. What the four sensors see and what the car does." },
        { image: IMG.lineFlow, caption: "Figure 6. Program flow of the line follower." },
      ],
      steps: [
        { num: "B1", title: "Make the track", desc: "Use black electrical tape 18–25 mm wide on a light, matte surface. Glossy tiles can reflect like black; test first.", bullets: ["Keep curves gentle at first (radius at least 15 cm). Add sharp corners later.", "Leave at least 15 cm between parallel lines so the outer probes do not see the neighbour line."] },
        { num: "B2", title: "Re-check the sensors on your track", image: IMG.tracker, desc: "Run 01_SensorTest again with the car on the actual track and adjust the four knobs. Lighting changes the readings, so calibrate in the room where you will run." },
        { num: "B3", title: "Upload the line follower", desc: "Open B_LineFollower.ino, upload, place the car with the line between S2 and S3, and switch ON." },
        { num: "B4", title: "Tune the PD values", desc: "Change one value at a time and test the same track each time.", bullets: ["Weaves left and right on straights: lower KP (try 35) or raise KD (try 120).", "Runs off the outside of curves: raise KP (try 55) or lower BASE_SPEED.", "Too slow: raise BASE_SPEED by 10 at a time and re-tune.", "Spins on the spot at the start: the line is not under the sensors, or BLACK_LEVEL is inverted."] },
      ],
      code: LINE_FOLLOWER,
      challenges: [
        "Add the HC-SR04: stop on the line if an obstacle is closer than 15 cm, then continue when it is removed.",
        "Count the cross lines (all four sensors black) and stop at the third one, like a delivery robot stopping at station 3.",
      ],
    },
    {
      key: "C",
      title: "Project C: Maze Solver",
      howItWorks: "A maze solver needs a rule for choosing a path at every junction. The simplest reliable rule is the Left-Hand Rule: keep your left hand on the wall (or line) and you will eventually reach the exit of any maze whose walls are connected. At each junction the car prefers Left, then Straight, then Right, then U-turn (Back).",
      versions: [
        { key: "C1", title: "C1. Line Maze Solver with shortest-path learning", mazeType: "Black tape maze on the floor, finish is a black square. Learns the shortest route.", sensors: "4-channel line tracker (A2–A5)" },
        { key: "C2", title: "C2. Wall Maze Solver with ultrasonic scanning", mazeType: "Real walls made of cardboard or wood, square cells 30–40 cm.", sensors: "HC-SR04 on the servo (A0, A1, D3)" },
      ],
      c1: {
        desc: "On the first run the car explores the maze with the left-hand rule and writes every decision into a list, for example S L B L R. A \"B\" means it hit a dead end and turned back. Any three moves with a B in the middle can be replaced by one move, because the car simply went into a dead end and came back out. The code does this on the fly by adding up the turn angles (L = 270, S = 0, R = 90, B = 180) and taking the result modulo 360.",
        simplificationTable: [
          { pattern: "L B L", becomes: "S", why: "270 + 180 + 270 = 720 → 0: straight" },
          { pattern: "L B S", becomes: "R", why: "270 + 180 + 0 = 450 → 90: right" },
          { pattern: "L B R", becomes: "B", why: "270 + 180 + 90 = 540 → 180: back" },
          { pattern: "S B L", becomes: "R", why: "0 + 180 + 270 = 450 → 90: right" },
          { pattern: "S B S", becomes: "B", why: "0 + 180 + 0 = 180: back" },
          { pattern: "R B L", becomes: "B", why: "90 + 180 + 270 = 540 → 180: back" },
        ],
        mazeImage: IMG.lineMaze,
        mazeCaption: "Figure 7. Example line maze with six junctions (J1–J6) and five dead ends.",
        workedExample: "Starting at START and driving up, the explore run records: J1 S, J2 L (dead end) B, J2 L, J3 R, J4 L (dead end) B, J4 S, J5 L, J6 L (dead end) B, J6 S. That is S L B L R L B S L L B S. After simplification it becomes S S R R L R, the direct route. The car saves this in EEPROM, so it survives a reset.",
        flowchartImage: IMG.lineMazeFlow,
        flowchartCaption: "Figure 8. Program flow of the line maze solver.",
        steps: [
          { num: "C1-1", title: "Build the maze", image: IMG.lineMaze, desc: "Use the same tape as Project B. Make all turns 90 degrees and keep at least 25 cm between junctions.", bullets: ["Make the FINISH a solid black square about 10×10 cm, wide enough to cover all four probes.", "Dead ends should end cleanly with no tape stubs."] },
          { num: "C1-2", title: "Run 1: explore", desc: "Leave D12 unconnected. Upload C1_LineMazeSolver.ino, place the car at START and switch ON. Watch it explore. When it reaches the black square it stops and the UNO LED (D13) blinks fast. With USB connected, the Serial Monitor prints the saved shortest path." },
          { num: "C1-3", title: "Run 2: fast replay", desc: "Connect a jumper wire from D12 (S) to G. Put the car back at START and press the UNO RESET button. The LED stays on to show replay mode and the car drives the shortest path with no dead ends. Remove the jumper to explore a new maze." },
          { num: "C1-4", title: "Calibrate the junction behaviour", desc: "INCH_MS moves the wheels onto the junction before turning. TURN_CLEAR_MS is the blind spin time before looking for the new line. Keep FOLLOW_SPEED low (100–130) while tuning." },
        ],
        code: LINE_MAZE_SOLVER,
      },
      c2: {
        desc: "In a maze with real walls the car cannot see the line, so it uses its servo-mounted HC-SR04. It moves through the maze one cell at a time. In every cell it stops and scans left, front and right, then uses the same Left-Hand Rule. A side counts as open when the wall is more than 30 cm away. When all three directions read more than 150 cm the car has driven out of the maze and stops.",
        scanImage: IMG.wallMaze,
        scanCaption: "Figure 9. In each cell the car looks left, front and right.",
        flowchartImage: IMG.wallMazeFlow,
        flowchartCaption: "Figure 10. Program flow of the wall maze solver.",
        steps: [
          { num: "C2-1", title: "Build the maze", desc: "Walls at least 10 cm high, made from flat cardboard or wood. Soft cloth absorbs sound and gives bad readings. Cells about 30–40 cm square. Start simple: a 3×3 cell maze with one exit." },
          { num: "C2-2", title: "Calibrate 90° turns and one cell", desc: "Timed moves depend on your battery, floor and motors, so calibrate before solving.", bullets: ["TURN90_MS: put a strip of tape on the floor along the car. Run spinLeft90() repeatedly and adjust until each turn is exactly a quarter turn.", "CELL_MS: time how long the car takes to drive from the center of one cell to the center of the next at DRIVE_SPEED.", "Recalibrate when the batteries get weak."] },
          { num: "C2-3", title: "Upload and solve", desc: "Open C2_WallMazeSolver.ino, upload, place the car in the center of the start cell facing into the maze, and switch ON. Watch the Serial Monitor to see L, F and R distances and each decision." },
        ],
        code: WALL_MAZE_SOLVER,
      },
      challenges: [
        "C1: add a start button on D2 so you can switch between explore and replay without the jumper.",
        "C2: fit the encoder disks with a slot sensor (sold separately) to measure distance and turns accurately instead of using time.",
        "C2: record the decisions and apply the same path simplification as C1 so the second run is shorter.",
      ],
    },
  ],
  troubleshooting: [
    { symptom: "Upload fails (\"not in sync\")", cause: "Wrong board or port; a wire on D0 or D1", fix: "Select Arduino Uno and the right port; keep D0/D1 free." },
    { symptom: "UNO resets when motors start", cause: "Battery too weak; voltage drops", fix: "Charge or replace cells; use 2×18650; add the ON/OFF switch close to the battery." },
    { symptom: "One side does not move", cause: "ENA/ENB jumper still on, or loose wire", fix: "Remove jumper caps, check D5/D6 wires and terminal screws." },
    { symptom: "Car drives backward or spins when it should go forward", cause: "Motor wires reversed", fix: "Swap the two wires of that side, or set LEFT_INVERT / RIGHT_INVERT." },
    { symptom: "Car curves on a straight", cause: "Motors differ in speed", fix: "Lower the faster side slightly, e.g. setMotor(170, 160)." },
    { symptom: "Distance always 400 cm", cause: "Trig/Echo swapped or no power to HC-SR04", fix: "Check A0 = Trig, A1 = Echo, VCC on V, GND on G." },
    { symptom: "Servo jitters", cause: "Servo shares a weak 5V supply", fix: "Use fresh batteries; keep servo moves short; do not power from USB only." },
    { symptom: "Line sensors always B or always w", cause: "Knob mis-set, probes too high, or BLACK_LEVEL inverted", fix: "Re-run Sensor Test, lower probes to 5–10 mm, adjust knobs." },
    { symptom: "Maze car misses turns", cause: "INCH_MS or TURN_CLEAR_MS not tuned", fix: "Slow down FOLLOW_SPEED and tune one value at a time." },
  ],
  sketchList: [
    { name: "00_MotorTest.ino", purpose: "Checks motor direction for both sides." },
    { name: "01_SensorTest.ino", purpose: "Checks servo, HC-SR04 and the four line sensors." },
    { name: "A_ObstacleAvoidance.ino", purpose: "Project A." },
    { name: "B_LineFollower.ino", purpose: "Project B." },
    { name: "C1_LineMazeSolver.ino", purpose: "Project C1, line maze with EEPROM shortest path." },
    { name: "C2_WallMazeSolver.ino", purpose: "Project C2, wall maze with ultrasonic scanning." },
  ],
  sketchNote: "Each sketch must sit in a folder with the same name (e.g. B_LineFollower/B_LineFollower.ino). The accompanying ZIP file already has this layout.",
  references: [
    "Arduino (n.d.) Servo library reference. Available at: https://docs.arduino.cc/libraries/servo/",
    "Arduino (n.d.) EEPROM library reference. Available at: https://docs.arduino.cc/learn/built-in-libraries/eeprom/",
    "Instructables (n.d.) Smart Robot Car. Available at: https://www.instructables.com/Smart-Robot-Car/",
    "UCTRONICS (2017) Arduino Smart Robot Car Kit User Guide V1.0. Available at: https://www.uctronics.com/download/Amazon/K0065_KIT.pdf",
  ],
};
```

---

## 3. `src/data/smartcarCode.js`

This file holds the Arduino sketches as escaped strings (they are shown in collapsible code boxes on the page). Because they are long single-line escaped strings, each sketch is presented here as a readable C++ block; map them back to the exported constants `MOTOR_TEST`, `SENSOR_TEST`, `OBSTACLE_AVOIDANCE`, `LINE_FOLLOWER`, `LINE_MAZE_SOLVER`, `WALL_MAZE_SOLVER`.

### `00_MotorTest.ino` (`MOTOR_TEST`)

> A short wording file describing the kit sketches. (See the exported `MOTOR_TEST` string in `smartcarCode.js`.)

### `01_SensorTest.ino` (`SENSOR_TEST`)

```cpp
/*
01_SensorTest.ino
Checks the HC-SR04 ultrasonic sensor, the SG90 servo and the
4-channel line tracking module. Open Serial Monitor at 9600 baud.
Wiring:
Servo signal -> D3          HC-SR04 Trig -> A0, Echo -> A1
Line sensor OUT1..OUT4 -> A2, A3, A4, A5  (OUT1 = far LEFT probe)
*/
#include <Servo.h>
const int SERVO_PIN = 3;
const int TRIG = A0, ECHO = A1;
const int LINE_PIN[4] = {A2, A3, A4, A5};
// Most TCRT5000 tracking boards output HIGH over a black line
// (no reflection) and LOW over white. If yours is the opposite, set LOW.
const int BLACK_LEVEL = HIGH;
Servo neck;
long readDistanceCm() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  unsigned long t = pulseIn(ECHO, HIGH, 25000UL);  // about 4 m max
  if (t == 0) return 400;                           // no echo = far away
  return t / 58;                                    // microseconds to cm
}
void setup() {
  Serial.begin(9600);
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  for (int i = 0; i < 4; i++) pinMode(LINE_PIN[i], INPUT);
  neck.attach(SERVO_PIN);
  neck.write(90);
  Serial.println(F("Sensor test. Servo sweeps 30-90-150 deg."));
}
void loop() {
  const int angles[3] = {30, 90, 150};
  for (int a = 0; a < 3; a++) {
    neck.write(angles[a]);
    delay(400);                         // give the servo time to arrive
    Serial.print(F("Servo "));
    Serial.print(angles[a]);
    Serial.print(F(" deg  distance = "));
    Serial.print(readDistanceCm());
    Serial.print(F(" cm   line [L..R] = "));
    for (int i = 0; i < 4; i++) {
      Serial.print(digitalRead(LINE_PIN[i]) == BLACK_LEVEL ? "B " : "w ");
    }
    Serial.println();
  }
}
```

### `A_ObstacleAvoidance.ino` (`OBSTACLE_AVOIDANCE`)

```cpp
/*
Project A: Obstacle Avoidance Car
The car drives forward. When something is closer than STOP_CM, it stops,
backs up a little, "looks" right and left with the servo-mounted
HC-SR04, then turns toward the side with more free space.
Wiring:
L298N  ENA D5, IN1 D7, IN2 D8 (left)   ENB D6, IN3 D9, IN4 D11 (right)
Servo  D3        HC-SR04  Trig A0, Echo A1
*/
#include <Servo.h>
// ---------- pins ----------
const int ENA = 5, IN1 = 7, IN2 = 8;
const int ENB = 6, IN3 = 9, IN4 = 11;
const int SERVO_PIN = 3;
const int TRIG = A0, ECHO = A1;
// ---------- tuning ----------
const int  SERVO_CENTER = 90;    // adjust until the sensor faces straight ahead
const int  LOOK_RIGHT   = 20;    // servo angle when looking right
const int  LOOK_LEFT    = 160;   // servo angle when looking left
const int  STOP_CM      = 25;    // obstacle distance that triggers a decision
const int  SLOW_CM      = 45;    // start slowing down below this distance
const int  CRUISE_SPEED = 170;   // 0..255
const int  TURN_SPEED   = 180;
const unsigned long BACKUP_MS = 300;
const unsigned long TURN_MS   = 350;   // roughly 45 to 60 degrees; tune on your floor
const bool LEFT_INVERT = false, RIGHT_INVERT = false;
Servo neck;
// ---------- motors ----------
void setMotor(int l, int r) {
  if (LEFT_INVERT)  l = -l;
  if (RIGHT_INVERT) r = -r;
  l = constrain(l, -255, 255);
  r = constrain(r, -255, 255);
  digitalWrite(IN1, l >= 0 ? HIGH : LOW);  digitalWrite(IN2, l >= 0 ? LOW : HIGH);
  digitalWrite(IN3, r >= 0 ? HIGH : LOW);  digitalWrite(IN4, r >= 0 ? LOW : HIGH);
  analogWrite(ENA, abs(l));
  analogWrite(ENB, abs(r));
}
void stopMotors() { setMotor(0, 0); }
// ---------- ultrasonic ----------
long readDistanceCm() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  unsigned long t = pulseIn(ECHO, HIGH, 25000UL);
  if (t == 0) return 400;
  return t / 58;
}
// median of 3 readings removes most random spikes
long distanceFiltered() {
  long a = readDistanceCm(); delay(10);
  long b = readDistanceCm(); delay(10);
  long c = readDistanceCm();
  if (a > b) { long t = a; a = b; b = t; }
  if (b > c) { long t = b; b = c; c = t; }
  if (a > b) { long t = a; a = b; b = t; }
  return b;
}
long lookAt(int angle) {
  neck.write(angle);
  delay(450);                    // wait for the servo to settle
  return distanceFiltered();
}
// ---------- behaviour ----------
void avoid() {
  stopMotors();
  delay(100);
  setMotor(-CRUISE_SPEED, -CRUISE_SPEED);   // back up
  delay(BACKUP_MS);
  stopMotors();
  long right = lookAt(LOOK_RIGHT);
  long left  = lookAt(LOOK_LEFT);
  neck.write(SERVO_CENTER);
  delay(250);
  Serial.print(F("Left=")); Serial.print(left);
  Serial.print(F(" cm  Right=")); Serial.print(right); Serial.println(F(" cm"));
  if (left < STOP_CM && right < STOP_CM) {
    // boxed in: turn around (about 180 degrees)
    setMotor(TURN_SPEED, -TURN_SPEED);
    delay(TURN_MS * 3);
  } else if (left > right) {
    setMotor(-TURN_SPEED, TURN_SPEED);      // spin left
    delay(TURN_MS);
  } else {
    setMotor(TURN_SPEED, -TURN_SPEED);      // spin right
    delay(TURN_MS);
  }
  stopMotors();
  delay(100);
}
void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT); pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  stopMotors();
  Serial.begin(9600);
  neck.attach(SERVO_PIN);
  neck.write(SERVO_CENTER);
  delay(2000);                   // time to put the car on the floor
}
void loop() {
  long d = distanceFiltered();
  if (d <= STOP_CM) {
    avoid();
  } else if (d < SLOW_CM) {
    setMotor(CRUISE_SPEED * 3 / 4, CRUISE_SPEED * 3 / 4);   // careful approach
  } else {
    setMotor(CRUISE_SPEED, CRUISE_SPEED);
  }
  delay(40);
}
```

### `B_LineFollower.ino` (`LINE_FOLLOWER`)

```cpp
/*
Project B: Line-Following Robot (4-channel sensor, PD steering)
Follows a black line (about 18 to 25 mm wide electrical tape) on a light floor.
Sensor order seen from BEHIND the car:  S1  S2  S3  S4
                                       far-L L R far-R
Wiring:
L298N  ENA D5, IN1 D7, IN2 D8 (left)   ENB D6, IN3 D9, IN4 D11 (right)
Line sensor OUT1..OUT4 -> A2, A3, A4, A5
*/
const int ENA = 5, IN1 = 7, IN2 = 8;
const int ENB = 6, IN3 = 9, IN4 = 11;
const int LINE_PIN[4] = {A2, A3, A4, A5};
const int BLACK_LEVEL = HIGH;          // set LOW if your module is inverted
// ---------- tuning ----------
const int   BASE_SPEED = 140;          // straight-line speed (0..255)
const int   MAX_SPEED  = 220;
const float KP = 45.0;                 // how hard to steer toward the line
const float KD = 90.0;                 // damping: reduces zig-zag
const int   SEARCH_SPEED = 150;        // spin speed when the line is lost
const bool  LEFT_INVERT = false, RIGHT_INVERT = false;
// position weight of each sensor: negative = line is to the LEFT
const int WEIGHT[4] = {-3, -1, 1, 3};
float lastError = 0;
void setMotor(int l, int r) {
  if (LEFT_INVERT)  l = -l;
  if (RIGHT_INVERT) r = -r;
  l = constrain(l, -255, 255);
  r = constrain(r, -255, 255);
  digitalWrite(IN1, l >= 0 ? HIGH : LOW);  digitalWrite(IN2, l >= 0 ? LOW : HIGH);
  digitalWrite(IN3, r >= 0 ? HIGH : LOW);  digitalWrite(IN4, r >= 0 ? LOW : HIGH);
  analogWrite(ENA, abs(l));
  analogWrite(ENB, abs(r));
}
// returns number of sensors on the line, writes the line position to *err
int readLine(float *err) {
  int count = 0, sum = 0;
  for (int i = 0; i < 4; i++) {
    if (digitalRead(LINE_PIN[i]) == BLACK_LEVEL) {
      sum += WEIGHT[i];
      count++;
    }
  }
  if (count > 0) *err = (float)sum / count;
  return count;
}
void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT); pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  for (int i = 0; i < 4; i++) pinMode(LINE_PIN[i], INPUT);
  setMotor(0, 0);
  Serial.begin(9600);
  delay(2000);                 // place the car on the line
}
void loop() {
  float error = lastError;
  int seen = readLine(&error);
  if (seen == 0) {
    // line lost: spin toward the side where we last saw it
    if (lastError < 0) setMotor(-SEARCH_SPEED, SEARCH_SPEED);
    else               setMotor(SEARCH_SPEED, -SEARCH_SPEED);
    return;
  }
  if (seen == 4) {
    // all sensors black: a cross line or a finish bar. Go straight over it.
    setMotor(BASE_SPEED, BASE_SPEED);
    return;
  }
  float correction = KP * error + KD * (error - lastError);
  lastError = error;
  int left  = BASE_SPEED + (int)correction;   // line on the right -> left wheel faster
  int right = BASE_SPEED - (int)correction;
  setMotor(constrain(left, -MAX_SPEED, MAX_SPEED),
           constrain(right, -MAX_SPEED, MAX_SPEED));
  delay(5);
}
```

### `C1_LineMazeSolver.ino` (`LINE_MAZE_SOLVER`)

```cpp
/*
Project C1: Line Maze Solver (Left-Hand Rule + shortest-path learning)
The maze is drawn with black tape on a light floor. All turns are 90 deg.
The FINISH is a solid black square (about 10 x 10 cm) that covers all 4 sensors.
RUN 1 (explore):  leave D12 open. The car explores with the left-hand rule
(Left > Straight > Right > U-turn), records every decision,
removes dead ends on the fly and saves the short path to
EEPROM when it reaches the finish. LED 13 blinks fast.
RUN 2 (replay):   put a jumper wire from D12 to GND, place the car at the
start and press RESET. The car drives the shortest path.
Wiring:
L298N  ENA D5, IN1 D7, IN2 D8 (left)   ENB D6, IN3 D9, IN4 D11 (right)
Line sensor OUT1..OUT4 -> A2, A3, A4, A5 (OUT1 = far LEFT)
Mode jumper D12 (to GND = replay)       Status LED = on-board D13
*/
#include <EEPROM.h>
const int ENA = 5, IN1 = 7, IN2 = 8;
const int ENB = 6, IN3 = 9, IN4 = 11;
const int LINE_PIN[4] = {A2, A3, A4, A5};
const int MODE_PIN = 12;
const int LED = 13;
const int BLACK_LEVEL = HIGH;
// ---------- tuning (adjust for your car and floor) ----------
const int FOLLOW_SPEED = 120;          // speed on straight segments
const int STEER_DELTA  = 70;           // speed difference when correcting
const int TURN_SPEED   = 150;
const unsigned long INCH_MS       = 220;  // drive past the junction so the axle sits on it
const unsigned long TURN_CLEAR_MS = 200;  // spin blindly to leave the current line
const unsigned long TURN_TIMEOUT  = 3000;
const bool LEFT_INVERT = false, RIGHT_INVERT = false;
// ---------- path memory ----------
const byte MAGIC = 0x5A;
const int  MAX_PATH = 100;
char path[MAX_PATH];
int  pathLen = 0;
bool s[4];   // true = sensor sees black
void setMotor(int l, int r) {
  if (LEFT_INVERT)  l = -l;
  if (RIGHT_INVERT) r = -r;
  l = constrain(l, -255, 255);
  r = constrain(r, -255, 255);
  digitalWrite(IN1, l >= 0 ? HIGH : LOW);  digitalWrite(IN2, l >= 0 ? LOW : HIGH);
  digitalWrite(IN3, r >= 0 ? HIGH : LOW);  digitalWrite(IN4, r >= 0 ? LOW : HIGH);
  analogWrite(ENA, abs(l));
  analogWrite(ENB, abs(r));
}
void stopMotors() { setMotor(0, 0); }
void readSensors() {
  for (int i = 0; i < 4; i++) s[i] = (digitalRead(LINE_PIN[i]) == BLACK_LEVEL);
}
// Follow the line until an outer sensor hits a branch, or the line ends.
void followSegment() {
  while (true) {
    readSensors();
    if (s[0] || s[3]) return;                  // side branch or finish
    if (!s[1] && !s[2]) return;                // line ended: dead end
    if (s[1] && s[2]) setMotor(FOLLOW_SPEED, FOLLOW_SPEED);          // centred
    else if (s[1])    setMotor(FOLLOW_SPEED - STEER_DELTA, FOLLOW_SPEED); // steer left
    else              setMotor(FOLLOW_SPEED, FOLLOW_SPEED - STEER_DELTA); // steer right
  }
}
// Spin in place until the given centre sensor finds the line again.
void spinUntilLine(int dir, int sensorIndex, unsigned long clearMs) {
  setMotor(dir * -TURN_SPEED, dir * TURN_SPEED);   // dir = +1 left, -1 right
  delay(clearMs);
  unsigned long t0 = millis();
  while (millis() - t0 < TURN_TIMEOUT) {
    readSensors();
    if (s[sensorIndex]) break;
  }
  stopMotors();
  delay(50);
}
void turn(char d) {
  switch (d) {
    case 'L': spinUntilLine(+1, 1, TURN_CLEAR_MS);     break;
    case 'R': spinUntilLine(-1, 2, TURN_CLEAR_MS);     break;
    case 'B': spinUntilLine(-1, 2, TURN_CLEAR_MS * 2); break;  // U-turn
    default:  break;                                           // 'S': keep going
  }
}
char chooseLeftHand(bool L, bool S, bool R) {
  if (L) return 'L';
  if (S) return 'S';
  if (R) return 'R';
  return 'B';
}
// Replace "x B y" with its single equivalent turn (removes dead ends).
void simplifyPath() {
  if (pathLen < 3 || path[pathLen - 2] != 'B') return;
  int angle = 0;
  for (int i = 1; i <= 3; i++) {
    switch (path[pathLen - i]) {
      case 'R': angle += 90;  break;
      case 'B': angle += 180; break;
      case 'L': angle += 270; break;
    }
  }
  angle %= 360;
  char c = 'S';
  if (angle == 90) c = 'R';
  else if (angle == 180) c = 'B';
  else if (angle == 270) c = 'L';
  pathLen -= 3;
  path[pathLen++] = c;
}
void savePath() {
  EEPROM.update(0, MAGIC);
  EEPROM.update(1, (byte)pathLen);
  for (int i = 0; i < pathLen; i++) EEPROM.update(2 + i, path[i]);
}
bool loadPath() {
  if (EEPROM.read(0) != MAGIC) return false;
  pathLen = EEPROM.read(1);
  if (pathLen > MAX_PATH) return false;
  for (int i = 0; i < pathLen; i++) path[i] = EEPROM.read(2 + i);
  return true;
}
void printPath(const __FlashStringHelper *title) {
  Serial.print(title);
  for (int i = 0; i < pathLen; i++) Serial.print(path[i]);
  Serial.println();
}
// Handles one junction. Returns true when the finish square is reached.
// replayIndex < 0 means "explore", otherwise the next stored decision is used.
bool handleJunction(int &replayIndex) {
  bool foundL = s[0], foundR = s[3];
  // creep forward, still watching for branches that arrive a bit later
  setMotor(FOLLOW_SPEED, FOLLOW_SPEED);
  unsigned long t0 = millis();
  while (millis() - t0 < INCH_MS) {
    readSensors();
    if (s[0]) foundL = true;
    if (s[3]) foundR = true;
  }
  stopMotors();
  delay(30);
  readSensors();
  if (s[0] && s[1] && s[2] && s[3]) return true;       // still all black: finish
  bool foundS = s[1] || s[2];
  char d;
  if (replayIndex < 0) {
    d = chooseLeftHand(foundL, foundS, foundR);
    if (pathLen < MAX_PATH) path[pathLen++] = d;
    simplifyPath();
  } else {
    d = (replayIndex < pathLen) ? path[replayIndex++] : 'S';
  }
  Serial.print(F("Junction L/S/R=")); Serial.print(foundL); Serial.print(foundS);
  Serial.print(foundR); Serial.print(F("  go ")); Serial.println(d);
  turn(d);
  return false;
}
void celebrate() {
  stopMotors();
  while (true) {                      // blink until reset
    digitalWrite(LED, HIGH); delay(120);
    digitalWrite(LED, LOW);  delay(120);
  }
}
void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT); pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  for (int i = 0; i < 4; i++) pinMode(LINE_PIN[i], INPUT);
  pinMode(MODE_PIN, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  stopMotors();
  Serial.begin(9600);
  bool replay = (digitalRead(MODE_PIN) == LOW) && loadPath();
  if (replay) printPath(F("REPLAY mode, stored path: "));
  else        Serial.println(F("EXPLORE mode (left-hand rule)"));
  digitalWrite(LED, replay ? HIGH : LOW);
  delay(2000);
  int replayIndex = replay ? 0 : -1;
  while (true) {
    followSegment();
    if (handleJunction(replayIndex)) break;
  }
  if (!replay) {
    savePath();
    printPath(F("FINISH! Shortest path saved: "));
  } else {
    Serial.println(F("FINISH (replay)"));
  }
  celebrate();
}
void loop() {}
```

### `C2_WallMazeSolver.ino` (`WALL_MAZE_SOLVER`)

```cpp
/*
Project C2: Wall Maze Solver (ultrasonic, cell by cell, Left-Hand Rule)
For a maze with real walls (cardboard, wood, books) and square cells
about 30 to 40 cm wide. The car moves one cell, stops, scans LEFT / FRONT /
RIGHT with the servo-mounted HC-SR04, then applies the left-hand rule:
  left open  -> turn left, go
  front open -> go straight
  right open -> turn right, go
  otherwise  -> turn around
Turns are timed, so calibrate TURN90_MS and CELL_MS first (see module).
Wiring:
L298N  ENA D5, IN1 D7, IN2 D8 (left)   ENB D6, IN3 D9, IN4 D11 (right)
Servo  D3        HC-SR04  Trig A0, Echo A1
*/
#include <Servo.h>
const int ENA = 5, IN1 = 7, IN2 = 8;
const int ENB = 6, IN3 = 9, IN4 = 11;
const int SERVO_PIN = 3;
const int TRIG = A0, ECHO = A1;
// ---------- tuning ----------
const int SERVO_CENTER = 90, SERVO_RIGHT = 5, SERVO_LEFT = 175;
const int OPEN_CM      = 30;     // a side is "open" if the wall is farther than this
const int FRONT_STOP_CM = 8;     // emergency stop if a wall is this close in front
const int DRIVE_SPEED  = 150;
const int TURN_SPEED   = 170;
const unsigned long CELL_MS   = 900;   // time to drive one cell forward
const unsigned long TURN90_MS = 420;   // time for a 90 degree spin
const bool LEFT_INVERT = false, RIGHT_INVERT = false;
Servo neck;
void setMotor(int l, int r) {
  if (LEFT_INVERT)  l = -l;
  if (RIGHT_INVERT) r = -r;
  l = constrain(l, -255, 255);
  r = constrain(r, -255, 255);
  digitalWrite(IN1, l >= 0 ? HIGH : LOW);  digitalWrite(IN2, l >= 0 ? LOW : HIGH);
  digitalWrite(IN3, r >= 0 ? HIGH : LOW);  digitalWrite(IN4, r >= 0 ? LOW : HIGH);
  analogWrite(ENA, abs(l));
  analogWrite(ENB, abs(r));
}
void stopMotors() { setMotor(0, 0); delay(150); }
long readDistanceCm() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  unsigned long t = pulseIn(ECHO, HIGH, 25000UL);
  if (t == 0) return 400;
  return t / 58;
}
long lookAt(int angle) {
  neck.write(angle);
  delay(450);
  long a = readDistanceCm(); delay(15);
  long b = readDistanceCm();
  return (a + b) / 2;
}
void spinLeft90()  { setMotor(-TURN_SPEED, TURN_SPEED); delay(TURN90_MS); stopMotors(); }
void spinRight90() { setMotor(TURN_SPEED, -TURN_SPEED); delay(TURN90_MS); stopMotors(); }
// drive one cell, but stop early if a wall appears right in front
void forwardOneCell() {
  neck.write(SERVO_CENTER);
  delay(200);
  setMotor(DRIVE_SPEED, DRIVE_SPEED);
  unsigned long t0 = millis();
  while (millis() - t0 < CELL_MS) {
    if (readDistanceCm() <= FRONT_STOP_CM) break;
    delay(30);
  }
  stopMotors();
}
void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT); pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  setMotor(0, 0);
  Serial.begin(9600);
  neck.attach(SERVO_PIN);
  neck.write(SERVO_CENTER);
  delay(2000);
}
void loop() {
  long left  = lookAt(SERVO_LEFT);
  long front = lookAt(SERVO_CENTER);
  long right = lookAt(SERVO_RIGHT);
  neck.write(SERVO_CENTER);
  Serial.print(F("L=")); Serial.print(left);
  Serial.print(F(" F=")); Serial.print(front);
  Serial.print(F(" R=")); Serial.println(right);
  if (left > 150 && front > 150 && right > 150) {   // out of the maze: finished
    Serial.println(F("EXIT reached"));
    setMotor(0, 0);
    while (true) {}
  }
  if (left > OPEN_CM)       { Serial.println(F("-> LEFT"));     spinLeft90(); }
  else if (front > OPEN_CM) { Serial.println(F("-> STRAIGHT")); }
  else if (right > OPEN_CM) { Serial.println(F("-> RIGHT"));    spinRight90(); }
  else                      { Serial.println(F("-> U-TURN"));   spinRight90(); spinRight90();}
  forwardOneCell();
}
```

---

### Related components (imported by this page)

These are not included in full here, but here is where they live:

- `src/components/smartcar/ChassisPrintStudio.jsx` — tabbed 3D chassis print studio.
- `src/components/smartcar/InteractiveWiringDiagram.jsx` — interactive wiring map.
- `src/components/smartcar/SmartCarSimulator.jsx` — sensor/motor/steering simulators.
- `src/components/smartcar/ProgramFlowSimulator.jsx` — interactive flowchart of each game's logic.
- `src/components/smartcar/EchoExplorer.jsx` — kid-friendly ultrasonic echo demo.
- `@/components/ui/button`, `@/components/ui/card` — shared UI primitives.
