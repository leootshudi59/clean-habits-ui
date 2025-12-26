"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { ArrowLeft, Trophy, Users, Clock, Target, ShieldCheck, Wallet, Info, Flame, CheckCircle2, TrendingUp } from "lucide-react";
import { useWeb3Auth } from "@/context/Web3AuthContext";

// --- BASE DE DONNÉES MOCKÉE COMPLÈTE ---
// On regroupe ici tous les challenges (Mine + Explore) pour simuler une DB
const allChallenges = [
  // Challenges "Mine" (Rejoints = true)
  {
    id: 1,
    title: "Deep Work Protocol",
    description: "4 heures de travail profond par jour. Pas de réseaux sociaux. Focus total.",
    image: "from-violet-600/20 to-indigo-900/40",
    stake: 50,
    pot: 5420,
    participants: 145,
    days: 14,
    frequency: "Daily",
    joined: true, // <--- DÉJÀ REJOINT
    participantsList: [{id:1, avatar:"A", color:"bg-purple-500"}, {id:2, avatar:"B", color:"bg-blue-500"}]
  },
  {
    id: 2,
    title: "Morning Routine",
    description: "Réveil 6h00. Eau froide. Méditation. Lance ta journée comme un guerrier.",
    image: "from-blue-600/20 to-cyan-900/40",
    stake: 20,
    pot: 1200,
    participants: 89,
    days: 30,
    frequency: "Daily",
    joined: true, // <--- DÉJÀ REJOINT
    participantsList: [{id:3, avatar:"C", color:"bg-green-500"}, {id:4, avatar:"D", color:"bg-yellow-500"}]
  },
  {
    id: 5,
    title: "Friends",
    description: "Challenge privé entre amis. Le dernier debout gagne tout.",
    image: "from-pink-600/20 to-rose-900/40",
    stake: 30,
    pot: 190,
    participants: 8,
    days: 7,
    frequency: "Daily",
    joined: true, // <--- DÉJÀ REJOINT
    participantsList: [{id:5, avatar:"E", color:"bg-red-500"}]
  },
  // Challenges "Explore" (Non rejoints = false)
  {
    id: 3,
    title: "Marathon Prep",
    description: "Un programme intensif de 30 jours pour préparer ton corps. 3 runs par semaine obligatoires. GPS requis.",
    image: "bg-orange-500/10",
    stake: 100,
    pot: 15800,
    participants: 158,
    days: 30,
    frequency: "3x / semaine",
    joined: false, // <--- PAS ENCORE REJOINT (Bouton visible)
    participantsList: [{id:1, avatar:"X", color:"bg-orange-500"}, {id:2, avatar:"Y", color:"bg-zinc-500"}]
  },
  {
    id: 4,
    title: "No Sugar Challenge",
    description: "30 jours sans sucre ajouté. Détox totale pour ton corps et ton esprit.",
    image: "bg-green-500/10",
    stake: 10,
    pot: 4500,
    participants: 890,
    days: 30,
    frequency: "Daily",
    joined: false, // <--- PAS ENCORE REJOINT (Bouton visible)
    participantsList: [{id:6, avatar:"Z", color:"bg-teal-500"}]
  },
  // Featured (ID 999 dans ChallengesPage)
  {
    id: 999,
    title: "Legendary Habitants",
    description: "Le challenge ultime. 60 jours. 1000$ de mise. Seuls les 1% survivront.",
    image: "bg-gradient-to-r from-purple-900 to-indigo-900",
    stake: 1000,
    pot: 250000,
    participants: 1200,
    days: 60,
    frequency: "Hardcore",
    joined: false, // <--- PAS ENCORE REJOINT (Bouton visible)
    participantsList: [{id:9, avatar:"L", color:"bg-yellow-500"}]
  }
];

