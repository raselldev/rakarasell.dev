"use client";

import Image from "next/image";
import UnsplashImage from "../../public/unsplash.jpg";

export default function Hero() {
  return (
    <section className="place-items-center">
      <div className="flex flex-wrap">
        <div className="w-full sm:w-8/12 mb-10">
          <div className="container mx-auto h-full sm:p-10">
            <nav className="flex px-4 justify-between items-center">
              <div className="text-4xl font-bold">
                RRSLL<span className="text-primary">.</span>
              </div>
            </nav>
            <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
              <div className="w-full">
                <h1 className="text-4xl lg:text-6xl font-bold">
                  Engineering{" "}
                  <span className="text-primary">Scalable &amp; Reliable</span>{" "}
                  Digital Solutions
                </h1>
                <div className="w-20 h-2 bg-primary my-4"></div>
                <p className="text-xl mb-10">
                  A results-oriented software engineer with extensive experience
                  in leading the development and optimization of
                  enterprise-grade applications.
                </p>
                <button className="btn btn-primary hover:btn-secondary">
                  <a
                    href="https://www.linkedin.com/in/rakarasell/"
                    target="_blank"
                  >
                    See Resume
                  </a>
                </button>
              </div>
            </header>
          </div>
        </div>
        <Image src={UnsplashImage} alt="Ocean" className="sm:w-4/12" />
      </div>
    </section>
  );
}
