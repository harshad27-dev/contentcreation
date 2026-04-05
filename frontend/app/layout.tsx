import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "ScriptAI — Faceless YouTube Automation",
  description: "Turn Any Idea Into a YouTube Video. In 15 Minutes. AI scripts. Royalty-free gameplay. Voiceover. Auto-publish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-black">
        <AuthProvider>
          <Navbar />
          <div id="smooth-wrapper">
            <div id="smooth-content" className="flex min-h-[calc(100vh-108px)] flex-col">
              {children}
            </div>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
