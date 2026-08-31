import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <Layout>
      <Seo
        title="Not Found — Salah Tools Hub"
        description="The page you're looking for doesn't exist."
        noIndex
      />
      <section className="py-32">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="text-8xl sm:text-9xl font-black gradient-text leading-none">404</div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight">
            We couldn't find that page
          </h1>
          <p className="mt-4 text-muted-foreground">
            The link might be broken or the page might have moved. Let's get you back to the tools.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </section>
    </Layout>
  );
}
