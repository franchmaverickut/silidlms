import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Download, ExternalLink, Clock, Layers, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/b57596a03_BalloonDragsters.png";
const OVERVIEW_VIDEO = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/680a707f9_BalloonDragster-ExplainerVideo.mp4";
const TINKERCAD_VIDEO = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/937619357_BalloonPoweredDragster-TinkercadTutorial-VoiceOver.mp4";
const PIPE_STL_DOWNLOAD = "https://media.base44.com/files/public/69d386ad9523e2ce04536574/e97a3702c_Balloon-Dragster-Pipe.zip";
const FEATURE_ITERATION_TEMPLATE = "https://media.base44.com/files/public/69d386ad9523e2ce04536574/61c9a7a98_Feature-Iteration-Diagram.pdf";
const PORTFOLIO_URL = "https://docs.google.com/presentation/d/15L_eqd4ChWpcoW2yxvC_tvNQNMXXs3lQFhtsVXx-bJ0/edit?slide=id.g1c4697c0878_0_68#slide=id.g1c4697c0878_0_68";

const IMG_MASS = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/3ea6776f1_Mass.jpg";
const IMG_AIR_RESISTANCE = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/6c3a53c88_AirResistance.jpg";
const IMG_FRICTION = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9b2bbb69b_Friction.jpg";
const IMG_AIR_PIPE = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/7c7cd4c32_AirPipeDiameter.jpg";
const IMG_BALLOON_CONNECTOR = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/ac28e2ecb_BalloonConnector.jpg";
const IMG_CLEARANCE = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/b13b61203_Clearance.jpg";

const DESIGN_CONSIDERATIONS = [
  { title: "Mass", image: IMG_MASS, desc: "A dragster with more mass will require more force to propel the wheels on a flat surface. Reducing the mass will increase its acceleration and ability to travel further." },
  { title: "Air Resistance", image: IMG_AIR_RESISTANCE, desc: "If the front faces of the dragster have large surface area, it will incur increased air resistance and will slow down quicker. Experiment with angled and curved surfaces to reduce drag." },
  { title: "Friction", image: IMG_FRICTION, desc: "Wheels with less surface area will decrease the amount of friction applied to the dragster when in motion. However, reducing the surface area may affect the dragster's ability to travel in a straight line." },
  { title: "Air Pipe Diameter", image: IMG_AIR_PIPE, desc: "Experimenting with different air pipe diameters can help you improve the amount and duration of thrust. When doing so, ensure the rear outlet is pointing straight back and not at an angle." },
  { title: "Balloon Connector", image: IMG_BALLOON_CONNECTOR, desc: "Ensure your connector is big enough for the balloon to fit around tightly without air gaps, but not too big that it significantly increases the mass of the overall dragster." },
  { title: "Clearance", image: IMG_CLEARANCE, desc: "Clearance (the gap between 2 joining parts) needs to be considered to ensure axles have a tight fit with the wheels, and to ensure the axles can turn freely within the chassis." },
];

const IMG_STEP1 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/d8f639352_STEP1-NumberedDiagram.jpg";
const IMG_STEP2 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/cccdfc114_STEP2-FeatureDiagrams.jpg";
const VIDEO_STEP3 = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/9855858a7_STEP3-Test.mp4";
const IMG_STEP4 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/394cb2200_STEP4-FeedbackNotes.jpg";
const IMG_STEP5 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/ec73101fe_STEP5-IterationDiagrams.jpg";
const IMG_STEP6 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/23b23aabd_STEP6-Repeat.jpg";

const FID_STEP1_EXAMPLE = "https://media.base44.com/files/public/69d386ad9523e2ce04536574/e7473dfa9_Feature-Iteration-Diagrams-Step-1-Example.pdf";
const FID_STEP2_EXAMPLE = "https://media.base44.com/files/public/69d386ad9523e2ce04536574/271c3ee82_Feature-Iteration-Diagrams-Step-2-Example.pdf";
const FID_STEP4_EXAMPLE = "https://media.base44.com/files/public/69d386ad9523e2ce04536574/22cb1f674_Feature-Iteration-Diagrams-Step-4-Example.pdf";

