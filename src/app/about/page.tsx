import type { Metadata } from "next";
import { Briefcase, Code, Database, Users } from "lucide-react";
import About from "@/components/About";
import Timeline from "@/components/Experience";
import Testimonial from "@/components/Testimonial";
import Tools from "@/components/Tools";
import Contact from "@/components/home/Contact";
import { Reveal, Section } from "@/components/home/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Raka Rasell — software engineer building backend systems and modern web apps.",
};

const skills = [
  {
    icon: Code,
    label: "Full-Stack Development",
    description:
      "Building and maintaining modern web applications with Next.js, React, and Tailwind CSS.",
  },
  {
    icon: Database,
    label: "Backend Engineering",
    description:
      "Designing scalable APIs, managing databases, and ensuring reliable system architecture.",
  },
  {
    icon: Users,
    label: "Team Collaboration",
    description:
      "Working effectively across teams with clear communication and shared goals.",
  },
  {
    icon: Briefcase,
    label: "Business Insight",
    description:
      "Aligning technical solutions with business objectives to maximize value delivery.",
  },
];

const values = [
  {
    title: "Clarity",
    description: "Writing code that others can read and understand.",
  },
  {
    title: "Collaboration",
    description: "Great work comes from teamwork, not isolation.",
  },
  { title: "Growth", description: "Always learning, always iterating." },
];

export default function AboutPage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <About />

      <Section
        id="what-i-do"
        index="01"
        label="What I do"
        title={
          <>
            Where I add the most{" "}
            <span className="font-serif font-normal italic">value</span>
          </>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map(({ icon: Icon, label, description }, index) => (
            <Reveal key={label} delay={index * 0.06} lift>
              <div className="h-full rounded-2xl border bg-card p-6 transition-colors hover:border-primary">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">
                  {label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Timeline />

      <Section
        id="principles"
        index="03"
        label="Principles"
        title={
          <>
            How I <span className="font-serif font-normal italic">work</span>
          </>
        }
      >
        <Reveal>
          <p className="max-w-4xl font-serif text-3xl italic leading-snug md:text-5xl">
            &ldquo;Great software is not just about solving problems, but
            solving them in a way that is clean, collaborative, and built to
            last.&rdquo;
          </p>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
          {values.map((value, index) => (
            <div key={value.title} className="bg-card p-6 md:p-8">
              <p className="font-mono text-xs text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                {value.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Testimonial />

      <Tools />

      <div className="pt-8">
        <Contact index="06" email="rakarasell@outlook.com" />
      </div>
    </main>
  );
}
