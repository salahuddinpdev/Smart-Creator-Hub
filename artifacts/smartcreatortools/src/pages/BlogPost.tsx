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
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [params?.slug]);

  if (!post) return <NotFound />;

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Layout>
      <Seo
        title={`${post.title} — SmartCreatorTools Blog`}
        description={post.excerpt}
        keywords={[
          post.category.toLowerCase(),
          "creator tools",
          "tutorial",
          "online tools blog",
          "productivity tips",
          "ai tools guide",
        ]}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        breadcrumbs={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            "@type": "Person",
            name: post.author,
          },
          publisher: {
            "@type": "Organization",
            name: "SmartCreatorTools",
            url: "https://smartcreatortools.com",
            logo: {
              "@type": "ImageObject",
              url: "https://smartcreatortools.com/favicon.svg",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://smartcreatortools.com/blog/${post.slug}`,
          },
          image: "https://smartcreatortools.com/opengraph.jpg",
          articleSection: post.category,
          inLanguage: "en-US",
        }}
      />

      <article className="pt-6 sm:pt-8 pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center text-xs sm:text-sm text-muted-foreground overflow-hidden"
          >
            <Link href="/" className="hover:text-foreground transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 mx-1 sm:mx-1.5 shrink-0" aria-hidden="true" />
            <Link href="/blog" className="hover:text-foreground transition-colors shrink-0">
              Blog
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 mx-1 sm:mx-1.5 shrink-0" aria-hidden="true" />
            <span className="text-foreground font-medium truncate" aria-current="page">{post.title}</span>
          </nav>

          <header className="mt-6 sm:mt-8">
            <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {post.category}
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="mt-3 sm:mt-5 text-sm sm:text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                <span>{post.author}</span>
              </span>
              <time
                dateTime={post.date}
                className="inline-flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                {post.date}
              </time>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                {post.readingTime} min read
              </span>
            </div>
          </header>

          <div
            className={`mt-8 sm:mt-10 aspect-[16/9] rounded-2xl sm:rounded-3xl bg-gradient-to-br ${post.cover.gradient} shadow-2xl`}
            role="img"
            aria-label={`Cover image for ${post.title}`}
          />

          <div className="mt-8 sm:mt-10 prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-[1.8] prose-p:text-foreground/85">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-8 sm:mt-10">
            <AdSlot variant="in-content" />
          </div>
        </div>
      </article>

      <section className="pb-10 sm:pb-12" aria-labelledby="keep-reading-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 id="keep-reading-heading" className="text-xl sm:text-2xl font-extrabold tracking-tight">Keep reading</h2>
          <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group glass rounded-2xl overflow-hidden card-lift"
                aria-label={`Read: ${p.title}`}
              >
                <div
                  className={`aspect-[16/9] bg-gradient-to-br ${p.cover.gradient}`}
                  role="img"
                  aria-label={`Cover image for ${p.title}`}
                />
                <div className="p-4 sm:p-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {p.category}
                  </div>
                  <h3 className="mt-2 font-bold text-sm sm:text-base group-hover:text-primary transition-colors leading-tight">
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
