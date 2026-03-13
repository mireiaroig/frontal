import React, { useState } from 'react';
import { LayoutDashboard, History, Gamepad2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ActivityHistory from './components/ActivityHistory';
import Arcade from './components/Arcade';

import userData from './data/user.json';
import skillsData from './data/skills.json';
import badgesData from './data/badges.json';
import activitiesData from './data/activities.json';
import behaviorData from './data/behavior.json';
import leaderboardData from './data/leaderboard.json';
import CustomizationModal from './components/CustomizationModal';

function App() {
  // Adding theme to initial user state so we don't need a separate state,
  // we default to electric
  const [user, setUser] = useState({ ...userData, theme: 'electric' });
  const [showCustomization, setShowCustomization] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const addXP = (amount) => {
    setUser(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let nextLevelXp = prev.next_level_xp;
      if (newXp >= nextLevelXp) {
        newLevel += 1;
        newXp = newXp - nextLevelXp;
        nextLevelXp = Math.floor(nextLevelXp * 1.5);
      }
      return { ...prev, xp: newXp, level: newLevel, next_level_xp: nextLevelXp };
    });
  };

  const deductVoltCoins = (amount) => {
    setUser(prev => ({ ...prev, voltcoins: Math.max(0, prev.voltcoins - amount) }));
  };

  const tabs = [
    { id: 'dashboard', label: 'Escriptori', Icon: LayoutDashboard },
    { id: 'history', label: 'Historial', Icon: History },
    { id: 'arcade', label: 'Arcade', Icon: Gamepad2 }
  ];

  const updateAvatar = (url) => setUser(prev => ({ ...prev, avatar_url: url }));
  const updateNick = (nick) => setUser(prev => ({ ...prev, nick: nick }));
  const updateTheme = (themeId) => setUser(prev => ({ ...prev, theme: themeId }));

  // Theme mapping string
  // electricBlue is used by default in Tailwind config, but we map CSS variables if we want global changes, 
  // or we can apply it via a top-level dataset attribute. For simplicity in this demo, we'll assign a dataset.

  return (
    <div className={`h-screen bg-slate-50 text-slate-900 flex flex-col overflow-hidden theme-${user.theme}`}>
      <Navbar user={user} onAvatarClick={() => setShowCustomization(true)} />

      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 pb-20">
          {activeTab === 'dashboard' && <Dashboard user={user} skills={skillsData} badges={badgesData} leaderboard={leaderboardData} />}
          {activeTab === 'history' && <ActivityHistory activities={activitiesData} behavior={behaviorData} />}
          {activeTab === 'arcade' && <Arcade addXP={addXP} deductVoltCoins={deductVoltCoins} user={user} />}
        </div>
      </main>

      <nav className="bg-white border-t border-slate-200 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-40 shrink-0 w-full pb-safe">
        <div className="max-w-4xl mx-auto px-4">
          <ul className="flex justify-around py-3">
            {tabs.map(({ id, label, Icon }) => (
              <li key={id} className="flex-1 text-center">
                <button
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${activeTab === id ? 'text-electricBlue font-bold scale-110' : 'text-slate-400 hover:text-electricBlue'
                    }`}
                >
                  <Icon size={24} className={activeTab === id ? 'drop-shadow-md' : ''} />
                  <span className="text-[10px] uppercase tracking-wider">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {showCustomization && (
        <CustomizationModal
          user={user}
          badges={badgesData}
          onClose={() => setShowCustomization(false)}
          onUpdateAvatar={updateAvatar}
          onUpdateNick={updateNick}
          onUpdateTheme={updateTheme}
        />
      )}
    </div>
  );
}

export default App;
