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
          <Button className="w-full md:w-1/3">Get Started</Button>

          <a
            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository

          </a>
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
    // <div>
    //   <div className="h-screen leading-normal tracking-normal lg:m-12 md:m-2 sm:m-0 bg-cover bg-fixed">
    //     <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
    // <h1 className="my-4 text-3xl md:text-5xl text-black dark:text-white opacity-75 font-bold leading-tight text-center md:text-left">
    //   Hi!👋
    //   <br />
    //   You can call me{" "}
    //   <span className="bg-gradient-to-r from-primary to-[#D247BF] text-transparent bg-clip-text">
    //     Rasell
    //   </span>
    // </h1>
    //       <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left text-black dark:text-white xs:none">
    // A young man who transitioned to a career as a software developer after
    // working in social media content, digital marketing, video editing, and
    // as a product owner.
    //       </p>
    //     </div>
    //     <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
    //       <Link href="mailto:rakarasell@outlook.com">
    //         <Button className="inline-flex items-center py-3 px-5 text-base text-white">
    //           <Contact className="mr-2 h-4 w-4" />
    //           Contact
    //         </Button>
    //       </Link>
    //       <Link href="https://www.linkedin.com/in/rakarasell/">
    //         <Button className="inline-flex items-center py-3 px-5 text-base text-white">
    //           <File className="mr-2 h-4 w-4" />
    //           See Resume
    //         </Button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
}
