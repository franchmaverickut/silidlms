import { useEffect, useState } from "react";
import { Move3d, PackageOpen } from "lucide-react";
import STLViewer from "@/components/maker/STLViewer";
import { Button } from "@/components/ui/button";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";

// Minimal ZIP central-directory reader (no dependencies). Extracts every
// .stl entry into an ArrayBuffer using the browser's DecompressionStream.
async function readStlEntriesFromZip(buffer) {
  const u8 = new Uint8Array(buffer);
  const dv = new DataView(buffer);
  const findSig = (sig, from) => {
    for (let i = from; i >= 0; i--) {
      if (u8[i] === sig[0] && u8[i + 1] === sig[1] && u8[i + 2] === sig[2] && u8[i + 3] === sig[3]) return i;
    }
    return -1;
  };
  // End of Central Directory
  const eocd = findSig([0x50, 0x4b, 0x05, 0x06], u8.length - 22);
  if (eocd < 0) throw new Error("Not a valid ZIP file");
  const count = dv.getUint16(eocd + 10, true);
  let p = dv.getUint32(eocd + 16, true);

  const decode = (start, len) => new TextDecoder().decode(u8.subarray(start, start + len));
  const inflate = async (data, method) => {
    if (method === 0) return data; // stored
    if (method !== 8) throw new Error("Unsupported compression method " + method);
    const ds = new DecompressionStream("deflate-raw");
    const out = new Response(new Blob([data]).stream().pipeThrough(ds)).arrayBuffer();
    return out;
  };

  const entries = [];
  for (let n = 0; n < count; n++) {
    if (!(u8[p] === 0x50 && u8[p + 1] === 0x4b && u8[p + 2] === 0x01 && u8[p + 3] === 0x02)) break;
    const method = dv.getUint16(p + 10, true);
    const compSize = dv.getUint32(p + 20, true);
    const size = dv.getUint32(p + 24, true);
    const nameLen = dv.getUint16(p + 28, true);
    const extraLen = dv.getUint16(p + 30, true);
    const commentLen = dv.getUint16(p + 32, true);
    const localOff = dv.getUint32(p + 42, true);
    const name = decode(p + 46, nameLen);
    p += 46 + nameLen + extraLen + commentLen;

    if (!/\.stl$/i.test(name) || name.endsWith("/")) continue;

    // Jump to local header to find the real data offset
    if (!(u8[localOff] === 0x50 && u8[localOff + 1] === 0x4b && u8[localOff + 2] === 0x03 && u8[localOff + 3] === 0x04)) continue;
    const lNameLen = dv.getUint16(localOff + 26, true);
    const lExtraLen = dv.getUint16(localOff + 28, true);
    const dataStart = localOff + 30 + lNameLen + lExtraLen;
    const compressed = u8.subarray(dataStart, dataStart + compSize);

    entries.push({
      name: name.split("/").pop(),
      path: name,
      size,
      buffer: await inflate(await new Blob([compressed]).arrayBuffer(), method),
    });
  }
  return entries;
}

function formatBytes(b) {
  if (!b) return "—";
  if (b < 1024) return b + " B";
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + " KB";
  return (b / 1024 / 1024).toFixed(1) + " MB";
}

export default function ZipStlViewer({ zipUrl, label, height = 360 }) {
  const [entries, setEntries] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState("loading"); // loading | ready | empty | error

  useEffect(() => {
    if (!zipUrl) return;
    let cancelled = false;
    setStatus("loading");
    setEntries([]);
    setActiveIndex(0);
    fetch(zipUrl)
      .then((r) => r.arrayBuffer())
      .then((buf) => readStlEntriesFromZip(buf))
      .then((list) => {
        if (cancelled) return;
        if (!list.length) setStatus("empty");
        else { setEntries(list); setStatus("ready"); }
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => { cancelled = true; };
  }, [zipUrl]);

  const active = entries[activeIndex];
  const showSelect = entries.length > 6;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <Move3d size={16} className="text-primary" />
        <h4 className="font-poppins font-bold text-sm text-foreground">{label || "Interactive 3D Preview"}</h4>
        {status === "ready" && (
          <span className="ml-auto text-xs text-muted-foreground">{entries.length} STL{entries.length > 1 ? "s" : ""} in this file</span>
        )}
      </div>

      {status === "loading" && (
        <div className="rounded-2xl border border-border/60 bg-[#dfe3e8] flex items-center justify-center" style={{ height }}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-xs text-muted-foreground">Reading archive…</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-2xl border border-border/60 bg-[#dfe3e8] flex items-center justify-center" style={{ height }}>
          <div className="text-center px-6">
            <PackageOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Couldn't read this archive for preview.</p>
          </div>
        </div>
      )}

      {status === "empty" && (
        <div className="rounded-2xl border border-border/60 bg-[#dfe3e8] flex items-center justify-center" style={{ height }}>
          <div className="text-center px-6">
            <PackageOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No 3D (STL) parts found in this archive.</p>
          </div>
        </div>
      )}

      {status === "ready" && active && (
        <>
          {showSelect ? (
            <Select value={String(activeIndex)} onValueChange={(v) => setActiveIndex(Number(v))}>
              <SelectTrigger className="h-9 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {entries.map((e, i) => (
                  <SelectItem key={i} value={String(i)}>{e.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex flex-wrap gap-2">
              {entries.map((e, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant={i === activeIndex ? "default" : "outline"}
                  className="rounded-lg text-xs"
                  onClick={() => setActiveIndex(i)}
                >
                  {e.name}
                </Button>
              ))}
            </div>
          )}
          <STLViewer arrayBuffer={active.buffer} height={height} />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-mono break-all">{active.path}</span>
            <span className="whitespace-nowrap">{formatBytes(active.size)}</span>
          </div>
        </>
      )}
    </div>
  );
}