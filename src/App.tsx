import React, { useState } from 'react';
import { LoginScreen } from './LoginScreen';
import { DashboardScreen } from './DashboardScreen';
import { SettingsScreen } from './SettingsScreen';
import { FinanceScreen } from './FinanceScreen';
import { AddTransactionScreen } from './AddTransactionScreen';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Receipt, Settings as SettingsIcon } from 'lucide-react';
import { cn } from './lib/utils';

type Screen = 'login' | 'dashboard' | 'settings' | 'finance' | 'add-transaction';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={() => setCurrentScreen('dashboard')} />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'settings':
        return <SettingsScreen onLogout={() => setCurrentScreen('login')} />;
      case 'finance':
        return <FinanceScreen onAddTransaction={() => setCurrentScreen('add-transaction')} />;
      case 'add-transaction':
        return (
          <AddTransactionScreen
            onBack={() => setCurrentScreen('finance')}
            onSave={() => setCurrentScreen('finance')}
          />
        );
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
      {currentScreen !== 'login' && currentScreen !== 'add-transaction' && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-t border-slate-200 pb-safe pt-3 lg:pb-3 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto flex justify-around px-4">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors px-10 py-1 rounded-2xl",
                currentScreen === 'dashboard' ? "text-primary" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className="h-6 flex items-center">
                <LayoutGrid size={24} className={currentScreen === 'dashboard' ? "fill-primary/20" : ""} />
              </div>
              <p className="text-[11px] font-extrabold uppercase tracking-widest mt-1">Dash</p>
            </button>
            <button
              onClick={() => setCurrentScreen('finance')}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors px-10 py-1 rounded-2xl",
                currentScreen === 'finance' ? "text-primary" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className="h-6 flex items-center">
                <Receipt size={24} className={currentScreen === 'finance' ? "fill-primary/20" : ""} />
              </div>
              <p className="text-[11px] font-extrabold uppercase tracking-widest mt-1">Flow</p>
            </button>
            <button
              onClick={() => setCurrentScreen('settings')}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors px-10 py-1 rounded-2xl",
                currentScreen === 'settings' ? "text-primary" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className="h-6 flex items-center">
                <SettingsIcon size={24} className={currentScreen === 'settings' ? "fill-primary/20" : ""} />
              </div>
              <p className="text-[11px] font-extrabold uppercase tracking-widest mt-1">Prefs</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
