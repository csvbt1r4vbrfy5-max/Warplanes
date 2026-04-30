import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "موسوعة الطيران العسكري — Military Aviation Encyclopedia",
  description:
    "موسوعة عسكرية شاملة تضم 16 من أشهر الطائرات الحربية، المواصفات التقنية، أداة مقارنة قتالية، وجدول زمني للتطور التاريخي.",
  keywords:
    "طيران عسكري, طائرات مقاتلة, قاذفات شبحية, طائرات بدون طيار, F-22 Raptor, B-2 Spirit, SR-71 Blackbird",
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
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505]">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
