"use client";

import Hero from "@/components/hero";
import About from "@/components/about";
import Repo from "@/components/repo";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between px-12">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <Hero />
        <About />
        <Repo />
        <Footer />
      </div>
    </main>
  );
}
