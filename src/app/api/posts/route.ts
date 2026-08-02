import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/markdown";

export async function GET() {
  const posts = getAllPosts().map((metadata) => ({
    slug: metadata.slug,
    metadata,
  }));

  return NextResponse.json(posts);
}
