import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { blogPosts } from "@/data/blog";

export function Blog() {
  return (
    <Layout>
      <Seo
        title="Blog — SmartCreatorTools"
        description="Tutorials, deep dives, and tool roundups for creators, developers, and students. Practical writing on AI, marketing, and productivity."
        keywords={["creator blog", "tools blog", "ai writing", "productivity"]}
        canonicalPath="/blog"
      />
      <section className="pt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Notes from <span className="gradient-text">the workshop</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Practical writing on AI, design, marketing, and the small tools that make a real
              difference in creator workflows.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group glass rounded-2xl overflow-hidden hover:-translate-y-1 transition-all"
              >
                <div className={`aspect-[16/9] bg-gradient-to-br ${p.cover.gradient} relative`}>
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-md px-3 py-1 text-xs font-bold text-white">
                    {p.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-muted-foreground">
                    {p.date} · {p.readingTime} min read
                  </div>
                  <h2 className="mt-2 font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {p.excerpt}
                  </p>
                  <div className="mt-4 text-xs font-semibold text-muted-foreground">
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
