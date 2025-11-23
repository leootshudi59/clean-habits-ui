import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Web3AuthProvider } from "@/context/Web3AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // On définit une variable CSS
  display: "swap",
});

// 3. Configuration de la police pour les TITRES (Headings)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space", // Variable différente
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChainHabits",
  description: "Track habits on-chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground font-sans`}
      >
        <Web3AuthProvider>
          {children}
        </Web3AuthProvider>
      </body>
    </html>
  );
}