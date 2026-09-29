import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ShaktiAssistantModal } from "@/components/ai/ShaktiAssistantModal";
import { WelcomeMantraAudio } from "@/components/audio/WelcomeMantraAudio";
import { SacredCornerDarshan } from "@/components/temple/SacredCornerDarshan";

export const metadata: Metadata = {
  title: "SHAKTI YATRA — Smart Pilgrimage Assistance Platform | Vindhyachal",
  description:
    "Discover. Plan. Experience. Developed by Karan Yadav. Intelligent pilgrimage companion for Vindhyachal Dham, sacred Shakti Peeths, Trikona Yatra, verified timings, accessibility guidance, and spiritual AI assistance.",
  keywords: [
    "Shakti Yatra",
    "Vindhyachal",
    "Maa Vindhyavasini",
    "Trikona Yatra",
    "Pilgrimage Planner",
    "Karan Yadav",
    "Mirzapur",
    "Shakti Peeth",
    "UP Tourism"
  ],
  authors: [{ name: "Karan Yadav" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased flex flex-col selection:bg-shakti-500 selection:text-white">
        {/* Sacred Corner Photo of Maa Vindhyavasini */}
        <SacredCornerDarshan />

        {/* Welcome Sacred Audio Chant (Plays once on opening) */}
        <WelcomeMantraAudio />

        {/* Main Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Platform Footer */}
        <Footer />

        {/* Floating AI Pilgrimage Assistant */}
        <ShaktiAssistantModal />
      </body>
    </html>
  );
}
