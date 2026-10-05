"use client";

import { Fragment, useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

type WordsProps = {
  text: string;
  className?: string;
};

// Splits text into words that rise out of a clipping mask.
// Must sit inside a motion parent that staggers "hidden" -> "visible".
export function Words({ text, className }: WordsProps) {
  return (
    <>
      {text.split(" ").map((word, i, all) => (
        <Fragment key={`${word}-${i}`}>
          <span className="-mb-[0.12em] -mr-[0.08em] inline-block overflow-hidden pb-[0.12em] pr-[0.08em] align-top">
            <motion.span
              variants={wordVariants}
              className={`inline-block ${className ?? ""}`}
            >
              {word}
            </motion.span>
          </span>
          {i < all.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}

type CountUpProps = {
  to: number;
  duration?: number;
  suffix?: string;
};

// Counts from 0 to `to` once scrolled into view; renders the final value for SSR/reduced motion
export function CountUp({ to, duration = 1.4, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reduceMotion || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        node.textContent = `${Math.round(value)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, duration, suffix]);

  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  );
}
