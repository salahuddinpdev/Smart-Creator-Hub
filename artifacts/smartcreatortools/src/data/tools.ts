import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  ImageDown,
  QrCode,
  Type,
  FileImage,
  Code2,
  GraduationCap,
  CaseSensitive,
  AlignLeft,
  Braces,
  Binary,
  Link2,
  KeyRound,
  Palette,
  FileCode,
  Cake,
  Scale,
  Percent,
  Ruler,
  GitCompare,
  Hash,
  Fingerprint,
  Clock,
  Table2,
  Search,
  Globe,
  Cpu,
  BarChart2,
  Repeat,
  ArrowRightLeft,
  Radio,
  Crown,
  Sigma,
  Shuffle,
  Timer,
  Hourglass,
  Receipt,
  PiggyBank,
  DollarSign,
  Tag,
  Maximize2,
  Wand2,
  Layers,
  FileText,
  BookOpen,
  MessageSquare,
  Calculator,
  ListOrdered,
  TextCursorInput,
  Columns2,
} from "lucide-react";

export type ToolCategory =
  | "Text"
  | "Image"
  | "Developer"
  | "Student"
  | "Productivity";

export interface Tool {
  slug: string;
  name: string;
  category: ToolCategory;
  icon: LucideIcon;
  shortDescription: string;
  longDescription: string;
  keywords: string[];
  featured: boolean;
  trending: boolean;
  functional: boolean;
  accent: string;
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  "Text",
  "Image",
  "Developer",
  "Student",
  "Productivity",
];

