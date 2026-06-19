import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Download,
  ExternalLink, Clock, Layers, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/2168fd833_EgyptianObelisks.png";
const WORKSHEET_URL = "https://weareprintlab.com/wp-content/uploads/2023/11/Deciphering-Hieroglyphics.pdf";
const TINKERCAD_MODEL_URL = "https://bit.ly/2IeTTmb";

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

function ChallengeCard({ num, title, desc, items, itemLabel }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
        <span className="w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
        <span className="font-poppins font-bold text-sm text-foreground">{title}</span>
      </div>
      <div className="p-5 space-y-2">
        <p className="text-sm text-foreground/80 leading-relaxed">{desc}</p>
        {items && (
          <div className="bg-muted/40 border border-border/40 rounded-xl p-3 space-y-1">
            {itemLabel && <p className="font-poppins font-bold text-xs text-foreground mb-1">{itemLabel}</p>}
            {items.map((c, i) => (
              <div key={i} className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-amber-500 font-bold flex-shrink-0">•</span> {c}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EgyptianObelisksProject({ isPublic = false }) {
  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-6">
      {!isPublic && (
        <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft size={16} /> Back to Maker Lessons
        </Link>
      )}

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[300px] shadow-xl">
        <img src={COVER_IMG} alt="Egyptian Obelisks" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-600 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">STEM</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Basic</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Egyptian Obelisks</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">Design and 3D print a personalised Egyptian obelisk inscribed with hieroglyphics.</p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> Short skill-building session</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 1 model + extension challenges</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Overview */}
      <Section title="Project Overview" icon="📋" defaultOpen={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard icon="✅" label="Criteria & Constraints" text="The obelisk must be a 3D printable model with a tapered four-sided structure, a pyramid-shaped top, and a personalised hieroglyphic inscription. The design should be simple enough to print but detailed enough to show the chosen word clearly." />
          <InfoCard icon="⭐" label="Difficulty" text="Basic — suitable for learners with foundational skills in 3D design and 3D printing." />
          <InfoCard icon="🕐" label="Project Length" text="This is a short skill-building project focused on learning about hieroglyphics and creating a personalised 3D printed obelisk." />
          <InfoCard icon="📁" label="Project Portfolio" text="A template portfolio is not required. Learners may still document their work by saving screenshots, photos, and notes about their chosen hieroglyphic word." />
        </div>
      </Section>

      {/* Introduction */}
      <Section title="Introduction" icon="🏺" defaultOpen={false}>
        <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
          <p><strong>Hieroglyphics</strong> were a formal written language of ancient Egypt. Although Egyptian in origin, the word hieroglyphics comes from Greek and means <em>holy writings</em>.</p>
          <p>Hieroglyphics were mostly used for religious purposes, such as worshipping gods and telling stories about Egyptian beliefs. They were written on different materials, including <strong>papyrus</strong>, tomb walls, temples, monuments, and obelisks.</p>
          <p>Papyrus was one of the earliest forms of paper and was invented around 5,000 years ago. It was made from the pith of the papyrus plant.</p>
          <p>Hieroglyphics were also carved into the inner walls of tombs and temples. Sacred texts were created to help guide the deceased into the afterlife. In addition, hieroglyphics were placed on monuments called <strong>obelisks</strong>, often found at the entrance of temples.</p>
          <p>An obelisk is a tall, four-sided structure with a <strong>tapered design</strong>. This means the base is wider than the top. A pyramid shape is usually placed at the top of the obelisk.</p>
          <p>In this project, you will use a simplified hieroglyphic alphabet to design and 3D print your own personalised Egyptian obelisk.</p>
        </div>
      </Section>

      {/* Design Considerations */}
      <Section title="Design Considerations" icon="🔬" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">Before designing your obelisk, think about the shape, inscription, readability, and 3D printing process.</p>
        <div className="space-y-3">
          {[
            { icon: "🔷", title: "Obelisk Shape", desc: "The obelisk should have four sides and a tapered body. The base should be wider, while the top should become narrower." },
            { icon: "🔺", title: "Pyramid Top", desc: "A pyramid-shaped cap should be added to the top of the obelisk. This helps make the model look like a traditional Egyptian obelisk." },
            { icon: "✍️", title: "Hieroglyphic Inscription", desc: "Choose a word related to Ancient Egypt or a personal word you want to inscribe. Convert the letters into simplified hieroglyphics." },
            { icon: "👁️", title: "Readability", desc: "The hieroglyphics should be large enough to see clearly after printing. Avoid making the symbols too small or too shallow." },
            { icon: "📐", title: "Raised or Engraved Design", desc: "You may choose to make the hieroglyphics raised from the surface or engraved into the obelisk. Raised details may be easier to see, while engraved details can look more carved." },
            { icon: "🖨️", title: "3D Printing Orientation", desc: "Think about how the obelisk will sit on the print bed. A flat base will help the model print more successfully." },
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

      {/* Step 1: Hieroglyphic Alphabet */}
      <Section title="STEP 1: Hieroglyphic Alphabet" icon="✍️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Use the simplified hieroglyphic alphabet to decipher a series of hieroglyphic words. This activity helps you understand how symbols can represent letters and words.
        </p>
        <div className="space-y-3">
          {[
            "Download the worksheet.",
            "Study the simplified hieroglyphic alphabet.",
            "Decipher the example hieroglyphic words.",
            "Practice matching letters to symbols.",
            "Use this knowledge to prepare your own inscription.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 py-1">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
        <a href={WORKSHEET_URL} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-xl gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm">
            <Download size={14} /> Download Worksheet
          </Button>
        </a>
      </Section>

      {/* Step 2: Word Brainstorm */}
      <Section title="STEP 2: Word Brainstorm" icon="💡" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Choose a word to inscribe on your obelisk. Use online research to brainstorm words related to Ancient Egypt.
        </p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4">
          <p className="font-poppins font-bold text-xs text-foreground mb-2">Possible word ideas:</p>
          <div className="flex flex-wrap gap-2">
            {["Egypt", "History", "Pharaoh", "Temple", "Pyramid", "Nile", "Papyrus", "Tomb", "Sphinx", "Scarab", "Ankh", "Ra"].map(w => (
              <span key={w} className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">{w}</span>
            ))}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-800">After brainstorming, choose <strong>one word</strong> to take forward into your design.</p>
        </div>
      </Section>

      {/* Step 3: Tinkercad Tutorial */}
      <Section title="STEP 3: Tinkercad Tutorial — Build the Obelisk Model" icon="🖥️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Follow the Tinkercad tutorial to design your Egyptian obelisk and inscribe your chosen word using hieroglyphics.
        </p>
        <div className="space-y-3">
          {[
            "Open Tinkercad.",
            "Create a rectangular base for the obelisk.",
            "Build a tall four-sided tapered body.",
            "Add a pyramid-shaped top.",
            "Choose your word for the inscription.",
            "Use the hieroglyphic alphabet model to find the correct symbols.",
            "Place the symbols vertically or horizontally on the obelisk.",
            "Decide whether the symbols will be raised or engraved.",
            "Group the parts into one complete model.",
            "Export the design as an STL file for 3D printing.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 py-1">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
        <a href={TINKERCAD_MODEL_URL} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-xl gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm">
            <ExternalLink size={14} /> Open Hieroglyphics Alphabet Model
          </Button>
        </a>
      </Section>

      {/* 3D Printing */}
      <Section title="3D Printing" icon="🖨️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">Before printing your obelisk, check the following:</p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          {[
            "The base is flat and stable",
            "The obelisk is not too thin",
            "The pyramid top is properly attached",
            "The hieroglyphics are clear and visible",
            "The symbols are large enough to print",
            "The model is properly oriented on the print bed",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-green-600 font-bold flex-shrink-0">✓</span> {item}
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-blue-800 leading-relaxed">After printing, check if the hieroglyphics are readable and if the obelisk stands upright.</p>
        </div>
      </Section>

      {/* Product Analysis */}
      <Section title="Product Analysis & Testing" icon="📊" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">After 3D printing your obelisk, evaluate your final model.</p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
          <p className="font-poppins font-bold text-xs text-foreground mb-1">Record the following:</p>
          {[
            "Did the obelisk print successfully?",
            "Does it stand upright?",
            "Are the hieroglyphics visible?",
            "Is the inscription readable?",
            "Is the model strong enough?",
            "Would raised or engraved symbols work better?",
            "What would you improve next time?",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-amber-500 font-bold flex-shrink-0">•</span> {item}
            </div>
          ))}
        </div>
      </Section>

      {/* Extension Challenges */}
      <Section title="Extension Challenges" icon="🔁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">If you want to take your hieroglyphic design to the next level, try one or more of these challenges.</p>
        <div className="space-y-4">
          <ChallengeCard num="1" title="Other Ancient Egyptian Objects" desc="Hieroglyphics were used on many different objects and structures. Identify some examples and create your own 3D models." items={["Pyramid", "Temple wall", "Tomb tablet", "Sarcophagus label", "Monument plaque", "Papyrus-style tablet"]} itemLabel="Possible designs:" />
          <ChallengeCard num="2" title="Personalised Gift" desc="Use hieroglyphics to design a personalised object for a friend or family member." items={["Keychain", "Name tag", "Storage box", "Bookmark", "Desk plaque", "Pendant"]} itemLabel="Possible designs:" />
          <ChallengeCard num="3" title="Tactile Learning Model" desc="Use 3D printing to support people with visual impairments by creating tactile graphics or tactile stories about Ancient Egypt." items={["Raised hieroglyphics", "Braille labels", "Raised line drawings", "Touch-based storytelling panels", "Simple texture guides"]} itemLabel="Consider including:" />
          <ChallengeCard num="4" title="Hieroglyphic Construction Kit" desc="Create a construction kit that allows people to form their own words using hieroglyphic symbols." items={["Individual symbol tiles", "A storage box", "A baseboard for arranging words", "Snap-fit or magnetic-style pieces", "Labelled compartments"]} itemLabel="Consider designing:" />
        </div>
      </Section>

      {/* Optional Documentation */}
      <Section title="Optional Documentation Guide" icon="📁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">Although this project does not require a full portfolio, you may still document your work.</p>
        <div className="space-y-3">
          {[
            { slide: "Title", items: ["Egyptian Obelisk Project"] },
            { slide: "Research", items: ["Write a short paragraph about hieroglyphics and obelisks."] },
            { slide: "Chosen Word", items: ["Show the word you selected and explain why you chose it."] },
            { slide: "Hieroglyphic Translation", items: ["Show how your chosen word is represented using the simplified hieroglyphic alphabet."] },
            { slide: "CAD Design", items: ["Include screenshots of your obelisk model in Tinkercad."] },
            { slide: "3D Print", items: ["Add photos of the printed obelisk."] },
            { slide: "Final Reflection", items: ["Explain what worked well, what was difficult, and what you would improve."] },
          ].map((section, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/40">
              <p className="font-poppins font-bold text-xs text-amber-700 mb-2">{section.slide}</p>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="text-amber-400 flex-shrink-0">→</span> {item}
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
          <Download size={15} className="text-amber-600" /> Downloads & Resources
        </h3>
        <div className="space-y-2">
          {[
            { label: "Deciphering Hieroglyphics Worksheet", desc: "Activity worksheet to practice the hieroglyphic alphabet", url: WORKSHEET_URL },
            { label: "Hieroglyphics Alphabet Tinkercad Model", desc: "3D model of hieroglyphic symbols for use in Tinkercad", url: TINKERCAD_MODEL_URL },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-muted/40 border border-border/40">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Download size={15} className="text-amber-600" />
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
          <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-muted/40 border border-border/40">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Download size={15} className="text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">Tinkercad Obelisk Tutorial</p>
              <p className="text-xs text-muted-foreground truncate">Step-by-step guide to design and inscribe your personalised obelisk</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs flex-shrink-0" disabled>
              <ExternalLink size={12} /> Coming Soon
            </Button>
          </div>
        </div>
      </Card>

      {/* Key Learning */}
      <Card className="p-5 border-amber-200 bg-amber-50/50 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-2 text-amber-800">🔑 Key Learning</h3>
        <p className="text-xs text-amber-700 leading-relaxed">
          This project teaches learners about ancient Egyptian hieroglyphics, obelisk design, symbolic communication, CAD modelling, 3D printing, inscription design, and creating personalised cultural artefacts.
        </p>
      </Card>
    </div>
  );
}