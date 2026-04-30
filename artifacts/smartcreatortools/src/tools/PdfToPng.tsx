import { useRef, useState } from "react";
import { Upload, Download, FileImage, Trash2, Loader2 } from "lucide-react";
import JSZip from "jszip";
import { cn } from "@/lib/utils";

interface PageImage {
  pageNumber: number;
  dataUrl: string;
}

export function PdfToPng() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [pages, setPages] = useState<PageImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [drag, setDrag] = useState(false);
  const [filename, setFilename] = useState("");
  const [err, setErr] = useState("");

  const convert = async (file: File) => {
    setBusy(true);
    setPages([]);
    setProgress(0);
    setErr("");
    setFilename(file.name.replace(/\.pdf$/i, ""));
    try {
      const pdfjs = await import("pdfjs-dist");
      const workerUrl = (await import("pdfjs-dist/build/pdf.worker.mjs?url")).default;
      pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

      const buf = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buf }).promise;
      const total = pdf.numPages;
      const out: PageImage[] = [];
      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        out.push({ pageNumber: i, dataUrl: canvas.toDataURL("image/png") });
        setProgress(Math.round((i / total) * 100));
        setPages([...out]);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to convert PDF");
    } finally {
      setBusy(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) convert(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") convert(file);
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    for (const p of pages) {
      const base64 = p.dataUrl.split(",")[1];
      zip.file(`${filename}-page-${p.pageNumber}.png`, base64, { base64: true });
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}-pages.zip`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setPages([]);
    setProgress(0);
    setErr("");
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="space-y-5">
      {pages.length === 0 && !busy ? (
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
          <p className="mt-4 text-base font-semibold">Drop a PDF or click to upload</p>
          <p className="mt-1 text-sm text-muted-foreground">Up to 100MB · runs locally</p>
        </div>
      ) : (
        <>
          {busy && (
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-sm font-semibold">Converting pages… {progress}%</span>
              </div>
              <div className="mt-3 h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-bg transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {pages.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {pages.length} {pages.length === 1 ? "page" : "pages"} converted
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={downloadAll}
                  className="inline-flex items-center gap-2 rounded-xl gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30"
                >
                  <Download className="w-4 h-4" />
                  Download All as ZIP
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl glass-strong px-4 py-2.5 text-sm font-semibold hover:bg-muted/40"
                >
                  <Trash2 className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pages.map((p) => (
              <div key={p.pageNumber} className="glass rounded-2xl p-3">
                <div className="aspect-[3/4] rounded-xl bg-muted overflow-hidden">
                  <img
                    src={p.dataUrl}
                    alt={`Page ${p.pageNumber}`}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Page {p.pageNumber}
                  </span>
                  <a
                    href={p.dataUrl}
                    download={`${filename}-page-${p.pageNumber}.png`}
                    className="inline-flex items-center gap-1 rounded-lg bg-primary/10 text-primary px-2.5 py-1 text-xs font-semibold hover:bg-primary/20"
                  >
                    <Download className="w-3 h-3" />
                    PNG
                  </a>
                </div>
              </div>
            ))}
          </div>

          {pages.length === 0 && !busy && (
            <div className="text-center py-12 text-muted-foreground">
              <FileImage className="w-12 h-12 mx-auto opacity-50" />
            </div>
          )}
        </>
      )}
      {err && <p className="text-sm text-destructive">{err}</p>}
      <input
        ref={fileInput}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
}
