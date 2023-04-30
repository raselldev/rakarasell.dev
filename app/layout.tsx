import Navbar from "@/components/navbar";
import "./globals.css";
import { Metadata } from "next/types";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "Raka Rasell",
    template: "%s | Raka Rasell",
  },
  description: "Software Developer",
  openGraph: {
    title: "Raka Rasell",
    description: "Software Developer",
    url: "https://rakarasell.dev",
    siteName: "Raka Rasell",
    images: [
      {
        url: "https://rakarasell.dev/og.jpeg",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    shortcut: "/favicon.svg",
  },
  verification: {
    google: "yohK4bT0nSP52jy0TZHIjNAK9E_dXnNy0NErhpdnB04",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-secondary">
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
