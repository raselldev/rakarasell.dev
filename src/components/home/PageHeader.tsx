"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

type PageHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
};

// Intro block for interior pages (blog, projects)
export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        className="relative mx-auto max-w-6xl px-6 pb-12 pt-32 md:pb-16 md:pt-40"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {description}
          </motion.p>
        )}
        {children && <motion.div variants={itemVariants}>{children}</motion.div>}
      </motion.div>
    </section>
  );
}
