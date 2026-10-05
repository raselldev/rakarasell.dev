import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getPostSlugs } from "@/lib/markdown";
import { notFound } from "next/navigation";

// Generate static paths for all blog posts
export function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.md$/, "") }));
}

// Generate metadata for the blog post
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return { title: post.metadata.title };
}

// Blog post component
export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { metadata, processedContent } = post;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32 md:pt-40">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        Blog
      </Link>

      <header className="mt-8 border-b pb-10">
        {metadata.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          {metadata.title}
        </h1>
        {metadata.description && (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {metadata.description}
          </p>
        )}
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {metadata.author && <>{metadata.author} · </>}
          {metadata.date}
        </p>
      </header>

      <article
        className="prose prose-lg mt-10 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h1:mb-4 prose-h1:mt-14 prose-h1:text-3xl prose-a:text-foreground prose-a:decoration-primary prose-a:underline-offset-4 prose-img:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </main>
  );
}
