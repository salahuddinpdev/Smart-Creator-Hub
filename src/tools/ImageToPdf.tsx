import { useRef, useState, useCallback } from "react";
import { Upload, Download, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageEntry {
  id: string;
  file: File;
  preview: string;
  name: string;
}

export function ImageToPdf() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const addFiles = useCallback((files: FileList | File[]) => {
    const accepted: ImageEntry[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.match(/^image\/(jpeg|png|webp)$/)) continue;
      accepted.push({
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
      });
    }
    if (accepted.length === 0) {
      setError("Only JPG, PNG, and WEBP images are supported.");
      return;
    }
    setError("");
    setDone(false);
    setImages((prev) => [...prev, ...accepted]);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const remove = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
    setDone(false);
  };

  const move = (index: number, direction: -1 | 1) => {
    const next = index + direction;
    if (next < 0 || next >= images.length) return;
    setImages((prev) => {
      const arr = [...prev];
      [arr[index], arr[next]] = [arr[next], arr[index]];
      return arr;
    });
  };

  const convert = async () => {
    if (images.length === 0) return;
    setBusy(true);
    setError("");
    try {
      const { default: jsPDF } = await import("jspdf");
      const A4_W = 210;
      const A4_H = 297;
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();

        const img = images[i];
        const dataUrl = await fileToDataUrl(img.file);

        const tempImg = new window.Image();
        await new Promise<void>((res, rej) => {
          tempImg.onload = () => res();
          tempImg.onerror = rej;
          tempImg.src = dataUrl;
        });

        const iw = tempImg.naturalWidth;
        const ih = tempImg.naturalHeight;
        const ratio = Math.min(A4_W / iw, A4_H / ih);
        const fw = iw * ratio;
        const fh = ih * ratio;
        const x = (A4_W - fw) / 2;
        const y = (A4_H - fh) / 2;

        const fmt = img.file.type === "image/png" ? "PNG" : "JPEG";
        pdf.addImage(dataUrl, fmt, x, y, fw, fh);
      }

      pdf.save("images.pdf");
      setDone(true);
    } catch {
      setError("Conversion failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Drop zone */}
      <div
        onDragEnter={(e) => { e.preventDefault(); setDrag(true); }}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all py-10 px-6",
          drag
            ? "border-primary bg-primary/8 scale-[1.01]"
            : "border-border hover:border-primary/50 hover:bg-primary/4",
        )}
        role="button"
        tabIndex={0}
        aria-label="Upload images"
        onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
      >
        <div className="h-14 w-14 rounded-2xl gradient-bg grid place-items-center shadow-lg shadow-primary/30">
          <ImageIcon className="w-7 h-7 text-white" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-sm sm:text-base">
            {images.length > 0 ? "Add more images" : "Drop images here"}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            JPG, PNG, WEBP · drag or click to select
          </p>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive font-medium">{error}</p>
      )}

      {/* Image list */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              {images.length} image{images.length !== 1 ? "s" : ""} · drag to reorder
            </h3>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              Add more
            </button>
          </div>

          <div className="space-y-2">
            {images.map((img, i) => (
              <div
                key={img.id}
                className="glass rounded-xl p-3 flex items-center gap-3"
              >
                <img
                  src={img.preview}
                  alt={img.name}
                  className="h-12 w-16 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{img.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Page {i + 1} of {images.length}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="h-7 w-7 grid place-items-center rounded-lg hover:bg-muted/60 transition-colors disabled:opacity-30"
                    aria-label="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === images.length - 1}
                    className="h-7 w-7 grid place-items-center rounded-lg hover:bg-muted/60 transition-colors disabled:opacity-30"
                    aria-label="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(img.id)}
                    className="h-7 w-7 grid place-items-center rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={convert}
            disabled={busy}
            className="w-full btn-primary py-3 rounded-xl text-sm font-semibold"
          >
            {busy ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Building PDF…
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download PDF ({images.length} page{images.length !== 1 ? "s" : ""})
              </>
            )}
          </button>

          {done && (
            <p className="text-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              PDF downloaded successfully!
            </p>
          )}
        </div>
      )}

      {images.length === 0 && (
        <div className="glass rounded-2xl p-5 text-sm text-muted-foreground space-y-2">
          <p className="font-semibold text-foreground">How it works:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Upload one or more JPG, PNG, or WEBP images</li>
            <li>Reorder pages with the arrows</li>
            <li>Click Download PDF — each image becomes one page</li>
            <li>Everything runs in your browser, nothing is uploaded</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
