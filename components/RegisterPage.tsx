
import React from 'react';
import type { Page } from '../App';

interface RegisterPageProps {
    navigateTo: (page: Page) => void;
    onRegister: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ navigateTo, onRegister }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <div className="container mx-auto px-6 py-12 flex justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 w-full max-w-lg">
            <h2 className="text-3xl font-bold text-center text-brand-green mb-2">Junte-se ao Desperdício Zero</h2>
            <p className="text-center text-gray-600 mb-8">Comece a transformar seu excedente em lucro hoje mesmo.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
                    <input type="text" id="companyName" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-light-green focus:border-brand-light-green" placeholder="Padaria Pão Quente" />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                    <input type="email" id="email" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-light-green focus:border-brand-light-green" placeholder="contato@empresa.com" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                    <input type="password" id="password" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-light-green focus:border-brand-light-green" placeholder="Crie uma senha forte" />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-brand-yellow text-brand-green font-bold text-lg px-8 py-3 rounded-full shadow-md hover:bg-yellow-400 transition-transform transform hover:scale-105 duration-300"
                    >
                        Criar Conta
                    </button>
                </div>
            </form>
            <p className="text-center text-sm text-gray-600 mt-8">
                Já tem uma conta?{' '}
                <a onClick={() => navigateTo('login')} className="font-medium text-brand-green hover:underline cursor-pointer">
                    Faça login
                </a>
            </p>
        </div>
    </div>
  );
};

export default RegisterPage;
