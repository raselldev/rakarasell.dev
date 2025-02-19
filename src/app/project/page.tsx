"use client";
import { generateImage } from "@/lib/imageGenerator";
import { ProjectList } from "@/lib/projectList";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  useEffect(() => {
    const images = ProjectList.map((project) =>
      generateImage({ text: project.title })
    );
    setGeneratedImages(images);
  }, []);
  return (
    <main className="flex min-h-screen w-full flex-col justify-between">
      <section className="container py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          List <span className="text-primary">Project </span>
        </h2>
        <p className="text-center md:w-2/3 lg:w-1/2 mx-auto mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
          Explore my handpicked projects spanning various fields. Join me on a
          journey of innovation and creativity that inspires and empowers!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 justify-items-stretch">
          {ProjectList.map((post, index) => {
            const imgSrc = generatedImages[index] || null;

            return (
              <a
                href={post.link}
                target="_blank"
                key={post.title}
                className="group relative block overflow-hidden rounded-lg"
              >
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt={`Generated Thumbnail for ${post.title}`}
                    width={400}
                    height={250}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  />
                )}

                <div className="flex flex-col h-full bg-neutral p-6">
                  <div>
                    <h3 className="mt-4 text-lg font-medium text-white">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-200">
                      {post.description}
                    </p>
                  </div>
                  <button className="mt-4 block w-full rounded bg-primary p-4 text-sm text-white font-medium transition hover:scale-105">
                    Read More
                  </button>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
