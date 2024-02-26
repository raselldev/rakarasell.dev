"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

type Repository = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  updated_at: string;
  size: number;
  topics: string[]
};

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
    <section className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        Latest {" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Repository{" "}
        </span>
        on GitHub
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Check out our newest stuff on GitHub! It's full of cool projects and useful code. Dive in and join the coding fun!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {repo.map(
          (repo, index) =>
            index < 8 && (
              <Card
                key={repo.id}
                className="bg-muted/50"
              >
                <CardHeader>
                  <CardTitle className="grid gap-4 place-items-center">
                    {repo.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>{repo.description}</CardContent>
                <CardFooter>
                  {repo.topics.map((x) => {
                    return (
                      <Badge key={x} className="m-1">
                        {x}&nbsp;
                      </Badge>
                    )
                  }
                  )}

                </CardFooter>
              </Card>
            )
        )}
      </div>
    </section>
  );
}
