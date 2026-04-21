import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Play, Download,
  ExternalLink, Clock, Layers, Star, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/a7884a6b9_SpinningTopscover.png";
const IMG_TIP = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/ea1807891_tipsize.png";
const IMG_SPAN = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/de393d304_span.png";
const IMG_BODY = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/5bf9ecb2b_BodyShape.png";
const IMG_FLYWHEEL = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/ad4b6e612_FlywheelPositioning.png";
const IMG_HANDLE = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/b5dd6611c_HandleDesign.png";
const IMG_MASS = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/34bbd4a96_Hmassdistribution.png";
const IMG_CHART = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/3a64a0781_spin-duration-chart-3-1660x934jpg.png";
const IMG_STEP1 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/ff534ae8f_step1diagram.png";
const IMG_STEP2 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/5a13f9c0d_step2basemodel.png";
const IMG_STEP3 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/0fae8ba23_step3featurevariation.png";
const IMG_STEP4 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/e0b5627c2_step43dcad.png";
const IMG_STEP5 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/cc871d7bf_step53dprinting.png";

const PORTFOLIO_URL = "https://docs.google.com/presentation/d/12wbyQ3o5kfmlh-J-ym5JcgduyLdIZHApZB5FXp9pCkE/edit?slide=id.g181c2cac75a_1_88#slide=id.g181c2cac75a_1_88";
const STL_URL = "https://drive.google.com/open?id=1IWmE_Y7JxPqkin3j0zmLIsSca1-mij1i&usp=drive_fs";
const SCALE_DRAWING_URL = "https://drive.google.com/open?id=16JA9wWJLH1riqN-6qDXr2sYXxhiCdLXy&usp=drive_fs";
const TINKERCAD_VIDEO = "https://youtu.be/QxMQbzMihzA";

