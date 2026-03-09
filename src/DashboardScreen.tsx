import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import {
  TrendingUp,
  Search,
  LogOut,
  DollarSign,
  Wallet,
  Calendar,
  Filter,
  ArrowUpCircle,
  ArrowDownCircle,
  ChevronDown
} from 'lucide-react';
import { cn } from './lib/utils';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Sector
} from 'recharts';

interface CompanyChartProps {
  title: string;
  data: any[];
}

const CompanyChart: React.FC<CompanyChartProps> = ({ title, data }) => {
  const revenue = data.find(i => i.name === 'Faturamento')?.value || 0;
  const cost = data.find(i => i.name === 'Custo')?.value || 0;
  const profit = revenue - cost;

  // Lógica da Pizza: O círculo total representa o maior valor entre Receita e Gasto
  // Se houver lucro: Mostra Custo vs Sobra (Lucro)
  // Se houver prejuízo: Mostra Receita vs Excesso (Prejuízo)
  const pieData = [
    { name: 'Faturamento', value: revenue, color: '#ff9a62' },
    { name: 'Custo', value: '#64748b' } // Cinza Slate bem distinto
  ].filter((_, idx) => (idx === 0 ? revenue > 0 : cost > 0));

  // Ajustando os valores para o Recharts
  const chartData = [
    { name: 'Faturamento', value: revenue, color: '#ff9a62' },
    { name: 'Custo', value: cost, color: '#64748b' }
  ].filter(i => i.value > 0);

  // Se ambos forem zero, mostra um círculo neutro
  if (chartData.length === 0) {
    chartData.push({ name: 'Sem Dados', value: 1, color: '#e2e8f0' });
  }

  return (
    <div className="rounded-2xl bg-surface-light p-6 shadow-sm border border-slate-200 flex flex-col h-full">
      <h2 className="text-lg font-extrabold mb-4 text-slate-900 w-full text-left">{title}</h2>

      <div className="flex flex-col gap-6">
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={chartData.length > 1 ? 5 : 0}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                itemStyle={{ fontWeight: 'bold' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-3 w-full">
          {data.map((item, idx) => {
            // Porcentagem calculada sobre o faturamento
            const percentage = revenue > 0 ? ((item.value / revenue) * 100).toFixed(1) : (item.value > 0 ? '100.0' : '0');
            return (
              <div key={idx} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.name === 'Custo' ? '#64748b' : item.color }} />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-slate-900">R$ {item.value.toLocaleString('pt-BR')}</p>
                  <p className="text-[10px] font-bold text-slate-400">
                    {item.name === 'Faturamento' ? '100% (Base)' : `${percentage}% ${item.name === 'Custo' ? 'da receita' : 'de margem'}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ title, items, type }: { title: string, items: any[], type: 'income' | 'expense' }) => (
  <div className="rounded-2xl bg-surface-light p-6 shadow-sm border border-slate-200 flex flex-col h-full">
    <div className="flex items-center gap-3 mb-4">
      <div className={cn(
        "p-2 rounded-lg",
        type === 'income' ? "bg-emerald-50 text-emerald-500" : "bg-primary/10 text-primary"
      )}>
        {type === 'income' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
      </div>
      <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">{title}</h3>
    </div>
    <div className="flex flex-col gap-4">
      {items.length === 0 ? (
        <p className="text-xs font-bold text-slate-400 py-4 text-center">Nenhum dado encontrado</p>
      ) : (
        items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0">
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-slate-900 line-clamp-1">{item.description || item.category}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{item.category}</span>
            </div>
            <span className={cn(
              "text-sm font-extrabold",
              type === 'income' ? "text-emerald-500" : "text-primary"
            )}>
              R$ {Number(item.amount).toLocaleString('pt-BR')}
            </span>
          </div>
        ))
      )}
    </div>
  </div>
);

export const DashboardScreen: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'month' | 'range'>('month');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [customRange, setCustomRange] = useState({ start: '', end: '' });

  const [kpis, setKpis] = useState({ revenue: 0, profit: 0 });
  const [units, setUnits] = useState<any[]>([]);
  const [unitData, setUnitData] = useState<any>({});
  const [topItems, setTopItems] = useState<any>({});

  useEffect(() => {
    fetchDashboardData();
  }, [selectedMonth, customRange, filterType]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Definir as datas de início e fim
      let startDate, endDate;
      if (filterType === 'month') {
        startDate = `${selectedMonth}-01`;
        const lastDay = new Date(Number(selectedMonth.split('-')[0]), Number(selectedMonth.split('-')[1]), 0).getDate();
        endDate = `${selectedMonth}-${lastDay}`;
      } else {
        startDate = customRange.start || '2000-01-01';
        endDate = customRange.end || '2099-12-31';
      }

      // 0. Fetch Units
      const { data: unitsData } = await supabase.from('cost_centers').select('name');
      const unitList = unitsData?.map(u => u.name) || [];
      setUnits(unitList);

      // 1. Fetch Summary (para os gráficos de pizza)
      // Como não temos uma view com range de data flexível, vamos simular buscando as transações
      // e processando localmente ou usando a view existente se o filtro for compatível.
      // Para ser 100% correto com datas flexíveis, buscamos as transações do período.

      const { data: txs, error: txError } = await supabase
        .from('transactions')
        .select('*, cost_centers(name), categories(name)')
        .gte('transaction_date', startDate)
        .lte('transaction_date', endDate);

      if (txError) throw txError;

      // Processar dados para os gráficos de pizza
      const processedUnitData: any = {};
      let totalRevenue = 0;
      let totalProfit = 0;
      const processedTopItems: any = {};

      unitList.forEach(unit => {
        const unitTxs = txs?.filter(t => t.cost_centers?.name === unit) || [];
        const revenue = unitTxs.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
        const cost = unitTxs.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
        const profit = revenue - cost;

        // Limpar acentos para usar como chave de objeto
        const unitKey = unit.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        processedUnitData[unitKey] = [
          { name: 'Faturamento', value: revenue, color: '#ff9a62' },
          { name: 'Custo', value: cost, color: '#b8a9a2' },
          { name: 'Lucro', value: profit, color: '#ff7c50' },
        ];

        totalRevenue += revenue;
        totalProfit += profit;

        // Processar Top 5
        const sortedIncomes = [...unitTxs].filter(t => t.type === 'income')
          .sort((a, b) => b.amount - a.amount).slice(0, 5)
          .map(t => ({ description: t.description, amount: t.amount, category: t.categories?.name }));

        const sortedExpenses = [...unitTxs].filter(t => t.type === 'expense')
          .sort((a, b) => b.amount - a.amount).slice(0, 5)
          .map(t => ({ description: t.description, amount: t.amount, category: t.categories?.name }));

        processedTopItems[unitKey] = { incomes: sortedIncomes, expenses: sortedExpenses };
      });

      setUnitData(processedUnitData);
      setTopItems(processedTopItems);
      setKpis({ revenue: totalRevenue, profit: totalProfit });

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light w-full pb-32 lg:pb-12 transition-colors">
      {/* Header */}
      <header className="flex items-center bg-background-light p-4 sticky top-0 z-30 border-b border-primary/10 w-full max-w-7xl mx-auto">
        <div className="flex size-12 shrink-0 items-center justify-center bg-primary/10 rounded-xl text-primary">
          <TrendingUp size={28} />
        </div>
        <div className="flex-1 px-3">
          <h1 className="text-xl font-extrabold leading-tight tracking-tight text-slate-900">BI Performance</h1>
          <p className="text-xs font-bold text-slate-500">Gestão Consolidada</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onLogout}
            className="flex size-10 items-center justify-center rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors cursor-pointer shadow-sm border border-rose-100"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="w-full bg-surface-light border-b border-slate-200 sticky top-[73px] z-20">
        <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setFilterType('month')}
              className={cn(
                "flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all",
                filterType === 'month' ? "bg-white text-primary shadow-sm" : "text-slate-500"
              )}
            >
              Mensal
            </button>
            <button
              onClick={() => setFilterType('range')}
              className={cn(
                "flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all",
                filterType === 'range' ? "bg-white text-primary shadow-sm" : "text-slate-500"
              )}
            >
              Personalizado
            </button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {filterType === 'month' ? (
              <div className="relative w-full">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-4 h-4 pointer-events-none" />
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full md:w-48 bg-slate-100 border-none rounded-xl h-9 pl-9 pr-4 text-xs font-extrabold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="date"
                  value={customRange.start}
                  onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
                  className="flex-1 bg-slate-100 border-none rounded-xl h-9 px-3 text-[10px] font-extrabold text-slate-700 outline-none"
                />
                <span className="text-slate-400 font-bold">até</span>
                <input
                  type="date"
                  value={customRange.end}
                  onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
                  className="flex-1 bg-slate-100 border-none rounded-xl h-9 px-3 text-[10px] font-extrabold text-slate-700 outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto mt-4 px-4 lg:px-6">
        {/* KPI Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 rounded-2xl p-6 bg-surface-light shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Faturamento Período</p>
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="text-primary w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{formatCurrency(kpis.revenue)}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl p-6 bg-surface-light shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Resultado Líquido</p>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wallet className="text-primary w-5 h-5" />
              </div>
            </div>
            <p className={cn(
              "text-3xl font-extrabold",
              kpis.profit >= 0 ? "text-slate-900" : "text-rose-500"
            )}>{formatCurrency(kpis.profit)}</p>
          </div>
        </section>

        {/* Charts and Rankings */}
        <div className="flex flex-col gap-10 mt-8 mb-20">
          {/* Main Charts area */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-full py-10 text-center font-bold text-slate-500">Carregando performance...</div>
            ) : (
              units.map(unit => {
                const unitKey = unit.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return <CompanyChart key={unitKey} title={`Unidade ${unit}`} data={unitData[unitKey] || []} />;
              })
            )}
          </div>

          {/* Rankings area */}
          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-6 font-primary">Rankings de Performance (Top 5)</h2>
            <div className="flex flex-col gap-12">
              {/* Unit Group */}
              {units.map((unit) => {
                const unitKey = unit.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return (
                  <div key={unitKey} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-px bg-slate-200 flex-1" />
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">UNIDADE {unit}</span>
                      <div className="h-px bg-slate-200 flex-1" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <DetailCard
                        title="Maiores Recebimentos"
                        items={topItems[unitKey]?.incomes || []}
                        type="income"
                      />
                      <DetailCard
                        title="Maiores Gastos"
                        items={topItems[unitKey]?.expenses || []}
                        type="expense"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
