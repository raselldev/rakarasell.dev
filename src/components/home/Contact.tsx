"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Section";

type ContactProps = {
  index?: string;
  email?: string;
};

export default function Contact({ index, email }: ContactProps) {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 pb-24">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-foreground px-8 py-16 text-background md:px-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/40 blur-3xl"
        />
        <p className="relative font-mono text-xs uppercase tracking-widest text-background/60">
          {index && <>{index} / </>}Contact
        </p>
        <h2 className="relative mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Have a system that needs to{" "}
          <span className="font-serif font-normal italic">just work?</span>
        </h2>
        <p className="relative mt-6 max-w-xl text-lg text-background/70">
          I&apos;m open to conversations about backend architecture, web
          products, and long-term collaborations.
        </p>
        <div className="relative mt-10 flex flex-wrap gap-3">
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Email me
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          <a
            href="https://www.linkedin.com/in/rakarasell/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-background px-6 font-medium text-foreground transition-opacity hover:opacity-90"
          >
            Message me on LinkedIn
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/raselldev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-background/25 px-6 font-medium transition-colors hover:border-background"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
