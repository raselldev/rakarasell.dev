"use client"

import About from "@/components/About";
import GithubRepo from "@/components/GithubRepo";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col justify-between lg:p-24 md:p-12 sm:p-2">
      <Hero />
      <About />
      <GithubRepo />
    </main>
  );
}
