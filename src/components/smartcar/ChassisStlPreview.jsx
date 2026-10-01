import { useState } from "react";
import { Move3d } from "lucide-react";
import STLViewer from "@/components/maker/STLViewer";

export default function ChassisStlPreview({ files }) {
  const [active, setActive] = useState(0);
  const current = files[active];
  if (!current) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Move3d size={16} className="text-purple-600" />
        <h4 className="font-poppins font-bold text-sm text-foreground">Interactive 3D Preview</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {files.map((f, i) => (
          <button
            key={f.name}
            onClick={() => setActive(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              i === active
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-card text-foreground border-border/60 hover:bg-purple-50 hover:border-purple-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <STLViewer url={current.url} height={360} />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-mono break-all">{current.name}</span>
        <span className="whitespace-nowrap">{current.size}</span>
      </div>
    </div>
  );
}