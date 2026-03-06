import React from 'react';
import {
  Menu,
  Search,
  Bell,
  TrendingUp,
  Calendar,
  ShoppingCart,
  Plus,
  Banknote,
  Tv
} from 'lucide-react';

interface FinanceScreenProps {
  onAddTransaction: () => void;
}

export const FinanceScreen: React.FC<FinanceScreenProps> = ({ onAddTransaction }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light w-full pb-32 lg:pb-8">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-background-light/80 backdrop-blur-md z-20 w-full max-w-7xl mx-auto border-x-0 lg:border-x border-primary/5">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2.5 rounded-xl text-primary cursor-pointer hover:bg-primary/20 transition-colors">
            <Menu size={24} />
          </div>
          <h2 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900">Finanças</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-full hover:bg-primary/10 text-slate-600 transition-colors cursor-pointer">
            <Search size={22} />
          </button>
          <button className="p-2.5 rounded-full hover:bg-primary/10 text-slate-600 relative transition-colors cursor-pointer">
            <Bell size={22} />
            <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5 rounded-full bg-primary border-2 border-background-light"></span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto border-x-0 lg:border-x border-primary/5 min-h-screen">
        {/* Summary Cards */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 p-4 lg:px-6">
          <div className="flex min-w-[180px] flex-1 flex-col gap-1 rounded-2xl p-5 md:p-6 bg-white shadow-sm border border-primary/5">
            <p className="text-slate-500 text-[10px] md:text-xs font-extrabold uppercase tracking-widest">Saldo Total</p>
            <p className="text-2xl md:text-3xl font-extrabold leading-tight text-slate-900">R$ 12.450,00</p>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-extrabold mt-2">
              <TrendingUp size={16} />
              <span>+8.2%</span>
            </div>
          </div>
          <div className="flex min-w-[180px] flex-1 flex-col gap-1 rounded-2xl p-5 md:p-6 bg-primary text-white shadow-xl shadow-primary/20">
            <p className="text-white/70 text-[10px] md:text-xs font-extrabold uppercase tracking-widest">Despesas Mês</p>
            <p className="text-2xl md:text-3xl font-extrabold leading-tight">R$ 3.120,50</p>
            <div className="flex items-center gap-1 text-white/80 text-xs font-extrabold mt-2">
              <Calendar size={16} />
              <span>Outubro</span>
            </div>
          </div>
        </div>

        {/* Transactions List Section */}
        <div className="flex items-center justify-between px-4 lg:px-6 pt-4">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">Transações Recentes</h2>
          <button className="text-primary text-sm font-extrabold hover:underline cursor-pointer">Ver Tudo</button>
        </div>

        <div className="flex flex-col gap-4 p-4 lg:px-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {/* Transaction Item 1 */}
          <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl shadow-sm border border-primary/5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <ShoppingCart size={24} />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-base md:text-lg">Supermercado Prudente</p>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">Mercadoria • Mensal</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-50">
              <p className="font-extrabold text-rose-500 text-lg">- R$ 450,20</p>
              <div className="flex gap-4 text-right">
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Unidade</p>
                  <p className="text-xs font-bold text-slate-700">Prudente</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Pgto</p>
                  <p className="text-xs font-bold text-slate-700">Débito</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Item 2 */}
          <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl shadow-sm border border-primary/5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
                  <Banknote size={24} />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-base md:text-lg">Venda Loja Machado</p>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">Loja • Semanal</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-50">
              <p className="font-extrabold text-emerald-500 text-lg">+ R$ 5.500,00</p>
              <div className="flex gap-4 text-right">
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Unidade</p>
                  <p className="text-xs font-bold text-slate-700">Machado</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Pgto</p>
                  <p className="text-xs font-bold text-slate-700">Pix</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Item 3 */}
          <div className="flex flex-col gap-4 bg-white p-5 rounded-2xl shadow-sm border border-primary/5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Tv size={24} />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-base md:text-lg">Manutenção Internet</p>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">Internet • Despesa</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-50">
              <p className="font-extrabold text-rose-500 text-lg">- R$ 150,00</p>
              <div className="flex gap-4 text-right">
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Unidade</p>
                  <p className="text-xs font-bold text-slate-700">Pirapó</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Pgto</p>
                  <p className="text-xs font-bold text-slate-700">Boleto</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <button
          onClick={onAddTransaction}
          className="fixed bottom-28 lg:bottom-12 right-6 lg:right-12 h-14 w-14 lg:h-16 lg:w-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center z-30 transform hover:scale-110 active:scale-95 transition-all outline-none cursor-pointer"
        >
          <Plus size={32} className="lg:w-8 lg:h-8" />
        </button>
      </div>
    </div>
  );
};

