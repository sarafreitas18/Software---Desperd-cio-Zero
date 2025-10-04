
import React, { useState } from 'react';
import type { Product, Store } from '../types';
import { suggestRecipe } from '../services/geminiService';
import RecipeModal from './RecipeModal';
import { SparklesIcon } from './icons';

interface ProductCardProps {
  product: Product;
  stores: Store[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product, stores }) => {
  const store = stores.find(s => s.id === product.storeId);
  const discount = Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggestRecipe = async () => {
    setIsModalOpen(true);
    setIsLoading(true);
    const result = await suggestRecipe(product.name);
    setRecipe(result);
    setIsLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRecipe('');
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transition-transform duration-300 hover:-translate-y-2">
        <div className="relative">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
          <div className="absolute top-2 right-2 bg-brand-yellow text-brand-green font-bold px-3 py-1 rounded-full text-sm">
            {discount}% OFF
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{store?.name}</p>
          <p className="text-gray-600 text-sm flex-grow mb-4">{product.description}</p>
          
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-brand-green">
                R$ {product.discountedPrice.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-md text-gray-400 line-through">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <button
                onClick={handleSuggestRecipe}
                className="w-full bg-brand-light-green text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-green transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <SparklesIcon className="w-5 h-5" />
                Sugerir Receita
              </button>
          </div>
        </div>
      </div>
      <RecipeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        recipe={recipe}
        productName={product.name}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProductCard;
