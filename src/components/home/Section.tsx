"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  // Lift the block slightly on hover (for cards)
  lift?: boolean;
};

// Fades content up once it scrolls into view
export function Reveal({ children, className, delay = 0, lift = false }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      whileHover={
        lift
          ? { y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SectionProps = {
  id?: string;
  index: string;
  label: string;
  title: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

// Landing page section: numbered mono label, large title, optional right-aligned action
export function Section({
  id,
  index,
  label,
  title,
  action,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-20 md:py-28", className)}
    >
      <motion.div
        aria-hidden
        className="h-px origin-left bg-border"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <Reveal className="mb-12 flex flex-col gap-6 pt-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="text-primary">{index}</span> / {label}
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h2>
        </div>
        {action}
      </Reveal>
      {children}
    </section>
  );
}
