import About from "@/components/About";
import Footer from "@/components/Footer";
import GithubRepo from "@/components/GithubRepo";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex min-h-screen w-full flex-col justify-between">
      <About />
      <Timeline />
    </section>
  );
}
