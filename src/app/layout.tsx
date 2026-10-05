import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Motion from "@/components/home/Motion";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
import Script from "next/script";
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});
const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rakarasell.dev"),
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
        url: "https://rakarasell.dev/head-profile.png",
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
    icon: "/favicon.svg", // pakai "icon" instead of "shortcut"
    shortcut: "/favicon.svg", // optional, buat backward compat
    apple: "/favicon.svg", // optional, buat iOS
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
    <html
      className={cn(
        "h-full scroll-smooth",
        fontSans.variable,
        fontSerif.variable,
        fontMono.variable
      )}
      lang="en"
      dir="ltr"
    >
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="382c517e-ae69-40fb-99c9-765c58c8f38f"
      ></Script>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Motion>
          <Header />
          {children}
          <Footer />
        </Motion>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
