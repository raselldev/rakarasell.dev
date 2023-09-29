"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Repository = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  updated_at: string;
  size: number;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 because months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function GithubRepo() {
  const [repo, setRepo] = useState<Repository[]>([]);

  useEffect(() => {
    fetch(
      "https://api.github.com/users/raselldev/repos?sort=created&direction=desc"
    )
      .then((res) => res.json())
      .then((data: any) => {
        if (Array.isArray(data)) setRepo(data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="relative overflow-hidden">
      <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500">
          Latest Repository
        </span>
      </h1>
      <div className="flex sm:flex-row flex-col mb-4 items-stretch justify-center">
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 p-4">
          {repo.map(
            (repo, index) =>
              index < 4 && (
                <article
                  key={repo.id}
                  className="rounded-xl bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500 p-0.5 shadow-xl"
                >
                  <div className="rounded-[10px] p-4 !pt-20 bg-primary sm:p-6">
                    <time
                      dateTime={formatDate(repo.updated_at)}
                      className="block text-xs text-gray-400"
                    >
                      Last Updated {formatDate(repo.updated_at)}
                    </time>
                    <Link href={repo.html_url} target="_blank">
                      <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
                        {repo.name}
                      </h3>
                      <p>{repo.description}</p>
                    </Link>
                    <div className="mt-4 flex flex-wrap gap-1">
                      <span className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs bg-accent text-white">
                        {repo.language}
                      </span>
                      <span className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs bg-accent text-white">
                        {Math.ceil(repo.size / 1024)} MB
                      </span>
                    </div>
                  </div>
                </article>
              )
          )}
        </div>
      </div>
    </div>
  );
}
