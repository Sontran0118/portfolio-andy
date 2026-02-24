import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Andy Tran | Software Engineer",
  description: "Portfolio of Andy Tran - Software Engineer, Systems Programmer, and Backend Engineer specializing in C/C++, JavaScript, and low-level programming.",
  keywords: "Andy Tran, Software Engineer, Systems Programmer, Backend Engineer, C++, JavaScript, React, Next.js, Portfolio",
  authors: [{ name: "Andy Tran" }],
  openGraph: {
    title: "Andy Tran | Software Engineer",
    description: "Software Engineer specializing in systems programming and backend development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
