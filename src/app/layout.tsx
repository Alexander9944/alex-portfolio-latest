import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FluidCursor from "@/components/FluidCursor";
import TechBackground from "@/components/TechBackground";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ScrollManager from "@/components/ScrollManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alexander Abraham - Full Stack Developer",
  description: "Portfolio of Alexander Abraham, a skilled full stack developer.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ScrollManager>
            <TechBackground />
            <FluidCursor />
            {children}
          </ScrollManager>
        </ThemeProvider>
      </body>
    </html>
  );
}
