import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const DESCRIPTION =
  "Systems and AI engineer in New York. World models and imitation learning, " +
  "GPU kernels and network protocols, and full-stack products built on top of them.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sxtdev.com"),
  title: "Andy Tran — Systems & AI Engineer",
  description: DESCRIPTION,
  keywords: [
    "Andy Tran",
    "systems engineer",
    "machine learning",
    "world models",
    "CUDA",
    "Go",
    "C++",
    "portfolio",
  ],
  authors: [{ name: "Andy Tran", url: "https://github.com/Sontran0118" }],
  openGraph: {
    title: "Andy Tran — Systems & AI Engineer",
    description: DESCRIPTION,
    type: "website",
    url: "https://sxtdev.com",
    siteName: "Andy Tran",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andy Tran — Systems & AI Engineer",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
