import About from "@/components/about";
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Repo from "@/components/repo";
import Social from "@/components/social";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-between px-12">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <About />
        <Experience />
        <Social />
        <Footer />
      </div>
    </main>
  );
}
