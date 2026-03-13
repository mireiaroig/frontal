import React, { useState } from 'react';
import { X, Image as ImageIcon, Palette, PenTool, Lock } from 'lucide-react';

export default function CustomizationModal({ user, badges, onClose, onUpdateAvatar, onUpdateNick, onUpdateTheme }) {
    const [newNick, setNewNick] = useState(user.nick);

    // Customization presets
    const avatars = [
        "https://api.dicebear.com/7.x/bottts/svg?seed=Rayo",
        "https://api.dicebear.com/7.x/bottts/svg?seed=Spark",
        "https://api.dicebear.com/7.x/bottts/svg?seed=Volt",
        "https://api.dicebear.com/7.x/bottts/svg?seed=Circuit"
    ];

    const themes = [
        { id: 'electric', name: 'Blau Elèctric', color: 'bg-blue-600' },
        { id: 'neon', name: 'Neó Ciber', color: 'bg-green-500' },
        { id: 'purple', name: 'Plasma Violeta', color: 'bg-purple-600' },
        { id: 'crimson', name: 'Rojo Òxid', color: 'bg-red-600' }
    ];

    // Helper to check if a specific badge is unlocked
    const hasBadge = (badgeId) => badges.find(b => b.id === badgeId)?.unlocked;

    const handleNickSubmit = (e) => {
        e.preventDefault();
        if (newNick.trim()) {
            onUpdateNick(newNick);
        }
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                    <h2 className="text-xl font-black flex items-center gap-2">
                        Taller de l'Avatar
                    </h2>
                    <button onClick={onClose} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-8 max-h-[70vh] overflow-y-auto">

                    {/* Avatar Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <ImageIcon className={hasBadge('custom_avatar') ? 'text-electricBlue' : 'text-slate-400'} size={20} />
                            <h3 className={`font-bold ${hasBadge('custom_avatar') ? 'text-slate-800' : 'text-slate-400'}`}>Canvi de Carcassa</h3>
                            {!hasBadge('custom_avatar') && <Lock size={14} className="text-slate-400" />}
                        </div>

                        <div className={`grid grid-cols-4 gap-3 ${!hasBadge('custom_avatar') && 'opacity-50 pointer-events-none'}`}>
                            {avatars.map(url => (
                                <button
                                    key={url}
                                    onClick={() => onUpdateAvatar(url)}
                                    className={`aspect-square rounded-2xl border-2 overflow-hidden transition-all hover:scale-105 ${user.avatar_url === url ? 'border-electricBlue shadow-md ring-2 ring-blue-100' : 'border-slate-100 bg-slate-50 hover:border-blue-200'}`}
                                >
                                    <img src={url} alt="avatar option" className="w-full h-full object-cover p-1" />
                                </button>
                            ))}
                        </div>
                        {!hasBadge('custom_avatar') && <p className="text-xs text-slate-400 mt-2 font-medium">Bloquejat. Necessites aconseguir l'insígnia "Canvia-Cares".</p>}
                    </section>

                    {/* Theme Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Palette className={hasBadge('ui_colors') ? 'text-electricBlue' : 'text-slate-400'} size={20} />
                            <h3 className={`font-bold ${hasBadge('ui_colors') ? 'text-slate-800' : 'text-slate-400'}`}>Pintura de l'Interfície</h3>
                            {!hasBadge('ui_colors') && <Lock size={14} className="text-slate-400" />}
                        </div>

                        <div className={`grid grid-cols-2 gap-3 ${!hasBadge('ui_colors') && 'opacity-50 pointer-events-none'}`}>
                            {themes.map(theme => (
                                <button
                                    key={theme.id}
                                    onClick={() => onUpdateTheme(theme.id)}
                                    className={`flex items-center gap-2 p-2 rounded-xl border-2 transition-all hover:bg-slate-50 ${user.theme === theme.id ? 'border-electricBlue bg-blue-50' : 'border-slate-100'}`}
                                >
                                    <div className={`w-6 h-6 rounded-full shadow-inner ${theme.color}`}></div>
                                    <span className="text-sm font-bold text-slate-700">{theme.name}</span>
                                </button>
                            ))}
                        </div>
                        {!hasBadge('ui_colors') && <p className="text-xs text-slate-400 mt-2 font-medium">Bloquejat. Necessites aconseguir l'insígnia "Pintor Digital".</p>}
                    </section>

                    {/* Nickname Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <PenTool className={hasBadge('custom_nick') ? 'text-electricBlue' : 'text-slate-400'} size={20} />
                            <h3 className={`font-bold ${hasBadge('custom_nick') ? 'text-slate-800' : 'text-slate-400'}`}>Mòdul d'Identificació</h3>
                            {!hasBadge('custom_nick') && <Lock size={14} className="text-slate-400" />}
                        </div>

                        <form onSubmit={handleNickSubmit} className={`flex gap-2 ${!hasBadge('custom_nick') && 'opacity-50 pointer-events-none'}`}>
                            <input
                                type="text"
                                maxLength={15}
                                value={newNick}
                                onChange={(e) => setNewNick(e.target.value)}
                                placeholder="Nou nick..."
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-700 focus:outline-none focus:border-electricBlue focus:ring-1 focus:ring-electricBlue transition-all"
                            />
                            <button
                                type="submit"
                                className="bg-electricBlue text-white font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                Actualitzar
                            </button>
                        </form>
                        {!hasBadge('custom_nick') && <p className="text-xs text-slate-400 mt-2 font-medium">Bloquejat. Necessites aconseguir l'insígnia "Forjador de Noms".</p>}
                    </section>

                </div>
            </div>
        </div>
    );
}
