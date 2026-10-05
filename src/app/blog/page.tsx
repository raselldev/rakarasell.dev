import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import BlogList from "@/components/BlogList";
import PageHeader from "@/components/home/PageHeader";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on software engineering, enterprise systems, and working in tech by Raka Rasell.",
};

export default function BlogPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <PageHeader
        eyebrow="Blog"
        title={
          <>
            Notes from the{" "}
            <span className="font-serif font-normal italic text-primary">
              workbench.
            </span>
          </>
        }
        description="Thoughts on building software, enterprise systems, and life as an engineer — written in English and Bahasa Indonesia."
      >
        <a
          href="https://medium.com/@rakarasell"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Follow on Medium
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </PageHeader>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <BlogList />
      </section>
    </main>
  );
}
