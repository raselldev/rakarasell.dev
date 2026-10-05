"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./home/Section";

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

function Featured({ post }: { post: MediumPost }) {
  return (
    <Reveal>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid overflow-hidden rounded-[2rem] border bg-card p-3 transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)] md:grid-cols-[1.2fr_1fr] md:items-center"
      >
        <div className="aspect-[1.91/1] overflow-hidden rounded-[1.5rem] bg-muted">
          {post.image && (
            <img
              src={post.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
        </div>
        <div className="flex flex-col p-5 md:p-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="text-foreground">Latest</span> · {formatDate(post.date)}
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {post.title}
          </h2>
          <p className="mt-4 line-clamp-4 leading-relaxed text-muted-foreground">
            {post.snippet}
          </p>
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className="mt-auto inline-flex items-center gap-1 pt-8 font-medium">
            Read on Medium
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

function PostCard({ post, index }: { post: MediumPost; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.06} lift>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col rounded-2xl border bg-card p-3 transition-shadow hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]"
      >
        <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted">
          {post.image && (
            <img
              src={post.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-3 pt-5">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {formatDate(post.date)}
          </p>
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {post.snippet}
          </p>
        </div>
      </a>
    </Reveal>
  );
}

function Skeleton() {
  return (
    <div className="space-y-10">
      <div className="h-[380px] animate-pulse rounded-[2rem] border bg-card" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
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
    </div>
  );
}

export default function BlogList() {
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

  if (failed || (data && data.length === 0)) {
    return (
      <p className="text-lg text-muted-foreground">
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
    );
  }

  if (!data) return <Skeleton />;

  const [latest, ...rest] = data;

  return (
    <div className="space-y-10">
      <Featured post={latest} />
      {rest.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <PostCard key={post.url} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
