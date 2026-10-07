import { useState } from "react";

const PARTS = [
  { id: "one", name: "One-piece plate", size: "150 × 257 × 3 mm", qty: "Print 2: bottom and top", plain: "The whole 4WD frame in one flat piece.", bed: "Needs a big bed, about 256 mm, with the plate turned.", file: "4WD_smart_buggy_chassis_1piece.stl" },
  { id: "a", name: "Part A", size: "150 × 120 × 3 mm", qty: "Print 1 for each plate", plain: "The round-end half. It has one axle spot and two dovetail tabs.", bed: "Fits a 180 mm bed.", file: "4WD_smart_buggy_chassis_part_A.stl" },
  { id: "b", name: "Part B", size: "150 × 151 × 3 mm", qty: "Print 1 for each plate", plain: "The other half. Wide side tabs and two sockets for Part A.", bed: "Fits a 180 mm bed.", file: "4WD_smart_buggy_chassis_part_B.stl" },
  { id: "mount", name: "Motor mount", size: "16 × 33 × 2.5 mm", qty: "8 for a 4WD car, 4 for a 2WD car", plain: "The little T that holds one motor. Print it flat.", bed: "Any bed. Slice the plate of 8 if you want them together.", file: "motor_mount.stl" },
];

const PATHS = [
  { id: "big", label: "Big printer, stiffest car", parts: ["one", "mount"], note: "Print the one-piece plate twice and 8 mounts." },
  { id: "split", label: "Smaller printer, same 4WD car", parts: ["a", "b", "mount"], note: "A plus B make the same shape as the one-piece plate. Print each half twice, plus 8 mounts." },
  { id: "small", label: "Small two-wheel car", parts: ["b", "mount"], note: "Print Part B twice and 4 mounts. Add a ball caster. That caster is not in the kit." },
];

const SETTINGS = [
  ["Plastic", "PLA for most rooms. PETG if the car sits in a hot car."],
  ["Layers", "0.4 mm nozzle, 0.2 mm layers."],
  ["Walls", "4 walls, 4 top layers, 4 bottom layers."],
  ["Fill", "40% in the plates. 100% in the mounts."],
  ["Supports", "None. Every part is flat."],
  ["On the bed", "Lay it down just as the file opens. Do not stand a mount up."],
];

export default function KidPrintGuide({ preview }) {
  const [pathId, setPathId] = useState("big");
  const [partId, setPartId] = useState("one");
  const path = PATHS.find((item) => item.id === pathId);
  const part = PARTS.find((item) => item.id === partId);
  const visible = PARTS.filter((item) => path.parts.includes(item.id));

  const choosePath = (next) => {
    setPathId(next);
    const first = PATHS.find((item) => item.id === next).parts[0];
    setPartId(first);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-slate-600">Pick the printer you have. Then turn only the parts that choice needs.</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {PATHS.map((item) => (
          <button key={item.id} onClick={() => choosePath(item.id)} className={`rounded-2xl border-2 px-3 py-3 text-left text-xs font-bold ${pathId === item.id ? "border-purple-600 bg-purple-500 text-white" : "border-slate-200 bg-white text-slate-600"}`}>{item.label}</button>
        ))}
      </div>
      <p className="rounded-2xl border border-purple-200 bg-purple-50 p-3 text-xs leading-relaxed text-purple-900">{path.note}</p>
      <div className="flex flex-wrap gap-2">
        {visible.map((item) => (
          <button key={item.id} onClick={() => setPartId(item.id)} className={`rounded-2xl border-2 px-3 py-2 text-xs font-bold ${partId === item.id ? "border-blue-600 bg-blue-500 text-white" : "border-slate-200 bg-white text-slate-600"}`}>{item.name}</button>
        ))}
      </div>
      <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-h-[220px] rounded-2xl border border-slate-200 bg-slate-100 p-3">
          {preview ? preview(part) : <p className="p-6 text-center text-sm text-slate-500">Turn {part.name} here. Pass your existing STL viewer in as preview.</p>}
          <p className="mt-2 text-[11px] text-slate-400">{part.file}</p>
        </div>
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-3 text-sm leading-relaxed">
          <p className="font-poppins font-extrabold">{part.name}</p>
          <p className="mt-1">{part.plain}</p>
          <p className="mt-2 text-xs font-bold text-slate-600">{part.size}</p>
          <p className="text-xs font-bold text-slate-600">{part.qty}</p>
          <p className="mt-2 text-xs text-slate-500">{part.bed}</p>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {SETTINGS.map(([name, value]) => (
          <div key={name} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"><strong>{name}.</strong> {value}</div>
        ))}
      </div>
    </div>
  );
}