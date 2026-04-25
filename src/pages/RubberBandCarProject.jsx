import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronDown, ChevronUp, Play, ExternalLink, Clock, Users, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CompeteTracker from "@/components/rubberband/CompeteTracker";
import ReflectionTracker from "@/components/rubberband/ReflectionTracker";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/73050b285_RubberbandCarCoverPhoto.png";
const IMG_PART1 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9288ed808_Part1InitialPreparationandAssembly.png";
const IMG_PART2 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/ffe94a99b_Part2CompetitionandRedesign.png";

const MATERIALS = [
  {
    num: 1,
    name: "Popsicle Sticks",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/e13ca04bf_PopsicleSticksLightWood.png",
    desc: "Your primary structural material. Use these to build the body and frame of your car. Lightweight and easy to work with — but how you arrange and connect them directly affects weight and rigidity.",
  },
  {
    num: 2,
    name: "Metal Pop Rivets",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/7e07c5a70_MetalPopRivetsAluminumSteel.png",
    desc: "These act as your axle pins and structural connectors. The segmented metal body makes them rigid enough to serve as a rolling axle when passed through a foam wheel. Handle carefully — the sharp end can puncture foam cleanly for a snug fit.",
  },
  {
    num: 3,
    name: "Black EVA Foam Discs",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/29194752b_BlackEVAFoamWheelsDiscs.png",
    desc: "Your wheels. The dense waffle-grid texture provides grip on smooth surfaces. Wheel diameter and alignment are two of the biggest factors affecting how far and straight your car travels.",
  },
  {
    num: 4,
    name: "Natural Rubber Bands",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/877466de5_NaturalRubberBands.png",
    desc: "Your only power source. Winding the rubber band stores elastic potential energy — releasing it converts that energy into motion. The tighter the wind, the more energy stored.",
  },
  {
    num: 5,
    name: "Hot Glue",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/671650363_TranslucentHotGlueSticks.png",
    desc: "Your bonding agent. Use hot glue to secure popsicle stick joints and fix axle positions. Apply in small amounts — excess glue adds unnecessary weight. Allow joints to cool fully before testing.",
  },
];

const PORTFOLIO_URL = "https://docs.google.com/presentation/d/1hSBIl8td6E2F6Tya6UDlkgvtXLFAG0z5FAx3rZpxAd8/edit?usp=sharing";
const STL_URL = "https://drive.google.com/file/d/1VzNkgv0rGj8ZzeqxsUANMOAsL2dgSY1O/view?usp=sharing";
const YOUTUBE_URL = "https://www.youtube.com/watch?v=0W9iaB42QDU&t=2s";

function Section({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="overflow-hidden border-border/60 shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">{icon}</span>
          <span className="font-poppins font-bold text-base text-foreground">{title}</span>
        </div>
        {open ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-6 pb-6 space-y-4 border-t border-border/40 pt-4">
          {children}
        </div>
      )}
    </Card>
  );
}