function Section({ title, icon, children, defaultOpen = true, accent = "#7C3AED" }) {
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

function DesignCard({ img, title, desc }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-muted/40 border border-border/40">
      <img src={img} alt={title} className="w-24 h-20 object-cover rounded-lg flex-shrink-0" />
      <div>
        <p className="font-poppins font-bold text-sm text-foreground mb-1">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function StepCard({ num, img, title, desc, downloads, links }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
        <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
        <span className="font-poppins font-bold text-sm text-foreground">{title}</span>
      </div>
      <div className="p-5 space-y-3">
        {img && (
          <img src={img} alt={title} className="w-full rounded-xl object-cover max-h-64" />
        )}
        <p className="text-sm text-foreground/80 leading-relaxed">{desc}</p>
        {downloads && downloads.map((d, i) => (
          <a key={i} href={d.url} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs mt-1">
              <Download size={12} /> {d.label}
            </Button>
          </a>
        ))}
        {links && links.map((l, i) => (
          <a key={i} href={l.url} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="rounded-xl gap-1.5 text-xs mt-1 bg-purple-600 hover:bg-purple-700 text-white">
              <ExternalLink size={12} /> {l.label}
            </Button>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SpinningTopsProject() {
  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-6">
      {/* Back */}
      <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ChevronLeft size={16} /> Back to Maker Lessons
      </Link>

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[300px] shadow-xl">
        <img src={COVER_IMG} alt="Spinning Tops" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">STEM</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Basic</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Spinning Tops</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">Design and 3D print a spinning top that spins for as long as possible!</p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> 4 hours (excl. print time)</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 3 prototypes + 1 iteration</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Intro Video */}
      <Card className="p-5 border-border/60 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-3 flex items-center gap-2">
          <Play size={15} className="text-purple-600" /> Intro Video
        </h3>
        <div className="rounded-2xl overflow-hidden aspect-video bg-black">
          <iframe
            src="https://www.youtube.com/embed/QxMQbzMihzA"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            title="Spinning Top Intro"
          />
        </div>
      </Card>

      {/* Project Info */}
      <Section title="Project Overview" icon="📋" defaultOpen={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Criteria & Constraints", icon: "✅", text: "The spinning top can be made up of a single component or multiple components but all must be entirely 3D printed." },
            { label: "Difficulty", icon: "⭐", text: "Basic — suitable for all those with foundational skills in 3D design and 3D printing." },
            { label: "Project Length", icon: "🕐", text: "~4 hours (excl. 3D printing time). Includes 3 prototypes + 1 improved version. Recommend 4 × 1 hour sessions." },
            { label: "Project Portfolio", icon: "📁", text: "Document your design process in a Google Slides portfolio. Use the template below as a starting point." },
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
        <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-xl gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm">
            <ExternalLink size={14} /> Open Portfolio Template
          </Button>
        </a>
      </Section>

      {/* Design Considerations */}
      <Section title="Design Considerations" icon="🔬" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          The physics behind spinning tops is actually very complex! Rather than delving too deep into the science, this project is more focused on learning by making. You'll make initial design decisions, test them, and then improve through an iterative process.
        </p>
        <div className="space-y-3">
          <DesignCard img={IMG_TIP} title="Tip Size" desc="Will your spinning top spin on a tiny sharp tip or more of a blunt tip? A sharp tip will cause much less friction but could it affect the top's stability and augment the precession phase?" />
          <DesignCard img={IMG_SPAN} title="Span" desc="How wide will the body of the spinning top span? A bigger span might encourage a stable, long spin but will the increased mass allow you to apply enough spinning force with your fingers?" />
          <DesignCard img={IMG_BODY} title="Body Shape" desc="Air resistance does play a part in slowing the top. Consider how you can streamline features to reduce drag." />
          <DesignCard img={IMG_FLYWHEEL} title="Flywheel Positioning" desc="The widest part is often referred to as the flywheel. Keeping it close to the tip ensures a solid low centre of gravity. However, if you don't launch on a vertical axis, the flywheel may touch the surface — bringing the top to a quick stop." />
          <DesignCard img={IMG_HANDLE} title="Handle Design" desc="The handle (or stem) is key to getting a good spin. If too small, you won't get a good grip. If too large, it may affect stability. Consider including a textured surface to enhance grip." />
          <DesignCard img={IMG_MASS} title="Mass Distribution" desc="The best spinning tops have equal distribution of mass around the central spinning axis. Ensure your design is symmetrical and avoid large decorative features that might add to the tilting effect." />
        </div>
      </Section>

      {/* Tinkercad Tutorial */}
      <Section title="Tinkercad Tutorial — Build the Example Model" icon="🖥️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Follow this step-by-step tutorial to design a spinning top in Tinkercad. Select either the video or the text-based instructions — pick your preferred method of learning.
        </p>
        <div className="rounded-2xl overflow-hidden aspect-video bg-black">
          <iframe
            src="https://www.youtube.com/embed/QxMQbzMihzA"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            title="Tinkercad Tutorial"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={STL_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="rounded-xl gap-2 text-sm">
              <Download size={14} /> Download Example STL File
            </Button>
          </a>
          <a href={TINKERCAD_VIDEO} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-xl gap-2 text-sm bg-purple-600 hover:bg-purple-700 text-white">
              <Play size={14} /> Watch on YouTube
            </Button>
          </a>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800"><span className="font-bold">💡 Tip:</span> Even though the spinning top will be printed upside down, the surface area touching the print bed will still be small. If you have problems with bed adhesion, try using an adhesive on the bed or using a raft/brim in your slicing software.</p>
        </div>
      </Section>

      {/* Product Analysis / Testing */}
      <Section title="Product Analysis & Testing" icon="📊" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          When you have your completed 3D print, test the spinning top using the <strong>Quantifiable Testing method</strong> — run a test that measures the performance of a product/prototype in a quantifiable way.
        </p>
        <img src={IMG_CHART} alt="Spin Duration Chart" className="w-full rounded-xl object-cover" />
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-blue-800 leading-relaxed">In addition to gathering data from your testing method, ensure you make notes on experiential and visual insights too. For example, how easy was the spinning top to grip? Did the top spin on a vertical axis?</p>
        </div>
        <div className="space-y-2">
          <p className="font-poppins font-bold text-sm text-foreground">Portfolio — Product Analysis Slide</p>
          {[
            "Log your test results by inputting the results into the chart. Feel free to amend the chart to suit the tests you ran.",
            "Write a paragraph about your product testing and analysis. Include information about how you ran the test and what insights you gained.",
            "Include an image or video of the product analysis phase.",
          ].map((item, i) => (
            <div key={i} className="flex gap-2.5 text-xs text-muted-foreground">
              <span className="text-purple-600 font-bold flex-shrink-0">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Feature Variation Models — Design Process */}
      <Section title="Feature Variation Models — Design Process" icon="🔄" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Use your insights from product analysis to drive the design of a unique spinning top. The main activity is called <strong>Feature Variation Models</strong> — make and test multiple prototypes simultaneously to explore a specific design feature.
        </p>
        <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-xl border border-border/40">
          Make each model the same with the exception of 1 design feature, which is varied across the models. By making, testing and analysing multiple models at the same time, you save time and come to a decision on how best to design the feature you're exploring.
        </p>

        <div className="space-y-4">
          <StepCard
            num="1"
            img={IMG_STEP1}
            title="Example Model Diagram"
            desc="Before you begin designing your own unique model, take a look at this scale drawing of the example spinning top you analysed in the previous section. Keep the drawing on hand as you move through the steps."
            downloads={[{ label: "Download Scale Drawing", url: SCALE_DRAWING_URL }]}
          />
          <StepCard
            num="2"
            img={IMG_STEP2}
            title="Base Model"
            desc="Think carefully about what changes you'd make to the example spinning top to try and make it spin for a longer duration. Use everything you've learnt so far to drive your decisions. Create a basic drawing of your idea and annotate it with dimensions and notes."
          />
          <StepCard
            num="3"
            img={IMG_STEP3}
            title="Feature Variations"
            desc="Consider 1 feature of the design that you'd like to experiment with. In the example, we're experimenting with the shape of the body but keeping the handle and tip the same. Generate 2 additional sketches/diagrams showing different options for this feature."
          />
          <StepCard
            num="4"
            img={IMG_STEP4}
            title="3D CAD"
            desc="Generate 3D CAD models of your 3 feature variation ideas. Pay particular attention to their 3D printability — can they be oriented to minimise overhangs? Do the models have enough surface area to adhere to the print bed? Don't be afraid to modify and evolve your designs from your sketches."
          />
          <StepCard
            num="5"
            img={IMG_STEP5}
            title="3D Printing"
            desc="3D print your designs. With spinning tops generally being small in scale, you should be able to 3D print all your feature variation models at once."
          />
          <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
              <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">6</span>
              <span className="font-poppins font-bold text-sm text-foreground">Test + Iterate</span>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm text-foreground/80 leading-relaxed">
                Take your 3D printed models and go through the quantifiable testing method again to analyse them. Select the most successful design and think about how you could improve this even more. Then generate 1 iteration of this as your final solution!
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                <p className="text-xs text-purple-800 font-semibold mb-1">Quantifiable Testing Method</p>
                <p className="text-xs text-purple-700">Spin each top 3 times, record the spin duration each time, and calculate the average. Compare results across all feature variation models to identify the best design.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Portfolio Guide */}
      <Section title="Project Portfolio Guide" icon="📁" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          The project will guide you in documenting your design process in a Google Slides portfolio format.
        </p>
        <div className="space-y-3">
          {[
            { slide: "Title Slide", items: ["Enter your full name and the date.", "Go to 'File > Make a Copy' before editing."] },
            { slide: "Inspiration Collage", items: ["Create a collage of spinning top images from an online image search — include a wide variety of shapes and sizes."] },
            { slide: "Design Considerations", items: ["Already completed for you. Feel free to reword the paragraph in the past tense."] },
            { slide: "Feature Variation Models", items: ["Write a paragraph about your idea generation process.", "Explain your initial base model and how it differed from the example.", "Describe what feature variations you explored.", "Include images of your sketches."] },
            { slide: "3D CAD & Printing", items: ["Write about your 3D CAD process and include a screenshot.", "If you made changes to your sketches, describe and explain them.", "Describe the 3D printing process and any challenges."] },
            { slide: "Feature Variation Results", items: ["Write a paragraph about each feature variation model.", "Include performance data from testing.", "Include images or videos for each one."] },
            { slide: "Final Solution", items: ["Explain which feature variation you chose and why.", "Describe what improvements you made.", "Talk about its performance and suggest further changes.", "Include 2 images/videos and a final high-resolution image."] },
          ].map((section, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/40">
              <p className="font-poppins font-bold text-xs text-purple-700 mb-2">{section.slide}</p>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="text-purple-500 flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
          <Button className="w-full rounded-xl gap-2 bg-purple-600 hover:bg-purple-700 text-white">
            <ExternalLink size={14} /> Open Portfolio Template in Google Slides
          </Button>
        </a>
      </Section>

      {/* Downloads */}
      <Card className="p-5 border-border/60 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-4 flex items-center gap-2">
          <Download size={15} className="text-purple-600" /> Downloads & Resources
        </h3>
        <div className="space-y-2">
          {[
            { label: "Example STL File", desc: "Use this if you had issues exporting from Tinkercad", url: STL_URL },
            { label: "Scale Drawing (PDF)", desc: "Scale drawing of the example spinning top with dimensions", url: SCALE_DRAWING_URL },
            { label: "Portfolio Template", desc: "Google Slides portfolio template to document your design process", url: PORTFOLIO_URL },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-muted/40 border border-border/40">
              <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Download size={15} className="text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
              </div>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs flex-shrink-0">
                  <ExternalLink size={12} /> Open
                </Button>
              </a>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}