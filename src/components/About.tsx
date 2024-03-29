"use client"

import Image from "next/image";
import Profile from "../../public/profile.png"
import Statistics from "./Statistics";

export default function About() {
  return (
    <section className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image
            src={Profile}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-primary to-[#D247BF] text-transparent bg-clip-text">
                  About{" "}
                </span>
                Me
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Hi, I&apos;m Raka Rasell, a Software Engineer with expertise in
                web and mobile application development. Currently, I work as a
                Back-end Developer at Honda Indonesia. I am a creative problem
                solver with a passion for building intuitive, user-friendly
                products that enhance the user experience.
              </p>
            </div>
            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
}
