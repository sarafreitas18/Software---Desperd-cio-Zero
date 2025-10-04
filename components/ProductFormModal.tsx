import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { CloseIcon } from './icons';

interface ProductFormModalProps {
    onClose: () => void;
    onSave: (product: Product) => void;
    productToEdit: Product | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ onClose, onSave, productToEdit }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'storeId'>>({
    name: '',
    description: '',
    imageUrl: 'https://source.unsplash.com/400x300/?food-plate',
    originalPrice: 0,
    discountedPrice: 0,
    expiryDate: '',
    quantity: 1,
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
        ...formData,
        id: productToEdit?.id || 0, // ID é gerenciado pelo pai
        storeId: productToEdit?.storeId || 0, // storeId é gerenciado pelo pai
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div 
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative transform transition-all duration-300 scale-95 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
        >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
              <CloseIcon className="w-8 h-8" />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {productToEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 input-style" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={3} className="mt-1 input-style"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Preço Original (R$)</label>
                        <input type="number" name="originalPrice" id="originalPrice" value={formData.originalPrice} onChange={handleChange} required className="mt-1 input-style" step="0.01" min="0" />
                    </div>
                     <div>
                        <label htmlFor="discountedPrice" className="block text-sm font-medium text-gray-700">Preço com Desconto (R$)</label>
                        <input type="number" name="discountedPrice" id="discountedPrice" value={formData.discountedPrice} onChange={handleChange} required className="mt-1 input-style" step="0.01" min="0" />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantidade</label>
                        <input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} required className="mt-1 input-style" min="1" />
                    </div>
                     <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Validade</label>
                        <input type="text" name="expiryDate" id="expiryDate" value={formData.expiryDate} onChange={handleChange} required className="mt-1 input-style" placeholder="Ex: Hoje, Amanhã..." />
                    </div>
                </div>
                 <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL da Imagem</label>
                    <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="mt-1 input-style" />
                </div>

                <div className="pt-4 flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold px-6 py-2 rounded-full hover:bg-gray-300 transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-brand-green text-white font-bold px-6 py-2 rounded-full hover:bg-brand-light-green transition-colors">
                        Salvar Produto
                    </button>
                </div>
            </form>
        </div>
        <style>{`
          .input-style {
            display: block;
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #D1D5DB;
            border-radius: 0.375rem;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          }
          .input-style:focus {
            outline: 2px solid transparent;
            outline-offset: 2px;
            border-color: #4CAF50;
            box-shadow: 0 0 0 2px #4CAF50;
          }
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

export default ProductFormModal;