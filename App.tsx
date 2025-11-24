
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import BrowsePage from './components/BrowsePage';
import LocationsPage from './components/LocationsPage';
import BusinessDashboard from './components/BusinessDashboard';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

export type Page = 'home' | 'browse' | 'locations' | 'dashboard' | 'login' | 'register';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateTo = useCallback((page: Page) => {
    // Rota protegida básica
    if (page === 'dashboard' && !isLoggedIn) {
      setActivePage('login');
      return;
    }
    setActivePage(page);
    window.scrollTo(0, 0);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigateTo('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateTo('home');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'browse':
        return <BrowsePage />;
      case 'locations':
        return <LocationsPage />;
      case 'dashboard':
        // A página de negócios agora é o dashboard
        return <BusinessDashboard />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} onLogin={handleLogin} />;
      case 'register':
        return <RegisterPage navigateTo={navigateTo} onRegister={handleLogin} />; // onRegister também faz login
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen flex flex-col font-sans text-gray-800">
      <Header activePage={activePage} navigateTo={navigateTo} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
