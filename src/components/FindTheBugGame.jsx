import React, { useState } from 'react';
import { Gamepad2, Zap, Trophy, Bug, Lock, Play } from 'lucide-react';

const MOCK_CODE_SNIPPETS = [
    {
        id: 1,
        title: "Bucle infinit de Python",
        code: `def comptar_fins_a_10():\n    i = 0\n    while i < 10:\n        print(i)\n#       i += 1`,
        buggyLine: 4, // 0-indexed: line 4 is `#       i += 1`
        explanation: "El contador estava comentat! Això generava un bucle infinit divertit però catastròfic en consum d'energia.",
        xpReward: 50,
        cost: 10
    }
];

export default function FindTheBugGame({ addXP, deductVoltCoins, user, onBack }) {
    const [level, setLevel] = useState(MOCK_CODE_SNIPPETS[0]);
    const [gameState, setGameState] = useState('playing'); // playing, won, failed, no_coins
    const [clickedLine, setClickedLine] = useState(null);

    const lines = level.code.split('\n');

    const handleLineClick = (index) => {
        if (gameState !== 'playing') return;

        if (user.voltcoins < level.cost) {
            setGameState('no_coins');
            return;
        }

        setClickedLine(index);
        deductVoltCoins(level.cost);

        if (index === level.buggyLine) {
            setGameState('won');
            addXP(level.xpReward);
        } else {
            setGameState('failed');
        }
    };

    const resetGame = () => {
        setGameState('playing');
        setClickedLine(null);
    };

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col">
            {/* Game Header */}
            <div className="bg-slate-900 p-4 border-b border-slate-800 flex justify-between items-center text-white relative z-10 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-xl">
                        <Bug className="text-voltYellow" size={24} />
                    </div>
                    <div>
                        <h2 className="font-black text-lg">Troba el Bug!</h2>
                        <p className="text-xs font-bold text-slate-400">Nivell: {level.title}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full font-bold text-sm text-voltYellow">
                        <Zap size={14} className="fill-voltYellow" /> -{level.cost}
                    </div>
                </div>
            </div>

            {/* Editor Main */}
            <div className="p-6 bg-[#1e1e1e] font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
                <div className="flex flex-col gap-1 min-w-[300px]">
                    {lines.map((text, idx) => {
                        const isClickable = gameState === 'playing';
                        let lineClass = "flex gap-4 px-2 py-0.5 rounded transition-all " +
                            (isClickable ? "hover:bg-slate-700/50 cursor-pointer" : "");

                        if (clickedLine === idx) {
                            if (gameState === 'won' && idx === level.buggyLine) {
                                lineClass += " bg-green-500/20 shadow-[inset_0_0_10px_rgba(34,197,94,0.3)] ring-1 ring-green-500";
                            } else if (gameState === 'failed') {
                                lineClass += " bg-red-500/20 shadow-[inset_0_0_10px_rgba(239,68,68,0.3)] ring-1 ring-red-500";
                            }
                        } else if (gameState === 'won' && idx === level.buggyLine) {
                            // Highlight the correct line even if it wasn't the one clicked (though here we only transition to won if it was)
                            lineClass += " bg-green-500/20 ring-1 ring-green-500";
                        }

                        return (
                            <div
                                key={idx}
                                onClick={() => handleLineClick(idx)}
                                className={lineClass}
                            >
                                <span className="text-slate-500 select-none w-6 text-right shrink-0">{idx + 1}</span>
                                <span className={`${text.trim().startsWith('#') ? 'text-green-500/80' : 'text-blue-300'} whitespace-pre`}>
                                    {text}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Result Panel */}
            <div className={`p-6 transition-all duration-500 ease-out border-t-4 ${gameState === 'playing' ? 'bg-slate-50 border-transparent h-20 opacity-0 pointer-events-none hidden' :
                    gameState === 'won' ? 'bg-green-50 border-green-500' :
                        gameState === 'no_coins' ? 'bg-yellow-50 border-voltYellow' : 'bg-red-50 border-red-500'
                }`}>
                {gameState === 'won' && (
                    <div className="flex flex-col items-center gap-3 animate-in slide-in-from-bottom-4 zoom-in-95 duration-500">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-1">
                            <Trophy size={32} />
                        </div>
                        <h3 className="text-xl font-black text-green-700">Bug Eliminat!</h3>
                        <p className="text-sm font-medium text-green-800 text-center">{level.explanation}</p>
                        <div className="mt-2 font-black text-2xl text-green-600 bg-white px-6 py-2 rounded-2xl shadow-sm">
                            +{level.xpReward} XP
                        </div>
                        <button onClick={onBack} className="mt-4 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors w-full">Torna a l'Arcade</button>
                    </div>
                )}

                {gameState === 'failed' && (
                    <div className="flex flex-col items-center gap-3 animate-in slide-in-from-bottom-4 zoom-in-95 duration-500">
                        <h3 className="text-xl font-black text-red-600">Error Tàctic</h3>
                        <p className="text-sm font-medium text-red-700 text-center">Aquesta no era la línia problemàtica... El bug s'ha escapat!</p>
                        <button onClick={resetGame} className="mt-4 px-8 py-3 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-colors w-full">Torna-ho a provar (-{level.cost} <Zap size={14} className="inline" />)</button>
                        <button onClick={onBack} className="mt-2 px-8 py-3 bg-transparent text-slate-500 font-bold hover:text-slate-700 transition-colors">Sortir</button>
                    </div>
                )}

                {gameState === 'no_coins' && (
                    <div className="flex flex-col items-center gap-3 animate-in slide-in-from-bottom-4 zoom-in-95 duration-500">
                        <h3 className="text-xl font-black text-yellow-700">Energia Insuficient</h3>
                        <p className="text-sm font-medium text-yellow-800 text-center">Necessites més VoltCoins per activar el depurador aquest torn.</p>
                        <button onClick={onBack} className="mt-4 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors w-full">Torna a l'Arcade</button>
                    </div>
                )}
            </div>

        </div>
    );
}
