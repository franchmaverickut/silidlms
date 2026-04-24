import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronDown, ChevronUp, Play, ExternalLink, Clock, Layers, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/4dc8cba41_EmojiTokenCover.png";
const IMG_GROUP_VOTING = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/cd5e84e38_groupvotingjpg.png";
const IMG_END_USER = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/529018f00_EndUserFeedbackjpg.png";
const IMG_PERSONAL = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/c582859c2_ExpressingPersonalFeelingsjpg.png";
const IMG_INSTRUCTOR = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/becfe3c3c_InstructorFeedbackjpg.png";
const IMG_REACTIONS = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/98633a912_ReactionstoInformationjpg.png";
const IMG_COMMUNICATION = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/b57e77157_CommunicationTooljpg.png";
const IMG_STEP1 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/d4e1c5dd3_STEP1DefineBriefjpg.png";
const IMG_STEP2 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/82cf05858_Step2Feedback.png";
const IMG_STEP3 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/128738b10_STEP3-3DCAD3DPrint.png";
const IMG_STEP4 = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/18dcd4486_STEP4-Use.png";

const PORTFOLIO_URL = "https://docs.google.com/presentation/d/1MwPTeClDyl_uXPpKisTIxu1HIAhkJGHwmh4Ksf4sfZI/edit?slide=id.g1c4697c0878_0_68#slide=id.g1c4697c0878_0_68";
const TUTORIAL_VIDEO = "https://youtu.be/KQrX50B5oe0";

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

function UseCard({ img, title, desc }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-border/40 shadow-sm">
      <img src={img} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="font-poppins font-bold text-sm text-foreground mb-1">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function StepCard({ num, img, title, desc, extra }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border/40">
        <span className="w-7 h-7 rounded-full bg-yellow-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
        <span className="font-poppins font-bold text-sm text-foreground">{title}</span>
      </div>
      <div className="p-5 space-y-3">
        <img src={img} alt={title} className="w-full rounded-xl object-cover max-h-64" />
        <p className="text-sm text-foreground/80 leading-relaxed">{desc}</p>
        {extra}
      </div>
    </div>
  );
}

