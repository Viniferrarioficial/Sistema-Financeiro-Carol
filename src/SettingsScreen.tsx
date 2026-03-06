import React from 'react';
import {
  ArrowLeft,
  Camera,
  ChevronRight,
  User,
  Mail,
  Phone,
  Moon,
  Lock,
  LogOut,
  Home,
  Search,
  Bell,
  Settings as SettingsIcon,
  Edit2
} from 'lucide-react';

interface SettingsScreenProps {
  onLogout: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onLogout }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light max-w-[480px] mx-auto w-full pb-24">
      {/* Header */}
      <div className="flex items-center p-4 sticky top-0 bg-background-light/80 backdrop-blur-md z-10">
        <button className="text-slate-900 p-2 hover:bg-primary/10 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-extrabold flex-1 ml-2 text-slate-900">Configurações de Perfil</h2>
        <button className="text-primary font-extrabold text-sm px-4 py-2 hover:bg-primary/10 rounded-xl">
          Salvar
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex p-6 flex-col items-center gap-4">
        <div className="relative">
          <div className="rounded-full border-4 border-white shadow-xl h-32 w-32 overflow-hidden bg-slate-200">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop"
              alt="Perfil"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
            <Camera size={16} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-extrabold tracking-tight text-slate-900">Administrador Loja</p>
          <p className="text-slate-500 text-sm font-bold">Gestor de Unidades</p>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="flex flex-col px-4 gap-6">
        {/* Personal Info */}
        <section>
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 ml-2">Informações Pessoais</h3>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50">
              <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-11">
                <User size={22} />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Nome Completo</p>
                <p className="text-base font-bold text-slate-900">Alex Harrison</p>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </div>
            <div className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50">
              <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-11">
                <Mail size={22} />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">E-mail</p>
                <p className="text-base font-bold text-slate-900">gestor@lojas.com</p>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </div>
            <div className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50">
              <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-11">
                <Phone size={22} />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Telefone</p>
                <p className="text-base font-bold text-slate-900">(18) 99123-4567</p>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </div>
            <div className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-11">
                <Lock size={22} />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Senha</p>
                <p className="text-base font-bold text-slate-900">••••••••••••</p>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 ml-2">Preferências de Tema</h3>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 px-4 py-4">
              <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-11">
                <Moon size={22} />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-base font-bold text-slate-900">Modo Escuro (Tema)</p>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <div className="w-12 h-6 bg-slate-200 rounded-full transition-colors"></div>
                <div className="absolute left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all translate-x-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="mt-2">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-4 text-rose-500 font-extrabold bg-rose-50 rounded-2xl border border-rose-100 hover:bg-rose-100 transition-colors"
          >
            <LogOut size={22} />
            <span>Sair do Aplicativo</span>
          </button>
        </section>
      </div>
    </div>
  );
};
