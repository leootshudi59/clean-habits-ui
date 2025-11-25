"use client";

import { useTranslations } from "next-intl";

export default function SocialPage() {
  const t = useTranslations('Pages');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Fond d'ambiance spécifique Social (Rose/Fuchsia) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px] -z-10" />

        <div className="glass p-8 rounded-2xl border border-white/10 text-center max-w-md w-full shadow-neon">
            <div className="h-20 w-20 bg-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl border border-white/5 shadow-inner">
                🤝
            </div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">
                {t('social_title')}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
                {t('social_desc')}
            </p>
        </div>
    </div>
  );
}