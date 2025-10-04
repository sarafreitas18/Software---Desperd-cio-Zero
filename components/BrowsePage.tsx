
import React, { useState } from 'react';
import { PRODUCTS, STORES } from '../constants';
import ProductCard from './ProductCard';
import type { Product } from '../types';

const BrowsePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Explore as Ofertas do Dia
      </h2>
      <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10">
        Encontre produtos deliciosos perto de você e ajude a combater o desperdício de alimentos. Novas ofertas são adicionadas todos os dias!
      </p>

      {/* Search Bar */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por pães, frutas, marmitas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-brand-light-green focus:border-transparent outline-none transition"
          />
          <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} stores={STORES} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700">Nenhum resultado encontrado</h3>
            <p className="text-gray-500 mt-2">Tente buscar por um termo diferente.</p>
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
