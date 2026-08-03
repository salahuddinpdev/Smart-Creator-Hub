import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, QrCode as QrIcon } from "lucide-react";

export function QrCodeGenerator() {
  const [text, setText] = useState("https://salahtoolshub.com");
  const [fg, setFg] = useState("#7c3aed");
  const [bg, setBg] = useState("#ffffff");
  const [size, setSize] = useState(512);
  const [err, setErr] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = async () => {
    if (!canvasRef.current || !text.trim()) return;
    try {
      await QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        margin: 2,
        errorCorrectionLevel: "H",
        color: { dark: fg, light: bg },
      });
      setErr("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to generate QR code");
    }
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, fg, bg, size]);

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-start">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Text or URL
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="https://your-link.com"
            className="mt-2 w-full rounded-2xl glass border-0 p-4 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Foreground
            </label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="color"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="h-10 w-14 rounded-lg cursor-pointer border border-border"
              />
              <input
                type="text"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="flex-1 rounded-lg bg-muted/40 px-3 py-2 text-sm font-mono"
              />
            </div>
          </div>
          <div className="glass rounded-2xl p-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Background
            </label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="color"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="h-10 w-14 rounded-lg cursor-pointer border border-border"
              />
              <input
                type="text"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="flex-1 rounded-lg bg-muted/40 px-3 py-2 text-sm font-mono"
              />
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">Size</label>
            <span className="text-sm font-bold tabular-nums">
              {size} × {size}px
            </span>
          </div>
          <input
            type="range"
            min={128}
            max={1024}
            step={32}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <button
          type="button"
          onClick={download}
          disabled={!text.trim()}
          className="inline-flex items-center gap-2 rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow disabled:opacity-40"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </button>
        {err && <p className="text-sm text-destructive">{err}</p>}
      </div>

      <div className="glass-strong rounded-3xl p-6 grid place-items-center min-w-[280px]">
        {text.trim() ? (
          <canvas ref={canvasRef} className="max-w-full h-auto rounded-xl" />
        ) : (
          <div className="aspect-square w-64 grid place-items-center text-muted-foreground">
            <QrIcon className="w-16 h-16" />
          </div>
        )}
      </div>
    </div>
  );
}
