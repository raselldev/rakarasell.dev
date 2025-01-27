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
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { metadata, processedContent } = await post;

  return (
    <div className="container py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold">{metadata.title}</h1>
      <p className="text-muted-foreground">{metadata.description}</p>
      <div className="prose mt-8">
        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
      </div>
    </div>
  );
}
