"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useState, useTransition, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Les langues disponibles
  const languages = [
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "fr", label: "FR", flag: "🇫🇷" },
    { code: "es", label: "ES", flag: "🇪🇸" },
    { code: "pt", label: "PT", flag: "🇵🇹" },
  ];

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const handleSelect = (nextLocale: string) => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* LE BOUTON DISCRET */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border border-transparent hover:border-white/10 hover:bg-zinc-800/50 transition-all ${
          isOpen ? "bg-zinc-800/50 border-white/10" : ""
        }`}
      >
        <span className="text-lg leading-none">{currentLang.flag}</span>
        <span className="text-sm font-medium text-zinc-300">{currentLang.label}</span>
        <ChevronDown
          size={14}
          className={`text-zinc-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* LE MENU DÉROULANT */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden animate-fade-in z-50 backdrop-blur-xl">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                disabled={isPending}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 transition-colors ${
                  locale === lang.code ? "text-primary font-bold bg-primary/10" : "text-zinc-400"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}