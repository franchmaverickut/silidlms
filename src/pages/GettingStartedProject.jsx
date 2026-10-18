import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Clock, Layers, GraduationCap,
  BookOpen, Trophy, Lightbulb, ExternalLink, Play, Monitor, Wrench,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { COURSE, LESSONS, OPTIONAL_EXTRAS } from "@/data/gettingStartedData";
import GettingStartedQuiz from "@/components/gettingstarted/GettingStartedQuiz";

function Section({ title, icon, children, defaultOpen = true, accent = "orange" }) {
  const [open, setOpen] = useState(defaultOpen);
  const ring = {
    orange: "border-orange-200 bg-orange-50/40",
    blue: "border-blue-200 bg-blue-50/40",
    purple: "border-purple-200 bg-purple-50/40",
    green: "border-green-200 bg-green-50/40",
  }[accent];
  return (
    <Card className={`overflow-hidden border ${ring} shadow-sm`}>
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
        <div className="px-6 pb-6 space-y-4 border-t border-border/40 pt-4">{children}</div>
      )}
    </Card>
  );
}

function VideoPlayer({ src, title }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-border/60 bg-black shadow-sm">
      <video controls preload="metadata" className="w-full" title={title}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

function Takeaways({ items }) {
  return (
    <div className="space-y-2">
      <p className="font-poppins font-bold text-sm text-foreground">Key Takeaways</p>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
            <span className="text-orange-500 font-bold flex-shrink-0 mt-0.5">•</span> {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThingsToTry({ items }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/60 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-amber-50 transition-colors"
      >
        <span className="flex items-center gap-2 font-poppins font-bold text-sm text-amber-900">
          <Lightbulb size={15} /> Things to Try
        </span>
        {open ? <ChevronUp size={16} className="text-amber-700" /> : <ChevronDown size={16} className="text-amber-700" />}
      </button>
      {open && (
        <ul className="px-4 pb-4 space-y-2">
          {items.map((t, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-amber-900/90 leading-relaxed">
              <span className="text-amber-600 font-bold flex-shrink-0 mt-0.5">•</span> {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function GettingStartedProject({ isPublic = false }) {
  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-6">
      {!isPublic && (
        <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft size={16} /> Back to Maker Lessons
        </Link>
      )}

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[300px] shadow-xl bg-gradient-to-br from-orange-500 to-amber-600">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">Course</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">3D Printing</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Beginner</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">{COURSE.title}</h1>
          <p className="text-white/90 text-sm md:text-base max-w-xl">{COURSE.tagline}</p>
          <div className="flex flex-wrap gap-5 text-white/90 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> {COURSE.length}</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 5 lessons + 4 extras</span>
            <span className="flex items-center gap-1.5"><GraduationCap size={15} /> All ages</span>
          </div>
        </div>
      </div>

      {/* Course Introduction */}
      <Section title="Course Introduction" icon={<BookOpen size={18} className="text-orange-600" />} defaultOpen={true}>
        <p className="text-sm text-foreground/80 leading-relaxed">{COURSE.description}</p>
        <p className="text-sm text-foreground/80 leading-relaxed">{COURSE.note}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border/40 p-4 bg-white">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap size={16} className="text-orange-600" />
              <p className="font-poppins font-bold text-xs text-foreground">Course Difficulty</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{COURSE.difficultyNote}</p>
          </div>
          <div className="rounded-xl border border-border/40 p-4 bg-white">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={16} className="text-blue-600" />
              <p className="font-poppins font-bold text-xs text-foreground">Course Length</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{COURSE.lengthNote}</p>
          </div>
          <div className="rounded-xl border border-border/40 p-4 bg-white">
            <div className="flex items-center gap-2 mb-1">
              <Monitor size={16} className="text-purple-600" />
              <p className="font-poppins font-bold text-xs text-foreground">Equipment Required</p>
            </div>
            <ul className="space-y-1">
              {COURSE.equipment.map((e, i) => (
                <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-1.5">
                  <span className="text-purple-500 font-bold">•</span> {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {COURSE.introVideo && (
          <div className="space-y-2">
            <p className="font-poppins font-bold text-sm text-foreground flex items-center gap-1.5">
              <Play size={15} className="text-orange-600" /> Intro Video
            </p>
            <VideoPlayer src={COURSE.introVideo} title="Course Intro" />
          </div>
        )}
      </Section>

      {/* Lessons */}
      {LESSONS.map((lesson) => (
        <Section
          key={lesson.num}
          title={`${lesson.num}. ${lesson.title}`}
          icon={
            <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {lesson.num}
            </span>
          }
          defaultOpen={false}
        >
          {lesson.video ? (
            <VideoPlayer src={lesson.video} title={lesson.title} />
          ) : (
            <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-4 text-center">
              <p className="text-xs text-muted-foreground">Video coming soon. Read the key takeaways below to learn this lesson.</p>
            </div>
          )}
          <Takeaways items={lesson.takeaways} />
          <ThingsToTry items={lesson.thingsToTry} />
          {lesson.usefulLinks && (
            <div className="space-y-2">
              <p className="font-poppins font-bold text-sm text-foreground flex items-center gap-1.5">
                <Wrench size={15} className="text-blue-600" /> Useful Links
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">{lesson.linksNote}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {lesson.usefulLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 rounded-xl border border-border/40 px-3 py-2.5 hover:bg-muted/30 transition-colors"
                  >
                    <div>
                      <p className="font-poppins font-bold text-xs text-foreground">{link.name}</p>
                      <p className="text-[10px] text-muted-foreground">{link.by}</p>
                    </div>
                    <ExternalLink size={14} className="text-blue-500 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </Section>
      ))}

      {/* Optional Extras */}
      <Section title="6. Optional Extras" icon={<Lightbulb size={18} className="text-amber-500" />} defaultOpen={false} accent="purple">
        <p className="text-sm text-muted-foreground leading-relaxed">{OPTIONAL_EXTRAS.intro}</p>
        <div className="space-y-4">
          {OPTIONAL_EXTRAS.items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border/60 overflow-hidden bg-white">
              <div className="px-5 py-3 bg-purple-50/50 border-b border-border/40">
                <p className="font-poppins font-bold text-sm text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{item.blurb}</p>
              </div>
              <div className="p-4">
                <VideoPlayer src={item.video} title={item.title} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Quiz */}
      <Section title="Final Quiz" icon={<Trophy size={18} className="text-orange-600" />} defaultOpen={false} accent="green">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Complete the quiz below to test your knowledge. Score over 70% to download your certificate.
        </p>
        <GettingStartedQuiz />
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