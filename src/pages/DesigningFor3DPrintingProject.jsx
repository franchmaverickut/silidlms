import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ChevronDown,
  Clock,
  Layers,
  Box,
  Video,
  Printer,
  GraduationCap,
  ArrowUp,
  Sparkles,
  Download,
} from "lucide-react";
import { COURSE_INFO, SECTIONS } from "@/components/design3d/designData";
import DesignSectionCard from "@/components/design3d/DesignSectionCard";
import ZipStlViewer from "@/components/maker/ZipStlViewer";

function CollapsibleSection({ title, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors"
      >
        <span className="flex items-center gap-2.5">
          {Icon && <Icon size={18} className="text-blue-600" />}
          <span className="font-poppins font-bold text-base text-foreground">{title}</span>
        </span>
        <ChevronDown size={18} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

const FOLLOW_ICONS = { video: Video, printer: Printer, book: BookOpen };

export default function DesigningFor3DPrintingProject() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Back link */}
        <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronDown size={16} className="rotate-90" /> Back to Maker Lessons
        </Link>

        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-700 p-8 text-white shadow-lg">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">Course</span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">{COURSE_INFO.category}</span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">All Levels</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl mb-2">{COURSE_INFO.title}</h1>
          <p className="text-white/80 text-sm leading-relaxed mb-5">{COURSE_INFO.tagline}</p>
          <div className="flex flex-wrap gap-5 text-sm text-white/90">
            <span className="flex items-center gap-1.5"><Clock size={16} /> ~45 minutes</span>
            <span className="flex items-center gap-1.5"><Layers size={16} /> 9 lessons + bonus</span>
            <span className="flex items-center gap-1.5"><GraduationCap size={16} /> All skill levels</span>
          </div>
        </div>

        {/* Course Introduction */}
        <CollapsibleSection title="Course Introduction" icon={BookOpen} defaultOpen>
          <p className="text-sm text-muted-foreground leading-relaxed">{COURSE_INFO.description}</p>

          {/* Follow methods */}
          <div className="space-y-3">
            <p className="font-poppins font-bold text-sm text-foreground">This course can be followed in different ways:</p>
            {COURSE_INFO.followMethods.map((m, i) => {
              const Icon = FOLLOW_ICONS[m.icon] || BookOpen;
              return (
                <div key={i} className="flex gap-3 rounded-xl border border-border/40 p-4">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-blue-600" />
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.text}</p>
                </div>
              );
            })}
          </div>

          {/* Model Set callout */}
          <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-4">
            <p className="font-poppins font-bold text-sm text-cyan-900 mb-1.5 flex items-center gap-1.5">
              <Box size={16} /> {COURSE_INFO.modelSet.title}
            </p>
            <p className="text-sm text-cyan-800 leading-relaxed mb-3">{COURSE_INFO.modelSet.description}</p>
            {COURSE_INFO.modelSet.downloadUrl && (
              <a
                href={COURSE_INFO.modelSet.downloadUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-700 transition-colors"
              >
                <Download size={15} /> Download Model Set (ZIP)
              </a>
            )}
            {COURSE_INFO.modelSet.downloadUrl && (
              <ZipStlViewer zipUrl={COURSE_INFO.modelSet.downloadUrl} label="Demo Model Set" height={340} />
            )}
          </div>
        </CollapsibleSection>

        {/* Section Cards */}
        {SECTIONS.map((section, i) => (
          <DesignSectionCard key={i} section={section} />
        ))}

        {/* Back to top */}
        <div className="flex justify-center pt-2 pb-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
          >
            <ArrowUp size={16} /> Back to top
          </button>
        </div>
      </div>
    </div>
  );
}