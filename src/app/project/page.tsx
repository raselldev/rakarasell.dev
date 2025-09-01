"use client";

import { ProjectList } from "@/lib/projectList";
import { generateImage } from "@/lib/imageGenerator";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";

// Type definitions for better type safety
interface Project {
  title: string;
  description: string;
  link: string;
}

interface ProjectCardProps {
  project: Project;
  imgSrc: string | null;
  index: number;
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const imageVariants: Variants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.1,
    },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
    },
  },
};

// Memoized ProjectCard component
const ProjectCard = ({ project, imgSrc, index }: ProjectCardProps) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
  >
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        {imgSrc && (
          <motion.div variants={imageVariants}>
            <Image
              src={imgSrc}
              alt={`Stunning visual for ${project.title} project`}
              width={400}
              height={250}
              className="h-64 w-full object-cover sm:h-72"
              priority={index < 2}
              loading={index >= 2 ? "lazy" : "eager"}
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <motion.div
        className="flex flex-col h-full bg-card p-6 border border-border"
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-3">
          <motion.h3
            className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {project.description}
          </motion.p>
        </div>

        <motion.div
          className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          Explore Project
          <motion.span
            className="ml-2"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.a>
  </motion.div>
);

export default function Projects() {
  const [generatedImages, setGeneratedImages] = useState<(string | null)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const generateProjectImages = useCallback(async () => {
    try {
      setIsLoading(true);
      const imagePromises = ProjectList.map(
        async (project: Project): Promise<string | null> => {
          try {
            return generateImage({ text: project.title });
          } catch (error) {
            console.warn(
              `Failed to generate image for ${project.title}:`,
              error
            );
            return null;
          }
        }
      );

      const images = await Promise.all(imagePromises);
      setGeneratedImages(images);
    } catch (error) {
      console.error("Error generating project images:", error);
      setGeneratedImages(new Array(ProjectList.length).fill(null));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    generateProjectImages();
  }, [generateProjectImages]);

  const featuredProjects = ProjectList;

  return (
    <section className="w-full py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <SectionHeader title="Latest Project" align="center" />

        <motion.p
          variants={subtitleVariants}
          className="text-center md:w-2/3 lg:w-1/2 mx-auto mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          Explore my handpicked projects spanning various fields. Join me on a
          journey of innovation and creativity that inspires and empowers!
        </motion.p>
      </motion.div>
      {isLoading ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array()].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="animate-pulse bg-muted rounded-xl h-96"
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 mt-12 justify-items-stretch"
        >
          {featuredProjects.map((project: Project, index: number) => (
            <ProjectCard
              key={project.title}
              project={project}
              imgSrc={generatedImages[index] || null}
              index={index}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
