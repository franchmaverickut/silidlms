import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronDown, ChevronUp, Download, Clock, Cpu, Wrench, BookOpen, Lightbulb, AlertTriangle, Code, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SMART_CAR } from "@/data/smartcarData";
import InteractiveWiringDiagram from "@/components/smartcar/InteractiveWiringDiagram";
import SmartCarSimulator from "@/components/smartcar/SmartCarSimulator";
import ProgramFlowSimulator from "@/components/smartcar/ProgramFlowSimulator";
import ChassisStlPreview from "@/components/smartcar/ChassisStlPreview";

function Section({ title, icon, children, defaultOpen = false, accent = "blue" }) {
  const [open, setOpen] = useState(defaultOpen);
  const accentBg = { blue: "bg-blue-50/50 border-blue-200", green: "bg-green-50/50 border-green-200", purple: "bg-purple-50/50 border-purple-200", amber: "bg-amber-50/50 border-amber-200" }[accent] || "bg-blue-50/50 border-blue-200";
  return (
    <Card className={`overflow-hidden border ${accentBg} shadow-sm`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors text-left">
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

function CodeBlock({ code, filename }) {
  const [open, setOpen] = useState(true);
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
      <div className="relative rounded-3xl overflow-hidden min-h-[300px] shadow-xl">
        <img src={d.kitImage} alt={d.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">Robotics</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">Arduino</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Beginner–Intermediate</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">{d.title}</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">{d.subtitle}</p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> {d.buildTime}</span>
            <span className="flex items-center gap-1.5"><Cpu size={15} /> {d.software}</span>
            <span className="flex items-center gap-1.5"><Wrench size={15} /> 3 Projects</span>
          </div>
        </div>
      </div>

      {/* Downloads */}
      <div className="grid grid-cols-1 gap-3">
        <a href={d.sketchesZipUrl} download>
          <Button variant="outline" className="w-full rounded-xl gap-2 border-blue-300 text-blue-700 hover:bg-blue-50">
            <Download size={16} /> Download Arduino Sketches (ZIP)
          </Button>
        </a>
      </div>

      {/* How to Use */}
      <Card className="p-6 border-border/60 shadow-sm space-y-3">
        <h2 className="font-poppins font-bold text-lg text-foreground flex items-center gap-2"><BookOpen size={18} /> How to Use This Module</h2>
        <p className="text-sm text-foreground/80 leading-relaxed">{d.intro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            { part: "Part 1: Know Your Kit", task: "Identify every component from the kit photo and learn what it does." },
            { part: "Part 2: Build the Base Car", task: "14 numbered steps: mechanical assembly, wiring to one master pin map, and two test sketches." },
            { part: "Part 3: Project A", task: "Obstacle Avoidance Car using the HC-SR04 on the servo \"neck\"." },
            { part: "Part 4: Project B", task: "Line-Following Robot using the 4-channel tracker with smooth PD steering." },
            { part: "Part 5: Project C", task: "Maze Solver: C1 black-line maze with shortest-path learning, and C2 wall maze with ultrasonic scanning." },
            { part: "Part 6: Troubleshooting", task: "Symptoms, causes and fixes, plus the full pin map and references." },
          ].map((row, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border/40">
              <p className="font-poppins font-semibold text-xs text-foreground">{row.part}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{row.task}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed pt-1">
          Every project uses the same wiring, so you never need to rewire the car between projects. Only the sketch you upload changes. All six sketches use only libraries that come with the Arduino IDE.
        </p>
      </Card>

      {/* Part 1: Know Your Kit */}
      <Section title="Part 1. Know Your Kit (Supplies)" icon="📦" defaultOpen={true} accent="blue">
        <p className="text-sm text-muted-foreground leading-relaxed">Lay out every part on a clean table and tick it off. The photo is cut straight from the kit picture, so the parts should look the same as yours.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {d.parts.map((part, i) => (
            <div key={i} className="rounded-xl border border-border/60 overflow-hidden shadow-sm flex">
              <div className="bg-muted/20 p-3 flex items-center justify-center flex-shrink-0 w-28">
                <img src={part.image} alt={part.name} className="max-h-24 w-auto object-contain rounded" />
              </div>
              <div className="p-3 space-y-1">
                <p className="font-poppins font-bold text-xs text-foreground">{part.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{part.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-2">
          <p className="font-poppins font-semibold text-sm text-foreground mb-2">Extra tools and materials (not in the kit)</p>
          <ul className="space-y-2">
            {d.extraTools.map((tool, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
                <span className="text-blue-500 font-bold flex-shrink-0 mt-0.5">•</span> {tool}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 4WD Robot Chassis — Parts & Assembly */}
      <Section title="4WD Robot Chassis — Parts & Assembly" icon="🔩" defaultOpen={true} accent="blue">
        <p className="text-sm text-muted-foreground leading-relaxed">{d.chassisAssembly.intro}</p>
        <div className="pt-1">
          <h3 className="font-poppins font-bold text-sm text-foreground mb-2">Parts</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {d.chassisAssembly.parts.map((part, i) => (
              <div key={i} className="rounded-xl border border-border/60 overflow-hidden shadow-sm bg-card">
                <div className="bg-muted/20 p-3 flex items-center justify-center h-24">
                  {part.image ? (
                    <img src={part.image} alt={part.name} className="max-h-20 w-auto object-contain" />
                  ) : (
                    <span className="text-3xl text-muted-foreground/30">🔩</span>
                  )}
                </div>
                <div className="p-2.5 text-center">
                  <p className="font-poppins font-semibold text-xs text-foreground">{part.name}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{part.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">Assembly Steps</h3>
          {d.chassisAssembly.steps.map(step => <StepCard key={step.num} step={step} />)}
        </div>
      </Section>

      {/* Part 2: 3D-Print the Chassis (Optional) */}
      <Section title="Part 2. 3D-Print the Chassis (Optional)" icon="🖨️" defaultOpen={false} accent="purple">
        <p className="text-sm text-foreground/80 leading-relaxed">{d.chassisPrint.intro}</p>
        <a href={d.chassisPrintZipUrl} download>
          <Button variant="outline" className="w-full rounded-xl gap-2 border-purple-300 text-purple-700 hover:bg-purple-50">
            <Download size={16} /> Download Chassis Print Files (ZIP)
          </Button>
        </a>
        <p className="text-sm text-foreground/80 leading-relaxed">{d.chassisPrint.thicknessNote}</p>

        {/* Print files table */}
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
        </div>

        {/* Choose your version */}
        <div className="pt-2 space-y-2">
          <h3 className="font-poppins font-bold text-sm text-foreground">Choose your version</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden border border-border/60">
              <div className="bg-muted/20 p-4 flex items-center justify-center">
                <img src={d.chassisPrint.figures.threeWays} alt="Three ways to use the files" className="max-h-56 w-auto object-contain rounded-lg" />
              </div>
              <p className="p-3 text-xs text-muted-foreground italic">Figure 2. The three ways to use the files. Dimensions are taken from the STL files.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/60">
              <div className="bg-muted/20 p-4 flex items-center justify-center">
                <img src={d.chassisPrint.figures.bedFit} alt="How each file fits on bed sizes" className="max-h-56 w-auto object-contain rounded-lg" />
              </div>
              <p className="p-3 text-xs text-muted-foreground italic">Figure 3. How each file fits on common bed sizes.</p>
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

        {/* Print settings */}
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

        {/* Steps */}
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">Print and prepare the parts</h3>
          {d.chassisPrint.steps.map(step => <StepCard key={step.num} step={step} />)}
        </div>

        {/* Compact 2WD */}
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

      {/* Part 2: Build the Base Car */}
      <Section title="Part 2. Build the Base Car" icon="🔧" defaultOpen={false} accent="blue">
        <p className="text-sm text-muted-foreground leading-relaxed">{d.baseCar.intro}</p>
        <div className="rounded-2xl overflow-hidden border border-border/60">
          <div className="bg-muted/20 p-4 flex items-center justify-center">
            <img src={d.baseCar.sideViewImage} alt="Side view" className="max-h-64 w-auto object-contain rounded-lg" />
          </div>
          <p className="p-3 text-xs text-muted-foreground italic">{d.baseCar.sideViewCaption}</p>
        </div>
        <div className="space-y-4">
          {d.baseCar.steps.map(step => <StepCard key={step.num} step={step} />)}
        </div>
        {/* Power Wiring */}
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">STEP 11: Power Wiring</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">Power is where most beginner cars fail, so read this step twice. All grounds must be connected together: battery minus, L298N GND and Arduino GND.</p>
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
        {/* Pin Map */}
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">STEP 12: Signal Wiring (Master Pin Map)</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">Use the Dupont wires to connect everything below. This single pin map is used by all six sketches in this module.</p>
          <InteractiveWiringDiagram />
          <p className="text-xs text-muted-foreground italic">Figure 3. Interactive master wiring diagram — hover or click any wire.</p>
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
        {/* Motor Test */}
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">STEP 13: Upload and run the Motor Test</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{d.baseCar.motorTestDesc}</p>
          <CodeBlock code={d.baseCar.motorTestCode} filename="00_MotorTest.ino" />
        </div>
        {/* Sensor Test */}
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">STEP 14: Upload and run the Sensor Test</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{d.baseCar.sensorTestDesc}</p>
          <CodeBlock code={d.baseCar.sensorTestCode} filename="01_SensorTest.ino" />
        </div>
        <div className="flex gap-2 items-start p-3 rounded-lg bg-green-50 border border-green-200">
          <Lightbulb size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-green-800 leading-relaxed">{d.baseCar.baseCarTip}</p>
        </div>
      </Section>

      {/* Interactive Simulations */}
      <Section title="Interactive Simulations — Understand the Math & Science" icon="⚡" defaultOpen={false} accent="purple">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Before uploading code, explore how each algorithm works. Adjust the sliders and watch the math change in real time.
        </p>
        <SmartCarSimulator />
      </Section>

      {/* Interactive Program Flows */}
      <Section title="Interactive Program Flows — Step Through the Code Logic" icon="🔀" defaultOpen={false} accent="green">
        <p className="text-sm text-muted-foreground leading-relaxed">
          These flowcharts match the actual Arduino sketches. Change the inputs and watch the active path light up, or press Step Through to walk the code one decision at a time.
        </p>
        <ProgramFlowSimulator />
      </Section>

      {/* Projects A, B, C */}
      {d.projects.map((proj) => (
        <Section key={proj.key} title={proj.title} icon={proj.key === "A" ? "🚗" : proj.key === "B" ? "📏" : "🧩"} defaultOpen={false} accent={proj.key === "A" ? "green" : proj.key === "B" ? "purple" : "amber"}>
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
              <h3 className="font-poppins font-bold text-sm text-foreground">Tuning Guide</h3>
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
              <h3 className="font-poppins font-bold text-sm text-foreground flex items-center gap-2"><Lightbulb size={14} /> Challenges</h3>
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

      {/* Part 6: Troubleshooting */}
      <Section title="Part 6. Troubleshooting and Reference" icon="🛠️" defaultOpen={false} accent="amber">
        <DataTable
          headers={["Symptom", "Likely cause", "Fix"]}
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
          <h3 className="font-poppins font-bold text-sm text-foreground">Sketch files in this module</h3>
          <DataTable
            headers={["Sketch", "Purpose"]}
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