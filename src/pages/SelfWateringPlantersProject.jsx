import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Download,
  ExternalLink, Clock, Layers, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9b6f3097f_Self-WateringPlanters.png";

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

function ChallengeCard({ num, title, desc, considerations }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
        <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
        <span className="font-poppins font-bold text-sm text-foreground">{title}</span>
      </div>
      <div className="p-5 space-y-2">
        <p className="text-sm text-foreground/80 leading-relaxed">{desc}</p>
        {considerations && (
          <div className="bg-muted/40 border border-border/40 rounded-xl p-3 space-y-1">
            <p className="font-poppins font-bold text-xs text-foreground mb-1">Consider:</p>
            {considerations.map((c, i) => (
              <div key={i} className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-emerald-500 font-bold flex-shrink-0">•</span> {c}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SelfWateringPlantersProject({ isPublic = false }) {
  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-6">
      {!isPublic && (
        <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft size={16} /> Back to Maker Lessons
        </Link>
      )}

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[300px] shadow-xl">
        <img src={COVER_IMG} alt="Self-Watering Planters" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">STEM</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Basic</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Self-Watering Planters</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">Design and 3D print a self-watering planter that helps plants receive consistent moisture over time.</p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> 4 hours + monitoring time</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 1 planter + design challenges</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Overview */}
      <Section title="Project Overview" icon="📋" defaultOpen={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard icon="✅" label="Criteria & Constraints" text="The planter must be 3D printable and designed to support plant growth. It should include a container system that stores water and supplies it to the plant when needed, reducing overwatering and supporting healthy roots." />
          <InfoCard icon="⭐" label="Difficulty" text="Basic — suitable for learners with foundational skills in 3D design and 3D printing." />
          <InfoCard icon="🕐" label="Project Length" text="~4 hours (excl. 3D printing time), plus additional time to monitor plant growth after the planter is used." />
          <InfoCard icon="🧰" label="Equipment Required" text="Laptop with Tinkercad or Fusion 360, 3D printer, plant or seed, soil, water, measuring cup, pen & paper, camera." />
        </div>
      </Section>

      {/* Introduction */}
      <Section title="Introduction" icon="🌱" defaultOpen={false}>
        <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
          <p>Plants make their own food through a process called <strong>photosynthesis</strong>. This process allows plants to survive and grow. Photosynthesis is important to Earth because it is a major source of oxygen in the atmosphere.</p>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
            <p className="text-sm font-poppins font-bold text-emerald-800">Carbon dioxide + water + light → glucose + oxygen</p>
          </div>
          <p>Plants get carbon dioxide from the air through their leaves. They get light from the sun, and they absorb water from the soil. Photosynthesis creates glucose and oxygen. Oxygen is released into the air, while glucose is used for respiration, growth, and storage.</p>
          <p>Plants have special features that help them carry out photosynthesis. Leaves are thin, making it easier for carbon dioxide to move into the leaf. Leaves also have a large surface area to capture light. They contain <strong>chloroplasts</strong>, which help convert sunlight into energy. Plants also have tube-like structures that carry water and food around the plant.</p>
          <p>Water is absorbed from the soil through <strong>root hair cells</strong>. These cells are thin and have a large surface area, allowing water to pass into the plant more easily.</p>
          <p>Traditional planters usually hold soil in a container, and water is added from the top. However, traditional planters may require frequent watering and can be prone to overwatering. Too much water can leave roots waterlogged, causing them to rot.</p>
          <p><strong>Self-watering planters</strong> are designed to solve this problem. They usually have two main parts: an outer container and an inner pot with perforated holes. The outer container holds a reservoir of water at the bottom. The soil and plant are placed inside the inner pot. When the soil dries out, it draws water from the reservoir as needed.</p>
          <p>In this project, you will design and 3D print your own self-watering planter. Once created, you can begin growing plants and helping the ecosystem thrive.</p>
        </div>
      </Section>

      {/* Design Considerations */}
      <Section title="Design Considerations" icon="🔬" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">Before designing your self-watering planter, think about how plants grow and how water moves through the planter system.</p>
        <div className="space-y-3">
          {[
            { icon: "☀️", title: "Photosynthesis", desc: "Plants need light, carbon dioxide, and water to make food. Your planter should support healthy plant growth by helping the plant access water without becoming waterlogged." },
            { icon: "💧", title: "Water Reservoir", desc: "The planter should include a space where water can be stored. This reservoir allows the plant to access water when the soil becomes dry." },
            { icon: "🪴", title: "Inner Pot", desc: "The inner pot holds the soil and plant. It should have small holes or openings that allow water to move from the reservoir into the soil." },
            { icon: "⭕", title: "Perforated Holes", desc: "The holes must be large enough to allow water movement but not so large that soil falls out easily." },
            { icon: "🌿", title: "Root Health", desc: "Healthy roots need water and air. The design should avoid overwatering, because waterlogged roots can rot." },
            { icon: "📐", title: "Planter Size", desc: "The planter should be large enough for the selected plant, but not too large that it becomes difficult or slow to print." },
            { icon: "🔄", title: "Water Refill Access", desc: "The design should make it easy to add water to the reservoir when needed. A small refill opening or removable inner pot may help." },
            { icon: "⚖️", title: "Stability", desc: "The planter should have a stable base so it does not tip over when filled with soil, water, and a plant." },
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
      <Section title="Skill Building — Build the Basic Planter" icon="🖥️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          You will begin by following a tutorial to design a basic self-watering planter. This example model will act as the starting point for your own improved version.
        </p>
        <div className="space-y-3">
          {[
            "Open Tinkercad or Fusion 360.",
            "Create the outer container that will hold the water reservoir.",
            "Create the inner pot that will hold the soil and plant.",
            "Add perforated holes to the inner pot.",
            "Design enough clearance so the inner pot fits inside the outer container.",
            "Add a stable base to prevent tipping.",
            "Add a water refill gap or opening if needed.",
            "Check that the parts are printable.",
            "Export the model as an STL file.",
            "Slice and 3D print the planter parts.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 py-1">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Product Analysis & Testing */}
      <Section title="Product Analysis & Testing" icon="🧪" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">After printing your planter, test if the parts fit together and if the water system works properly.</p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          <p className="font-poppins font-bold text-xs text-foreground mb-1">Testing Method:</p>
          {[
            "Assemble the outer container and inner pot.",
            "Check if the inner pot fits properly.",
            "Add water to the reservoir.",
            "Add soil to the inner pot.",
            "Plant a seed or small plant.",
            "Observe how the soil absorbs water.",
            "Monitor the plant over several days or weeks.",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              {item}
            </div>
          ))}
        </div>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          <p className="font-poppins font-bold text-xs text-foreground mb-1">Record the following:</p>
          {[
            "Did the inner pot fit inside the outer container?",
            "Was there enough clearance between the parts?",
            "Did the reservoir hold water without leaking?",
            "Did the soil absorb water properly?",
            "Were the holes too small or too large?",
            "Did the plant receive enough moisture?",
            "Did the roots become too wet?",
            "How often did you need to refill the water?",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-emerald-500 font-bold flex-shrink-0">•</span> {item}
            </div>
          ))}
        </div>
      </Section>

      {/* Design Challenges */}
      <Section title="Design Challenges — Improve the Planter" icon="🔁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">After making the basic model, improve your design through one or more design challenges.</p>
        <div className="space-y-4">
          <ChallengeCard num="1" title="Improve the Water Reservoir" desc="Redesign the reservoir so it can hold more water without making the planter too large or unstable." considerations={["Wider base", "Deeper water chamber", "Clear refill level marker", "Easy refill opening"]} />
          <ChallengeCard num="2" title="Improve the Inner Pot" desc="Modify the inner pot so water can move into the soil more effectively." considerations={["Hole size", "Hole spacing", "Hole location", "Soil support"]} />
          <ChallengeCard num="3" title="Reduce Overwatering" desc="Design a feature that helps prevent too much water from reaching the roots." considerations={["Raised inner pot", "Smaller water contact area", "Drainage gap", "Air space between reservoir and soil"]} />
          <ChallengeCard num="4" title="Improve Plant Growth Monitoring" desc="Create a simple way to observe or track plant growth." considerations={["Height marker", "Label area", "Plant name tag", "Water level indicator", "Observation chart"]} />
          <ChallengeCard num="5" title="Improve Aesthetics" desc="Make the planter more visually appealing while keeping it functional." considerations={["Patterned outer wall", "Textured surface", "Custom name or label", "Nature-inspired shape", "Decorative rim"]} />
        </div>
      </Section>

      {/* Plant Growth Strategy */}
      <Section title="Plant Growth Strategy" icon="🌿" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">After printing and assembling your planter, create a plan for growing and monitoring your plant.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
            <p className="font-poppins font-bold text-xs text-foreground mb-1">Growth Plan — Include:</p>
            {["Plant type", "Amount of soil", "Amount of water added to the reservoir", "Location of the planter", "Expected sunlight exposure", "Observation schedule"].map((item, i) => (
              <div key={i} className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-emerald-500 font-bold flex-shrink-0">•</span> {item}
              </div>
            ))}
          </div>
          <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
            <p className="font-poppins font-bold text-xs text-foreground mb-1">Monitoring — Record:</p>
            {["Plant height", "Leaf growth", "Soil moisture", "Water level", "Refill dates", "Signs of overwatering", "Signs of healthy growth"].map((item, i) => (
              <div key={i} className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-emerald-500 font-bold flex-shrink-0">•</span> {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Final 3D Print */}
      <Section title="Final 3D Print" icon="🖨️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">Before printing your final planter, check the following:</p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          {[
            "The planter has an outer water reservoir",
            "The inner pot fits properly",
            "Perforated holes allow water movement",
            "The base is stable",
            "The design is not too thin or fragile",
            "The reservoir can be refilled easily",
            "The model is properly oriented for printing",
            "The planter supports healthy root growth",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-green-600 font-bold flex-shrink-0">✓</span> {item}
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-blue-800 leading-relaxed">After printing, assemble the parts and test the planter with soil, water, and a plant.</p>
        </div>
      </Section>

      {/* Portfolio Guide */}
      <Section title="Project Portfolio Guide" icon="📁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">Document your design process in a Google Slides portfolio or another digital format.</p>
        <div className="space-y-3">
          {[
            { slide: "Title Slide", items: ["Add your full name, project title, date, and class or group."] },
            { slide: "Introduction", items: ["Explain the goal of the project.", "Describe how self-watering planters work."] },
            { slide: "Photosynthesis", items: ["Summarize why plants need water, carbon dioxide, and light to grow."] },
            { slide: "Design Considerations", items: ["Discuss the water reservoir, inner pot, perforated holes, root health, refill access, and stability."] },
            { slide: "Initial CAD Model", items: ["Show screenshots of your first planter design."] },
            { slide: "3D Print", items: ["Include photos of your printed parts."] },
            { slide: "Testing Results", items: ["Describe how the planter performed when filled with water, soil, and a plant."] },
            { slide: "Design Improvements", items: ["Explain what changes you made to improve the planter."] },
            { slide: "Growth Monitoring", items: ["Record plant growth observations over time."] },
            { slide: "Final Solution", items: ["Present your final planter design.", "Explain how it helps plants grow."] },
          ].map((section, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/40">
              <p className="font-poppins font-bold text-xs text-emerald-700 mb-2">{section.slide}</p>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="text-emerald-400 flex-shrink-0">→</span> {item}
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
          <Download size={15} className="text-emerald-600" /> Downloads & Resources
        </h3>
        <div className="space-y-2">
          {[
            { label: "Self-Watering Planter Tutorial", desc: "Step-by-step guide to design the basic planter in Tinkercad or Fusion 360" },
            { label: "Design Method Toolkit", desc: "Alternative design methods to adapt or extend the project" },
            { label: "Portfolio Template", desc: "Google Slides or digital portfolio format to document your process" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-muted/40 border border-border/40">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Download size={15} className="text-emerald-600" />
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
      <Card className="p-5 border-emerald-200 bg-emerald-50/50 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-2 text-emerald-800">🔑 Key Learning</h3>
        <p className="text-xs text-emerald-700 leading-relaxed">
          This project teaches learners about photosynthesis, plant growth, water movement, root health, CAD design, 3D printing, prototyping, testing, and improving a functional product over time.
        </p>
      </Card>
    </div>
  );
}