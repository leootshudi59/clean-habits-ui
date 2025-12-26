"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Users, Search, Trophy, MessageCircle, Heart, CheckCircle2, XCircle, Gavel, Flame, Globe } from "lucide-react";

type Tab = 'feed' | 'ranking' | 'friends';
type FeedFilter = 'all' | 'friends';

export default function SocialPage() {
    const t = useTranslations('Social');
    const [activeTab, setActiveTab] = useState<Tab>('feed');
    const [feedFilter, setFeedFilter] = useState<FeedFilter>('all');

    // --- MOCK DATA : AMIS (7 Total) ---
    // 6 dans Friends + 1 Outsider (Gary)
    const friends = [
        { id: 1, name: "Alice", avatar: "A", color: "bg-purple-500", streak: 12, xp: 4500, group: true },
        { id: 2, name: "Bob", avatar: "B", color: "bg-blue-500", streak: 8, xp: 3200, group: true },
        { id: 3, name: "Charlie", avatar: "C", color: "bg-green-500", streak: 24, xp: 5100, group: true },
        { id: 4, name: "David", avatar: "D", color: "bg-yellow-500", streak: 0, xp: 2100, group: true },
        { id: 5, name: "Eve", avatar: "E", color: "bg-pink-500", streak: 5, xp: 2800, group: true },
        { id: 6, name: "Frank", avatar: "F", color: "bg-orange-500", streak: 3, xp: 1500, group: true },
        { id: 7, name: "Gary", avatar: "G", color: "bg-zinc-500", streak: 45, xp: 6200, group: false },
    ];

    // --- MOCK DATA : FEED ITEMS ---
    // Mix d'amis et d'inconnus
    const feedItems = [
        {
            id: 101,
            userId: 3, // Charlie (Ami)
            userName: "Charlie",
            userAvatar: "C",
            userColor: "bg-green-500",
            isFriend: true,
            type: 'validated',
            content: 'Morning Run 5km',
            time: '2h',
            likes: 4,
        },
        {
            id: 102,
            userId: 99, // Inconnu
            userName: "Kate_fit",
            userAvatar: "K",
            userColor: "bg-cyan-600",
            isFriend: false, // <-- N'apparaitra pas dans l'onglet "Amis"
            type: 'validated',
            content: 'Deep Work Protocol',
            time: '3h',
            likes: 12,
        },
        {
            id: 103,
            userId: 4, // David (Ami)
            userName: "David",
            userAvatar: "D",
            userColor: "bg-yellow-500",
            isFriend: true,
            type: 'slashed',
            content: 'Morning Routine',
            amount: '-$5.00',
            time: '5h',
            likes: 0,
        },
        {
            id: 104,
            userId: 1, // Alice (Ami)
            userName: "Alice",
            userAvatar: "A",
            userColor: "bg-purple-500",
            isFriend: true,
            type: 'joined',
            content: 'No Sugar Challenge',
            time: '1j',
            likes: 2,
        },
        {
            id: 105,
            userId: 88, // Inconnu
            userName: "GymBro22",
            userAvatar: "G",
            userColor: "bg-red-600",
            isFriend: false,
            type: 'slashed',
            content: 'Marathon Prep',
            amount: '-$20.00',
            time: '1j',
            likes: 5,
        }
    ];

    // --- MOCK DATA : VERIFICATION (Tribunal) ---
    const verificationRequest = {
        user: friends[1], // Bob (Ami)
        task: "Gym Session",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
        time: "15 min"
    };

    // Filtrage du feed
    const filteredFeed = feedItems.filter(item => {
        if (feedFilter === 'all') return true;
        return item.isFriend;
    });

    return (
        <div className="pb-24 space-y-6">

            {/* 1. HEADER */}
            <header className="flex items-center justify-between px-1">
                <h1 className="text-3xl font-heading font-bold text-white">
                    {t('title')}
                </h1>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-400 bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-full">
                        {friends.length} amis
                    </span>
                    <button className="p-2 rounded-xl bg-primary text-black hover:bg-primary-btnhover transition-colors">
                        <Users size={20} />
                    </button>
                </div>
            </header>

            {/* 2. MAIN TABS SWITCHER */}
            <div className="p-1 rounded-xl bg-zinc-900/50 border border-white/5 flex relative">
                <div
                    className={`absolute top-1 bottom-1 w-[calc(33.33%-4px)] rounded-lg bg-zinc-800 shadow-sm transition-all duration-300 
            ${activeTab === 'feed' ? 'left-1' : activeTab === 'ranking' ? 'left-[calc(33.33%+2px)]' : 'left-[calc(66.66%+0px)]'}`}
                />
                <button onClick={() => setActiveTab('feed')} className={`flex-1 relative z-10 py-2 text-sm font-bold text-center transition-colors ${activeTab === 'feed' ? 'text-white' : 'text-zinc-500'}`}>
                    {t('tab_feed')}
                </button>
                <button onClick={() => setActiveTab('ranking')} className={`flex-1 relative z-10 py-2 text-sm font-bold text-center transition-colors ${activeTab === 'ranking' ? 'text-white' : 'text-zinc-500'}`}>
                    {t('tab_ranking')}
                </button>
                <button onClick={() => setActiveTab('friends')} className={`flex-1 relative z-10 py-2 text-sm font-bold text-center transition-colors ${activeTab === 'friends' ? 'text-white' : 'text-zinc-500'}`}>
                    {t('tab_friends')}
                </button>
            </div>

            {/* 3. CONTENU : FEED */}
            {activeTab === 'feed' && (
                <div className="space-y-6 animate-fade-in">

                    {/* SUB-TABS FILTER (Tout le monde / Amis) */}
                    <div className="flex justify-center">
                        <div className="flex bg-zinc-900 rounded-full p-1 border border-white/5">
                            <button
                                onClick={() => setFeedFilter('all')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${feedFilter === 'all' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                            >
                                <Globe size={12} /> {t('subtab_all')}
                            </button>
                            <button
                                onClick={() => setFeedFilter('friends')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${feedFilter === 'friends' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                            >
                                <Users size={12} /> {t('subtab_friends_only')}
                            </button>
                        </div>
                    </div>

                    {/* TRIBUNAL CARD (Validation) - Visible tout le temps pour inciter à valider */}
                    {/* Note: Dans la logique métier, on pourrait le cacher si l'utilisateur n'a personne à valider dans le filtre sélectionné */}
                    <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-zinc-900/60 p-5 shadow-neon">
                        <div className="absolute top-0 right-0 p-3 opacity-20">
                            <Gavel size={64} className="text-primary rotate-12" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/30 animate-pulse">
                                    TRIBUNAL
                                </span>
                                <span className="text-xs text-zinc-400"> • {verificationRequest.time}</span>
                            </div>
                            <p className="text-sm text-white mb-4">
                                {t('verification_desc', { name: verificationRequest.user.name })}
                                <br />
                                <span className="font-bold text-primary">Task: {verificationRequest.task}</span>
                            </p>
                            <div className="h-32 w-full bg-zinc-800 rounded-lg mb-4 overflow-hidden relative group cursor-pointer">
                                <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity" style={{ backgroundImage: `url(${verificationRequest.image})` }} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur">Voir la photo</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex-1 py-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold hover:bg-green-500/20 transition-colors flex items-center justify-center gap-2">
                                    <CheckCircle2 size={16} /> {t('btn_legit')}
                                </button>
                                <button className="flex-1 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
                                    <XCircle size={16} /> {t('btn_fake')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* TIMELINE FLUX */}
                    <div className="space-y-4 pl-4 border-l border-white/10 ml-2">
                        {filteredFeed.length > 0 ? filteredFeed.map((item) => (
                            <div key={item.id} className="relative pl-6 animate-slide-up">
                                {/* Timeline Dot */}
                                <div className={`absolute -left-[21px] top-0 h-10 w-10 rounded-full border-4 border-black flex items-center justify-center text-xs font-bold text-white shadow-lg ${item.userColor}`}>
                                    {item.userAvatar}
                                </div>

                                <div className="glass p-4 rounded-xl rounded-tl-none">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-white text-sm">{item.userName}</span>
                                            {!item.isFriend && (
                                                <span className="text-[9px] bg-zinc-800 text-zinc-500 px-1.5 rounded">Global</span>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-zinc-500">{item.time}</span>
                                    </div>

                                    <p className="text-sm text-zinc-300">
                                        {/* CAS 1 : VALIDATION */}
                                        {item.type === 'validated' && (
                                            <>✅ {t('activity_validated')} <strong className="text-white">{item.content}</strong></>
                                        )}

                                        {/* CAS 2 : ÉCHEC (JUSTE LE FAIL) */}
                                        {item.type === 'slashed' && (
                                            <>
                                                📉 {t('activity_failed')} <strong className="text-white">{item.content}</strong>
                                            </>
                                        )}

                                        {/* CAS 3 : JOIN */}
                                        {item.type === 'joined' && (
                                            <>🚀 {t('activity_joined')} <strong className="text-primary">{item.content}</strong></>
                                        )}
                                    </p>

                                    <div className="flex items-center gap-4 mt-3 text-zinc-500">
                                        <button className="flex items-center gap-1 text-xs hover:text-red-400 transition-colors">
                                            <Heart size={14} /> {item.likes}
                                        </button>
                                        <button className="flex items-center gap-1 text-xs hover:text-white transition-colors">
                                            <MessageCircle size={14} /> Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="py-10 text-center text-zinc-500 text-sm italic">
                                {t('empty_feed')}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 4. CONTENU : RANKING (Inchangé) */}
            {activeTab === 'ranking' && (
                <div className="space-y-4 animate-slide-up">
                    {/* Podium */}
                    <div className="flex items-end justify-center gap-2 mb-6 pt-4">
                        {/* 2nd Place */}
                        <div className="flex flex-col items-center">
                            <div className="relative mb-2">
                                <div className={`h-12 w-12 rounded-full ${friends[0].color} flex items-center justify-center text-white font-bold text-lg border-2 border-zinc-800 shadow-xl`}>
                                    {friends[0].avatar}
                                </div>
                                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                                    <span className="bg-zinc-700 text-white text-[10px] px-2 rounded-full border border-zinc-600">2</span>
                                </div>
                            </div>
                            <span className="font-bold text-white text-xs">{friends[0].name}</span>
                            <span className="text-[10px] text-zinc-400">{friends[0].xp} XP</span>
                        </div>

                        {/* 1st Place */}
                        <div className="flex flex-col items-center pb-4">
                            <div className="relative mb-2">
                                <Trophy size={20} className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-400 animate-bounce" />
                                <div className={`h-16 w-16 rounded-full ${friends[2].color} flex items-center justify-center text-white font-bold text-2xl border-4 border-yellow-500/30 shadow-neon`}>
                                    {friends[2].avatar}
                                </div>
                                <div className="absolute -bottom-3 inset-x-0 flex justify-center">
                                    <span className="bg-yellow-500 text-black font-bold text-xs px-2.5 py-0.5 rounded-full border border-yellow-300">1</span>
                                </div>
                            </div>
                            <span className="font-bold text-white text-sm">{friends[2].name}</span>
                            <span className="text-xs text-primary font-bold">{friends[2].xp} XP</span>
                        </div>

                        {/* 3rd Place */}
                        <div className="flex flex-col items-center">
                            <div className="relative mb-2">
                                <div className={`h-12 w-12 rounded-full ${friends[1].color} flex items-center justify-center text-white font-bold text-lg border-2 border-zinc-800 shadow-xl`}>
                                    {friends[1].avatar}
                                </div>
                                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                                    <span className="bg-orange-700 text-white text-[10px] px-2 rounded-full border border-orange-600">3</span>
                                </div>
                            </div>
                            <span className="font-bold text-white text-xs">{friends[1].name}</span>
                            <span className="text-[10px] text-zinc-400">{friends[1].xp} XP</span>
                        </div>
                    </div>

                    {/* Liste du reste */}
                    <div className="bg-zinc-900/40 rounded-2xl border border-white/5 divide-y divide-white/5">
                        {friends.slice(3).map((friend, index) => (
                            <div key={friend.id} className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-zinc-500 font-mono w-4 text-center">{index + 4}</span>
                                    <div className={`h-8 w-8 rounded-full ${friend.color} flex items-center justify-center text-xs font-bold text-white`}>
                                        {friend.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{friend.name}</p>
                                        {friend.group && (
                                            <p className="text-[9px] text-pink-400 flex items-center gap-1">
                                                <Users size={10} /> {t('group_tag')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm font-mono text-zinc-400">{friend.xp} XP</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 5. CONTENU : FRIENDS (Inchangé) */}
            {activeTab === 'friends' && (
                <div className="space-y-4 animate-fade-in">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text"
                            placeholder={t('search_friends')}
                            className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
                        />
                    </div>

                    {/* Grid des amis */}
                    <div className="space-y-2">
                        {friends.map((friend) => (
                            <div key={friend.id} className="glass p-3 rounded-xl flex items-center justify-between group hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className={`h-10 w-10 rounded-full ${friend.color} flex items-center justify-center text-white font-bold`}>
                                            {friend.avatar}
                                        </div>
                                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-zinc-900 flex items-center justify-center">
                                            <div className={`h-2 w-2 rounded-full ${friend.id < 4 ? 'bg-green-500' : 'bg-zinc-600'}`} />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">{friend.name}</h4>
                                        <div className="flex items-center gap-2">
                                            {friend.group ? (
                                                <span className="text-[10px] bg-pink-500/10 text-pink-300 px-1.5 py-0.5 rounded border border-pink-500/20">
                                                    Friends
                                                </span>
                                            ) : (
                                                <span className="text-[10px] text-zinc-500">Outsider</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-orange-500 justify-end">
                                        <Flame size={14} fill="currentColor" />
                                        <span className="font-mono text-sm font-bold">{friend.streak}</span>
                                    </div>
                                    <span className="text-[10px] text-zinc-500">streak</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-3 rounded-xl border border-dashed border-zinc-700 text-zinc-400 text-sm hover:bg-zinc-800/50 hover:text-white transition-colors flex items-center justify-center gap-2">
                        <Users size={16} /> {t('invite_btn')}
                    </button>
                </div>
            )}
        </div>
    );
}