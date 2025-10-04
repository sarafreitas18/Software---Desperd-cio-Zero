
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-green text-white mt-12">
      <div className="container mx-auto px-6 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Desperdício Zero. Todos os direitos reservados.</p>
        <p className="text-sm mt-1">Combatendo o desperdício, alimentando o futuro.</p>
      </div>
    </footer>
  );
};

export default Footer;
