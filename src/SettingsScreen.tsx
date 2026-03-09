import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  ChevronRight,
  User,
  Mail,
  Phone,
  Moon,
  Lock,
  LogOut,
  Check
} from 'lucide-react';
import { cn } from './lib/utils';

interface SettingsScreenProps {
  onLogout: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&auto=format&fit=crop');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userInfo, setUserInfo] = useState({
    name: 'Carol',
    email: 'Carolinac.almeida@outlook.com',
    phone: '' // Somente números no estado
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const maskPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const unmaskPhone = (value: string) => value.replace(/\D/g, '');

  const handleEdit = (field: string, current: string) => {
    setEditingField(field);
    setTempValue(field === 'phone' ? maskPhone(current) : current);
  };

  const handleSaveField = () => {
    if (editingField) {
      const finalValue = editingField === 'phone' ? unmaskPhone(tempValue) : tempValue;
      setUserInfo(prev => ({ ...prev, [editingField]: finalValue }));
      setEditingField(null);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light w-full pb-60 lg:pb-24 transition-colors">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="flex items-center p-4 sticky top-0 bg-background-light/80 backdrop-blur-md z-10 w-full max-w-7xl mx-auto border-b border-primary/5">
        <h2 className="text-xl font-extrabold flex-1 text-slate-900">Meu Perfil</h2>
        <button
          onClick={onLogout}
          className="p-2.5 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 relative transition-colors cursor-pointer shadow-sm border border-rose-100"
        >
          <LogOut size={22} />
        </button>
      </div>

      <div className="w-full max-w-3xl mx-auto flex flex-col pt-4">
        {/* Profile Section */}
        <div className="flex p-6 flex-col items-center gap-4">
          <div className="relative">
            <div className="rounded-full border-4 border-surface-light shadow-xl h-32 w-32 overflow-hidden bg-slate-200">
              <img
                src={profileImage}
                alt="Perfil"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <button
              onClick={handleImageClick}
              className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-full shadow-lg border-2 border-surface-light hover:scale-110 transition-transform cursor-pointer"
            >
              <Camera size={16} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-2xl font-extrabold tracking-tight text-slate-900">{userInfo.name}</p>
            <p className="text-slate-500 text-sm font-bold bg-slate-100 px-3 py-1 rounded-full mt-1">Administrador</p>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="flex flex-col px-4 gap-6">
          {/* Personal Info */}
          <section>
            <div className="flex justify-between items-end mb-3 ml-2">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Informações Pessoais</h3>
              {editingField && (
                <button onClick={handleSaveField} className="text-primary text-xs font-bold flex items-center gap-1">
                  <Check size={14} /> Salvar Alteração
                </button>
              )}
            </div>
            <div className="bg-surface-light rounded-2xl overflow-hidden shadow-sm border border-slate-200">
              {/* Nome */}
              <div
                onClick={() => handleEdit('name', userInfo.name)}
                className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50"
              >
                <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-11">
                  <User size={22} />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Nome Completo</p>
                  {editingField === 'name' ? (
                    <input
                      autoFocus
                      className="text-base font-bold text-slate-900 bg-transparent outline-none border-b-2 border-primary"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <p className="text-base font-bold text-slate-900">{userInfo.name}</p>
                  )}
                </div>
                <ChevronRight size={20} className="text-slate-300" />
              </div>

              {/* Email */}
              <div
                onClick={() => handleEdit('email', userInfo.email)}
                className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50"
              >
                <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-11">
                  <Mail size={22} />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">E-mail</p>
                  {editingField === 'email' ? (
                    <input
                      autoFocus
                      type="email"
                      className="text-base font-bold text-slate-900 bg-transparent outline-none border-b-2 border-primary"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <p className="text-base font-bold text-slate-900">{userInfo.email}</p>
                  )}
                </div>
                <ChevronRight size={20} className="text-slate-300" />
              </div>

              {/* Telefone */}
              <div
                onClick={() => handleEdit('phone', userInfo.phone)}
                className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50"
              >
                <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-11">
                  <Phone size={22} />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Telefone</p>
                  {editingField === 'phone' ? (
                    <input
                      autoFocus
                      className="text-base font-bold text-slate-900 bg-transparent outline-none border-b-2 border-primary"
                      value={tempValue}
                      onChange={(e) => setTempValue(maskPhone(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <p className="text-base font-bold text-slate-900">{maskPhone(userInfo.phone)}</p>
                  )}
                </div>
                <ChevronRight size={20} className="text-slate-300" />
              </div>

              {/* Senha */}
              <div className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-11">
                  <Lock size={22} />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Senha</p>
                  <p className="text-base font-bold text-slate-900">••••••••••••</p>
                </div>
                <button className="text-primary text-xs font-bold hover:underline">Alterar</button>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section>
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 ml-2">Preferências</h3>
            <div className="bg-surface-light rounded-2xl overflow-hidden shadow-sm border border-slate-200">
              <div
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-11">
                  <Moon size={22} />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-base font-bold text-slate-900">Modo Escuro</p>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <div className={cn(
                    "w-12 h-6 rounded-full transition-colors",
                    darkMode ? "bg-primary" : "bg-slate-200"
                  )}></div>
                  <div className={cn(
                    "absolute left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all",
                    darkMode ? "translate-x-6" : "translate-x-0"
                  )}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="mt-2 text-center pb-20 border-t border-slate-100 pt-8">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-4 px-4 py-4 text-rose-500 font-extrabold bg-rose-50 rounded-2xl border border-rose-100 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              <LogOut size={22} />
              <span>Sair do Aplicativo</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

