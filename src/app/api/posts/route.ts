import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

export async function GET() {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(/\.md$/, ""),
      metadata: data,
    };
  });

  return NextResponse.json(posts);
}