const FEATURE_STEPS = [
  { num: 1, title: "Numbered Diagram", image: IMG_STEP1, desc: "Using the template provided above, create a numbered diagram of your initial prototype that lists out the key features. This might be a simple 2D or 3D diagram. Check out the example below to guide you.", exampleUrl: FID_STEP1_EXAMPLE },
  { num: 2, title: "Feature Diagrams", image: IMG_STEP2, desc: "Create a separate diagram of each numbered feature in the 'Iteration 1' column, which provides further details into its form and composition. Annotate each diagram with dimensions and notes. This might involve heading back into your CAD design to figure out specific measurements.", exampleUrl: FID_STEP2_EXAMPLE },
  { num: 3, title: "Test", video: VIDEO_STEP3, desc: "Test your initial prototype by measuring the straight line distance it can travel. We recommend doing 3 tests and using the best result. When testing, ensure you identify a straight line path you'd like the dragster to follow. When measuring the distance travelled, measure along the straight line path to the point that the dragster is in line with." },
  { num: 4, title: "Feedback Notes", image: IMG_STEP4, desc: "Once tested, write down both the best distance travelled and your key learnings in the 'feedback notes' section of the template. Try to include feedback based on your goal. For example, it wouldn't make sense to mention the aesthetics of the dragster for this project.", exampleUrl: FID_STEP4_EXAMPLE },
  { num: 5, title: "Iteration Diagrams", image: IMG_STEP5, desc: "Go through your features and think carefully about what could be changed to increase the straight line distance travelled. It's important to note that you don't need to change everything – even minor changes to 1 or 2 features can have a great impact. Create new diagrams in the 'Iteration 2' column to show the changes. Then use the diagrams as a foundation to build your new and improved prototype." },
  { num: 6, title: "Repeat", image: IMG_STEP6, desc: "When you have 3D printed 'Iteration 2', repeat steps 3-5 again to bring your final model to life. Depending on the time you have available, you can continue developing further iterations to see how far you can get the dragster to go!" },
];

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

function PortfolioTask({ children }) {
  return (
    <div className="p-4 rounded-xl bg-muted/40 border border-border/40 space-y-2">
      {children}
    </div>
  );
}

