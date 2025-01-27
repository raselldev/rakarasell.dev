"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LatestBlog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <section className="container text-center py-24">
      <h2 className="text-3xl md:text-4xl font-bold ">
        Latest <span className="text-primary">Blog </span>
      </h2>
      <p className="md:w-2/3 lg:w-1/2 mx-auto mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
        Explore our latest blog posts! Stay updated with the newest trends,
        coding tips, and exciting projects. Dive in and join the journey of
        discovery.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {posts.map(
          (post, index) =>
            index < 3 && (
              <a
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="group relative block overflow-hidden rounded-lg"
              >
                <Image
                  src={post.metadata.thumbnail}
                  alt={`Thumbnail for ${post.metadata.title}`}
                  width={400}
                  height={250}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 grayscale hover:grayscale-0"
                />

                <div className="relative bg-neutral p-6">
                  {post.metadata.tags.map((x) => (
                    <span
                      className="whitespace-nowrap rounded-lg text-white bg-accent px-3 py-1.5 text-xs font-medium m-1"
                      key={x}
                    >
                      {x}
                    </span>
                  ))}

                  <h3 className="mt-4 text-lg font-medium text-white">
                    {post.metadata.title}
                  </h3>

                  <p className="mt-1.5 text-sm text-gray-200">
                    {post.metadata.date}
                  </p>
                  <p className="mt-1.5 text-sm text-gray-200">
                    {post.metadata.description}
                  </p>
                </div>
              </a>
            )
        )}
      </div>
    </section>
  );
}
