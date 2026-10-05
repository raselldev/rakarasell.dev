"use client";

import { ExperienceList } from "@/lib/experience";
import { Reveal, Section } from "./home/Section";

// Titles carry notes in parentheses, e.g. "Co-Founder(Present)"
function parseTitle(raw: string) {
  const match = raw.match(/^(.*?)\s*\((.*)\)\s*$/);
  return match ? { title: match[1], note: match[2] } : { title: raw, note: null };
}

export default function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="Experience"
      title={
        <>
          From marketing to{" "}
          <span className="font-serif font-normal italic">mission&#8209;critical</span>
        </>
      }
    >
      <ol className="border-t">
        {ExperienceList.map((exp, index) => {
          const { title, note } = parseTitle(exp.title);
          const isPresent = note === "Present";
          return (
            <li key={`${exp.year}-${exp.title}`} className="border-b">
              <Reveal
                delay={index * 0.04}
                className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-6 gap-y-1 py-6 md:grid-cols-[6rem_1fr_1fr_10rem] md:px-4"
              >
                <span className="font-mono text-sm text-muted-foreground">
                  {exp.year}
                </span>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {title}
                </h3>
                <p className="col-start-2 text-muted-foreground md:col-start-auto">
                  {exp.Company}
                </p>
                {note && (
                  <span
                    className={
                      isPresent
                        ? "col-start-2 mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest text-foreground md:col-start-auto md:mt-0 md:justify-self-end"
                        : "col-start-2 mt-2 w-fit rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:col-start-auto md:mt-0 md:justify-self-end"
                    }
                  >
                    {isPresent && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                    {note}
                  </span>
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
