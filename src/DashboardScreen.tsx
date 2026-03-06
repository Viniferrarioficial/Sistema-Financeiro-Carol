import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Search,
  Bell,
  BarChart3,
  PieChart,
  DollarSign,
  LayoutGrid,
  Settings,
  ArrowUpRight,
  Wallet
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 75 },
  { name: 'Mar', value: 60 },
  { name: 'Apr', value: 95 },
  { name: 'May', value: 50 },
  { name: 'Jun', value: 85 },
];

export const DashboardScreen: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light max-w-[480px] mx-auto w-full pb-24">
      {/* Header */}
      <header className="flex items-center bg-background-light p-4 sticky top-0 z-10 border-b border-primary/10">
        <div className="flex size-12 shrink-0 items-center justify-center bg-primary/10 rounded-xl text-primary">
          <TrendingUp size={28} />
        </div>
        <div className="flex-1 px-3">
          <h1 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900">Gestão de Lojas</h1>
          <p className="text-xs font-bold text-slate-500">Painel de Performance Empresarial</p>
        </div>
        <div className="flex gap-2">
          <button className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Search size={20} />
          </button>
          <button className="flex size-10 items-center justify-center rounded-full bg-primary text-white">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* KPI Section */}
      <section className="grid grid-cols-2 gap-4 p-4">
        <div className="flex flex-col gap-2 rounded-2xl p-5 bg-white shadow-sm border border-primary/5">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Receita Total</p>
            <DollarSign className="text-primary w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">R$ 124.500</p>
          <div className="flex items-center gap-1">
            <TrendingUp className="text-emerald-500 w-4 h-4" />
            <p className="text-emerald-500 text-sm font-bold">+12.5%</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-2xl p-5 bg-white shadow-sm border border-primary/5">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Lucro Líquido</p>
            <Wallet className="text-primary w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">R$ 42.200</p>
          <div className="flex items-center gap-1">
            <TrendingDown className="text-rose-500 w-4 h-4" />
            <p className="text-rose-500 text-sm font-bold">-2.4%</p>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-2 rounded-2xl p-5 bg-white shadow-sm border border-primary/5">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Market Share</p>
            <PieChart className="text-primary w-5 h-5" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">18.4%</p>
          <div className="flex items-center gap-1">
            <TrendingUp className="text-emerald-500 w-4 h-4" />
            <p className="text-emerald-500 text-sm font-bold">+5.1%</p>
          </div>
        </div>
      </section>

      {/* Main Charts Area */}
      <main className="flex flex-col gap-6 px-4">
        {/* Monthly Balance Bar Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-primary/5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Balanço Mensal</h2>
              <p className="text-sm font-medium text-slate-500">Visão geral de 2024</p>
            </div>
            <div className="flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-full">
              <span className="text-primary text-sm font-extrabold">R$ 42.200</span>
              <ArrowUpRight className="text-emerald-500 w-4 h-4" />
            </div>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#6567f1" fillOpacity={0.2 + (entry.value / 100) * 0.8} />
                  ))}
                </Bar>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-primary/5">
          <h2 className="text-lg font-extrabold mb-4 text-slate-900">Receita por Categoria</h2>
          <div className="flex items-center gap-6">
            <div className="relative size-32 rounded-full border-[12px] border-primary flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[12px] border-emerald-400" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 50%)' }}></div>
              <div className="absolute inset-0 rounded-full border-[12px] border-amber-400" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
              <span className="text-[10px] font-extrabold text-slate-500 uppercase">Lojas</span>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-primary"></div>
                  <span className="text-slate-600 font-bold">Machado</span>
                </div>
                <span className="font-extrabold">45%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-emerald-400"></div>
                  <span className="text-slate-600 font-bold">Prudente</span>
                </div>
                <span className="font-extrabold">25%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-amber-400"></div>
                  <span className="text-slate-600 font-bold">Pirapó</span>
                </div>
                <span className="font-extrabold">30%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Suppliers */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-primary/5">
          <h2 className="text-lg font-extrabold mb-4 text-slate-900">Maiores Fornecedores</h2>
          <div className="flex flex-col gap-5">
            {[
              { id: 'TC', name: 'TechCorp Solutions', plan: 'Suporte Sistema', amount: '- R$ 12.400' },
              { id: 'GN', name: 'Global Nexus', plan: 'Mercadorias', amount: '- R$ 8.200' },
              { id: 'AV', name: 'Apex Ventures', plan: 'Consultoria', amount: '- R$ 5.100' }
            ].map((customer) => (
              <div key={customer.id} className="flex items-center gap-3">
                <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-extrabold">
                  {customer.id}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-extrabold text-slate-900">{customer.name}</p>
                  <p className="text-xs font-bold text-slate-500">{customer.plan}</p>
                </div>
                <p className="text-sm font-extrabold text-rose-500">{customer.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
