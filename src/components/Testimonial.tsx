"use client";

import { TestimonialList } from "@/lib/testimonial";
import { Reveal, Section } from "./home/Section";

export default function Testimonial() {
  return (
    <Section
      id="testimonials"
      index="04"
      label="Kind words"
      title={
        <>
          What people{" "}
          <span className="font-serif font-normal italic">say</span>
        </>
      }
    >
      <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
        {TestimonialList.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.05} className="mb-6 break-inside-avoid" lift>
            <figure className="rounded-2xl border bg-card p-6">
              <span
                aria-hidden
                className="block font-serif text-5xl leading-none text-primary"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 text-lg leading-relaxed">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 border-t pt-4">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
