import React, { useState } from 'react';
import { Cpu, Bot, BrainCircuit, Users, Zap, Bug, Sun, Award, Lock, BookOpen, Trophy, Image, Palette, PenTool } from 'lucide-react';
import SkillModal from './SkillModal';

const iconMap = {
    computational: Cpu,
    engineering: Bot,
    cognitive: BrainCircuit,
    transversal: Users,
    Zap: Zap,
    Bug: Bug,
    Sun: Sun,
    Users: Users,
    Award: Award,
    Image: Image,
    Palette: Palette,
    PenTool: PenTool
};

export default function Dashboard({ user, skills, badges, leaderboard }) {
    const [selectedSkill, setSelectedSkill] = useState(null);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 items-start">
            
            {/* Columna Esquerra: Habilitats i Insígnies */}
            <div className="xl:col-span-2 flex flex-col gap-8 w-full">
                <section>
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="text-electricBlue" size={24} />
                    <h2 className="text-2xl font-black text-slate-800">Les habilitats Ignite</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skills.map((skill) => {
                        const IconComponent = iconMap[skill.id] || Award;
                        return (
                            <button
                                key={skill.id}
                                onClick={() => setSelectedSkill(skill)}
                                className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-4 hover:shadow-lg hover:border-electricBlue/50 transition-all hover:-translate-y-1 group"
                            >
                                <div className="bg-blue-50 p-6 rounded-3xl group-hover:bg-electricBlue group-hover:text-white transition-colors text-electricBlue">
                                    <IconComponent size={48} />
                                </div>
                                <h3 className="text-lg font-black text-slate-700 text-center leading-tight">{skill.name}</h3>
                                <div className="w-full bg-slate-100 rounded-full h-4 mt-2 shadow-inner">
                                    <div
                                        className="bg-voltYellow h-4 rounded-full"
                                        style={{ width: `${skill.global_level}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-extrabold text-slate-400">{skill.global_level}% Dominat</span>
                            </button>
                        );
                    })}
                </div>
                </section>

                {/* Secció Mur d'Insígnies */}
                <section>
                <div className="flex items-center gap-2 mb-4">
                    <Award className="text-voltYellow" size={24} />
                    <h2 className="text-2xl font-black text-slate-800">Mur d'Insígnies</h2>
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full flex flex-col justify-center">
                    <div className="grid grid-cols-3 gap-6">
                        {badges.map((badge) => {
                            const BadgeIcon = iconMap[badge.icon] || Award;
                            return (
                                <div key={badge.id} className="flex flex-col items-center gap-3 group relative">
                                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border-4 transition-transform group-hover:scale-110 ${badge.unlocked
                                        ? 'bg-gradient-to-br from-yellow-300 to-voltYellow border-yellow-100 text-yellow-900 shadow-[0_0_20px_rgba(255,215,0,0.6)]'
                                        : 'bg-slate-100 border-slate-50 text-slate-300 grayscale'
                                        }`}>
                                        {badge.unlocked ? <BadgeIcon size={36} /> : <Lock size={32} />}
                                    </div>
                                    <span className="text-xs sm:text-sm font-black text-center text-slate-700 leading-tight">
                                        {badge.name}
                                    </span>

                                    <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-xs font-medium p-2 rounded-lg w-32 text-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                                        {badge.unlocked ? badge.description : `Es desbloqueja al Nivell ${badge.unlockLevel || 'X'}`}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            );
                        })}
                        
                        {/* More badges / open modal button */}
                        <div className="flex flex-col items-center justify-start gap-3 group relative mt-2">
                            <button
                                onClick={() => alert("Obrint galeria d'insígnies...")}
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border-4 border-slate-100 bg-slate-50 text-electricBlue hover:bg-blue-50 hover:border-blue-200 transition-all group-hover:scale-110 shadow-inner"
                            >
                                <span className="text-4xl font-black">+</span>
                            </button>
                            <span className="text-xs sm:text-sm font-black text-center text-electricBlue leading-tight h-8 w-full mt-1">
                                Veure galeria
                            </span>
                        </div>
                    </div>
                </div>
                </section>
            </div>

            {/* Columna Dreta: Taula de Líders */}
            <section className="xl:col-span-1 sticky top-6 h-full min-h-[500px] flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <Trophy className="text-voltYellow" size={24} />
                    <h2 className="text-2xl font-black text-slate-800">Classificació Global</h2>
                </div>
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 flex-1 flex flex-col">
                    <div className="flex flex-col gap-5">
                        {[...leaderboard]
                            // Replace user's XP and Avatar in the copied array before sorting to make sure it's accurate
                            .map(player => player.isUser ? { ...player, xp: user.xp, avatar: user.avatar_url } : player)
                            .sort((a, b) => b.xp - a.xp)
                            .map((player, index) => {
                                // Re-calculate rank based on sort
                                const actualRank = index + 1;
                                return (
                                    <div
                                        key={player.id || actualRank}
                                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all shadow-sm ${player.isUser
                                            ? 'bg-blue-50 border border-electricBlue shadow-[0_0_15px_rgba(59,130,246,0.2)] relative overflow-hidden scale-[1.02]'
                                            : 'bg-white border border-slate-100 hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5'
                                            }`}
                                    >
                                        {player.isUser && (
                                            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-electricBlue"></div>
                                        )}
                                        <span className={`font-black w-8 text-center text-lg ${actualRank === 1 ? 'text-yellow-400 drop-shadow-sm' : actualRank === 2 ? 'text-slate-400' : actualRank === 3 ? 'text-amber-600' : player.isUser ? 'text-electricBlue' : 'text-slate-300'
                                            }`}>
                                            #{actualRank}
                                        </span>
                                        <div className="relative">
                                            <img src={player.avatar} alt={player.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100 border-2 border-white shadow-md object-contain p-1" />
                                            {actualRank <= 3 && (
                                                <div className="absolute -bottom-2 -right-2 bg-white rounded-full shadow-sm p-0.5">
                                                    <Trophy size={16} className={actualRank === 1 ? 'text-yellow-400' : actualRank === 2 ? 'text-slate-400' : 'text-amber-600'} />
                                                </div>
                                            )}
                                        </div>
                                        <span className={`flex-1 font-black truncate text-base sm:text-lg tracking-tight ${player.isUser ? 'text-electricBlue' : 'text-slate-800'}`}>
                                            {player.name}
                                        </span>
                                        <div className="flex flex-col items-end justify-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 shrink-0">
                                            <div className="flex items-center gap-1.5">
                                                <BrainCircuit size={16} className={player.isUser ? 'text-electricBlue' : 'text-slate-400'} />
                                                <span className="font-black text-slate-700 text-lg leading-none">
                                                    {player.xp}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">XP</span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>

            {/* Modal Habilitats */}
            {selectedSkill && (
                <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
            )}
        </div>
    );
}
