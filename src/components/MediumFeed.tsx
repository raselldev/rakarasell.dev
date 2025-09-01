"use client";

import { useEffect, useState } from "react";
import SectionHeader from "./shared/SectionHeader";

type MediumPost = {
  title: string;
  url: string;
  date: string;
  snippet: string;
  image?: string | null;
  tags: string[];
};

export default function MediumFeedClient() {
  const [data, setData] = useState<MediumPost[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/medium", { next: { revalidate: 1800 } });
        const json = await res.json();
        setData(json.items || []);
      } catch (e: any) {
        setErr(e?.message || "Gagal ambil feed");
      }
    })();
  }, []);

  if (err) return <p className="text-red-600">{err}</p>;

  return (
    <section className="w-full py-12">
      <SectionHeader title="Latest from Medium" align="center" />
      <div className="grid gap-6 md:grid-cols-3">
        {data.slice(0, 3).map(
          (
            p // 👈 tambahin slice(0, 3)
          ) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border rounded-2xl p-4 hover:shadow-sm transition"
            >
              {p.image && (
                <div className="aspect-video w-full overflow-hidden rounded-xl mb-3">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                    loading="lazy"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold line-clamp-2">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {p.date
                  ? new Intl.DateTimeFormat("id-ID", {
                      dateStyle: "medium",
                    }).format(new Date(p.date))
                  : "—"}
              </p>
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                {p.snippet}
              </p>
            </a>
          )
        )}
      </div>
    </section>
  );
}
