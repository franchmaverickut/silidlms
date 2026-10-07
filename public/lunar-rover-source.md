# Solar Lunar Rover — Project Source Code

This file contains the full source code for the **Solar Lunar Rover** maker project. It has two parts: the page component (`src/pages/LunarRoverProject.jsx`) and its content/data file (`src/data/lunarRoverData.js`).

---

## 1. `src/pages/LunarRoverProject.jsx`

```jsx
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
```

---

## 2. `src/data/lunarRoverData.js`

```js
const STEP_IMG = {
  s1: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/1232fbf20_Step_01_Parts_Overview.png",
  s2: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/d2bee8235_Step_02_Install_Axle_Supports.png",
  s3: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/48ae1e154_Step_03_Insert_Axle_and_Drive_Gear.png",
  s4: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/8d43d477d_Step_04_Attach_Wheels.png",
  s5: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/b0eb46559_Step_05_Install_Motor_and_Retaining_Bracket.png",
  s6: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/f0ec2d45c_Step_06_Install_Solar_Panel_Supports.png",
  s7: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/988a490fa_Step_07_Assemble_Rover_Head.png",
  s8: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/84e6f406d_Step_08_Assemble_Mast.png",
  s9: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/1e084d6cf_Step_09_Mount_Mast_on_Chassis.png",
  s10: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/abbc00341_Step_10_Attach_Rover_Head.png",
  s11: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/21f717acf_Step_11_Connect_Solar_Panel_Wires.png",
  s12: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/5b5bdf333_Step_12_Mount_Solar_Panels_Completed_Rover.png",
};

const PART_IMG = {
  p1: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/6be0aed85_Part_01_Chassis_Plate.png",
  p2: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/b815bd98a_Part_02_Motor_Retaining_Bracket.png",
  p3: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/46fcec3dd_Part_03_Slotted_Panel.png",
  p4: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/99dd5102a_Part_04_Angled_Solar_Support_A.png",
  p5: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/dd9451bbf_Part_05_Angled_Solar_Support_B.png",
  p6: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/2127c085a_Part_06_Mast_Rail_A.png",
  p7: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/251a77063_Part_07_Mast_Rail_B.png",
  p8: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/e306b403e_Part_08_Windowed_Mast_Frame.png",
  p9: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/c5c93ddaa_Part_09_Slotted_Panel.png",
  p10: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/088eea637_Part_10_Double_Slot_Panel.png",
  p11: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/5cb554480_Part_11_Tabbed_Panel_A.png",
  p12: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/98907b4ff_Part_12_Tabbed_Panel_B.png",
  p13: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/79d060115_Part_13_Tabbed_Panel_C.png",
  p14: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9fdd26920_Part_14_Axle_Support.png",
  p15: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/38d464c40_Part_15_Wheel.png",
  p16: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/556fe312e_Part_16_DC_Motor.png",
  p17: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/b819aed1b_Part_17_Solar_Panel.png",
  p18: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/d90b65ee3_Part_18_Large_Drive_Gear.png",
  p19: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/29f0e430b_Part_19_Small_Pinion_Gear.png",
  p20: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/cbfd80725_Part_20_Metal_Axle.png",
};

export const LUNAR_ROVER = {
  title: "Solar Lunar Rover",
  subtitle: "3D-print every part yourself, then build a sun-powered rover with gears, a motor and solar panels",
  level: "Beginner maker",
  buildTime: "Print 3 to 5 hours, assemble 1 to 1.5 hours",
  skill: "3D Printing, Robotics and Solar Energy",
  heroImage: STEP_IMG.s12,
  stlZipUrl: "https://media.base44.com/files/public/69d386ad9523e2ce04536574/b4663b47b_STL.zip",
  intro:
    "This rover is fully 3D-printed. Every body panel, support, mast, gear and wheel comes straight off your printer bed. You only add a small DC motor, two solar panels and a metal axle, and you have a car that runs on sunlight. First print the parts, then follow the assembly steps in order. Tick the Completed button on each step so you can track your progress.",
  parts: [
    { name: "Chassis Plate", image: PART_IMG.p1, desc: "Main base that holds all the parts.", printed: true },
    { name: "Motor Retaining Bracket", image: PART_IMG.p2, desc: "Clips over the motor to hold it down.", printed: true },
    { name: "Slotted Panel", image: PART_IMG.p3, desc: "Side panel with cut-out slots.", printed: true },
    { name: "Angled Solar Support A", image: PART_IMG.p4, desc: "Holds one solar panel at an angle.", printed: true },
    { name: "Angled Solar Support B", image: PART_IMG.p5, desc: "Holds the other solar panel.", printed: true },
    { name: "Mast Rail A", image: PART_IMG.p6, desc: "Long support arm for the mast.", printed: true },
    { name: "Mast Rail B", image: PART_IMG.p7, desc: "Second mast support arm.", printed: true },
    { name: "Windowed Mast Frame", image: PART_IMG.p8, desc: "Tall vertical frame with a window cut-out.", printed: true },
    { name: "Slotted Panel", image: PART_IMG.p9, desc: "Panel with cut-out slots for assembly.", printed: true },
    { name: "Double Slot Panel", image: PART_IMG.p10, desc: "Panel with two slots for joining.", printed: true },
    { name: "Tabbed Panel A", image: PART_IMG.p11, desc: "Panel with connecting tabs.", printed: true },
    { name: "Tabbed Panel B", image: PART_IMG.p12, desc: "Panel with connecting tabs.", printed: true },
    { name: "Tabbed Panel C", image: PART_IMG.p13, desc: "Panel with connecting tabs.", printed: true },
    { name: "Axle Support", image: PART_IMG.p14, desc: "U-shaped piece that holds the axle.", printed: true },
    { name: "Wheel", image: PART_IMG.p15, desc: "Printed wheel with a rubber tyre.", printed: true },
    { name: "Large Drive Gear", image: PART_IMG.p18, desc: "Yellow gear on the axle.", printed: true },
    { name: "Small Pinion Gear", image: PART_IMG.p19, desc: "Small gear that fits on the motor shaft.", printed: true },
    { name: "DC Motor", image: PART_IMG.p16, desc: "Electric motor with red and black wires.", printed: false },
    { name: "Solar Panel", image: PART_IMG.p17, desc: "Blue panel that makes power from sunlight.", printed: false },
    { name: "Metal Axle", image: PART_IMG.p20, desc: "Silver rod that holds the wheels.", printed: false },
  ],
  printSettings: [
    { setting: "Material", value: "PLA in any color. Use PETG if the rover will sit in hot, direct sun." },
    { setting: "Nozzle / layer height", value: "0.4 mm nozzle, 0.2 mm layers" },
    { setting: "Walls", value: "3 walls, so the tabs and slots are strong" },
    { setting: "Infill", value: "20% gyroid for panels, 40% for the gears and axle supports" },
    { setting: "Supports", value: "None. Every part is designed to print flat on the bed." },
    { setting: "Bed adhesion", value: "Clean bed plus a skirt. Add a brim only if small tabs lift." },
    { setting: "Bed temperature", value: "60 °C for PLA" },
  ],
  printSteps: [
    { num: "P1", title: "Download the STL files", desc: "Click the download button to get a ZIP with every printable part. Unzip it on your computer." },
    { num: "P2", title: "Open the files in your slicer", desc: "Drag the STLs into Cura, PrusaSlicer, OrcaSlicer or Bambu Studio. The files open at the correct size, so do not resize them." },
    { num: "P3", title: "Slice and send to print", desc: "Apply the settings below, slice the plate, and send it to your printer. Print the two gears at the higher infill so their teeth are strong." },
    { num: "P4", title: "Remove and clean up", desc: "Let the bed cool before popping the parts off. Pull off any strings. Test-fit a tab into a slot; if it is too tight, file the tab slightly until it slides in by hand." },
  ],
  stemCards: [
    {
      afterStep: 4,
      tag: "Science",
      icon: "🧲",
      title: "Friction: why wheels roll",
      body: "Wheels roll instead of slide because rolling friction is tiny compared with sliding friction. The tyre grips the floor and pushes backward, so the floor pushes the rover forward, that is Newton's third law. Smooth wheels slip; a little tread grips better. If your rover slips, try a heavier battery or rougher tyres.",
    },
    {
      afterStep: 5,
      tag: "Math",
      icon: "⚙️",
      title: "Gear ratios: trading speed for force",
      body: "Gears let us swap speed for turning force (torque). The small pinion has few teeth and spins fast; the big drive gear has many teeth and turns slowly. The ratio is drive teeth divided by pinion teeth. A big ratio makes the wheel turn slowly but with more force, which is what a heavy little car needs. Drag the sliders below and watch the math change.",
      interactive: "gear",
    },
    {
      afterStep: 9,
      tag: "Engineering",
      icon: "🏗️",
      title: "Tall, strong and light",
      body: "The mast has to hold the head and two solar panels up high without toppling. Engineers use deep, tall shapes because they resist bending far better than flat plates. Notice how the windowed frame is tall: that depth keeps it stiff. A flat piece the same width would wobble and snap. The cut-out window saves plastic without losing much strength.",
    },
    {
      afterStep: 11,
      tag: "Science",
      icon: "☀️",
      title: "Solar power: angle and clouds",
      body: "A solar panel changes light energy into electrical energy. The panel makes the most power when sunlight hits it straight on. When the sun is low, the light strikes at an angle and less energy is captured. Clouds block light too. Move the sun and the clouds below and find out when the rover finally has enough power to drive.",
      interactive: "solar",
    },
  ],
  steps: [
    { num: 1, title: "Check your printed parts", image: STEP_IMG.s1, desc: "Lay out every printed panel, the four wheels, the two gears and the axle supports. Add the DC motor, the metal axle and the two solar panels. Compare each piece with the parts gallery so nothing is missing." },
    { num: 2, title: "Install the axle supports", image: STEP_IMG.s2, desc: "Fit the four axle supports into the matching slots on the chassis. Line up their holes across the chassis so the axle slides through straight. If a slot is tight, file the tab a little." },
    { num: 3, title: "Insert the axle and drive gear", image: STEP_IMG.s3, desc: "Slide a metal axle through the large drive gear and its axle supports. Position the gear as shown so its teeth will meet the pinion later. Spin the axle by hand to check it turns freely." },
    { num: 4, title: "Attach the wheels", image: STEP_IMG.s4, desc: "Fit the second axle and press on all four wheels. Leave a small gap between each wheel hub and the body so the wheels spin without rubbing." },
    { num: 5, title: "Install the motor and pinion", image: STEP_IMG.s5, desc: "Press the small pinion onto the motor shaft. Place the motor so the pinion teeth mesh with the large drive gear, then clip on the retaining bracket. Turn the axle gently: the gears should engage smoothly with no grinding." },
    { num: 6, title: "Install the solar panel supports", image: STEP_IMG.s6, desc: "Fit the two angled support pieces into the matching chassis slots, one on each side. The angle tilts the panels toward the sun." },
    { num: 7, title: "Assemble the rover head", image: STEP_IMG.s7, desc: "Join the front, side and remaining head panels using their matching tabs and slots. The circular eye markings are decorative." },
    { num: 8, title: "Assemble the mast", image: STEP_IMG.s8, desc: "Join the windowed frame and the two long support rails. Press every tab fully into its slot so the mast is stiff and square." },
    { num: 9, title: "Mount the mast on the chassis", image: STEP_IMG.s9, desc: "Align the mast tabs with the chassis slots and press the mast assembly down into place. Check that it stands straight." },
    { num: 10, title: "Attach the rover head", image: STEP_IMG.s10, desc: "Fit the assembled head onto the mast attachment points. Check that the head and mast are secure before wiring." },
    { num: 11, title: "Connect the solar panel wires", image: STEP_IMG.s11, desc: "Join both red panel leads to the red motor lead, and both black panel leads to the black motor lead. Keep the two junctions separate and insulated with tape. Double-check the polarity before connecting." },
    { num: 12, title: "Mount the panels and test", image: STEP_IMG.s12, desc: "Attach one solar panel to each support with double-sided tape. Keep the wires clear of the wheels and gears. Place the rover in direct sunlight and watch it drive. If it goes backward, swap the motor wires." },
  ],
};
```

---

### Related components (imported by this page)

These are not included in full, but here is where they live:

- `src/components/maker/ZipStlViewer.jsx` — STL preview from a ZIP archive.
- `src/components/lunarrover/GearRatioExplorer.jsx` — interactive gear-ratio slider.
- `src/components/lunarrover/SolarPowerExplorer.jsx` — interactive solar-power slider.
- `@/components/ui/button`, `@/components/ui/card` — shared UI primitives.
