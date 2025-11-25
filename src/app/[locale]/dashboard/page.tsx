"use client";

import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations('Dashboard');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />

        <div className="glass p-8 rounded-2xl border border-white/10 text-center max-w-md w-full shadow-neon">
            <div className="h-20 w-20 bg-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl border border-white/5">
                🏠
            </div>
            <h1 className="text-3xl font-heading font-bold text-white mb-4">
                {t('welcome')}
            </h1>
            <p className="text-muted-foreground">
                {t('wip')}
            </p>
        </div>
    </div>
  );
}