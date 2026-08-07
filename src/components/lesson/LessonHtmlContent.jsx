import { useState, useEffect } from "react";
import { Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./lessonHtmlOverrides.css";

// Module-level cache so navigating back to a lesson doesn't re-fetch.
const htmlCache = {};

/**
 * Reusable in-page renderer for lesson content stored as an external HTML file.
 * Fetches the file as text (bypassing Content-Disposition: attachment headers
 * that cause browsers to download .html files) and renders it inside a
 * styled, sandboxed prose container.
 *
 * Scalable: handles loading + error states and degrades to an "open in new tab"
 * fallback if the fetch fails, so it works for any text/HTML content_url.
 */
export default function LessonHtmlContent({ url, title }) {
  const [html, setHtml] = useState(htmlCache[url] || null);
  const [loading, setLoading] = useState(!htmlCache[url]);
  const [error, setError] = useState(false);

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
        // Strip <script> tags for safety; lesson HTML should be static content.
        // Also strip inline event-handler attributes (onclick, onmousedown, …)
        // since the <script> blocks that defined their handlers are removed
        // above — leaving them in place causes ReferenceErrors on interaction.
        const sanitized = text
          .replace(/<script[\s\S]*?<\/script>/gi, "")
          .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
          .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
          // Strip the global `body{…}` rule so the injected stylesheet
          // doesn't restyle the app's sidebar/topbar; re-scoped to the
          // shell in lessonHtmlOverrides.css.
          .replace(/body\s*\{[^}]*\}/g, "");
        htmlCache[url] = sanitized;
        setHtml(sanitized);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [url]);

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
    <div
      className="lesson-html-shell"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}