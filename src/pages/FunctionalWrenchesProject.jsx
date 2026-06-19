import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Download,
  ExternalLink, Clock, Layers, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9f8f426ef_FunctionalWrenches.png";

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
        <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
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

function ChallengeCard({ num, title, desc, considerations }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
        <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
        <span className="font-poppins font-bold text-sm text-foreground">{title}</span>
      </div>
      <div className="p-5 space-y-2">
        <p className="text-sm text-foreground/80 leading-relaxed">{desc}</p>
        {considerations && (
          <div className="bg-muted/40 border border-border/40 rounded-xl p-3 space-y-1">
            <p className="font-poppins font-bold text-xs text-foreground mb-1">Consider:</p>
            {considerations.map((c, i) => (
              <div key={i} className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-blue-500 font-bold flex-shrink-0">•</span> {c}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FunctionalWrenchesProject({ isPublic = false }) {
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
        <img src={COVER_IMG} alt="Functional Wrenches" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">STEM</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Basic</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Functional Wrenches</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">Design and 3D print a functional wrench that can tighten or loosen a nut and bolt.</p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> Short skill-building session</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 1 model + extension challenges</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <Section title="Project Overview" icon="📋" defaultOpen={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard icon="✅" label="Criteria & Constraints" text="The wrench must be designed to fit a selected nut and bolt mechanism. It should be strong enough to grip the fastener and help turn it. The wrench must be 3D printed and comfortable enough to hold and apply force." />
          <InfoCard icon="⭐" label="Difficulty" text="Basic — suitable for learners with foundational skills in 3D design and 3D printing." />
          <InfoCard icon="🕐" label="Project Length" text="This is a short skill-building project. The focus is on designing, printing, and testing a functional tool rather than completing a full design portfolio." />
          <InfoCard icon="📁" label="Project Portfolio" text="A template portfolio is not required. However, learners may still document their process by taking screenshots of the CAD model, photos of the 3D print, and notes from testing." />
        </div>
      </Section>

      {/* Introduction */}
      <Section title="Introduction" icon="🔩" defaultOpen={false}>
        <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
          <p>A <strong>nut</strong> is a type of fastener. It has a threaded hole that works together with a matching bolt to join multiple parts.</p>
          <p>When a nut is turned clockwise on a bolt, the sloped pattern of the threads makes the nut move along the bolt. This is similar to how a screw cap moves on a bottle. Nuts and bolts hold objects together through friction in the threads, slight stretching of the bolt, and compression between the joined parts.</p>
          <p>Nuts and bolts are commonly used in flat-pack furniture, machines, tools, and building structures. Many building frames are bolted together because nuts and bolts can create very strong connections.</p>
          <p>A <strong>wrench</strong>, also called a spanner, is a hand tool used to tighten or loosen nuts and bolts. It works by gripping opposite sides of the nut or bolt and turning it. When the wrench is turned, friction between the wrench and the fastener helps it grip. The turning force is called <strong>torque</strong>.</p>
          <p>The handle or shaft of the wrench acts like a <strong>lever</strong>. This makes it easier for the user to apply force and turn the nut or bolt.</p>
          <p>With 3D printing, tools can be manufactured on demand in a short period of time. Instead of storing large toolkits, digital files can be created, shared, and printed when needed. This is useful in homes, workshops, schools, factories, and even space missions where storage space and weight are important.</p>
        </div>
      </Section>

      {/* Design Considerations */}
      <Section title="Design Considerations" icon="🔬" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          This project focuses on creating a functional 3D printed tool. Before designing your wrench, you need to understand the nut and bolt that it will fit.
        </p>
        <div className="space-y-3">
          {[
            { icon: "🔩", title: "Nut and Bolt Size", desc: "Choose a nut and bolt mechanism that you want to design a wrench for. This can be a real fastener from your home, classroom, workshop, or a sample 3D printed nut and bolt." },
            { icon: "🔲", title: "Wrench Profile", desc: "The profile is the shape of the opening that grips the nut or bolt. It should fit around opposite sides of the fastener so it can turn without slipping." },
            { icon: "🤝", title: "Grip and Torque", desc: "The wrench must grip the nut or bolt tightly enough to apply torque. If the opening is too loose, it may slip. If it is too tight, it may not fit properly." },
            { icon: "📏", title: "Handle Length", desc: "A longer handle can make turning easier because it acts like a lever. However, if the handle is too long or thin, the 3D printed wrench may become weak." },
            { icon: "💪", title: "Strength", desc: "Because the wrench is 3D printed, the design must be thick and strong enough to handle force. Avoid making the handle or wrench head too thin." },
            { icon: "⚙️", title: "Tolerance", desc: "3D printed parts may not come out exactly the same size as the CAD model. You may need to leave a small clearance so the wrench fits the nut or bolt properly." },
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
      <Section title="Tinkercad Tutorial — Build the Wrench Model" icon="🖥️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Follow the step-by-step tutorial to design a wrench in Tinkercad. You may choose either voice-over instructions or text-based instructions depending on your preferred learning style.
        </p>
        <div className="space-y-3">
          {[
            "Select a nut and bolt mechanism.",
            "Measure the nut or bolt size that the wrench must fit.",
            "Open Tinkercad or your preferred CAD software.",
            "Create the main wrench handle.",
            "Design the wrench head around the nut or bolt profile.",
            "Add enough clearance so the wrench can fit properly.",
            "Combine the handle and wrench head into one printable model.",
            "Export the design as an STL file.",
            "Slice the model and prepare it for 3D printing.",
            "Print and test the wrench.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 py-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800"><span className="font-bold">💡 Tip:</span> If you 3D print the example nut and bolt, you may need to lightly sand the threads so they move smoothly.</p>
        </div>
      </Section>

      {/* Design + Make */}
      <Section title="Design + Make" icon="🛠️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          In this section, you will bring your functional wrench to life through 3D design and 3D printing.
        </p>
        <div className="space-y-4">
          <StepCard num="1" title="Find a Nut and Bolt" desc="Choose the fastener system you want to design for. This may be a real nut and bolt or a 3D printed example." />
          <StepCard num="2" title="Measure the Fastener" desc="Measure the distance across the nut or bolt head. This will help you create a wrench opening that fits correctly." />
          <StepCard num="3" title="Design the Wrench" desc="Create a wrench that fits around the nut or bolt. Make sure the handle is comfortable and strong enough to turn the fastener." />
          <StepCard num="4" title="Prepare for 3D Printing" desc="Export the model and check the print orientation. A flat orientation is usually helpful for strength and print stability." />
          <StepCard num="5" title="3D Print" desc="Print your wrench. Make sure the print has enough strength, especially around the wrench head and handle connection." />
          <StepCard num="6" title="Test" desc="Use the wrench to tighten or loosen the nut and bolt. Observe whether it grips properly, slips, bends, or breaks." />
          <StepCard num="7" title="Improve" desc="If the wrench does not work well, return to your CAD model and adjust the size, shape, thickness, or handle length." />
        </div>
      </Section>

      {/* Product Analysis & Testing */}
      <Section title="Product Analysis & Testing" icon="📊" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          After printing your wrench, test it using your selected nut and bolt.
        </p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          <p className="font-poppins font-bold text-xs text-foreground mb-1">Record the following:</p>
          {[
            "Did the wrench fit the nut or bolt?",
            "Was the opening too tight or too loose?",
            "Did the wrench grip properly?",
            "Did the wrench slip while turning?",
            "Was the handle comfortable to hold?",
            "Was the wrench strong enough?",
            "What part needs improvement?",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-blue-500 font-bold flex-shrink-0">•</span> {item}
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-blue-800 leading-relaxed">Testing helps you understand whether your tool is functional and what changes are needed to improve it.</p>
        </div>
      </Section>

      {/* Extension Challenges */}
      <Section title="Extension Challenges" icon="🔁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          If you want to take your wrench design to the next level, try one or more of these challenges.
        </p>
        <div className="space-y-4">
          <ChallengeCard
            num="1"
            title="Wrench Set"
            desc="Design a complete set of wrench models for different nut and bolt sizes."
            considerations={[
              "Labelling each wrench with its size",
              "Creating a storage case or organiser",
              "Making the set easy to identify and use",
            ]}
          />
          <ChallengeCard
            num="2"
            title="Multi-Size Wrench"
            desc="Create one wrench that can fit multiple nut and bolt sizes."
            considerations={[
              "Adding different wrench profiles on each end",
              "Designing a compact shape",
              "Making sure the user can still hold it comfortably",
            ]}
          />
          <ChallengeCard
            num="3"
            title="Adjustable Wrench"
            desc="Design an adjustable wrench using a 3D printed mechanism."
            considerations={[
              "A sliding jaw",
              "A screw thread adjustment",
              "A locking mechanism",
              "Strength and durability of moving parts",
            ]}
          />
          <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
              <span className="font-poppins font-bold text-sm text-foreground">Multi-Tool</span>
            </div>
            <div className="p-5 space-y-2">
              <p className="text-sm text-foreground/80 leading-relaxed">Create a wrench that also works as another tool.</p>
              <div className="bg-muted/40 border border-border/40 rounded-xl p-3 space-y-1">
                <p className="font-poppins font-bold text-xs text-foreground mb-1">Possible additions:</p>
                {[
                  "Screwdriver tip",
                  "Bottle opener",
                  "Ruler",
                  "Hex key holder",
                  "Storage slot for small fasteners",
                ].map((c, i) => (
                  <div key={i} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="text-blue-500 font-bold flex-shrink-0">•</span> {c}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic">Think about who will use the tool and what extra features would be helpful.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Final 3D Print */}
      <Section title="Final 3D Print" icon="🖨️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Before printing your final wrench, check the following:
        </p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          {[
            "The wrench opening matches the nut or bolt size",
            "The handle is strong and comfortable",
            "The head is thick enough to resist breaking",
            "The model is oriented properly for printing",
            "The print settings provide enough strength",
            "The wrench can apply torque without slipping",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-green-600 font-bold flex-shrink-0">✓</span> {item}
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-blue-800 leading-relaxed">After printing, test the final wrench again and compare it with your first version.</p>
        </div>
      </Section>

      {/* Optional Documentation */}
      <Section title="Optional Documentation Guide" icon="📁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Although this project does not require a full portfolio, you may still document your work.
        </p>
        <div className="space-y-3">
          {[
            { slide: "Title", items: ["Functional Wrench Project"] },
            { slide: "Chosen Fastener", items: ["Show the nut and bolt you selected."] },
            { slide: "Measurement", items: ["Include the size of the nut or bolt that your wrench is designed for."] },
            { slide: "CAD Design", items: ["Add screenshots of your wrench model in Tinkercad or Fusion 360."] },
            { slide: "3D Print", items: ["Add photos of the printed wrench."] },
            { slide: "Testing Results", items: ["Explain how well the wrench worked.", "Mention if it fit, slipped, bent, or needed adjustments."] },
            { slide: "Improvements", items: ["Describe any changes you made to improve the design."] },
            { slide: "Final Design", items: ["Show the final wrench and explain why it is functional."] },
          ].map((section, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/40">
              <p className="font-poppins font-bold text-xs text-blue-700 mb-2">{section.slide}</p>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="text-blue-400 flex-shrink-0">→</span> {item}
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
          <Download size={15} className="text-blue-600" /> Downloads & Resources
        </h3>
        <div className="space-y-2">
          {[
            { label: "Example Nut and Bolt STL", desc: "Use this if you do not have a real nut and bolt available" },
            { label: "Wrench Tutorial", desc: "Step-by-step instructions for designing a wrench in Tinkercad or Fusion 360" },
            { label: "Extension Challenge Ideas", desc: "Use these to improve your wrench or create a more advanced tool" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-muted/40 border border-border/40">
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Download size={15} className="text-blue-600" />
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
      <Card className="p-5 border-blue-200 bg-blue-50/50 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-2 text-blue-800">🔑 Key Learning</h3>
        <p className="text-xs text-blue-700 leading-relaxed">
          This project teaches learners how nuts, bolts, and wrenches work together. It also develops skills in CAD design, 3D printing, measurement, tolerance, tool design, prototyping, and testing functional objects.
        </p>
      </Card>
    </div>
  );
}