"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useWeb3Auth } from "@/context/Web3AuthContext";
import { useRouter } from "@/i18n/routing";
import { LogOut, Settings, ExternalLink, Trophy, Flame, Target, Wallet, ChevronRight, Activity, Shield, RefreshCw, Zap, Snowflake, Ticket, ShoppingBag } from "lucide-react";

type Tab = 'overview' | 'shop';

export default function ProfilePage() {
    const t = useTranslations('Profile');
    const { userInfo, logout } = useWeb3Auth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>('overview');

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

    // MOCK DATA SHOP (Basé sur le README)
    const shopItems = [
        {
            id: 'skip',
            title: t('item_skip_title'),
            desc: t('item_skip_desc'),
            icon: <Ticket size={24} className="text-blue-400" />,
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            price: 2.00,
            currency: "USDC",
            owned: 1, // L'utilisateur a son skip gratuit de la semaine
            isFreeWeekly: true, // Logique "1 free skip per week"
            maxPerMonth: 3
        },
        {
            id: 'freeze',
            title: t('item_freeze_title'),
            desc: t('item_freeze_desc'),
            icon: <Snowflake size={24} className="text-cyan-400" />,
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20",
            price: 5.00,
            currency: "USDC",
            owned: 0,
            isFreeWeekly: false,
            maxPerMonth: 0
        },
        {
            id: 'doublexp',
            title: t('item_doublexp_title'),
            desc: t('item_doublexp_desc'),
            icon: <Zap size={24} className="text-yellow-400" />,
            bg: "bg-yellow-500/10",
            border: "border-yellow-500/20",
            price: 3.00,
            currency: "USDC",
            owned: 2,
            isFreeWeekly: false,
            maxPerMonth: 0
        },
        {
            id: 'revival',
            title: t('item_revival_title'),
            desc: t('item_revival_desc'),
            icon: <RefreshCw size={24} className="text-purple-400" />,
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
            price: 15.00, // Cher car puissant (Streak Revival)
            currency: "USDC",
            owned: 0,
            isFreeWeekly: false,
            maxPerMonth: 1
        }
    ];

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <div className="pb-24 space-y-6">

            {/* 1. HEADER PROFIL & XP (Visible tout le temps) */}
            <section className="flex flex-col items-center pt-4 relative animate-fade-in">
                {/* Avatar avec cercle de niveau */}
                <div className="relative mb-4 group">
                    <div className="h-28 w-28 rounded-full bg-zinc-800 border-4 border-zinc-900 flex items-center justify-center text-4xl shadow-xl z-10 relative overflow-hidden">
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

            {/* 2. TAB SWITCHER (Nouveau) */}
            <div className="p-1 rounded-xl bg-zinc-900/50 border border-white/5 flex relative mx-1">
                {/* Background animé du bouton actif */}
                <div
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-zinc-800 shadow-sm transition-all duration-300 ${activeTab === 'overview' ? 'left-1' : 'left-[calc(50%+4px)]'}`}
                />

                <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex-1 relative z-10 py-2 text-sm font-bold text-center transition-colors ${activeTab === 'overview' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    {t('tab_overview')}
                </button>

                <button
                    onClick={() => setActiveTab('shop')}
                    className={`flex-1 relative z-10 py-2 text-sm font-bold text-center transition-colors ${activeTab === 'shop' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                    <span className="flex items-center justify-center gap-2">
                        {t('tab_shop')}
                        {activeTab !== 'shop' && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
                    </span>
                </button>
            </div>

            {/* ========================================================= */}
            {/* 3. CONTENU : OVERVIEW (Ton ancien code, encapsulé)        */}
            {/* ========================================================= */}
            {activeTab === 'overview' && (
                <div className="space-y-8 animate-slide-up">

                    {/* WALLET CARD */}
                    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 p-6 shadow-neon group mx-1">
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

                    {/* STATS GRID */}
                    <section className="grid grid-cols-3 gap-3 mx-1">
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

                    {/* TROPHIES SCROLL */}
                    <section className="mx-1">
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
                            <div className="snap-center shrink-0 w-24 h-32 rounded-xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center gap-2 opacity-50">
                                <div className="text-2xl text-zinc-700">?</div>
                            </div>
                        </div>
                    </section>

                    {/* MENU SETTINGS */}
                    <section className="space-y-2 mx-1">
                        <button className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-800 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                                    <Activity size={18} />
                                </div>
                                <span className="font-medium text-zinc-300">{t('menu_integrations')}</span>
                            </div>
                            <ChevronRight size={18} className="text-zinc-600 group-hover:text-white" />
                        </button>

                        <button onClick={() => router.push('/dashboard/settings')} className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-800 transition-colors group">
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

                    {/* LOGOUT */}
                    <button
                        onClick={handleLogout}
                        className="w-full py-4 text-red-500 font-medium text-sm hover:bg-red-500/5 rounded-xl transition-colors flex items-center justify-center gap-2 mx-1"
                    >
                        <LogOut size={16} />
                        {t('logout')}
                    </button>
                </div>
            )}

            {/* ========================================================= */}
            {/* 4. CONTENU : SHOP (Nouveau, design Glass/Neon)            */}
            {/* ========================================================= */}
            {activeTab === 'shop' && (
                <div className="space-y-6 animate-slide-up mx-1">

                    {/* HEADER BOUTIQUE: SOLDE */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-white/10 shadow-lg">
                        <span className="text-sm text-zinc-400 flex items-center gap-2">
                            <ShoppingBag size={18} className="text-primary" /> {t('shop_balance')}
                        </span>
                        <span className="text-xl font-heading font-bold text-white tracking-tight">
                            ${mockStats.earnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                    </div>

                    {/* GRILLE DES ITEMS */}
                    <div className="grid grid-cols-1 gap-4">
                        {shopItems.map((item) => (
                            <div key={item.id} className={`relative overflow-hidden p-4 rounded-2xl border glass group transition-all hover:border-white/20 ${item.border} ${item.bg}`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        {/* Icone avec fond glass */}
                                        <div className={`h-12 w-12 shrink-0 rounded-xl bg-zinc-900/80 backdrop-blur flex items-center justify-center border border-white/5 shadow-lg`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{item.title}</h3>
                                            <p className="text-xs text-zinc-300 mt-1 leading-relaxed max-w-[210px]">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Prix ou Badge Gratuit */}
                                    <div className="text-right shrink-0 ml-2">
                                        {item.isFreeWeekly && item.owned > 0 ? (
                                            <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase rounded border border-green-500/30 animate-pulse">
                                                {t('lbl_free')}
                                            </span>
                                        ) : (
                                            <span className="block font-mono font-bold text-white">
                                                ${item.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Footer de la carte : Stock et Boutons */}
                                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
                                    <span className="text-xs text-zinc-400 font-medium">
                                        {t('lbl_owned', { count: item.owned })}
                                        {item.maxPerMonth > 0 && <span className="opacity-50 ml-1">/ {item.maxPerMonth} max</span>}
                                    </span>

                                    <div className="flex gap-2">
                                        {/* Bouton Acheter */}
                                        <button
                                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm ${(item.isFreeWeekly && item.owned > 0)
                                                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-transparent'
                                                    : 'bg-white text-black hover:bg-zinc-200'
                                                }`}
                                            disabled={item.isFreeWeekly && item.owned > 0}
                                        >
                                            {t('btn_buy')}
                                        </button>

                                        {/* Bouton Utiliser (Visible si on en possède) */}
                                        {item.owned > 0 && (
                                            <button className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/30 text-xs font-bold hover:bg-primary/20 transition-colors">
                                                {t('btn_use')}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}