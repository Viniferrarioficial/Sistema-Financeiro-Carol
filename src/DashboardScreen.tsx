import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Search,
  Bell,
  DollarSign,
  Wallet
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const machadoData = [
  { name: 'Faturamento', value: 65000, color: '#10b981' },
  { name: 'Custo', value: 42000, color: '#f43f5e' },
  { name: 'Lucro', value: 23000, color: '#6567f1' },
];

const prudenteData = [
  { name: 'Faturamento', value: 38000, color: '#10b981' },
  { name: 'Custo', value: 25000, color: '#f43f5e' },
  { name: 'Lucro', value: 13000, color: '#6567f1' },
];

const pirapoData = [
  { name: 'Faturamento', value: 21500, color: '#10b981' },
  { name: 'Custo', value: 15300, color: '#f43f5e' },
  { name: 'Lucro', value: 6200, color: '#6567f1' },
];

const CompanyChart = ({ title, data }: { title: string, data: any[] }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm border border-primary/5 flex flex-col h-full items-center">
    <h2 className="text-lg font-extrabold mb-2 text-slate-900 w-full text-left">{title}</h2>
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
            itemStyle={{ fontWeight: 'bold' }}
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontWeight: 700, fontSize: '12px', color: '#64748b' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const DashboardScreen: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light w-full pb-24 lg:pb-8">
      {/* Header */}
      <header className="flex items-center bg-background-light p-4 sticky top-0 z-10 border-b border-primary/10 w-full max-w-7xl mx-auto">
        <div className="flex size-12 shrink-0 items-center justify-center bg-primary/10 rounded-xl text-primary">
          <TrendingUp size={28} />
        </div>
        <div className="flex-1 px-3">
          <h1 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900">Gestão de Lojas</h1>
          <p className="text-xs font-bold text-slate-500">Painel de Performance Empresarial</p>
        </div>
        <div className="flex gap-2">
          <button className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer">
            <Search size={20} />
          </button>
          <button className="flex size-10 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors cursor-pointer">
            <Bell size={20} />
          </button>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto">
        {/* KPI Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:px-6">
          <div className="flex flex-col gap-2 rounded-2xl p-6 bg-white shadow-sm border border-primary/5">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Receita Total</p>
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="text-primary w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">R$ 124.500</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="text-emerald-500 w-4 h-4" />
              <p className="text-emerald-500 text-sm font-bold">+12.5% em relação ao mês anterior</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl p-6 bg-white shadow-sm border border-primary/5">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Lucro Líquido</p>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wallet className="text-primary w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">R$ 42.200</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="text-rose-500 w-4 h-4" />
              <p className="text-rose-500 text-sm font-bold">-2.4% em relação ao mês anterior</p>
            </div>
          </div>
        </section>

        {/* Main Charts Area */}
        <main className="flex flex-col gap-6 px-4 lg:px-6 mt-2">
          <h2 className="text-lg font-extrabold text-slate-900">Performance por Unidade</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CompanyChart title="Unidade Machado" data={machadoData} />
            <CompanyChart title="Unidade Prudente" data={prudenteData} />
            <CompanyChart title="Unidade Pirapó" data={pirapoData} />
          </div>
        </main>
      </div>
    </div>
  );
};

