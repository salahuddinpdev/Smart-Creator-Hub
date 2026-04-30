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
      "Case Converter flips any block of text between every casing style writers and developers reach for: UPPERCASE for headlines, lowercase for casual copy, Title Case for blog posts, Sentence case for body paragraphs, camelCase for JavaScript identifiers, PascalCase for class names, snake_case for Python variables, kebab-case for URLs and CSS classes, and CONSTANT_CASE for environment variables. It is the kind of tool you do not realize you need until you are reformatting a list of fifty product names, cleaning up a CSV column of customer emails, normalizing a list of database keys, or fixing a copy-pasted heading that came in screaming. The conversion is instant and runs entirely in your browser, so even if your text is a list of internal SKUs, draft press release copy, or a user export, nothing leaves your device. Writers love it for cleaning up dictation output that always comes back over-capitalized. Developers love it for converting JSON keys between API conventions without writing a one-off script. Marketers love it for matching their brand style guide across product names, ad headlines, and meta titles. Designers love it for pasting client copy and getting it formatted to spec without manual editing. The tool handles long documents, preserves punctuation correctly, and offers a one-click copy button so you can paste the result back wherever you grabbed the original from. Bookmark it once and you will reach for it every week.",
    keywords: ["case converter", "uppercase", "title case", "camelcase"],
    featured: false,
    trending: false,
    functional: false,
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
      "Lorem Ipsum Generator produces realistic-looking filler text for design mockups, wireframes, prototypes, content management system tests, and database seed scripts. Specify exactly what you need — a single sentence, a paragraph, ten paragraphs, or a list of words — and the tool generates classical Lorem Ipsum that matches the rhythm of real prose without distracting from the design you are showcasing. Designers have used Lorem Ipsum for centuries because real copy in a mockup hijacks the conversation: stakeholders start editing the words instead of evaluating the layout, the typography, the spacing, and the visual hierarchy. Filler text keeps everyone focused on the design decisions that actually matter at that stage. The tool also offers a more modern variant for when classical Latin feels out of place in a contemporary product mockup. Use it when prepping client presentations, building UI component libraries, populating skeleton screens during development, seeding sample blog posts in a CMS demo, or testing how a card layout responds to varying content lengths. Output copies cleanly to your clipboard with one click and pastes into Figma, Sketch, your code editor, or your CMS without any extra formatting characters or stray HTML. Generating a fresh batch only takes a second, so you can iterate quickly when you need different lengths to test edge cases like very long names, multi-paragraph descriptions, or single-sentence summaries.",
    keywords: ["lorem ipsum", "placeholder text", "dummy text", "filler copy"],
    featured: false,
    trending: false,
    functional: false,
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
      "JSON Formatter takes any JSON string — even an ugly single-line dump from a server log or a malformed snippet from a half-broken API — and turns it into clean, indented, syntax-highlighted output you can actually read. It also flips the other direction, minifying readable JSON down to a single line for embedding in source code, environment variables, or HTTP request bodies. When the JSON is invalid, the tool tells you exactly where and why so you can fix it instead of squinting at line numbers. Because everything runs in your browser, you can safely paste API responses containing tokens, customer data, or internal payloads without sending them to a third-party server. Backend developers use it to inspect production logs without firing up a debugger. Frontend developers use it to format the JSON they are about to drop into a fixture file. Mobile developers use it to verify API contracts. QA engineers use it to read responses captured from network tools. Data analysts use it to make sense of webhook payloads. The tool also supports collapsing and expanding nested objects, which makes it practical to work with deeply nested API responses where the structure is more important than the values. Once formatted, you can copy the result with one click, ready to paste into a pull request description, a Slack thread, a documentation page, or a unit test. It is the swiss army knife every developer ends up using several times a week.",
    keywords: ["json formatter", "json validator", "json beautifier", "minify json"],
    featured: false,
    trending: false,
    functional: false,
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
      "Base64 Encoder converts arbitrary text or binary files into the Base64 representation that powers data URIs, JWT tokens, email attachments, and countless API headers — and decodes Base64 strings back into readable text or downloadable files. The encoding is the standard, RFC-compliant variant, so the output is interchangeable with what every backend language, browser, and HTTP client produces. Web developers use it constantly: embedding small SVG icons directly into CSS as data URIs to avoid extra HTTP requests, decoding the payload of a JWT to inspect user claims, building Authorization: Basic headers for quick API tests, and prepping image attachments for email APIs. Security engineers use it to inspect suspicious payloads, since malware and phishing attempts often shuttle data around in Base64 to slip past simple filters. Backend developers use it to debug content stored as Base64 in databases. The tool runs entirely in your browser, which is important because Base64 strings often contain secrets — API keys, session tokens, internal credentials — that you do not want to paste into a server-side converter. The interface accepts both raw text and file uploads, handles large inputs gracefully, and offers a one-click copy of the result. The decode side gracefully handles strings with or without padding and tells you when input is invalid so you do not chase a phantom bug downstream.",
    keywords: ["base64 encode", "base64 decode", "data uri", "encoder"],
    featured: false,
    trending: false,
    functional: false,
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
      "URL Encoder converts text into percent-encoded form so it can travel safely through URLs and query strings, and reverses the process to make encoded URLs human-readable again. It uses the standard URI component encoding rules, the same algorithm browsers and servers use, so the output round-trips cleanly with every backend, every routing library, and every HTTP client. You will reach for this tool whenever you need to embed a search term, an email address, a redirect target, a tracking parameter, or arbitrary user input into a URL. Encoding ensures characters like spaces, ampersands, plus signs, slashes, and emoji do not break the structure of the link. Decoding lets you read referrer URLs, OAuth callback URIs, and tracked links pulled from analytics dashboards as the human-readable strings they actually represent. Marketers use it to build UTM-tracked share links, paste partner URLs into ad creatives, and inspect campaign URLs from third-party platforms. Developers use it to build redirect URIs for OAuth flows, debug deep links on mobile, prep query strings for fetch calls, and clean up URLs grabbed from server logs. Because it runs locally in your browser, even URLs containing tokens, internal endpoints, and customer identifiers stay private. One-click copy means the encoded or decoded string is ready to paste into your code, your terminal, your spreadsheet, or your browser address bar without manually selecting a single character.",
    keywords: ["url encoder", "url decoder", "percent encode", "uri component"],
    featured: false,
    trending: false,
    functional: false,
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
      "Password Generator creates strong, cryptographically random passwords using the browser's built-in secure random number generator — the same source modern password managers and authentication libraries rely on. Pick a length from short PINs to long passphrases, include or exclude uppercase letters, lowercase letters, numbers, and symbols, and optionally avoid look-alike characters like 1, l, I, 0, O for passwords you may have to type by hand. Because the generation happens in your browser using the Web Crypto API, the password never crosses the network, never lives on a server, and never gets logged anywhere outside your own device. That is the only safe way to generate a password — every online generator that sends results to a server is a security liability waiting to happen. Use it to set up new accounts, rotate stale passwords flagged by data breach checks, generate one-off API keys for personal scripts, create temporary share passwords for clients, or seed strong root credentials for new servers. Pair it with a password manager so you only ever have to remember one master password. The tool produces output that is immediately compatible with every password policy you are likely to encounter, including the strict ones at banks, healthcare portals, and enterprise dashboards. Copy with one click, paste into your password manager, and move on with your day knowing you just created a credential that would take a quintillion years to brute force.",
    keywords: ["password generator", "strong password", "random password", "secure password"],
    featured: false,
    trending: false,
    functional: false,
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
      "Color Picker lets you choose any color visually and immediately see its HEX, RGB, HSL, and CSS-ready notation side by side. Type one format and the others update in real time, so you can convert between them as fast as you can think about color. It is the tool every designer and developer ends up using a dozen times a day during a design build — converting Figma colors to CSS variables, matching brand colors from a screenshot, building Tailwind theme palettes, or just picking a foreground color that works on a given background. The visual picker uses a saturation field plus a hue slider, the same control pattern designers know from every major design tool, so there is no learning curve. The conversions are mathematically precise, not approximations, so the HEX you copy out is exactly the HEX you would get from any color tool you trust. Use it to quickly grab the color from an inspiration screenshot, match a competitor's brand without opening a heavy design app, prep a custom theme for a website or dashboard, or generate complementary shades for an illustration. Because the entire tool is local, you can paste in private brand assets, unreleased mockups, and client color codes without anything leaving your browser. The interface stays focused on the color itself rather than burying it in tabs and panels, so you spend your time making decisions instead of hunting for the right input field.",
    keywords: ["color picker", "hex to rgb", "color converter", "hsl picker"],
    featured: false,
    trending: false,
    functional: false,
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
      "Markdown to HTML converts Markdown source into clean, semantic HTML you can paste straight into a website, a CMS, an email template, or a static site generator. As you type or paste Markdown on the left, the right side updates in real time with rendered HTML and a live preview, so you can spot a missing asterisk or a busted link before publishing anything. It supports the full GitHub-flavored Markdown spec — headings, bold, italics, links, images, lists, code blocks, fenced code with language hints, blockquotes, tables, task lists, horizontal rules, and inline HTML — which means it round-trips faithfully with content written for GitHub READMEs, Notion exports, Obsidian vaults, and most modern documentation tools. Writers use it to draft posts in a comfortable plain-text format and ship them as HTML to platforms that do not natively support Markdown. Developers use it to prep documentation, generate snippets for component libraries, and convert internal notes into shareable HTML pages. Newsletter writers use it to format an email in Markdown and paste the rendered HTML into their sending platform. Because the tool runs locally, sensitive drafts — internal launch posts, customer emails, draft policy updates — stay private. The output HTML is intentionally minimal: no tracking scripts, no proprietary classes, no inline styles. Just clean, standards-compliant markup ready to drop into your stack of choice without surgery.",
    keywords: ["markdown to html", "md converter", "markdown editor", "live preview"],
    featured: false,
    trending: false,
    functional: false,
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
      "Age Calculator tells you exactly how old someone is — not just in years, but in years, months, days, hours, minutes, and seconds — based on a birthdate you enter. It also handles the reverse case: given a date and a target age, it tells you exactly when that target age will be reached. The calculation respects the actual length of months and accounts for leap years, so the answer is precise to the day rather than the rough rule-of-thumb you get from subtracting two years. People use it to fill out forms that require exact age in months for childcare, immigration paperwork, school registration, and pediatric medical records. Parents use it to track milestones for newborns where each week matters. HR teams use it to confirm benefits eligibility around birthdays. Event planners use it to calculate ages for time-capsule moments and milestone birthdays. Genealogy researchers use it to verify ages in census records and historical documents. The tool runs locally in your browser, which means birthdates and personal information never get logged or transmitted. The interface is intentionally simple: pick the birthdate and an optional target date, and the answer appears immediately. There is no signup, no email capture, and no advertising surveillance — just a precise number based on math the same way it has been done for centuries, but without the paper calendar and the long division.",
    keywords: ["age calculator", "birthday calculator", "exact age", "years months days"],
    featured: false,
    trending: false,
    functional: false,
    accent: "from-orange-500 to-red-500",
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    category: "Productivity",
    icon: Scale,
    shortDescription:
      "Calculate Body Mass Index in metric or imperial units with health category guidance.",
    longDescription:
      "BMI Calculator computes Body Mass Index from height and weight in either metric or imperial units, then maps the result onto the standard World Health Organization categories: underweight, healthy weight, overweight, and the obesity classes. The formula is the same one used by clinicians, public health agencies, and insurance providers, so the number matches what you would get at a doctor's office. BMI is a population-level health screening tool, not a complete picture of individual health — it does not account for muscle mass, frame size, age, gender, or fitness level — but it remains the most widely cited indicator and is required input for many health forms, life insurance applications, and fitness program intakes. Athletes, bodybuilders, and people with unusual body composition should treat the result as one data point among many rather than a verdict. Anyone tracking long-term changes will find BMI useful as a trend rather than a single number, since drift over months and years is more meaningful than the value on any one day. The tool runs entirely in your browser, so the height and weight you enter never get logged, sold, or attached to your identity by an ad network. Use it to fill out medical forms quickly, track progress against fitness goals, prep for an annual checkup, or simply get a baseline reading. The result includes the calculated BMI, the category, and clear context so you can interpret the number sensibly.",
    keywords: ["bmi calculator", "body mass index", "metric imperial", "health calculator"],
    featured: false,
    trending: false,
    functional: false,
    accent: "from-green-500 to-lime-500",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "Productivity",
    icon: Percent,
    shortDescription:
      "Solve every percent problem: of, increase, decrease, change and more.",
    longDescription:
      "Percentage Calculator handles every percent problem people actually run into in real life: what is X percent of Y, what percent is X of Y, what is the percent increase from X to Y, what is the percent decrease from X to Y, and what is X plus or minus Y percent. Each case has its own dedicated input row so you do not have to remember which formula maps to which scenario. Shoppers use it to compute discount prices and check whether a sale is actually as good as the sticker claims. Investors use it to calculate portfolio gains, dividend yields, and compounded returns. Students use it to solve homework problems and check answers. Restaurant tippers use it to figure out 18 or 20 percent on a bill without trusting a server's math. Marketers use it to compute conversion rate changes between A and B test variants. Project managers use it to track progress percentages across milestones. The math behind every result is shown in a single clean line so you can verify the calculation if you want to. Because everything runs locally in the browser, you can use the tool on financial figures, medical dosages, and personal numbers without anything being logged. The interface is keyboard-friendly so you can tab between fields and get answers as fast as you can type, no Calculate button required.",
    keywords: ["percentage calculator", "percent of", "percent change", "discount calculator"],
    featured: false,
    trending: false,
    functional: false,
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
      "Unit Converter handles the conversions you actually use: length (mm, cm, m, km, inch, foot, yard, mile), weight (g, kg, oz, lb), temperature (Celsius, Fahrenheit, Kelvin), volume (mL, L, fl oz, cup, gallon), area (m², hectare, ft², acre), and digital storage (KB, MB, GB, TB and the binary equivalents). Pick a category, enter a value in any unit, and every other unit in that category updates simultaneously. There is no Convert button — the answer appears as fast as you type. Travelers use it to translate weather forecasts and grocery prices when crossing between countries that use different systems. Cooks use it to follow international recipes without a sticky-note conversion table on the counter. Engineers use it to bridge between metric specs and imperial fasteners. Web developers use it to figure out file size limits in different units. Fitness folks use it to convert workout numbers between kilos and pounds. The conversion factors are hard-coded with the official, internationally agreed-upon ratios — nothing approximated — so the answers match what you would get from a reference textbook. Because the tool runs entirely in your browser, nothing you enter ever leaves your device. The interface keeps every unit in the active category visible at once, so you can see at a glance how a value lands across the full range of measurements rather than only seeing one conversion at a time.",
    keywords: ["unit converter", "metric imperial", "length converter", "temperature"],
    featured: false,
    trending: false,
    functional: false,
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
      "Text Diff Checker compares two blocks of text side by side and visually highlights every difference between them — added lines, removed lines, and changed sections — using the same approach Git uses for code diffs. Drop in two versions of any document and the tool produces an instantly readable report of exactly what changed, where, and by how much. Writers use it to compare drafts before and after edits, especially when working with collaborators who do not return tracked-changes documents. Lawyers and contract reviewers use it to spot small but consequential edits between contract revisions. Developers use it to compare config files, log outputs, and API responses across runs. Translators use it to reconcile two versions of a translation. Researchers use it to find changes between successive policy documents, terms of service updates, or legal filings. Because the comparison happens entirely in your browser, the text you paste — even if it includes confidential drafts, internal documents, or unreleased copy — never leaves your device. The diff algorithm is line-based and word-aware, which means small changes inside a long paragraph get highlighted precisely instead of marking the whole paragraph as different. The output is colored intuitively (additions in green, deletions in red) and can be copied or screenshotted for sharing. It is one of those tools that feels like overkill until you need it, and then it becomes the only sensible way to do the work.",
    keywords: ["text diff", "compare text", "diff checker", "side by side compare"],
    featured: false,
    trending: false,
    functional: false,
    accent: "from-indigo-500 to-violet-500",
  },
];

export const getToolBySlug = (slug: string): Tool | undefined =>
  tools.find((t) => t.slug === slug);

export const featuredTools = tools.filter((t) => t.featured);
export const trendingTools = tools.filter((t) => t.trending);
