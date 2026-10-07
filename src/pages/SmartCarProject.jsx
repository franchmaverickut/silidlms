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
import ChassisStlPreview from "@/components/smartcar/ChassisStlPreview";
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

        <div className="pt-1 space-y-2">
          <h3 className="font-poppins font-bold text-sm text-foreground">The print files</h3>
          <DataTable
            headers={["File", "Size (mm)", "What it is", "Quantity"]}
            rows={d.chassisPrint.printFiles}
            renderRow={(row, i) => (
              <tr key={i} className="hover:bg-muted/20 align-top">
                <td className="px-4 py-2.5 font-mono text-xs font-medium text-foreground break-all">{row.file}</td>
                <td className="px-4 py-2.5 text-muted-foreground text-xs whitespace-nowrap">{row.size}</td>
                <td className="px-4 py-2.5 text-muted-foreground text-xs">{row.what}</td>
                <td className="px-4 py-2.5 text-muted-foreground text-xs whitespace-nowrap">{row.qty}</td>
              </tr>
            )}
          />
          <div className="flex gap-2 items-start p-3 rounded-lg bg-blue-50 border border-blue-200">
            <Lightbulb size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 leading-relaxed">{d.chassisPrint.filesNote}</p>
          </div>
          <ChassisStlPreview files={d.chassisPrint.stlPreviews} />
          <p className="text-xs text-muted-foreground italic">Figure 3. No separate bed-fit image is needed. Use the interactive 3D preview above to check each file's real shape and size against your printer bed before you print.</p>
        </div>

        <div className="pt-2 space-y-2">
          <h3 className="font-poppins font-bold text-sm text-foreground">Choose your version</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl overflow-hidden border border-border/60">
              <div className="bg-muted/20 p-3 flex items-center justify-center">
                <img src={d.chassisPrint.figures.option1} alt="Option 1 one-piece 4WD" className="max-h-64 w-auto object-contain rounded-lg" />
              </div>
              <p className="p-3 text-xs text-muted-foreground italic">Figure 2a. Option 1: one-piece 4WD plate, 150 × 257 mm.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/60">
              <div className="bg-muted/20 p-3 flex items-center justify-center">
                <img src={d.chassisPrint.figures.option2} alt="Option 2 two-piece 4WD" className="max-h-64 w-auto object-contain rounded-lg" />
              </div>
              <p className="p-3 text-xs text-muted-foreground italic">Figure 2b. Option 2: Part A and Part B join with a dovetail, 150 × 120 + 151 mm.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/60">
              <div className="bg-muted/20 p-3 flex items-center justify-center">
                <img src={d.chassisPrint.figures.option3} alt="Option 3 compact 2WD" className="max-h-64 w-auto object-contain rounded-lg" />
              </div>
              <p className="p-3 text-xs text-muted-foreground italic">Figure 2c. Option 3: compact 2WD uses Part B plus a ball caster, 150 × 151 mm.</p>
            </div>
          </div>
          <DataTable
            headers={["Version", "Files to print", "Printer bed needed", "Choose it when"]}
            rows={d.chassisPrint.versions}
            renderRow={(row, i) => (
              <tr key={i} className="hover:bg-muted/20 align-top">
                <td className="px-4 py-2.5 font-poppins font-semibold text-foreground text-xs">{row.version}</td>
                <td className="px-4 py-2.5 text-muted-foreground text-xs">{row.files}</td>
                <td className="px-4 py-2.5 text-muted-foreground text-xs">{row.bed}</td>
                <td className="px-4 py-2.5 text-muted-foreground text-xs">{row.when}</td>
              </tr>
            )}
          />
        </div>

        <div className="pt-2 space-y-2">
          <h3 className="font-poppins font-bold text-sm text-foreground">Recommended print settings</h3>
          <DataTable
            headers={["Setting", "Value"]}
            rows={d.chassisPrint.printSettings}
            renderRow={(row, i) => (
              <tr key={i} className="hover:bg-muted/20 align-top">
                <td className="px-4 py-2.5 font-medium text-foreground text-xs whitespace-nowrap">{row.setting}</td>
                <td className="px-4 py-2.5 text-muted-foreground text-xs">{row.value}</td>
              </tr>
            )}
          />
        </div>

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