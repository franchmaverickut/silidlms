import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Download,
  ExternalLink, Clock, Layers, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/30d11a1c7_self-watering_planter.jpg";
const OVERVIEW_VIDEO = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/f776ba117_Self-WateringPlanter-Overview.mp4";
const PRINT_VIDEO = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/7adf629b4_self-watering-planter-3d-print.mp4";
const TINKERCAD_TUTORIAL_VIDEO = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/b3cb998b4_Self-WateringPlanter-TinkercadTutorial-VoiceOvermp4.mp4";
const DESIGN_CHALLENGES_PDF = "https://media.base44.com/files/public/69d386ad9523e2ce04536574/ffd84944a_Self-Watering-Planters-Design-Challenges.pdf";
const VISUAL_MONITORING_PDF = "https://media.base44.com/files/public/69d386ad9523e2ce04536574/9db324afd_Visual-Monitoring.pdf";
const PORTFOLIO_URL = "https://docs.google.com/presentation/d/1eFqo8krPka9FO8V3eG5NVHSoUr788_ZDncOy7XzbYtI/edit?usp=sharing";

const IMG = {
  plantFood: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/aa41107ff_self-watering-planter-plant-food.jpg",
  photosynthesisEquation: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/618819274_self-watering-planter-photosynthesis-equation.jpg",
  designChallenges: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9dbf33c3f_self-watering-planters-design-challenges.jpg",
  rootCharacteristics: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/3050f4bd2_self-watering-planter-root-characteristics.jpg",
  leafCharacteristics: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9cadb45f1_self-watering-planter-leaf-characteristics.jpg",
  glucoseOxygen: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/4a76191b6_self-watering-planter-glucose-oxygen.jpg",
  co2LightWater: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/7407d87c5_self-watering-planter-co2-light-water.jpg",
  planterBench: COVER_IMG,
};

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

