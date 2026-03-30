"use client";

import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import { Home, Trophy, Users, User, Hexagon } from "lucide-react";

export default function DashboardNav() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  // Définition des onglets
  const navItems = [
    {
      label: t("home"),
      href: "/dashboard",
      icon: Home,
    },
    {
      label: t("challenges"),
      href: "/dashboard/challenges",
      icon: Trophy,
    },
    {
      label: t("social"),
      href: "/dashboard/social",
      icon: Users,
    },
    {
      label: t("profile"),
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  // Helper pour vérifier si un lien est actif
  const isActive = (href: string) => {
    // Cas particulier pour la home /dashboard pour ne pas matcher tout le temps
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ================================================= */}
      {/* 📱 MOBILE BOTTOM BAR (Visible uniquement < md)  */}
      {/* ================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe pt-2 px-6 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5">
        <div className="flex justify-between items-center h-16">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center justify-center w-full h-full gap-1"
              >
                {/* Icône avec effet de "Glow" si active */}
                <div
                  className={`relative p-1.5 rounded-xl transition-all duration-300 ${
                    active
                      ? "bg-primary/15 text-primary scale-110"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  <item.icon
                    size={24}
                    strokeWidth={active ? 2.5 : 2}
                    className="relative z-10"
                  />
                  {/* Petit point lumineux sous l'icone active */}
                  {active && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_2px_rgba(124,58,237,0.6)]" />
                  )}
                </div>
                
                {/* Label (Masqué sur les tout petits écrans si besoin, mais ici on garde) */}
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    active ? "text-primary" : "text-zinc-500"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ================================================= */}
      {/* 🖥️ DESKTOP SIDEBAR (Visible uniquement >= md)   */}
      {/* ================================================= */}
      <aside className="hidden md:flex flex-col w-72 fixed left-0 top-0 bottom-0 bg-zinc-950 border-r border-white/5 p-6 z-50">
        {/* Logo Desktop */}
        <div className="flex items-center gap-3 mb-12 px-2">
            <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center border border-white/5 text-primary">
                <Hexagon strokeWidth={2.5} />
            </div>
            <div>
                <h1 className="font-heading font-bold text-xl text-white tracking-tight">
                    Chain<span className="text-primary">Habits</span>
                </h1>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Beta</p>
            </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  active
                    ? "bg-primary text-white shadow-neon"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={22} strokeWidth={active ? 2.5 : 2} />
                <span className={`font-medium ${active ? "font-bold" : ""}`}>
                    {item.label}
                </span>
                
                {/* Chevron discret au survol si inactif */}
                {!active && (
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                        →
                    </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer Sidebar (User summary par exemple) */}
        <div className="mt-auto pt-6 border-t border-white/5">
            <div className="bg-zinc-900/50 p-3 rounded-xl flex items-center gap-3 border border-white/5">
                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs">👻</div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">Mon Compte</p>
                    <p className="text-xs text-green-500 truncate">● Connecté</p>
                </div>
            </div>
        </div>
      </aside>
    </>
  );
}