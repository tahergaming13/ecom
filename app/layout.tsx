import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdGen Studio",
  description: "AI-powered ad video generator & social media publisher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // We'll determine RTL later dynamically if needed, 
  // for now we set a default `dir` context or just ltr as fallback.
  return (
    <ClerkProvider>
      <html lang="en" dir="ltr" className="dark">
        <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-50`}>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
