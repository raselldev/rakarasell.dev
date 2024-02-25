import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

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
    <html className="h-full scroll-smooth" lang="en" dir="ltr">
      <body className={cn("min-h-screen bg-background font-sans antialiased",)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Analytics />
          <Footer />
        </ThemeProvider>

      </body>
    </html>
  );
}
