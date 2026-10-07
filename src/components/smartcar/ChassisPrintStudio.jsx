import { useState } from "react";
import { Move3d, Ruler, Layers, Package, MousePointerClick } from "lucide-react";
import STLViewer from "@/components/maker/STLViewer";

// Plain, kid-friendly part data. The raw filename is shown only as a small
// label under the model — sizes and quantities live here once, nowhere else.
const PARTS = [
  {
    id: "onepiece",
    tab: "One-piece plate",
    name: "One-piece plate",
    desc: "The whole plate of the car in one flat piece. Use one for the bottom and one for the top.",
    size: "150 × 257 × 3 mm",
    qty: "Print 2 (bottom and top)",
    builds: ["big"],
    note: "Only fits a big printer: the bed should be at least 256 × 256 mm.",
  },
  {
    id: "partA",
    tab: "Part A",
    name: "Part A",
    desc: "The round-end half of the plate. It has one axle hole and two dovetail tabs.",
    size: "150 × 120 × 3 mm",
    qty: "Print 1",
    builds: ["split"],
    note: null,
  },
  {
    id: "partB",
    tab: "Part B",
    name: "Part B",
    desc: "The other half of the plate, with wide side tabs and two dovetail sockets.",
    size: "150 × 151 × 3 mm",
    qty: "Print 1",
    builds: ["split", "small"],
    note: "Part A plus Part B make the same shape as the one-piece plate, so your printer bed can be smaller.",
  },
  {
    id: "mount",
    tab: "Motor mount",
    name: "Motor mount",
    desc: "A small T-shaped holder that clamps each motor tight to the plate.",
    size: "16 × 33 × 2.5 mm",
    qty: "Print 8 for 4WD, or 4 for 2WD",
    builds: ["big", "split", "small"],
    note: "Slice the plate-of-8 file to print all eight mounts in one go.",
  },
];

const BUILDS = [
  { id: "big", label: "Big printer, stiffest car", parts: ["onepiece", "mount"] },
  { id: "split", label: "Smaller printer, same 4WD car", parts: ["partA", "partB", "mount"] },
  { id: "small", label: "Small two-wheel car", parts: ["partB", "mount"] },
];

const BUILD_LABELS = { big: "Stiff 4WD", split: "Split 4WD", small: "Small 2WD" };

const PRINT_SETTINGS = [
  "PLA or PETG",
  "0.4 mm nozzle",
  "0.2 mm layers",
  "4 walls",
  "40% infill on the plates",
  "100% infill on the motor mounts",
  "No supports",
  "Print every part flat on the bed",
  "A skirt for adhesion",
  "0.1–0.2 mm elephant-foot compensation",
];

const WEIGHT_LINE = "About 70 g per one-piece plate, 30 g for Part A, 40 g for Part B, and 11 g for 8 mounts. Your slicer gives the exact weight.";

const STL_INDEX = { onepiece: 0, partA: 1, partB: 2, mount: 3 };

function buildParts(buildId) {
  return BUILDS.find((b) => b.id === buildId).parts;
}

