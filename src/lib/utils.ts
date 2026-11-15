import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const SITE_HOST = "rakarasell.dev"

// Project links can be external URLs or paths on this site (e.g. "/inktrace").
export function isInternalLink(link: string) {
  return link.startsWith("/")
}

// Short label for a project link: the host for external URLs, "rakarasell.dev/path" for internal ones.
export function linkLabel(link: string) {
  if (isInternalLink(link)) return `${SITE_HOST}${link}`
  try {
    return new URL(link).hostname.replace(/^www\./, "")
  } catch {
    return link
  }
}

// Anchor props: internal links stay in the same tab, external ones open a new tab.
export function linkProps(link: string) {
  return isInternalLink(link)
    ? { href: link }
    : { href: link, target: "_blank", rel: "noopener noreferrer" }
}
