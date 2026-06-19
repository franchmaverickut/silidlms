import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Download,
  ExternalLink, Clock, Layers, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/c44bb0b59_PuzzleCubes.png";

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

function InfoCard({ icon, label, text }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-muted/40 border border-border/40">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div>
        <p className="font-poppins font-bold text-xs text-foreground mb-1">{label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function StepCard({ num, title, desc, tip, warning }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
        <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
        <span className="font-poppins font-bold text-sm text-foreground">{title}</span>
      </div>
      <div className="p-5 space-y-2">
        <p className="text-sm text-foreground/80 leading-relaxed">{desc}</p>
        {tip && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs text-amber-800"><span className="font-bold">💡 Tip:</span> {tip}</p>
          </div>
        )}
        {warning && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-xs text-blue-800 leading-relaxed">{warning}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PuzzleCubesProject({ isPublic = false }) {
  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-6">
      {/* Back */}
      {!isPublic && (
        <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft size={16} /> Back to Maker Lessons
        </Link>
      )}

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[300px] shadow-xl">
        <img src={COVER_IMG} alt="Puzzle Cubes" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">STEM</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Basic</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Puzzle Cubes</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">Design and 3D print a puzzle cube made of separate pieces that fit together to form one perfect cube.</p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> 4 hours (excl. print time)</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 1 prototype + 1 iteration</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <Section title="Project Overview" icon="📋" defaultOpen={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard icon="✅" label="Criteria & Constraints" text="The puzzle cube must be made from smaller cube units. Each small cube should measure 10 mm × 10 mm × 10 mm. The final assembled puzzle should form a complete cube measuring 30 mm × 30 mm × 30 mm. All pieces must be 3D printed and fit together properly." />
          <InfoCard icon="⭐" label="Difficulty" text="Basic — suitable for learners with foundational skills in 3D design and 3D printing." />
          <InfoCard icon="🕐" label="Project Length" text="~4 hours (excl. 3D printing time). Includes designing the puzzle cube, testing the prototype, modifying the model, designing a case, and creating assembly instructions." />
          <InfoCard icon="📁" label="Project Portfolio" text="Document your design process in a portfolio. Include screenshots of your CAD model, photos of your 3D print, testing notes, design changes, and final instructional diagrams." />
        </div>
      </Section>

      {/* Design Considerations */}
      <Section title="Design Considerations" icon="🔬" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          This project focuses on designing objects that fit together. Instead of deep research, you will begin directly with 3D CAD design — create an initial puzzle cube prototype, test it, improve it, then create a case and assembly guide.
        </p>
        <div className="space-y-3">
          {[
            { icon: "📦", title: "Cube Size", desc: "Start with a small cube measuring 10 mm × 10 mm × 10 mm. These small cubes act as the building blocks of the puzzle pieces." },
            { icon: "🔲", title: "Final Cube Size", desc: "The final assembled puzzle should form a larger cube measuring 30 mm × 30 mm × 30 mm — a 3 × 3 × 3 cube structure." },
            { icon: "🧩", title: "Puzzle Pieces", desc: "Adjoining small cubes can be combined to form different puzzle pieces. Each piece should have a unique shape, but all must still fit together to complete the final cube." },
            { icon: "📏", title: "Tolerance", desc: "Tolerance refers to the small difference between your CAD design and the actual 3D printed part. If pieces are too tight or don't fit, you may need to make small adjustments to your model." },
            { icon: "🖨️", title: "3D Printing Orientation", desc: "Before printing, separate and orient puzzle pieces properly. Try to reduce or remove overhangs so the pieces print cleanly." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl bg-muted/40 border border-border/40">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="font-poppins font-bold text-sm text-foreground mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Tinkercad Tutorial */}
      <Section title="Tinkercad Tutorial — Build the Example Model" icon="🖥️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Follow the step-by-step tutorial to design a puzzle cube in Tinkercad. You may use video or text-based instructions depending on your preferred learning style.
        </p>
        <div className="space-y-3">
          {[
            { num: 1, step: "Open Tinkercad or your preferred CAD software." },
            { num: 2, step: "Create a cube with dimensions of 10 mm × 10 mm × 10 mm." },
            { num: 3, step: "Duplicate the cube along the horizontal and vertical axes." },
            { num: 4, step: "Arrange the cubes to form a larger 30 mm × 30 mm × 30 mm cube." },
            { num: 5, step: "Group adjoining small cubes to create different puzzle pieces." },
            { num: 6, step: "Make sure all pieces can combine into one complete cube." },
            { num: 7, step: "Separate each puzzle piece for 3D printing." },
          ].map(({ num, step }) => (
            <div key={num} className="flex items-start gap-3 py-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{num}</span>
              <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800"><span className="font-bold">💡 Tip:</span> Keep each puzzle piece simple enough to print, but challenging enough to solve.</p>
        </div>
      </Section>

      {/* Product Analysis & Testing */}
      <Section title="Product Analysis & Testing" icon="📊" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          After printing your initial prototype, test the puzzle by assembling all pieces into a perfect cube.
        </p>
        <div className="space-y-3">
          <StepCard
            num="1"
            title="Test"
            desc="Try to assemble your puzzle cube. Observe which pieces fit properly and which pieces are difficult to connect."
            warning="Record: Which pieces fit well? Which are too tight or too loose? Did the final shape form a perfect cube? Was the puzzle too easy or too difficult?"
          />
          <StepCard
            num="2"
            title="Tolerance"
            desc="If the pieces do not fit properly, the problem may be caused by tolerance. Because 3D printers are not always perfectly accurate, printed parts may be slightly larger or smaller than the CAD model."
            tip="You may need to add small gaps or reduce certain dimensions so the puzzle pieces can fit smoothly."
          />
          <StepCard
            num="3"
            title="Modify"
            desc="Go back to your CAD model and make small changes based on your testing results. You do not need to reprint the whole puzzle — only reprint the pieces that need adjustment."
          />
        </div>
      </Section>

      {/* Feature Variation Models — Design Process */}
      <Section title="Feature Variation Models — Design Process" icon="🔁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Use your testing results to improve your puzzle cube. The goal is to create a better version of your design through iteration.
        </p>
        <div className="space-y-4">
          <StepCard
            num="1"
            title="Example Model Diagram"
            desc="Before making your final version, review the structure of your original puzzle cube. Check how each piece connects to the others and how the complete cube is formed."
          />
          <StepCard
            num="2"
            title="Base Model"
            desc="Your base model is the first version of your puzzle cube. This version should follow the 3 × 3 × 3 cube structure using 10 mm cube units."
          />
          <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
              <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
              <span className="font-poppins font-bold text-sm text-foreground">Feature Variations</span>
            </div>
            <div className="p-5 space-y-2">
              <p className="text-sm text-foreground/80 leading-relaxed">Choose one or more features to improve. Possible variations:</p>
              <ul className="space-y-1.5">
                {[
                  "Increase spacing between pieces for better fit",
                  "Change the shape of one puzzle piece",
                  "Reduce sharp edges",
                  "Improve piece orientation for printing",
                  "Make the puzzle more challenging",
                  "Make the pieces easier to assemble",
                ].map((v, i) => (
                  <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="text-orange-500 font-bold flex-shrink-0">•</span> {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <StepCard
            num="4"
            title="Sketch and Plan"
            desc="Before editing your CAD model, sketch your changes. Label the pieces and show how they should fit together."
          />
          <StepCard
            num="5"
            title="3D Printing"
            desc="Print your modified puzzle pieces. Make sure each piece is oriented properly on the print bed. Reduce overhangs where possible."
          />
          <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
              <span className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">6</span>
              <span className="font-poppins font-bold text-sm text-foreground">Test + Iterate</span>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm text-foreground/80 leading-relaxed">
                Assemble the modified puzzle again. Compare the new version with your first prototype and decide if the changes improved the design.
              </p>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                <p className="text-xs text-orange-800 font-semibold mb-1">Iteration Goal</p>
                <p className="text-xs text-orange-700">Each iteration should bring the puzzle closer to a perfect fit — pieces that slot together smoothly but hold their shape when assembled.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Design Case */}
      <Section title="Design Case" icon="📦" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          After improving your puzzle pieces, design a case that can hold all the parts safely and securely.
        </p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          <p className="font-poppins font-bold text-xs text-foreground mb-1">The case should:</p>
          {[
            "Fit all puzzle pieces",
            "Protect the pieces when stored",
            "Be easy to open and close",
            "Use proper tolerance so the pieces are not too tight",
            "Be fully 3D printable",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-orange-500 font-bold flex-shrink-0">✓</span> {item}
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-blue-800 leading-relaxed">You may design a simple box, sliding case, open tray, or snap-fit container.</p>
        </div>
      </Section>

      {/* Final 3D Print */}
      <Section title="Final 3D Print" icon="🖨️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          After completing your modifications and case design, print your final version.
        </p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          <p className="font-poppins font-bold text-xs text-foreground mb-1">Before printing, check the following:</p>
          {[
            "Pieces are properly separated",
            "Parts are correctly oriented",
            "Overhangs are reduced",
            "The case has enough clearance",
            "The final cube can be assembled",
            "The design is clean and functional",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-green-600 font-bold flex-shrink-0">✓</span> {item}
            </div>
          ))}
        </div>
      </Section>

      {/* Instructional Diagrams */}
      <Section title="Instructional Diagrams" icon="🧩" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Create a set of instructional diagrams to show how the puzzle is assembled. These diagrams act like an answer sheet. Use isometric drawings to show the puzzle clearly from a 3D angle.
        </p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          <p className="font-poppins font-bold text-xs text-foreground mb-1">Your diagrams should include:</p>
          {[
            "Each puzzle piece",
            "The order of assembly",
            "Arrows showing where pieces should go",
            "A final image of the completed cube",
            "Labels or step numbers",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-orange-500 font-bold flex-shrink-0">→</span> {item}
            </div>
          ))}
        </div>
      </Section>

      {/* Portfolio Guide */}
      <Section title="Project Portfolio Guide" icon="📁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Document your design process in a Google Slides or digital portfolio format.
        </p>
        <div className="space-y-3">
          {[
            { slide: "Title Slide", items: ["Enter your full name, project title, date, and class or group."] },
            { slide: "Inspiration Collage", items: ["Add images of puzzle cubes, 3D printed puzzles, tangrams, or dissection puzzles."] },
            { slide: "Design Considerations", items: ["Explain the purpose of the project.", "Describe important design factors: cube size, tolerance, fit, and 3D printing orientation."] },
            { slide: "Initial Prototype", items: ["Show your first CAD design.", "Include screenshots from Tinkercad or Fusion 360."] },
            { slide: "Testing Results", items: ["Describe what happened when you tested your first printed prototype.", "Include notes about which parts fit or did not fit."] },
            { slide: "Modifications", items: ["Explain the changes you made to improve the puzzle.", "Include before-and-after screenshots if possible."] },
            { slide: "Case Design", items: ["Show your storage case design.", "Explain how it protects and holds the puzzle pieces."] },
            { slide: "Final Solution", items: ["Present your final puzzle cube and case.", "Explain why your final design works better than your first prototype."] },
            { slide: "Instructional Diagrams", items: ["Include your isometric assembly guide showing how to solve the puzzle."] },
          ].map((section, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/40">
              <p className="font-poppins font-bold text-xs text-orange-600 mb-2">{section.slide}</p>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="text-orange-400 flex-shrink-0">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Downloads */}
      <Card className="p-5 border-border/60 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-4 flex items-center gap-2">
          <Download size={15} className="text-orange-500" /> Downloads & Resources
        </h3>
        <div className="space-y-2">
          {[
            { label: "Example STL File", desc: "Use this if you need a sample puzzle cube model or have issues exporting from Tinkercad" },
            { label: "Puzzle Cube Tutorial", desc: "Step-by-step instructions for creating the puzzle cube in Tinkercad or Fusion 360" },
            { label: "Isometric Drawing Template", desc: "Use this to create assembly instructions for your final puzzle cube" },
            { label: "Portfolio Template", desc: "Use this to document your design process, testing results, and final solution" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-muted/40 border border-border/40">
              <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Download size={15} className="text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs flex-shrink-0" disabled>
                <ExternalLink size={12} /> Coming Soon
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Learning */}
      <Card className="p-5 border-orange-200 bg-orange-50/50 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-2 text-orange-800">🔑 Key Learning</h3>
        <p className="text-xs text-orange-700 leading-relaxed">
          This project helps learners understand how separate parts can be designed to fit together. It teaches basic CAD modeling, 3D printing, tolerance, prototyping, testing, iteration, case design, and technical communication using isometric diagrams.
        </p>
      </Card>
    </div>
  );
}