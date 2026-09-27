import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp,
  ExternalLink, Clock, Layers, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/c44bb0b59_PuzzleCubes.png";

const IMG_TEST = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/f0770805c_STEP1-Test.jpg";
const IMG_MODIFY = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/5eefa1a8f_STEP3-Modify.jpg";
const IMG_DESIGN_CASE = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/ec1afe9ff_STEP4-DesignCase.jpg";
const IMG_3D_PRINT = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/295c31641_STEP5-3DPrint.jpg";
const IMG_DIAGRAMS = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/5a85d6ce3_STEP6-InstructionalDiagrams.jpg";

const VIDEO_INTRO = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/cdeb28cb9_PuzzleCube-ExplainerVideof.mp4";
const VIDEO_TINKERCAD = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/cc9eca871_PuzzleCube-TinkercadTutorial-VoiceOver.mp4";
const VIDEO_TOLERANCE = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/e8d13a856_5-Tolerance.mp4";

const PORTFOLIO_URL = "https://docs.google.com/presentation/d/14MeWPaxIXmRxzvUlfDNWyfZzP5d9SEDcmf4HtdIqJI0/edit?slide=id.g1c4697c0878_0_68#slide=id.g1c4697c0878_0_68";

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

function IterationStep({ num, title, desc, img, video }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      {img && (
        <img src={img} alt={title} className="w-full object-cover max-h-80" />
      )}
      {video && (
        <div className="bg-black">
          <video src={video} controls preload="metadata" className="w-full" title={title} />
        </div>
      )}
      <div className="p-5 space-y-2">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-full bg-orange-500 text-white text-xs font-bold flex-shrink-0">STEP {num}</span>
          <span className="font-poppins font-bold text-sm text-foreground">{title}</span>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function PuzzleCubesProject({ isPublic = false }) {
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
        <img src={COVER_IMG} alt="Puzzle Cubes" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">STEM</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Basic</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Puzzle Cubes</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">Design and 3D print a puzzle cube made of separate pieces that fit together to form one perfect cube.</p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> 3 hours (excl. print time)</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 1 prototype + 1 iteration</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Intro */}
      <Card className="p-6 border-border/60 shadow-sm space-y-4">
        <p className="text-sm text-foreground/80 leading-relaxed">
          In this project, you'll be designing a 3D printed puzzle cube. The process involves following a tutorial to design an initial prototype, which will then be tested and modified. You'll then be challenged to create a case for the puzzle and a set of assembly instructions using isometric diagrams. Watch the intro video below and browse through the project sections to learn more about the journey.
        </p>
        <div className="rounded-2xl overflow-hidden bg-black">
          <video src={VIDEO_INTRO} controls preload="metadata" className="w-full" title="Puzzle Cube intro video" />
        </div>
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          *This project guides you through the design process using a series of design methods. If you'd like to adapt the project or challenge yourself to take an alternative approach to the project instructions, feel free to select different methods from the Design Method Toolkit.
        </p>
      </Card>

      {/* Criteria + Constraints */}
      <Section title="Criteria + Constraints" icon="✅" defaultOpen={false}>
        <ul className="space-y-3">
          <li className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
            <span className="text-orange-500 font-bold flex-shrink-0 mt-0.5">•</span>
            The assembled puzzle cube should have a length, width and height of 30mm.
          </li>
          <li className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
            <span className="text-orange-500 font-bold flex-shrink-0 mt-0.5">•</span>
            Puzzle pieces should be built by combining 1000mm³ cubes (10x10x10mm) so that it fills the overall volume.
          </li>
          <li className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
            <span className="text-orange-500 font-bold flex-shrink-0 mt-0.5">•</span>
            Individual cubes should connect by adjoining faces to form pieces. Pieces should be a minimum of 4 connecting cubes and a maximum of 10.
          </li>
        </ul>
      </Section>

      {/* Project Difficulty */}
      <Section title="Project Difficulty" icon="⭐" defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This project is rated as basic and is suitable for all those who have foundational skills in 3D design and 3D printing.
        </p>
      </Section>

      {/* Project Length */}
      <Section title="Project Length" icon="🕐" defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The estimated project length is 3 hours, excluding any 3D printing time. This estimate includes designing and making an initial puzzle cube plus time for testing and creating 1 improved version with an additional casing for the puzzle. The project can be run in shorter or longer periods of time depending on the number of iterations you choose to make. We recommend breaking the project up into multiple sessions (e.g. 3 x 1 hour sessions), which will allow you to 3D print necessary objects between sessions.
        </p>
      </Section>

      {/* Equipment Required */}
      <Section title="Equipment Required" icon="🧰" defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">To participate in this project, you will require:</p>
        <ul className="space-y-2.5">
          {[
            "A laptop or computer with Tinkercad software (free for educational and personal use).",
            "A software or web application to create a digital portfolio. We recommend using Google Slides as we provide a portfolio template in this format.",
            "Access to a 3D printer and 3D printing material.",
            "A device to capture images of your design process to insert into the project portfolio.",
            "Additional materials may be required depending on the design methods you use when developing your solution.",
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
              <span className="text-orange-500 font-bold flex-shrink-0 mt-0.5">•</span> {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Initial Prototype */}
      <Card className="p-6 border-border/60 shadow-sm space-y-4">
        <h2 className="font-poppins font-bold text-lg text-foreground">Initial Prototype</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This project aims to teach you about designing objects that fit together. Therefore, rather than performing deep research on a topic, we're going to jump straight into 3D CAD to design an initial puzzle cube prototype.
        </p>
        <div className="rounded-2xl overflow-hidden bg-black">
          <video src={VIDEO_TINKERCAD} controls preload="metadata" className="w-full" title="Puzzle Cube Tinkercad Tutorial" />
        </div>
        <div className="space-y-3">
          <p className="font-poppins font-bold text-sm text-foreground">Tinkercad Tutorial — Step by Step</p>
          <ol className="space-y-2.5">
            {[
              "Duplicate the box shape to create a copy on top of the original. Hold down Shift, then click and drag the copied box to the right by 10mm. Holding Shift keeps the movement along the horizontal plane.",
              "Click Duplicate again — a new box is created and already moved 10mm to the right. Drag a selection box over the three cubes and click Duplicate. Move the duplicated boxes across by 10mm, then click Duplicate again to create another row.",
              "Highlight all nine cubes, click Duplicate, and move the duplicated boxes upwards by 10mm. Click Duplicate once more to create the last row of boxes — you'll now have 27 cubes.",
              "Combine the cubes into separate puzzle pieces. Move the cubes to the center of the work plane. To make a piece, hold Shift and click different cubes to select them. Each piece should be 4–10 cubes with adjoining faces. Don't copy this tutorial — make yours unique.",
              "Once you've selected your chosen cubes, move them to one side. Repeat for each piece until you have around 5–6 pieces total.",
              "Highlight each piece and make it a group. Save the design and make a copy of it — this copy can help when putting your puzzle together. Click the Tinkercad icon to go to your designs; the design saves automatically. Make a copy via the Settings icon → Duplicate.",
              "Rotate and move the pieces so they're suitable for 3D printing — no overhangs and each piece touching the print bed. If a piece has an overhang, rotate it by dragging the double-ended arrow, then move it down to the work plane by dragging the single arrow until it reads zero (or press D).",
              "Repeat for each piece and move them close together to fit on your print bed. You can now export a 3D printable STL file.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </Card>

      {/* Iteration */}
      <div className="space-y-4">
        <Card className="p-6 border-orange-200 bg-orange-50/40 shadow-sm">
          <h2 className="font-poppins font-bold text-lg text-foreground mb-2">Iteration</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            With your initial prototype manufactured, let's go through the iteration phase! Follow the below steps, which will guide you through various activities and challenges to complete the project.
          </p>
        </Card>

        <IterationStep
          num={1}
          title="Test"
          img={IMG_TEST}
          desc="Try and assemble your puzzle cube. Depending on the composition of your pieces, you might find that your puzzle doesn't fit together to form a perfect cube. Take note of what pieces didn't fit."
        />
        <IterationStep
          num={2}
          title="Tolerance"
          video={VIDEO_TOLERANCE}
          desc="If pieces didn't fit like they should, it's likely down to something called tolerance and this relates to the accuracy of your 3D printer. Watch the below video to learn more about tolerance."
        />
        <IterationStep
          num={3}
          title="Modify"
          img={IMG_MODIFY}
          desc="Go back to your 3D CAD model and make small adjustments based on what you have learnt about tolerance. Remember that you don't need to reprint the entire puzzle, just the pieces that required adjusting."
        />
        <IterationStep
          num={4}
          title="Design Case"
          img={IMG_DESIGN_CASE}
          desc="Before you 3D print your modifications, use your knowledge of tolerance to design a case for the puzzle pieces. Try to design something that holds all the pieces safely and securely."
        />
        <IterationStep
          num={5}
          title="3D Print"
          img={IMG_3D_PRINT}
          desc="With your modifications and case complete, bring your final design to life with 3D printing. Again, remember to orientate pieces optimally, reducing or eliminating overhangs where possible."
        />
        <IterationStep
          num={6}
          title="Instructional Diagrams"
          img={IMG_DIAGRAMS}
          desc="In the final step, we're challenging you to create a set of instructional diagrams to show people how to assemble the puzzle. Think of it like an answer sheet. Take a look at the instructions for the Isometric Drawing method and see if you can create your instructional diagrams in this format using the template provided."
        />
      </div>

      {/* Project Portfolio */}
      <Section title="Project Portfolio" icon="📁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The project will guide you in documenting your design process in a Google Slide portfolio format. The template portfolio can be accessed here. Simply create a copy of it and follow the guidance at the bottom of each project section to fill in the details. The template portfolio acts as a starting point and we encourage you to adapt the styling and content to your needs. Alternatively, feel free to create a portfolio from scratch in a software of your choice.
        </p>
        <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
          <Button className="w-full rounded-xl gap-2 bg-orange-500 hover:bg-orange-600 text-white">
            <ExternalLink size={14} /> Open Portfolio Template
          </Button>
        </a>
      </Section>

      {/* Key Learning */}
      <Card className="p-5 border-orange-200 bg-orange-50/50 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-2 text-orange-800">🔑 Key Learning</h3>
        <p className="text-xs text-orange-700 leading-relaxed">
          This project helps learners understand how separate parts can be designed to fit together. It teaches basic CAD modeling, 3D printing, tolerance, prototyping, testing, iteration, case design, and technical communication using isometric diagrams.
        </p>
      </Card>
    </div>
  );
}