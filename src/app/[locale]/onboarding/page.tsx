"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowRight, User, Check, Target, Trophy, ShieldCheck, Coins, Activity } from "lucide-react";

// Définition des étapes
enum Step {
  PROFILE = 0,
  GOALS = 1,
  TUTO_1 = 2,
  TUTO_2 = 3,
  TUTO_3 = 4,
}

export default function OnboardingPage() {
  const t = useTranslations('Onboarding');
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(Step.PROFILE);

  // État local pour le formulaire
  const [username, setUsername] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  
  // Navigation
  const nextStep = () => {
    if (currentStep === Step.TUTO_3) {
      router.push('/dashboard');
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const skipStep = () => {
    // Si on skip le profil, on met un nom par défaut ? Ou on passe juste.
    // Pour le tuto, skip = aller direct au dashboard
    if (currentStep >= Step.TUTO_1) {
        router.push('/dashboard');
    } else {
        nextStep();
    }
  };

  // --- RENDU DES COMPOSANTS PAR ÉTAPE ---

  // 1. PROFIL
  const renderProfile = () => (
    <div className="w-full max-w-md space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">{t('step1_title')}</h1>
        <p className="text-muted-foreground">{t('step1_desc')}</p>
      </div>

      <div className="space-y-6">
        {/* Avatar Placeholder */}
        <div className="flex flex-col items-center gap-3">
            <div className="h-24 w-24 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 flex items-center justify-center cursor-pointer hover:border-primary transition-colors group">
                <User size={32} className="text-zinc-500 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-xs text-primary font-medium cursor-pointer">{t('avatar_label')}</span>
        </div>

        {/* Input Username */}
        <div className="space-y-2">
            <label className="text-sm font-medium text-white ml-1">{t('username_label')}</label>
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('username_placeholder')}
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
        </div>
      </div>
    </div>
  );

  // 2. OBJECTIFS
  const renderGoals = () => {
    const goals = ['goal_1', 'goal_2', 'goal_3', 'goal_4', 'goal_5'];
    
    const toggleGoal = (goal: string) => {
        if (selectedGoals.includes(goal)) {
            setSelectedGoals(selectedGoals.filter(g => g !== goal));
        } else {
            setSelectedGoals([...selectedGoals, goal]);
        }
    };

    return (
        <div className="w-full max-w-md space-y-8 animate-slide-up">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">{t('step2_title')}</h1>
            <p className="text-muted-foreground">{t('step2_desc')}</p>
          </div>
    
          <div className="grid gap-3">
            {goals.map((goalKey) => {
                const isSelected = selectedGoals.includes(goalKey);
                return (
                    <div 
                        key={goalKey}
                        onClick={() => toggleGoal(goalKey)}
                        className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            isSelected 
                                ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_-5px_rgba(124,58,237,0.5)]' 
                                : 'bg-zinc-900/40 border-white/10 text-zinc-400 hover:bg-zinc-800'
                        }`}
                    >
                        <span className="font-medium">{t(goalKey)}</span>
                        {isSelected && <Check size={20} className="text-primary" />}
                    </div>
                )
            })}
          </div>
        </div>
    );
  };

  // 3. TUTORIEL (Générique)
  const renderTutorial = (stepIndex: number, icon: React.ReactNode, titleKey: string, descKey: string) => (
    <div className="w-full max-w-md text-center space-y-8 animate-slide-up">
        <div className="h-40 w-40 mx-auto rounded-full bg-gradient-to-tr from-zinc-800 to-black border border-white/10 flex items-center justify-center shadow-neon mb-8">
            {icon}
        </div>
        <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-400 font-mono mb-2">
                {stepIndex} / 3
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">{t(titleKey)}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{t(descKey)}</p>
        </div>
    </div>
  );

  return (
    <main className="h-[100dvh] bg-background flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Light background FX */}
      <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900">
        <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${((currentStep + 1) / 5) * 100}%` }} 
        />
      </div>

      {/* Header vide ou bouton retour (optionnel) */}
      <div className="w-full h-10"></div>


      <div className="flex-1 flex flex-col justify-center items-center w-full">
        {currentStep === Step.PROFILE && renderProfile()}
        {currentStep === Step.GOALS && renderGoals()}
        {currentStep === Step.TUTO_1 && renderTutorial(1, <ShieldCheck size={64} className="text-rose-400" />, 'tuto1_title', 'tuto1_desc')}
        {currentStep === Step.TUTO_2 && renderTutorial(2, <Activity size={64} className="text-cyan-400" />, 'tuto2_title', 'tuto2_desc')}
        {currentStep === Step.TUTO_3 && renderTutorial(3, <Coins size={64} className="text-purple-400" />, 'tuto3_title', 'tuto3_desc')}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="w-full max-w-md space-y-4 mt-16 md:mt-24">
        <button
            onClick={nextStep}
            disabled={currentStep === Step.PROFILE && username.trim() === ""}
            className="w-full bg-primary hover:bg-primary-btnhover disabled:opacity-50 disabled:cursor-not-allowed text-white font-heading font-bold py-4 rounded-xl shadow-neon transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
            {currentStep === Step.TUTO_3 ? t('finish_btn') : t('next_btn')}
            <ArrowRight size={20} />
        </button>

        {/* Button Skip (Except for the step 0 where username is required, here we allow skipping except for username) */}
        {currentStep !== Step.PROFILE && (
             <button
                onClick={skipStep}
                className="w-full text-zinc-500 hover:text-white text-sm font-medium transition-colors"
            >
                {t('skip_btn')}
            </button>
        )}
        {/* For the profile step, we can also allow passing if the avatar is optional but username is required */}
        {currentStep === Step.PROFILE && username.trim() === "" && (
             <p className="text-center text-xs text-zinc-600">
                {t('skip_profile_required_username')}
             </p>
        )}
      </div>
    </main>
  );
}