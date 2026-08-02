// Reads src/posts/*.md at build time and bakes the parsed frontmatter + rendered
// HTML into src/lib/posts.generated.ts, so nothing under src/lib/markdown.ts needs
// to touch `fs` at request time. Cloudflare Workers have no filesystem access to
// the source tree once deployed, so any runtime `fs.readFileSync`/`readdirSync`
// call in a route handler or SSR path fails there even though it works locally
// and on Vercel.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/posts");
const outputPath = path.join(process.cwd(), "src/lib/posts.generated.ts");

const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

const posts = await Promise.all(
  fileNames.map(async (fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const processedContent = (await remark().use(html).process(content)).toString();

    return {
      slug,
      metadata: {
        title: data.title,
        date: data.date,
        slug: data.slug,
        description: data.description,
        thumbnail: data.thumbnail,
        author: data.author,
        tags: data.tags || [],
      },
      content: processedContent,
    };
  })
);

const banner =
  "// GENERATED FILE — do not edit by hand.\n" +
  "// Produced by scripts/generate-posts.mjs (runs via the predev/prebuild npm scripts).\n\n";

fs.writeFileSync(
  outputPath,
  `${banner}type GeneratedPost = { slug: string; metadata: PostMetadata; content: string };\n\n` +
    `export const generatedPosts: GeneratedPost[] = ${JSON.stringify(posts, null, 2)};\n`
);

console.log(`generate-posts: wrote ${posts.length} post(s) to ${path.relative(process.cwd(), outputPath)}`);
