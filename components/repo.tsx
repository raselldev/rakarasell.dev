import Link from "next/link";
import { useEffect, useState } from "react";

type Repository = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  size: number;
};

export default function Project() {
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
    <section className="bg-gradien-to-r from-secondary to-accent items-center content-center">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl">
        Latest Repositories
      </h1>
      <div className="flex sm:flex-row flex-col mb-4 items-stretch">
        {repo.map(
          (repo, index) =>
            index < 3 && (
              <div
                className="rounded-xl border border-accent m-1 bg-secondary gap-4 mb-2 md:w-1/3 lg:w-1/3 py-4 pt-4"
                key={repo.id}
              >
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  href={repo.html_url}
                >
                  <div className="pt-4 text-primary">
                    <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600 m-4">
                      {Math.ceil(repo.size / 1024)} MB
                    </span>

                    <h3 className="mt-4 text-lg font-bold text-primary sm:text-xl text-center">
                      {repo.name}
                    </h3>

                    <p className="mt-2 text-sm sm:block text-center">
                      {repo.description}
                    </p>
                  </div>
                </Link>
              </div>
            )
        )}
      </div>
    </section>
  );
}
