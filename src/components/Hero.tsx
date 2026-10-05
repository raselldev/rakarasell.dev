"use client";

import Image from "next/image";
import Profile from "../../public/profile.png";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExperienceList } from "@/lib/experience";
import { CountUp, Words } from "./home/Animated";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const headlineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const CAREER_START = 2017;

export default function Hero() {
  const years = new Date().getFullYear() - CAREER_START;
  const current = ExperienceList.filter((exp) => exp.title.includes("Present"));

  // Portrait drifts and tilts as the hero scrolls away
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [2, -4]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <motion.div
        className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[1fr_auto] lg:gap-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.p
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Software Engineer
          </motion.p>

          <motion.h1
            variants={headlineVariants}
            aria-label="I build reliable software for real businesses."
            className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span aria-hidden>
              <Words text="I build reliable software for" />{" "}
              <Words
                text="real businesses."
                className="font-serif font-normal italic text-primary"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            I&apos;m Raka Rasell — I design APIs, enterprise systems, and modern
            web apps with C#, .NET, and TypeScript, turning business needs into
            software that keeps running.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" className="h-12 rounded-full px-6 text-base">
              <a href="#work">
                See selected work
                <ArrowDown />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full bg-transparent px-6 text-base"
            >
              <a
                href="https://www.linkedin.com/in/rakarasell/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get in touch
                <ArrowUpRight />
              </a>
            </Button>
          </motion.div>

          <motion.dl
            variants={itemVariants}
            className="mt-14 grid max-w-xl grid-cols-2 gap-6 border-t pt-6 sm:grid-cols-3"
          >
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Experience
              </dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight">
                <CountUp to={years} suffix="+" /> years
              </dd>
            </div>
            {current.map((exp) => (
              <div key={exp.Company}>
                <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {exp.title.replace("(Present)", "").trim()}
                </dt>
                <dd className="mt-1 text-lg font-medium leading-snug tracking-tight">
                  {exp.Company}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Portrait */}
        <motion.div
          variants={itemVariants}
          style={{ y: portraitY }}
          className="relative mx-auto w-full max-w-[320px] lg:max-w-[360px]"
        >
          <motion.div
            style={{ rotate: portraitRotate }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative rounded-[2rem] border bg-card p-3 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)]"
          >
            <Image
              src={Profile}
              alt="Portrait of Raka Rasell"
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
              priority
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-5 rounded-2xl border bg-card px-4 py-3 shadow-lg"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Writing code since
              </p>
              <p className="font-serif text-2xl italic">{CAREER_START}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
