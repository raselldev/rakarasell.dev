"use client";

import Hero from "@/components/Hero";
import Projects from "@/components/LatestProjects";
import MediumFeed from "@/components/MediumFeed";
import TrustedBy from "@/components/TrustedBy";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Hero />
      <TrustedBy />
      <Projects />
      <MediumFeed />
      <Contact index="03" />
    </main>
  );
}
