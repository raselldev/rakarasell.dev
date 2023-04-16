import Image from "next/image";
import Profile from "@/public/og.jpeg";

export default function About() {
  return (
    <section className="py-20">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl">
        About Me
      </h1>
      <div className="max-w-screen-xl mx-auto md:px-8">
        <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
          <div className="flex-1 sm:hidden lg:block">
            <Image src={Profile} alt="Profile Image" className="rounded-full" />
          </div>
          <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
            <h3 className="text-accent font-semibold">Software Developer</h3>
            <p className="text-primary text-3xl font-semibold sm:text-4xl">
              &quot;Good software, like good wine, takes time.&quot; - Joel
              Spolsky
            </p>
            <p className="mt-3 text-primary text-md">
              Hi, I&apos;m Raka Rasell, a Software Engineer with expertise in
              web and mobile application development. Currently, I work as a
              Back-end Developer at Honda Indonesia. I am a creative problem
              solver with a passion for building intuitive, user-friendly
              products that enhance the user experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
