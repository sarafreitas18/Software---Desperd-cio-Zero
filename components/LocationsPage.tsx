
import React, { useState } from 'react';
import { STORES } from '../constants';
import { StoreIcon, MapPinIcon, SearchIcon } from './icons';
import LocationModal from './LocationModal';
import type { Store } from '../types';

const LocationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState<Store | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStores = STORES.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openLocationModal = (store: Store) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const closeLocationModal = () => {
    setIsModalOpen(false);
    setSelectedStore(undefined);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Nossas Lojas Parceiras
      </h2>
      <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10">
        Descubra os estabelecimentos comprometidos com o desperdício zero próximos a você.
      </p>

      {/* Search Bar */}
      <div className="mb-12 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar por nome ou bairro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-brand-light-green focus:border-transparent outline-none transition shadow-sm"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
             <SearchIcon className="w-6 h-6" />
          </div>
        </div>
      </div>
      
      {/* Stores Grid */}
      {filteredStores.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredStores.map((store) => (
            <div 
              key={store.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group border border-gray-100"
            >
              <div className="relative h-40 bg-gray-200 overflow-hidden">
                <img 
                    src={store.logoUrl} 
                    alt={store.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                     <h3 className="text-xl font-bold text-white shadow-sm">{store.name}</h3>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start gap-3 mb-4 flex-grow">
                  <MapPinIcon className="w-5 h-5 text-brand-green mt-1 flex-shrink-0" />
                  <p className="text-gray-600">{store.location}</p>
                </div>
                
                <button
                  onClick={() => openLocationModal(store)}
                  className="w-full mt-auto bg-brand-cream text-brand-green border border-brand-green font-semibold py-2 px-4 rounded-lg hover:bg-brand-green hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <MapPinIcon className="w-4 h-4" />
                  Ver no Mapa
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
            <StoreIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700">Nenhuma loja encontrada</h3>
            <p className="text-gray-500 mt-2">Tente pesquisar por outra região ou nome.</p>
        </div>
      )}

      <LocationModal
        isOpen={isModalOpen}
        onClose={closeLocationModal}
        store={selectedStore}
      />
    </div>
  );
};

export default LocationsPage;
