"use client";

import { useTranslations } from "next-intl";
import { useWeb3Auth } from "@/context/Web3AuthContext";
import { useRouter } from "@/i18n/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Trophy, Wallet, ArrowRight, Activity, Coins, Target } from "lucide-react";

export default function Home() {
  const { login, loggedIn, userInfo } = useWeb3Auth();
  const router = useRouter();
  const t = useTranslations('Hero'); 
  const tConcept = useTranslations('Concept');
  
  // Temporairy function for dev
  const handleStartDev = () => {
    router.push('/onboarding');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden selection:bg-primary selection:text-white">
      <div className="absolute top-6 right-2 md:right-6 z-50">
        <LanguageSwitcher />
      </div>

      {/* --- BACKGROUND FX (Ambiance) --- */}
      {/* A large violet glow in the center/top */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      {/* A secondary glow at the bottom right */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* --- CONTENU --- */}
      <div className="container mx-auto px-4 z-10 flex flex-col items-center gap-12 md:gap-16">
        
        {/* 1. SECTION HERO (The Title "Home Page") */}
        <div className="text-center max-w-3xl">
          {/* Small badge above the title */}
          <div className="inline-flex items-center gap-2 mt-1 md:mt-2 px-2 md:px-3 py-1 rounded-full bg-zinc-800/50 border border-white/10 text-xxs md:text-xs font-medium text-primary mb-16 md:mb-24 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t('badge')}
          </div>

          <h1 className="text-5xl md:text-7xl mb-4 md:mb-8 font-bold font-heading tracking-tight text-white leading-tight animate-slide-up">
            {t('title_start')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-pulse-slow">
              {t('title_end')}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-slide-up [animation-delay:100ms]">
            {t('subtitle')}
          </p>
        </div>

        {/* 2. SECTION ACTION (Bouton ou Dashboard) */}
        <div className="w-full max-w-md animate-slide-up [animation-delay:200ms]">
          {!loggedIn ? (
            <div className="flex flex-col items-center gap-4">
              <button
                // onClick={() => login()}
                onClick={() => handleStartDev()}
                className="group relative w-full sm:w-auto bg-primary hover:bg-primary-btnhover text-white px-8 py-4 rounded-xl font-heading font-bold text-lg shadow-neon transition-all hover:scale-105 flex items-center justify-center gap-3"
              >
                <Wallet size={20} />
                {t('connect_btn')}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-muted-foreground">
                {t('connect_sub')}
              </p>
            </div>
          ) : (
            // VUE CONNECTÉE : Un mini tableau de bord centré
            <div className="bg-card border border-border p-6 rounded-2xl shadow-neon w-full text-center">
              <div className="mb-4">
                <div className="h-16 w-16 mx-auto bg-zinc-800 rounded-full flex items-center justify-center mb-3 border border-white/10 text-2xl">
                  👻
                </div>
                <h2 className="text-xl font-bold text-white">
                  {t('dashboard_welcome', { name: userInfo?.name || "Habitant" })}
                </h2>
                <p className="text-sm text-green-400 font-mono mt-1 flex justify-center items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  {t('dashboard_status')}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-zinc-900/50 p-3 rounded-lg border border-white/5">
                  <p className="text-xs text-muted-foreground">{t('stats_challenges')}</p>
                  <p className="text-xl font-bold text-white">0</p>
                </div>
                <div className="bg-zinc-900/50 p-3 rounded-lg border border-white/5">
                  <p className="text-xs text-muted-foreground">{t('stats_score')}</p>
                  <p className="text-xl font-bold text-primary">0 XP</p>
                </div>
              </div>

              <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-xl text-white font-medium transition-colors">
                {t('enter_app_btn')}
              </button>
            </div>
          )}
        </div>

        {/* 3. SECTION CONCEPT (Comment ça marche) */}
        <div className="w-full max-w-5xl mt-12 md:mt-16 mb-12 md:mb-16 animate-slide-up [animation-delay:300ms]">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-white font-heading font-bold text-2xl flex items-center gap-2">
              <Target className="text-primary" size={24}/> 
              {tConcept('title')}
            </h3>
            <span className="text-sm text-muted-foreground">{tConcept('subtitle')}</span>
          </div>

          {/* GRID : Les 3 Piliers du projet */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pilier 1 : Commitment Device */}
            <div className="glass p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group cursor-default h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center text-rose-400 border border-white/5 shadow-inner">
                  <Target size={24} />
                </div>
                <span className="bg-rose-500/10 text-rose-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {tConcept('step1_badge')}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {tConcept('step1_title')}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tConcept('step1_desc')}
                <br/>
                <span className="text-zinc-300 italic">{tConcept('step1_quote')}</span>
              </p>
            </div>

            {/* Pilier 2 : Tracking Hybride */}
            <div className="glass p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group cursor-default h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center text-cyan-400 border border-white/5 shadow-inner">
                  <Activity size={24} />
                </div>
                <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {tConcept('step2_badge')}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {tConcept('step2_title')}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tConcept('step2_desc')}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"/> {tConcept('step2_list1')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"/> {tConcept('step2_list2')}
                </li>
              </ul>
            </div>

            {/* Pilier 3 : Tokenomics & Rewards */}
            <div className="glass p-6 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group cursor-default h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center text-purple-400 border border-white/5 shadow-inner">
                  <Trophy size={24} />
                </div>
                <span className="bg-purple-500/10 text-purple-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {tConcept('step3_badge')}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {tConcept('step3_title')}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tConcept('step3_desc')}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-white/5 p-2 rounded">
                  <Coins size={14} className="text-yellow-400"/>
                  {tConcept('step3_reward1')}
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-white/5 p-2 rounded">
                  <Trophy size={14} className="text-purple-400"/>
                  {tConcept('step3_reward2')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}