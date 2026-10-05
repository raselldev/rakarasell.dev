"use client";

import { Reveal } from "./home/Section";

const logos = [
  { src: "/honda.svg", alt: "Honda Indonesia" },
  { src: "/tf.png", alt: "Traders Family" },
  { src: "/dapurwangi.svg", alt: "DapurWangiGroup" },
  { src: "/arkamaya.png", alt: "Arkamaya Culinary" },
];

export default function TrustedBy() {
  return (
    <section className="border-y bg-card/50">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-10 md:flex-row md:gap-12">
        <p className="shrink-0 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground md:text-left">
          Trusted by teams at
        </p>
        <div className="grid w-full grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-4">
          {logos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="mx-auto h-10 w-auto max-w-[140px] object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12"
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
