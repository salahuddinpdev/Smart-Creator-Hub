import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { blogPosts } from "@/data/blog";

export function Blog() {
  return (
    <Layout>
      <Seo
        title="Blog — Tutorials & Guides for Creators | SmartCreatorTools"
        description="Practical writing on AI tools, image compression, QR codes, developer utilities, and productivity. Tutorials and deep dives for creators, developers, and students."
        keywords={[
          "creator tools blog",
          "ai tools tutorial",
          "image compression guide",
          "qr code tips",
          "developer productivity",
          "online tools guide",
          "free tools for creators",
        ]}
        canonicalPath="/blog"
        breadcrumbs={[{ name: "Blog", href: "/blog" }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "SmartCreatorTools Blog",
          url: "https://smartcreatortools.com/blog",
          description: "Tutorials, deep dives, and tool roundups for creators, developers, and students.",
          publisher: {
            "@type": "Organization",
            name: "SmartCreatorTools",
            url: "https://smartcreatortools.com",
          },
          blogPost: blogPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            url: `https://smartcreatortools.com/blog/${p.slug}`,
            datePublished: p.date,
            author: { "@type": "Person", name: p.author },
          })),
        }}
      />

      <section className="pt-8 sm:pt-10 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Notes from <span className="gradient-text">the workshop</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
              Practical writing on AI, design, marketing, and the small tools that make a real
              difference in creator workflows.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" role="list" aria-label="Blog posts">
            {blogPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group glass rounded-2xl overflow-hidden card-lift"
                role="listitem"
                aria-label={`Read: ${p.title} — ${p.readingTime} min read`}
              >
                <div
                  className={`aspect-[16/9] bg-gradient-to-br ${p.cover.gradient} relative`}
                  role="img"
                  aria-label={`Cover for ${p.title}`}
                >
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-md px-3 py-1 text-xs font-bold text-white">
                    {p.category}
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="text-xs text-muted-foreground">
                    <time dateTime={p.date}>{p.date}</time> · {p.readingTime} min read
                  </div>
                  <h2 className="mt-2 font-bold text-base sm:text-lg leading-tight group-hover:text-primary transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {p.excerpt}
                  </p>
                  <div className="mt-3 sm:mt-4 text-xs font-semibold text-muted-foreground">
                    By {p.author}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
