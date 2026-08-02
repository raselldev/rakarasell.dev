import { generatedPosts } from "./posts.generated";

export function getPostSlugs() {
  return generatedPosts.map((post) => post.slug);
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const post = generatedPosts.find((post) => post.slug === realSlug);
  if (!post) return null;

  return {
    metadata: post.metadata,
    processedContent: post.content,
  };
}

export function getAllPosts(): PostMetadata[] {
  return generatedPosts.map((post) => post.metadata);
}
