---
name: Static SEO shells for SPA routes
description: Search crawlers need route-specific metadata and content in the initial HTML, not only after client-side React effects run.
---

Client-side SEO updates are not sufficient for reliable crawling of a Vite SPA. Generate route-specific HTML shells during the production build, including the canonical URL, title, description, H1, useful content, and crawlable links; let React replace the shell at runtime.

**Why:** Crawlers and SEO audits may inspect the initial response before JavaScript executes, which otherwise makes every route look like the homepage.

**How to apply:** Keep the shell generator data-driven from the app's existing route/tool/blog sources, and verify every sitemap URL has a matching shell with a self-canonical `www` URL.