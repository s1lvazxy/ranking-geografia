import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Ranking Geografia ICCA 2024",
  description: "Ranking ICCA de cidades e países para congressos internacionais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body
        className="bg-[#0A0D14] min-h-screen"
        style={{ fontFamily: "var(--font-geist-mono)", fontVariantNumeric: "tabular-nums" }}
      >
        {children}
      </body>
    </html>
  );
}
