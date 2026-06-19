import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Download,
  ExternalLink, Clock, Layers, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/b57596a03_BalloonDragsters.png";
const PORTFOLIO_URL = "https://docs.google.com/presentation/d/15L_eqd4ChWpcoW2yxvC_tvNQNMXXs3lQFhtsVXx-bJ0/edit?usp=sharing";
const FID_STEP1 = "https://weareprintlab.com/wp-content/uploads/2023/07/Feature-Iteration-Diagrams-Step-1-Example.pdf";
const FID_STEP2 = "https://weareprintlab.com/wp-content/uploads/2023/07/Feature-Iteration-Diagrams-Step-2-Example.pdf";
const FID_STEP3 = "https://weareprintlab.com/wp-content/uploads/2023/07/Feature-Iteration-Diagrams-Step-3-Example.pdf";
const FID_STEP4 = "https://weareprintlab.com/wp-content/uploads/2023/07/Feature-Iteration-Diagrams-Step-4-Example.pdf";

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

function StepCard({ num, title, desc, tip, warning, links }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
        <span className="w-7 h-7 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
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
        {links && links.map((l, i) => (
          <a key={i} href={l.url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs mt-1">
              <ExternalLink size={12} /> {l.label}
            </Button>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function BalloonDragstersProject({ isPublic = false }) {
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
        <img src={COVER_IMG} alt="Balloon Dragsters" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">STEM</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Basic</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Balloon Dragsters</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">Design and 3D print a balloon-powered dragster that travels as far as possible in a straight line.</p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> 4 hours (excl. print time)</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 1 dragster + 2 improved versions</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <Section title="Project Overview" icon="📋" defaultOpen={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard icon="✅" label="Criteria & Constraints" text="The dragster must be made from 3D printed components only, except for the axles, which may be made from another material. The dragster must be powered by one balloon and tested on the same flat surface throughout." />
          <InfoCard icon="⭐" label="Difficulty" text="Basic — suitable for learners with foundational skills in 3D design and 3D printing." />
          <InfoCard icon="🕐" label="Project Length" text="~4 hours (excl. 3D printing time). Includes designing an initial dragster, testing it, and creating 2 improved versions. Recommend 4 × 1-hour sessions." />
          <InfoCard icon="🧰" label="Equipment Required" text="Laptop with Tinkercad or Fusion 360, 3D printer, balloon, tape measure, pen & paper, camera or phone for photos." />
        </div>
        <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-xl gap-2 bg-red-500 hover:bg-red-600 text-white text-sm">
            <ExternalLink size={14} /> Open Portfolio Template
          </Button>
        </a>
      </Section>

      {/* Introduction */}
      <Section title="Introduction" icon="🎈" defaultOpen={false}>
        <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
          <p>A balloon-powered dragster is made up of several components: a <strong>chassis</strong>, an integrated <strong>airflow mechanism</strong>, <strong>wheels</strong>, and <strong>axles</strong>.</p>
          <p>When the dragster is stationary on a platform, its weight pushes downward. This is balanced by the reaction force from the platform. Forces always come in pairs. <strong>Newton's Third Law of Motion</strong> states that for every action, there is an equal and opposite reaction.</p>
          <p>This principle can be seen in rockets and birds. When a rocket launches, exhaust gas is pushed downward, creating thrust that moves the rocket upward. When birds fly, they push air downward with their wings, and the air pushes them upward.</p>
          <p>A balloon dragster works in a similar way. The balloon releases air pressure through the chassis and out the back of the dragster. This creates <strong>thrust</strong>, which pushes the dragster forward.</p>
          <p>The dragster eventually stops because of <strong>friction</strong> between the wheels and the surface, as well as <strong>air resistance</strong>.</p>
          <p>In this project, you will use your knowledge of Newton's Third Law to design and 3D print your own balloon-powered dragster. The goal is to make the dragster travel as far as possible in a straight line.</p>
        </div>
      </Section>

      {/* Design Considerations */}
      <Section title="Design Considerations" icon="🔬" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Before designing, consider the main factors that affect how far and how straight the balloon dragster can travel.
        </p>
        <div className="space-y-3">
          {[
            { icon: "⚖️", title: "Mass", desc: "A dragster with more mass will need more force to move. Reducing mass can improve acceleration and may help the dragster travel farther." },
            { icon: "💨", title: "Air Resistance", desc: "Large front-facing surfaces increase air resistance and slow the dragster down. Angled or curved surfaces can help reduce drag." },
            { icon: "🔄", title: "Friction", desc: "Wheels with less surface area may reduce friction. However, if the wheels are too narrow, the dragster may struggle to travel in a straight line." },
            { icon: "🔧", title: "Air Pipe Diameter", desc: "Different air pipe diameters can change the amount and duration of thrust. The rear outlet should point straight backward, not at an angle." },
            { icon: "🎈", title: "Balloon Connector", desc: "The connector should be large enough for the balloon to fit tightly without air gaps. However, it should not be too large because this can add unnecessary mass." },
            { icon: "📏", title: "Clearance", desc: "Clearance is the gap between joining parts. It is important so the axles fit tightly with the wheels while still turning freely inside the chassis." },
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

      {/* Skill Building Tutorial */}
      <Section title="Skill Building — Build the Example Model" icon="🖥️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          You will begin by following a tutorial to design a basic balloon dragster. This example model will act as the starting point for your own unique design. Choose either the Tinkercad or Fusion 360 tutorial.
        </p>
        <div className="space-y-3">
          {[
            "Open Tinkercad or Fusion 360.",
            "Import the required STL file if using the Tinkercad tutorial.",
            "Design the main chassis of the dragster.",
            "Add an airflow channel for the balloon air to pass through.",
            "Create the balloon connector.",
            "Design the wheel and axle system.",
            "Check that all parts have proper clearance.",
            "Export the model for slicing.",
            "Prepare the parts for 3D printing.",
            "Print and assemble the initial dragster prototype.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 py-2">
              <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Product Analysis & Testing */}
      <Section title="Product Analysis & Testing" icon="📊" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          After creating the first prototype, test how far the dragster can travel in a straight line.
        </p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          <p className="font-poppins font-bold text-xs text-foreground mb-1">Testing Method:</p>
          {[
            "Choose one flat testing surface.",
            "Mark a straight line path for the dragster.",
            "Inflate the balloon to the same size for each test.",
            "Release the dragster without pushing it.",
            "Measure how far it travels along the straight line path.",
            "Run 3 tests.",
            "Record the best distance travelled.",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              {item}
            </div>
          ))}
        </div>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          <p className="font-poppins font-bold text-xs text-foreground mb-1">Record the following:</p>
          {[
            "Distance travelled in each test",
            "Best distance travelled",
            "Did the dragster travel straight?",
            "Did it turn left or right?",
            "Did the wheels spin freely?",
            "Did the balloon connector leak air?",
            "Did the dragster stop because of friction, weight, or air resistance?",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-red-500 font-bold flex-shrink-0">•</span> {item}
            </div>
          ))}
        </div>
      </Section>

      {/* Feature Iteration Diagrams */}
      <Section title="Feature Iteration Diagrams — Design Process" icon="🔁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          To improve your dragster, use a design method called <strong>Feature Iteration Diagrams</strong>. This method helps you plan improvements by drawing and analysing the key features of your prototype.
        </p>
        <div className="space-y-4">
          <StepCard
            num="1"
            title="Numbered Diagram"
            desc="Create a numbered diagram of your initial prototype. Label the main features: chassis, air channel, balloon connector, wheels, axles, front body shape, rear outlet."
            links={[{ label: "View Step 1 Example", url: FID_STEP1 }]}
          />
          <StepCard
            num="2"
            title="Feature Diagrams"
            desc="Create a separate diagram for each numbered feature in the Iteration 1 column. Add dimensions and notes for each feature. You may need to return to your CAD model to check measurements."
            links={[{ label: "View Step 2 Example", url: FID_STEP2 }]}
          />
          <StepCard
            num="3"
            title="Test"
            desc="Test your initial prototype by measuring the straight line distance it can travel. Run 3 tests and use the best result. Measure along the straight line path up to the point where the dragster stops or moves out of line."
          />
          <StepCard
            num="4"
            title="Feedback Notes"
            desc="Write down your best distance travelled and key learnings in the feedback notes section. Focus your feedback on the project goal: making the dragster travel as far as possible in a straight line."
            links={[{ label: "View Step 3 Example", url: FID_STEP3 }]}
          />
          <StepCard
            num="5"
            title="Iteration Diagrams"
            desc="Look at each feature and decide what could be improved. You do not need to change everything. Even small changes to 1 or 2 features can greatly improve performance. Create new diagrams in the Iteration 2 column to show your planned changes."
            links={[{ label: "View Step 4 Example", url: FID_STEP4 }]}
          />
          <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
              <span className="w-7 h-7 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">6</span>
              <span className="font-poppins font-bold text-sm text-foreground">Repeat</span>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm text-foreground/80 leading-relaxed">
                After 3D printing Iteration 2, repeat the testing and feedback process. Use your results to create a final improved model. If time allows, continue making more iterations to see how far your dragster can go.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-xs text-red-800 font-semibold mb-1">Iteration Goal</p>
                <p className="text-xs text-red-700">Each iteration should improve how far the dragster travels in a straight line. Track your distance improvements across all versions.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final 3D Print */}
      <Section title="Final 3D Print" icon="🖨️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Before printing your final dragster, check the following:
        </p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          {[
            "The chassis is lightweight but strong",
            "The airflow path is clear",
            "The balloon connector fits tightly",
            "The rear outlet points straight back",
            "Wheels spin freely",
            "Axles have proper clearance",
            "The dragster can travel in a straight line",
            "The design reduces friction and air resistance",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-green-600 font-bold flex-shrink-0">✓</span> {item}
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-blue-800 leading-relaxed">After printing, assemble the dragster and test it again using the same flat surface.</p>
        </div>
      </Section>

      {/* Portfolio Guide */}
      <Section title="Project Portfolio Guide" icon="📁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Document your design process in a Google Slides portfolio or another digital format.
        </p>
        <div className="space-y-3">
          {[
            { slide: "Title Slide", items: ["Add your full name, project title, date, and class or group."] },
            { slide: "Introduction", items: ["Explain the goal of the project.", "Describe how a balloon-powered dragster works using Newton's Third Law."] },
            { slide: "Design Considerations", items: ["Discuss mass, air resistance, friction, airflow, balloon connector size, and clearance."] },
            { slide: "Initial Prototype", items: ["Show screenshots of your first CAD model.", "Explain its main features."] },
            { slide: "Feature Iteration Diagrams", items: ["Include your numbered diagram and feature diagrams."] },
            { slide: "Testing Results", items: ["Record the 3 test distances and the best distance travelled.", "Add observations about straight-line movement and performance."] },
            { slide: "Feedback Notes", items: ["Explain what worked well and what needed improvement."] },
            { slide: "Iteration 2", items: ["Show the changes made to your design.", "Explain why you made them."] },
            { slide: "Final Solution", items: ["Present your final dragster design.", "Include images, test results, and a short explanation of why it performed better."] },
          ].map((section, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/40">
              <p className="font-poppins font-bold text-xs text-red-600 mb-2">{section.slide}</p>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="text-red-400 flex-shrink-0">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
          <Button className="w-full rounded-xl gap-2 bg-red-500 hover:bg-red-600 text-white">
            <ExternalLink size={14} /> Open Portfolio Template in Google Slides
          </Button>
        </a>
      </Section>

      {/* Downloads */}
      <Card className="p-5 border-border/60 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-4 flex items-center gap-2">
          <Download size={15} className="text-red-500" /> Downloads & Resources
        </h3>
        <div className="space-y-2">
          {[
            { label: "Portfolio Template", desc: "Google Slides portfolio template for documenting the design process", url: PORTFOLIO_URL },
            { label: "Feature Iteration — Step 1 Example", desc: "Numbered diagram example", url: FID_STEP1 },
            { label: "Feature Iteration — Step 2 Example", desc: "Feature diagrams example", url: FID_STEP2 },
            { label: "Feature Iteration — Step 3 Example", desc: "Feedback notes example", url: FID_STEP3 },
            { label: "Feature Iteration — Step 4 Example", desc: "Iteration diagrams example", url: FID_STEP4 },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-muted/40 border border-border/40">
              <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                <Download size={15} className="text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
              </div>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs flex-shrink-0">
                  <ExternalLink size={12} /> Open
                </Button>
              </a>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Learning */}
      <Card className="p-5 border-red-200 bg-red-50/50 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-2 text-red-800">🔑 Key Learning</h3>
        <p className="text-xs text-red-700 leading-relaxed">
          This project teaches learners how forces, thrust, friction, air resistance, and mass affect motion. It also builds skills in CAD design, 3D printing, prototyping, testing, measurement, iteration, and STEM problem-solving.
        </p>
      </Card>
    </div>
  );
}