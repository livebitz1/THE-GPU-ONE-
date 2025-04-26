import type { Metadata } from "next";
import { Inter, Roboto_Mono, Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { StatusProvider } from "@/context/StatusContext";

// Primary sans-serif font
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

// Secondary sans-serif font for headings and UI elements
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// Alternative high-quality sans font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

// Monospace font for code and terminal elements
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: 'swap',
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
        className={`${outfit.variable} ${spaceGrotesk.variable} ${inter.variable} ${robotoMono.variable} antialiased bg-background text-foreground`}
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
