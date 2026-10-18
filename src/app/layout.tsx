import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Schibsted_Grotesk } from "next/font/google";

import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { introGateScript } from "@/lib/motion/intro";

import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  axes: ["opsz"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Patio Bella · Lugogo Mall & Arena Mall, Kampala",
  description:
    "Breakfast to the last cocktail in two Kampala rooms: the new Patio Bella at Lugogo Mall and Patio Bella at Arena Mall, Nsambya. Where we all come together.",
};

export const viewport: Viewport = {
  themeColor: "#10230c",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the intro gate script sets an attribute on
    // <html> before hydration (see src/lib/motion/intro.ts).
    <html
      lang="en"
      className={`${bodoni.variable} ${schibsted.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-butter focus:px-5 focus:py-3 focus:text-canopy"
        >
          Skip to content
        </a>
        {children}
        <MotionRuntime />
      </body>
    </html>
  );
}
