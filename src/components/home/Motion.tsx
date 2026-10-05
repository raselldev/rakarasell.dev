"use client";

import { MotionConfig } from "framer-motion";

// Honors the OS "reduce motion" setting for every animation inside
export default function Motion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
