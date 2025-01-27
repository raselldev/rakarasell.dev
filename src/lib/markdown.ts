import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
const postsDirectory = path.join(process.cwd(), "src/posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = (
    await remark().use(html).process(content)
  ).toString();

  const metadata: PostMetadata = {
    title: data.title,
    date: data.date,
    slug: data.slug,
    description: data.description,
    thumbnail: data.thumbnail,
    author: data.author,
    tags: data.tags || [], // Ensure tags are parsed correctly as an array
  };

  return { metadata, processedContent };
}

export function getAllPosts(): PostMetadata[] {
  const files = fs.readdirSync(postsDirectory);

  return files.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      title: data.title,
      date: data.date,
      slug: data.slug,
      description: data.description,
      thumbnail: data.thumbnail,
      author: data.author,
      tags: data.tags || [],
    };
  });
}
