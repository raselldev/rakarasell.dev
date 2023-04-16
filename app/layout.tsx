import Navbar from "@/components/navbar";
import "./globals.css";
import { Metadata } from "next/types";
import { Poppins } from "next/font/google";

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
  // verification: {
  //   google: "eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw",
  //   yandex: "14d2e73487fa6c71",
  // },
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
      </body>
    </html>
  );
}
