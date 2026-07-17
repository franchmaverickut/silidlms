import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Clock, Layers, Star, Box, MousePointer2, Ruler, Group, Copy, Hammer, Trophy
} from "lucide-react";
import { Card } from "@/components/ui/card";

const BASE = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/";
const IMG_COVER = BASE + "161f8ce2e_cover.png";
const IMG_INTERFACE = BASE + "207e12cf8_interface.png";
const IMG_SHAPES = BASE + "6418d4232_shapes.png";
const IMG_HANDLES = BASE + "800caf2b9_handles.png";
const IMG_PRECISION = BASE + "949428e40_precision.png";
const IMG_HOLE = BASE + "903e80702_hole.png";
const IMG_FENCE = BASE + "f23dd8003_fence.png";
const IMG_CHAIR = BASE + "a51b543eb_chair.png";
const IMG_KEYCHAIN = BASE + "aa5e47486_keychain.png";
const IMG_PHONESTAND = BASE + "236aa14d0_phonestand.png";
const IMG_ORGANIZER = BASE + "8501d659a_organizer.png";

const TINKERCAD_URL = "https://www.tinkercad.com";

function Section({ title, icon, children, defaultOpen = true, accent = "text-violet-600" }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="overflow-hidden border-border/60 shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          {icon}
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

function DiagramCard({ img, title, desc }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm bg-white">
      <div className="p-4 bg-muted/20 border-b border-border/40">
        <p className="font-poppins font-bold text-sm text-foreground">{title}</p>
      </div>
      <div className="p-4 space-y-3">
        <img src={img} alt={title} className="w-full rounded-xl object-contain max-h-72 bg-white" />
        {desc && <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>}
      </div>
    </div>
  );
}

