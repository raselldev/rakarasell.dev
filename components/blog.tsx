"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Blog = {
  type_of: string;
  id: string;
  title: string;
  description: string;
  url: string;
  canonical_url: string;
  readable_publish_date: string;
  cover_image: string;
  tag_list: [];
};

export default function BlogCard() {
  const [blog, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=raselldev")
      .then((res) => res.json())
      .then((data: any) => {
        if (Array.isArray(data)) setBlog(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="flex flex-col items-center justify-between px-12">
      <div className="relative overflow-hidden">
        <div className="flex sm:flex-row flex-col mb-4 items-stretch">
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {blog.map((blog) => (
              <div key={blog.id}>
                <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                  <Image
                    alt="Office"
                    src={blog.cover_image == null ? "" : blog.cover_image}
                    className="h-56 w-full object-cover"
                    width={500}
                    height={500}
                  />

                  <div className="bg-white p-4 sm:p-6">
                    <time className="block text-xs text-gray-500">
                      {blog.readable_publish_date}
                    </time>

                    <Link href={blog.canonical_url} target="_blank">
                      <h3 className="mt-0.5 text-lg text-gray-900">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                      {blog.description}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
