import React from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  TrendingUp, 
  Calendar, 
  ShoppingCart, 
  Plus,
  LayoutGrid,
  Receipt,
  BarChart3,
  Settings,
  CreditCard,
  Banknote,
  Tv,
  Car
} from 'lucide-react';

export const FinanceScreen: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light max-w-[480px] mx-auto w-full pb-24 border-x border-primary/5">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-background-light/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
            <Menu size={24} />
          </div>
          <h2 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900">Finanças</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-full hover:bg-primary/10 text-slate-600 transition-colors">
            <Search size={22} />
          </button>
          <button className="p-2.5 rounded-full hover:bg-primary/10 text-slate-600 relative transition-colors">
            <Bell size={22} />
            <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5 rounded-full bg-primary border-2 border-background-light"></span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="flex gap-4 p-4 overflow-x-auto no-scrollbar">
        <div className="flex min-w-[180px] flex-1 flex-col gap-1 rounded-2xl p-5 bg-white shadow-sm border border-primary/5">
          <p className="text-slate-500 text-[10px] font-extrabold uppercase tracking-widest">Saldo Total</p>
          <p className="text-2xl font-extrabold leading-tight text-slate-900">R$ 12.450,00</p>
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-extrabold mt-2">
            <TrendingUp size={14} />
            <span>+8.2%</span>
          </div>
        </div>
        <div className="flex min-w-[180px] flex-1 flex-col gap-1 rounded-2xl p-5 bg-primary text-white shadow-xl shadow-primary/20">
          <p className="text-white/70 text-[10px] font-extrabold uppercase tracking-widest">Despesas Mês</p>
          <p className="text-2xl font-extrabold leading-tight">R$ 3.120,50</p>
          <div className="flex items-center gap-1 text-white/80 text-xs font-extrabold mt-2">
            <Calendar size={14} />
            <span>Outubro</span>
          </div>
        </div>
      </div>

      {/* Transactions List Section */}
      <div className="flex items-center justify-between px-4 pt-4">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Transações Recentes</h2>
        <button className="text-primary text-sm font-extrabold hover:underline">Ver Tudo</button>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {/* Transaction Item 1 */}
        <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm border border-primary/5">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShoppingCart size={24} />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">Supermercado Silva</p>
                <p className="text-xs font-bold text-slate-500">Alimentação • 12 Out 2023</p>
              </div>
            </div>
            <p className="font-extrabold text-rose-500 text-right">- R$ 450,20</p>
          </div>
          <div className="grid grid-cols-2 gap-y-2 pt-3 border-t border-slate-50">
            <div>
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Centro de Custo</p>
              <p className="text-xs font-bold text-slate-700">Pessoal / Casa</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Pagamento</p>
              <p className="text-xs font-bold text-slate-700">Cartão de Crédito</p>
            </div>
          </div>
        </div>

        {/* Transaction Item 2 */}
        <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm border border-primary/5">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Banknote size={24} />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">Salário Mensal</p>
                <p className="text-xs font-bold text-slate-500">Renda • 05 Out 2023</p>
              </div>
            </div>
            <p className="font-extrabold text-emerald-500 text-right">+ R$ 5.500,00</p>
          </div>
          <div className="grid grid-cols-2 gap-y-2 pt-3 border-t border-slate-50">
            <div>
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Centro de Custo</p>
              <p className="text-xs font-bold text-slate-700">Empresa ABC</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Pagamento</p>
              <p className="text-xs font-bold text-slate-700">PIX / Transferência</p>
            </div>
          </div>
        </div>

        {/* Transaction Item 3 */}
        <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm border border-primary/5">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Tv size={24} />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">Netflix Premium</p>
                <p className="text-xs font-bold text-slate-500">Lazer • 02 Out 2023</p>
              </div>
            </div>
            <p className="font-extrabold text-rose-500 text-right">- R$ 55,90</p>
          </div>
          <div className="grid grid-cols-2 gap-y-2 pt-3 border-t border-slate-50">
            <div>
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Centro de Custo</p>
              <p className="text-xs font-bold text-slate-700">Entretenimento</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Pagamento</p>
              <p className="text-xs font-bold text-slate-700">Cartão Digital</p>
            </div>
          </div>
        </div>

        {/* Transaction Item 4 */}
        <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm border border-primary/5">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Car size={24} />
              </div>
              <div>
                <p className="font-extrabold text-slate-900">Posto Ipiranga</p>
                <p className="text-xs font-bold text-slate-500">Transporte • 28 Set 2023</p>
              </div>
            </div>
            <p className="font-extrabold text-rose-500 text-right">- R$ 220,00</p>
          </div>
          <div className="grid grid-cols-2 gap-y-2 pt-3 border-t border-slate-50">
            <div>
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Centro de Custo</p>
              <p className="text-xs font-bold text-slate-700">Automóvel</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest">Pagamento</p>
              <p className="text-xs font-bold text-slate-700">Débito</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-28 right-6 h-14 w-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center z-30 transform hover:scale-110 active:scale-95 transition-all">
        <Plus size={32} />
      </button>
    </div>
  );
};
