import type { Metadata, Viewport } from "next";
import { Gloock, Hanken_Grotesk } from "next/font/google";

import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { introGateScript } from "@/lib/motion/intro";

import "./globals.css";

const gloock = Gloock({
  variable: "--font-gloock",
  subsets: ["latin"],
  weight: "400",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Patio Bella · Lugogo Mall & Arena Mall, Kampala",
  description:
    "Breakfast to the last cocktail in two Kampala rooms: the new Patio Bella at Lugogo Mall and Patio Bella at Arena Mall, Nsambya. Where we all come together.",
};

export const viewport: Viewport = {
  themeColor: "#e8c585",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the intro gate script sets an attribute on
    // <html> before hydration (see src/lib/motion/intro.ts).
    <html
      lang="en"
      className={`${gloock.variable} ${hanken.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-canopy focus:px-5 focus:py-3 focus:text-butter"
        >
          Skip to content
        </a>
        {children}
        <MotionRuntime />
      </body>
    </html>
  );
}
