"use client";

import { useTranslations } from "next-intl";
import { useWeb3Auth } from "@/context/Web3AuthContext";
import { useRouter } from "@/i18n/routing";
import { LogOut, Settings, ExternalLink, Trophy, Flame, Target, Wallet, ChevronRight, Activity, Shield } from "lucide-react";

export default function ProfilePage() {
  const t = useTranslations('Profile');
  const { userInfo, logout } = useWeb3Auth();
  const router = useRouter();

  // MOCK DATA (En attendant le backend)
  const mockStats = {
    level: 5,
    xp: 750,
    xpMax: 1000,
    earnings: 1250.50,
    bestStreak: 24,
    challengesWon: 4,
    completionRate: 92
  };

  const mockTrophies = [
    { id: 1, name: "Early Bird", icon: "🌅", color: "text-orange-400", bg: "bg-orange-400/10" },
    { id: 2, name: "Non-Stop", icon: "🔥", color: "text-red-400", bg: "bg-red-400/10" },
    { id: 3, name: "Wealthy", icon: "💎", color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { id: 4, name: "Genesis", icon: "🚀", color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="pb-8 space-y-8">
      
      {/* 1. HEADER PROFIL & XP */}
      <section className="flex flex-col items-center pt-4 relative">
        {/* Avatar avec cercle de niveau */}
        <div className="relative mb-4 group">
            <div className="h-28 w-28 rounded-full bg-zinc-800 border-4 border-zinc-900 flex items-center justify-center text-4xl shadow-xl z-10 relative overflow-hidden">
                {/* Image mockée ou lettre */}
                <span className="font-heading font-bold text-white">
                  {userInfo?.name?.charAt(0).toUpperCase() || "U"}
                </span>
            </div>
            {/* Cercle décoratif (Glow) */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all duration-500" />
            
            {/* Badge Niveau (Absolute en bas) */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-zinc-900 border border-primary/30 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-20">
                <Shield size={12} className="text-primary fill-primary" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('level', { lvl: mockStats.level })}
                </span>
            </div>
        </div>

        {/* Nom & Adresse */}
        <h1 className="text-2xl font-heading font-bold text-white mt-2">
            {userInfo?.name || "Anonymous Habitant"}
        </h1>
        <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-full bg-zinc-800/50 border border-white/5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-zinc-400">0x71C...9A23</span>
        </div>

        {/* Barre XP */}
        <div className="w-full max-w-xs mt-6 space-y-2">
            <div className="flex justify-between text-xs font-medium text-zinc-400">
                <span>XP</span>
                <span>{t('xp_next', { current: mockStats.xp, max: mockStats.xpMax })}</span>
            </div>
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                    style={{ width: `${(mockStats.xp / mockStats.xpMax) * 100}%` }} 
                />
            </div>
        </div>
      </section>

      {/* 2. WALLET CARD */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 p-6 shadow-neon group">
         {/* Fond animé */}
         <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-[60px] group-hover:bg-primary/30 transition-all duration-500" />
         
         <div className="relative z-10 flex justify-between items-start mb-8">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-white">
                <Wallet size={24} />
            </div>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                Sepolia
            </span>
         </div>

         <div className="relative z-10">
            <p className="text-sm text-zinc-400 mb-1">{t('total_earnings')}</p>
            <h2 className="text-4xl font-heading font-bold text-white tracking-tight">
                ${mockStats.earnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
            
            <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors">
                {t('withdraw_btn')}
                <ExternalLink size={16} />
            </button>
         </div>
      </section>

      {/* 3. STATS GRID */}
      <section className="grid grid-cols-3 gap-3">
          <div className="glass p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center">
              <Flame size={20} className="text-orange-500" />
              <div>
                  <div className="text-xl font-bold text-white">{mockStats.bestStreak}</div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wide">{t('stat_streak')}</div>
              </div>
          </div>
          <div className="glass p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center">
              <Trophy size={20} className="text-yellow-500" />
              <div>
                  <div className="text-xl font-bold text-white">{mockStats.challengesWon}</div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wide">{t('stat_challenges')}</div>
              </div>
          </div>
          <div className="glass p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center">
              <Target size={20} className="text-green-500" />
              <div>
                  <div className="text-xl font-bold text-white">{mockStats.completionRate}%</div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wide">{t('stat_rate')}</div>
              </div>
          </div>
      </section>

      {/* 4. TROPHIES SCROLL */}
      <section>
          <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-heading font-bold text-white text-lg flex items-center gap-2">
                  <Trophy size={18} className="text-purple-400" />
                  {t('trophies_title')}
              </h3>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
              {mockTrophies.map((trophy) => (
                  <div key={trophy.id} className="snap-center shrink-0 w-24 h-32 glass rounded-xl flex flex-col items-center justify-center gap-2 border border-white/5 hover:border-primary/50 transition-colors cursor-pointer">
                      <div className={`text-3xl p-3 rounded-full ${trophy.bg}`}>
                          {trophy.icon}
                      </div>
                      <span className={`text-xs font-bold ${trophy.color}`}>
                          {trophy.name}
                      </span>
                  </div>
              ))}
              {/* Slot vide pour teaser */}
              <div className="snap-center shrink-0 w-24 h-32 rounded-xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center gap-2 opacity-50">
                  <div className="text-2xl text-zinc-700">?</div>
              </div>
          </div>
      </section>

      {/* 5. MENU SETTINGS */}
      <section className="space-y-2">
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-800 transition-colors group">
             <div className="flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                     <Activity size={18} />
                 </div>
                 <span className="font-medium text-zinc-300">{t('menu_integrations')}</span>
             </div>
             <ChevronRight size={18} className="text-zinc-600 group-hover:text-white" />
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-800 transition-colors group">
             <div className="flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                     <Settings size={18} />
                 </div>
                 <span className="font-medium text-zinc-300">{t('menu_settings')}</span>
             </div>
             <ChevronRight size={18} className="text-zinc-600 group-hover:text-white" />
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-800 transition-colors group">
             <div className="flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                     <Shield size={18} />
                 </div>
                 <span className="font-medium text-zinc-300">{t('menu_help')}</span>
             </div>
             <ChevronRight size={18} className="text-zinc-600 group-hover:text-white" />
          </button>
      </section>

      {/* 6. LOGOUT */}
      <button 
        onClick={handleLogout}
        className="w-full py-4 text-red-500 font-medium text-sm hover:bg-red-500/5 rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        <LogOut size={16} />
        {t('logout')}
      </button>

    </div>
  );
}