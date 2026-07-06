import { useRef, useState } from "react";
import { Upload, Download, Image as ImageIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formatBytes = (b: number) => {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
};

export function ImageCompressor() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [original, setOriginal] = useState<{ url: string; size: number; name: string } | null>(
    null,
  );
  const [compressed, setCompressed] = useState<{ url: string; size: number; blob: Blob } | null>(
    null,
  );
  const [quality, setQuality] = useState(70);
  const [format, setFormat] = useState<"jpeg" | "webp">("jpeg");
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);

  const handleFile = async (file: File) => {
    setBusy(true);
    setCompressed(null);
    const url = URL.createObjectURL(file);
    setOriginal({ url, size: file.size, name: file.name });
    await compress(file, quality, format);
    setBusy(false);
  };

  const compress = async (file: File, q: number, fmt: "jpeg" | "webp") => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Could not load image"));
      img.src = dataUrl;
    });
    const maxW = 1920;
    const scale = img.width > maxW ? maxW / img.width : 1;
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), `image/${fmt}`, q / 100),
    );
    if (blob) {
      setCompressed({ url: URL.createObjectURL(blob), size: blob.size, blob });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  const recompress = async () => {
    if (!fileInput.current?.files?.[0]) return;
    setBusy(true);
    await compress(fileInput.current.files[0], quality, format);
    setBusy(false);
  };

  const reset = () => {
    setOriginal(null);
    setCompressed(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const savings = original && compressed ? Math.max(0, ((original.size - compressed.size) / original.size) * 100) : 0;

  return (
    <div className="space-y-5">
      {!original ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          onClick={() => fileInput.current?.click()}
          className={cn(
            "glass border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all",
            drag ? "border-primary bg-primary/10" : "border-border hover:border-primary/50",
          )}
        >
          <div className="mx-auto h-14 w-14 rounded-2xl gradient-bg grid place-items-center text-white shadow-lg shadow-primary/30">
            <Upload className="w-6 h-6" />
          </div>
          <p className="mt-4 text-base font-semibold">Drop an image or click to upload</p>
          <p className="mt-1 text-sm text-muted-foreground">JPG, PNG, or WebP. Up to 25MB.</p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Original
                </span>
                <span className="text-sm font-bold">{formatBytes(original.size)}</span>
              </div>
              <div className="aspect-video rounded-xl bg-muted/30 overflow-hidden grid place-items-center">
                <img
                  src={original.url}
                  alt="Original"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Compressed
                </span>
                <span className="text-sm font-bold">
                  {compressed ? formatBytes(compressed.size) : "—"}
                </span>
              </div>
              <div className="aspect-video rounded-xl bg-muted/30 overflow-hidden grid place-items-center">
                {compressed ? (
                  <img
                    src={compressed.url}
                    alt="Compressed"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <ImageIcon className="w-10 h-10 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>

          {compressed && (
            <div className="glass-strong rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Saved
                </span>
                <div className="text-2xl font-extrabold gradient-text">
                  {savings.toFixed(1)}%
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {formatBytes(original.size)} → {formatBytes(compressed.size)}
              </div>
            </div>
          )}

          <div className="glass rounded-2xl p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold">Quality</label>
                <span className="text-sm font-bold tabular-nums">{quality}</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                onMouseUp={recompress}
                onTouchEnd={recompress}
                className="w-full accent-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["jpeg", "webp"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFormat(f);
                    setTimeout(recompress, 0);
                  }}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-semibold transition-colors",
                    format === f
                      ? "gradient-bg text-white"
                      : "glass-strong hover:bg-muted/40",
                  )}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {compressed && (
              <a
                href={compressed.url}
                download={`compressed-${original.name.replace(/\.[^.]+$/, "")}.${format}`}
                className="inline-flex items-center gap-2 rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30"
              >
                <Download className="w-4 h-4" />
                Download Compressed
              </a>
            )}
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl glass-strong px-4 py-3 text-sm font-semibold hover:bg-muted/40"
            >
              <Trash2 className="w-4 h-4" />
              Start Over
            </button>
            {busy && <span className="text-sm text-muted-foreground">Working…</span>}
          </div>
        </div>
      )}
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
}
