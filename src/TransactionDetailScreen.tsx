import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import {
    ArrowLeft,
    Calendar,
    User,
    Tag,
    MapPin,
    CreditCard,
    Clock,
    Banknote,
    ShoppingCart
} from 'lucide-react';
import { cn } from './lib/utils';

interface TransactionDetailScreenProps {
    transactionId: string;
    onBack: () => void;
}

export const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = ({
    transactionId,
    onBack
}) => {
    const [transaction, setTransaction] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDetail();
    }, [transactionId]);

    const fetchDetail = async () => {
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
                .eq('id', transactionId)
                .single();

            if (error) throw error;
            setTransaction(data);
        } catch (err) {
            console.error('Error fetching detail:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('pt-BR');
    };

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background-light flex items-center justify-center">
                <p className="font-extrabold text-primary animate-pulse">Carregando detalhes...</p>
            </div>
        );
    }

    if (!transaction) return null;

    return (
        <div className="flex flex-col min-h-screen bg-background-light w-full pb-8">
            {/* Header */}
            <div className="flex items-center p-4 sticky top-0 bg-background-light/80 backdrop-blur-md z-10 w-full max-w-7xl mx-auto border-b border-primary/5">
                <button
                    onClick={onBack}
                    className="text-slate-900 p-2 hover:bg-primary/10 rounded-full transition-colors cursor-pointer"
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-extrabold flex-1 ml-2 text-slate-900">Detalhes do Lançamento</h2>
            </div>

            <div className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-6">
                {/* Value Card */}
                <div className={cn(
                    "rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl shadow-primary/10 border-2",
                    transaction.type === 'income' ? "bg-emerald-50 border-emerald-100" : "bg-primary/5 border-primary/10"
                )}>
                    <p className="text-slate-500 font-extrabold uppercase tracking-widest text-xs mb-2">Valor Total</p>
                    <h1 className={cn(
                        "text-4xl md:text-5xl font-extrabold",
                        transaction.type === 'income' ? "text-emerald-500" : "text-primary"
                    )}>
                        {transaction.type === 'income' ? '+' : '-'} {formatCurrency(Number(transaction.amount))}
                    </h1>
                    <div className="mt-4 flex items-center gap-2">
                        <div className={cn(
                            "px-4 py-1.5 rounded-full font-bold text-sm",
                            transaction.type === 'income' ? "bg-emerald-200 text-emerald-800" : "bg-primary text-white"
                        )}>
                            {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                        </div>
                    </div>
                </div>

                {/* Info List */}
                <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
                    <DetailItem
                        icon={<Tag size={20} />}
                        label="Descrição"
                        value={transaction.description}
                    />
                    <DetailItem
                        icon={<MapPin size={20} />}
                        label="Centro de Custo / Unidade"
                        value={transaction.cost_centers?.name}
                    />
                    <DetailItem
                        icon={<Calendar size={20} />}
                        label="Categoria"
                        value={transaction.categories?.name}
                    />
                    <DetailItem
                        icon={<CreditCard size={20} />}
                        label="Forma de Pagamento"
                        value={transaction.payment_methods?.name}
                    />
                    <DetailItem
                        icon={<Clock size={20} />}
                        label="Período Referência"
                        value={transaction.periods?.name}
                    />
                </div>

                {/* Traceability Info */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-dashed border-slate-200">
                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">Rastreabilidade</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg text-slate-400">
                                <User size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Lançado por</p>
                                <p className="text-sm font-bold text-slate-700">Administrador Sistema</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg text-slate-400">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Data do Lançamento</p>
                                <p className="text-sm font-bold text-slate-700">{formatDate(transaction.transaction_date)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg text-slate-400">
                                <Clock size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Hora do Registro</p>
                                <p className="text-sm font-bold text-slate-700">{formatTime(transaction.created_at)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-50 last:border-b-0">
        <div className="text-primary bg-primary/10 p-2.5 rounded-xl shrink-0">
            {icon}
        </div>
        <div className="flex flex-col">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">{label}</p>
            <p className="text-base font-bold text-slate-900">{value || '--'}</p>
        </div>
    </div>
);
