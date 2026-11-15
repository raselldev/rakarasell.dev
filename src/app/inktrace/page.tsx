import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Grid3x3,
  Lightbulb,
  Mail,
  ShieldCheck,
  SlidersHorizontal,
  WifiOff,
} from "lucide-react";
import { Reveal, Section } from "@/components/home/Section";

// INKTRACE landing page. While the game is in internal testing, the tester link only
// works for Google accounts on the tester list. At launch, replace PLAY_URL with the
// public listing (play.google.com/store/apps/details?id=dev.rakarasell.inktrace)
// and drop the playtest copy.
const PLAY_URL = "https://play.google.com/apps/internaltest/4701151844093057209";
const CONTACT_EMAIL = "hello@rakarasell.dev";
const PLAYTEST_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "INKTRACE playtest"
)}&body=${encodeURIComponent(
  "Hi! I'd like to playtest INKTRACE.\n\nGoogle account email for the tester list: \nPhone model: \n"
)}`;

export const metadata: Metadata = {
  title: "INKTRACE",
  description:
    "INKTRACE is a calm path puzzle for Android. Draw one line through every checkpoint to the flag, using as little ink as you can. Offline, no ads, no account.",
  alternates: { canonical: "/inktrace" },
  openGraph: {
    title: "INKTRACE · Every move matters.",
    description:
      "A calm path puzzle for Android. Draw one line through every checkpoint, using as little ink as you can.",
    url: "/inktrace",
    images: [{ url: "/inktrace/feature-graphic.png", width: 1024, height: 500 }],
  },
};

const steps = [
  {
    image: "/inktrace/screenshot-1.png",
    title: "Every move costs ink",
    body: "Swipe from the start ring to draw a single line. Each step uses one drop of ink, and you can never cross your own path.",
  },
  {
    image: "/inktrace/screenshot-3.png",
    title: "Pass every checkpoint",
    body: "Visit every diamond, in any order, before the flag opens. The closest one is rarely the right one to take first.",
  },
  {
    image: "/inktrace/screenshot-2.png",
    title: "Waste nothing",
    body: "Reach the flag with exactly the optimal ink for three stars. The game knows the best route for every level.",
  },
];

const features = [
  {
    icon: Grid3x3,
    title: "50 levels, one perfect route each",
    body: "Grids grow from 5×5 to 10×10. Every level is checked by the game, so a perfect route always exists.",
  },
  {
    icon: Lightbulb,
    title: "Hints that don't spoil",
    body: "A hint shows the best order to visit the checkpoints, never the route itself. The path is still yours to find.",
  },
  {
    icon: WifiOff,
    title: "Offline, no ads, no account",
    body: "No internet permission, no purchases, no sign-in. Open it on a plane and play.",
  },
  {
    icon: SlidersHorizontal,
    title: "Calm by design",
    body: "Soft paper-and-pen sounds and light haptics. Sound, haptics and animations can each be turned off.",
  },
];

function PhoneFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border-[6px] border-foreground bg-[#F3EFE6] shadow-sm ${className ?? ""}`}
    >
      <img src={src} alt={alt} width={1080} height={1920} className="block h-auto w-full" />
    </div>
  );
}

function PlaytestActions({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={PLAYTEST_MAILTO}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Mail className="h-4 w-4" />
        Join the playtest
      </a>
      <span
        className={`inline-flex h-12 items-center rounded-full border px-5 font-mono text-xs uppercase tracking-widest ${
          onDark ? "border-background/25 text-background/70" : "text-muted-foreground"
        }`}
      >
        Coming soon to Google Play
      </span>
    </div>
  );
}

function TesterNote({ onDark = false }: { onDark?: boolean }) {
  return (
    <p className={`text-sm leading-relaxed ${onDark ? "text-background/60" : "text-muted-foreground"}`}>
      Email your Google account and you&apos;ll be added to the tester list. Already on it?{" "}
      <a
        href={PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-0.5 font-medium underline decoration-primary underline-offset-4 ${
          onDark ? "text-background" : "text-foreground"
        }`}
      >
        Get the test build
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </p>
  );
}

export default function InktracePage() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/3 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-16 pt-32 md:grid-cols-[1.15fr_0.85fr] md:pb-24 md:pt-40">
          <Reveal>
            <img
              src="/inktrace/icon-512.png"
              alt="INKTRACE app icon"
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-[1.25rem] border"
            />
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Android puzzle game · In development
            </p>
            <h1 className="mt-4 text-6xl font-semibold leading-[1] tracking-tight sm:text-7xl lg:text-8xl">
              INKTRACE
            </h1>
            <p className="mt-4 font-serif text-3xl italic text-muted-foreground md:text-4xl">
              Every move matters.
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              A calm path puzzle. Draw one line from the start ring to the flag, pass every
              checkpoint on the way, and use as little ink as you can. The grid looks simple. The
              best route rarely is.
            </p>
            <div className="mt-10">
              <PlaytestActions />
            </div>
            <div className="mt-4 max-w-md">
              <TesterNote />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <PhoneFrame
              src="/inktrace/screenshot-1.png"
              alt="INKTRACE level 17: a path from the start ring past one checkpoint, 24 of 30 ink left"
              className="mx-auto max-w-[300px] md:max-w-[340px]"
            />
          </Reveal>
        </div>
      </section>

      <Section
        id="how-it-plays"
        index="01"
        label="How it plays"
        title={
          <>
            Simple rules.{" "}
            <span className="font-serif font-normal italic">Hard routes.</span>
          </>
        }
      >
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <PhoneFrame src={step.image} alt={step.title} className="mx-auto max-w-[280px]" />
              <p className="mt-8 font-mono text-xs text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          In development. Screens show real levels.
        </p>
      </Section>

      <Section
        id="features"
        index="02"
        label="Features"
        title={
          <>
            Nothing between you and the{" "}
            <span className="font-serif font-normal italic">puzzle</span>
          </>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, body }, index) => (
            <Reveal key={title} delay={(index % 2) * 0.06} lift>
              <div className="h-full rounded-2xl border bg-card p-6 transition-colors hover:border-primary md:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="privacy"
        index="03"
        label="Privacy"
        title={
          <>
            Your progress stays on{" "}
            <span className="font-serif font-normal italic">your phone</span>
          </>
        }
      >
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-foreground">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                INKTRACE collects no data. No analytics, no ads, no account and no internet
                permission. Progress is saved only on your device and is never backed up or
                transferred.
              </p>
            </div>
            <Link
              href="/inktrace/privacy-policy"
              className="group inline-flex shrink-0 items-center gap-1 font-medium"
            >
              Privacy policy
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* Playtest */}
      <section id="playtest" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 pb-24">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-foreground px-8 py-16 text-background md:px-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/40 blur-3xl"
          />
          <p className="relative font-mono text-xs uppercase tracking-widest text-background/60">
            04 / Playtest
          </p>
          <h2 className="relative mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Help tune the{" "}
            <span className="font-serif font-normal italic">routes.</span>
          </h2>
          <p className="relative mt-6 max-w-xl text-lg text-background/70">
            INKTRACE is in testing on Google Play. Testers get early builds and shape the
            difficulty, the hints and the star thresholds before launch.
          </p>
          <div className="relative mt-10">
            <PlaytestActions onDark />
          </div>
          <div className="relative mt-4 max-w-md">
            <TesterNote onDark />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
