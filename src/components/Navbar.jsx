import React from 'react';
import { Zap, Target } from 'lucide-react';

export default function Navbar({ user, onAvatarClick }) {
    const xpPercentage = Math.round((user.xp / user.next_level_xp) * 100);

    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 shadow-sm shrink-0 w-full relative">
            <div className="max-w-4xl mx-auto p-4 flex flex-col gap-4 w-full">
                {/* User Info & Coins */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button onClick={onAvatarClick} className={`relative rounded-full bg-slate-100 p-0.5 transition-transform hover:scale-105 cursor-pointer ${user.hasGlowBadge ? 'animate-glow' : ''}`}>
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-white">
                                <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-electricBlue text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-md">
                                Lvl {user.level}
                            </div>
                        </button>
                        <div>
                            <h1 className="text-xl font-black text-slate-800 tracking-tight">Projecte Rayo</h1>
                            <p className="text-sm font-semibold text-slate-500">@{user.nick}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full shadow-inner">
                        <Zap size={20} className="text-voltYellow fill-voltYellow drop-shadow-sm" />
                        <span className="font-extrabold text-slate-800 text-lg">{user.voltcoins}</span>
                    </div>
                </div>

                {/* Mission & XP Bar */}
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col gap-2 shadow-sm">
                    <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                        <div className="flex items-center gap-2">
                            <Target size={18} className="text-electricBlue" />
                            <span>{user.current_mission}</span>
                        </div>
                        <span className="text-electricBlue bg-blue-50 px-2 py-0.5 rounded-md">{user.xp} / {user.next_level_xp} XP</span>
                    </div>
                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                        <div
                            className="h-full bg-electricBlue rounded-full transition-all duration-700 ease-out relative"
                            style={{ width: `${xpPercentage}%` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
