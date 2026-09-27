import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Clock, Layers, Star,
  BookOpen, Trophy
} from "lucide-react";
import { Card } from "@/components/ui/card";
import IndustryLessonCard from "@/components/printingindustry/IndustryLessonCard";
import IndustryQuiz from "@/components/printingindustry/IndustryQuiz";
import { LESSONS } from "@/components/printingindustry/industryData";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/3257ecd04_image.png";

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

export default function PrintingIndustryProject({ isPublic = false }) {
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
        <img src={COVER_IMG} alt="The 3D Printing Industry" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white">Course</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">Industry</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">All Levels</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">The 3D Printing Industry</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            A bitesize snapshot of key aspects of the 3D printing industry — from rapid prototyping to sustainability and global access.
          </p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> ~30 minutes</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 8 lessons</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Course Intro */}
      <Section title="Course Introduction" icon={<BookOpen size={18} className="text-indigo-600" />} defaultOpen={true}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In this short online course, you'll learn about the key aspects of the 3D printing industry — from the underlying technology and rapid prototyping to local and on-demand manufacturing, customisation, sustainability, access, and complexity. Work through each video lesson, then complete the quiz at the end to test your knowledge.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Who is this for", icon: "👤", text: "Anyone curious about the 3D printing industry — no prior knowledge required." },
            { label: "What you'll need", icon: "🧰", text: "A device with internet access to watch the video lessons." },
            { label: "How it works", icon: "📖", text: "Watch each of the 8 short video lessons, then review the Key Takeaways for each." },
            { label: "By the end", icon: "🏆", text: "You'll understand the forces shaping the 3D printing industry — and test your knowledge with the final quiz." },
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

      {/* Lessons */}
      {LESSONS.map((lesson) => (
        <Section
          key={lesson.num}
          title={`${lesson.num}. ${lesson.title}`}
          icon={
            <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {lesson.num}
            </span>
          }
          defaultOpen={false}
        >
          <IndustryLessonCard lesson={lesson} />
        </Section>
      ))}

      {/* Quiz */}
      <Section title="Final Quiz" icon={<Trophy size={18} className="text-indigo-600" />} defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Complete the quiz below to test your knowledge of the 3D printing industry.
        </p>
        <IndustryQuiz />
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