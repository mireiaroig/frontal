import React, { useState } from 'react';
import { Gamepad2, Bug, Zap, Lock, Code2 } from 'lucide-react';
import FindTheBugGame from './FindTheBugGame';

export default function Arcade({ addXP, deductVoltCoins, user }) {
    const [activeGame, setActiveGame] = useState(null);

    if (activeGame === 'bug-finder') {
        return (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <button
                    onClick={() => setActiveGame(null)}
                    className="mb-4 text-sm font-bold text-slate-500 flex items-center gap-2 hover:text-electricBlue transition-colors"
                >
                    ← Tornar als Jocs
                </button>
                <FindTheBugGame addXP={addXP} deductVoltCoins={deductVoltCoins} user={user} onBack={() => setActiveGame(null)} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header Arcade */}
            <section className="bg-gradient-to-br from-slate-900 to-electricBlue rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Gamepad2 size={120} />
                </div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-2 tracking-tight">Sala Arcade</h2>
                    <p className="text-blue-100 font-medium max-w-sm">Juga minijocs tècnics per guanyar experiència. Vigila l'energia, cada partida costa VoltCoins!</p>

                    <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-voltYellow font-bold">
                        Tens {user.voltcoins} VoltCoins disponibles
                    </div>
                </div>
            </section>

            {/* Grid de Jocs */}
            <section className="grid sm:grid-cols-2 gap-4">

                {/* Joc 1: Actiu */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 flex flex-col items-center text-center group hover:shadow-lg hover:border-electricBlue/50 transition-all hover:-translate-y-1">
                    <div className="w-16 h-16 bg-blue-50 text-electricBlue rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Bug size={32} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2">Troba el Bug</h3>
                    <p className="text-sm text-slate-500 mb-4 px-2">Analitza els blocs de codi i trenca els bucles infinits abans que s'aturi el servidor.</p>
                    <div className="mt-auto w-full pt-4">
                        <button
                            onClick={() => setActiveGame('bug-finder')}
                            className="w-full bg-electricBlue text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/30 flex items-center justify-center gap-2"
                        >
                            Jugar Ara <span className="flex items-center gap-1 text-voltYellow text-xs ml-2 bg-blue-800/50 px-2 py-0.5 rounded-full"><Zap size={12} className="fill-voltYellow" /> -10</span>
                        </button>
                    </div>
                </div>

                {/* Joc 2: Bloquejat */}
                <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5 flex flex-col items-center text-center opacity-80">
                    <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mb-4 relative">
                        <Code2 size={32} />
                        <div className="absolute -bottom-2 -right-2 bg-slate-800 text-white rounded-full p-1 border-2 border-white">
                            <Lock size={12} />
                        </div>
                    </div>
                    <h3 className="text-xl font-black text-slate-500 mb-2">Puzle Lògic</h3>
                    <p className="text-sm text-slate-400 mb-4 px-2">Ordena les instruccions Blockly per arribar al destí amb els menys passos possibles.</p>
                    <div className="mt-auto w-full pt-4">
                        <button disabled className="w-full bg-slate-200 text-slate-500 font-bold py-3 rounded-xl cursor-not-allowed">
                            Properament (Lvl 5)
                        </button>
                    </div>
                </div>

            </section>

        </div>
    );
}
