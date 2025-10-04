
import React from 'react';
import { CloseIcon, SparklesIcon } from './icons';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: string;
  productName: string;
  isLoading: boolean;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, recipe, productName, isLoading }) => {
  if (!isOpen) return null;

  const formattedRecipe = recipe
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-brand-green">$1</strong>')
    .replace(/\* (.*?)(?=\n\*|$)/g, '<li class="ml-4 mb-1 list-disc">$1</li>')
    .replace(/Ingredientes:/g, '<h4 class="text-xl font-semibold mb-2 mt-4 text-gray-800">Ingredientes:</h4>')
    .replace(/Modo de Preparo:/g, '<h4 class="text-xl font-semibold mb-2 mt-4 text-gray-800">Modo de Preparo:</h4>');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative transform transition-all duration-300 scale-95 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
          <CloseIcon className="w-8 h-8" />
        </button>
        
        <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="w-8 h-8 text-brand-yellow" />
            <h3 className="text-2xl font-bold text-gray-800">
                Sugestão de Receita com {productName}
            </h3>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Gerando uma receita deliciosa...</p>
          </div>
        ) : (
          <div 
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: formattedRecipe }}
          ></div>
        )}
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

export default RecipeModal;
