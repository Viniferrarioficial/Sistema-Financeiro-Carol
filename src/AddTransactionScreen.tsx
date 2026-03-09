import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import {
    ArrowLeft,
    Save,
    Calendar,
    Building2,
    FileText,
    Tag,
    CreditCard,
    CircleDollarSign
} from 'lucide-react';
import { cn } from './lib/utils';

interface AddTransactionScreenProps {
    onBack: () => void;
    onSave: () => void;
}

export const AddTransactionScreen: React.FC<AddTransactionScreenProps> = ({ onBack, onSave }) => {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<any>({
        periods: [],
        costCenters: [],
        categories: [],
        paymentMethods: []
    });

    const [formData, setFormData] = useState({
        periodo: '',
        centroCusto: '',
        descricao: '',
        categoria: '',
        formaPagamento: '',
        valor: '',
        tipo: 'expense' as 'income' | 'expense'
    });

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        const [p, cc, cat, pm] = await Promise.all([
            supabase.from('periods').select('*'),
            supabase.from('cost_centers').select('*'),
            supabase.from('categories').select('*'),
            supabase.from('payment_methods').select('*')
        ]);

        setOptions({
            periods: p.data || [],
            costCenters: cc.data || [],
            categories: cat.data || [],
            paymentMethods: pm.data || []
        });

        // Set defaults
        if (p.data?.length) setFormData(prev => ({ ...prev, periodo: p.data[0].id }));
        if (cc.data?.length) setFormData(prev => ({ ...prev, centroCusto: cc.data[0].id }));
        if (cat.data?.length) setFormData(prev => ({ ...prev, categoria: cat.data[0].id }));
        if (pm.data?.length) setFormData(prev => ({ ...prev, formaPagamento: pm.data[0].id }));
    };

    const handleSave = async () => {
        if (!formData.valor || !formData.descricao) {
            alert('Preencha o valor e a descrição');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from('transactions').insert({
                cost_center_id: formData.centroCusto,
                period_id: formData.periodo,
                category_id: formData.categoria,
                payment_method_id: formData.formaPagamento,
                description: formData.descricao,
                amount: parseFloat(formData.valor.replace(',', '.')),
                type: formData.tipo
            });

            if (error) throw error;
            onSave();
        } catch (err) {
            console.error('Error saving transaction:', err);
            alert('Erro ao salvar lançamento');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light w-full pb-10">
            {/* Header */}
            <div className="flex items-center p-4 sticky top-0 bg-background-light/80 backdrop-blur-md z-10 border-b border-primary/5 w-full max-w-7xl mx-auto">
                <button
                    onClick={onBack}
                    className="text-slate-900 p-2 hover:bg-primary/10 rounded-full transition-colors cursor-pointer"
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-lg font-extrabold flex-1 ml-2 text-slate-900">Novo Lançamento</h2>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className={cn(
                        "bg-primary text-white font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer hover:bg-primary/90",
                        loading && "opacity-70 cursor-not-allowed"
                    )}
                >
                    <Save size={18} />
                    {loading ? "Salvando..." : "Salvar"}
                </button>
            </div>

            <div className="flex-1 p-6 w-full max-w-3xl mx-auto space-y-6">
                {/* Valor Highlight */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-primary/5">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Valor do Lançamento</p>
                    <div className="relative">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl font-extrabold text-slate-400">R$</span>
                        <input
                            type="text"
                            placeholder="0,00"
                            className="w-full bg-transparent border-none focus:ring-0 text-4xl font-extrabold text-slate-900 pl-10 placeholder:text-slate-200 outline-none"
                            value={formData.valor}
                            onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                        />
                    </div>
                </div>

                {/* Tipo de Lançamento */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setFormData({ ...formData, tipo: 'expense' })}
                        className={cn(
                            "flex-1 py-3 rounded-2xl font-bold border transition-all cursor-pointer",
                            formData.tipo === 'expense' ? "bg-rose-500 text-white border-rose-500" : "bg-white text-rose-500 border-rose-100"
                        )}
                    >
                        Despesa
                    </button>
                    <button
                        onClick={() => setFormData({ ...formData, tipo: 'income' })}
                        className={cn(
                            "flex-1 py-3 rounded-2xl font-bold border transition-all cursor-pointer",
                            formData.tipo === 'income' ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-emerald-500 border-emerald-100"
                        )}
                    >
                        Receita
                    </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-5">
                    {/* Período */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-500 ml-1">
                            <Calendar size={14} className="text-primary" />
                            Período
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {options.periods.map((p: any) => (
                                <button
                                    key={p.id}
                                    onClick={() => setFormData({ ...formData, periodo: p.id })}
                                    className={cn(
                                        "py-3 px-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer",
                                        formData.periodo === p.id
                                            ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                            : "bg-white text-slate-600 border-slate-100 hover:border-primary/30"
                                    )}
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Centro de Custo */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-500 ml-1">
                            <Building2 size={14} className="text-primary" />
                            Centro de Custo
                        </label>
                        <select
                            className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-base font-bold text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
                            value={formData.centroCusto}
                            onChange={(e) => setFormData({ ...formData, centroCusto: e.target.value })}
                        >
                            {options.costCenters.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>

                    {/* Descrição */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-500 ml-1">
                            <FileText size={14} className="text-primary" />
                            Descrição
                        </label>
                        <input
                            type="text"
                            placeholder="Ex: Compra de suprimentos"
                            className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-base font-bold text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-slate-300"
                            value={formData.descricao}
                            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                        />
                    </div>

                    {/* Categoria */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-500 ml-1">
                            <Tag size={14} className="text-primary" />
                            Categoria
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {options.categories.map((cat: any) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFormData({ ...formData, categoria: cat.id })}
                                    className={cn(
                                        "py-2 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                                        formData.categoria === cat.id
                                            ? "bg-primary/10 text-primary border-primary/20"
                                            : "bg-white text-slate-500 border-slate-100 hover:border-primary/20"
                                    )}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Forma de Pagamento */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-500 ml-1">
                            <CreditCard size={14} className="text-primary" />
                            Forma de Pagamento
                        </label>
                        <select
                            className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-base font-bold text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
                            value={formData.formaPagamento}
                            onChange={(e) => setFormData({ ...formData, formaPagamento: e.target.value })}
                        >
                            {options.paymentMethods.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

