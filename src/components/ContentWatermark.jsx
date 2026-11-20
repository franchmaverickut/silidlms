import { useLocation } from "react-router-dom";
import { LIVRO_LOGO_URL, isLessonPath } from "@/lib/watermark";

// Faint, tiled LIVRO logo over lesson pages. Never blocks clicks or scrolling.
export default function ContentWatermark() {
  const { pathname } = useLocation();
  if (!isLessonPath(pathname)) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none select-none fixed inset-0 z-[40] overflow-hidden">
      <div
        className="absolute -inset-1/2 -rotate-[24deg] opacity-[0.02] grayscale"
        style={{
          backgroundImage: `url(${LIVRO_LOGO_URL})`,
          backgroundSize: "320px auto",
          backgroundRepeat: "space",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}