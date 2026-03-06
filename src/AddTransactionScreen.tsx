import React, { useState } from 'react';
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
    const [formData, setFormData] = useState({
        periodo: 'Mensal',
        centroCusto: 'Machado',
        descricao: '',
        categoria: 'Loja',
        formaPagamento: 'Pix',
        valor: ''
    });

    const periodos = ['Mensal', 'Semanal', 'Despesa'];
    const centrosCusto = ['Machado', 'Prudente', 'Pirapó'];
    const categorias = ['Loja', 'Mercadoria', 'Salário', 'Vale', 'Energia', 'Água', 'Sistema', 'Internet', 'Serviço'];
    const formasPagamento = ['Pix', 'Dinheiro', 'Boleto', 'Débito', 'Crédito'];

    return (
        <div className="flex flex-col min-h-screen bg-background-light max-w-[480px] mx-auto w-full pb-10">
            {/* Header */}
            <div className="flex items-center p-4 sticky top-0 bg-background-light/80 backdrop-blur-md z-10 border-b border-primary/5">
                <button
                    onClick={onBack}
                    className="text-slate-900 p-2 hover:bg-primary/10 rounded-full transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-lg font-extrabold flex-1 ml-2 text-slate-900">Novo Lançamento</h2>
                <button
                    onClick={onSave}
                    className="bg-primary text-white font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center gap-2"
                >
                    <Save size={18} />
                    Salvar
                </button>
            </div>

            <div className="flex-1 p-6 space-y-6">
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

                {/* Form Fields */}
                <div className="space-y-5">
                    {/* Período */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-500 ml-1">
                            <Calendar size={14} className="text-primary" />
                            Período
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {periodos.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setFormData({ ...formData, periodo: p })}
                                    className={cn(
                                        "py-3 px-2 rounded-2xl text-xs font-bold border transition-all",
                                        formData.periodo === p
                                            ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                            : "bg-white text-slate-600 border-slate-100 hover:border-primary/30"
                                    )}
                                >
                                    {p}
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
                            className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-base font-bold text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none"
                            value={formData.centroCusto}
                            onChange={(e) => setFormData({ ...formData, centroCusto: e.target.value })}
                        >
                            {centrosCusto.map(c => <option key={c} value={c}>{c}</option>)}
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
                            {categorias.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFormData({ ...formData, categoria: cat })}
                                    className={cn(
                                        "py-2 px-4 rounded-xl text-xs font-bold border transition-all",
                                        formData.categoria === cat
                                            ? "bg-primary/10 text-primary border-primary/20"
                                            : "bg-white text-slate-500 border-slate-100 hover:border-primary/20"
                                    )}
                                >
                                    {cat}
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
                            className="w-full bg-white border border-slate-100 rounded-2xl p-4 text-base font-bold text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none"
                            value={formData.formaPagamento}
                            onChange={(e) => setFormData({ ...formData, formaPagamento: e.target.value })}
                        >
                            {formasPagamento.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};
