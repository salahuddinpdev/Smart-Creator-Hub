import { useRef, useState } from "react";
import { Upload, FileText, Download, Loader2, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function WordToPdf() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  const handleFile = async (f: File) => {
    if (!f.name.match(/\.(docx)$/i)) {
      setError("Only .docx files are supported. Please upload a Word (.docx) file.");
      return;
    }
    setFile(f);
    setError("");
    setDone(false);
    setPreview("");

    try {
      const arrayBuffer = await f.arrayBuffer();
      const mammoth = (await import("mammoth")).default;
      const result = await mammoth.extractRawText({ arrayBuffer });
      setPreview(result.value.slice(0, 500));
    } catch {
      setPreview("");
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const convert = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const mammoth = (await import("mammoth")).default;
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      const { default: jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const margin = 20;
      const pageWidth = 210;
      const pageHeight = 297;
      const lineHeight = 6.5;
      const paraSpacing = 4;
      const maxWidth = pageWidth - margin * 2;
      let y = margin + 5;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);
      pdf.setTextColor(30, 30, 40);

      const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0);

      for (const para of paragraphs) {
        const lines = pdf.splitTextToSize(para.trim(), maxWidth);
        for (const line of lines) {
          if (y + lineHeight > pageHeight - margin) {
            pdf.addPage();
            y = margin + 5;
          }
          pdf.text(line, margin, y);
          y += lineHeight;
        }
        y += paraSpacing;
      }

      const outName = file.name.replace(/\.docx$/i, "") + ".pdf";
      pdf.save(outName);
      setDone(true);
    } catch {
      setError("Conversion failed. Please ensure you uploaded a valid .docx file.");
    } finally {
      setBusy(false);
    }
  };

  const clear = () => {
    setFile(null);
    setPreview("");
    setDone(false);
    setError("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {!file ? (
        <div
          onDragEnter={(e) => { e.preventDefault(); setDrag(true); }}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all py-14 px-6",
            drag
              ? "border-primary bg-primary/8 scale-[1.01]"
              : "border-border hover:border-primary/50 hover:bg-primary/4",
          )}
          role="button"
          tabIndex={0}
          aria-label="Upload Word document"
          onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
        >
          <div className="h-14 w-14 rounded-2xl gradient-bg grid place-items-center shadow-lg shadow-primary/30">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-sm sm:text-base">Drop your Word file here</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              .docx files only · click to browse
            </p>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={onFileChange}
          />
        </div>
      ) : (
        <div className="glass rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-bg grid place-items-center shadow-md shadow-primary/25 shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              type="button"
              onClick={clear}
              className="h-8 w-8 grid place-items-center rounded-lg hover:bg-muted/60 transition-colors text-muted-foreground"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {preview && (
            <div className="rounded-xl bg-muted/40 p-4 text-xs text-muted-foreground leading-relaxed max-h-32 overflow-y-auto scrollbar-thin font-mono">
              {preview}{preview.length >= 500 ? "…" : ""}
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}

          {done ? (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              PDF downloaded successfully!
            </div>
          ) : (
            <button
              type="button"
              onClick={convert}
              disabled={busy}
              className="w-full btn-primary py-3 rounded-xl text-sm font-semibold"
            >
              {busy ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Converting…
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Convert & Download PDF
                </>
              )}
            </button>
          )}
        </div>
      )}

      <div className="glass rounded-2xl p-5 text-sm text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">How it works:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Upload any <strong>.docx</strong> Word document</li>
          <li>The text content is extracted and laid out on A4 pages</li>
          <li>A clean PDF is generated and downloaded instantly</li>
          <li>100% private — nothing is uploaded to any server</li>
        </ul>
        <p className="text-xs mt-2 text-muted-foreground/70">
          Note: Complex formatting (tables, images, columns) is simplified to plain text in the PDF.
        </p>
      </div>
    </div>
  );
}
