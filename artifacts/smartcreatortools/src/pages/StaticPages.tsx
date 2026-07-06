import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { Link } from "wouter";
import { Mail, MessageCircle, Heart } from "lucide-react";

function PageWrapper({
  title,
  intro,
  children,
  seoTitle,
  seoDescription,
  seoKeywords,
  canonicalPath,
  breadcrumbName,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  canonicalPath: string;
  breadcrumbName: string;
}) {
  const words = title.split(" ");
  const last = words.slice(-1)[0];
  const rest = words.slice(0, -1).join(" ");
  return (
    <Layout>
      <Seo
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalPath={canonicalPath}
        breadcrumbs={[{ name: breadcrumbName, href: canonicalPath }]}
      />
      <section className="pt-8 sm:pt-10 pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {rest} <span className="gradient-text">{last}</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">{intro}</p>
          <div className="mt-8 sm:mt-10 glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-[1.8] prose-p:text-foreground/85">
            {children}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export function About() {
  return (
    <PageWrapper
      title="About Salah Tools Hub"
      intro="A free, fast hub for the small tools creators reach for every day."
      seoTitle="About Salah Tools Hub — Free Online Tools for Creators"
      seoDescription="Salah Tools Hub is a free hub of 50+ utilities for creators, students, and developers — built to be fast, private, and bookmarkable. No signup ever."
      seoKeywords={["about salah tools hub", "free tools for creators", "browser tools no signup", "privacy first tools"]}
      canonicalPath="/about"
      breadcrumbName="About"
    >
      <p>
        Salah Tools Hub was built on a simple frustration: every time we needed a small,
        one-off utility — compress an image, convert a PDF page, generate a QR code, format some
        JSON — we ended up on a website covered in popups, hidden behind a signup, or asking us
        to upgrade after the third use.
      </p>
      <p>
        So we built the tools we wished existed: fast, free, no signup, no upload to a server,
        and beautiful enough that you actually enjoy using them. Every tool runs entirely in your
        browser, which means your text, your images, and your files never leave your device.
      </p>
      <h2>Our principles</h2>
      <ul>
        <li>Free forever, no email captures, no upsells.</li>
        <li>Privacy by design — work happens in your browser, not on our servers.</li>
        <li>Speed first — every page should load before you can blink.</li>
        <li>Beautiful enough to want to use, simple enough to never need a tutorial.</li>
      </ul>
      <p className="flex items-center gap-2">
        Made with <Heart className="inline w-4 h-4 text-rose-500" aria-label="love" /> for creators worldwide.
      </p>
    </PageWrapper>
  );
}

export function Privacy() {
  return (
    <PageWrapper
      title="Privacy Policy"
      intro="The short version: nothing you type or upload ever leaves your browser."
      seoTitle="Privacy Policy — Salah Tools Hub"
      seoDescription="How Salah Tools Hub handles your data: nothing leaves your browser. Our privacy policy in plain English — no personal data collection, no server uploads."
      seoKeywords={["privacy policy", "data privacy", "browser tools privacy", "no data collection"]}
      canonicalPath="/privacy"
      breadcrumbName="Privacy Policy"
    >
      <p>
        <strong>Effective date:</strong> April 1, 2026
      </p>
      <h2>What we don't do</h2>
      <p>
        We do not collect your text, images, files, code, or any other content you process
        through Salah Tools Hub. Every tool runs entirely client-side in your browser. We have
        no servers handling your inputs, so there is nothing for us to store, lose, or share.
      </p>
      <h2>What we do collect</h2>
      <p>
        We use anonymized analytics to understand which tools are popular and where pages are
        slow. We do not collect identifying information, IP addresses, or device fingerprints.
      </p>
      <h2>Cookies</h2>
      <p>
        We use a minimal set of essential cookies for site functionality and a single analytics
        cookie that respects Do Not Track. We do not use ad-targeting cookies.
      </p>
      <h2>Third-party services</h2>
      <p>
        The site loads Google Fonts from Google's CDN. No personal data is shared with
        Google as part of this.
      </p>
      <h2>Your rights</h2>
      <p>
        Since we don't hold your data, there is nothing to request, export, or delete. If that
        changes, this page will be updated and the effective date above will change.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach us at{" "}
        <Link href="/contact" className="text-primary font-semibold hover:underline">
          our contact page
        </Link>
        .
      </p>
    </PageWrapper>
  );
}

export function Terms() {
  return (
    <PageWrapper
      title="Terms of Service"
      intro="The rules for using Salah Tools Hub. We've tried to make them readable."
      seoTitle="Terms of Service — Salah Tools Hub"
      seoDescription="Terms of service for using Salah Tools Hub — free online tools for creators, students, and developers. Plain English, no legalese."
      seoKeywords={["terms of service", "terms and conditions", "usage terms"]}
      canonicalPath="/terms"
      breadcrumbName="Terms of Service"
    >
      <p>
        <strong>Effective date:</strong> April 1, 2026
      </p>
      <p>
        By using Salah Tools Hub, you agree to these terms. If you don't agree, please don't
        use the site.
      </p>
      <h2>Acceptable use</h2>
      <p>
        Use Salah Tools Hub for any lawful purpose. Don't use it to harm others, infringe on
        intellectual property, or generate content that violates the laws of your jurisdiction.
      </p>
      <h2>No warranty</h2>
      <p>
        The tools are provided "as is." We do our best to keep them accurate and reliable, but
        we don't warrant that they're free of errors, suitable for any particular purpose, or
        available at all times. Don't rely on them for medical, legal, or financial decisions.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for any damages arising from
        your use of the tools. Since the tools run in your browser and we don't store your data,
        this is mostly a formality.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The site design, code, and content are owned by Salah Tools Hub. The output you create
        using the tools is yours.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms occasionally. The effective date above will change when we do.
        Continued use after a change means you accept the updated terms.
      </p>
    </PageWrapper>
  );
}

export function Contact() {
  return (
    <>
      <Seo
        title="Contact Salah Tools Hub — Get in Touch"
        description="Get in touch with the Salah Tools Hub team. Feature requests, bug reports, partnerships, and more. We read every message."
        keywords={["contact salah tools hub", "support", "feature request", "bug report"]}
        canonicalPath="/contact"
        breadcrumbs={[{ name: "Contact", href: "/contact" }]}
      />
      <Layout>
        <section className="pt-8 sm:pt-10 pb-16 sm:pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Get in <span className="gradient-text">touch</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
              We read every message. Bug reports, feature requests, partnership ideas — all
              welcome.
            </p>

            <div className="mt-8 sm:mt-10 grid sm:grid-cols-2 gap-4">
              <a
                href="mailto:hello@salahtools.com"
                className="glass rounded-2xl p-5 sm:p-6 card-lift block"
                aria-label="Send us an email"
              >
                <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-primary" aria-hidden="true" />
                <h2 className="mt-3 sm:mt-4 font-bold text-sm sm:text-base">Email us</h2>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  hello@salahtools.com — for anything.
                </p>
              </a>
              <a
                href="#"
                className="glass rounded-2xl p-5 sm:p-6 card-lift block"
                aria-label="Join our Discord community"
              >
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-primary" aria-hidden="true" />
                <h2 className="mt-3 sm:mt-4 font-bold text-sm sm:text-base">Community</h2>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Join our Discord — share what you build with our tools.
                </p>
              </a>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks — your message has been queued for the team.");
              }}
              className="mt-6 sm:mt-8 glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-4"
              aria-label="Contact form"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-subject"
                  className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  className="mt-2 w-full rounded-xl bg-muted/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-px transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
}
