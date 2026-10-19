import type { Metadata, Viewport } from "next";
import { Montserrat, Noto_Serif_Display } from "next/font/google";

import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { introGateScript } from "@/lib/motion/intro";

import "./globals.css";

// The two faces of the logo: the high-contrast serif of "Patio" and the
// geometric sans of "BELLA".
const serif = Noto_Serif_Display({
  variable: "--font-logo-serif",
  subsets: ["latin"],
  axes: ["wdth"],
});

const sans = Montserrat({
  variable: "--font-logo-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Patio Bella · Lugogo Mall & Arena Mall, Kampala",
  description:
    "Patio Bella, two branches in Kampala: Arena Mall, Nsambya and the new Lugogo Mall. Breakfast to the last cocktail. Where we all come together.",
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
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-butter focus:px-5 focus:py-3 focus:text-canopy"
        >
          Skip to content
        </a>
        {children}
        <MotionRuntime />
      </body>
    </html>
  );
}
