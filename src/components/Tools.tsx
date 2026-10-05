"use client";

import { ToolList } from "@/lib/tool";
import { Reveal, Section } from "./home/Section";

export default function Tools() {
  return (
    <Section
      id="toolbox"
      index="05"
      label="Toolbox"
      title={
        <>
          Tools I <span className="font-serif font-normal italic">love</span>
        </>
      }
    >
      <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3 lg:grid-cols-4">
        {ToolList.map((tool) => (
          <div
            key={tool.name}
            className="group bg-card p-5 transition-colors hover:bg-accent md:p-6"
          >
            <p className="font-semibold tracking-tight">{tool.name}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {tool.featured}
            </p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
