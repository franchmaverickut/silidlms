import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Clock, Layers, Star,
  ExternalLink, BookOpen, Trophy, Lightbulb, Play
} from "lucide-react";
import { Card } from "@/components/ui/card";
import TutorialCard from "@/components/tinkercad/TutorialCard";
import CourseQuiz from "@/components/tinkercad/CourseQuiz";
import { TUTORIALS } from "@/components/tinkercad/tutorialsData";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/161f8ce2e_cover.png";
const TINKERCAD_URL = "https://www.tinkercad.com";
const BONUS_VIDEO = "https://www.youtube.com/embed/dH7670maT8g";

function Section({ title, icon, children, defaultOpen = true }) {
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
        <img src={COVER_IMG} alt="Tinkercad Fundamentals" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-600 text-white">Course</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">3D CAD</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Beginner</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Tinkercad Fundamentals</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            Intro to 3D CAD with Tinkercad — learn the fundamentals of 3D computer-aided design through hands-on video tutorials.
          </p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> Self-paced</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 11 tutorials</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Course Intro */}
      <Section title="Course Introduction" icon={<BookOpen size={18} className="text-violet-600" />} defaultOpen={true}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In this short online course, you'll learn the fundamentals of 3D CAD (computer-aided design) using Tinkercad, a free and beginner-friendly 3D design tool. Through a series of hands-on tutorials, you'll learn how to navigate the workspace and use key modelling tools to create a range of 3D printable designs.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Before you begin, make sure you have created a free Tinkercad account and are logged in. Each tutorial includes a link to a starting model in Tinkercad, which you'll be guided to open as you follow along with the video. Work through each tutorial to build the designs yourself, then complete the quiz at the end of the course to test your knowledge.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Who is this for", icon: "👤", text: "Beginners with no prior 3D modeling experience, or anyone who wants a structured intro to 3D CAD." },
            { label: "What you'll need", icon: "🧰", text: "A free Tinkercad account and a web browser. No software installation required." },
            { label: "How it works", icon: "📖", text: "Watch each video tutorial, follow along in Tinkercad using the starting model links, then check the Key Takeaways." },
            { label: "By the end", icon: "🏆", text: "You'll be able to navigate, model, and export 3D printable designs — and test your knowledge with the final quiz." },
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
          <ExternalLink size={15} /> Open Tinkercad
        </a>
      </Section>

      {/* Tutorials */}
      {TUTORIALS.map((t) => (
        <Section
          key={t.num}
          title={`${t.num}. ${t.title}`}
          icon={
            <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {t.num}
            </span>
          }
          defaultOpen={false}
        >
          <TutorialCard tutorial={t} />
        </Section>
      ))}

      {/* Bonus Tips */}
      <Section title="Bonus: 35 Rapid-Fire Tips" icon={<Lightbulb size={18} className="text-amber-500" />} defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This optional bonus section includes 35 rapid-fire Tinkercad tips to help you design faster and more efficiently. Watch the video below to discover some additional tools, shortcuts and techniques, then move on to the final section to complete the quiz and earn your certificate.
        </p>
        <div className="rounded-xl overflow-hidden border border-border/40 shadow-sm" style={{ aspectRatio: "16 / 9" }}>
          <iframe
            src={BONUS_VIDEO.replace("youtube.com/embed", "youtube-nocookie.com/embed")}
            title="35 Rapid-Fire Tinkercad Tips"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </Section>

      {/* Quiz */}
      <Section title="Final Quiz" icon={<Trophy size={18} className="text-violet-600" />} defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Complete the quiz below to test your knowledge of Tinkercad fundamentals.
        </p>
        <CourseQuiz />
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