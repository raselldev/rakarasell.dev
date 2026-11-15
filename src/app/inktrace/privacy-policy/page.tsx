import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Privacy policy for the INKTRACE Android app. Its URL is entered in the Play Console,
// so keep the path stable: /inktrace/privacy-policy

const CONTACT_EMAIL = "hello@rakarasell.dev";
const EFFECTIVE_DATE = "November 15, 2026";

export const metadata: Metadata = {
  title: "INKTRACE Privacy Policy",
  description:
    "Privacy policy for INKTRACE, an offline puzzle game for Android. The app collects no data.",
  alternates: { canonical: "/inktrace/privacy-policy" },
};

export default function InktracePrivacyPolicy() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-32 md:pt-40">
      <Link
        href="/inktrace"
        className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        INKTRACE
      </Link>

      <header className="mt-8 border-b pb-10">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Effective {EFFECTIVE_DATE}
        </p>
      </header>

      <article className="prose mt-10 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-foreground prose-a:decoration-primary prose-a:underline-offset-4">
        <p>
          INKTRACE is a puzzle game for Android, made by Raka Rasell. This policy
          explains what happens to your data when you play it. The short version:
          nothing leaves your device.
        </p>

        <h2>Data we collect</h2>
        <p>
          None. INKTRACE does not collect, transmit, sell or share any personal or
          usage data. It has no account, no analytics, no advertising and no in-app
          purchases. It does not request permission to access the internet, your
          location, contacts, camera, microphone or files.
        </p>

        <h2>Data stored on your device</h2>
        <p>
          The game saves your progress (completed levels, stars, best times,
          energy, hints and settings) in the app&rsquo;s private storage on your
          device. This data never leaves the device. It is excluded from Android
          backup and device transfer, so it is not copied to cloud storage or to a
          new phone. Uninstalling the app or clearing its data deletes it
          permanently.
        </p>

        <h2>Children</h2>
        <p>INKTRACE collects no data from anyone, including children.</p>

        <h2>Third parties</h2>
        <p>
          The app contains no third-party services that collect data. Google Play,
          which distributes the app, has its own privacy policy. This policy covers
          the INKTRACE app only, not this website.
        </p>

        <h2>Changes</h2>
        <p>
          If a future version adds features that handle data, such as ads, this
          policy will be updated before that version is released, and the
          effective date above will change.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </article>
    </main>
  );
}
