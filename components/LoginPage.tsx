
import React from 'react';
import type { Page } from '../App';

interface LoginPageProps {
    navigateTo: (page: Page) => void;
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigateTo, onLogin }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você normalmente lidaria com validação de formulário e chamadas de API
    onLogin();
  };

  return (
    <div className="container mx-auto px-6 py-12 flex justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 w-full max-w-lg">
            <h2 className="text-3xl font-bold text-center text-brand-green mb-2">Bem-vindo de volta!</h2>
            <p className="text-center text-gray-600 mb-8">Acesse seu painel para gerenciar seus produtos.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                    <input type="email" id="email" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-light-green focus:border-brand-light-green" placeholder="seu@email.com" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                    <input type="password" id="password" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-light-green focus:border-brand-light-green" placeholder="********" />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-brand-yellow text-brand-green font-bold text-lg px-8 py-3 rounded-full shadow-md hover:bg-yellow-400 transition-transform transform hover:scale-105 duration-300"
                    >
                        Entrar
                    </button>
                </div>
            </form>
            <p className="text-center text-sm text-gray-600 mt-8">
                Não tem uma conta?{' '}
                <a onClick={() => navigateTo('register')} className="font-medium text-brand-green hover:underline cursor-pointer">
                    Cadastre-se
                </a>
            </p>
        </div>
    </div>
  );
};

export default LoginPage;
