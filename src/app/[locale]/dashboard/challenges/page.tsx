"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, Trophy, Users, Timer, TrendingUp, Plus, ArrowRight, ShieldCheck, Flame, Lock } from "lucide-react";

type Tab = 'mine' | 'explore';

export default function ChallengesPage() {
  const t = useTranslations('Challenges');
  const [activeTab, setActiveTab] = useState<Tab>('mine');

  // --- MOCK DATA : MES CHALLENGES ---
  const myChallenges = [
    {
      id: 1,
      title: "Deep Work Protocol",
      status: "active",
      daysLeft: 12,
      stake: 50,
      pot: 5420,
      participants: 145,
      performance: "Tier A (Top 10%)",
      perfColor: "text-green-400",
      image: "from-violet-600/20 to-indigo-900/40",
      icon: <TrendingUp size={24} className="text-violet-400" />
    },
    {
      id: 2,
      title: "Morning Routine",
      status: "active",
      daysLeft: 5,
      stake: 20,
      pot: 1200,
      participants: 89,
      performance: "Tier B (Safe)",
      perfColor: "text-blue-400",
      image: "from-blue-600/20 to-cyan-900/40",
      icon: <ShieldCheck size={24} className="text-blue-400" />
    },
    // NOUVEAU CHALLENGE : AMIS
    {
      id: 5,
      title: "Friends",
      status: "active",
      daysLeft: 24,
      stake: 30,
      pot: 190, // 8 participants, mais pot < 240 car certains n'ont pas misé
      participants: 8,
      performance: "Tier A (Leader)",
      perfColor: "text-green-400",
      image: "from-pink-600/20 to-rose-900/40",
      icon: <Users size={24} className="text-pink-400" />
    }
  ];

  // --- MOCK DATA : EXPLORE ---
  const exploreChallenges = [
    {
      id: 3,
      title: "Marathon Prep",
      description: "Prépare ton corps. 3 runs par semaine. Pas d'excuses.",
      stake: 100,
      pot: 15800,
      participants: 342,
      difficulty: "Hard",
      tags: ["Sport", "Outdoor"],
      image: "bg-orange-500/10"
    },
    {
      id: 4,
      title: "No Sugar Challenge",
      description: "30 jours sans sucre ajouté. Détox totale.",
      stake: 10,
      pot: 4500,
      participants: 890,
      difficulty: "Easy",
      tags: ["Health", "Food"],
      image: "bg-green-500/10"
    }
  ];

  return (
    <div className="pb-24 space-y-6">
      
      {/* 1. HEADER & ACTIONS */}
      <header className="flex items-center justify-between px-1">
        <h1 className="text-3xl font-heading font-bold text-white">
          Challenges
        </h1>
        <button className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 transition-colors">
            <Plus size={20} />
        </button>
      </header>

      {/* 2. TABS SWITCHER */}
      <div className="p-1 rounded-xl bg-zinc-900/50 border border-white/5 flex relative">
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-zinc-800 shadow-sm transition-all duration-300 ${activeTab === 'mine' ? 'left-1' : 'left-[calc(50%+4px)]'}`} 
          />
          
          <button 
            onClick={() => setActiveTab('mine')}
            className={`flex-1 relative z-10 py-2.5 text-sm font-bold text-center transition-colors ${activeTab === 'mine' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {t('tab_mine')}
          </button>
          <button 
            onClick={() => setActiveTab('explore')}
            className={`flex-1 relative z-10 py-2.5 text-sm font-bold text-center transition-colors ${activeTab === 'explore' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {t('tab_explore')}
          </button>
      </div>

      {/* 3. CONTENU : MINE */}
      {activeTab === 'mine' && (
          <div className="space-y-4 animate-fade-in">
             <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">{t('section_active')}</h2>
                <span className="text-xs text-primary font-mono bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                    ${myChallenges.reduce((acc, c) => acc + c.stake, 0)} Staked
                </span>
             </div>

             {myChallenges.map((challenge) => (
                 <div key={challenge.id} className="relative overflow-hidden rounded-2xl border border-white/10 group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${challenge.image} opacity-50`} />
                    
                    <div className="relative z-10 p-5 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                                <div className="h-10 w-10 rounded-lg bg-zinc-900/80 backdrop-blur flex items-center justify-center border border-white/5 shadow-lg">
                                    {challenge.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg leading-tight">{challenge.title}</h3>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-zinc-300">
                                        <Timer size={12} />
                                        <span>{t('days_left', { count: challenge.daysLeft })}</span>
                                    </div>
                                </div>
                            </div>
                            <span className="bg-zinc-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                                #{challenge.id}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="bg-zinc-900/40 rounded-lg p-2 border border-white/5">
                                <p className="text-[10px] text-zinc-500 uppercase">{t('your_stake')}</p>
                                <p className="text-lg font-heading font-bold text-white">${challenge.stake}</p>
                            </div>
                            <div className="bg-zinc-900/40 rounded-lg p-2 border border-white/5">
                                <p className="text-[10px] text-zinc-500 uppercase">{t('pot_total')}</p>
                                <p className="text-lg font-heading font-bold text-primary">${challenge.pot.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span className={`text-xs font-bold ${challenge.perfColor}`}>
                                    {challenge.performance}
                                </span>
                            </div>
                            <button className="text-xs font-bold text-white flex items-center gap-1 hover:gap-2 transition-all">
                                {t('btn_details')} <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>
                 </div>
             ))}

             <div className="pt-4 opacity-60">
                <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3 px-1">{t('section_finished')}</h2>
                <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/20 flex items-center gap-4 grayscale">
                     <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500">
                        <Trophy size={18} />
                     </div>
                     <div>
                        <h3 className="font-bold text-zinc-400">Dry January</h3>
                        <p className="text-xs text-zinc-600">Won $120 • Jan 2024</p>
                     </div>
                </div>
             </div>
          </div>
      )}

      {/* 4. CONTENU : EXPLORE */}
      {activeTab === 'explore' && (
          <div className="space-y-6 animate-slide-up">
              {/* Search Bar */}
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input 
                    type="text" 
                    placeholder={t('search_placeholder')} 
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
              </div>

              {/* Featured Card */}
              <div className="relative overflow-hidden rounded-2xl border border-primary/30 group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900 opacity-80" />
                  <div className="absolute top-0 right-0 p-3">
                      <span className="flex items-center gap-1 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-neon">
                          <Flame size={12} /> {t('featured_badge')}
                      </span>
                  </div>
                  
                  <div className="relative z-10 p-6 space-y-3 text-center">
                      <div className="h-16 w-16 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md mb-2">
                          <Trophy size={32} className="text-yellow-400" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-white">Legendary Habitants</h3>
                      
                      <p className="text-sm text-zinc-300 line-clamp-2">
                          {t('featured_desc')}
                      </p>

                      <div className="flex justify-center gap-4 text-xs font-mono text-primary pt-2">
                         <span>Pool: $250,000</span>
                         <span>•</span>
                         <span>Entries: 1.2k</span>
                      </div>
                  </div>
              </div>

              {/* List */}
              <div className="space-y-3">
                  {exploreChallenges.map((c) => (
                      <div key={c.id} className="glass p-4 rounded-xl flex items-center gap-4 hover:border-primary/40 transition-colors cursor-pointer group">
                          <div className={`h-12 w-12 rounded-lg ${c.image} flex items-center justify-center border border-white/5`}>
                              <Lock size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-white truncate">{c.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">{c.difficulty}</span>
                                  <span className="text-[10px] text-zinc-500">{t('participants', {count: c.participants})}</span>
                              </div>
                          </div>
                          <div className="text-right">
                              <div className="text-sm font-bold text-primary">${c.stake}</div>
                              <div className="text-[10px] text-zinc-500 uppercase">{t('min_stake')}</div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
}