export default function ChallengeDetailPage() {
  const t = useTranslations('ChallengeDetail');
  const router = useRouter();
  const params = useParams(); // Hook pour récupérer l'ID
  const { userInfo } = useWeb3Auth();

  // 1. Récupérer le bon challenge
  const challengeId = Number(params.id);
  const challenge = allChallenges.find(c => c.id === challengeId) || allChallenges[3]; // Fallback sur Marathon si introuvable

  const handleJoin = () => {
    alert(`Staking $${challenge.stake}... (Mock)`);
    router.push('/dashboard/challenges');
  };

  return (
    <div className="pb-24 space-y-6 animate-fade-in">
      
      {/* 1. HEADER & NAVIGATION */}
      <header className="px-1 flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
        >
            <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-heading font-bold text-white truncate">
          {challenge.title} {/* Titre dynamique */}
        </h1>
      </header>

      {/* 2. HERO CARD */}
      <section className="relative overflow-hidden rounded-3xl border border-primary/30 bg-zinc-900/60 p-6 shadow-neon group">
          <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${challenge.image} to-transparent`} />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-[60px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <div className="h-20 w-20 rounded-2xl bg-zinc-900/80 backdrop-blur flex items-center justify-center border border-white/10 shadow-xl mb-2">
                  <Trophy size={40} className="text-primary animate-pulse" />
              </div>

              <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">
                      {t('pot_total')}
                  </p>
                  <p className="text-4xl font-heading font-bold text-white tracking-tighter">
                      ${challenge.pot.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                      <Users size={14} className="text-zinc-500" />
                      <span className="text-sm text-zinc-400">
                          {t('participants', { count: challenge.participants })}
                      </span>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. RULES */}
      <section className="space-y-3">
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider px-1 flex items-center gap-2">
              <ShieldCheck size={16} /> {t('rules_title')}
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
              <div className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
                  <Clock size={20} className="text-blue-400" />
                  <div>
                      <span className="block font-bold text-white">{challenge.days} Jours</span>
                      <span className="text-[10px] text-zinc-500 uppercase">Durée</span>
                  </div>
              </div>
              <div className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
                  <Target size={20} className="text-red-400" />
                  <div>
                      <span className="block font-bold text-white">{challenge.frequency}</span>
                      <span className="text-[10px] text-zinc-500 uppercase">Fréquence</span>
                  </div>
              </div>
          </div>

          <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-start gap-3">
                  <Info size={20} className="text-zinc-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-300 leading-relaxed">
                      {challenge.description}
                  </p>
              </div>
          </div>
      </section>

      {/* 4. DISTRIBUTION */}
      <section className="space-y-4">
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider px-1 flex items-center gap-2">
              <TrendingUp size={16} /> {t('distribution_title')}
          </h2>

          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 space-y-6">
              <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                      <span className="text-green-400 flex items-center gap-1">
                          <CheckCircle2 size={12} /> {t('dist_winners')}
                      </span>
                      <span className="text-white">Stake + Bonus 🚀</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-[20%] bg-green-500" />
                  </div>
                  <p className="text-[10px] text-zinc-500">Top 10% des performeurs.</p>
              </div>
              <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                      <span className="text-blue-400 flex items-center gap-1">
                          <ShieldCheck size={12} /> {t('dist_savers')}
                      </span>
                      <span className="text-white">Stake Back 🛡️</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-[10%] bg-blue-500" />
                  </div>
                  <p className="text-[10px] text-zinc-500">Tu récupères tes ${challenge.stake}.</p>
              </div>
              <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                      <span className="text-red-400 flex items-center gap-1">
                          <Flame size={12} /> {t('dist_losers')}
                      </span>
                      <span className="text-white">Slashed 💸</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-[70%] bg-red-500" />
                  </div>
                  <p className="text-[10px] text-zinc-500">Ta mise est redistribuée.</p>
              </div>
          </div>
      </section>

      {/* 5. PARTICIPANTS */}
      <section className="space-y-3">
           <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">
                  {t('social_title')}
              </h2>
              <button className="text-xs text-primary font-bold hover:underline">
                  {t('social_view_all')}
              </button>
           </div>
           
           <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
               {challenge.participantsList.map((p) => (
                   <div key={p.id} className="shrink-0 flex flex-col items-center gap-1">
                       <div className={`h-12 w-12 rounded-full ${p.color} flex items-center justify-center text-white font-bold border-2 border-zinc-900 shadow-lg`}>
                           {p.avatar}
                       </div>
                   </div>
               ))}
               <div className="shrink-0 h-12 w-12 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-700 flex items-center justify-center text-zinc-500 text-xs font-bold">
                   +{challenge.participants - challenge.participantsList.length}
               </div>
           </div>
      </section>

      {/* 6. STICKY FOOTER CTA (Seulement si pas rejoint) */}
      {!challenge.joined && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-50">
            <div className="max-w-md mx-auto flex flex-col gap-2">
                <div className="flex justify-between text-xs px-1">
                    <span className="text-zinc-400">{t('entry_stake')}</span>
                    <span className="text-white font-mono flex items-center gap-1">
                        <Wallet size={12} /> {t('wallet_balance', { amount: 1250 })}
                    </span>
                </div>
                <button 
                    onClick={handleJoin}
                    className="w-full py-4 rounded-xl bg-primary text-black font-heading font-bold text-lg hover:bg-primary-btnhover transition-transform active:scale-95 shadow-neon flex items-center justify-center gap-2"
                >
                    <Wallet size={20} />
                    {t('btn_stake', { amount: `$${challenge.stake}` })}
                </button>
            </div>
        </div>
      )}

    </div>
  );
}