export default function BalloonDragstersProject({ isPublic = false }) {
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
        <img src={COVER_IMG} alt="Balloon Dragsters" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">STEM</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Basic</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Balloon Dragsters</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            In this project, you'll be designing and making a 3D printed balloon dragster, with the aim of making it travel as far as possible in a straight line. After analysing an example model, you'll follow tutorials to design your own unique dragster, which will be tested and improved through an iterative process. Watch the intro video below and browse through the project sections to learn more about the journey.
          </p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> 4 hours (excl. print time)</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 1 dragster + 2 improved versions</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Overview Video */}
      <Card className="p-6 border-border/60 shadow-sm space-y-4">
        <h2 className="font-poppins font-bold text-lg text-foreground">Overview Video</h2>
        <div className="rounded-2xl overflow-hidden bg-black">
          <video src={OVERVIEW_VIDEO} controls preload="metadata" className="w-full" title="Balloon Dragster overview video" />
        </div>
      </Card>

      {/* Criteria + Constraints */}
      <Section title="Criteria + Constraints" icon="✅" defaultOpen={false}>
        <ul className="space-y-3">
          {[
            "The dragster must be made up of 3D printed components only, with the exception of axles, which can be made up of another material.",
            "The dragster must be powered by an individual balloon.",
            "The dragster should be tested on the same flat surface throughout the project.",
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
              <span className="text-red-500 font-bold flex-shrink-0 mt-0.5">•</span> {item}
            </li>
          ))}
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
          The estimated project length is 4 hours, excluding any 3D printing time. This estimate includes designing and making an initial dragster plus time for testing and creating 2 improved versions. The project can be run in longer or shorter periods of time depending on the number of iterations you choose to make. We recommend breaking the project up into multiple sessions (e.g. 4 x 1 hour sessions), which will allow you to 3D print necessary objects between sessions.
        </p>
      </Section>

      {/* Equipment Required */}
      <Section title="Equipment Required" icon="🧰" defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">To participate in this project, you will require:</p>
        <ul className="space-y-2.5">
          {[
            "A laptop or computer with either Tinkercad or Fusion 360 software (both free for educational and personal use).",
            "A software or web application to create a digital portfolio. We recommend using Google Slides as we provide a portfolio template in this format.",
            "Access to a 3D printer and 3D printing material.",
            "A balloon.",
            "A device to measure distance travelled (e.g. tape measure).",
            "Pen/pencil and paper.",
            "A device to capture images of your design process to insert into the project portfolio.",
          ].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
              <span className="text-red-500 font-bold flex-shrink-0 mt-0.5">•</span> {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Project Portfolio - template */}
      <Section title="Project Portfolio" icon="📁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The project will guide you in documenting your design process in a Google Slide portfolio format. The template portfolio can be accessed here. Simply create a copy of it and follow the guidance at the bottom of each project section to fill in the details. The template portfolio acts as a starting point and we encourage you to adapt the styling and content to your needs. Alternatively, feel free to create a portfolio from scratch in a software of your choice.
        </p>
        <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
          <Button className="w-full rounded-xl gap-2 bg-red-500 hover:bg-red-600 text-white">
            <ExternalLink size={14} /> Open Portfolio Template
          </Button>
        </a>
      </Section>

      {/* Design Consideration */}
      <Card className="p-6 border-border/60 shadow-sm space-y-4">
        <h2 className="font-poppins font-bold text-lg text-foreground">Design Consideration</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Before we begin designing, let's take a look at some design considerations for balloon dragsters. Browse through the content below and feel free to refer back to it at any point for guidance.
        </p>
        <div className="space-y-4">
          {DESIGN_CONSIDERATIONS.map((item, i) => (
            <div key={i} className="rounded-2xl border border-border/60 overflow-hidden shadow-sm sm:flex">
              <img src={item.image} alt={item.title} className="w-full sm:w-56 h-48 sm:h-auto object-cover flex-shrink-0" />
              <div className="p-5 space-y-1.5">
                <p className="font-poppins font-bold text-sm text-foreground">{item.title}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Project Portfolio - slide 3 */}
      <Section title="Project Portfolio" icon="📁" defaultOpen={false}>
        <PortfolioTask>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Open up the project portfolio and enter your full name and the date on the title slide. If you haven't already done so, you will need to go to 'File &gt; Make a Copy' before you can begin editing the portfolio.
          </p>
        </PortfolioTask>
        <PortfolioTask>
          <p className="text-sm text-foreground/80 leading-relaxed">
            On slide 3 (How Balloon Dragsters Work), write a paragraph about how balloon dragsters work and forces that act upon the dragster whilst travelling. You may wish to summarise the content from the learning platform but also consider doing additional research and mentioning additional insights.
          </p>
        </PortfolioTask>
      </Section>

      {/* Skill Building */}
      <Card className="p-6 border-border/60 shadow-sm space-y-4">
        <h2 className="font-poppins font-bold text-lg text-foreground">Skill Building</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We're now going to go through a tutorial to design a basic balloon dragster. This is going to act as the starting point of your own unique design! Select either the Tinkercad or Fusion 360 tutorial below and follow it to design the example balloon dragster. If you are using the Tinkercad tutorial, you will require this STL file to import into the design. There are options for both voice over instructions and text-based instructions so simply pick your preferred method of learning.
        </p>
        <a href={PIPE_STL_DOWNLOAD} download className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">
          <Download size={15} /> Download Balloon Dragster Pipe STL
        </a>
        <div className="space-y-3 pt-2">
          <p className="font-poppins font-bold text-sm text-foreground flex items-center gap-2">
            <span className="text-base">🖥️</span> TinkerCad Video
          </p>
          <div className="rounded-2xl overflow-hidden bg-black">
            <video src={TINKERCAD_VIDEO} controls preload="metadata" className="w-full" title="Balloon Powered Dragster Tinkercad Tutorial" />
          </div>
        </div>
      </Card>

      {/* Feature Iteration */}
      <Card className="p-6 border-red-200 bg-red-50/40 shadow-sm space-y-4">
        <h2 className="font-poppins font-bold text-lg text-foreground">Feature Iteration</h2>
        <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
          <p>
            Now that you've created your initial prototype, it's time to test and improve it through an iterative process – in view of getting the dragster to travel as far as possible in a straight line. To do this, we'll be using a design method called 'Feature Iteration Diagrams', which is a simple method to plan out product improvements.
          </p>
          <p>
            The process involves creating basic diagrams of the various features that make up your prototype. Once your prototype has been tested, a new set of diagrams are created showing changes and improvements to be made. For each iteration, the process is repeated. Using basic visual diagrams encourages you to consider each key feature of your design – helping you to plan improvements in a simple, clear and effective way. Download and print out this template and then follow the below steps to complete the project!
          </p>
        </div>
        <a href={FEATURE_ITERATION_TEMPLATE} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-xl gap-2 bg-red-500 hover:bg-red-600 text-white text-sm">
            <Download size={14} /> Download Feature Iteration Template
          </Button>
        </a>
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          *The following instructions are just one of many ways in which you might approach the design process. If you'd like to adapt the project or challenge yourself to take an alternative approach, feel free to explore the Design Method Toolkit and use different methods to those stated in this project.
        </p>
      </Card>

      <div className="space-y-4">
        {FEATURE_STEPS.map((step) => (
          <div key={step.num} className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            {step.image && (
              <img src={step.image} alt={step.title} className="w-full object-cover max-h-80" />
            )}
            {step.video && (
              <div className="bg-black">
                <video src={step.video} controls preload="metadata" className="w-full" title={step.title} />
              </div>
            )}
            <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
              <span className="w-7 h-7 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{step.num}</span>
              <span className="font-poppins font-bold text-sm text-foreground">STEP {step.num}: {step.title}</span>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm text-foreground/80 leading-relaxed">{step.desc}</p>
              {step.exampleUrl && (
                <a href={step.exampleUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs">
                    <ExternalLink size={12} /> View Example
                  </Button>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Project Portfolio - slides 4-8 */}
      <Section title="Project Portfolio" icon="📁" defaultOpen={false}>
        <PortfolioTask>
          <p className="text-sm text-foreground/80 leading-relaxed">
            On Slide 4 (Initial Prototype), write a paragraph about your initial prototype. Talk about the process, what changes you made to the tutorial design, and why you made those changes. Then insert images of your initial prototype. This might include screenshots, photographs etc.
          </p>
        </PortfolioTask>
        <PortfolioTask>
          <p className="text-sm text-foreground/80 leading-relaxed">
            On Slide 5 (Feature Iterations), write a paragraph providing an overview of the feature iteration design method you went through. Include information about what the process involved but don't go into specific design details just yet – you'll be doing that in the next slide! Then insert an image of your feature iteration diagrams worksheet.
          </p>
        </PortfolioTask>
        <PortfolioTask>
          <p className="text-sm text-foreground/80 leading-relaxed">
            On Slide 6 (Iteration 1), write a paragraph about your first iteration. Include information about the features, design decisions you made and how it performed during testing. Then insert images of the design and 3D printed outcome.
          </p>
        </PortfolioTask>
        <PortfolioTask>
          <p className="text-sm text-foreground/80 leading-relaxed">
            On Slide 7 (Iteration 2), write a paragraph about your second iteration. Include information about the features, design decisions you made and how it performed during testing. Then insert images of the design and 3D printed outcome.
          </p>
        </PortfolioTask>
        <PortfolioTask>
          <p className="text-sm text-foreground/80 leading-relaxed">
            On Slide 8, insert a high quality image showcasing your final dragster model.
          </p>
        </PortfolioTask>
        <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
          <Button className="w-full rounded-xl gap-2 bg-red-500 hover:bg-red-600 text-white">
            <ExternalLink size={14} /> Open Portfolio Template
          </Button>
        </a>
      </Section>

      {/* Key Learning */}
      <Card className="p-5 border-red-200 bg-red-50/50 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-2 text-red-800">🔑 Key Learning</h3>
        <p className="text-xs text-red-700 leading-relaxed">
          This project teaches learners how forces, thrust, friction, air resistance, and mass affect motion. It also builds skills in CAD design, 3D printing, prototyping, testing, measurement, iteration, and STEM problem-solving.
        </p>
      </Card>
    </div>
  );
}