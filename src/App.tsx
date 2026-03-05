import React, { useState } from 'react';
import { LoginScreen } from './LoginScreen';
import { DashboardScreen } from './DashboardScreen';
import { SettingsScreen } from './SettingsScreen';
import { FinanceScreen } from './FinanceScreen';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LayoutGrid, Receipt, Settings as SettingsIcon } from 'lucide-react';
import { cn } from './lib/utils';

type Screen = 'login' | 'dashboard' | 'settings' | 'finance';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={() => setCurrentScreen('dashboard')} />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'finance':
        return <FinanceScreen />;
      default:
        return <LoginScreen onLogin={() => setCurrentScreen('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Main Navigation at the Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-t border-slate-200 pb-8 pt-3">
        <div className="max-w-[480px] mx-auto flex justify-around px-4">
          <button 
            onClick={() => setCurrentScreen('login')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              currentScreen === 'login' ? "text-primary" : "text-slate-400"
            )}
          >
            <div className="h-6 flex items-center">
              <LogIn size={22} className={currentScreen === 'login' ? "fill-primary/20" : ""} />
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest">Login</p>
          </button>
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              currentScreen === 'dashboard' ? "text-primary" : "text-slate-400"
            )}
          >
            <div className="h-6 flex items-center">
              <LayoutGrid size={22} className={currentScreen === 'dashboard' ? "fill-primary/20" : ""} />
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest">Dash</p>
          </button>
          <button 
            onClick={() => setCurrentScreen('finance')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              currentScreen === 'finance' ? "text-primary" : "text-slate-400"
            )}
          >
            <div className="h-6 flex items-center">
              <Receipt size={22} className={currentScreen === 'finance' ? "fill-primary/20" : ""} />
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest">Flow</p>
          </button>
          <button 
            onClick={() => setCurrentScreen('settings')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              currentScreen === 'settings' ? "text-primary" : "text-slate-400"
            )}
          >
            <div className="h-6 flex items-center">
              <SettingsIcon size={22} className={currentScreen === 'settings' ? "fill-primary/20" : ""} />
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest">Prefs</p>
          </button>
        </div>
      </div>
    </div>
  );
}
