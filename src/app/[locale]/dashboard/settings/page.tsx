"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { 
  User, Bell, Crown, Check, Globe, ChevronRight 
} from "lucide-react";

export default function SettingsPage() {
  const t = useTranslations('Settings');
  
  // MOCK STATE
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className="pb-24 space-y-8 animate-fade-in">
      
      {/* HEADER */}
      <header className="px-1">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">
          {t('title')}
        </h1>
        <p className="text-zinc-400 text-sm">
          {t('subtitle')}
        </p>
      </header>

      {/* 1. SECTION PREMIUM (CleanHabits+) */}
      <section className="relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 p-6 group">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Crown size={120} className="text-yellow-500 rotate-12" />
          </div>

          <div className="relative z-10">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-lg uppercase tracking-wider ${isPremium ? 'bg-green-500 text-black' : 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black'}`}>
                      {isPremium ? t('plan_active') : t('plan_upgrade')}
                  </span>
              </div>
              
              <h2 className="text-2xl font-heading font-bold text-white mb-4">
                  CleanHabits<span className="text-yellow-400">+</span>
              </h2>

              {/* Benefits List */}
              <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                      <Check size={16} className="text-yellow-400" /> {t('benefit_analytics')}
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                      <Check size={16} className="text-yellow-400" /> {t('benefit_automation')}
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-300">
                      <Check size={16} className="text-yellow-400" /> {t('benefit_skips')}
                  </li>
              </ul>

              {/* CTA Button */}
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm hover:scale-[1.02] transition-transform shadow-neon">
                  {isPremium ? t('btn_manage_sub') : t('btn_get_premium')}
              </button>
          </div>
      </section>

      {/* 2. PREFERENCES GENERALES */}
      <section className="space-y-3">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider px-1">
              {t('section_app')}
          </h3>
          <div className="space-y-2">
              {/* Notifications */}
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-800 transition-colors group">
                  <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                          <Bell size={18} />
                      </div>
                      <span className="font-medium text-zinc-300">{t('menu_notifications')}</span>
                  </div>
                  <ChevronRight size={18} className="text-zinc-600 group-hover:text-white" />
              </button>
              
              {/* Language */}
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-800 transition-colors group">
                  <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                          <Globe size={18} />
                      </div>
                      <span className="font-medium text-zinc-300">{t('menu_language')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-white/5">FR</span>
                    <ChevronRight size={18} className="text-zinc-600 group-hover:text-white" />
                  </div>
              </button>

              {/* Account */}
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-800 transition-colors group">
                  <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                          <User size={18} />
                      </div>
                      <span className="font-medium text-zinc-300">{t('menu_account')}</span>
                  </div>
                  <ChevronRight size={18} className="text-zinc-600 group-hover:text-white" />
              </button>
          </div>
      </section>

      {/* FOOTER INFO */}
      <div className="text-center pt-8">
          <p className="text-[10px] text-zinc-600 font-mono">ChainHabits v0.1.0 (Sepolia)</p>
          <p className="text-[10px] text-zinc-600">Built with ❤️ for Web3</p>
      </div>

    </div>
  );
}