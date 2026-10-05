import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ProjectList } from "@/lib/projectList";
import Contact from "@/components/home/Contact";
import PageHeader from "@/components/home/PageHeader";
import { Reveal } from "@/components/home/Section";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected products and platforms Raka Rasell has helped build — from enterprise mobile apps to e-commerce.",
};

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <PageHeader
        eyebrow={`Projects · ${String(ProjectList.length).padStart(2, "0")}`}
        title={
          <>
            Products I&apos;ve helped{" "}
            <span className="font-serif font-normal italic text-primary">
              ship.
            </span>
          </>
        }
        description="Enterprise apps used across Indonesia, e-commerce platforms for growing brands, and the sites that tell their stories."
      />

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {ProjectList.map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 0.08} lift>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[2rem] border bg-card p-8 transition-colors hover:border-foreground md:p-10"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-8 top-6 select-none font-serif text-8xl italic leading-none text-muted transition-colors group-hover:text-primary/20 md:right-10"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="relative font-mono text-xs text-muted-foreground">
                  {hostOf(project.link)}
                </p>
                <h2 className="relative mt-20 text-3xl font-semibold tracking-tight md:text-4xl">
                  {project.title}
                </h2>
                <p className="relative mt-4 leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <span className="relative mt-auto inline-flex items-center gap-2 pt-8 font-medium">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  Visit project
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}
