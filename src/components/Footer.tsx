import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      aria-label="Site Footer"
      className="bg-gradient-to-t from-primary to-warning"
    >
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Copyright Section */}
        <div className="flex justify-center text-white text-center">
          © Copyright 2021 - {new Date().getFullYear()} Raka Rasell
        </div>

        {/* Indie Quote Section */}
        <p className="mx-auto mt-6 max-w-lg text-center text-white italic text-lg">
          &quot;The sunset is a gentle reminder that endings can be beautiful
          too, just like a well-written code.&quot;
        </p>

        {/* Social Media Section */}
        <div className="mt-8 flex justify-center gap-4 text-white">
          <a
            href="https://github.com/raselldev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary"
          >
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/in/rakarasell/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary"
          >
            <Linkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
