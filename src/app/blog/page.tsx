import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import Image from "next/image";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto py-8 my-10">
      <h1 className="text-4xl font-bold mb-4 text-center">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <a
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="group relative block overflow-hidden rounded-lg"
          >
            <Image
              src={post.thumbnail}
              alt={`Thumbnail for ${post.slug}`}
              width={400}
              height={250}
              className="hidden md:block lg:block h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 grayscale hover:grayscale-0"
            />

            <div className="relative bg-neutral p-6">
              {post.tags.map((x) => (
                <span
                  className="whitespace-nowrap rounded-lg text-white bg-accent px-3 py-1.5 text-xs font-medium m-1"
                  key={x}
                >
                  {x}
                </span>
              ))}

              <h3 className="mt-4 text-lg font-medium text-white">
                {post.title}
              </h3>

              <p className="mt-1.5 text-sm text-gray-200">{post.date}</p>
              <p className="mt-1.5 text-sm text-gray-200">{post.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
