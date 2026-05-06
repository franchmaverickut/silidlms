import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, ExternalLink,
  Clock, Layers, Star, Award, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

function TechCard({ number, name, tagline, materials, applications, benefits, limitations, videoUrl }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 bg-pink-50 border-b border-pink-100">
        <span className="w-8 h-8 rounded-full bg-pink-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{number}</span>
        <div>
          <p className="font-poppins font-bold text-base text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{tagline}</p>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">🧱 Key Materials</p>
            <ul className="space-y-0.5">
              {materials.map((m, i) => <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5"><span className="text-pink-400 mt-0.5">•</span>{m}</li>)}
            </ul>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">🎯 Key Applications</p>
            <ul className="space-y-0.5">
              {applications.map((a, i) => <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5"><span className="text-pink-400 mt-0.5">•</span>{a}</li>)}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wider flex items-center gap-1.5">✅ Benefits</p>
            <ul className="space-y-0.5">
              {benefits.map((b, i) => <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5"><span className="text-green-400 mt-0.5">+</span>{b}</li>)}
            </ul>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">⚠️ Limitations</p>
            <ul className="space-y-0.5">
              {limitations.map((l, i) => <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5"><span className="text-red-400 mt-0.5">–</span>{l}</li>)}
            </ul>
          </div>
        </div>
        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold hover:bg-pink-100 transition-colors"
          >
            <ExternalLink size={13} /> Watch on 3DNatives
          </a>
        )}
      </div>
    </div>
  );
}

const TECHNOLOGIES = [
  {
    number: 1,
    name: "FDM — Fused Deposition Modelling",
    tagline: "The most common desktop 3D printing technology",
    materials: ["PLA", "ABS", "PETG", "TPU (flexible)", "Nylon", "Composite filaments"],
    applications: ["Prototyping", "Education", "Consumer products", "Jigs & fixtures", "Low-run parts"],
    benefits: ["Low cost hardware & materials", "Easy to use", "Wide material range", "Large community & resources"],
    limitations: ["Visible layer lines", "Lower accuracy vs other methods", "Anisotropic strength (weaker along Z)", "Limited detail on small features"],
    videoUrl: "https://www.3dnatives.com/en/fdm-3d-printing/",
  },
  {
    number: 2,
    name: "SLA — Stereolithography",
    tagline: "UV-cured resin for ultra-high detail",
    materials: ["Standard resin", "Tough resin", "Flexible resin", "Castable resin", "Dental resin"],
    applications: ["Jewellery", "Dental & medical models", "Miniatures", "High-detail prototypes", "Investment casting patterns"],
    benefits: ["Extremely high surface finish", "Very fine detail resolution", "Smooth surfaces out of printer", "Wide resin variety"],
    limitations: ["Resins can be toxic — ventilation required", "Post-processing (washing & curing) needed", "More brittle than FDM parts", "Higher material cost"],
    videoUrl: "https://www.3dnatives.com/en/stereolithography/",
  },
  {
    number: 3,
    name: "SLS — Selective Laser Sintering",
    tagline: "Laser-fused powder for functional, support-free parts",
    materials: ["Nylon (PA12, PA11)", "TPU powder", "Glass-filled nylon", "Alumide (aluminium-filled nylon)"],
    applications: ["Functional prototypes", "End-use parts", "Complex geometries", "Small batch production", "Aerospace & automotive"],
    benefits: ["No support structures needed", "Excellent mechanical properties", "Complex geometries possible", "Can nest parts in build volume"],
    limitations: ["Rough surface texture (sandblasting often needed)", "High machine & material cost", "Powder handling & safety", "Limited colour options"],
    videoUrl: "https://www.3dnatives.com/en/selective-laser-sintering/",
  },
  {
    number: 4,
    name: "DMLS / SLM — Metal 3D Printing",
    tagline: "Laser-fused metal powder for high-performance parts",
    materials: ["Stainless steel", "Titanium", "Aluminium alloys", "Inconel (nickel superalloy)", "Cobalt chrome"],
    applications: ["Aerospace structural parts", "Medical implants", "Tooling inserts", "High-performance motorsport parts", "Custom surgical instruments"],
    benefits: ["Full-density metal parts", "Complex internal geometries (e.g. cooling channels)", "High strength-to-weight ratio", "Eliminates traditional tooling"],
    limitations: ["Very high machine & operating cost", "Requires support structures (metal, hard to remove)", "Post-processing (heat treatment, machining)", "Specialist operators needed"],
    videoUrl: "https://www.3dnatives.com/en/metal-3d-printing/",
  },
  {
    number: 5,
    name: "Material Jetting",
    tagline: "Inkjet-style printing for multi-material and full-colour parts",
    materials: ["Photopolymer resins", "Wax (for investment casting)", "Multi-material combinations", "Rigid, flexible & transparent resins"],
    applications: ["Full-colour anatomical models", "Multi-material prototypes", "Realistic product visualisation", "Dental and medical applications", "Investment casting patterns"],
    benefits: ["Full-colour printing possible", "Multi-material in a single build", "Excellent surface finish", "High accuracy"],
    limitations: ["Very high machine cost", "Supports are water-soluble but slow to remove", "Parts can degrade under UV over time", "Limited material durability vs SLS/DMLS"],
    videoUrl: "https://www.3dnatives.com/en/material-jetting/",
  },
  {
    number: 6,
    name: "Binder Jetting",
    tagline: "Inkjet binder on powder bed — fast and scalable",
    materials: ["Sand", "Metal powders (steel, bronze, copper)", "Ceramics", "Full-colour gypsum-based powder"],
    applications: ["Sand casting moulds & cores", "Full-colour figurines & models", "Metal part production (with sintering)", "Large architectural models", "Industrial tooling"],
    benefits: ["High speed — no laser required", "Large build volumes possible", "No heat during printing (less warping)", "Full-colour capability (gypsum)"],
    limitations: ["Green parts are fragile before sintering/infiltration", "Lower strength than DMLS for metal parts", "Post-processing (curing, infiltration) required", "Surface roughness varies by material"],
    videoUrl: "https://www.3dnatives.com/en/binder-jetting/",
  },
];

const QUIZ = [
  {
    q: "Which 3D printing technology uses a heated nozzle to extrude melted thermoplastic filament layer by layer?",
    options: ["SLA", "SLS", "FDM", "DMLS"],
    correct: 2,
  },
  {
    q: "SLA (Stereolithography) uses which process to solidify material?",
    options: [
      "A heated nozzle melts plastic filament",
      "A laser sinters nylon powder",
      "UV light cures liquid resin layer by layer",
      "An inkjet head deposits binder onto powder",
    ],
    correct: 2,
  },
  {
    q: "Which technology does NOT require support structures during printing?",
    options: ["FDM", "SLA", "SLS", "Material Jetting"],
    correct: 2,
  },
  {
    q: "DMLS and SLM are primarily used to produce:",
    options: [
      "Full-colour decorative models",
      "Full-density metal parts for high-performance applications",
      "Flexible rubber-like components",
      "Investment casting wax patterns",
    ],
    correct: 1,
  },
  {
    q: "Which technology is most commonly used for desktop 3D printing in schools and homes?",
    options: ["SLS", "Binder Jetting", "DMLS", "FDM"],
    correct: 3,
  },
  {
    q: "Material Jetting is particularly valued for its ability to:",
    options: [
      "Print at extremely high temperatures",
      "Produce full-colour, multi-material parts in a single build",
      "Sinter metal powders without a laser",
      "Extrude large volumes of material quickly",
    ],
    correct: 1,
  },
  {
    q: "Binder Jetting differs from SLS because it:",
    options: [
      "Uses a laser to fuse the powder",
      "Can only print metals",
      "Uses an inkjet head to deposit a liquid binder onto powder rather than a laser",
      "Requires no post-processing",
    ],
    correct: 2,
  },
  {
    q: "Which material is commonly associated with SLS 3D printing?",
    options: ["PLA filament", "Nylon powder", "Liquid photopolymer resin", "Stainless steel powder"],
    correct: 1,
  },
  {
    q: "A key limitation of SLA-printed parts is that they:",
    options: [
      "Have very poor surface finish",
      "Cannot be used for dental applications",
      "Tend to be more brittle than FDM parts and require post-processing",
      "Can only be printed in black",
    ],
    correct: 2,
  },
  {
    q: "In Binder Jetting, what must typically happen to 'green' metal parts after printing?",
    options: [
      "They are painted with UV-curable resin",
      "They are sintered or infiltrated to achieve final density and strength",
      "They are dissolved in water to remove supports",
      "They are immediately ready for use with no further processing",
    ],
    correct: 1,
  },
];

export default function PrintingTechnologiesProject({ isPublic = false }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = submitted
    ? QUIZ.filter((q, i) => answers[i] === q.correct).length
    : 0;
  const percent = Math.round((score / QUIZ.length) * 100);
  const passed = percent >= 70;

  const handleSubmit = () => {
    if (Object.keys(answers).length < QUIZ.length) return;
    setSubmitted(true);
  };

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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-600 text-white">Online Course</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">Technologies</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">All Levels</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">3D Printing Technologies</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            Learn about 6 key types of 3D printing technologies — materials, applications, benefits and limitations — with video links and a final quiz.
          </p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> 1–2 hours</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 6 technologies</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> Certificate on 70%+</span>
          </div>
        </div>
      </div>

      {/* Course Overview */}
      <Section title="Course Overview" icon="📋" defaultOpen={true}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In this resource, you will learn about 6 key types of 3D printing technologies. Each technology includes its own section with text information about materials, applications, benefits and limitations. External links to 3DNatives' amazing videos are also provided so you can see the technology in action. Exploring this resource should take around 1–2 hours and there is an assessment quiz at the end, where you can download a certificate if you achieve over 70%.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Format", icon: "📖", text: "6 self-contained technology modules, each with materials, applications, benefits, limitations, and a video link." },
            { label: "Level", icon: "⭐", text: "Suitable for all levels — no prior 3D printing experience required." },
            { label: "Duration", icon: "🕐", text: "Approximately 1–2 hours to read all modules and complete the quiz." },
            { label: "Certificate", icon: "🏆", text: "Score 70% or above on the 10-question quiz to earn your certificate." },
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
      <Section title="6 Key 3D Printing Technologies" icon="🖨️" defaultOpen={true}>
        <p className="text-sm text-muted-foreground">
          Work through each technology below. Click the 3DNatives link in each section to watch a video demonstration.
        </p>
        <div className="space-y-4">
          {TECHNOLOGIES.map((tech, i) => <TechCard key={i} {...tech} />)}
        </div>
      </Section>

      {/* Quiz */}
      <Section title="Final Quiz — Test Your Knowledge" icon="🧠" defaultOpen={false}>
        {!submitted ? (
          <>
            <p className="text-sm text-muted-foreground">
              Answer all 10 questions below. You need <strong>70% or more</strong> (7/10) to pass and earn your certificate.
            </p>
            <div className="space-y-6">
              {QUIZ.map((q, qi) => (
                <div key={qi} className="space-y-2">
                  <p className="font-poppins font-semibold text-sm text-foreground">
                    {qi + 1}. {q.q}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => setAnswers(a => ({ ...a, [qi]: oi }))}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                          answers[qi] === oi
                            ? "border-pink-500 bg-pink-50 text-pink-800 font-medium"
                            : "border-border/60 bg-muted/20 text-foreground hover:bg-muted/40"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < QUIZ.length}
              className="w-full rounded-xl bg-pink-600 hover:bg-pink-700 text-white gap-2"
            >
              <BookOpen size={15} /> Submit Quiz
            </Button>
            {Object.keys(answers).length < QUIZ.length && (
              <p className="text-xs text-center text-muted-foreground">
                {QUIZ.length - Object.keys(answers).length} question{QUIZ.length - Object.keys(answers).length !== 1 ? "s" : ""} remaining
              </p>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div className={`rounded-2xl p-6 text-center ${passed ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
              <div className={`text-5xl font-poppins font-bold mb-1 ${passed ? "text-green-600" : "text-red-500"}`}>
                {percent}%
              </div>
              <p className={`font-semibold text-sm mb-1 ${passed ? "text-green-700" : "text-red-600"}`}>
                {passed ? "🎉 Congratulations! You passed!" : "😔 Not quite — try again!"}
              </p>
              <p className="text-xs text-muted-foreground">You scored {score} out of {QUIZ.length}</p>
            </div>

            {passed && (
              <div className="rounded-2xl bg-pink-50 border border-pink-200 p-5 flex items-start gap-4">
                <Award size={32} className="text-pink-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-poppins font-bold text-sm text-pink-800 mb-1">Certificate of Completion</p>
                  <p className="text-xs text-pink-700 leading-relaxed mb-3">
                    You have successfully completed <strong>3D Printing Technologies</strong> with a score of {percent}%. Well done!
                  </p>
                  <Button
                    onClick={() => window.print()}
                    className="rounded-xl bg-pink-600 hover:bg-pink-700 text-white gap-2 text-xs"
                  >
                    <Award size={13} /> Download Certificate (Print)
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <p className="font-poppins font-bold text-sm text-foreground">Review your answers:</p>
              {QUIZ.map((q, qi) => {
                const isCorrect = answers[qi] === q.correct;
                return (
                  <div key={qi} className={`rounded-xl border p-4 ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                    <p className="font-semibold text-xs mb-2">{qi + 1}. {q.q}</p>
                    {q.options.map((opt, oi) => (
                      <div key={oi} className={`text-xs px-3 py-1.5 rounded-lg mb-1 ${
                        oi === q.correct
                          ? "bg-green-100 text-green-800 font-semibold"
                          : answers[qi] === oi && !isCorrect
                            ? "bg-red-100 text-red-700 line-through"
                            : "text-muted-foreground"
                      }`}>
                        {oi === q.correct ? "✓ " : answers[qi] === oi ? "✗ " : "   "}{opt}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            {!passed && (
              <Button
                onClick={() => { setSubmitted(false); setAnswers({}); }}
                variant="outline"
                className="w-full rounded-xl"
              >
                Retake Quiz
              </Button>
            )}
          </div>
        )}
      </Section>
    </div>
  );
}