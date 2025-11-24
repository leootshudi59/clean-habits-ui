import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { Web3AuthProvider } from "@/context/Web3AuthContext";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";

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

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // On attend les params (requis en Next.js 15+)
  const { locale } = await params;

  // Sécurité : vérifier si la locale est valide
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Récupérer les messages côté serveur
  const messages = await getMessages();
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <Web3AuthProvider>
            {children}
          </Web3AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}