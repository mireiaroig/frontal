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
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Secció Eixos d'Habilitats */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="text-electricBlue" size={24} />
                    <h2 className="text-2xl font-black text-slate-800">Els teus Eixos</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skills.map((skill) => {
                        const IconComponent = iconMap[skill.id] || Award;
                        return (
                            <button
                                key={skill.id}
                                onClick={() => setSelectedSkill(skill)}
                                className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-electricBlue/30 transition-all hover:-translate-y-1 group"
                            >
                                <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-electricBlue group-hover:text-white transition-colors text-electricBlue">
                                    <IconComponent size={32} />
                                </div>
                                <h3 className="font-bold text-slate-700 text-center leading-tight">{skill.name}</h3>
                                <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-voltYellow h-2 rounded-full"
                                        style={{ width: `${skill.global_level}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs font-bold text-slate-400">{skill.global_level}% Dominat</span>
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
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <div className="grid grid-cols-4 gap-4">
                        {badges.map((badge) => {
                            const BadgeIcon = iconMap[badge.icon] || Award;
                            return (
                                <div key={badge.id} className="flex flex-col items-center gap-2 group relative">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-transform group-hover:scale-110 ${badge.unlocked
                                        ? 'bg-gradient-to-br from-yellow-300 to-voltYellow border-yellow-100 text-yellow-900 shadow-[0_0_15px_rgba(255,215,0,0.5)]'
                                        : 'bg-slate-100 border-slate-50 text-slate-300 grayscale'
                                        }`}>
                                        {badge.unlocked ? <BadgeIcon size={28} /> : <Lock size={24} />}
                                    </div>
                                    <span className="text-[10px] font-bold text-center text-slate-600 leading-tight h-8">
                                        {badge.name}
                                    </span>

                                    {/* Tooltip */}
                                    <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-xs font-medium p-2 rounded-lg w-32 text-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                                        {badge.unlocked ? badge.description : 'Bloquejat'}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Secció Taula de Líders */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Trophy className="text-voltYellow" size={24} />
                    <h2 className="text-2xl font-black text-slate-800">Classificació Global</h2>
                </div>
                <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-100">
                    <div className="flex flex-col gap-2">
                        {leaderboard.map((player) => (
                            <div
                                key={player.rank}
                                className={`flex items-center gap-3 sm:gap-4 p-3 rounded-2xl transition-colors ${player.isUser
                                    ? 'bg-blue-50 border border-electricBlue shadow-sm relative overflow-hidden'
                                    : 'hover:bg-slate-50 border border-transparent'
                                    }`}
                            >
                                {player.isUser && (
                                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-electricBlue"></div>
                                )}
                                <span className={`font-black w-6 text-center text-sm sm:text-base ${player.rank <= 3 ? 'text-voltYellow' : player.isUser ? 'text-electricBlue' : 'text-slate-400'
                                    }`}>
                                    #{player.rank}
                                </span>
                                <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
                                <span className={`flex-1 font-bold truncate text-sm sm:text-base ${player.isUser ? 'text-electricBlue' : 'text-slate-700'}`}>
                                    {player.name}
                                </span>
                                <div className="flex items-center gap-1 bg-slate-100 px-2 sm:px-3 py-1 rounded-lg">
                                    <Zap size={14} className={player.isUser ? 'text-voltYellow fill-voltYellow' : 'text-slate-400'} />
                                    <span className="font-bold text-slate-600 text-sm">
                                        {player.isUser ? user.xp : player.xp}
                                    </span>
                                </div>
                            </div>
                        ))}
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
