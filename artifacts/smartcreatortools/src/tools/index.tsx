import type { ComponentType } from "react";
import { AiTextHumanizer } from "./AiTextHumanizer";
import { ImageCompressor } from "./ImageCompressor";
import { QrCodeGenerator } from "./QrCodeGenerator";
import { WordCounter } from "./WordCounter";
import { PdfToPng } from "./PdfToPng";
import { CodeToImage } from "./CodeToImage";
import { GpaPredictor } from "./GpaPredictor";

export const toolComponents: Record<string, ComponentType> = {
  "ai-text-humanizer": AiTextHumanizer,
  "image-compressor": ImageCompressor,
  "qr-code-generator": QrCodeGenerator,
  "word-counter": WordCounter,
  "pdf-to-png": PdfToPng,
  "code-to-image": CodeToImage,
  "gpa-predictor": GpaPredictor,
};
