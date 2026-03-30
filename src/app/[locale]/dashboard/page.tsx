"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Flame, Check, Plus, Droplets, Zap, BookOpen, Dumbbell, Layers } from "lucide-react";

type HabitType = 'daily' | 'weekly';
type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Habit {
  id: string;
  title: string;
  type: HabitType;
  totalXp: number; 
  linkedChallengesCount: number; 
  icon: any;
  completed?: boolean;
  weeklyProgress?: number;
  weeklyTarget?: number;
}

export default function DashboardPage() {
  const t = useTranslations('Dashboard');

  // --- CORRECTION 1 : Données initiales à ZÉRO pour voir la progression ---
  const [habits, setHabits] = useState<Habit[]>([
    { 
      id: '1', title: 'Drink 2L Water', type: 'daily', totalXp: 5, linkedChallengesCount: 1,
      icon: Droplets, completed: false // <-- Était false
    },
    { 
      id: '2', title: 'Deep Work 1h', type: 'daily', totalXp: 15, linkedChallengesCount: 2,
      icon: Zap, completed: false // <-- CORRIGÉ : Était true, remis à false
    },
    { 
      id: '3', title: 'Running', type: 'weekly', totalXp: 20, linkedChallengesCount: 1,
      icon: Dumbbell, weeklyProgress: 0, weeklyTarget: 3 // <-- CORRIGÉ : Progress remis à 0
    },
    { 
      id: '4', title: 'Read 10 pages', type: 'daily', totalXp: 5, linkedChallengesCount: 1,
      icon: BookOpen, completed: false 
    },
  ]);

  // --- LOGIQUE DE SCORE ---
  const dailyTargetScore = habits
    .filter(h => h.type === 'daily')
    .reduce((acc, h) => acc + h.totalXp, 0);
  
  const currentScore = habits.reduce((acc, h) => {
    if (h.type === 'daily' && h.completed) return acc + h.totalXp;
    if (h.type === 'weekly') {
        // Logique simplifiée : Pro-rata des points
        return acc + (h.weeklyProgress! > 0 ? Math.round((h.weeklyProgress! / h.weeklyTarget!) * h.totalXp) : 0);
    }
    return acc;
  }, 0);

  // Pourcentage capé à 100 pour l'affichage du cercle (mais le score peut dépasser)
  const progressPercentage = Math.min(Math.round((currentScore / dailyTargetScore) * 100), 100);

  // --- ACTIONS ---
  const toggleDaily = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const incrementWeekly = (id: string) => {
    setHabits(habits.map(h => {
      if (h.id === id && h.weeklyProgress! < h.weeklyTarget!) {
        return { ...h, weeklyProgress: h.weeklyProgress! + 1 };
      }
      return h;
    }));
  };

  const getDifficultyColor = (d: Difficulty) => {
    switch(d) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hard': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    }
  };

  return (
    <div className="pb-24 space-y-8">
        
        {/* HEADER */}
        <header className="flex justify-between items-end px-1">
            <div>
                <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-1">
                    {t('subtitle')}
                </p>
                <h1 className="text-3xl font-heading font-bold text-white">
                    {t('title')}
                </h1>
            </div>
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
                    <Flame size={18} className="text-orange-500 fill-orange-500 animate-pulse" />
                    <span className="text-orange-500 font-bold font-mono">12</span>
                </div>
                <span className="text-[10px] text-zinc-500 mt-1 mr-1">{t('streak_label')}</span>
            </div>
        </header>

        {/* PROGRESS RING CARD */}
        <section className="relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/5 p-6 shadow-neon">
            <div className="flex items-center gap-6">
                <div className="relative h-24 w-24 shrink-0">
                    {/* CORRECTION ICI : J'ai retiré "-rotate-90" de la className */}
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                        {/* Fond */}
                        <path className="text-zinc-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                        {/* Barre Active */}
                        <path 
                            className="text-primary transition-all duration-1000 ease-out" 
                            strokeDasharray={`${progressPercentage}, 100`} 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                            fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" 
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xl font-bold text-white">{progressPercentage}%</span>
                    </div>
                </div>

                <div className="flex-1">
                    <h2 className="text-lg font-bold text-white mb-1">{t('score_label')} (XP)</h2>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-heading font-bold text-primary">{currentScore}</span>
                        <span className="text-zinc-500">/ {dailyTargetScore} daily pts</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-2">
                        {t.rich('score_desc', {
                            count: 3,
                            bold: (chunks) => <strong className="text-white font-bold">{chunks}</strong>
                        })}
                    </p>
                </div>
            </div>
        </section>

        {/* ROUTINES (Daily) */}
        <section className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider ml-1">Routines (Daily)</h3>
            {habits.filter(h => h.type === 'daily').map((habit) => (
                <div 
                    key={habit.id} 
                    onClick={() => toggleDaily(habit.id)}
                    className={`group relative overflow-hidden p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                        habit.completed 
                            ? 'bg-zinc-900/30 border-zinc-800 opacity-60' 
                            : 'glass border-white/10 hover:border-primary/30'
                    }`}
                >
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-white bg-zinc-800 border border-white/5`}>
                                <habit.icon size={20} />
                            </div>
                            <div>
                                <h3 className={`font-medium transition-colors ${habit.completed ? 'text-zinc-500 line-through' : 'text-white'}`}>
                                    {habit.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    {habit.linkedChallengesCount > 1 && (
                                        <span className="flex items-center gap-1 text-[9px] bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/20">
                                            <Layers size={10} />
                                            x{habit.linkedChallengesCount}
                                        </span>
                                    )}
                                    <span className="text-[10px] text-primary font-bold">
                                        +{habit.totalXp} XP
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={`h-6 w-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                            habit.completed 
                                ? 'bg-green-500 border-green-500 text-black scale-110' 
                                : 'bg-transparent border-zinc-600 text-transparent'
                        }`}>
                            <Check size={14} strokeWidth={4} />
                        </div>
                    </div>
                </div>
            ))}
        </section>

        {/* OBJECTIFS (Weekly) */}
        <section className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider ml-1 mt-6">Objectifs (Weekly)</h3>
            {habits.filter(h => h.type === 'weekly').map((habit) => (
                <div 
                    key={habit.id} 
                    className="group relative overflow-hidden p-4 rounded-2xl border glass border-white/10"
                >
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-white bg-zinc-800 border border-white/5`}>
                                <habit.icon size={20} />
                            </div>
                            <div>
                                <h3 className="font-medium text-white">{habit.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-zinc-400">
                                        Hebdo • +{Math.round(habit.totalXp / habit.weeklyTarget!)} XP/action
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-zinc-300">
                                {habit.weeklyProgress} / {habit.weeklyTarget}
                            </span>
                            <button 
                                onClick={() => incrementWeekly(habit.id)}
                                disabled={habit.weeklyProgress === habit.weeklyTarget}
                                className="h-8 w-8 rounded-lg bg-zinc-800 border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all disabled:opacity-50"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="mt-3 h-1 w-full bg-zinc-800/50 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${(habit.weeklyProgress! / habit.weeklyTarget!) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </section>

    </div>
  );
}