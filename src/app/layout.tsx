import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { introGateScript } from "@/lib/motion/intro";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Patio Bella",
  description: "The Patio Bella",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the intro gate script sets an attribute on
    // <html> before hydration (see src/lib/motion/intro.ts).
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <MotionRuntime />
      </body>
    </html>
  );
}
