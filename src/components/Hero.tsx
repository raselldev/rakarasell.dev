"use client";

import Image from "next/image";
import UnsplashImage from "../../public/unsplash.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, type Variants } from "framer-motion";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.6,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const textHighlightVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut",
      },
    },
  };

  const dividerVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: "6rem",
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <motion.div
        className="container flex flex-col lg:flex-row items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex-1" variants={itemVariants}>
          <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur hover:shadow-3xl transition-shadow duration-300">
            <CardContent className="p-8 lg:p-12">
              <motion.h1
                className="text-5xl lg:text-7xl font-extrabold leading-tight"
                variants={itemVariants}
              >
                Craft{" "}
                <motion.span
                  className="text-primary"
                  variants={textHighlightVariants}
                >
                  Exceptional
                </motion.span>{" "}
                <br />
                Digital Experiences That{" "}
                <motion.span
                  className="text-primary"
                  variants={textHighlightVariants}
                >
                  Inspire
                </motion.span>
              </motion.h1>

              <motion.div
                className="h-2 bg-primary my-6 rounded-full"
                variants={dividerVariants}
                style={{ width: 0 }}
              />

              <motion.p
                className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed"
                variants={itemVariants}
              >
                I specialize in transforming visionary concepts into
                cutting-edge digital solutions — meticulously crafted, highly
                scalable, and engineered to create meaningful impact. Empowering
                organizations to bridge the gap between imagination and
                implementation through elegant code architecture and intuitive
                user experiences.
              </motion.p>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl text-lg px-8 py-5 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a
                    href="https://www.linkedin.com/in/rakarasell/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discover My Portfolio
                  </a>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="flex-1"
          variants={imageVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <Image
              src={UnsplashImage}
              alt="Abstract ocean waves representing innovation and creative flow"
              className="rounded-3xl shadow-2xl object-cover w-full h-[500px] lg:h-[700px] transition-transform duration-300"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-primary/5 rounded-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