export default function EmojiTokensProject() {
  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-6">
      {/* Back */}
      <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ChevronLeft size={16} /> Back to Maker Lessons
      </Link>

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[300px] shadow-xl">
        <img src={COVER_IMG} alt="Emoji Tokens" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">STEM</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Basic</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Emoji Tokens</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            Design and 3D print emoji tokens to use in a feedback or communication system of your choice.
          </p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> ~3 hours (excl. print time)</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> Min. 6 emoji tokens</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Intro */}
      <Card className="p-6 border-border/60 shadow-sm">
        <p className="text-sm text-foreground/80 leading-relaxed">
          In this project, you'll be designing and making 3D printed emoji tokens to use in a chosen feedback/communication system. After learning about emoji tokens, you'll define a brief and use for emoji tokens in your local community. You'll then move through the creative process to generate ideas before bringing them to life with 3D printing technology.
        </p>
        <p className="text-xs text-muted-foreground mt-3 italic">
          * This project guides you through the design process using a series of design methods. If you'd like to adapt the project or challenge yourself to take an alternative approach, feel free to select different methods from the Design Method Toolkit.
        </p>
      </Card>

      {/* Criteria + Constraints */}
      <Section title="Criteria + Constraints" icon="✅" defaultOpen={false}>
        <ul className="space-y-2">
          {[
            "You must define a brief that improves the experience of an activity using emoji tokens.",
            "You must design a minimum of 6 different emoji tokens for your feedback system.",
            "You must create a key/set of instructions to inform users how to use the emoji token feedback system.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="text-yellow-500 font-bold flex-shrink-0">→</span> {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Project Info */}
      <Section title="Project Overview" icon="📋" defaultOpen={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: "⭐", label: "Project Difficulty", text: "Basic — suitable for all those who have foundational skills in 3D design and 3D printing." },
            { icon: "🕐", label: "Project Length", text: "~3 hours (excl. 3D printing time). Recommend 3 × 1 hour sessions to allow printing between sessions." },
            { icon: "💻", label: "Equipment", text: "Laptop/computer with Tinkercad or Fusion 360 (both free for education). Google Slides for portfolio. Access to a 3D printer." },
            { icon: "📁", label: "Project Portfolio", text: "Document your design process in a Google Slides portfolio. Use the template to get started." },
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
          <Button className="rounded-xl gap-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm">
            <ExternalLink size={14} /> Open Portfolio Template
          </Button>
        </a>
      </Section>

      {/* Benefits + Uses */}
      <Section title="Benefits + Uses" icon="💡" defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In recent times, the use of emojis have grown exponentially. They allow people to express feelings and emotions — sometimes better than words. In group settings, they allow people to communicate with an equal voice. And they're fun and engaging! Here are some real-world applications:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UseCard img={IMG_GROUP_VOTING} title="Group Voting" desc="When developing ideas in teams, use emoji tokens to vote using emotions rather than just yes/no — providing deeper insights and discussion." />
          <UseCard img={IMG_END_USER} title="End User Feedback" desc="Use emoji tokens with potential end users to deliver feedback on tangible prototypes, providing deeper insights to help improve solutions." />
          <UseCard img={IMG_PERSONAL} title="Expressing Personal Feelings" desc="Emoji tokens let people convey feelings without vocalising their thoughts — for example, as mental health checks at schools and organisations." />
          <UseCard img={IMG_INSTRUCTOR} title="Instructor Feedback" desc="Collect meaningful feedback from class or coaching participants. Emoji tokens provide richer insights than basic numbered surveys." />
          <UseCard img={IMG_REACTIONS} title="Reactions to Information" desc="Use as a reaction tool to news, research, or informative content — such as opinions on a newsletter article or global news." />
          <UseCard img={IMG_COMMUNICATION} title="Communication Tool" desc="String together multiple tokens to communicate — particularly helpful for people with various disabilities." />
        </div>
      </Section>

      {/* Skill Building */}
      <Section title="Skill Building — Tinkercad Tutorial" icon="🖥️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          Follow this tutorial to design example emoji tokens in Tinkercad, building the 3D CAD skills you'll need for your own unique tokens. Choose your preferred learning format — video or text-based instructions.
        </p>
        <div className="rounded-2xl overflow-hidden aspect-video bg-black">
          <iframe
            src="https://www.youtube.com/embed/KQrX50B5oe0?origin=https://base44.app"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            title="Emoji Tokens Tinkercad Tutorial"
          />
        </div>
        <a href={TUTORIAL_VIDEO} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-xl gap-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm">
            <Play size={14} /> Watch on YouTube
          </Button>
        </a>
      </Section>

      {/* Design Process */}
      <Section title="Design Process — Icon Sketching" icon="🔄" defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Now it's time to design and make your own unique set of emoji tokens! The key idea generation activity is called <strong>icon sketching</strong> — a simple activity to generate a large number of ideas quickly, aiming for quantity over quality.
        </p>
        <p className="text-xs text-muted-foreground italic">
          * The following instructions are just one of many ways to approach the design process. Feel free to explore the Design Method Toolkit and use different methods.
        </p>
        <div className="space-y-4">
          <StepCard
            num="1"
            img={IMG_STEP1}
            title="Define Brief"
            desc="Identify a use for emoji tokens and map out some design criteria. Look to the 'Uses' section for inspiration, then see where examples could be applied in your local community. Brainstorm multiple ideas before narrowing down to a key idea. Write down criteria: what types of emojis, how many, any specific design features?"
          />
          <StepCard
            num="2"
            img={IMG_STEP2}
            title="Icon Sketching"
            desc="With a key idea in place, start generating ideas. Download the icon sketching template and print multiple copies. Draw as many emoji token ideas as possible, with a brief description next to each. Keep details minimal — spend around 15 minutes total."
            extra={
              <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs">
                Download Template
              </Button>
            }
          />
          <StepCard
            num="3"
            img={IMG_STEP3}
            title="3D CAD + 3D Print"
            desc="Review your design options and narrow them down to a final set. Keep a good balance — enough variety without overwhelming users. Use 3D CAD and 3D printing to make them. Refer back to the Skill Building section if needed when 3D modelling."
          />
          <StepCard
            num="4"
            img={IMG_STEP4}
            title="Use"
            desc="Create a key/set of instructions for people using your emoji tokens. Put them to use in the world and see if they improve the experience of your chosen activity. You could even use emoji tokens to collect feedback on the system you created!"
          />
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
            { slide: "Slide 2 — Emoji Tokens", items: ["Write a paragraph about additional benefits and potential uses of emoji tokens."] },
            { slide: "Slide 3 — Defining the Brief", items: ["Write a paragraph about your brief, including the activity chosen, why tokens will improve it, and your criteria.", "Insert example images of the activity."] },
            { slide: "Slide 4 — Idea Generation", items: ["Write about your idea generation process, the emojis chosen and their design.", "Insert images of your icon sketches."] },
            { slide: "Slide 5 — Design Process", items: ["Write about transforming icon sketches into 3D printed tokens.", "Insert relevant design process images."] },
            { slide: "Slide 6 — The Final Solution", items: ["Write about your emoji tokens in action — how they were used, if they helped, and potential improvements.", "Insert final images showcasing your emoji tokens in use."] },
          ].map((section, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/40">
              <p className="font-poppins font-bold text-xs text-yellow-600 mb-2">{section.slide}</p>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-xs text-muted-foreground">
                    <span className="text-yellow-500 flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
          <Button className="w-full rounded-xl gap-2 bg-yellow-500 hover:bg-yellow-600 text-white">
            <ExternalLink size={14} /> Open Portfolio Template in Google Slides
          </Button>
        </a>
      </Section>
    </div>
  );
}