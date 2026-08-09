import { useState, useEffect, useRef } from "react";
import { Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Module-level cache so navigating back to a lesson doesn't re-fetch.
const htmlCache = {};

/**
 * Faithful host for lesson content stored as an external HTML file.
 *
 * The HTML/JavaScript is the source of truth; the screenshot is only a
 * visual verification reference. This component fetches the FULL original
 * document (no script/style/handler stripping) and renders it inside a
 * sandboxed iframe via srcDoc, so the original <style>, <script>, IDs,
 * event handlers, calculations, and conditional content all run exactly as
 * authored — isolated from the React app's DOM and global scope.
 *
 * sandbox="allow-scripts allow-same-origin" lets the original scripts run
 * AND use localStorage (e.g. tier persistence) while letting the parent
 * read the iframe's document to auto-size it and observe completion.
 *
 * Auto-resize + completion are driven from the PARENT (not an injected
 * bridge script) for reliability: on iframe load we attach a ResizeObserver
 * to the iframe's body and a MutationObserver to #done-banner (the original
 * updateProgress() adds the `show` class at ≥80%).
 */
export default function LessonHtmlContent({ url, title, onComplete }) {
  const [html, setHtml] = useState(htmlCache[url] || null);
  const [loading, setLoading] = useState(!htmlCache[url]);
  const [error, setError] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(600);
  const iframeRef = useRef(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!url) return;
    if (htmlCache[url]) {
      setHtml(htmlCache[url]);
      setLoading(false);
      setError(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("fetch_failed");
        return res.text();
      })
      .then(text => {
        if (cancelled) return;
        // Full original document is the source of truth — no stripping.
        htmlCache[url] = text;
        setHtml(text);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [url]);

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let doc = null;
    try { doc = iframe.contentDocument; } catch (e) { return; }
    if (!doc || !doc.body) return;

    // Auto-resize to content height — no inner scrollbar.
    const syncHeight = () => {
      const h = doc.body.scrollHeight;
      if (h > 0) setIframeHeight(h);
    };
    syncHeight();
    setTimeout(syncHeight, 300);
    setTimeout(syncHeight, 1200);
    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(syncHeight).observe(doc.body);
    }

    // Completion bridge: the original updateProgress() adds `show` to
    // #done-banner at ≥80% — forward that to the parent once.
    const banner = doc.getElementById("done-banner");
    if (banner && onComplete) {
      if (banner.classList.contains("show")) {
        if (!completedRef.current) { completedRef.current = true; onComplete(); }
      } else {
        new MutationObserver(() => {
          if (banner.classList.contains("show") && !completedRef.current) {
            completedRef.current = true;
            onComplete();
          }
        }).observe(banner, { attributes: true, attributeFilter: ["class"] });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="animate-spin text-muted-foreground" size={22} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center text-center gap-3 py-16">
        <AlertCircle className="text-muted-foreground/40" size={28} />
        <p className="text-sm text-muted-foreground">This lesson couldn't be loaded in-page.</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
            <ExternalLink size={13} /> Open in new tab
          </Button>
        </a>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      title={title || "Lesson content"}
      srcDoc={html}
      sandbox="allow-scripts allow-same-origin"
      onLoad={handleIframeLoad}
      className="w-full border-0"
      style={{ height: iframeHeight + "px" }}
    />
  );
}