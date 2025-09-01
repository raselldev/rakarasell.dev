"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type SectionHeaderProps = {
  title: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  title,
  align = "left",
}: SectionHeaderProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold relative">
        {title}
      </h2>

      {/* Animated underline */}
      <motion.div
        className={`h-1 bg-primary rounded-full mt-2 mb-4 ${
          align === "center" ? "mx-auto" : ""
        }`}
        initial={{ width: 0 }}
        animate={inView ? { width: 120 } : { width: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      />
    </motion.div>
  );
}
