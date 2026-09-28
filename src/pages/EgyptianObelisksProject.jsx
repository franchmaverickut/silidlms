import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Download,
  ExternalLink, Clock, Layers, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/db3ca39d4_completedegyptianobelisks.jpg";
const EXPLAINER_VIDEO = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/851c068d1_EgyptianObelisks-ExplainerVideo.mp4";
const TINKERCAD_VIDEO = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/b7ed59615_Obelisk-TinkercadTutorial.mp4";
const WORKSHEET_URL = "https://media.base44.com/files/public/69d386ad9523e2ce04536574/51b6b1bc0_Deciphering-Hieroglyphics.pdf";
const TINKERCAD_MODEL_URL = "https://bit.ly/2IeTTmb";

const CHALLENGE_IMAGES = {
  1: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/df006a014_egyptian-obelisks-challenge-1.jpg",
  2: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/2faf2e9ae_egyptian-obelisks-challenge-2.jpg",
  3: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9afca777c_egyptian-obelisks-challenge-3.jpg",
  4: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/63680b966_egyptian-obelisks-challenge-4.jpg",
};

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

function ChallengeCard({ num, title, desc, image }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      {image && (
        <div className="bg-muted/20 p-4 flex items-center justify-center">
          <img src={image} alt={title} className="max-h-52 w-auto object-contain rounded-lg" />
        </div>
      )}
      <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
        <span className="w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
        <span className="font-poppins font-bold text-sm text-foreground">{title}</span>
      </div>
      <div className="p-5">
        <p className="text-sm text-foreground/80 leading-relaxed">{desc}</p>
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
          <p className="text-white/80 text-sm md:text-base max-w-xl">Design and make a personalised Egyptian obelisk, inscribed with hieroglyphics.</p>
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

      {/* Introduction / Explainer video */}
      <Card className="p-6 border-border/60 shadow-sm space-y-4">
        <h2 className="font-poppins font-bold text-lg text-foreground">Introduction</h2>
        <p className="text-sm text-foreground/80 leading-relaxed">
          In this project, you'll be designing and making a personalised Egyptian obelisk, inscribed with hieroglyphics. Watch the intro video below and browse through the project sections to learn more about the journey.
        </p>
        <div className="rounded-2xl overflow-hidden border border-border/60 bg-black">
          <video src={EXPLAINER_VIDEO} controls className="w-full max-h-96" />
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          In this section, you'll be learning more about hieroglyphics before bringing your personalised obelisk to life with 3D design and 3D printing!
        </p>
      </Card>

      {/* Step 1: Hieroglyphic Alphabet */}
      <Section title="STEP 1: Hieroglyphic Alphabet" icon="✍️" defaultOpen={true}>
        <p className="text-sm text-foreground/80 leading-relaxed">
          In this activity, you'll be using the simplified hieroglyphic alphabet to decipher a series of hieroglyphic words. Download the worksheet and use it to decipher the examples!
        </p>
        <a href={WORKSHEET_URL} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-xl gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm">
            <Download size={14} /> Download Worksheet
          </Button>
        </a>
      </Section>

      {/* Step 2: Word Brainstorm */}
      <Section title="STEP 2: Word Brainstorm" icon="💡" defaultOpen={false}>
        <p className="text-sm text-foreground/80 leading-relaxed">
          We now need to figure out a word to inscribe into your obelisk. Using online research, brainstorm as many words as you can that relate to Ancient Egypt. Then select one to take forward!
        </p>
        <div className="bg-muted/40 border border-border/40 rounded-xl p-4">
          <p className="font-poppins font-bold text-xs text-foreground mb-2">Need inspiration? Try words like:</p>
          <div className="flex flex-wrap gap-2">
            {["Egypt", "History", "Pharaoh", "Temple", "Pyramid", "Nile", "Papyrus", "Tomb", "Sphinx", "Scarab", "Ankh", "Ra"].map(w => (
              <span key={w} className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">{w}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* Step 3: Tinkercad Tutorial */}
      <Section title="STEP 3 - Option 1: Tinkercad Tutorial" icon="🖥️" defaultOpen={false}>
        <p className="text-sm text-foreground/80 leading-relaxed">
          In this tutorial you will learn how to inscribe your chosen word onto an Egyptian obelisk in Tinkercad. During the tutorial, you will require access to a Tinkercad model of a hieroglyphics alphabet.
        </p>
        <div className="rounded-2xl overflow-hidden border border-border/60 bg-black">
          <video src={TINKERCAD_VIDEO} controls className="w-full max-h-96" />
        </div>
        <a href={TINKERCAD_MODEL_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="rounded-xl gap-2 border-amber-300 text-amber-700 hover:bg-amber-50 text-sm">
            <ExternalLink size={14} /> Open Hieroglyphics Alphabet Model
          </Button>
        </a>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Once you have completed your design, send it to the 3D printer! If you'd like to extend this project, check out some of the extension challenges below.
        </p>
      </Section>

      {/* Extension Challenges */}
      <Section title="Extension Challenges" icon="🔁" defaultOpen={false}>
        <p className="text-sm text-foreground/80 leading-relaxed">If you want to take your hieroglyphic designs to the next level, check out some of these extension challenges!</p>
        <div className="space-y-4">
          <ChallengeCard num="1" title="Other Ancient Egyptian Objects" image={CHALLENGE_IMAGES[1]} desc="In addition to obelisks, hieroglyphics were used on many different things. See if you can identify some of these and create 3D models of other objects or structures." />
          <ChallengeCard num="2" title="Personalised Gift" image={CHALLENGE_IMAGES[2]} desc="Hieroglyphics are also great to inscribe on personalised gifts. Why not create a key chain, storage box or anything else a friend or family member might enjoy." />
          <ChallengeCard num="3" title="Tactile Learning Model" image={CHALLENGE_IMAGES[3]} desc="With 3D printing, we have an amazing opportunity to support people with visual impairments. This could involve creating a tactile graphic (or a tactile story) about Ancient Egypt. Consider using elements such as braille and raised line graphics." />
          <ChallengeCard num="4" title="Hieroglyphic Construction Kit" image={CHALLENGE_IMAGES[4]} desc="Use the hieroglyphic alphabet set in this project to create a construction kit that allows people to form their own words. In addition to the hieroglyphics themselves, consider designing a storage solution or a base where words can be created." />
        </div>
      </Section>

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