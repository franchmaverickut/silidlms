import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, CheckCircle2, Star, Trophy, RotateCcw, Lightbulb, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// ── Lecture slides ──────────────────────────────────────────────────────────
const slides = [
  // 0 – Welcome
  {
    type: "intro",
    topic: "Welcome!",
    title: "3D Shapes & Introduction to Design",
    subtitle: "Grade 1 · Maker Stage · 3D Printing",
    body: "In this lesson you will learn about shapes all around you, discover the difference between flat and solid shapes, and take your first peek at 3D printing!",
    image: "https://images.unsplash.com/photo-1601170930625-cb92cb0396e6?w=800&q=80",
    imageAlt: "Colorful building blocks",
    objectives: [
      "Tell the difference between flat (2D) and solid (3D) shapes",
      "Find shapes inside everyday objects",
      "Draw objects using shapes",
      "Learn how a 3D printer builds things layer by layer",
    ],
  },

  // 1 – Lecture: Basic Shapes
  {
    type: "lecture",
    topic: "Lesson 1",
    title: "Review of Basic Shapes",
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80",
    imageAlt: "Colorful geometric shapes",
    body: "Every object around you is made up of basic shapes. There are four shapes you probably already know:",
    points: [
      { shape: "⭕ Circle", example: "wheels, coins, buttons" },
      { shape: "🟥 Square / Rectangle", example: "books, doors, phones" },
      { shape: "🔺 Triangle", example: "pizza slices, roof tops, signs" },
      { shape: "⬟ Oval / Ellipse", example: "eggs, mirrors, faces" },
    ],
    tip: "Look around the room right now — can you spot all four shapes?",
  },

  // 2 – Activity: Shape Spotter
  {
    type: "activity",
    topic: "Activity 1",
    title: "🔍 Shape Spotter!",
    instruction: "Look at the object below and pick ALL the shapes you can see in it.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    imageAlt: "A simple toy robot",
    imageCaption: "A toy robot",
    question: "Which shapes can you spot in this toy robot?",
    multiSelect: true,
    options: ["Circle", "Square / Rectangle", "Triangle", "Oval"],
    correctAnswers: ["Circle", "Square / Rectangle"],
    explanation: "Robots are usually built from rectangles (body, arms, legs) and circles (eyes, joints). Great spotting!",
  },

  // 3 – Lecture: 2D vs 3D
  {
    type: "lecture",
    topic: "Lesson 2",
    title: "Flat Shapes vs Solid Shapes",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    imageAlt: "3D geometric shapes wooden",
    body: "Flat shapes are called 2D — they only have length and width (like a drawing on paper). Solid shapes are called 3D — they also have depth, so you can pick them up!",
    comparison: [
      { flat: "Circle 🔵", solid: "Sphere ⚽", flatEx: "a drawn circle", solidEx: "a ball" },
      { flat: "Square 🟥", solid: "Cube 📦", flatEx: "a tile on paper", solidEx: "a dice or block" },
      { flat: "Rectangle", solid: "Rectangular Box", flatEx: "a rectangle drawn", solidEx: "a cereal box" },
      { flat: "Triangle 🔺", solid: "Pyramid", flatEx: "triangle on paper", solidEx: "pyramid shape" },
    ],
    tip: "A can is a cylinder — it's a 3D shape! Can you find a cylinder at home?",
  },

  // 4 – Activity: 2D or 3D?
  {
    type: "quiz",
    topic: "Activity 2",
    title: "2D or 3D? You Decide!",
    questions: [
      {
        q: "A soccer ball is…",
        options: ["2D (flat)", "3D (solid)"],
        correct: 1,
        explanation: "A soccer ball is 3D — you can hold it and it has depth!",
      },
      {
        q: "A drawing of a triangle on paper is…",
        options: ["2D (flat)", "3D (solid)"],
        correct: 0,
        explanation: "A drawing on paper is 2D — it's flat with no depth.",
      },
      {
        q: "A dice (like in a board game) is…",
        options: ["2D (flat)", "3D (solid)"],
        correct: 1,
        explanation: "A dice is a cube — a 3D shape you can pick up and roll!",
      },
      {
        q: "A photo of a ball is…",
        options: ["2D (flat)", "3D (solid)"],
        correct: 0,
        explanation: "A photo is flat (2D) even though the ball in real life is 3D.",
      },
    ],
  },

  // 5 – Lecture: Names of 3D Shapes
  {
    type: "lecture",
    topic: "Lesson 3",
    title: "Names of 3D Shapes",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80",
    imageAlt: "3D printed geometric shapes",
    body: "3D shapes have special names. Let's learn each one:",
    shapes3d: [
      { name: "Cube", emoji: "🎲", example: "a dice, a Rubik's cube, a sugar cube" },
      { name: "Sphere", emoji: "🏀", example: "a basketball, a marble, the Earth" },
      { name: "Cylinder", emoji: "🥫", example: "a can of soup, a battery, a toilet roll" },
      { name: "Cone", emoji: "🍦", example: "an ice cream cone, a party hat, a traffic cone" },
      { name: "Pyramid", emoji: "🔺", example: "the pyramids of Egypt, a tent roof" },
      { name: "Rectangular Box", emoji: "📦", example: "a cereal box, a book, a brick" },
    ],
    tip: "All 3D printed objects start as one of these shapes — or a combination of them!",
  },

  // 6 – Activity: Match the Shape
  {
    type: "match",
    topic: "Activity 3",
    title: "🎯 Match the Shape!",
    instruction: "For each object below, pick the correct 3D shape name.",
    matchItems: [
      { object: "🏀 Basketball", options: ["Cube", "Sphere", "Cylinder", "Cone"], correct: 1 },
      { object: "🥫 Soup Can", options: ["Pyramid", "Sphere", "Cylinder", "Rectangular Box"], correct: 2 },
      { object: "🍦 Ice Cream Cone", options: ["Cone", "Cube", "Sphere", "Pyramid"], correct: 0 },
      { object: "📦 Cereal Box", options: ["Cylinder", "Cone", "Sphere", "Rectangular Box"], correct: 3 },
    ],
  },

  // 7 – Lecture: Objects Built from Shapes
  {
    type: "lecture",
    topic: "Lesson 4",
    title: "Objects Built from Shapes",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80",
    imageAlt: "Toy building blocks assembled",
    body: "Almost everything around you is built by combining shapes! Engineers and designers think about shapes when they create objects.",
    examples: [
      { object: "🤖 A Robot", parts: "Body = Rectangular Box, Eyes = Spheres, Arms = Cylinders" },
      { object: "🏠 A House", parts: "Walls = Rectangular Box, Roof = Triangular Prism" },
      { object: "🚗 A Car", parts: "Body = Rectangular Box, Wheels = Cylinders, Windows = Rectangles" },
      { object: "✏️ A Pencil", parts: "Body = Cylinder, Tip = Cone" },
    ],
    tip: "A robot is made of rectangles, cylinders, and spheres — now you know the secret!",
  },

  // 8 – Activity: Build a Robot with Shapes
  {
    type: "drawing_prompt",
    topic: "Activity 4",
    title: "✏️ Draw Your Own Robot!",
    instruction: "Using only the shapes you've learned (cube, sphere, cylinder, cone, rectangular box), draw a robot of your own! Label at least 3 parts with the shape name.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    imageAlt: "A friendly robot",
    checklist: [
      "My robot has a body (rectangular box or cube)",
      "My robot has eyes (circles or spheres)",
      "My robot has arms or legs (cylinders or rectangles)",
      "I labelled at least 3 parts with the shape name",
    ],
    reflection: "What shapes did you use the most in your robot?",
  },

  // 9 – Lecture: What is a Design?
  {
    type: "lecture",
    topic: "Lesson 5",
    title: "Introduction to Design Ideas",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    imageAlt: "Architectural blueprints and sketches",
    body: "Before anything is built, someone has to PLAN it. That plan is called a design. Designers draw pictures of their ideas before they build them. This helps them think clearly and spot problems early.",
    steps: [
      { icon: "💡", label: "Think of an idea" },
      { icon: "✏️", label: "Sketch a drawing" },
      { icon: "🔍", label: "Check the details" },
      { icon: "🔨", label: "Build it!" },
    ],
    tip: "Architects draw plans before building houses. Engineers draw plans before making machines. You can too!",
  },

  // 10 – Lecture: Observing 3D Printing
  {
    type: "lecture",
    topic: "Lesson 6",
    title: "Observing 3D Printing",
    image: "https://images.unsplash.com/photo-1567688792-1a5e43ab0f69?w=800&q=80",
    imageAlt: "3D printer in action",
    body: "A 3D printer makes solid objects by building them up one thin layer at a time — just like stacking paper until it becomes a thick book, but much more precise!",
    howItWorks: [
      "1. A designer creates a 3D shape on a computer",
      "2. The computer slices the shape into hundreds of thin layers",
      "3. The printer melts plastic and lays down each layer",
      "4. Layer by layer, the object grows from the bottom up",
      "5. When finished, you have a real, solid object!",
    ],
    warning: "Never touch a 3D printer nozzle — it gets extremely hot!",
    tip: "A single small object can take 30 minutes to 2 hours to print!",
  },

  // 11 – Final Quiz
  {
    type: "quiz",
    topic: "Final Quiz",
    title: "🏆 Test What You Learned!",
    questions: [
      {
        q: "Which of these is a 3D shape?",
        options: ["A drawing of a circle", "A sphere (like a ball)", "A square on paper", "A painted rectangle"],
        correct: 1,
        explanation: "A sphere is a solid 3D shape — you can hold it in your hand!",
      },
      {
        q: "What shape is the body of a typical pencil?",
        options: ["Cube", "Cone", "Cylinder", "Pyramid"],
        correct: 2,
        explanation: "A pencil's body is a cylinder — long and round, just like a can!",
      },
      {
        q: "What does a 3D printer do?",
        options: [
          "Prints pictures on paper",
          "Builds solid objects layer by layer",
          "Takes photos of shapes",
          "Draws flat designs",
        ],
        correct: 1,
        explanation: "A 3D printer builds solid objects one thin layer at a time!",
      },
      {
        q: "Before you build something, what should you do first?",
        options: ["Jump right in!", "Ask a friend to do it", "Draw a design plan", "Buy the materials"],
        correct: 2,
        explanation: "Drawing a design plan helps you think clearly and spot problems before you build!",
      },
    ],
  },

  // 12 – Completion
  {
    type: "complete",
    title: "🎉 Lesson Complete!",
    body: "Amazing work! You've finished the Grade 1: 3D Shapes & Introduction to Design lesson.",
    achievements: [
      "You can name 5 different 3D shapes",
      "You know the difference between 2D and 3D",
      "You understand what a design is",
      "You know how a 3D printer works",
    ],
    nextStep: "Draw your final model at home and label all the shapes you used!",
    reflection: [
      "What is the difference between a flat shape and a 3D shape?",
      "What would you like to print on a 3D printer?",
    ],
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function IntroSlide({ slide, onNext }) {
  return (
    <div className="space-y-6">
      <div className="relative rounded-3xl overflow-hidden h-52 md:h-64">
        <img src={slide.image} alt={slide.imageAlt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
          <p className="text-orange-300 text-xs font-bold uppercase tracking-widest mb-1">{slide.subtitle}</p>
          <h1 className="font-poppins font-bold text-2xl md:text-3xl text-white">{slide.title}</h1>
        </div>
      </div>
      <Card className="p-5 border-border/60">
        <p className="text-foreground text-sm leading-relaxed">{slide.body}</p>
      </Card>
      <Card className="p-5 border-border/60">
        <h3 className="font-poppins font-bold text-sm mb-3 text-primary">🎯 What you'll learn:</h3>
        <ul className="space-y-2">
          {slide.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={15} className="text-secondary flex-shrink-0 mt-0.5" />
              {obj}
            </li>
          ))}
        </ul>
      </Card>
      <Button onClick={onNext} className="w-full bg-primary text-white rounded-xl py-5 font-bold text-base gap-2">
        Start Lesson <ChevronRight size={18} />
      </Button>
    </div>
  );
}

function LectureSlide({ slide }) {
  return (
    <div className="space-y-5">
      {slide.image && (
        <div className="relative rounded-2xl overflow-hidden h-44">
          <img src={slide.image} alt={slide.imageAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-end p-5">
            <h2 className="font-poppins font-bold text-xl text-white">{slide.title}</h2>
          </div>
        </div>
      )}
      <Card className="p-5 border-border/60">
        <p className="text-sm text-foreground leading-relaxed">{slide.body}</p>
      </Card>

      {slide.points && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {slide.points.map((p, i) => (
            <Card key={i} className="p-4 border-border/60 bg-primary/5">
              <p className="font-bold text-sm text-primary">{p.shape}</p>
              <p className="text-xs text-muted-foreground mt-1">e.g. {p.example}</p>
            </Card>
          ))}
        </div>
      )}

      {slide.comparison && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 mb-1">
            <div className="text-center text-xs font-bold text-muted-foreground bg-muted rounded-xl py-2">2D (Flat)</div>
            <div className="text-center text-xs font-bold text-primary bg-primary/10 rounded-xl py-2">3D (Solid)</div>
          </div>
          {slide.comparison.map((c, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <Card className="p-3 text-center border-border/60 bg-muted/30">
                <p className="font-semibold text-sm">{c.flat}</p>
                <p className="text-xs text-muted-foreground">{c.flatEx}</p>
              </Card>
              <Card className="p-3 text-center border-primary/30 bg-primary/5">
                <p className="font-semibold text-sm text-primary">{c.solid}</p>
                <p className="text-xs text-muted-foreground">{c.solidEx}</p>
              </Card>
            </div>
          ))}
        </div>
      )}

      {slide.shapes3d && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {slide.shapes3d.map((s, i) => (
            <Card key={i} className="p-4 border-border/60 text-center hover:border-primary/40 transition-all">
              <div className="text-3xl mb-1">{s.emoji}</div>
              <p className="font-bold text-sm text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.example}</p>
            </Card>
          ))}
        </div>
      )}

      {slide.examples && (
        <div className="space-y-2">
          {slide.examples.map((ex, i) => (
            <Card key={i} className="p-4 border-border/60 flex flex-col gap-1">
              <p className="font-bold text-sm">{ex.object}</p>
              <p className="text-xs text-muted-foreground">{ex.parts}</p>
            </Card>
          ))}
        </div>
      )}

      {slide.steps && (
        <div className="flex flex-wrap gap-3 justify-center">
          {slide.steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1 w-20 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">{s.icon}</div>
              <p className="text-xs font-semibold text-foreground">{s.label}</p>
              {i < slide.steps.length - 1 && <ChevronRight size={14} className="text-muted-foreground hidden sm:block absolute" />}
            </div>
          ))}
        </div>
      )}

      {slide.howItWorks && (
        <Card className="p-5 border-border/60 space-y-2">
          <h3 className="font-bold text-sm text-foreground mb-2">How it works:</h3>
          {slide.howItWorks.map((step, i) => (
            <p key={i} className="text-sm text-foreground flex items-start gap-2">
              <span className="text-primary font-bold flex-shrink-0">{i + 1}.</span>
              {step.replace(/^\d+\.\s/, "")}
            </p>
          ))}
        </Card>
      )}

      {slide.tip && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <Lightbulb size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 font-medium">{slide.tip}</p>
        </div>
      )}

      {slide.warning && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
          <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800 font-medium">{slide.warning}</p>
        </div>
      )}
    </div>
  );
}

