"use client";

import { Contact, File } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import Profile from "../../public/profile.png"
import HeadProfile from "../../public/head-profile.png"

export default function Hero() {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="my-4 text-3xl md:text-5xl text-black dark:text-white opacity-75 font-bold leading-tight text-center md:text-left">
            Hi!👋
            <br />
            You can call me{" "}
            <span className="bg-gradient-to-r from-primary to-[#D247BF] text-transparent bg-clip-text">
              Rasell
            </span>
          </h1>{" "}

        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          A young man who transitioned to a career as a software developer after
          working in social media content, digital marketing, video editing, and
          as a product owner.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link href="mailto:rakarasell@outlook.com">
            <Button className="inline-flex items-center py-3 px-5 text-base text-white">
              <Contact className="mr-2 h-4 w-4" />
              Contact
            </Button>
          </Link>
          <Link href="https://www.linkedin.com/in/rakarasell/">
            <Button className="inline-flex items-center py-3 px-5 text-base dark:text-white text-black" variant="secondary">
              <File className="mr-2 h-4 w-4" />
              See Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <Image
          src={HeadProfile}
          alt=""
          className="w-[450px] object-contain rounded-lg"
        />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
}
