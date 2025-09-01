"use client";

import Image from "next/image";
import Profile from "../../public/profile.png";
import { Code, Database, Users, ArrowRight, Briefcase } from "lucide-react";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import SectionHeader from "./shared/SectionHeader";

export default function About() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const skills = [
    {
      icon: Code,
      label: "Full-Stack Development",
      description:
        "Building and maintaining modern web applications with Next.js, React, and Tailwind CSS.",
      color: "text-blue-500",
    },
    {
      icon: Database,
      label: "Backend Engineering",
      description:
        "Designing scalable APIs, managing databases, and ensuring reliable system architecture.",
      color: "text-green-500",
    },
    {
      icon: Users,
      label: "Team Collaboration",
      description:
        "Working effectively across teams with clear communication and shared goals.",
      color: "text-purple-500",
    },
    {
      icon: Briefcase, // from lucide-react
      label: "Business Insight",
      description:
        "Aligning technical solutions with business objectives to maximize value delivery.",
      color: "text-amber-500",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      className="container p-10 md:p-16 relative overflow-hidden"
      ref={ref}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12"
      >
        {/* Profile Image */}
        <motion.div
          variants={itemVariants}
          className="flex-shrink-0 mb-6 md:mb-0 flex justify-center md:block w-full md:w-auto"
        >
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Subtle rotating border */}
            <motion.div
              className="absolute -inset-4 border border-primary/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Image container */}
            <motion.div
              className="relative bg-white p-2 rounded-2xl shadow-xl"
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={Profile}
                alt="Raka Rasell - Software Engineer"
                width={180}
                height={180}
                className="rounded-xl mx-auto md:mx-0 relative z-10"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <div className="flex-1 w-full space-y-6">
          {/* Heading */}
          <SectionHeader title="About Me" align="left" />

          <motion.div variants={itemVariants} className="relative">
            <div className="text-muted-foreground text-base sm:text-lg leading-relaxed text-center md:text-left">
              Hi, I&apos;m{" "}
              <span className="font-semibold text-foreground">Raka Rasell</span>
              , a passionate{" "}
              <span className="font-medium text-foreground">
                Software Engineer
              </span>{" "}
              specializing in{" "}
              <span className="font-medium">
                full-stack web development and enterprise solutions
              </span>
              . Currently serving as a{" "}
              <span className="font-semibold text-foreground">
                Backend Developer at Honda Indonesia
              </span>
              , where I architect and deliver{" "}
              <span className="font-medium">
                mission-critical systems that drive business innovation
              </span>
              . My expertise spans{" "}
              <span className="font-medium">
                C#, .NET ecosystems, database optimization, and modern
                JavaScript frameworks
              </span>
              , enabling me to build{" "}
              <span className="font-medium">
                scalable, high-performance applications that solve real-world
                challenges
              </span>
              .
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center md:justify-start gap-8 mt-8 flex-wrap"
          >
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={skill.label}
                  className="group cursor-pointer relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1 + index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  onHoverStart={() => setHoveredSkill(index)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  <motion.div
                    className="flex flex-col items-center min-w-[90px] p-4 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300"
                    animate={
                      hoveredSkill === index
                        ? {
                            borderColor: "hsl(var(--primary))",
                            backgroundColor: "hsl(var(--primary) / 0.05)",
                          }
                        : {}
                    }
                  >
                    <IconComponent
                      size={32}
                      className={`${
                        skill.color
                      } mb-2 transition-transform duration-300 ${
                        hoveredSkill === index ? "scale-110" : ""
                      }`}
                    />
                    <span className="text-sm font-medium text-center">
                      {skill.label}
                    </span>

                    {/* Tooltip */}
                    <motion.div
                      className="absolute top-full mt-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-md whitespace-nowrap z-20 border"
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        hoveredSkill === index
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: 0.2 }}
                    >
                      {skill.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover rotate-45 border-l border-t"></div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
