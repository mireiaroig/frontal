import React, { useState } from 'react';
import { Briefcase, Activity, Plus, Minus, ArrowRight, Calendar, History } from 'lucide-react';
import ProjectModal from './ProjectModal';

export default function ActivityHistory({ activities, behavior }) {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
                <History className="text-slate-800" size={28} />
                <h1 className="text-3xl font-black text-slate-800">Historial de l'alumne</h1>
            </div>

            {/* Secció Projectes STEAM */}
            <section>
                <div className="flex items-center gap-2 mb-5">
                    <Briefcase className="text-electricBlue" size={24} />
                    <h2 className="text-2xl font-black text-slate-800">Projectes STEAM</h2>
                </div>

                <div className="flex flex-col gap-4">
                    {activities.map(act => (
                        <button
                            key={act.id}
                            onClick={() => setSelectedProject(act)}
                            className="w-full text-left bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:border-electricBlue/30 hover:shadow-md transition-all group relative overflow-hidden"
                        >
                            <div className="absolute right-0 top-0 bottom-0 w-12 bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="text-electricBlue" size={20} />
                            </div>

                            <div className="flex flex-col gap-2 relative z-10 pr-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-lg text-slate-800 leading-tight">{act.title}</h3>
                                    <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                                        <Calendar size={12} />
                                        {new Date(act.date).toLocaleDateString('ca-ES', { month: 'short', day: 'numeric' })}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 line-clamp-2">{act.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Regles de Comportament i Actitud */}
            <section>
                <div className="flex items-center gap-2 mb-5">
                    <Activity className="text-voltYellow" size={24} />
                    <h2 className="text-2xl font-black text-slate-800">Registre d'Actitud</h2>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 divide-y divide-slate-50 overflow-hidden">
                    {behavior.map(item => (
                        <div key={item.id} className="p-4 sm:p-5 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                            <div className={`mt-0.5 p-2 rounded-xl flex-shrink-0 shadow-sm ${item.type === 'positive'
                                    ? 'bg-green-100 text-green-600 border border-green-200'
                                    : 'bg-red-100 text-red-600 border border-red-200'
                                }`}>
                                {item.type === 'positive' ? <Plus size={18} strokeWidth={3} /> : <Minus size={18} strokeWidth={3} />}
                            </div>

                            <div className="flex-1">
                                <p className="font-bold text-slate-700 text-sm sm:text-base">{item.action}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-bold text-slate-400">
                                        {new Date(item.date).toLocaleDateString('ca-ES', { weekday: 'long', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            <div className={`font-black text-lg ${item.type === 'positive' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                {item.type === 'positive' ? '+' : ''}{item.points} XP
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Project details modal */}
            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </div>
    );
}