function InfoCard({ icon, label, text }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-muted/40 border border-border/40">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div>
        <p className="font-poppins font-bold text-xs text-foreground mb-1">{label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function PhotosynthesisCard({ image, title, desc }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      {image && (
        <div className="bg-muted/20 p-4 flex items-center justify-center">
          <img src={image} alt={title} className="max-h-40 w-auto object-contain rounded-lg" />
        </div>
      )}
      <div className="p-4 space-y-1">
        <p className="font-poppins font-bold text-sm text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function PortfolioNote({ children }) {
  return (
    <div className="bg-muted/40 border border-border/40 rounded-xl p-4 space-y-2">
      <p className="font-poppins font-bold text-xs text-foreground">📁 Project Portfolio</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{children}</p>
      <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs">
          <ExternalLink size={12} /> Open Project Portfolio
        </Button>
      </a>
    </div>
  );
}

export default function SelfWateringPlantersProject({ isPublic = false }) {
  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-6">
      {!isPublic && (
        <Link to="/maker" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft size={16} /> Back to Maker Lessons
        </Link>
      )}

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden min-h-[300px] shadow-xl">
        <img src={COVER_IMG} alt="Self-Watering Planters" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">STEM</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Skill Building</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Self-Watering Planters</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">Design and make a 3D printed self-watering planter that helps plants receive consistent moisture over time.</p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> Skill Building + Design & Make</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 1 planter + design challenges</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Overview */}
      <Section title="Project Overview" icon="📋" defaultOpen={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard icon="✅" label="Criteria & Constraints" text="The planter must be 3D printable and designed to support plant growth. It should include a container system that stores water and supplies it to the plant when needed, reducing overwatering and supporting healthy roots." />
          <InfoCard icon="⭐" label="Difficulty" text="Basic — suitable for learners with foundational skills in 3D design and 3D printing." />
          <InfoCard icon="🕐" label="Project Length" text="~4 hours (excl. 3D printing time), plus additional time to monitor plant growth after the planter is used." />
          <InfoCard icon="🧰" label="Equipment Required" text="Laptop with Tinkercad, 3D printer, plant or seed, soil, water, measuring cup, pen & paper, camera." />
        </div>
      </Section>

      {/* Introduction */}
      <Card className="p-6 border-border/60 shadow-sm space-y-4">
        <h2 className="font-poppins font-bold text-lg text-foreground">Introduction</h2>
        <p className="text-sm text-foreground/80 leading-relaxed">
          In this project, you'll be designing and making a 3D printed self-watering planter. The process involves learning about photosynthesis before following tutorials to design a basic self-watering planter. In the main part of the project, you'll be introduced to design challenges to improve the design and develop a plant growth strategy, which will be monitored over time. Watch the intro video below and browse through the project sections to learn more about the journey.
        </p>
        <div className="rounded-2xl overflow-hidden border border-border/60 bg-black">
          <video src={OVERVIEW_VIDEO} controls className="w-full max-h-96" />
        </div>
      </Card>

      {/* Photosynthesis */}
      <Section title="Photosynthesis" icon="🌱" defaultOpen={true}>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Before we begin designing, it's important to understand how plants actually grow. Let's have a quick recap of photosynthesis!
        </p>
        <PhotosynthesisCard image={IMG.plantFood} title="Food for Plants" desc="Plants make their own food through a process called photosynthesis, which allows them to survive and grow." />
        <div className="space-y-2">
          <div className="rounded-2xl overflow-hidden border border-border/60">
            <div className="bg-muted/20 p-4 flex items-center justify-center">
              <img src={IMG.photosynthesisEquation} alt="Photosynthesis equation" className="max-h-40 w-auto object-contain rounded-lg" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic text-center">If any of the things mentioned in the diagram were not present, photosynthesis could not occur!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <PhotosynthesisCard image={IMG.co2LightWater} title="CO2, Light + Water" desc="CO2 is acquired from the air through leaves, light from the sun and water from the soil! Chlorophyll is an essential pigment within leaves that allows the plant to absorb light." />
          <PhotosynthesisCard image={IMG.glucoseOxygen} title="Oxygen + Glucose" desc="Photosynthesis creates glucose and oxygen. Oxygen is released into the air and glucose is converted into starch or used for respiration, growth and storage in seeds." />
          <PhotosynthesisCard image={IMG.leafCharacteristics} title="Leaf Characteristics" desc="Leaves are thin, which makes it easy for CO2 to diffuse into the leaf for photosynthesis. They also have a large surface area to capture light, they contain chloroplasts which allow sunlight to be converted into energy by the leaf and they have a network of tubes that carries water and food." />
          <PhotosynthesisCard image={IMG.rootCharacteristics} title="Root Characteristics" desc="Water is transported to the leaf from the roots of a plant. It is absorbed from the soil in what is known as a 'root hair cell', which is thin with a large surface area to easily allow the passage of water." />
        </div>
        <PortfolioNote>
          Open up the project portfolio and enter your full name and the date on the title slide. If you haven't already done so, you will need to go to 'File &gt; Make a Copy' before you can begin editing the portfolio. On slide 3 (Photosynthesis), summarise the content on this page by writing a paragraph about the process and purpose of photosynthesis.
        </PortfolioNote>
      </Section>

      {/* Skill Building */}
      <Section title="Skill Building" icon="🖥️" defaultOpen={false}>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Self-watering planters hold a reservoir of water at the bottom of an outer container. When soil dries out in the inner pot, it draws water in through small holes as required by the plant. This means no waterlogged roots and consistent moisture – meaning they can go days or even weeks without watering.
        </p>
        <p className="text-sm text-foreground/80 leading-relaxed">
          We're now going to go through a tutorial to design a basic self-watering planter. This is going to act as the starting point of your own unique design! Follow the Tinkercad tutorial below to design the example self-watering planter. When you complete the tutorial, don't 3D print the model just yet as we'll be improving it in the next section!
        </p>
        <div className="rounded-2xl overflow-hidden border border-border/60 bg-black">
          <video src={TINKERCAD_TUTORIAL_VIDEO} controls className="w-full max-h-96" />
        </div>
        <PortfolioNote>
          On Slide 4 (Self-Watering Planters), write a paragraph about self-watering planters. Explain how they work and what benefits they bring. Supplement this information with a visual diagram/drawing.
        </PortfolioNote>
      </Section>

      {/* Design + Make */}
      <Section title="Design + Make" icon="🔨" defaultOpen={false}>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Now that you've designed a basic self-watering planter, it's time to improve it by incorporating new features! To do this, we'll be going through a series of design challenges before developing a growth strategy, which will be monitored over time. Follow the below steps to complete the project and bring your unique self-watering planter to life!
        </p>

        {/* Step 1 */}
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">STEP 1: Design Challenges</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Although the basic self-watering planter you designed is perfectly functional, there are various ways in which it could be improved to be more user-friendly and aesthetically pleasing. Download the design challenge document below and go through the exercises to improve the design. In addition to the suggested challenges, see if you can think of additional unique features.
          </p>
          <div className="rounded-2xl overflow-hidden border border-border/60">
            <div className="bg-muted/20 p-4 flex items-center justify-center">
              <img src={IMG.designChallenges} alt="Design Challenges" className="max-h-52 w-auto object-contain rounded-lg" />
            </div>
          </div>
          <a href={DESIGN_CHALLENGES_PDF} target="_blank" rel="noopener noreferrer">
            <Button className="rounded-xl gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm">
              <Download size={14} /> Download Design Challenges
            </Button>
          </a>
        </div>

        {/* Step 2 */}
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">STEP 2: 3D Print</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            3D print multiple copies of your planter so you can test different growth strategies. You may need to experiment with different things to ensure the planter is watertight. Tips include increasing the number of outer walls, thicker print layers, lower print speed, ensuring the nozzle temperature is high enough to not cause underextrusion or even adding a waterproofing layer to the finished model.
          </p>
          <div className="rounded-2xl overflow-hidden border border-border/60 bg-black">
            <video src={PRINT_VIDEO} controls className="w-full max-h-96" />
          </div>
          <div className="rounded-2xl overflow-hidden border border-border/60">
            <div className="bg-muted/20 p-4 flex items-center justify-center">
              <img src={IMG.planterBench} alt="3D printed self-watering planter" className="max-h-64 w-auto object-contain rounded-lg" />
            </div>
            <p className="p-3 text-xs text-muted-foreground italic">3D printed self-watering planter placed on a wooden bench.</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">STEP 3: Growth Strategy</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Once your model is 3D printed, devise a strategy to grow plants in your home, school or office. Use online research to discover what seeds can be grown in your environment, together with information about optimal growth conditions (light, temperature etc). We recommend testing different strategies/conditions for each of the planters you 3D printed.
          </p>
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs" disabled>
            <ExternalLink size={12} /> View Online Research Method
          </Button>
        </div>

        {/* Step 4 */}
        <div className="pt-2 space-y-3">
          <h3 className="font-poppins font-bold text-sm text-foreground">STEP 4: Visual Monitoring</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Planting your seeds is just the beginning of your journey. Consider using the visual monitoring method to track performance of each of your planters. As you review growth at regular intervals, think carefully about what improvements could be made to both your design and growth strategy.
          </p>
          <a href={VISUAL_MONITORING_PDF} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="rounded-xl gap-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-sm">
              <Download size={14} /> View Visual Monitoring Method
            </Button>
          </a>
        </div>
      </Section>

      {/* Key Learning */}
      <Card className="p-5 border-emerald-200 bg-emerald-50/50 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-2 text-emerald-800">🔑 Key Learning</h3>
        <p className="text-xs text-emerald-700 leading-relaxed">
          This project teaches learners about photosynthesis, plant growth, water movement, root health, CAD design, 3D printing, prototyping, testing, and improving a functional product over time.
        </p>
      </Card>
    </div>
  );
}