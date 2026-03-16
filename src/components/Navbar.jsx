import React from 'react';
import { Zap, Target, Battery, Shield } from 'lucide-react';

export default function Navbar({ user, onAvatarClick }) {
    const xpPercentage = Math.round((user.xp / user.next_level_xp) * 100);

    return (
        <header className="bg-electricBlue border-b border-blue-700 z-50 shadow-md shrink-0 w-full relative">
            <div className="max-w-4xl mx-auto p-4 md:p-6 flex flex-col gap-4 w-full">
                {/* User Info & Coins */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={onAvatarClick} className={`relative rounded-full bg-white/20 p-1.5 transition-transform hover:scale-105 cursor-pointer hover:shadow-lg ${user.hasGlowBadge ? 'animate-glow' : ''}`}>
                            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden bg-white border-4 border-white shadow-inner">
                                <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-voltYellow text-slate-900 text-sm font-black px-3 py-1 rounded-full border-2 border-white shadow-xl">
                                Lvl {user.level}
                            </div>
                        </button>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-sm">{user.name || 'Guillem Morgó'}</h1>
                            <p className="text-base font-semibold text-blue-100">@{user.nick}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full shadow-inner" title="Energia Arcade">
                            <Battery size={20} className="text-voltYellow fill-voltYellow drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]" />
                            <span className="font-extrabold text-white text-lg">{user.energy}</span>
                        </div>
                    </div>
                </div>

                {/* Mission & XP Bar */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl flex flex-col gap-3 shadow-lg">
                    <div className="flex justify-between items-center text-base font-bold text-white">
                        <div className="flex items-center gap-2">
                            <Shield size={20} className="text-voltYellow" />
                            <span className="drop-shadow-sm">Progrés d'Habilitats</span>
                        </div>
                        <span className="text-slate-900 bg-voltYellow px-3 py-1 rounded-md shadow-sm">{user.xp} / {user.next_level_xp} XP</span>
                    </div>
                    <div className="h-4 w-full bg-blue-900/50 rounded-full overflow-hidden shadow-inner border border-blue-400/30">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-200 to-voltYellow rounded-full transition-all duration-700 ease-out relative shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                            style={{ width: `${xpPercentage}%` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
