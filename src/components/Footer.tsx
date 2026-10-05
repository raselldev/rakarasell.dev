import { Github, Linkedin } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/raselldev", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rakarasell/",
    icon: Linkedin,
  },
];

export default function Footer() {
  return (
    <footer aria-label="Site Footer" className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p className="font-serif text-2xl italic leading-snug text-foreground">
            &ldquo;Good software takes patience. I keep things simple and
            consistent, knowing that everything becomes meaningful at the right
            time.&rdquo;
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} Raka Rasell
          </p>
        </div>

        <div className="flex gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border p-2.5 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
