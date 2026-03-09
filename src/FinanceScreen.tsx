import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import {
  Menu,
  Search,
  LogOut,
  TrendingUp,
  Calendar,
  ShoppingCart,
  Plus,
  Banknote,
  Tv
} from 'lucide-react';
import { cn } from './lib/utils';

interface FinanceScreenProps {
  onAddTransaction: () => void;
  onSelectTransaction: (id: string) => void;
  onSeeAll: () => void;
  onLogout?: () => void;
}

export const FinanceScreen: React.FC<FinanceScreenProps> = ({
  onAddTransaction,
  onSelectTransaction,
  onSeeAll,
  onLogout
}) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ balance: 0, expenses: 0 });
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          cost_centers (name),
          categories (name),
          payment_methods (name),
          periods (name)
        `)
        .order('transaction_date', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);

      // Calculate totals
      const balance = (data || []).reduce((acc: number, t: any) =>
        t.type === 'income' ? acc + Number(t.amount) : acc - Number(t.amount), 0);

      const currentMonth = new Date().getMonth();
      const expenses = (data || [])
        .filter((t: any) => t.type === 'expense' && new Date(t.transaction_date).getMonth() === currentMonth)
        .reduce((acc: number, t: any) => acc + Number(t.amount), 0);

      setTotals({ balance, expenses });
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMonthName = () => {
    return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date());
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const filteredTransactions = transactions.filter(t =>
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.categories?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.cost_centers?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background-light w-full pb-32 lg:pb-12">
      {/* Header */}
      <div className="flex flex-col sticky top-0 bg-background-light/80 backdrop-blur-md z-30 w-full max-w-7xl mx-auto border-b border-primary/5">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-xl text-primary cursor-pointer hover:bg-primary/20 transition-colors">
              <Menu size={24} />
            </div>
            <h2 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900">Contas</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearching(!isSearching)}
              className={cn(
                "p-2.5 rounded-full transition-colors cursor-pointer",
                isSearching ? "bg-primary text-white" : "hover:bg-primary/10 text-slate-600"
              )}
            >
              <Search size={22} />
            </button>
            <button
              onClick={onLogout}
              className="p-2.5 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 relative transition-colors cursor-pointer shadow-sm border border-rose-100"
            >
              <LogOut size={22} />
            </button>
          </div>
        </div>

        {/* Search Bar Expansion */}
        {isSearching && (
          <div className="px-4 pb-4 transition-all animate-in slide-in-from-top-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                autoFocus
                type="text"
                placeholder="Pesquisar por descrição, unidade ou categoria..."
                className="w-full bg-slate-100 border-none rounded-2xl h-12 pl-12 pr-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-7xl mx-auto border-x-0 lg:border-x border-primary/5 min-h-screen">
        {/* Summary Cards */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 p-4 lg:px-6">
          <div className="flex min-w-[180px] flex-1 flex-col gap-1 rounded-2xl p-5 md:p-6 bg-white shadow-sm border border-primary/5">
            <p className="text-slate-500 text-[10px] md:text-xs font-extrabold uppercase tracking-widest">Saldo Total</p>
            <p className="text-2xl md:text-3xl font-extrabold leading-tight text-slate-900">{formatCurrency(totals.balance)}</p>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-extrabold mt-2">
              <TrendingUp size={16} />
              <span>Saldo Atual</span>
            </div>
          </div>
          <div className="flex min-w-[180px] flex-1 flex-col gap-1 rounded-2xl p-5 md:p-6 bg-primary text-white shadow-xl shadow-primary/20">
            <p className="text-white/70 text-[10px] md:text-xs font-extrabold uppercase tracking-widest">Despesas Mês</p>
            <p className="text-2xl md:text-3xl font-extrabold leading-tight">{formatCurrency(totals.expenses)}</p>
            <div className="flex items-center gap-1 text-white/80 text-xs font-extrabold mt-2">
              <Calendar size={16} />
              <span className="capitalize">{getMonthName()}</span>
            </div>
          </div>
        </div>

        {/* Transactions List Section */}
        <div className="flex items-center justify-between px-4 lg:px-6 pt-4">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">Transações Recentes</h2>
          <button
            onClick={onSeeAll}
            className="text-primary text-sm font-extrabold hover:underline cursor-pointer"
          >
            Ver Tudo
          </button>
        </div>

        <div className="flex flex-col gap-4 p-4 lg:px-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-10 text-center font-bold text-slate-500">Carregando transações...</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="col-span-full py-10 text-center font-bold text-slate-500">Nenhuma transação encontrada.</div>
          ) : (
            filteredTransactions.map((t) => (
              <div
                key={t.id}
                onClick={() => onSelectTransaction(t.id)}
                className="flex flex-col gap-4 bg-surface-light p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl shrink-0",
                      t.type === 'income' ? "bg-primary/20 text-primary" : "bg-slate-200 text-slate-500"
                    )}>
                      {t.type === 'income' ? <Banknote size={24} /> : <ShoppingCart size={24} />}
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900 text-base md:text-lg">{t.description}</p>
                      <p className="text-xs font-bold text-slate-500 mt-0.5">
                        {t.categories?.name} • {t.periods?.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                  <p className={cn(
                    "font-extrabold text-lg",
                    t.type === 'income' ? "text-primary" : "text-slate-500"
                  )}>
                    {t.type === 'income' ? '+' : '-'} {formatCurrency(Number(t.amount))}
                  </p>
                  <div className="flex gap-4 text-right">
                    <div>
                      <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Unidade</p>
                      <p className="text-xs font-bold text-slate-700">{t.cost_centers?.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Pgto</p>
                      <p className="text-xs font-bold text-slate-700">{t.payment_methods?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floating Action Button - Moved up to avoid nav bar */}
        <button
          onClick={onAddTransaction}
          className="fixed bottom-[110px] right-6 lg:right-12 h-14 w-14 lg:h-16 lg:w-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center z-[90] transform hover:scale-110 active:scale-95 transition-all outline-none cursor-pointer"
        >
          <Plus size={32} className="lg:w-8 lg:h-8" />
        </button>
      </div>
    </div>
  );
};