export default function ChassisPrintStudio({ previews, activeFile }) {
  const [build, setBuild] = useState("big");
  const [activePart, setActivePart] = useState("onepiece");

  const controlled = activeFile != null;
  const currentPart = controlled ? activeFile : activePart;

  const chooseBuild = (id) => {
    setBuild(id);
    const parts = buildParts(id);
    if (!parts.includes(activePart)) setActivePart(parts[0]);
  };

  const visibleParts = PARTS.filter((p) => buildParts(build).includes(p.id));
  const part = PARTS.find((p) => p.id === currentPart);
  const stl = previews[STL_INDEX[currentPart]];

  // Controlled mode: the parent (KidPrintGuide) owns the build choice, the
  // part tabs, the part card and the print settings, so here we render only
  // the synced 3D viewer. Nothing (size, qty, setting) is duplicated.
  if (controlled) {
    return (
      <div className="min-h-[340px] rounded-2xl border-2 border-purple-200 bg-gradient-to-b from-purple-50/60 to-white p-3 shadow-sm">
        <STLViewer url={stl?.url} height={340} />
        <div className="mt-2 flex items-center justify-center gap-1.5">
          <MousePointerClick size={12} className="text-purple-400" />
          <span className="text-xs text-muted-foreground">Drag to turn · scroll to zoom</span>
        </div>
        <p className="mt-1 text-center font-mono text-[11px] text-muted-foreground/80 break-all">{stl?.name}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Move3d size={16} className="text-purple-600" />
        <h3 className="font-poppins font-bold text-sm text-foreground">Turn each part to learn it</h3>
      </div>

      {/* Part tabs — only the parts the chosen build needs are shown */}
      <div className="flex flex-wrap gap-2">
        {visibleParts.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePart(p.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border-2 transition-colors ${
              activePart === p.id
                ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                : "bg-card text-foreground border-border/60 hover:bg-purple-50 hover:border-purple-300"
            }`}
          >
            {p.tab}
          </button>
        ))}
      </div>

      {/* Viewer + beside-it part card */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4">
        <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-b from-purple-50/60 to-white p-3 shadow-sm">
          <STLViewer url={stl?.url} height={340} />
          <div className="mt-2 flex items-center justify-center gap-1.5">
            <MousePointerClick size={12} className="text-purple-400" />
            <span className="text-xs text-muted-foreground">Drag to turn · scroll to zoom</span>
          </div>
          <p className="mt-1 text-center font-mono text-[11px] text-muted-foreground/80 break-all">{stl?.name}</p>
        </div>

        <div className="rounded-2xl border-2 border-border/60 bg-card p-4 space-y-3 shadow-sm">
          <h4 className="font-poppins font-bold text-base text-foreground leading-tight">{part.name}</h4>
          <p className="text-sm text-foreground/80 leading-relaxed">{part.desc}</p>

          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 text-sm">
              <Ruler size={15} className="text-purple-500 flex-shrink-0" />
              <span className="text-foreground font-medium">{part.size}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Package size={15} className="text-purple-500 flex-shrink-0" />
              <span className="text-foreground font-medium">{part.qty}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {part.builds.map((bId) => (
              <span
                key={bId}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  bId === build ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700"
                }`}
              >
                {BUILD_LABELS[bId]}
              </span>
            ))}
          </div>

          {part.note && (
            <div className="flex gap-2 items-start pt-1 rounded-lg bg-blue-50 border border-blue-200 p-2.5">
              <p className="text-xs text-blue-800 leading-relaxed">{part.note}</p>
            </div>
          )}
        </div>
      </div>

      {/* Build choice buttons */}
      <div className="space-y-2">
        <h4 className="font-poppins font-bold text-sm text-foreground">Pick your build</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {BUILDS.map((b) => {
            const on = build === b.id;
            return (
              <button
                key={b.id}
                onClick={() => chooseBuild(b.id)}
                className={`px-3 py-3 rounded-2xl text-xs font-bold border-2 transition-all text-center ${
                  on
                    ? "bg-orange-500 text-white border-orange-600 shadow-sm"
                    : "bg-card text-foreground border-border/60 hover:bg-orange-50 hover:border-orange-300"
                }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          The tabs above show only the parts this build needs. Tap a part to view it.
        </p>
      </div>

      {/* One print-settings list */}
      <div className="rounded-2xl border-2 border-border/60 bg-card p-4 space-y-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-purple-600" />
          <h4 className="font-poppins font-bold text-sm text-foreground">How to print</h4>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
          {PRINT_SETTINGS.map((s) => (
            <li key={s} className="flex gap-2 text-sm text-foreground/80 leading-relaxed">
              <span className="text-purple-500 font-bold flex-shrink-0">•</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 items-start rounded-lg bg-muted/40 border border-border/40 p-2.5">
          <p className="text-xs text-muted-foreground leading-relaxed">{WEIGHT_LINE}</p>
        </div>
      </div>
    </div>
  );
}