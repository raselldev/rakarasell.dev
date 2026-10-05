"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectList } from "@/lib/projectList";
import { Reveal, Section } from "./home/Section";

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function Projects() {
  return (
    <Section
      id="work"
      index="01"
      label="Selected work"
      title={
        <>
          Products I&apos;ve helped{" "}
          <span className="font-serif font-normal italic">ship</span>
        </>
      }
      action={
        <Link
          href="/project"
          className="group inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          All projects
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      }
    >
      <ul className="border-t">
        {ProjectList.map((project, index) => (
          <li key={project.title} className="border-b">
            <Reveal delay={index * 0.05}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-6 gap-y-2 py-8 transition-colors md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.3fr)_auto] md:items-center md:px-4 md:hover:bg-card"
              >
                <span className="font-mono text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {hostOf(project.link)}
                  </p>
                </div>
                <p className="col-start-2 text-sm leading-relaxed text-muted-foreground md:col-start-auto md:text-base">
                  {project.description}
                </p>
                <span className="col-start-3 row-start-1 flex h-10 w-10 items-center justify-center rounded-full border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground md:col-start-auto md:row-start-auto">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
