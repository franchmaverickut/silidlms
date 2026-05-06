import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, ExternalLink,
  Clock, Layers, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/682842f2f_image.png";

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

function StepCard({ num, title, desc }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-3 bg-purple-50 border-b border-purple-100">
        <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
        <span className="font-poppins font-bold text-sm text-foreground">{title}</span>
      </div>
      <div className="p-5">
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

const DRAWING_STEPS = [
  {
    title: "Select Product",
    desc: "Decide on whether you want to make a cable tidy, a bag holder, or a filament clip. Use reference images to help you decide which best suits your needs.",
  },
  {
    title: "Measure",
    desc: "If you opted for the cable tidy or bag holder, accurately measure the thickness of the table where your clip will slot on to. If you opted for the filament clip, measure the thickness of the filament reel where the clip will attach.",
  },
  {
    title: "Draw Reference",
    desc: "On a blank sheet of paper, use a pencil to faintly draw the edge of the object where your clip will attach — the edge of a table or the edge of a filament reel. Create the drawing at real-life dimensions (scale 1:1) so you get a good perspective on the size of your clip.",
  },
  {
    title: "Draw Outline",
    desc: "Using a black pen, draw an outline of your clip accessory around the reference sketch. Try to create as smooth an outline as possible. If required, draw in pencil first and trace over in pen.",
  },
  {
    title: "Fill in Outline",
    desc: "Once you are happy with your outline, colour it in using a black marker or pen. The filled area will be extruded to create a 3D model — ensure it is thoroughly filled in with no gaps.",
  },
  {
    title: "Scan JPG",
    desc: "Use an eraser to remove the pencil reference lines, leaving only your clip drawing. Scan the drawing or take a top-down photo, and save it as a JPG file.",
  },
];

const PRINT_STEPS = [
  {
    title: "3D Print + Test",
    desc: "Slice your STL file and 3D print the model. Once printed, test your clip and write down key learnings — what did you notice about its flexibility and strength? Did it work as intended? How could it be improved?",
  },
  {
    title: "Make a Unique Clip",
    desc: "Use everything you've learnt in the course and testing phase to brainstorm ideas for a brand-new clip accessory. Then use the same 2D to 3D workflow to design and make your unique idea!",
  },
];

export default function QuickClipsProject({ isPublic = false }) {
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
        <img src={COVER_IMG} alt="Quick Clips" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">2D → 3D Workflow</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Beginner</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Quick Clips</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            Use a simple 2D sketch to 3D model workflow to design and print useful clip accessories — cable tidies, bag holders, filament clips, and beyond.
          </p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> ~2 hours (excl. print time)</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 2D → 3D workflow</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <Section title="Introduction" icon="📋" defaultOpen={true}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In this project, you'll use a simple 2D sketch to 3D model workflow to create a range of useful clip accessories. You'll begin by following instructions and tutorials to design either a <strong>cable tidy</strong>, a <strong>bag holder</strong>, or a <strong>filament clip</strong> before making your own unique clip accessory.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The 2D to 3D workflow is a great way to introduce complete beginners to 3D printing, but it is also a very useful technique for any designer wishing to quickly turn their ideas into physical objects.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Software Needed", icon: "💻", text: "Inkscape (free) + either Tinkercad (recommended for beginners / under 13) or Fusion 360 (over 13). All are free for education and hobbyists." },
            { label: "Supplies", icon: "🖊️", text: "White paper, ruler or measuring calipers, pencils and black felt pens, 2D paper scanner or phone camera, 3D printer and filament." },
            { label: "Duration", icon: "🕐", text: "Approximately 2 hours, excluding 3D printing time." },
            { label: "Skill Level", icon: "⭐", text: "Suitable for complete beginners and experienced designers alike. No prior 3D printing knowledge required." },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-xl bg-muted/40 border border-border/40">
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="font-poppins font-bold text-xs text-foreground mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* How to Use the Course */}
      <Section title="How to Use the Course" icon="🗺️" defaultOpen={true}>
        <div className="space-y-3">
          {[
            "Ensure you have Inkscape software installed, as well as either Tinkercad or Fusion 360. All options are free for education and hobbyists.",
            "Gather your supplies: white paper, ruler or measuring calipers, pencils and black felt pens, a 2D paper scanner or phone camera, and a 3D printer with filament.",
            "With your software installed and supplies gathered, work through each section of the course in order.",
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start text-sm text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <p className="text-xs text-purple-800 leading-relaxed">
            <span className="font-bold">💡 Tip:</span> We recommend <strong>Tinkercad</strong> for beginners and those under 13, and <strong>Fusion 360</strong> for those over 13 who want more advanced tools.
          </p>
        </div>
      </Section>

      {/* Part 1 — Draw Your Clip */}
      <Section title="Part 1 — Draw Your Clip" icon="✏️" defaultOpen={true}>
        <p className="text-sm text-muted-foreground">
          Follow these six steps to draw your clip accessory on paper. The drawing you create will act as the base of your 3D design.
        </p>
        <div className="space-y-3">
          {DRAWING_STEPS.map((s, i) => <StepCard key={i} num={i + 1} title={s.title} desc={s.desc} />)}
        </div>
      </Section>

      {/* Part 2 — 3D Modelling Tutorial */}
      <Section title="Part 2 — Turn Your Sketch into a 3D Model" icon="🖥️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We're now going to turn your sketch into a 3D model by extruding it! First, your JPG sketch needs to be converted into an SVG vector file using <strong>Inkscape</strong>. The SVG can then be uploaded into either Tinkercad or Fusion 360 to be extruded into a 3D printable model.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Select the tutorial that matches your chosen software and follow it through. Both tutorials include the Inkscape step and offer voice-over and text-based instruction options — choose your preferred learning style.
        </p>
        <div className="space-y-3">
          <div className="flex gap-4 p-4 rounded-xl bg-muted/40 border border-border/40 items-start">
            <span className="text-2xl flex-shrink-0">🟢</span>
            <div>
              <p className="font-poppins font-bold text-sm text-foreground mb-1">Tinkercad Tutorial</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                A step-by-step tutorial to design a clip accessory using Inkscape and Tinkercad — with text instructions. Recommended for beginners and those under 13.
              </p>
              <span className="text-xs text-muted-foreground italic">Provided by your teacher or course platform.</span>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-xl bg-muted/40 border border-border/40 items-start">
            <span className="text-2xl flex-shrink-0">🔵</span>
            <div>
              <p className="font-poppins font-bold text-sm text-foreground mb-1">Fusion 360 Tutorial</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                A step-by-step tutorial to design a clip accessory using Inkscape and Fusion 360. Recommended for those over 13 seeking more advanced CAD capabilities.
              </p>
              <span className="text-xs text-muted-foreground italic">Provided by your teacher or course platform.</span>
            </div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-bold">💡 Tip:</span> At the end of the tutorial you should have a 3D printable STL file exported and ready to slice. If you get stuck, ask your teacher or check the text-based instructions.
          </p>
        </div>
      </Section>

      {/* Part 3 — Print, Test & Iterate */}
      <Section title="Part 3 — Print, Test & Make Your Own" icon="🖨️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          At this stage you should have a 3D printable STL file ready. Follow these steps to bring your creation to life — then use what you've learnt to design something entirely your own.
        </p>
        <div className="space-y-3">
          {PRINT_STEPS.map((s, i) => <StepCard key={i} num={i + 1} title={s.title} desc={s.desc} />)}
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-xs text-green-800 leading-relaxed">
            <span className="font-bold">🌟 Challenge:</span> Can you design a clip that solves a real problem in your home, school, or workshop? The 2D to 3D workflow makes it easy to iterate quickly — try at least 2 different designs!
          </p>
        </div>
      </Section>
    </div>
  );
}