import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ChevronRight, Clock, Calendar, User } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { AdSlot } from "@/components/AdSlot";
import { blogPosts, getPostBySlug } from "@/data/blog";
import { NotFound } from "./NotFound";

export function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = params?.slug ? getPostBySlug(params.slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [params?.slug]);

  if (!post) return <NotFound />;

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Layout>
      <Seo
        title={`${post.title} — SmartCreatorTools Blog`}
        description={post.excerpt}
        keywords={[post.category.toLowerCase(), "creator tools", "tutorial"]}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { "@type": "Person", name: post.author },
          publisher: { "@type": "Organization", name: "SmartCreatorTools" },
        }}
      />
      <article className="pt-8 pb-20">
        <div className="mx-auto max-w-3xl px-4">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5" />
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5" />
            <span className="text-foreground font-medium truncate">{post.title}</span>
          </nav>

          <header className="mt-8">
            <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {post.category}
            </div>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readingTime} min read
              </span>
            </div>
          </header>

          <div
            className={`mt-10 aspect-[16/9] rounded-3xl bg-gradient-to-br ${post.cover.gradient} shadow-2xl`}
          />

          <div className="mt-10 prose prose-lg max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-[1.8] prose-p:text-foreground/85">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-10">
            <AdSlot variant="in-content" />
          </div>
        </div>
      </article>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-extrabold tracking-tight">Keep reading</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group glass rounded-2xl overflow-hidden hover:-translate-y-1 transition-all"
              >
                <div className={`aspect-[16/9] bg-gradient-to-br ${p.cover.gradient}`} />
                <div className="p-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {p.category}
                  </div>
                  <h3 className="mt-2 font-bold text-base group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
