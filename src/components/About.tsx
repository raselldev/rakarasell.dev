"use client";

import Image from "next/image";
import Profile from "../../public/profile.png";
import { motion, type Variants } from "framer-motion";
import { ExperienceList } from "@/lib/experience";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function About() {
  const first = ExperienceList[ExperienceList.length - 1];

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <motion.div
        className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-32 md:pt-40 lg:grid-cols-[1fr_340px] lg:gap-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.p
            variants={itemVariants}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            About
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Engineer by trade,{" "}
            <span className="font-serif font-normal italic text-primary">
              builder at heart.
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground"
          >
            <p>
              I&apos;m <span className="text-foreground">Raka Rasell</span>, a
              software engineer focused on backend systems and full-stack web
              development. I started in {first.year} in{" "}
              {first.title.replace(/\(.*\)/, "").trim().toLowerCase()} at{" "}
              {first.Company}, moved into video production and front-end
              development, and found my home in building software.
            </p>
            <p>
              Today I&apos;m a{" "}
              <span className="text-foreground">
                Senior Programmer at Honda Prospect Motor
              </span>
              , where I design APIs, tune databases, and deliver
              mission-critical systems with C#, .NET, and SQL Server. In 2025 I
              co-founded <span className="text-foreground">OpenHeroLabs</span>.
            </p>
            <p>
              That path — marketing, media, then code — is why I care as much
              about the business outcome as the architecture behind it.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mx-auto w-full max-w-[300px] lg:mt-24 lg:max-w-none"
        >
          <div className="-rotate-2 rounded-[2rem] border bg-card p-3 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)] transition-transform duration-500 hover:rotate-0">
            <Image
              src={Profile}
              alt="Portrait of Raka Rasell"
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
