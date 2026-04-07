import { useState } from "react";
import { Move3d } from "lucide-react";

export default function STLViewer({ url, height = 320, className = "" }) {
  const [loaded, setLoaded] = useState(false);

  if (!url) return null;

  // viewstl.com accepts the file URL via the `file` query param
  const src = `https://www.viewstl.com/?embedded&url=${encodeURIComponent(url)}`;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-border/60 bg-[#f8f7f5] ${className}`}
      style={{ height }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#f8f7f5]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-xs text-muted-foreground">Loading 3D model...</p>
          </div>
        </div>
      )}
      <iframe
        src={src}
        style={{ border: 0, margin: 0, width: "100%", height: "100%" }}
        onLoad={() => setLoaded(true)}
        title="3D Model Viewer"
        allow="fullscreen"
      />
    </div>
  );
}