export const tools: Tool[] = [
  {
    slug: "ai-text-humanizer",
    name: "AI Text Humanizer",
    category: "Text",
    icon: Sparkles,
    shortDescription:
      "Transform robotic AI-generated text into natural, human-sounding writing in one click.",
    longDescription:
      "AI Text Humanizer takes the polished but mechanical output of large language models and rewrites it into natural, conversational prose that reads like a real person wrote it. The tool runs entirely in your browser — your text never leaves your device, which means it stays private even when you paste sensitive drafts. Under the hood, it scans for the formal markers that AI writing almost always overuses: words like utilize, commence, demonstrate, subsequently, additionally, and phrases like in order to or due to the fact that. It swaps them for shorter, more natural alternatives while preserving capitalization and punctuation. It also expands awkward constructions into contractions, lightly varies sentence rhythm, and trims the academic stiffness that gets AI essays flagged by detectors. The result is text that still says what you meant, but sounds like you wrote it on a Tuesday afternoon. Use it on blog drafts, cold emails, application essays, marketing copy, social posts, or anywhere your AI assistant produced something that reads a little too clean. It is especially popular with students worried about AI detection, freelance writers who use AI as a starting point, and marketers trying to keep their brand voice human. Because it is a deterministic rewrite rather than a black-box model, you can predict and trust the output. Run it once, skim, edit a sentence or two, and you have writing that sounds genuinely yours.",
    keywords: ["humanize ai text", "ai detector bypass", "rewrite ai", "natural writing"],
    featured: true,
    trending: true,
    functional: true,
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    slug: "image-compressor",
    name: "Image Compressor",
    category: "Image",
    icon: ImageDown,
    shortDescription:
      "Shrink JPEG, PNG and WebP images up to 90% smaller with no visible quality loss.",
    longDescription:
      "Image Compressor uses the browser Canvas API to re-encode your photos at a lower file size while keeping them sharp enough that the difference is hard to spot. Drop in any JPEG, PNG, or WebP and the tool decodes it locally, redraws it onto a canvas, and exports it again with a quality setting you control. Nothing is ever uploaded to a server, so it works on private screenshots, client photos, and personal pictures without any risk. You get a live before-and-after preview, exact byte counts, and a percentage saved indicator so you know what you are giving up. The tool is ideal for compressing hero images for landing pages, shrinking product photos for an online store, getting an oversized profile picture under a 2 MB upload limit, or batch-prepping photos for email and chat. Modern websites lose users in milliseconds when images are slow to load, so trimming a 4 MB photo down to 400 KB has a real, measurable impact on Core Web Vitals, Lighthouse scores, and conversion rates. Because the compression happens in your browser using the same engines that render your pages, what you preview is exactly what visitors will see. Use the quality slider to find the sweet spot for your content — photographs typically tolerate 60 to 75 quality with no visible artifacts, while flatter graphics like screenshots can drop even lower. When you are happy, download the compressed file and ship it.",
    keywords: ["image compressor", "compress jpg", "reduce file size", "optimize images"],
    featured: true,
    trending: true,
    functional: true,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    category: "Developer",
    icon: QrCode,
    shortDescription:
      "Create custom QR codes for URLs, Wi-Fi, contact cards and more — download as PNG.",
    longDescription:
      "QR Code Generator builds high-resolution, scannable QR codes for any text or URL you paste in. Pick custom foreground and background colors, set the output size from a postcard sticker to a print-ready poster, and download a crisp PNG with one click. The codes are generated locally in your browser using a fully open-source encoder, so the URLs you share — including private staging links and unlisted documents — never touch a third-party server. QR codes have quietly become one of the highest-leverage marketing tools of the decade. They turn restaurant tables into ordering kiosks, business cards into instant contact saves, museum walls into audio tours, packaging into onboarding flows, and posters into one-tap signup pages. A single well-placed QR code can cut friction enough to double conversion on offline-to-online journeys. Designers love this tool because it lets them tint codes to match a brand palette without sacrificing scannability — the encoder uses high error correction so even moderately styled codes still read reliably from a phone camera. Developers love it because it produces a clean PNG that drops straight into a slide deck, a Figma board, or a Next.js public folder. Use it for product launches, event check-ins, menu links, podcast referrals, GitHub profile cards, donation pages, Wi-Fi login sharing at coffee shops, or anywhere you want to bridge the physical and digital world without making someone type a long URL.",
    keywords: ["qr code generator", "free qr maker", "custom qr png", "wifi qr"],
    featured: true,
    trending: true,
    functional: true,
    accent: "from-sky-500 to-indigo-500",
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    category: "Text",
    icon: Type,
    shortDescription:
      "Real-time character, word, sentence, paragraph and reading-time stats as you type.",
    longDescription:
      "Word Counter is a writer's dashboard. Drop or type any text into the editor and the panel beside it updates live with everything you might need to know: total characters, characters without spaces, words, sentences, paragraphs, estimated reading time, estimated speaking time, longest word, and most-frequent word. There is no Generate button — the moment you stop typing, the numbers settle. It is the fastest way to hit a 280-character tweet, a 500-word school essay, a 1500-word blog post, a 60-second TikTok script, or a precise meta description that needs to land between 150 and 160 characters. Reading time is calculated at a natural 200 words per minute, the average for adult readers in English, and speaking time at 130 words per minute, the rate professional voice actors target for clarity. Both numbers help you size content for podcasts, presentations, video voiceovers, and YouTube intros. Students use it to stay inside word-count requirements without guessing, copywriters use it to keep ad headlines punchy, and authors use it to track daily writing goals. Because the entire tool runs in your browser, you can keep it open in a tab while working on confidential drafts, internal memos, or unannounced product copy without any of it ever being sent over the internet. Paste, write, edit, repeat — and never wonder how long something is again.",
    keywords: ["word counter", "character counter", "reading time", "essay length"],
    featured: true,
    trending: true,
    functional: true,
    accent: "from-amber-500 to-orange-500",
  },
  {
    slug: "pdf-to-png",
    name: "PDF to PNG",
    category: "Developer",
    icon: FileImage,
    shortDescription:
      "Convert every page of a PDF into high-resolution PNG images, downloadable as a ZIP.",
    longDescription:
      "PDF to PNG turns every page of a PDF document into a crisp, high-resolution PNG image that you can drop into a slide, a website, a chat, or a design file. The conversion happens entirely client-side using a battle-tested PDF rendering engine, which means your file never gets uploaded to a server. That matters when the document is a contract, a medical form, a financial statement, an unreleased pitch deck, or anything else you would not paste into a random web converter. After you select a PDF, every page renders into the preview grid as a thumbnail. You can download individual pages with one tap, or grab the whole thing as a single ZIP archive. The output PNGs are full-resolution and preserve the original layout, fonts, and embedded images, so they look identical to what would print. Use it to extract a single page from a contract for emailing, to turn a bank statement into shareable images for an expense report, to pull cover art out of an ebook, to convert academic papers into images for citation slides, or to prepare PDF screenshots for blog posts and tutorials. Designers use it to feed PDF mockups into Figma, while teachers use it to share single worksheet pages with a class. The tool handles multi-page PDFs of any reasonable length and scales each page to a high pixel density so the resulting PNGs stay sharp on Retina and 4K displays.",
    keywords: ["pdf to png", "pdf converter", "pdf to image", "extract pdf page"],
    featured: true,
    trending: true,
    functional: true,
    accent: "from-rose-500 to-red-500",
  },
  {
    slug: "code-to-image",
    name: "Code to Image",
    category: "Developer",
    icon: Code2,
    shortDescription:
      "Turn code snippets into beautiful, share-ready PNG screenshots with custom themes.",
    longDescription:
      "Code to Image converts any snippet of code into a polished, share-ready screenshot. Paste your code, pick a language, choose a gradient background, set the padding, name the file, and the editor renders a designer-quality card with macOS-style window controls, a clean monospace font, and lightweight syntax highlighting. Hit export and you get a transparent or solid PNG sized perfectly for Twitter, LinkedIn, Mastodon, blog hero images, conference slides, README banners, and design portfolios. It supports JavaScript, TypeScript, Python, HTML, CSS, JSON, and Bash out of the box, with sensible color tokens for keywords, strings, numbers, and comments so your code looks right at a glance. The whole tool runs in the browser, which means private snippets — internal API keys redacted, of course — never leave your machine. Developers use it to make blog posts and tutorials more scannable, since a beautifully styled code card invites a reader to actually look at the code rather than skip past it. Educators use it to share examples on slides where a wall of plain text would lose the room. Indie hackers use it to make launch tweets that stand out in a feed full of plain screenshots. The control panel lets you experiment with different background gradients, padding sizes, and corner rounding until the snippet feels right, then exports an image that looks like it came out of a polished design tool — without the design work.",
    keywords: ["code to image", "code screenshot", "carbon alternative", "share code"],
    featured: true,
    trending: true,
    functional: true,
    accent: "from-indigo-500 to-purple-500",
  },
  {
    slug: "gpa-predictor",
    name: "GPA & Goal Predictor",
    category: "Student",
    icon: GraduationCap,
    shortDescription:
      "Calculate the exact GPA you need in remaining courses to hit your target CGPA.",
    longDescription:
      "GPA & Goal Predictor is the calculator every student wishes they had at the start of the semester. Enter your current cumulative GPA, the number of credits you have already completed, your target CGPA, and the number of credits remaining in your degree, and the tool tells you exactly what GPA you need to average across those remaining courses to land on your goal. It also gives you an honest verdict — whether the target is comfortably achievable, going to require some work, or mathematically impossible given your current standing. There is no signup, no spreadsheet, and no guessing. The math behind the scenes is the standard credit-weighted average formula used by every accredited university, so the answer matches what your registrar will calculate at graduation. Use it before locking in next semester's course load to make sure you are not overcommitting, before deciding whether to retake a course, before applying to graduate school where minimum GPAs matter, and before negotiating with academic advisors about your course plan. The bar chart visualization makes it instantly clear how far above or below your current GPA you need to perform. Many students discover that their target is closer than they thought, while others realize they need to recalibrate their goal — both are useful answers. Because it runs in your browser, you can plug in different scenarios as fast as you can type and see the impact on your CGPA in real time.",
    keywords: ["gpa calculator", "cgpa predictor", "target gpa", "grade calculator"],
    featured: true,
    trending: true,
    functional: true,
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    category: "Text",
    icon: CaseSensitive,
    shortDescription:
      "Switch text between UPPER, lower, Title, Sentence, camelCase and snake_case instantly.",
    longDescription:
      "Case Converter flips any block of text between every casing style writers and developers reach for: UPPERCASE for headlines, lowercase for casual copy, Title Case for blog posts, Sentence case for body paragraphs, camelCase for JavaScript identifiers, PascalCase for class names, snake_case for Python variables, kebab-case for URLs and CSS classes, and CONSTANT_CASE for environment variables. It is the kind of tool you do not realize you need until you are reformatting a list of fifty product names, cleaning up a CSV column of customer emails, normalizing a list of database keys, or fixing a copy-pasted heading that came in screaming. The conversion is instant and runs entirely in your browser, so even if your text is a list of internal SKUs, draft press release copy, or a user export, nothing leaves your device. Writers love it for cleaning up dictation output that always comes back over-capitalized. Developers love it for converting JSON keys between API conventions without writing a one-off script. Marketers love it for matching their brand style guide across product names, ad headlines, and meta titles. Designers love it for pasting client copy and getting it formatted to spec without manual editing. The tool handles long documents, preserves punctuation correctly, and offers a one-click copy button so you can paste the result back wherever you grabbed the original from.",
    keywords: ["case converter", "uppercase", "title case", "camelcase"],
    featured: false,
    trending: true,
    functional: true,
    accent: "from-cyan-500 to-blue-500",
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    category: "Text",
    icon: AlignLeft,
    shortDescription:
      "Generate placeholder paragraphs, sentences or words for design mockups and prototypes.",
    longDescription:
      "Lorem Ipsum Generator produces realistic-looking filler text for design mockups, wireframes, prototypes, content management system tests, and database seed scripts. Specify exactly what you need — a single sentence, a paragraph, ten paragraphs, or a list of words — and the tool generates classical Lorem Ipsum that matches the rhythm of real prose without distracting from the design you are showcasing. Designers have used Lorem Ipsum for centuries because real copy in a mockup hijacks the conversation: stakeholders start editing the words instead of evaluating the layout, the typography, the spacing, and the visual hierarchy. Filler text keeps everyone focused on the design decisions that actually matter at that stage. The tool also offers a more modern variant for when classical Latin feels out of place in a contemporary product mockup. Use it when prepping client presentations, building UI component libraries, populating skeleton screens during development, seeding sample blog posts in a CMS demo, or testing how a card layout responds to varying content lengths. Output copies cleanly to your clipboard with one click and pastes into Figma, Sketch, your code editor, or your CMS without any extra formatting characters or stray HTML.",
    keywords: ["lorem ipsum", "placeholder text", "dummy text", "filler copy"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-yellow-500 to-amber-500",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    category: "Developer",
    icon: Braces,
    shortDescription:
      "Format, validate and minify JSON with syntax highlighting and error detection.",
    longDescription:
      "JSON Formatter takes any JSON string — even an ugly single-line dump from a server log or a malformed snippet from a half-broken API — and turns it into clean, indented, syntax-highlighted output you can actually read. It also flips the other direction, minifying readable JSON down to a single line for embedding in source code, environment variables, or HTTP request bodies. When the JSON is invalid, the tool tells you exactly where and why so you can fix it instead of squinting at line numbers. Because everything runs in your browser, you can safely paste API responses containing tokens, customer data, or internal payloads without sending them to a third-party server. Backend developers use it to inspect production logs without firing up a debugger. Frontend developers use it to format the JSON they are about to drop into a fixture file. Mobile developers use it to verify API contracts. QA engineers use it to read responses captured from network tools. Data analysts use it to make sense of webhook payloads. The tool also supports collapsing and expanding nested objects, which makes it practical to work with deeply nested API responses where the structure is more important than the values.",
    keywords: ["json formatter", "json validator", "json beautifier", "minify json"],
    featured: false,
    trending: true,
    functional: true,
    accent: "from-lime-500 to-green-500",
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    category: "Developer",
    icon: Binary,
    shortDescription:
      "Encode any text or file to Base64 and decode Base64 strings back to readable form.",
    longDescription:
      "Base64 Encoder converts arbitrary text or binary files into the Base64 representation that powers data URIs, JWT tokens, email attachments, and countless API headers — and decodes Base64 strings back into readable text or downloadable files. The encoding is the standard, RFC-compliant variant, so the output is interchangeable with what every backend language, browser, and HTTP client produces. Web developers use it constantly: embedding small SVG icons directly into CSS as data URIs to avoid extra HTTP requests, decoding the payload of a JWT to inspect user claims, building Authorization: Basic headers for quick API tests, and prepping image attachments for email APIs. Security engineers use it to inspect suspicious payloads, since malware and phishing attempts often shuttle data around in Base64 to slip past simple filters. Backend developers use it to debug content stored as Base64 in databases. The tool runs entirely in your browser, which is important because Base64 strings often contain secrets — API keys, session tokens, internal credentials — that you do not want to paste into a server-side converter.",
    keywords: ["base64 encode", "base64 decode", "data uri", "encoder"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-teal-500 to-emerald-500",
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    category: "Developer",
    icon: Link2,
    shortDescription:
      "Percent-encode and decode URLs and query parameters safely for use in links.",
    longDescription:
      "URL Encoder converts text into percent-encoded form so it can travel safely through URLs and query strings, and reverses the process to make encoded URLs human-readable again. It uses the standard URI component encoding rules, the same algorithm browsers and servers use, so the output round-trips cleanly with every backend, every routing library, and every HTTP client. You will reach for this tool whenever you need to embed a search term, an email address, a redirect target, a tracking parameter, or arbitrary user input into a URL. Encoding ensures characters like spaces, ampersands, plus signs, slashes, and emoji do not break the structure of the link. Decoding lets you read referrer URLs, OAuth callback URIs, and tracked links pulled from analytics dashboards as the human-readable strings they actually represent. Marketers use it to build UTM-tracked share links, paste partner URLs into ad creatives, and inspect campaign URLs from third-party platforms. Developers use it to build redirect URIs for OAuth flows, debug deep links on mobile, prep query strings for fetch calls, and clean up URLs grabbed from server logs.",
    keywords: ["url encoder", "url decoder", "percent encode", "uri component"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-blue-500 to-cyan-500",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    category: "Productivity",
    icon: KeyRound,
    shortDescription:
      "Create strong, random passwords with customizable length and character sets.",
    longDescription:
      "Password Generator creates strong, cryptographically random passwords using the browser's built-in secure random number generator — the same source modern password managers and authentication libraries rely on. Pick a length from short PINs to long passphrases, include or exclude uppercase letters, lowercase letters, numbers, and symbols, and optionally avoid look-alike characters like 1, l, I, 0, O for passwords you may have to type by hand. Because the generation happens in your browser using the Web Crypto API, the password never crosses the network, never lives on a server, and never gets logged anywhere outside your own device. That is the only safe way to generate a password — every online generator that sends results to a server is a security liability waiting to happen. Use it to set up new accounts, rotate stale passwords flagged by data breach checks, generate one-off API keys for personal scripts, create temporary share passwords for clients, or seed strong root credentials for new servers. Pair it with a password manager so you only ever have to remember one master password. The tool produces output that is immediately compatible with every password policy you are likely to encounter.",
    keywords: ["password generator", "strong password", "random password", "secure password"],
    featured: false,
    trending: true,
    functional: true,
    accent: "from-red-500 to-rose-500",
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    category: "Image",
    icon: Palette,
    shortDescription:
      "Pick colors and convert between HEX, RGB, HSL and CSS named values.",
    longDescription:
      "Color Picker lets you choose any color visually and immediately see its HEX, RGB, HSL, and CSS-ready notation side by side. Type one format and the others update in real time, so you can convert between them as fast as you can think about color. It is the tool every designer and developer ends up using a dozen times a day during a design build — converting Figma colors to CSS variables, matching brand colors from a screenshot, building Tailwind theme palettes, or just picking a foreground color that works on a given background. The visual picker uses a saturation field plus a hue slider, the same paradigm every major design tool uses, so it feels immediately familiar. Use it when you need to convert a hex code from a brand guide to an HSL value for a CSS custom property, when you are building a color system and want to see all representations at once, when you are debugging a color that looks different in Chrome and Safari, or when you are matching a screenshot color to a usable CSS value. One-click copy of every format means there is no transcription risk.",
    keywords: ["color picker", "hex to rgb", "color converter", "hsl converter"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-pink-500 to-rose-500",
  },
  {
    slug: "markdown-to-html",
    name: "Markdown to HTML",
    category: "Developer",
    icon: FileCode,
    shortDescription:
      "Convert Markdown to clean, semantic HTML with a live preview as you type.",
    longDescription:
      "Markdown to HTML converts Markdown source into clean, semantic HTML you can paste straight into a website, a CMS, an email template, or a static site generator. As you type or paste Markdown on the left, the right side updates in real time with rendered HTML and a live preview, so you can spot a missing asterisk or a busted link before publishing anything. It supports the full common Markdown spec — headings, bold, italics, links, images, lists, code blocks, blockquotes, and tables — which means it round-trips faithfully with content written for GitHub READMEs, Notion exports, and most modern documentation tools. Writers use it to draft posts in a comfortable plain-text format and ship them as HTML to platforms that do not natively support Markdown. Developers use it to prep documentation, generate snippets for component libraries, and convert internal notes into shareable HTML pages. The output HTML is intentionally minimal: no tracking scripts, no proprietary classes, no inline styles. Just clean, standards-compliant markup ready to drop into your stack of choice.",
    keywords: ["markdown to html", "md converter", "markdown editor", "live preview"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-violet-500 to-indigo-500",
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    category: "Productivity",
    icon: Cake,
    shortDescription:
      "Calculate exact age in years, months, days, hours and minutes from any birthdate.",
    longDescription:
      "Age Calculator tells you exactly how old someone is — not just in years, but in years, months, days, hours, minutes, and seconds — based on a birthdate you enter. The calculation respects the actual length of months and accounts for leap years, so the answer is precise to the day rather than a rough estimate. People use it to fill out forms that require exact age in months for childcare, immigration paperwork, school registration, and pediatric medical records. Parents use it to track milestones for newborns where each week matters. HR teams use it to confirm benefits eligibility around birthdays. Event planners use it to calculate ages for milestone birthdays. Genealogy researchers use it to verify ages in census records and historical documents. The tool runs locally in your browser, which means birthdates and personal information never get logged or transmitted.",
    keywords: ["age calculator", "birthday calculator", "exact age", "years months days"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-orange-500 to-red-500",
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    category: "Student",
    icon: Scale,
    shortDescription:
      "Calculate Body Mass Index in metric or imperial units with health category guidance.",
    longDescription:
      "BMI Calculator computes Body Mass Index from height and weight in either metric or imperial units, then maps the result onto the standard World Health Organization categories: underweight, healthy weight, overweight, and the obesity classes. The formula is the same one used by clinicians, public health agencies, and insurance providers, so the number matches what you would get at a doctor's office. BMI is a population-level health screening tool, not a complete picture of individual health — it does not account for muscle mass, frame size, age, gender, or fitness level — but it remains the most widely cited indicator and is required input for many health forms, life insurance applications, and fitness program intakes. The tool runs entirely in your browser, so the height and weight you enter never get logged, sold, or attached to your identity by an ad network.",
    keywords: ["bmi calculator", "body mass index", "metric imperial", "health calculator"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-green-500 to-lime-500",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "Student",
    icon: Percent,
    shortDescription:
      "Solve every percent problem: of, increase, decrease, change and more.",
    longDescription:
      "Percentage Calculator handles every percent problem people actually run into in real life: what is X percent of Y, what percent is X of Y, what is the percent increase from X to Y, what is the percent decrease from X to Y, and what is X plus or minus Y percent. Each case has its own dedicated input row so you do not have to remember which formula maps to which scenario. Shoppers use it to compute discount prices and check whether a sale is actually as good as the sticker claims. Investors use it to calculate portfolio gains, dividend yields, and compounded returns. Students use it to solve homework problems and check answers. Restaurant tippers use it to figure out 18 or 20 percent on a bill without trusting a server's math. Marketers use it to compute conversion rate changes between A and B test variants.",
    keywords: ["percentage calculator", "percent of", "percent change", "discount calculator"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-amber-500 to-yellow-500",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    category: "Productivity",
    icon: Ruler,
    shortDescription:
      "Convert length, weight, temperature, volume, area and digital units instantly.",
    longDescription:
      "Unit Converter handles the conversions you actually use: length (mm, cm, m, km, inch, foot, yard, mile), weight (g, kg, oz, lb), temperature (Celsius, Fahrenheit, Kelvin), volume (mL, L, fl oz, cup, gallon), area (m², hectare, ft², acre), and digital storage (KB, MB, GB, TB and the binary equivalents). Pick a category, enter a value in any unit, and every other unit in that category updates simultaneously. There is no Convert button — the answer appears as fast as you type. Travelers use it to translate weather forecasts and grocery prices when crossing between countries that use different systems. Cooks use it to follow international recipes without a sticky-note conversion table on the counter. Engineers use it to bridge between metric specs and imperial fasteners. The conversion factors are hard-coded with the official, internationally agreed-upon ratios — nothing approximated — so the answers match what you would get from a reference textbook.",
    keywords: ["unit converter", "metric imperial", "length converter", "temperature"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-sky-500 to-blue-500",
  },
  {
    slug: "text-diff-checker",
    name: "Text Diff Checker",
    category: "Text",
    icon: GitCompare,
    shortDescription:
      "Compare two blocks of text and highlight added, removed and changed lines side by side.",
    longDescription:
      "Text Diff Checker compares two blocks of text side by side and visually highlights every difference between them — added lines, removed lines, and changed sections — using the same approach Git uses for code diffs. Drop in two versions of any document and the tool produces an instantly readable report of exactly what changed, where, and by how much. Writers use it to compare drafts before and after edits, especially when working with collaborators who do not return tracked-changes documents. Lawyers and contract reviewers use it to spot small but consequential edits between contract revisions. Developers use it to compare config files, log outputs, and API responses across runs. Because the comparison happens entirely in your browser, the text you paste — even if it includes confidential drafts, internal documents, or unreleased copy — never leaves your device.",
    keywords: ["text diff", "compare text", "diff checker", "side by side compare"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-indigo-500 to-violet-500",
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    category: "Developer",
    icon: Hash,
    shortDescription:
      "Generate SHA-1, SHA-256, SHA-384, and SHA-512 cryptographic hashes for any text.",
    longDescription:
      "Hash Generator computes cryptographic hash digests of any text using the SHA-1, SHA-256, SHA-384, and SHA-512 algorithms via the browser's native Web Crypto API — no external libraries, no server calls, no data leaving your device. Hashes are one-way fingerprints: the same input always produces the same output, and even a single changed character produces a completely different hash. Developers use it to verify file integrity after downloads, check whether two strings are identical without comparing them directly, generate checksums for build artifacts, and understand how password hashing works. Security engineers use it to test hash comparisons, verify signature inputs, and check whether a suspected preimage matches a known hash. Students use it to learn cryptography concepts with live, real-world output. The SHA-256 and SHA-512 variants are production-grade and used in TLS certificates, Bitcoin, JWT signatures, and most modern password storage systems.",
    keywords: ["sha256", "hash generator", "sha-1", "checksum", "crypto hash"],
    featured: false,
    trending: true,
    functional: true,
    accent: "from-slate-500 to-gray-600",
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    category: "Developer",
    icon: Fingerprint,
    shortDescription:
      "Generate cryptographically random UUID v4 values — one or in bulk.",
    longDescription:
      "UUID Generator produces standards-compliant version 4 UUIDs using the browser's built-in crypto.randomUUID() function, which uses a cryptographically secure random number generator under the hood. Every UUID produced is globally unique with overwhelming statistical probability — the chance of a collision across all UUIDs ever generated is effectively zero. Developers reach for UUIDs as database primary keys, API request identifiers, idempotency keys, session tokens, feature flag names, and temporary file names. The bulk mode lets you generate up to 50 at once for seeding test databases, creating sample data, or prepping a list of identifiers for a batch operation. Toggle uppercase output for codebases that prefer that convention. Because generation happens entirely in your browser using a native API, there is no latency, no rate limit, and no privacy concern.",
    keywords: ["uuid generator", "uuid v4", "random id", "guid generator"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-purple-500 to-violet-500",
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    category: "Developer",
    icon: Clock,
    shortDescription:
      "Convert Unix timestamps to human-readable dates and back, in multiple formats.",
    longDescription:
      "Timestamp Converter translates Unix timestamps — the integer seconds or milliseconds since January 1, 1970 — into human-readable date strings in multiple formats, and converts date strings back into Unix timestamps. It supports both second-precision and millisecond-precision timestamps, handles the Now button for instant current-time reference, and outputs results in ISO 8601, UTC, local time, and a handful of other formats simultaneously so you can pick the one that fits your stack. Backend developers use it to decode timestamps in server logs, database records, and API responses. Frontend developers use it to figure out why a countdown timer is off by an hour. Mobile developers use it to debug timezone issues in date fields. Data engineers use it to convert timestamps between systems with different epoch representations. The tool runs entirely in your browser so you can paste timestamps from internal systems without any privacy concern.",
    keywords: ["unix timestamp", "timestamp converter", "epoch time", "date converter"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-orange-500 to-amber-500",
  },
  {
    slug: "csv-to-json",
    name: "CSV to JSON",
    category: "Developer",
    icon: Table2,
    shortDescription:
      "Paste CSV data and get clean, formatted JSON — supports custom delimiters.",
    longDescription:
      "CSV to JSON converts comma-separated values into a well-structured JSON array of objects, using the first row as the header keys. It supports custom delimiters (comma, semicolon, tab, pipe) to handle exports from different spreadsheet applications and databases. Numeric strings are automatically detected and converted to numbers so you get a clean, usable JSON structure rather than a string-only output. Data engineers use it to prep CSV exports for API ingestion. Developers use it to convert spreadsheet data into fixture files. Analysts use it to transform CSV downloads from analytics tools into JSON for charting libraries. The tool runs in your browser and handles large pastes without any server round-trip.",
    keywords: ["csv to json", "csv converter", "data conversion", "spreadsheet to json"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-green-500 to-emerald-500",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    category: "Developer",
    icon: Search,
    shortDescription:
      "Test regular expressions live with match highlighting and replace preview.",
    longDescription:
      "Regex Tester lets you write a regular expression, test it against a string, and see every match highlighted in real time. It supports the global, case-insensitive, and multiline flags, shows a match count, and includes a replace mode so you can preview substitutions before writing them into your code. Developers use it to craft and debug patterns for form validation, log parsing, URL routing, data extraction, and text processing. The live feedback loop eliminates the edit-run-observe cycle that makes regex debugging so tedious in a full IDE — you see the match change the moment you type a character in the pattern. The error display tells you immediately when a pattern is invalid so you do not chase a runtime exception back to a malformed regex. Everything runs in your browser using the JavaScript RegExp engine, which matches the behavior of Node.js, browser JavaScript, and most frontend frameworks.",
    keywords: ["regex tester", "regular expression", "regex debugger", "pattern matching"],
    featured: false,
    trending: true,
    functional: true,
    accent: "from-yellow-500 to-orange-500",
  },
  {
    slug: "html-entity-encoder",
    name: "HTML Entity Encoder",
    category: "Developer",
    icon: Globe,
    shortDescription:
      "Encode special characters to HTML entities and decode entities back to plain text.",
    longDescription:
      "HTML Entity Encoder converts characters that have special meaning in HTML — ampersands, angle brackets, quotes, and slashes — into their safe entity equivalents, and decodes entity strings back into readable text. This is essential for safely rendering user-generated content in web pages, pasting code samples into blog posts, embedding strings in HTML attributes, and debugging double-encoded pages. Frontend developers use it to safely inject dynamic strings into innerHTML without XSS risk. Technical writers use it to include code samples in HTML documentation. QA engineers use it to test how applications handle special character input. The encoder follows the HTML specification so the output is interchangeable with what server-side frameworks produce.",
    keywords: ["html entity", "encode html", "escape html", "html decode"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-orange-500 to-red-500",
  },
  {
    slug: "binary-converter",
    name: "Binary Converter",
    category: "Developer",
    icon: Cpu,
    shortDescription:
      "Convert text to binary, hex and back — understand how computers store characters.",
    longDescription:
      "Binary Converter translates plain text into its binary (base-2) and hexadecimal representations, and converts binary or hex strings back into readable text. Each character is encoded as its ASCII or UTF-8 byte value, displayed as an 8-bit binary number or a two-digit hex pair. Computer science students use it to understand how text is stored in memory and transmitted over networks. Developers use it to inspect binary protocols, debug encoding issues, and understand byte-level data. Security researchers use it to decode obfuscated strings and inspect binary file headers. The tool is also useful for learning the relationship between text, bytes, binary, and hexadecimal — four representations of the same underlying data.",
    keywords: ["binary converter", "text to binary", "hex converter", "ascii binary"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-slate-500 to-zinc-600",
  },
  {
    slug: "text-to-slug",
    name: "Text to Slug",
    category: "Text",
    icon: TextCursorInput,
    shortDescription:
      "Convert any title or phrase into a clean, SEO-friendly URL slug instantly.",
    longDescription:
      "Text to Slug transforms any title, heading, or phrase into a clean URL slug — lowercase, hyphenated, with accented characters normalized and special characters stripped. It handles kebab-case for URLs and CSS classes, and snake_case for file names and Python identifiers. The normalization uses Unicode decomposition to convert accented characters like é, ü, and ñ into their ASCII equivalents, making slugs safe for any URL or file system. Content managers use it to generate post URLs from blog titles without typing. Developers use it to create consistent identifiers from user input. E-commerce teams use it to generate product URL slugs from product names. The output is immediately usable in any web framework's routing system.",
    keywords: ["url slug", "text to slug", "seo url", "kebab case converter"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-cyan-500 to-teal-500",
  },
  {
    slug: "word-frequency-analyzer",
    name: "Word Frequency Analyzer",
    category: "Text",
    icon: BarChart2,
    shortDescription:
      "Analyze word frequency in any text with a sorted ranking and visual bar chart.",
    longDescription:
      "Word Frequency Analyzer counts how many times each word appears in your text and displays the results as a ranked table with a bar chart so you can see at a glance which words dominate your writing. Stop words (the, a, and, is, etc.) can be toggled off so the analysis focuses on the meaningful vocabulary. Writers use it to identify overused words in long-form content before editing. SEO specialists use it to verify that target keywords appear at the right density. Editors use it to catch repeated phrases across a document. Students use it to analyze the vocabulary of a text for linguistics or literature courses. Because the analysis runs in your browser, you can paste confidential drafts and internal documents without any data leaving your device.",
    keywords: ["word frequency", "keyword density", "text analysis", "word count"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-blue-500 to-indigo-500",
  },
  {
    slug: "text-repeater",
    name: "Text Repeater",
    category: "Text",
    icon: Repeat,
    shortDescription:
      "Repeat any text a set number of times with your choice of separator.",
    longDescription:
      "Text Repeater duplicates any text block a specified number of times, joining repetitions with the separator of your choice — new line, space, comma, pipe, or tab. Developers use it to generate bulk test data, seed SQL INSERT statements, create repeated HTML elements, and produce sample strings for unit tests. Content creators use it to fill templates, create repeated sections, and build structured text programmatically. QA engineers use it to generate edge-case inputs like very long strings or repeated special characters for stress testing input fields and parsers. The tool handles up to 500 repetitions and copies the result to clipboard with one click.",
    keywords: ["text repeater", "repeat text", "duplicate text", "bulk text generator"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-fuchsia-500 to-purple-500",
  },
  {
    slug: "text-reverser",
    name: "Text Reverser",
    category: "Text",
    icon: ArrowRightLeft,
    shortDescription:
      "Reverse characters, words, lines, or sentences in any text block.",
    longDescription:
      "Text Reverser flips text in four distinct modes: character reversal (mirrors the string letter by letter), word reversal (reverses the order of words), line reversal (flips the order of paragraphs or lines), and sentence reversal (reorders sentences within a paragraph). Puzzle creators use character reversal for riddles and ciphers. Writers use word reversal to experiment with prose rhythm. Developers use line reversal to flip ordered lists, log files, and CSV rows. Educators use it to demonstrate string manipulation concepts. The four modes cover the most common reversal needs without requiring any setup — paste your text, pick a mode, and copy the result.",
    keywords: ["reverse text", "text reverser", "mirror text", "backwards text"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-violet-500 to-blue-500",
  },
  {
    slug: "morse-code-translator",
    name: "Morse Code Translator",
    category: "Text",
    icon: Radio,
    shortDescription:
      "Translate text to Morse code dots and dashes, and decode Morse back to text.",
    longDescription:
      "Morse Code Translator converts plain text into Morse code — the dots and dashes used in early telegraph communications — and decodes Morse sequences back into readable text. Word boundaries are represented by forward slashes so multi-word messages translate cleanly. Hobbyists use it to encode messages for amateur radio, to learn Morse code, and to decode signals received on air. Puzzle designers use it to create ciphers for escape rooms, treasure hunts, and ARGs. Educators use it to teach communication history and the basics of binary encoding. The translator covers all 26 letters, digits 0-9, and common punctuation marks, and includes a reference chart for learning the alphabet.",
    keywords: ["morse code", "morse translator", "morse decoder", "dots and dashes"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-amber-500 to-yellow-500",
  },
  {
    slug: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    category: "Text",
    icon: Crown,
    shortDescription:
      "Convert integers to Roman numerals and Roman numerals back to numbers.",
    longDescription:
      "Roman Numeral Converter translates integers from 1 to 3,999 into their Roman numeral equivalents and decodes Roman numeral strings back into decimal integers. The conversion follows the standard subtractive notation rules (IV = 4, IX = 9, XL = 40, etc.) as defined by the classical system. Historians use it for referencing dates and volumes in historical texts. Students use it for math homework and history assignments. Book publishers use it for preface and chapter numbering. Designers use it for clock faces, monument inscriptions, and decorative numbering. The tool includes a reference chart of the key Roman numeral values so you can cross-check conversions.",
    keywords: ["roman numerals", "roman numeral converter", "number to roman", "latin numbers"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-yellow-600 to-amber-600",
  },
  {
    slug: "number-to-words",
    name: "Number to Words",
    category: "Text",
    icon: Sigma,
    shortDescription:
      "Convert any number into its English word equivalent — cardinal and ordinal.",
    longDescription:
      "Number to Words converts integers into their spelled-out English equivalents, up to the trillions. It supports both cardinal form (one, two, three) and ordinal form (first, second, third) with a single toggle. Finance professionals use it to write out amounts on checks and invoices where the spelled form is required. Legal teams use it to confirm that numeric and word representations match in contracts. Developers use it to format output for text-to-speech systems, document generators, and localization systems. Students use it to learn and verify the correct English spelling of large numbers. Negative numbers are handled with the word 'negative' prepended.",
    keywords: ["number to words", "number spelling", "integer to words", "write out number"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-emerald-500 to-green-500",
  },
  {
    slug: "list-randomizer",
    name: "List Randomizer",
    category: "Productivity",
    icon: Shuffle,
    shortDescription:
      "Shuffle a list of items randomly or pick N random items from any list.",
    longDescription:
      "List Randomizer shuffles any list of text items into a random order using a cryptographically influenced random algorithm, or picks a specified number of random items from the list. Educators use it to randomly call on students, assign presentation slots, and pick groups. Event organizers use it for raffle draws, prize picks, and team assignments. Developers use it to randomize test data, shuffle benchmark inputs, and pick random samples from datasets. Game masters use it for random encounter tables, quest assignments, and NPC selection. The pick mode is useful for giveaways, random sampling, and selection when you only need a subset of a larger pool.",
    keywords: ["list randomizer", "random picker", "shuffle list", "random order"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-pink-500 to-fuchsia-500",
  },
  {
    slug: "pomodoro-timer",
    name: "Pomodoro Timer",
    category: "Productivity",
    icon: Timer,
    shortDescription:
      "Focus timer with customizable work/break intervals and session tracking.",
    longDescription:
      "Pomodoro Timer implements the Pomodoro Technique — alternating focused work sessions with short breaks, and a longer break every four sessions. The default is 25 minutes of work, 5 minutes of short break, and 15 minutes of long break, but every interval is customizable. A circular progress ring gives you a clear visual cue of time remaining without being distracting. Session tracking shows how many pomodoros you have completed so you can measure daily focus output and build streaks. The technique is research-backed for reducing mental fatigue, managing procrastination, and maintaining deep focus on cognitively demanding work. Use it for writing, coding, studying, design work, or any task that benefits from structured time-boxing. The tool runs in your browser tab and requires no installation or account.",
    keywords: ["pomodoro timer", "focus timer", "productivity timer", "work timer"],
    featured: false,
    trending: true,
    functional: true,
    accent: "from-rose-500 to-orange-500",
  },
  {
    slug: "countdown-timer",
    name: "Countdown Timer",
    category: "Productivity",
    icon: Hourglass,
    shortDescription:
      "Count down to any future date and time with a live days-hours-minutes display.",
    longDescription:
      "Countdown Timer counts down to any future date and time you set, displaying the remaining time as a live ticking display of days, hours, minutes, and seconds. It supports preset shortcuts for common events like the new year, and custom event names so the display is meaningful at a glance. Event managers use it to display time remaining until a launch, conference, or deadline. Marketers embed countdowns in campaign pages to create urgency around sales and product launches. Students use it to track time until exams, submission deadlines, and application dates. Personal users use it for birthdays, vacations, anniversaries, and retirement countdowns. The display updates every second in real time and shows a congratulatory message when the countdown reaches zero.",
    keywords: ["countdown timer", "event countdown", "days until", "deadline tracker"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-sky-500 to-cyan-500",
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    category: "Student",
    icon: Receipt,
    shortDescription:
      "Calculate tip amount and split the bill evenly among any number of people.",
    longDescription:
      "Tip Calculator computes the tip amount for any bill total at any tip percentage, and splits the total evenly among any number of diners. A drag slider lets you set the tip percentage from 0 to 50 percent, with quick-pick buttons for the most common values (10%, 15%, 18%, 20%, 25%). The per-person breakdown shows both the total amount and the tip contribution per head so everyone knows exactly what to pay without mental arithmetic at the table. Restaurants, bars, food delivery, hotel housekeeping, taxi rides, and salon services all involve tipping in different amounts — this tool covers all of them. The calculation happens instantly in your browser with no form submission, no account required, and no ads following you around afterward.",
    keywords: ["tip calculator", "split bill", "gratuity calculator", "restaurant tip"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-lime-500 to-green-500",
  },
  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    category: "Student",
    icon: PiggyBank,
    shortDescription:
      "Calculate monthly EMI, total interest, and repayment schedule for any loan.",
    longDescription:
      "Loan Calculator computes the monthly EMI (equated monthly installment) for any loan given the principal, annual interest rate, and term in years using the standard amortization formula. It shows the monthly payment, total amount paid over the life of the loan, total interest charged, and a principal-vs-interest breakdown bar so you can see how much of your payment goes to interest versus principal. Homebuyers use it to compare mortgage options before speaking to a lender. Students use it to evaluate education loan terms. Car buyers use it to understand what a financing offer actually costs over time. Business owners use it to model the cost of capital before taking on debt. The tool runs entirely in your browser with no data sent anywhere.",
    keywords: ["loan calculator", "emi calculator", "mortgage calculator", "interest calculator"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-teal-500 to-cyan-500",
  },
  {
    slug: "tax-calculator",
    name: "Tax Calculator",
    category: "Student",
    icon: DollarSign,
    shortDescription:
      "Calculate tax amount on any price — add tax or extract from tax-inclusive totals.",
    longDescription:
      "Tax Calculator computes tax amounts in two modes: adding a percentage tax rate to a pre-tax amount to find the total, or extracting the tax from a tax-inclusive price to find the pre-tax base. Common tax rates (5%, 7%, 8.5%, 10%, 13%, 15%, 20%) are available as quick-pick buttons, or you can enter any custom rate. Shoppers use it to estimate the final price on a purchase before checkout. Business owners use it to figure out how much of an invoice amount to remit as tax. Accountants use it to quickly sanity-check tax calculations. International travelers use it to understand VAT and GST amounts in different countries. The two modes cover the vast majority of everyday tax calculation scenarios.",
    keywords: ["tax calculator", "vat calculator", "gst calculator", "sales tax"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-green-600 to-emerald-600",
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    category: "Student",
    icon: Tag,
    shortDescription:
      "Find the final price after any percentage or fixed discount instantly.",
    longDescription:
      "Discount Calculator tells you exactly what you pay after a discount — either a percentage off or a fixed dollar amount off — and shows how much you save and what percentage of the original price you are saving. Shoppers use it to verify that a sale price matches the advertised discount, to compare different discount structures, and to decide whether a bulk deal is worth it. Retailers use it to quickly calculate promotional pricing. Freelancers use it to offer discounts to clients without losing track of the actual dollar impact. The reverse mode is equally useful: enter the final price and the discount percentage to recover the original price. All calculations happen instantly in your browser with no page reloads.",
    keywords: ["discount calculator", "sale price", "percent off", "savings calculator"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-rose-500 to-pink-500",
  },
  {
    slug: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    category: "Developer",
    icon: Maximize2,
    shortDescription:
      "Calculate the aspect ratio of any dimensions and scale resolutions proportionally.",
    longDescription:
      "Aspect Ratio Calculator computes the simplified ratio for any width and height pair, and scales dimensions proportionally — given a target width, it calculates the matching height that maintains the original aspect ratio. It works in both directions: enter dimensions to get the ratio, or enter a ratio and a target width to get the matching height. Common ratios (16:9, 4:3, 1:1, 21:9, 9:16, 2:3) are available as quick-pick shortcuts. Designers use it to generate responsive image sizes, calculate video player dimensions, set thumbnail crops, and verify that exported assets have the correct proportions. Developers use it to implement responsive layouts, calculate CSS padding hacks for aspect-ratio boxes, and size canvas elements. Video editors use it to convert between standard resolutions while maintaining widescreen or portrait ratios.",
    keywords: ["aspect ratio", "image ratio", "resolution calculator", "16:9 calculator"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-purple-500 to-pink-500",
  },
  {
    slug: "color-palette-generator",
    name: "Color Palette Generator",
    category: "Image",
    icon: Wand2,
    shortDescription:
      "Generate complementary, triadic, analogous and other color palettes from a base color.",
    longDescription:
      "Color Palette Generator creates harmonious color palettes from a single base color using color theory relationships: complementary (the opposite hue), triadic (three evenly spaced hues), analogous (neighboring hues), split-complementary, tetradic (four hues), and monochromatic (shades and tints of one hue). Each generated palette shows hex codes you can copy individually or all at once. Designers use it to build brand color systems from a single seed color, to explore variations before committing to a palette, and to generate Tailwind or CSS custom property sets. Artists use it to pick color schemes for illustrations and digital paintings. UI developers use it to create accessible, harmonious interface color schemes without needing a design background. A random base color button lets you explore unexpected starting points.",
    keywords: ["color palette", "color scheme generator", "complementary colors", "color theory"],
    featured: false,
    trending: true,
    functional: true,
    accent: "from-fuchsia-500 to-violet-500",
  },
  {
    slug: "gradient-generator",
    name: "CSS Gradient Generator",
    category: "Developer",
    icon: Layers,
    shortDescription:
      "Build beautiful linear, radial and conic CSS gradients with live preview.",
    longDescription:
      "CSS Gradient Generator creates linear, radial, and conic gradients visually, with a live preview that updates as you drag color stop positions, change colors, and switch directions. You can add multiple color stops, adjust their positions, and choose from eight directional presets for linear gradients. The generated CSS background property is shown below the preview and copies with one click, ready to paste into any stylesheet. Preset palettes (Ocean, Sunset, Forest, Fire, Aurora) give you a starting point when you want inspiration rather than precision. Developers use it to add subtle depth to cards, hero sections, buttons, and text effects without opening a design tool. Designers use it to prototype gradient ideas before moving to Figma. The output is pure CSS — no image files, no JavaScript, no library dependency.",
    keywords: ["css gradient", "gradient generator", "linear gradient", "background generator"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-violet-500 to-pink-500",
  },
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    category: "Developer",
    icon: FileText,
    shortDescription:
      "Generate complete HTML meta tags for SEO, Open Graph, and Twitter Cards.",
    longDescription:
      "Meta Tag Generator produces the complete set of HTML meta tags needed for solid SEO and accurate social sharing previews — title, description, keywords, robots, Open Graph (og:title, og:description, og:image, og:url), Twitter Card, and canonical link. All tags are generated simultaneously from the inputs you provide, so you can copy the whole block in one go and paste it into your page's head section. Character counters for the title (60 character sweet spot) and description (158 character limit) help you stay within the ranges search engines actually display. Content managers use it to prep meta for new pages without memorizing tag attributes. Developers use it as a scaffold when starting a new site. SEO specialists use it to quickly generate compliant tag sets for clients. The output is immediately deployable in any HTML, React, Next.js, or CMS template.",
    keywords: ["meta tag generator", "seo meta tags", "open graph", "twitter card"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-blue-500 to-violet-500",
  },
  {
    slug: "reading-time-calculator",
    name: "Reading Time Calculator",
    category: "Text",
    icon: BookOpen,
    shortDescription:
      "Estimate reading and speaking time for any article or script with custom WPM.",
    longDescription:
      "Reading Time Calculator estimates how long it takes to read or speak any piece of text based on words per minute. The default reading speed is 200 WPM — the average for adult readers in English — and the speaking speed defaults to 130 WPM, the rate professional voice actors and presenters target for clarity. Both speeds are adjustable so you can dial in the right estimate for your audience and delivery style. Bloggers use it to add reading time estimates to articles. Podcast producers use it to check that scripts fit a target episode length. Presenters use it to verify their talk fits within a conference slot. Teachers use it to estimate how long assigned readings will take. The tool also shows word count, character count, sentence count, and paragraph count alongside the time estimates.",
    keywords: ["reading time", "words per minute", "article length", "speaking time"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-amber-500 to-orange-500",
  },
  {
    slug: "character-limit-checker",
    name: "Character Limit Checker",
    category: "Text",
    icon: MessageSquare,
    shortDescription:
      "Count characters with preset limits for Twitter, SMS, meta tags and more.",
    longDescription:
      "Character Limit Checker tracks your character count against a custom limit and shows at a glance how much space you have left. Preset buttons for Twitter (280), SMS (160), meta description (158), LinkedIn (3000), Instagram (2200), TikTok (2200), meta title (60), and YouTube title (100) let you switch between platforms instantly. A color-coded progress bar transitions from green to amber to red as you approach the limit, and the remaining count flips to a bold red over indicator when you exceed it. Copywriters use it to trim social media posts. Content managers use it to stay within SEO character limits. Developers use it to validate content length before saving to a database. Journalists use it to size captions, pull quotes, and tweet threads. The word count is shown alongside the character count for additional context.",
    keywords: ["character counter", "twitter character limit", "sms length", "text limit"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-cyan-500 to-sky-500",
  },
  {
    slug: "number-base-converter",
    name: "Number Base Converter",
    category: "Developer",
    icon: Calculator,
    shortDescription:
      "Convert between decimal, binary, octal, hexadecimal and base-36 instantly.",
    longDescription:
      "Number Base Converter translates integers between decimal (base 10), binary (base 2), octal (base 8), hexadecimal (base 16), base 32, and base 36, displaying all representations simultaneously so you can see the same value in every numeral system at a glance. Computer science students use it to understand how the same number is represented differently in different systems. Developers use it to work with memory addresses, bit flags, color codes, and permissions (chmod values use octal). Embedded systems engineers use it to decode binary register values. Network engineers use it to understand IPv4 subnet masks in binary and decimal. The converter also accepts input in any base so you can start from hex, octal, or binary and see the decimal equivalent alongside all other forms.",
    keywords: ["number base converter", "binary to decimal", "hex converter", "octal converter"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-indigo-500 to-blue-500",
  },
  {
    slug: "json-to-csv",
    name: "JSON to CSV",
    category: "Developer",
    icon: Columns2,
    shortDescription:
      "Convert a JSON array of objects to CSV with automatic header detection.",
    longDescription:
      "JSON to CSV converts a JSON array of objects into a well-formatted CSV file, automatically extracting all unique property names as headers. It handles nested values gracefully, escapes commas and quotes in values, and supports comma, semicolon, tab, and pipe delimiters so the output is compatible with Excel, Google Sheets, and data analysis tools. Data engineers use it to export API responses into spreadsheets. Developers use it to convert mock JSON data into test CSV fixtures. Analysts use it to pull structured JSON from a REST API into a format their BI tool can import. The download button saves the result directly as a .csv file without any server interaction.",
    keywords: ["json to csv", "json converter", "data export", "csv generator"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-green-500 to-teal-500",
  },
  {
    slug: "text-sorter",
    name: "Text Sorter",
    category: "Text",
    icon: ListOrdered,
    shortDescription:
      "Sort lines alphabetically, numerically, by length, or shuffle them randomly.",
    longDescription:
      "Text Sorter reorders lines of text in six modes: alphabetical A to Z, alphabetical Z to A, shortest line first, longest line first, numeric sort (for lists of numbers), and shuffle (random order). It also has a deduplicate mode that strips duplicate lines, keeping only the first occurrence of each. Options to trim leading and trailing whitespace and ignore empty lines keep the output clean without manual pre-processing. Developers use it to sort import lists, deduplicate log entries, and alphabetize configuration values. Writers use it to alphabetize glossaries, references, and bullet lists. Data analysts use it to sort and clean text exports. Administrators use it to process user lists, email lists, and tag clouds. The sorted output copies to clipboard with one click.",
    keywords: ["text sorter", "sort lines", "alphabetical sort", "deduplicate text"],
    featured: false,
    trending: false,
    functional: true,
    accent: "from-purple-500 to-indigo-500",
  },
];

export const getToolBySlug = (slug: string): Tool | undefined =>
  tools.find((t) => t.slug === slug);

export const featuredTools = tools.filter((t) => t.featured);
export const trendingTools = tools.filter((t) => t.trending);
