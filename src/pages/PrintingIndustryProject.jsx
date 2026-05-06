import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, ExternalLink,
  Clock, Layers, Star, Award, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

function TopicCard({ icon, title, desc }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-muted/40 border border-border/40">
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div>
        <p className="font-poppins font-bold text-sm text-foreground mb-1">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

const TOPICS = [
  {
    icon: "⚡",
    title: "Rapid Prototyping",
    desc: "Discover how 3D printing has transformed product development by enabling designers and engineers to quickly iterate on physical prototypes — reducing time-to-market from months to days.",
  },
  {
    icon: "🏭",
    title: "Local Manufacturing",
    desc: "Explore how 3D printing enables on-demand, distributed manufacturing — reducing supply chain complexity and allowing products to be made closer to where they're needed.",
  },
  {
    icon: "✏️",
    title: "Customisation",
    desc: "Learn how 3D printing makes mass customisation economically viable — from personalised medical implants to bespoke consumer products — without the cost penalty of traditional manufacturing.",
  },
  {
    icon: "🌱",
    title: "Sustainability",
    desc: "Understand the environmental implications of 3D printing: additive manufacturing produces less waste than subtractive methods, and emerging bio-based filaments are opening greener possibilities.",
  },
  {
    icon: "🌍",
    title: "Mass Global Access",
    desc: "See how open-source 3D printing technology and falling hardware costs are democratising fabrication — giving makers, students, and entrepreneurs worldwide access to manufacturing capability.",
  },
];

const INDUSTRIES = [
  { icon: "🏥", label: "Healthcare", desc: "Custom prosthetics, surgical guides, and bioprinted tissue." },
  { icon: "✈️", label: "Aerospace", desc: "Lightweight structural parts and complex geometries impossible to machine." },
  { icon: "🏗️", label: "Architecture", desc: "Rapid scale models, structural components, and even 3D-printed buildings." },
  { icon: "👟", label: "Fashion & Consumer", desc: "Personalised products, tooling, and on-demand spare parts." },
  { icon: "🎓", label: "Education", desc: "Hands-on STEM learning tools, anatomical models, and classroom prototypes." },
  { icon: "🔋", label: "Electronics", desc: "Custom enclosures, jigs, and emerging printed circuit applications." },
];

const QUIZ = [
  {
    q: "What is 'rapid prototyping' in the context of 3D printing?",
    options: [
      "Printing as fast as possible at maximum speed",
      "Quickly creating physical models to test and iterate on designs",
      "A type of high-temperature 3D printing material",
      "Automated mass production of identical parts",
    ],
    correct: 1,
  },
  {
    q: "Which of the following is a key sustainability advantage of additive manufacturing?",
    options: [
      "It uses more energy than traditional methods",
      "It requires large centralised factories",
      "It adds material only where needed, reducing waste",
      "It can only use petroleum-based plastics",
    ],
    correct: 2,
  },
  {
    q: "How does local manufacturing via 3D printing benefit businesses?",
    options: [
      "It eliminates the need for any design process",
      "It reduces supply chain complexity and enables on-demand production",
      "It requires no skilled operators",
      "It is only suitable for very large production runs",
    ],
    correct: 1,
  },
  {
    q: "What makes mass customisation economically viable with 3D printing?",
    options: [
      "The cost per unit decreases significantly at scale",
      "It requires expensive retooling for each variant",
      "Each part can be uniquely designed with no additional tooling cost",
      "Customisation is only possible for plastic materials",
    ],
    correct: 2,
  },
  {
    q: "Which industry uses 3D printing to produce custom prosthetics and surgical guides?",
    options: ["Aerospace", "Fashion", "Healthcare", "Architecture"],
    correct: 2,
  },
  {
    q: "The democratisation of 3D printing refers to:",
    options: [
      "Governments controlling 3D printer manufacturing",
      "Making fabrication technology accessible to people worldwide regardless of resources",
      "Limiting 3D printing to large corporations",
      "Printing democratic election materials",
    ],
    correct: 1,
  },
  {
    q: "Compared to subtractive manufacturing (e.g. CNC milling), additive manufacturing typically:",
    options: [
      "Produces more material waste",
      "Takes longer for every type of part",
      "Produces less material waste by building up layers",
      "Cannot produce complex geometries",
    ],
    correct: 2,
  },
  {
    q: "What does 'on-demand manufacturing' mean?",
    options: [
      "Manufacturing only when a specific order is placed, rather than holding large inventories",
      "Manufacturing 24 hours a day without stopping",
      "A type of injection moulding process",
      "Producing goods in bulk regardless of demand",
    ],
    correct: 0,
  },
  {
    q: "Bio-based filaments in 3D printing are significant because they:",
    options: [
      "Print faster than standard PLA",
      "Can be used in food printers only",
      "Offer a more environmentally friendly alternative to petroleum-based plastics",
      "Require higher printing temperatures",
    ],
    correct: 2,
  },
  {
    q: "In aerospace, 3D printing is valued mainly for its ability to create:",
    options: [
      "Only decorative cabin components",
      "Lightweight, complex structural parts not achievable through traditional machining",
      "Engine fuel systems entirely from plastic",
      "Identical mass-produced rivets cheaply",
    ],
    correct: 1,
  },
];

export default function PrintingIndustryProject({ isPublic = false }) {
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
        <img src={COVER_IMG} alt="The 3D Printing Industry" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white">Online Course</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">Industry</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">All Levels</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">The 3D Printing Industry</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            A bitesize snapshot of key aspects of the 3D printing industry — from rapid prototyping to sustainability and global access.
          </p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> ~30 minutes</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 5 topics</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> Certificate on 70%+</span>
          </div>
        </div>
      </div>

      {/* Course Overview */}
      <Section title="Course Overview" icon="📋" defaultOpen={true}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In this short online course, you will learn about the key aspects of the 3D printing industry — from rapid prototyping and local manufacturing to customisation, sustainability, and mass global access. At the end of the course is a quiz, and if you achieve over 70%, you can download a certificate!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Format", icon: "📖", text: "Self-paced online course with 5 topic modules and a final quiz." },
            { label: "Level", icon: "⭐", text: "Suitable for all levels — no prior 3D printing knowledge required." },
            { label: "Duration", icon: "🕐", text: "Approximately 30 minutes to read through all topics and complete the quiz." },
            { label: "Certificate", icon: "🏆", text: "Score 70% or above on the final quiz to earn your certificate of completion." },
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

      {/* Topics */}
      <Section title="Course Topics" icon="📚" defaultOpen={true}>
        <p className="text-sm text-muted-foreground">
          Read through each of the five key topics below before attempting the quiz.
        </p>
        <div className="space-y-3">
          {TOPICS.map((t, i) => <TopicCard key={i} {...t} />)}
        </div>
      </Section>

      {/* Industries */}
      <Section title="3D Printing Across Industries" icon="🏭" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          3D printing has found applications across virtually every major industry. Here are some of the most impactful examples:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INDUSTRIES.map((ind, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-xl bg-muted/40 border border-border/40">
              <span className="text-2xl flex-shrink-0">{ind.icon}</span>
              <div>
                <p className="font-poppins font-bold text-xs text-foreground mb-1">{ind.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{ind.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-blue-800 leading-relaxed">
            <span className="font-bold">Did you know?</span> The global 3D printing market is projected to exceed $50 billion by 2030, driven by adoption across healthcare, aerospace, and consumer goods sectors.
          </p>
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
                            ? "border-indigo-500 bg-indigo-50 text-indigo-800 font-medium"
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
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
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
            {/* Score Banner */}
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
              <div className="rounded-2xl bg-indigo-50 border border-indigo-200 p-5 flex items-start gap-4">
                <Award size={32} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-poppins font-bold text-sm text-indigo-800 mb-1">Certificate of Completion</p>
                  <p className="text-xs text-indigo-700 leading-relaxed mb-3">
                    You have successfully completed <strong>The 3D Printing Industry</strong> course with a score of {percent}%. Well done!
                  </p>
                  <Button
                    onClick={() => window.print()}
                    className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white gap-2 text-xs"
                  >
                    <Award size={13} /> Download Certificate (Print)
                  </Button>
                </div>
              </div>
            )}

            {/* Answer Review */}
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