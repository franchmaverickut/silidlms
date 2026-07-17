import { useState, useEffect } from "react";
import { Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        const sanitized = text.replace(/<script[\s\S]*?<\/script>/gi, "");
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
      <Card className="p-10 border-gray-200 flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" size={22} />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-gray-200 flex flex-col items-center text-center gap-3">
        <AlertCircle className="text-gray-300" size={28} />
        <p className="text-sm text-gray-500">This lesson couldn't be loaded in-page.</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
            <ExternalLink size={13} /> Open in new tab
          </Button>
        </a>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-gray-200 shadow-sm">
      <div
        className="prose prose-sm max-w-none text-foreground/90 leading-relaxed ql-editor"
        style={{ padding: 0 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Card>
  );
}