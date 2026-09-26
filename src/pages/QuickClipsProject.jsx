import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, ExternalLink,
  Clock, Layers, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ModellingStepper from "@/components/quickclips/ModellingStepper";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/682842f2f_image.png";

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

function StepCard({ num, title, desc, media }) {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-3 bg-purple-50 border-b border-purple-100">
        <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{num}</span>
        <span className="font-poppins font-bold text-sm text-foreground">{title}</span>
      </div>
      <div className="p-5">
        {media?.size === "icon" ? (
          <div className="flex items-start gap-4">
            {media?.type === "video" && (
              <video
                src={media.url}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-24 h-24 object-cover rounded-lg border border-border/40 shadow-sm flex-shrink-0"
              />
            )}
            {media?.type === "image" && (
              <img src={media.url} alt={title} className="w-24 h-24 object-cover rounded-lg border border-border/40 shadow-sm flex-shrink-0" />
            )}
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            {media?.type === "video" && (
              <video src={media.url} controls className="w-full rounded-xl border border-border/40" preload="metadata" />
            )}
            {media?.type === "image" && (
              <img src={media.url} alt={title} className="w-full rounded-xl border border-border/40" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const DRAWING_STEPS = [
  {
    title: "Select Product",
    desc: "Decide on whether you want to make a cable tidy, a bag holder, or a filament clip. Use the images here to help you decide.",
    media: { type: "video", size: "icon", url: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/88c00bf9e_2DStep1.mp4" },
  },
  {
    title: "Measure",
    desc: "If you opted for the cable tidy or bag holder, accurately measure the thickness of the table where your clip will slot on to. If you opted for the filament clip, measure the thickness of the filament reel where the clip will attach.",
    media: { type: "image", size: "icon", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/d391f92fe_2DStep2.jpg" },
  },
  {
    title: "Draw Reference",
    desc: "On a blank sheet of paper, use a pencil to faintly draw the edge of the object where your clip will attach — the edge of a table for a cable tidy or bag holder, the edge of a filament reel for a filament clip. Create the drawing at real-life dimensions (scale 1:1) so you get a good perspective on the size of your clip accessory.",
    media: { type: "video", size: "icon", url: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/0a6c1c1f2_2DStep3.mp4" },
  },
  {
    title: "Draw Outline",
    desc: "Using a black pen, draw an outline of your clip accessory around the reference sketch. Try to create as smooth an outline as possible. If required, draw the outline in pencil first and trace over it in pen.",
    media: { type: "video", size: "icon", url: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/15b700b42_2Dstep4.mp4" },
  },
  {
    title: "Fill in Outline",
    desc: "Once you are happy with your outline, colour it in using a black marker or pen. The coloured-in area will be extruded to create a 3D model, so ensure it is thoroughly filled in.",
    media: { type: "video", size: "icon", url: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/81ada87df_2Dstep5.mp4" },
  },
  {
    title: "Scan JPG",
    desc: "Use an eraser to get rid of the pencil reference image, leaving only your clip accessory drawing. Scan the drawing, or take a top-down photo of it, and save it as a JPG file.",
    media: { type: "video", size: "icon", url: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/58763b520_2Dstep6.mp4" },
  },
];

const PRINT_STEPS = [
  {
    title: "3D Print + Test",
    desc: "Slice your STL file and 3D print the model. Once printed, test your filament clip and write down some key learnings. For example, what did you notice about the clip's flexibility and strength? Did the clip work as intended? How could it have been improved?",
    media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/ea08855bf_3Dprintingstep1.jpg" },
  },
  {
    title: "Make a Unique Clip",
    desc: "Use everything you've learnt in the course and testing phase to brainstorm ideas for a new clip accessory. Then use the same 2D to 3D workflow to design and make your unique idea!",
    media: { type: "video", url: "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/86c8d540e_3Dprintingstep2.mp4" },
  },
];

const MODELLING_STEPS = [
  { title: "Review Example Clips", desc: "Review example clips and choose a practical object whose side profile can become a printable cable clip.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/ca1a5a16f_01-112855-intro.png" } },
  { title: "Open File → Import", desc: "Open File menu in Inkscape, then select Import to bring your photographed sketch into the document.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/55c3aa6da_02-112900-file-import.png" } },
  { title: "Select cable tidy.jpg", desc: "Select cable tidy.jpg in file browser, verify preview, then click Open to continue importing image.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/aa9bcc9ff_03-112916-select-jpg.png" } },
  { title: "Confirm Import Settings", desc: "Keep default image import settings, then click OK to embed the photograph directly within the document.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/fd6233fbb_04-112919-import-ok.png" } },
  { title: "Confirm Image Imported", desc: "Confirm imported cable clip image appears on page, selected with resize handles and ready for positioning.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/bbbeffc88_05-112927-imported-image.png" } },
  { title: "Adjust Vertical View", desc: "Use mouse wheel to adjust vertical view and keep imported image centered within page while navigating workspace.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/6143e8876_06-112932-zoom-state.png" } },
  { title: "Zoom Closer", desc: "Hold Control while scrolling mouse wheel to zoom closer, making cable clip's edges easier to inspect.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/b7a3d6e2f_07-112935-zoom-detail.png" } },
  { title: "Pan Canvas", desc: "Hold Space and drag mouse to pan canvas freely, repositioning selected image without moving the object.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/663a54b7c_08-112940-pan-canvas.png" } },
  { title: "Path → Trace Bitmap", desc: "With image selected, open Path menu and choose Trace Bitmap to convert photograph into editable vector.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/f8deb1ba7_09-112943-trace-bitmap.png" } },
  { title: "Enable Live Preview", desc: "Enable Live Preview in Trace Bitmap dialog to immediately see how current settings affect resulting vector.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/79eea18d0_10-112953-live-preview.png" } },
  { title: "Set Brightness Cutoff", desc: "Set Brightness cutoff threshold around 0.450, checking preview for solid shape with preserved openings and clean edges.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/f858b7c17_11-113002-threshold-0450.png" } },
  { title: "Test Lower Threshold", desc: "Test a lower threshold like 0.300 to understand how insufficient values create gaps, noise, and missing regions.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/1924a11ec_12-113004-threshold-0300.png" } },
  { title: "Increase Threshold", desc: "Increase threshold until preview becomes a solid, flat silhouette without unwanted speckles or broken contour sections.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/e2e31ffa2_13-113011-clean-preview.png" } },
  { title: "Open Options Tab", desc: "Open Options tab after achieving a clean preview to access path smoothing and optimization controls.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/a83409af1_14-113016-options-tab.png" } },
  { title: "Optimize Paths", desc: "Enable Optimize paths and set tolerance to 5.00, reducing excess nodes and smoothing jagged traced edges.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/365e37a8e_15-113021-tolerance-5.png" } },
  { title: "Execute Trace", desc: "Click OK to execute the trace, create a vector silhouette, and close the Trace Bitmap dialog when satisfied.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/a62b2f62b_16-113030-trace-ok.png" } },
  { title: "Reveal Vector", desc: "Drag original gray raster aside, revealing separate black traced vector underneath for comparison and editing.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/24b0eb25e_17-113039-move-raster.png" } },
  { title: "Inspect Vector Shape", desc: "Select black vector and zoom closer, checking its overall shape before making detailed corrections manually.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/f931fed66_18-113049-inspect-vector.png" } },
  { title: "Inspect Notch & Curves", desc: "Inspect inner notch and surrounding curves closely, confirming important openings remain distinct and properly shaped.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/1b48ebc67_19-113051-inner-notch.png" } },
  { title: "Reveal Editable Nodes", desc: "Double-click vector to reveal editable nodes, then examine contour for excessive points or irregular transitions.", media: { type: "image", url: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9f5714ff4_20-113054-outline-nodes.png" } },
  { title: "Locate Unwanted Bulges", desc: "Locate small unwanted bulges or speckles along outline before switching to eraser tool for cleanup." },
  { title: "Zoom onto Bulge", desc: "Zoom tightly onto unwanted bulge, ensuring eraser width is appropriate for precise removal without damaging contour." },
  { title: "Erase the Defect", desc: "Click and drag eraser stroke across unwanted bump, removing only defect while preserving neighboring curve." },
  { title: "Save As SVG", desc: "Open Save As dialog, select filename field, and prepare descriptive SVG filename for cleaned vector file." },
  { title: "Name & Save", desc: "Enter cable tidy.svg, confirm Inkscape SVG format, then click Save to preserve editable vector file." },
  { title: "Import SVG to Tinkercad", desc: "In Tinkercad, import saved SVG using default centering, scale, and dimensions, then click blue Import." },
  { title: "Confirm Extruded Clip", desc: "Confirm purple extruded clip appears on workplane, then inspect orientation and shape from top view." },
  { title: "Add Reference Box", desc: "Drag red Box from Basic Shapes panel onto workplane to create a sizing reference for table thickness." },
  { title: "Position Reference Box", desc: "Position red reference box against purple clip opening, checking whether clip dimensions fit intended table edge." },
  { title: "Scale Proportionally", desc: "Hold Shift and drag white corner handle to scale clip proportionally around reference box accurately." },
  { title: "Disable Snap Grid", desc: "Open Snap Grid menu and choose Off, allowing finer unrestricted scaling adjustments beyond preset increments." },
  { title: "Fine-tune Scaling", desc: "Drag upper-right corner handle after disabling snapping, enlarging clip smoothly while retaining proportions around reference shape." },
  { title: "Monitor Dimensions", desc: "Monitor horizontal dimension value while scaling, stopping near 27.98 millimeters or your required target width." },
  { title: "Orbit & Inspect", desc: "Orbit to perspective view and inspect finished purple clip, verifying clean extrusion, notch geometry, and overall proportions." },
  { title: "Compare with Concept", desc: "Compare final three-dimensional clip with design concept, confirming key features survived tracing, cleanup, scaling, and extrusion." },
];

export default function QuickClipsProject({ isPublic = false }) {
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
        <img src={COVER_IMG} alt="Quick Clips" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">2D → 3D Workflow</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Beginner</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Quick Clips</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            Use a simple 2D sketch to 3D model workflow to design and print useful clip accessories — cable tidies, bag holders, filament clips, and beyond.
          </p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> ~2 hours (excl. print time)</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 2D → 3D workflow</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <Section title="Introduction" icon="📋" defaultOpen={true}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In this project, you'll use a simple 2D sketch to 3D model workflow to create a range of useful clip accessories. You'll begin by following instructions and tutorials to design either a <strong>cable tidy</strong>, a <strong>bag holder</strong>, or a <strong>filament clip</strong> before making your own unique clip accessory.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The 2D to 3D workflow is a great way to introduce complete beginners to 3D printing, but it is also a very useful technique for any designer wishing to quickly turn their ideas into physical objects.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Software Needed", icon: "💻", text: "Inkscape (free) + either Tinkercad (recommended for beginners / under 13) or Fusion 360 (over 13). All are free for education and hobbyists." },
            { label: "Supplies", icon: "🖊️", text: "White paper, ruler or measuring calipers, pencils and black felt pens, 2D paper scanner or phone camera, 3D printer and filament." },
            { label: "Duration", icon: "🕐", text: "Approximately 2 hours, excluding 3D printing time." },
            { label: "Skill Level", icon: "⭐", text: "Suitable for complete beginners and experienced designers alike. No prior 3D printing knowledge required." },
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

      {/* How to Use the Course */}
      <Section title="How to Use the Course" icon="🗺️" defaultOpen={true}>
        <div className="space-y-3">
          {[
            "Ensure you have Inkscape software installed, as well as either Tinkercad or Fusion 360. All options are free for education and hobbyists.",
            "Gather your supplies: white paper, ruler or measuring calipers, pencils and black felt pens, a 2D paper scanner or phone camera, and a 3D printer with filament.",
            "With your software installed and supplies gathered, work through each section of the course in order.",
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start text-sm text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <p className="text-xs text-purple-800 leading-relaxed">
            <span className="font-bold">💡 Tip:</span> We recommend <strong>Tinkercad</strong> for beginners and those under 13, and <strong>Fusion 360</strong> for those over 13 who want more advanced tools.
          </p>
        </div>
      </Section>

      {/* 2D Drawing */}
      <Section title="2D Drawing" icon="✏️" defaultOpen={true}>
        <p className="text-sm text-muted-foreground">
          Follow the below steps to draw out an example clip accessory. The drawing you create will act as the base of your design and in the next sections you'll be turning it into a 3D model!
        </p>
        <div className="space-y-3">
          {DRAWING_STEPS.map((s, i) => <StepCard key={i} num={i + 1} title={s.title} desc={s.desc} media={s.media} />)}
        </div>
      </Section>

      {/* 3D Modelling */}
      <Section title="3D Modelling" icon="🖥️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We're now going to turn your sketch into a 3D model by extruding it! First, your JPG sketch needs to be converted into an SVG vector file using <strong>Inkscape</strong>. The SVG can then be uploaded into either Tinkercad or Fusion 360 to be extruded into a 3D printable model.
        </p>
        <ModellingStepper steps={MODELLING_STEPS} />
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-bold">💡 Tip:</span> At the end of the tutorial you should have a 3D printable STL file exported and ready to slice. If you get stuck, ask your teacher or check the text-based instructions.
          </p>
        </div>
      </Section>

      {/* 3D Printing */}
      <Section title="3D Printing" icon="🖨️" defaultOpen={false}>
        <p className="text-sm text-muted-foreground">
          At this stage, you should have a 3D printable STL file exported. Follow the below steps to bring your creation to life, before testing it and using your key learnings to make a unique clip accessory!
        </p>
        <div className="space-y-3">
          {PRINT_STEPS.map((s, i) => <StepCard key={i} num={i + 1} title={s.title} desc={s.desc} media={s.media} />)}
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-xs text-green-800 leading-relaxed">
            <span className="font-bold">🌟 Challenge:</span> Can you design a clip that solves a real problem in your home, school, or workshop? The 2D to 3D workflow makes it easy to iterate quickly — try at least 2 different designs!
          </p>
        </div>
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