function MiniProject({ img, title, desc }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-5 py-3 bg-violet-50 border-b border-border/40">
        <Hammer size={15} className="text-violet-600" />
        <span className="font-poppins font-bold text-sm text-foreground">{title}</span>
      </div>
      <div className="p-5 space-y-3">
        <img src={img} alt={title} className="w-full rounded-xl object-contain max-h-56 bg-white" />
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function TinkercadFundamentalsProject({ isPublic = false }) {
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
        <img src={IMG_COVER} alt="Tinkercad Fundamentals" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-600 text-white">Guide</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">3D Printing</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Beginner</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Tinkercad Fundamentals</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">Learn the core tools of Tinkercad — from basic shapes and precision controls to grouping, duplication, and building real projects.</p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> Self-paced</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 11 visual guides</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Overview */}
      <Section title="Guide Overview" icon={<Box size={18} className="text-violet-600" />} defaultOpen={true}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This guide walks you through everything you need to start 3D modeling in Tinkercad. Work through each section in order, or jump straight to a specific tool. Every concept is paired with a clear visual reference so you can see exactly what each tool does.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Who is this for", icon: "👤", text: "Beginners with no prior 3D modeling experience, or anyone who wants a visual refresher on Tinkercad's core tools." },
            { label: "What you'll need", icon: "🧰", text: "A free Tinkercad account and a web browser. No software installation required." },
            { label: "How it works", icon: "📖", text: "Each section introduces a concept with a labeled diagram and a short explanation, then suggests a quick build to practice." },
            { label: "By the end", icon: "🏆", text: "You'll be able to navigate the Tinkercad screen, manipulate shapes precisely, and combine parts into complete printable models." },
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
        <a href={TINKERCAD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors">
          Open Tinkercad →
        </a>
      </Section>

      {/* Interface */}
      <Section title="The Tinkercad Screen at a Glance" icon={<Layers size={18} className="text-violet-600" />} defaultOpen={false}>
        <DiagramCard
          img={IMG_INTERFACE}
          title="The Tinkercad Screen at a Glance"
          desc="The top toolbar holds your editing and history tools (copy, undo, group). The workplane in the center is where you build your model. The shapes panel on the right is where you drag primitive shapes onto the workplane. Use the ViewCube and Nav tool (bottom-left) to rotate your view."
        />
      </Section>

      {/* Basic Shapes */}
      <Section title="Basic Shapes" icon={<Box size={18} className="text-violet-600" />} defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every Tinkercad model is built from these six primitives. Drag any shape from the shapes panel onto the workplane, then resize, rotate, and combine them to create complex objects.
        </p>
        <DiagramCard
          img={IMG_SHAPES}
          title="Box · Cylinder · Sphere · Roof · Cone · Torus"
          desc="Box for solid bases, Cylinder for posts and holes, Sphere for rounded details, Roof (prism) for angled faces, Cone for points, and Torus for rings. Combine them with grouping to build almost anything."
        />
      </Section>

      {/* Handles */}
      <Section title="Move · Resize · Rotate · Elevate" icon={<MousePointer2 size={18} className="text-violet-600" />} defaultOpen={false}>
        <DiagramCard
          img={IMG_HANDLES}
          title="The Selection Handles"
          desc="When you click a shape, Tinkercad shows handles around it. Corner and edge handles resize width and length. The top handle resizes height. The black triangle above raises or lowers the object off the workplane. Curved rotation arrows let you spin the shape on the X, Y, or Z axis — drag them or type an exact angle."
        />
      </Section>

      {/* Precision */}
      <Section title="Precision Tools: Ruler, Align & Mirror" icon={<Ruler size={18} className="text-violet-600" />} defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Once you can move and resize shapes, use these three tools to work with exact dimensions and tidy alignment.
        </p>
        <DiagramCard
          img={IMG_PRECISION}
          title="Ruler · Align · Mirror"
          desc="The Ruler lets you type exact millimetre sizes instead of dragging. Align lines up the edges or centers of selected objects. Mirror flips a shape across an axis — useful for creating symmetrical pairs."
        />
      </Section>

      {/* Grouping & Cutouts */}
      <Section title="Grouping & Cutouts (Holes)" icon={<Group size={18} className="text-violet-600" />} defaultOpen={false}>
        <DiagramCard
          img={IMG_HOLE}
          title="Solid + Hole → Group → Clean Cutout"
          desc="Any shape can be turned into a 'hole' instead of a solid. Place a hole shape overlapping a solid, select both, and press Group — Tinkercad subtracts the hole, leaving a clean cutout. This is how you create key-ring holes, slots, and hollow cavities."
        />
      </Section>

      {/* Duplicate & Repeat */}
      <Section title="Duplicate & Repeat" icon={<Copy size={18} className="text-violet-600" />} defaultOpen={false}>
        <DiagramCard
          img={IMG_FENCE}
          title="One Post Becomes an Evenly Spaced Fence"
          desc="Tinkercad's Duplicate (Ctrl/Cmd+D) remembers the offset of your last move. Duplicate once, move the copy to where you want the next post, then keep pressing Duplicate — Tinkercad repeats the same spacing automatically, creating a perfectly even row or grid."
        />
      </Section>

      {/* Combine to Build */}
      <Section title="Combine Parts into One Model" icon={<Group size={18} className="text-violet-600" />} defaultOpen={false}>
        <DiagramCard
          img={IMG_CHAIR}
          title="Group Seat + Backrest + Legs → One Chair"
          desc="Position each part where you want it, select them all together, then press Group. Grouping merges the separate shapes into a single solid model that you can move, resize, and export as one printable object."
        />
      </Section>

      {/* Mini Projects */}
      <Section title="Practice Mini-Projects" icon={<Hammer size={18} className="text-violet-600" />} defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Try these three builds to put the fundamentals together. Each one uses a different combination of the tools you've just learned.
        </p>
        <div className="space-y-4">
          <MiniProject
            img={IMG_KEYCHAIN}
            title="Project: Name Keychain"
            desc="Combine a flat base, raised 3D text of your name, and a hole cylinder (grouped) for the key-ring loop. Practice: basic shapes, text, holes, and grouping."
          />
          <MiniProject
            img={IMG_PHONESTAND}
            title="Project: Phone Stand"
            desc="Stack a base, an angled support, and a front lip. Practice: resize, rotate, elevate, and aligning parts so the phone leans back at a comfortable angle."
          />
        </div>
      </Section>

      {/* Final Challenge */}
      <Section title="Final Challenge: Desk Organizer" icon={<Trophy size={18} className="text-violet-600" />} defaultOpen={false}>
        <DiagramCard
          img={IMG_ORGANIZER}
          title="Desk Organizer — Compartments, Tray & Phone Slot"
          desc="Bring it all together: build a base tray, add compartment walls, and create a vertical phone slot. Use duplicate & repeat for evenly spaced dividers, holes for open compartments, and grouping to merge everything into one printable organizer. Export as an STL and send it to your 3D printer!"
        />
      </Section>
    </div>
  );
}