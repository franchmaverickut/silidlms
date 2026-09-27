import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Clock, Layers, Star, BookOpen
} from "lucide-react";
import { Card } from "@/components/ui/card";
import TechCard from "@/components/printingtech/TechCard";
import TechQuiz from "@/components/printingtech/TechQuiz";
import { TECHNOLOGIES } from "@/components/printingtech/technologiesData";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/e4eff125d_image.png";

function Section({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="overflow-hidden border-border/60 shadow-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          {typeof icon === "string" ? <span className="text-base">{icon}</span> : icon}
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

export default function PrintingTechnologiesProject({ isPublic = false }) {
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
        <img src={COVER_IMG} alt="3D Printing Technologies" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-600 text-white">Course</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">Mini Courses</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">All Levels</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">3D Printing Technologies</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            Learn about 6 key types of 3D printing technologies — how they work, materials, applications, benefits and limitations — with diagrams, videos and a final quiz.
          </p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> 1–2 hours</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 6 technologies</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <Section title="Introduction" icon={<BookOpen size={18} className="text-pink-600" />} defaultOpen={true}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In this resource, you will learn about 6 key types of 3D printing technologies. Each technology includes its own section with text information about how it works, materials, applications, benefits and limitations. Diagrams and external links to 3DNatives' videos are also provided so you can see the technology in action. Exploring this resource should take around 1–2 hours and there is an assessment quiz at the end.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Format", icon: "📖", text: "6 self-contained technology modules, each with how-it-works text, a diagram, video, and collapsible info sections." },
            { label: "Level", icon: "⭐", text: "Suitable for all levels — no prior 3D printing experience required." },
            { label: "Duration", icon: "🕐", text: "Approximately 1–2 hours to read all modules and complete the quiz." },
            { label: "Quiz", icon: "🧠", text: "12 scenario-based questions testing which technology fits each real-world application." },
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

      {/* Technologies */}
      {TECHNOLOGIES.map((tech) => (
        <Section
          key={tech.number}
          title={`${tech.number}. ${tech.name.split(" — ")[0]}`}
          icon={
            <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {tech.number}
            </span>
          }
          defaultOpen={false}
        >
          <TechCard tech={tech} />
        </Section>
      ))}

      {/* Quiz */}
      <Section title="Quiz" icon="🧠" defaultOpen={false}>
        <TechQuiz />
      </Section>

      {/* Back to top */}
      <div className="flex justify-center pt-2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronUp size={16} /> Back to top
        </button>
      </div>
    </div>
  );
}