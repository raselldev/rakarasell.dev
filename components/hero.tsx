import { useEffect, useState } from "react";

export default function Hero() {
  return (
    <section className="bg-gradien-to-r from-secondary to-accent items-center h-screen content-center">
      <div className="mx-auto max-w-screen-xl px-4 py-32 items-center text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl">
          Hi👋 My name is Raka Rasell
        </h1>
        <p className="mb-8 text-md font-normal text-accent">
          A young man who decided to choose a career as a software developer.
          Previously social media content, digital marketing, video editor, and
          product owner.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a
            href="mailto:rakarasell@outlook.com.com"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center rounded-lg border text-primary border-primary hover:bg-accent hover:text-secondary hover:border-accent"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
