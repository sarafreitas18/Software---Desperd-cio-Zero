
import React from 'react';
import type { Page } from '../App';
import { LeafIcon, LogoutIcon } from './icons';

interface HeaderProps {
  activePage: Page;
  navigateTo: (page: Page) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, navigateTo, isLoggedIn, onLogout }) => {
  const navItemClasses = "cursor-pointer px-4 py-2 rounded-md transition-colors duration-300 flex items-center gap-2";
  const activeClasses = "bg-brand-green text-white";
  const inactiveClasses = "hover:bg-brand-light-green/20";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigateTo('home')}
        >
          <LeafIcon className="w-8 h-8 text-brand-green" />
          <h1 className="text-2xl font-bold text-brand-green">Desperdício Zero</h1>
        </div>
        <ul className="flex items-center space-x-4 font-medium">
          <li>
            <a
              onClick={() => navigateTo('home')}
              className={`${navItemClasses} ${activePage === 'home' ? activeClasses : inactiveClasses}`}
            >
              Início
            </a>
          </li>
          <li>
            <a
              onClick={() => navigateTo('browse')}
              className={`${navItemClasses} ${activePage === 'browse' ? activeClasses : inactiveClasses}`}
            >
              Ver Ofertas
            </a>
          </li>
          <li>
            <a
              onClick={() => navigateTo('locations')}
              className={`${navItemClasses} ${activePage === 'locations' ? activeClasses : inactiveClasses}`}
            >
              Lojas
            </a>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <a
                  onClick={() => navigateTo('dashboard')}
                  className={`${navItemClasses} ${activePage === 'dashboard' ? activeClasses : inactiveClasses}`}
                >
                  Painel
                </a>
              </li>
              <li>
                <a
                  onClick={onLogout}
                  className={`${navItemClasses} ${inactiveClasses}`}
                >
                  <LogoutIcon className="w-5 h-5" />
                  Sair
                </a>
              </li>
            </>
          ) : (
             <li>
              <a
                onClick={() => navigateTo('login')}
                className={`${navItemClasses} ${['login', 'register'].includes(activePage) ? activeClasses : inactiveClasses}`}
              >
                Login / Cadastro
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
