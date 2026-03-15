import React from 'react';
import { X } from 'lucide-react';

export default function SkillModal({ skill, onClose }) {
    if (!skill) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-[95vw] max-w-5xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="bg-electricBlue p-6 sm:p-8 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-black text-white">{skill.name}</h2>
                        <p className="text-blue-200 mt-1 font-medium">Nivell Global: {skill.global_level}%</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 sm:p-8 flex flex-col gap-8 max-h-[70vh] overflow-y-auto">
                    <div className="flex flex-col gap-8 w-full">
                        {skill.categories.map((category, catIdx) => (
                        <div key={catIdx} className="flex flex-col gap-4">
                            {/* Category Header (només si en té més d'una o voleu sempre mostrar el títol del sub-eix) */}
                            {skill.categories.length > 1 && (
                                <h3 className="font-black text-slate-800 text-lg border-b border-slate-100 pb-2">
                                    {category.name}
                                </h3>
                            )}

                            <div className="flex flex-col gap-4">
                                {category.sub_skills.map((sub, idx) => (
                                    <div key={idx} className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-base sm:text-lg font-bold text-slate-700">
                                            <span>{sub.name}</span>
                                            <span className="text-electricBlue">{sub.score}%</span>
                                        </div>
                                        <div className="h-4 sm:h-5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner flex-shrink-0">
                                            <div
                                                className="h-full bg-voltYellow rounded-full"
                                                style={{ width: `${sub.score}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
                    <button
                        onClick={onClose}
                        className="w-full py-3 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors"
                    >
                        Tancar
                    </button>
                </div>
            </div>
        </div>
    );
}
