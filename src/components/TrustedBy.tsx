"use client";


import SectionHeader from "./shared/SectionHeader";

export default function TrustedBy() {
  return (
    <section className="w-full py-16 flex flex-col items-center text-center">
      <SectionHeader
        title="Proudly partnered with industry leaders"
        align="center"
      />
      <p className="p-1 text-muted-foreground mb-10 max-w-2xl">
        I&apos;ve had the privilege of collaborating with some of the world&apos;s most
        innovative companies.
      </p>
      <div className="flex p-4 flex-wrap justify-center gap-8 sm:gap-12">
        <img
          src="/honda.svg"
          alt="Honda Indonesia"
          className="h-16 sm:h-20 w-auto"
        />
        <img
          src="/tf.png"
          alt="Traders Family"
          className="h-16 sm:h-20 w-auto"
        />
        <img
          src="/dapurwangi.svg"
          alt="DapurWangiGroup"
          className="h-16 sm:h-20 w-auto"
        />
        <img
          src="/arkamaya.png"
          alt="Arkamaya Culinary"
          className="h-16 sm:h-20 w-auto"
        />
      </div>
    </section>
  );
}
