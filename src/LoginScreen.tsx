import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Lock,
  Eye,
  ArrowLeft,
  Wallet,
  LogIn
} from 'lucide-react';
import { cn } from './lib/utils';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLogged, setKeepLogged] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');

  // Simulating loading saved data on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('savedEmail');
    const storedPassword = localStorage.getItem('savedPassword');
    const storedKeepLogged = localStorage.getItem('keepLogged') === 'true';

    if (storedKeepLogged && storedEmail) {
      setEmail(storedEmail);
      setSavedEmail(storedEmail);
      setKeepLogged(true);
      if (storedPassword) {
        setPassword(storedPassword);
      }
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // If user changes email and it differs from the saved one, clear the password
    if (savedEmail && newEmail !== savedEmail) {
      setPassword('');
      setSavedEmail(''); // Reset saved email so it doesn't keep clearing while typing
    }
  };

  const handleLoginSubmit = () => {
    if (keepLogged) {
      localStorage.setItem('savedEmail', email);
      localStorage.setItem('savedPassword', password);
      localStorage.setItem('keepLogged', 'true');
    } else {
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('savedPassword');
      localStorage.removeItem('keepLogged');
    }
    onLogin();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light w-full relative">
      {/* Header */}
      <div className="flex items-center p-4 justify-between w-full max-w-7xl mx-auto">
        <button className="text-slate-900 flex size-12 items-center justify-center cursor-pointer hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">Finance Manager</h2>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 pb-20 w-full">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <Wallet className="text-primary w-10 h-10" />
            </div>
            <h1 className="text-3xl font-extrabold leading-tight text-center text-slate-900">Bem-vindo</h1>
            <p className="text-slate-500 text-center mt-2 font-medium">Gerencie suas lojas com confiança</p>
          </div>

          <div className="w-full space-y-5">
            <div className="flex flex-col w-full">
              <p className="text-slate-700 text-sm font-bold pb-2 px-1">E-mail</p>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  className="flex w-full rounded-2xl border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 pl-12 pr-4 placeholder:text-slate-400 text-base font-medium outline-none transition-all"
                  placeholder="seu@email.com"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <p className="text-slate-700 text-sm font-bold pb-2 px-1">Senha</p>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  className="flex w-full rounded-2xl border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 pl-12 pr-12 placeholder:text-slate-400 text-base font-medium outline-none transition-all"
                  placeholder="Digite sua senha"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-600"
                >
                  <Eye size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 px-1 pb-2">
              <input
                type="checkbox"
                id="keepLogged"
                checked={keepLogged}
                onChange={(e) => setKeepLogged(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <label htmlFor="keepLogged" className="text-slate-700 text-sm font-bold cursor-pointer select-none">
                Manter-me conectado
              </label>
            </div>

            <button
              onClick={handleLoginSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
            >
              <span>Entrar</span>
              <LogIn size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

