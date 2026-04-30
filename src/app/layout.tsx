import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "WARPLANES — Military Aviation Encyclopedia",
  description:
    "A classified-grade military aviation encyclopedia featuring 16 iconic warplanes, specifications, combat comparison tools, and historical evolution timeline.",
  keywords:
    "military aviation, fighter jets, stealth bombers, combat UAVs, reconnaissance aircraft, F-22 Raptor, B-2 Spirit, SR-71 Blackbird",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Amiri:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505]">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
