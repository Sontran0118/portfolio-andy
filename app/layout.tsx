import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const DESCRIPTION =
  "Systems and autonomy engineer in New York. Bare-metal firmware and control " +
  "loops on a moving car, filesystems and protocols, and the systems built on top.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.andyhub.tech"),
  title: "Andy Tran — Systems & Autonomy Engineer",
  description: DESCRIPTION,
  keywords: [
    "Andy Tran",
    "systems engineer",
    "machine learning",
    "autonomous driving",
    "embedded",
    "STM32",
    "CUDA",
    "C++",
    "portfolio",
  ],
  authors: [{ name: "Andy Tran", url: "https://github.com/Sontran0118" }],
  openGraph: {
    title: "Andy Tran — Systems & Autonomy Engineer",
    description: DESCRIPTION,
    type: "website",
    url: "https://www.andyhub.tech",
    siteName: "Andy Tran",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andy Tran — Systems & Autonomy Engineer",
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
