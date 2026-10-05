"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Section } from "./home/Section";

type MediumPost = {
  title: string;
  url: string;
  date: string;
  snippet: string;
  image?: string | null;
  tags: string[];
};

const MEDIUM_PROFILE = "https://medium.com/@rakarasell";

function formatDate(date: string) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function MediumFeedClient() {
  const [data, setData] = useState<MediumPost[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/medium");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json.items || []);
      } catch (e) {
        console.error("Error fetching Medium feed:", e);
        setFailed(true);
      }
    })();
  }, []);

  return (
    <Section
      id="writing"
      index="02"
      label="Writing"
      title={
        <>
          Notes from the{" "}
          <span className="font-serif font-normal italic">workbench</span>
        </>
      }
      action={
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          All posts
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      }
    >
      {failed || (data && data.length === 0) ? (
        <p className="text-muted-foreground">
          Posts are taking a break right now — read them on{" "}
          <a
            href={MEDIUM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            Medium
          </a>
          .
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {data
            ? data.slice(0, 3).map((p, index) => (
                <Reveal key={p.url} delay={index * 0.08} lift>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border bg-card p-3 transition-shadow hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]"
                  >
                    <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                      {p.image && (
                        <img
                          src={p.image}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-3 pt-5">
                      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        {formatDate(p.date)}
                      </p>
                      <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                        {p.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {p.snippet}
                      </p>
                    </div>
                  </a>
                </Reveal>
              ))
            : [0, 1, 2].map((i) => (
                <div key={i} className="rounded-2xl border bg-card p-3">
                  <div className="aspect-[16/10] animate-pulse rounded-xl bg-muted" />
                  <div className="space-y-3 p-3 pt-5">
                    <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  </div>
                </div>
              ))}
        </div>
      )}
    </Section>
  );
}
