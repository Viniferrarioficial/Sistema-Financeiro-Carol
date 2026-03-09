import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { LoginScreen } from './LoginScreen';
import { DashboardScreen } from './DashboardScreen';
import { SettingsScreen } from './SettingsScreen';
import { FinanceScreen } from './FinanceScreen';
import { AddTransactionScreen } from './AddTransactionScreen';
import { TransactionDetailScreen } from './TransactionDetailScreen';
import { AllTransactionsScreen } from './AllTransactionsScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Receipt, Settings as SettingsIcon } from 'lucide-react';
import { cn } from './lib/utils';

type Screen = 'login' | 'bi' | 'perfil' | 'contas' | 'add-transaction' | 'transaction-detail' | 'all-transactions';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [loading, setLoading] = useState(true);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setCurrentScreen('bi');
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setCurrentScreen('bi');
      } else {
        setCurrentScreen('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentScreen('login');
  };

  const openTransactionDetail = (id: string) => {
    setSelectedTransactionId(id);
    setCurrentScreen('transaction-detail');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <p className="font-extrabold text-primary animate-pulse">Carregando...</p>
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={() => setCurrentScreen('bi')} />;
      case 'bi':
        return <DashboardScreen onLogout={handleLogout} />;
      case 'perfil':
        return <SettingsScreen onLogout={handleLogout} />;
      case 'contas':
        return (
          <FinanceScreen
            onLogout={handleLogout}
            onAddTransaction={() => setCurrentScreen('add-transaction')}
            onSelectTransaction={openTransactionDetail}
            onSeeAll={() => setCurrentScreen('all-transactions')}
          />
        );
      case 'add-transaction':
        return (
          <AddTransactionScreen
            onBack={() => setCurrentScreen('contas')}
            onSave={() => setCurrentScreen('contas')}
          />
        );
      case 'transaction-detail':
        return (
          <TransactionDetailScreen
            transactionId={selectedTransactionId!}
            onBack={() => setCurrentScreen('contas')}
          />
        );
      case 'all-transactions':
        return (
          <AllTransactionsScreen
            onBack={() => setCurrentScreen('contas')}
            onSelectTransaction={openTransactionDetail}
          />
        );
      default:
        return <LoginScreen onLogin={() => setCurrentScreen('bi')} />;
    }
  };

  const showNav = !['login', 'add-transaction', 'transaction-detail', 'all-transactions'].includes(currentScreen);

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
      {showNav && (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-t border-slate-200 pb-safe pt-3 lg:pb-3 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto flex justify-around px-4">
            <button
              onClick={() => setCurrentScreen('bi')}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors px-10 py-1 rounded-2xl",
                currentScreen === 'bi' ? "text-primary" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className="h-6 flex items-center">
                <LayoutGrid size={24} className={currentScreen === 'bi' ? "fill-primary/20" : ""} />
              </div>
              <p className="text-[11px] font-extrabold uppercase tracking-widest mt-1">BI</p>
            </button>
            <button
              onClick={() => setCurrentScreen('contas')}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors px-10 py-1 rounded-2xl",
                currentScreen === 'contas' ? "text-primary" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className="h-6 flex items-center">
                <Receipt size={24} className={currentScreen === 'contas' ? "fill-primary/20" : ""} />
              </div>
              <p className="text-[11px] font-extrabold uppercase tracking-widest mt-1">Contas</p>
            </button>
            <button
              onClick={() => setCurrentScreen('perfil')}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors px-10 py-1 rounded-2xl",
                currentScreen === 'perfil' ? "text-primary" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className="h-6 flex items-center">
                <SettingsIcon size={24} className={currentScreen === 'perfil' ? "fill-primary/20" : ""} />
              </div>
              <p className="text-[11px] font-extrabold uppercase tracking-widest mt-1">Perfil</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
