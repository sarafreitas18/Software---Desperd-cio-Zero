
import React from 'react';
import { CloseIcon, MapPinIcon, ExternalLinkIcon } from './icons';
import type { Store } from '../types';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: Store | undefined;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, store }) => {
  if (!isOpen || !store) return null;

  // Codificando o endereço para URL
  const encodedAddress = encodeURIComponent(store.location);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl p-0 max-w-2xl w-full overflow-hidden relative transform transition-all duration-300 scale-95 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-brand-green p-6 text-white relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-white/20 rounded-full p-1">
              <CloseIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
                <MapPinIcon className="w-8 h-8 text-brand-yellow" />
                <div>
                    <h3 className="text-2xl font-bold">
                        Localização
                    </h3>
                    <p className="text-brand-cream opacity-90">{store.name}</p>
                </div>
            </div>
        </div>

        <div className="p-6">
            <div className="flex items-start gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="bg-brand-light-green/20 p-2 rounded-full text-brand-green">
                    <MapPinIcon className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-700">Endereço:</h4>
                    <p className="text-gray-600 text-lg">{store.location}</p>
                </div>
            </div>

            <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden shadow-inner mb-6 relative">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src={mapUrl} 
                    title={`Mapa de ${store.name}`}
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0}
                    className="absolute inset-0"
                ></iframe>
            </div>

            <a 
                href={externalMapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-brand-yellow text-brand-green font-bold py-3 px-4 rounded-full shadow-md hover:bg-yellow-400 transition-colors duration-300 flex items-center justify-center gap-2"
            >
                Abrir no Google Maps
                <ExternalLinkIcon className="w-5 h-5" />
            </a>
        </div>
      </div>
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
        `}</style>
    </div>
  );
};

export default LocationModal;