export default function RubberBandCarProject() {
  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-6">
      {/* Back */}
      <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ChevronLeft size={16} /> Back to Maker Lessons
      </Link>

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[300px] shadow-xl">
        <img src={COVER_IMG} alt="Rubber Band Car" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">STEM</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Basic</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Rubber Band Car Challenge</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            Build a rubber band-powered car, compete in three challenges, then redesign a key part using 3D CAD and printing.
          </p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> 25 minutes total</span>
            <span className="flex items-center gap-1.5"><Users size={15} /> 12 teams</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> No prior experience needed</span>
          </div>
        </div>
      </div>

      {/* Intro */}
      <Card className="p-6 border-border/60 shadow-sm">
        <p className="text-sm text-foreground/80 leading-relaxed">
          Build a rubber band-powered car using popsicle sticks, EVA foam wheels, pop rivets, and rubber bands — then compete against other teams to go the farthest, straightest, and fastest. After the competition, analyze what went wrong and redesign a key part using 3D CAD and 3D printing.
        </p>
        <p className="text-xs text-muted-foreground mt-3 italic">
          This project guides you through the design-build-test-improve cycle. Every decision you make during building has a consequence during testing — pay attention to what works and what does not.
        </p>
      </Card>

      {/* Criteria */}
      <Section title="Criteria + Constraints" icon="✅" defaultOpen={false}>
        <ul className="space-y-2">
          {[
            "Your car must be powered by rubber bands only — no pushing, throwing, or external force.",
            "Your car must be built within the 10-minute construction window using only the provided materials.",
            "You must compete in all three challenges using the same car.",
            "After testing, your team must identify at least one part to improve and explain why with evidence from your test results.",
            "Select participants will design an improved wheel in Tinkercad and 3D print it for a final bonus run.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="text-blue-500 font-bold flex-shrink-0">→</span> {item}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
          {[
            { icon: "⭐", label: "Difficulty", text: "Basic — no prior experience required" },
            { icon: "🕐", label: "Total Duration", text: "25 min (10 build · 5 compete · 10 reflect)" },
            { icon: "👥", label: "Teams", text: "12 teams" },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl bg-muted/40 border border-border/40">
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <div>
                <p className="font-poppins font-bold text-xs text-foreground mb-0.5">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Build Video */}
      <Section title="Build Video Tutorial" icon="🎬" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">Watch the full build tutorial before starting your car.</p>
        <div className="rounded-2xl overflow-hidden aspect-video bg-black">
          <iframe
            src="https://www.youtube.com/embed/0W9iaB42QDU?origin=https://base44.app"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            title="Rubber Band Car Build Tutorial"
          />
        </div>
        <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-xl gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm">
            <Play size={14} /> Watch on YouTube
          </Button>
        </a>
      </Section>

      {/* Materials */}
      <Section title="Materials — What's in Your Kit" icon="🧰" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">Each team receives one kit containing the following materials. No additional materials are allowed during the build phase.</p>
        <div className="space-y-4">
          {MATERIALS.map((mat) => (
            <div key={mat.num} className="flex gap-4 p-4 rounded-xl bg-muted/40 border border-border/40">
              <img src={mat.img} alt={mat.name} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
              <div>
                <p className="font-poppins font-bold text-sm text-foreground mb-1">
                  <span className="text-blue-500 mr-1">{mat.num}.</span> {mat.name}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{mat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* The Three Challenges */}
      <Section title="The Three Challenges" icon="🏁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">Your car will be judged in three separate challenges. The same car is used for all three runs.</p>
        <div className="space-y-3">
          {[
            { num: "1", color: "bg-blue-600", title: "Farthest Distance", desc: "Wind your rubber band and release from the starting line. Measure straight-line distance from initial to final resting position. Greatest distance wins." },
            { num: "2", color: "bg-purple-600", title: "Straightest Line", desc: "Same setup as Challenge 1. Winner is determined by least deviation from the center line. A facilitator marks the center line before runs begin." },
            { num: "3", color: "bg-green-600", title: "Fastest Car", desc: "A finish line is placed 3 meters from the start. Each team gets one timed run. Timer starts when the car moves, stops when the front crosses the finish line or the car stops." },
          ].map((c) => (
            <div key={c.num} className="flex gap-4 p-4 rounded-xl border border-border/40 bg-muted/20">
              <span className={`w-8 h-8 rounded-full ${c.color} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}>{c.num}</span>
              <div>
                <p className="font-poppins font-bold text-sm text-foreground mb-1">{c.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-poppins font-bold text-xs text-blue-800 mb-1">📏 How to Measure Distance</p>
          <p className="text-xs text-blue-700 leading-relaxed">Always measure from the initial position (front of car at starting line) to the final position (where car stops). Hold the tape straight and flat along the floor. If your car veers sideways, still measure straight-line distance — not the curved path.</p>
        </div>
      </Section>

      {/* Steps */}
      <Section title="Build Steps" icon="🔧" defaultOpen={true}>
        <div className="space-y-5">
          <img src={IMG_PART1} alt="Part 1 — Preparation and Assembly" className="w-full rounded-2xl object-cover shadow-sm" />

          {[
            {
              num: "1", time: "2 min", title: "Understand the Challenge",
              content: (
                <div className="space-y-2">
                  <p className="text-sm text-foreground/80">Before you touch any materials, discuss these questions with your team:</p>
                  <ul className="space-y-1.5">
                    {[
                      "What makes a car go far? What makes it go straight? What makes it go fast?",
                      "Looking at your materials — which ones affect speed? Which affect direction?",
                      "What is your team's biggest concern about the build? Name it now before you start.",
                    ].map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="text-blue-500 font-bold flex-shrink-0">•</span> {q}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground italic">Write down your team's answers. You will compare them to your actual results after the competition.</p>
                </div>
              ),
            },
            {
              num: "2", time: "10 min", title: "Build Your Car",
              content: (
                <div className="space-y-2">
                  <p className="text-sm text-foreground/80">Use only the provided materials. The clock starts when the facilitator says go. Keep these engineering principles in mind:</p>
                  <div className="space-y-2">
                    {[
                      { label: "Wheel alignment", text: "If wheels are not parallel, your car will veer. Check alignment before the glue sets." },
                      { label: "Axle fit", text: "The pop rivet must pass through the center of the foam disc cleanly. An off-center axle causes wobble and energy loss." },
                      { label: "Car weight", text: "Every popsicle stick and drop of glue adds weight. More weight means more energy needed just to start moving. Build light." },
                      { label: "Rubber band anchor", text: "Your rubber band needs a fixed anchor at the rear and a winding point at the axle. If the anchor slips, all stored energy is lost instantly." },
                      { label: "Glue cooling", text: "Do not test before all joints are fully cooled. A joint that breaks during the competition run cannot be repaired." },
                    ].map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span className="font-bold text-blue-600 flex-shrink-0">{tip.label} —</span>
                        <span className="text-muted-foreground">{tip.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
                    <p className="text-xs text-amber-800">⏱️ A facilitator will call time at 10 minutes. Whatever state your car is in at that point is your competition car.</p>
                  </div>
                </div>
              ),
            },
          ].map((step) => (
            <div key={step.num} className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {step.num}
                </span>
                <span className="font-poppins font-bold text-sm text-foreground flex-1">{step.title}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{step.time}</span>
              </div>
              <div className="p-5">{step.content}</div>
            </div>
          ))}

          <img src={IMG_PART2} alt="Part 2 — Competition and Redesign" className="w-full rounded-2xl object-cover shadow-sm" />

          {/* Step 3 - Compete (interactive) */}
          <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
              <span className="font-poppins font-bold text-sm text-foreground flex-1">Compete</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">5 min</span>
            </div>
            <div className="p-5">
              <CompeteTracker />
            </div>
          </div>

          {/* Step 4 - Reflect (interactive) */}
          <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
              <span className="font-poppins font-bold text-sm text-foreground flex-1">Reflect</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">10 min</span>
            </div>
            <div className="p-5">
              <ReflectionTracker />
            </div>
          </div>
        </div>
      </Section>

      {/* Reflection: What Can Be Improved */}
      <Section title="Reflection — What Can Be Improved?" icon="🔍" defaultOpen={false}>
        <div className="space-y-3">
          {[
            { title: "Weight", desc: "Extra popsicle sticks, thick glue blobs, and uneven foam discs all add mass. More mass means rubber band energy is spent overcoming inertia instead of producing speed. In the extension, you can design a lighter, hollow wheel or car body frame." },
            { title: "Wheel Diameter", desc: "Larger wheels travel greater distance per rotation. A wheel with 40mm diameter covers more ground per axle turn than a 20mm wheel — even with the same rubber band energy. In the extension, you'll design and print a larger wheel to test this directly." },
            { title: "Car Dimensions", desc: "A longer wheelbase generally produces straighter travel. A wider car is more stable but heavier. In the extension, you can sketch an improved body layout before committing to a rebuild." },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/40">
              <p className="font-poppins font-bold text-sm text-foreground mb-1">{item.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3D Printing Extension */}
      <Section title="3D Printing Extension — Redesign Your Wheel" icon="🖨️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          After the competition and reflection, selected participants will redesign one part of their car using Tinkercad and print it for a bonus demonstration run.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-poppins font-bold text-xs text-blue-800 mb-2">Recommended Part: The Wheel</p>
          <p className="text-xs text-blue-700 leading-relaxed">Your EVA foam disc wheels are functional but imprecise — cut by hand, inconsistent in diameter, and not perfectly centered. A 3D printed wheel solves all three problems simultaneously.</p>
        </div>
        <div>
          <p className="font-poppins font-bold text-sm text-foreground mb-2">Design Brief for the Improved Wheel</p>
          <ul className="space-y-1.5">
            {[
              "Diameter: 10–20mm larger than your foam disc (measure first)",
              "Axle hole: sized to fit your pop rivet axle + 0.3mm clearance",
              "Width: 8–12mm",
              "Feature: add 3–5 grip spokes or a tread pattern on the outer rim for traction",
              "Weight: design hollow where possible — light but strong",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-blue-500 font-bold flex-shrink-0">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-poppins font-bold text-sm text-foreground mb-2">Extension Steps</p>
          <div className="space-y-2">
            {[
              "Measure your existing foam wheel diameter and pop rivet shaft diameter using a ruler.",
              "Write these numbers down — they are your design constraints.",
              "Open Tinkercad and model the improved wheel using a cylinder primitive.",
              "Subtract the axle hole using a smaller cylinder set to Hole.",
              "Add grip features using small rectangular or cylindrical protrusions on the rim.",
              "Verify all dimensions with the Ruler tool before exporting.",
              "Export as STL and send to the facilitator for printing.",
              "Once printed, attach to your car and run Challenge 1 again — record the new distance.",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[10px]">{i + 1}</span>
                <span className="text-muted-foreground pt-0.5">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <a href={STL_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="rounded-xl gap-2 text-sm">
            <Download size={14} /> Download STL Files
          </Button>
        </a>
      </Section>

      {/* Portfolio */}
      <Section title="Portfolio Documentation" icon="📁" defaultOpen={false}>
        <div className="space-y-3">
          {[
            { phase: "Before the Competition", items: ["Photo of your completed car from above and from the side.", "Written record of your team's pre-build predictions (Step 1 answers)."] },
            { phase: "During the Competition", items: ["Photo of your car mid-run if possible.", "Completed results table with all three challenge measurements."] },
            { phase: "After the Competition", items: ["Written answers to all five reflection questions.", "Comparison table filled in (your result vs best result)."] },
            { phase: "3D Printing Extension", items: ["Measurement record of original foam wheel (diameter, width, axle hole).", "Tinkercad screenshot of your redesigned wheel.", "Photo of the printed wheel attached to the car.", "Final bonus run result — new distance vs original."] },
          ].map((section, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/40">
              <p className="font-poppins font-bold text-xs text-blue-600 mb-2">{section.phase}</p>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="text-blue-500 flex-shrink-0">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
          <Button className="w-full rounded-xl gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <ExternalLink size={14} /> Open Portfolio Template in Google Slides
          </Button>
        </a>
      </Section>
    </div>
  );
}