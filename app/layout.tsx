import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { StatusProvider } from "@/context/StatusContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoreNet.AI | Advanced Decentralized AI Infrastructure",
  description: "CoreNet.AI is a cutting-edge decentralized AI infrastructure platform providing NeuroSplit, CerebralSync, ShardMind Assistant, and other advanced utilities for next-generation AI applications.",
  keywords: "AI infrastructure, web3, decentralized AI, neural networks, blockchain AI, CoreNet",
  authors: [{ name: "CoreNet Labs" }],
  openGraph: {
    title: "CoreNet.AI | Advanced Decentralized AI Infrastructure",
    description: "Next-generation decentralized AI infrastructure for Web3 applications",
    url: "https://corenet.ai",
    siteName: "CoreNet.AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoreNet.AI | Advanced Decentralized AI Infrastructure",
    description: "Next-generation decentralized AI infrastructure for Web3 applications",
    creator: "@CoreNetAI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StatusProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </StatusProvider>
      </body>
    </html>
  );
}
