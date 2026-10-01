import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronDown, ChevronUp, Download, Clock, Layers, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ZipStlViewer from "@/components/maker/ZipStlViewer";

const COVER_IMG = "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9f8f426ef_FunctionalWrenches.png";
const OVERVIEW_VIDEO = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/deca29b31_Wrenches-OverviewVideo.mp4";
const TINKERCAD_VIDEO = "https://media.base44.com/videos/public/69d386ad9523e2ce04536574/70eb540fc_MakeaFunctionalWrench-TinkercadTutorial-VoiceOvermp4.mp4";
const NUT_BOLT_DOWNLOAD = "https://media.base44.com/files/public/69d386ad9523e2ce04536574/3b4f47dc9_nut-and-bolt-demonstration-model.zip";

const CHALLENGES = [
  {
    num: 1,
    title: "A set of different sized wrenches",
    image: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/58d67cb1a_Challenge1.jpg",
    desc: "Design a complete set of wrench models to fit different sized nuts and bolts. When doing this, consider labelling wrenches with their size and developing a storage/organisation system for them.",
  },
  {
    num: 2,
    title: "2 wrenches",
    image: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/69c32763e_Challenge2.jpg",
    desc: "Rather than designing a set of different wrenches, are there ways you can incorporate multiple wrenches into a single design? If doing this challenge, think carefully not only about the wrench profile but the way the device is held by the user.",
  },
  {
    num: 3,
    title: "An adjustable wrench",
    image: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/1eb472859_Challenge3.jpg",
    desc: "Consider designing an adjustable wrench using a 3D printed mechanism. This might be an adjustable screw thread that allows you to use the wrench with different sized nuts and bolts.",
  },
  {
    num: 4,
    title: "A wrench and screwdriver",
    image: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/e41348299_Challenge4.jpg",
    desc: "In addition to functioning as a wrench, could you create a multi-tool? Think carefully about who might use the wrench and what others tools they might find helpful.",
  },
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

export default function FunctionalWrenchesProject({ isPublic = false }) {
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
        <img src={COVER_IMG} alt="Functional Wrenches" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 p-7 md:p-10 flex flex-col gap-4 h-full justify-end">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">Project</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">STEM</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">Basic</span>
          </div>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl text-white leading-tight">Functional Wrenches</h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            In this project, you'll be learning about 3D printed on-demand tools before making a functional wrench. Watch the intro video below and browse through the project sections to learn more about the journey.
          </p>
          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={15} /> Short skill-building session</span>
            <span className="flex items-center gap-1.5"><Layers size={15} /> 1 model + extension challenges</span>
            <span className="flex items-center gap-1.5"><Star size={15} /> All skill levels</span>
          </div>
        </div>
      </div>

      {/* Video Explainer */}
      <Section title="Video Explainer" icon="🎬" defaultOpen={true}>
        <div className="rounded-2xl overflow-hidden bg-black border border-border/40 shadow-sm">
          <video src={OVERVIEW_VIDEO} controls className="w-full aspect-video" preload="metadata">
            Your browser does not support the video tag.
          </video>
        </div>
      </Section>

      {/* Design + Make */}
      <Section title="Design + Make" icon="🛠️" defaultOpen={true}>
        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed">
          <p>
            In this section, you'll be bringing your functional wrench to life with 3D design and 3D printing! The first step is to find a nut and bolt mechanism that you'd like to design a wrench for. This might be a fastener system you find around your home or alternatively an STL file can be downloaded here if you want to 3D print an example nut and bolt. You may scale this in your slicing software as you wish. Once 3D printed, it may be required to run sandpaper over both the nuts and bolts for a few seconds – this will make the threads run across each other more easily.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href={NUT_BOLT_DOWNLOAD} download className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              <Download size={15} /> Download Nut &amp; Bolt STL
            </a>
          </div>
          <ZipStlViewer zipUrl={NUT_BOLT_DOWNLOAD} label="Nut & Bolt Demo Model" height={320} />
          <p>
            Once your nut and bolt has been identified, select either the Tinkercad or Fusion 360 tutorial below and follow it to design your wrench. There are options for both voice over instructions and text-based instructions so simply pick your preferred method of learning.
          </p>
        </div>

        {/* Tinkercad Video */}
        <div className="pt-2">
          <p className="font-poppins font-bold text-sm text-foreground mb-3 flex items-center gap-2">
            <span className="text-base">🖥️</span> Tinkercad Video
          </p>
          <div className="rounded-2xl overflow-hidden bg-black border border-border/40 shadow-sm">
            <video src={TINKERCAD_VIDEO} controls className="w-full aspect-video" preload="metadata">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Section>

      {/* Extension Challenges */}
      <Section title="Extension Challenges" icon="🔁" defaultOpen={true}>
        <p className="text-sm text-muted-foreground">
          If you want to take your wrench design to the next level, check out some of these extension challenges!
        </p>
        <div className="space-y-4">
          {CHALLENGES.map((ch) => (
            <div key={ch.num} className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 flex-shrink-0 bg-muted/30">
                  <img src={ch.image} alt={`Challenge ${ch.num}`} className="w-full h-48 sm:h-full object-cover" />
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{ch.num}</span>
                    <span className="font-poppins font-bold text-sm text-foreground">{ch.title}</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{ch.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Key Learning */}
      <Card className="p-5 border-blue-200 bg-blue-50/50 shadow-sm">
        <h3 className="font-poppins font-bold text-sm mb-2 text-blue-800">🔑 Key Learning</h3>
        <p className="text-xs text-blue-700 leading-relaxed">
          This project teaches learners how nuts, bolts, and wrenches work together. It also develops skills in CAD design, 3D printing, measurement, tolerance, tool design, prototyping, and testing functional objects.
        </p>
      </Card>
    </div>
  );
}