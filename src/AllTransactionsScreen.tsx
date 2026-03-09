import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import {
    ArrowLeft,
    Search,
    Filter,
    LayoutGrid,
    List,
    Download,
    ChevronDown,
    Banknote,
    ShoppingCart
} from 'lucide-react';
import { cn } from './lib/utils';

interface AllTransactionsScreenProps {
    onBack: () => void;
    onSelectTransaction: (id: string) => void;
}

export const AllTransactionsScreen: React.FC<AllTransactionsScreenProps> = ({
    onBack,
    onSelectTransaction
}) => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Filters state
    const [filters, setFilters] = useState({
        period: 'all',
        costCenter: 'all',
        category: 'all',
        type: 'all'
    });

    const [options, setOptions] = useState<any>({
        periods: [],
        costCenters: [],
        categories: []
    });

    useEffect(() => {
        fetchOptions();
        fetchTransactions();
    }, []);

    const fetchOptions = async () => {
        const [p, cc, cat] = await Promise.all([
            supabase.from('periods').select('*'),
            supabase.from('cost_centers').select('*'),
            supabase.from('categories').select('*')
        ]);

        setOptions({
            periods: p.data || [],
            costCenters: cc.data || [],
            categories: cat.data || []
        });
    };

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
        } catch (err) {
            console.error('Error fetching transactions:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.cost_centers?.name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPeriod = filters.period === 'all' || t.period_id === filters.period;
        const matchesCostCenter = filters.costCenter === 'all' || t.cost_center_id === filters.costCenter;
        const matchesCategory = filters.category === 'all' || t.category_id === filters.category;
        const matchesType = filters.type === 'all' || t.type === filters.type;

        return matchesSearch && matchesPeriod && matchesCostCenter && matchesCategory && matchesType;
    });

    return (
        <div className="flex flex-col min-h-screen bg-background-light w-full">
            {/* Header */}
            <header className="sticky top-0 bg-white/80 backdrop-blur-md z-30 border-b border-slate-100">
                <div className="max-w-7xl mx-auto p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-900">
                                <ArrowLeft size={24} />
                            </button>
                            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">Todos os Lançamentos</h1>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setViewMode('cards')}
                                className={cn(
                                    "p-2 rounded-lg transition-all cursor-pointer",
                                    viewMode === 'cards' ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <LayoutGrid size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    "p-2 rounded-lg transition-all cursor-pointer",
                                    viewMode === 'list' ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                className="w-full bg-slate-100 border-none rounded-2xl h-11 pl-12 pr-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={cn(
                                "px-4 h-11 rounded-2xl font-extrabold flex items-center gap-2 transition-all cursor-pointer",
                                showFilters ? "bg-primary text-white" : "bg-white border border-slate-200 text-slate-600"
                            )}
                        >
                            <Filter size={18} />
                            <span className="hidden md:inline">Filtros</span>
                        </button>
                        <button className="h-11 w-11 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 hover:bg-emerald-100 transition-colors cursor-pointer">
                            <Download size={20} />
                        </button>
                    </div>

                    {/* Expanded Filters */}
                    {showFilters && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 animate-in fade-in slide-in-from-top-2">
                            <FilterSelect
                                label="Período"
                                value={filters.period}
                                onChange={(v) => setFilters({ ...filters, period: v })}
                                options={options.periods}
                            />
                            <FilterSelect
                                label="Unidade"
                                value={filters.costCenter}
                                onChange={(v) => setFilters({ ...filters, costCenter: v })}
                                options={options.costCenters}
                            />
                            <FilterSelect
                                label="Categoria"
                                value={filters.category}
                                onChange={(v) => setFilters({ ...filters, category: v })}
                                options={options.categories}
                            />
                            <FilterSelect
                                label="Tipo"
                                value={filters.type}
                                onChange={(v) => setFilters({ ...filters, type: v })}
                                options={[{ id: 'income', name: 'Receita' }, { id: 'expense', name: 'Despesa' }]}
                            />
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto p-4">
                {loading ? (
                    <div className="py-20 text-center font-bold text-slate-400">Carregando lançamentos...</div>
                ) : filteredTransactions.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="font-extrabold text-slate-400">Nenhum lançamento encontrado com esses filtros.</p>
                        <button
                            onClick={() => { setFilters({ period: 'all', costCenter: 'all', category: 'all', type: 'all' }); setSearchTerm(''); }}
                            className="mt-4 text-primary font-bold hover:underline"
                        >
                            Limpar Filtros
                        </button>
                    </div>
                ) : viewMode === 'cards' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTransactions.map(t => (
                            <div
                                key={t.id}
                                onClick={() => onSelectTransaction(t.id)}
                                className="bg-surface-light p-5 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                                        t.type === 'income' ? "bg-primary/20 text-primary" : "bg-slate-200 text-slate-500"
                                    )}>
                                        {t.type === 'income' ? <Banknote size={24} /> : <ShoppingCart size={24} />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-extrabold text-slate-900 line-clamp-1">{t.description}</p>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.categories?.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <p className={cn(
                                        "text-xl font-extrabold",
                                        t.type === 'income' ? "text-primary" : "text-slate-500"
                                    )}>
                                        {t.type === 'income' ? '+' : '-'} {formatCurrency(Number(t.amount))}
                                    </p>
                                    <p className="text-xs font-bold text-slate-500">{t.cost_centers?.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-surface-light rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
                                        <th className="px-6 py-4">Data</th>
                                        <th className="px-6 py-4">Descrição</th>
                                        <th className="px-6 py-4">Unidade</th>
                                        <th className="px-6 py-4">Categoria</th>
                                        <th className="px-6 py-4">Valor</th>
                                        <th className="px-6 py-4">Tipo</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredTransactions.map(t => (
                                        <tr
                                            key={t.id}
                                            onClick={() => onSelectTransaction(t.id)}
                                            className="hover:bg-slate-50 cursor-pointer transition-colors group"
                                        >
                                            <td className="px-6 py-4 text-sm font-bold text-slate-500">
                                                {new Date(t.transaction_date).toLocaleDateString('pt-BR')}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-extrabold text-slate-900">
                                                {t.description}
                                            </td>
                                            <td className="px-6 py-4 text-xs font-extrabold text-slate-500">
                                                {t.cost_centers?.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                                                    {t.categories?.name}
                                                </span>
                                            </td>
                                            <td className={cn(
                                                "px-6 py-4 text-sm font-extrabold",
                                                t.type === 'income' ? "text-primary" : "text-slate-500"
                                            )}>
                                                {t.type === 'income' ? '+' : '-'} {formatCurrency(Number(t.amount))}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full",
                                                    t.type === 'income' ? "bg-primary" : "bg-slate-400"
                                                )}></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const FilterSelect = ({ label, value, onChange, options }: any) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">{label}</label>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 h-10 text-xs font-bold text-slate-700 appearance-none outline-none focus:border-primary transition-all cursor-pointer pr-8"
            >
                <option value="all">Ver Tudo</option>
                {options.map((o: any) => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
    </div>
);