function ActivitySlide({ slide }) {
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (opt) => {
    if (submitted) return;
    setSelected(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
  };

  const isCorrect = (opt) => slide.correctAnswers.includes(opt);
  const allCorrectSelected = slide.correctAnswers.every(a => selected.includes(a)) &&
    selected.every(s => slide.correctAnswers.includes(s));

  return (
    <div className="space-y-5">
      <Card className="p-4 border-border/60 bg-primary/5">
        <p className="text-sm font-semibold text-primary">{slide.instruction}</p>
      </Card>
      <div className="rounded-2xl overflow-hidden border border-border/60">
        <img src={slide.image} alt={slide.imageAlt} className="w-full h-52 object-cover" />
        <p className="text-center text-xs text-muted-foreground py-2 bg-muted/30">{slide.imageCaption}</p>
      </div>
      <p className="font-semibold text-sm text-foreground">{slide.question}</p>
      <div className="grid grid-cols-2 gap-3">
        {slide.options.map((opt, i) => {
          const sel = selected.includes(opt);
          const correct = slide.correctAnswers.includes(opt);
          let cls = "p-4 rounded-xl border-2 text-sm font-semibold text-center cursor-pointer transition-all ";
          if (!submitted) cls += sel ? "border-primary bg-primary/10 text-primary" : "border-border/60 hover:border-primary/40";
          else if (correct) cls += "border-secondary bg-secondary/10 text-secondary";
          else if (sel && !correct) cls += "border-destructive bg-destructive/10 text-destructive";
          else cls += "border-border/40 text-muted-foreground opacity-60";
          return (
            <button key={i} className={cls} onClick={() => toggle(opt)}>
              {submitted && correct && "✅ "}{submitted && sel && !correct && "❌ "}{opt}
            </button>
          );
        })}
      </div>
      {!submitted ? (
        <Button disabled={selected.length === 0} onClick={() => setSubmitted(true)} className="w-full rounded-xl bg-primary text-white">
          Check My Answers
        </Button>
      ) : (
        <div className={`p-4 rounded-xl border ${allCorrectSelected ? "bg-secondary/10 border-secondary/30" : "bg-amber-50 border-amber-200"}`}>
          <p className={`font-bold text-sm mb-1 ${allCorrectSelected ? "text-secondary" : "text-amber-700"}`}>
            {allCorrectSelected ? "🎉 Correct!" : "🤔 Almost — check the green answers!"}
          </p>
          <p className="text-sm text-muted-foreground">{slide.explanation}</p>
        </div>
      )}
    </div>
  );
}

function QuizSlide({ slide }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = Object.entries(answers).filter(([qi, ai]) => slide.questions[qi].correct === ai).length;

  const pick = (qi, ai) => { if (!submitted) setAnswers(prev => ({ ...prev, [qi]: ai })); };
  const allAnswered = Object.keys(answers).length === slide.questions.length;

  return (
    <div className="space-y-5">
      <Card className="p-4 border-border/60 bg-primary/5">
        <p className="text-sm font-semibold text-primary">Answer all questions, then tap "Check Answers".</p>
      </Card>
      {slide.questions.map((q, qi) => (
        <Card key={qi} className="p-5 border-border/60 space-y-3">
          <p className="font-semibold text-sm text-foreground">{qi + 1}. {q.q}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, ai) => {
              const sel = answers[qi] === ai;
              const correct = q.correct === ai;
              let cls = "p-3 rounded-xl border text-sm text-left transition-all cursor-pointer ";
              if (!submitted) cls += sel ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border/60 hover:border-primary/40";
              else if (correct) cls += "border-secondary bg-secondary/10 text-secondary font-semibold";
              else if (sel && !correct) cls += "border-destructive bg-destructive/10 text-destructive";
              else cls += "border-border/40 text-muted-foreground opacity-50";
              return (
                <button key={ai} className={cls} onClick={() => pick(qi, ai)}>
                  {submitted && correct ? "✅ " : submitted && sel && !correct ? "❌ " : ""}{opt}
                </button>
              );
            })}
          </div>
          {submitted && (
            <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">{q.explanation}</p>
          )}
        </Card>
      ))}
      {!submitted ? (
        <Button disabled={!allAnswered} onClick={() => setSubmitted(true)} className="w-full rounded-xl bg-primary text-white font-bold">
          Check Answers
        </Button>
      ) : (
        <Card className={`p-5 text-center border ${score === slide.questions.length ? "border-secondary/40 bg-secondary/5" : "border-amber-200 bg-amber-50"}`}>
          <div className="text-4xl mb-2">{score === slide.questions.length ? "🏆" : score >= slide.questions.length / 2 ? "⭐" : "💪"}</div>
          <p className="font-poppins font-bold text-lg">{score} / {slide.questions.length} correct</p>
          <p className="text-sm text-muted-foreground mt-1">
            {score === slide.questions.length ? "Perfect score — you're a shape superstar!" :
              score >= slide.questions.length / 2 ? "Great job! Review the explanations above." :
                "Keep going — re-read the lesson and try again!"}
          </p>
          {score < slide.questions.length && (
            <Button variant="outline" size="sm" className="mt-3 gap-1.5 rounded-xl"
              onClick={() => { setAnswers({}); setSubmitted(false); }}>
              <RotateCcw size={13} /> Try Again
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}

function MatchSlide({ slide }) {
  const [picks, setPicks] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = Object.entries(picks).filter(([i, v]) => slide.matchItems[i].correct === v).length;
  const allAnswered = Object.keys(picks).length === slide.matchItems.length;

  return (
    <div className="space-y-5">
      <Card className="p-4 border-border/60 bg-primary/5">
        <p className="text-sm font-semibold text-primary">{slide.instruction}</p>
      </Card>
      {slide.matchItems.map((item, i) => (
        <Card key={i} className="p-4 border-border/60 space-y-3">
          <p className="font-bold text-sm">{item.object}</p>
          <div className="flex flex-wrap gap-2">
            {item.options.map((opt, j) => {
              const sel = picks[i] === j;
              const correct = item.correct === j;
              let cls = "px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ";
              if (!submitted) cls += sel ? "border-primary bg-primary/10 text-primary" : "border-border/60 hover:border-primary/30";
              else if (correct) cls += "border-secondary bg-secondary/10 text-secondary";
              else if (sel && !correct) cls += "border-destructive bg-destructive/10 text-destructive line-through";
              else cls += "border-border/40 text-muted-foreground opacity-50";
              return (
                <button key={j} className={cls} onClick={() => !submitted && setPicks(p => ({ ...p, [i]: j }))}>
                  {opt}
                </button>
              );
            })}
          </div>
        </Card>
      ))}
      {!submitted ? (
        <Button disabled={!allAnswered} onClick={() => setSubmitted(true)} className="w-full rounded-xl bg-primary text-white font-bold">
          Check Matches
        </Button>
      ) : (
        <Card className="p-5 text-center border-secondary/40 bg-secondary/5">
          <p className="font-poppins font-bold text-xl">🎯 {score} / {slide.matchItems.length}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {score === slide.matchItems.length ? "Perfect! You matched them all!" : "Check the green answers above and review!"}
          </p>
          {score < slide.matchItems.length && (
            <Button variant="outline" size="sm" className="mt-3 gap-1.5 rounded-xl"
              onClick={() => { setPicks({}); setSubmitted(false); }}>
              <RotateCcw size={13} /> Retry
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}

function DrawingPrompt({ slide }) {
  const [checked, setChecked] = useState([]);
  const [answer, setAnswer] = useState("");

  const toggle = (i) => setChecked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl overflow-hidden border border-border/60">
        <img src={slide.image} alt={slide.imageAlt} className="w-full h-48 object-cover" />
      </div>
      <Card className="p-4 border-primary/30 bg-primary/5">
        <p className="text-sm font-semibold text-primary">{slide.instruction}</p>
      </Card>
      <Card className="p-5 border-border/60 space-y-3">
        <h3 className="font-bold text-sm">✅ Checklist — make sure your drawing has:</h3>
        {slide.checklist.map((item, i) => (
          <label key={i} className="flex items-center gap-3 cursor-pointer group">
            <div
              onClick={() => toggle(i)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${checked.includes(i) ? "border-secondary bg-secondary" : "border-border/60 group-hover:border-primary/40"}`}
            >
              {checked.includes(i) && <CheckCircle2 size={12} className="text-white" />}
            </div>
            <span className={`text-sm ${checked.includes(i) ? "line-through text-muted-foreground" : "text-foreground"}`}>{item}</span>
          </label>
        ))}
      </Card>
      <Card className="p-5 border-border/60 space-y-3">
        <h3 className="font-bold text-sm">💬 Reflection</h3>
        <p className="text-sm text-muted-foreground">{slide.reflection}</p>
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Write your answer here..."
          className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm min-h-[80px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        {answer.trim().length > 0 && (
          <p className="text-xs text-secondary font-semibold flex items-center gap-1"><Star size={12} /> Great reflection! Keep it!</p>
        )}
      </Card>
    </div>
  );
}

function CompleteSlide({ slide }) {
  return (
    <div className="space-y-6 text-center">
      <div className="py-8">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="font-poppins font-bold text-2xl text-foreground">{slide.title}</h1>
        <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">{slide.body}</p>
      </div>
      <Card className="p-5 border-secondary/30 bg-secondary/5 text-left">
        <h3 className="font-poppins font-bold text-sm mb-3 flex items-center gap-2"><Trophy size={15} className="text-secondary" /> What you achieved:</h3>
        <ul className="space-y-2">
          {slide.achievements.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={14} className="text-secondary flex-shrink-0 mt-0.5" />
              {a}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-5 border-primary/20 bg-primary/5 text-left">
        <h3 className="font-poppins font-bold text-sm mb-3">💬 Reflection Questions</h3>
        {slide.reflection.map((q, i) => (
          <div key={i} className="mb-3">
            <p className="text-sm font-medium text-foreground">{i + 1}. {q}</p>
            <textarea
              placeholder="Write your answer..."
              className="w-full mt-1 rounded-xl border border-input bg-transparent px-3 py-2 text-sm min-h-[60px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        ))}
      </Card>
      <Card className="p-4 border-amber-200 bg-amber-50 text-left">
        <p className="text-sm font-semibold text-amber-800">📌 Next Step: {slide.nextStep}</p>
      </Card>
      <Link to="/maker">
        <Button className="w-full bg-primary text-white rounded-xl font-bold py-4 mt-2">
          Back to Maker Lessons
        </Button>
      </Link>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function Grade1Lesson() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];
  const progress = Math.round((currentSlide / (slides.length - 1)) * 100);

  const next = () => setCurrentSlide(i => Math.min(i + 1, slides.length - 1));
  const prev = () => setCurrentSlide(i => Math.max(i - 1, 0));

  return (
    <div className="max-w-2xl mx-auto pb-16 space-y-4">
      {/* Top nav */}
      <div className="flex items-center gap-3 sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-3">
        <Link to="/maker" className="text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-muted-foreground">
              Grade 1 · {slide.topic || slide.title}
            </span>
            <span className="text-xs font-semibold text-primary">{currentSlide + 1} / {slides.length}</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      {/* Topic badge */}
      {slide.topic && slide.type !== "intro" && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
          {slide.type === "activity" || slide.type === "quiz" || slide.type === "match" || slide.type === "drawing_prompt" ? "✏️ " : "📖 "}
          {slide.topic}
        </div>
      )}

      {/* Slide content */}
      {slide.type === "intro" && <IntroSlide slide={slide} onNext={next} />}
      {slide.type === "lecture" && <LectureSlide slide={slide} />}
      {slide.type === "activity" && <ActivitySlide slide={slide} />}
      {slide.type === "quiz" && <QuizSlide slide={slide} />}
      {slide.type === "match" && <MatchSlide slide={slide} />}
      {slide.type === "drawing_prompt" && <DrawingPrompt slide={slide} />}
      {slide.type === "complete" && <CompleteSlide slide={slide} />}

      {/* Bottom nav (not on intro or complete) */}
      {slide.type !== "intro" && slide.type !== "complete" && (
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={prev} disabled={currentSlide === 0} className="flex-1 rounded-xl gap-1.5">
            <ChevronLeft size={15} /> Back
          </Button>
          <Button onClick={next} className="flex-1 bg-primary text-white rounded-xl gap-1.5">
            Next <ChevronRight size={15} />
          </Button>
        </div>
      )}
    </div>
  );
}