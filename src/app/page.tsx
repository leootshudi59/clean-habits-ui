"use client";

import { useWeb3Auth } from "@/context/Web3AuthContext";
import { Trophy, Wallet, Zap, ArrowRight, Activity } from "lucide-react";

export default function Home() {
  const { login, loggedIn, userInfo } = useWeb3Auth();

  return (
    // CONTENEUR PRINCIPAL : Prend toute la largeur et hauteur
    // 'relative' et 'overflow-hidden' pour contenir les effets de lumière
    <main className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden selection:bg-primary selection:text-white">
      
      {/* --- BACKGROUND FX (Lueurs d'ambiance) --- */}
      {/* Une grande lueur violette au centre/haut */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      {/* Une lueur secondaire en bas à droite */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* --- CONTENU --- */}
      <div className="container mx-auto px-4 z-10 flex flex-col items-center gap-12">
        
        {/* 1. SECTION HERO (Le Titre "Page de Garde") */}
        <div className="text-center space-y-6 max-w-3xl">
          {/* Petit badge au-dessus du titre */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-white/10 text-xs font-medium text-primary mb-4 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live on Sepolia Testnet
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight text-white leading-tight animate-slide-up">
            Track Habits. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-pulse-slow">
              Win Crypto.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-slide-up [animation-delay:100ms]">
            Rejoins des challenges de groupe, mise sur ta réussite et gagne le pot commun si tu tiens tes habitudes.
          </p>
        </div>

        {/* 2. SECTION ACTION (Bouton ou Dashboard) */}
        <div className="w-full max-w-md animate-slide-up [animation-delay:200ms]">
          {!loggedIn ? (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => login()}
                className="group relative w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-heading font-bold text-lg shadow-neon transition-all hover:scale-105 flex items-center justify-center gap-3"
              >
                <Wallet size={20} />
                Connecter mon Wallet
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-muted-foreground">
                Powered by Web3Auth • No gas fees to start
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
                  Salut, {userInfo?.name || "Habitant"} !
                </h2>
                <p className="text-sm text-green-400 font-mono mt-1 flex justify-center items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  Wallet Connected
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-zinc-900/50 p-3 rounded-lg border border-white/5">
                  <p className="text-xs text-muted-foreground">Challenges</p>
                  <p className="text-xl font-bold text-white">0</p>
                </div>
                <div className="bg-zinc-900/50 p-3 rounded-lg border border-white/5">
                  <p className="text-xs text-muted-foreground">Score</p>
                  <p className="text-xl font-bold text-primary">0 XP</p>
                </div>
              </div>

              <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-xl text-white font-medium transition-colors">
                Entrer dans l'App
              </button>
            </div>
          )}
        </div>

        {/* 3. SECTION TEASER (Grid qui prend la largeur) */}
        {/* Cette section s'affiche en bas pour donner un aperçu */}
        <div className="w-full max-w-5xl mt-8 animate-slide-up [animation-delay:300ms]">
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-white font-heading font-bold text-xl flex items-center gap-2">
              <Activity className="text-primary" size={20}/> 
              Challenges Actifs
            </h3>
            <span className="text-sm text-muted-foreground">Live stats</span>
          </div>

          {/* GRID : 1 colonne sur mobile, 3 colonnes sur desktop -> C'est ça qui fait "Full Width" */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Carte 1 */}
            <div className="glass p-5 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-xl">🏃‍♂️</div>
                <span className="bg-green-500/10 text-green-400 text-xs font-bold px-2 py-1 rounded">Active</span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">Habitants Genesis</h4>
              <p className="text-sm text-muted-foreground mt-1">Le challenge original. 30 jours de focus total.</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-white font-bold">5,000 HABIT</span> Pot
              </div>
            </div>

            {/* Carte 2 */}
            <div className="glass p-5 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-xl">🧠</div>
                <span className="bg-blue-500/10 text-blue-400 text-xs font-bold px-2 py-1 rounded">Upcoming</span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">Deep Work Club</h4>
              <p className="text-sm text-muted-foreground mt-1">4h de code sans distraction par jour.</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-white font-bold">2,400 USDC</span> Pot
              </div>
            </div>

            {/* Carte 3 */}
            <div className="glass p-5 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center text-xl">💧</div>
                <span className="bg-purple-500/10 text-purple-400 text-xs font-bold px-2 py-1 rounded">Easy</span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">Hydration Heroes</h4>
              <p className="text-sm text-muted-foreground mt-1">Boire 2L d'eau. Simple et efficace.</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-white font-bold">500 MATIC</span> Pot
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}