import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      aria-label="Site Footer"
      className="bg-neutral-50 text-neutral-600 border-t border-neutral-200"
    >
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Copyright Section */}
        <div className="flex justify-center text-sm">
          © {new Date().getFullYear()} Raka Rasell. All rights reserved.
        </div>

        {/* Indie Quote Section */}
        <p className="mx-auto mt-6 max-w-2xl text-center italic text-neutral-500 text-lg">
          &quot;Good software takes patience. I keep things simple and
          consistent, knowing that everything becomes meaningful at the right
          time.&quot;
        </p>

        {/* Social Media Section */}
        <div className="mt-8 flex justify-center gap-6">
          <a
            href="https://github.com/raselldev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-neutral-900"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/rakarasell/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-neutral-900"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
