"use client";

import About from "@/components/About";
import Timeline from "@/components/Experience";
import SectionHeader from "@/components/shared/SectionHeader";
import Testimonial from "@/components/Testimonial";
import Tools from "@/components/Tools";

export default function AboutPage() {
  return (
    <section className="flex min-h-screen items-center w-full flex-col gap-24 py-16">
      {/* About summary */}
      <About />

      {/* Philosophy */}
      <section className="max-w-3xl mx-auto text-center px-6">
        <SectionHeader title="My Philosophy" align="center" />
        <p className="text-muted-foreground text-lg leading-relaxed">
          I believe great software is not just about solving problems, but
          solving them in a way that is clean, collaborative, and built to last.
        </p>
      </section>

      {/* Values */}
      <section className="max-w-4xl mx-auto text-center px-6">
        <SectionHeader title="Core Values" align="center" />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border shadow-sm bg-card">
            <h3 className="font-semibold mb-2">Clarity</h3>
            <p className="text-sm text-muted-foreground">
              Writing code that others can read and understand.
            </p>
          </div>
          <div className="p-6 rounded-2xl border shadow-sm bg-card">
            <h3 className="font-semibold mb-2">Collaboration</h3>
            <p className="text-sm text-muted-foreground">
              Great work comes from teamwork, not isolation.
            </p>
          </div>
          <div className="p-6 rounded-2xl border shadow-sm bg-card">
            <h3 className="font-semibold mb-2">Growth</h3>
            <p className="text-sm text-muted-foreground">
              Always learning, always iterating.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline experience */}
      <Timeline />

      {/* Testimonials */}
      <Testimonial />

      {/* Tools I Love */}
      <Tools />

      {/* Call To Action */}
      <section className="max-w-3xl mx-auto text-center px-6">
        <SectionHeader title="Let's Connect" align="center" />
        <p className="text-muted-foreground mb-6">
          Interested in working together or just want to say hi? Reach out and
          let&apos;s build something awesome.
        </p>
        <a
          href="mailto:rakarasell@outlook.com"
          className="inline-block px-6 py-3 rounded-xl bg-primary text-white font-medium shadow-md hover:opacity-90 transition"
        >
          Contact Me
        </a>
      </section>
    </section>
  );
}
