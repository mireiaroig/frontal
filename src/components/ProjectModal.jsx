import React from 'react';
import { X, Cpu, Bot, BrainCircuit, Users, Award } from 'lucide-react';

const iconMap = {
    computational: Cpu,
    engineering: Bot,
    cognitive: BrainCircuit,
    transversal: Users
};

const titleMap = {
    computational: "Pensament Computacional",
    engineering: "Enginyeria i Robòtica",
    cognitive: "Habilitats Cognitives",
    transversal: "Habilitats Transversals"
};

export default function ProjectModal({ project, onClose }) {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-[95vw] max-w-5xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="bg-electricBlue p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight pr-8">{project.title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors flex-shrink-0"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <p className="text-blue-100 text-base sm:text-lg leading-relaxed">{project.description}</p>
                </div>

                <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <Award className="text-voltYellow" size={24} />
                        <h3 className="font-bold text-slate-800 text-base sm:text-lg uppercase tracking-wide">XP Obtinguda</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {Object.entries(project.xp_gained).map(([key, xp]) => {
                            if (xp === 0) return null;
                            const IconComponent = iconMap[key] || Award;

                            return (
                                <div key={key} className="flex items-center justify-between p-4 sm:p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm text-electricBlue">
                                            <IconComponent size={24} />
                                        </div>
                                        <span className="font-bold text-slate-700 text-base sm:text-lg">{titleMap[key]}</span>
                                    </div>
                                    <div className="font-black text-electricBlue bg-blue-50 px-4 py-2 rounded-lg text-lg sm:text-xl">
                                        +{xp} XP
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <button
                        onClick={onClose}
                        className="w-full py-4 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-lg font-bold rounded-2xl transition-colors"
                    >
                        Tancar Detalls
                    </button>
                </div>
            </div>
        </div>
    );
}
