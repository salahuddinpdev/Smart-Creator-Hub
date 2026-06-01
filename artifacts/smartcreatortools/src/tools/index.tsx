import type { ComponentType } from "react";
import { AiTextHumanizer } from "./AiTextHumanizer";
import { ImageCompressor } from "./ImageCompressor";
import { QrCodeGenerator } from "./QrCodeGenerator";
import { WordCounter } from "./WordCounter";
import { PdfToPng } from "./PdfToPng";
import { CodeToImage } from "./CodeToImage";
import { GpaPredictor } from "./GpaPredictor";
import { CaseConverter } from "./CaseConverter";
import { LoremIpsumGenerator } from "./LoremIpsumGenerator";
import { JsonFormatter } from "./JsonFormatter";
import { Base64Encoder } from "./Base64Encoder";
import { UrlEncoder } from "./UrlEncoder";
import { PasswordGenerator } from "./PasswordGenerator";
import { ColorPicker } from "./ColorPicker";
import { MarkdownToHtml } from "./MarkdownToHtml";
import { AgeCalculator } from "./AgeCalculator";
import { BmiCalculator } from "./BmiCalculator";
import { PercentageCalculator } from "./PercentageCalculator";
import { UnitConverter } from "./UnitConverter";
import { TextDiffChecker } from "./TextDiffChecker";
import { HashGenerator } from "./HashGenerator";
import { UuidGenerator } from "./UuidGenerator";
import { TimestampConverter } from "./TimestampConverter";
import { CsvToJson } from "./CsvToJson";
import { RegexTester } from "./RegexTester";
import { HtmlEntityEncoder } from "./HtmlEntityEncoder";
import { BinaryConverter } from "./BinaryConverter";
import { TextToSlug } from "./TextToSlug";
import { WordFrequencyAnalyzer } from "./WordFrequencyAnalyzer";
import { TextRepeater } from "./TextRepeater";
import { TextReverser } from "./TextReverser";
import { MorseCodeTranslator } from "./MorseCodeTranslator";
import { RomanNumeralConverter } from "./RomanNumeralConverter";
import { NumberToWords } from "./NumberToWords";
import { ListRandomizer } from "./ListRandomizer";
import { PomodoroTimer } from "./PomodoroTimer";
import { CountdownTimer } from "./CountdownTimer";
import { TipCalculator } from "./TipCalculator";
import { LoanCalculator } from "./LoanCalculator";
import { TaxCalculator } from "./TaxCalculator";
import { DiscountCalculator } from "./DiscountCalculator";
import { AspectRatioCalculator } from "./AspectRatioCalculator";
import { ColorPaletteGenerator } from "./ColorPaletteGenerator";
import { GradientGenerator } from "./GradientGenerator";
import { MetaTagGenerator } from "./MetaTagGenerator";
import { ReadingTimeCalculator } from "./ReadingTimeCalculator";
import { CharacterLimitChecker } from "./CharacterLimitChecker";
import { NumberBaseConverter } from "./NumberBaseConverter";
import { JsonToCsv } from "./JsonToCsv";
import { TextSorter } from "./TextSorter";
import { AiTextSummarizer } from "./AiTextSummarizer";

export const toolComponents: Record<string, ComponentType> = {
  "ai-text-humanizer": AiTextHumanizer,
  "image-compressor": ImageCompressor,
  "qr-code-generator": QrCodeGenerator,
  "word-counter": WordCounter,
  "pdf-to-png": PdfToPng,
  "code-to-image": CodeToImage,
  "gpa-predictor": GpaPredictor,
  "case-converter": CaseConverter,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "json-formatter": JsonFormatter,
  "base64-encoder": Base64Encoder,
  "url-encoder": UrlEncoder,
  "password-generator": PasswordGenerator,
  "color-picker": ColorPicker,
  "markdown-to-html": MarkdownToHtml,
  "age-calculator": AgeCalculator,
  "bmi-calculator": BmiCalculator,
  "percentage-calculator": PercentageCalculator,
  "unit-converter": UnitConverter,
  "text-diff-checker": TextDiffChecker,
  "hash-generator": HashGenerator,
  "uuid-generator": UuidGenerator,
  "timestamp-converter": TimestampConverter,
  "csv-to-json": CsvToJson,
  "regex-tester": RegexTester,
  "html-entity-encoder": HtmlEntityEncoder,
  "binary-converter": BinaryConverter,
  "text-to-slug": TextToSlug,
  "word-frequency-analyzer": WordFrequencyAnalyzer,
  "text-repeater": TextRepeater,
  "text-reverser": TextReverser,
  "morse-code-translator": MorseCodeTranslator,
  "roman-numeral-converter": RomanNumeralConverter,
  "number-to-words": NumberToWords,
  "list-randomizer": ListRandomizer,
  "pomodoro-timer": PomodoroTimer,
  "countdown-timer": CountdownTimer,
  "tip-calculator": TipCalculator,
  "loan-calculator": LoanCalculator,
  "tax-calculator": TaxCalculator,
  "discount-calculator": DiscountCalculator,
  "aspect-ratio-calculator": AspectRatioCalculator,
  "color-palette-generator": ColorPaletteGenerator,
  "gradient-generator": GradientGenerator,
  "meta-tag-generator": MetaTagGenerator,
  "reading-time-calculator": ReadingTimeCalculator,
  "character-limit-checker": CharacterLimitChecker,
  "number-base-converter": NumberBaseConverter,
  "json-to-csv": JsonToCsv,
  "text-sorter": TextSorter,
  "ai-text-summarizer": AiTextSummarizer,
};
