import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";

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
    <html className="h-full scroll-smooth" lang="en" dir="ltr">
      <Head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="382c517e-ae69-40fb-99c9-765c58c8f38f"
        ></script>
      </Head>
      <body className={cn("min-h-screen bg-base-100 font-sans antialiased")}>
        <Header />
        {children}
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
